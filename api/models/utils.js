// @flow
import { db } from './db';

export const NEW_DOCUMENTS = db
  .row('old_val')
  .eq(null)
  .and(db.not(db.row('new_val').eq(null)));

export const listenToNewDocumentsIn = (table: string, cb: Function) => {
  return (
    db
      .table(table)
      .changes({
        includeInitial: false,
      })
      // Filter to only include newly inserted messages in the changefeed
      .filter(NEW_DOCUMENTS)
      .run({ cursor: true })
      .then(cursor => {
        cursor.each((err, data) => {
          if (err) throw err;
          // Call the passed callback with the message directly
          cb(data.new_val);
        });
        return cursor;
      })
  );
};

export type Timeframe = 'daily' | 'weekly' | 'monthly' | 'quarterly';

export const parseRange = (timeframe?: Timeframe) => {
  switch (timeframe) {
    case 'daily': {
      return { current: 60 * 60 * 24, previous: 60 * 60 * 24 * 2 };
    }
    case 'weekly': {
      return { current: 60 * 60 * 24 * 7, previous: 60 * 60 * 24 * 14 };
    }
    case 'monthly': {
      return { current: 60 * 60 * 24 * 30, previous: 60 * 60 * 24 * 60 };
    }
    case 'quarterly': {
      return { current: 60 * 60 * 24 * 90, previous: 60 * 60 * 24 * 180 };
    }
    default: {
      return { current: 60 * 60 * 24 * 7, previous: 60 * 60 * 24 * 14 };
    }
  }
};

export const getAu = (range: Timeframe) => {
  const { current } = parseRange(range);
  return db
    .table('users')
    .filter(db.row('lastSeen').during(db.now().sub(current), db.now()))
    .count()
    .default(0)
    .run();
};

export const getGrowth = async (
  table: string,
  range: Timeframe,
  field: string,
  filter: ?mixed
) => {
  const { current, previous } = parseRange(range);

  const [currentPeriodCount, previousPeriodCount] = await Promise.all([
    db
      .table(table)
      .filter(db.row(field).during(db.now().sub(current), db.now()))
      .filter(filter ? filter : '')
      .count()
      .run(),
    db
      .table(table)
      .filter(
        db.row(field).during(db.now().sub(previous), db.now().sub(current))
      )
      .filter(filter ? filter : '')
      .count()
      .run(),
  ]);
  const rate = (currentPeriodCount - previousPeriodCount) / previousPeriodCount;
  return {
    currentPeriodCount,
    previousPeriodCount,
    growthRate: Math.round(rate * 100),
  };
};

export const getCount = (table: string, filter: mixed) => {
  if (filter) {
    return db
      .table(table)
      .filter(filter)
      .count()
      .run();
  }

  return db
    .table(table)
    .count()
    .run();
};

export const getCoreMetrics = (timeframe: number) => {
  return db
    .table('coreMetrics')
    .orderBy(db.desc('date'))
    .limit(timeframe)
    .orderBy('date')
    .run();
};

export const getActiveThreads = (range: number) => {
  return db
    .table('threads')
    .filter(db.row('lastActive').during(db.now().sub(range), db.now()))
    .filter(thread => db.not(thread.hasFields('deletedAt')))
    .group('communityId')
    .ungroup()
    .run();
};

const getCommunitiesWithMinimumMembers = (
  min: number = 2,
  communityIds: Array<string>
) => {
  return db
    .table('usersCommunities')
    .getAll(...communityIds, { index: 'communityId' })
    .group('communityId')
    .ungroup()
    .filter(row =>
      row('reduction')
        .count()
        .gt(min)
    )
    .map(row => row('group'))
    .run();
};

export const getAc = async (range: Timeframe) => {
  // constants
  const { current } = parseRange(range);
  const MIN_THREAD_COUNT = 1;

  // get threads posted in the range
  const threadsPostedInRange = await getActiveThreads(current);
  // returns an array of community ids
  const activeCommunitiesByThreads = threadsPostedInRange
    .filter(t => t.reduction.length > MIN_THREAD_COUNT)
    .map(t => t.group);

  // for each active community by thread count, only return communities with at least 2 members
  const activeCommunitiesByMember = await getCommunitiesWithMinimumMembers(
    2,
    activeCommunitiesByThreads
  );

  return activeCommunitiesByMember.length;
};

export const getAt = (range: Timeframe) => {
  const { current } = parseRange(range);
  return db
    .table('threads')
    .filter(db.row('lastActive').during(db.now().sub(current), db.now()))
    .count()
    .default(0)
    .run();
};
