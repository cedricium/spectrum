// @flow
import { db } from '../db';

export const getCommunityCount = () => {
  return db
    .table('communities')
    .count()
    .run();
};

export const getDeletedCommunityCount = () => {
  return db
    .table('communities')
    .filter(row => row.hasFields('deletedAt'))
    .count()
    .run();
};

export const getCommunitiesWithMoreThanOneMember = () => {
  return db
    .table('usersCommunities')
    .filter({ isMember: true })
    .group('communityId')
    .ungroup()
    .filter(row =>
      row('reduction')
        .count()
        .gt(1)
    )
    .count()
    .run();
};

export const getCommunitiesWithOneThread = () => {
  return db
    .table('threads')
    .filter(row => row.hasFields('deletedAt').not())
    .group('communityId')
    .ungroup()
    .filter(row =>
      row('reduction')
        .count()
        .ge(1)
    )
    .count()
    .run();
};

export const getCommunitiesWithSentSlackImports = () => {
  return db
    .table('slackImports')
    .filter(row => row.hasFields('sent'))
    .count()
    .run();
};
