// @flow
import { db } from '../db';
import { getCount } from '../utils';

export const getUserCount = () => {
  return db
    .table('users')
    .count()
    .run();
};

export const getDeletedUserCount = () => {
  return db
    .table('users')
    .filter(row => row.hasFields('deletedAt'))
    .count()
    .run();
};

export const getBannedUserCount = () => {
  return db
    .table('users')
    .filter(row => row.hasFields('bannedAt'))
    .count()
    .run();
};

export const getUsersWhoHaveSentMessages = () => {
  return db
    .table('messages')
    .filter(row => row.hasFields('deletedAt').not())
    .group('senderId')
    .ungroup()
    .filter(row =>
      row('reduction')
        .count()
        .ge(1)
    )
    .count()
    .run();
};

export const getUsersWhoHaveCreatedThread = () => {
  return db
    .table('threads')
    .filter(row => row.hasFields('deletedAt').not())
    .group('creatorId')
    .ungroup()
    .filter(row =>
      row('reduction')
        .count()
        .ge(1)
    )
    .count()
    .run();
};

export const getUsersWhoHaveJoinedCommunity = () => {
  return db
    .table('usersCommunities')
    .filter({ isMember: true })
    .group('userId')
    .ungroup()
    .filter(row =>
      row('reduction')
        .count()
        .ge(1)
    )
    .count()
    .run();
};

export const getUsersWhoHaveSetUsername = () => {
  return db
    .table('users')
    .filter(row =>
      row('username')
        .eq(null)
        .not()
    )
    .count()
    .run();
};

export const averageThreadsCreated = async () => {
  const [threads, users] = await Promise.all([
    getCount('threads'),
    getCount('users'),
  ]);

  return threads / users;
};

export const averageCommunitiesJoined = async () => {
  const [usersCommunities, users] = await Promise.all([
    db
      .table('usersCommunities')
      .filter({ isMember: true })
      .count(),
    getCount('users'),
  ]);

  return usersCommunities / users;
};

export const averageMessagesCreated = async () => {
  const [messages, users] = await Promise.all([
    getCount('messages'),
    getCount('users'),
  ]);

  return messages / users;
};

export const threadsCreatedDistribution = () => {
  return db
    .table('threads')
    .filter(row => row.hasFields('deletedAt').not())
    .group('creatorId')
    .count()
    .ungroup()
    .group('reduction')
    .ungroup()
    .map(row => ({
      key: row('group'),
      value: row('reduction').count(),
    }));
};

export const messagesCreatedDistribution = () => {
  return db
    .table('messages')
    .filter(row => row.hasFields('deletedAt').not())
    .group('senderId')
    .count()
    .ungroup()
    .group('reduction')
    .ungroup()
    .map(row => ({
      key: row('group'),
      value: row('reduction').count(),
    }));
};

export const communitiesJoinedDistribution = () => {
  return db
    .table('usersCommunities')
    .filter({ isMember: true })
    .group('userId')
    .count()
    .ungroup()
    .group('reduction')
    .ungroup()
    .map(row => ({
      key: row('group'),
      value: row('reduction').count(),
    }));
};
