// @flow
import totalUsers from './totalUsers';
import totalThreads from './totalThreads';
import totalCommunities from './totalCommunities';
import totalThreadMessages from './totalThreadMessages';
import totalDMMessages from './totalDMMessages';
import usersGrowth from './usersGrowth';
import activeUsers from './activeUsers';
import communitiesGrowth from './communitiesGrowth';
import activeCommunities from './activeCommunities';
import threadsGrowth from './threadsGrowth';
import activeThreads from './activeThreads';
import threadMessagesGrowth from './threadMessagesGrowth';
import dmMessagesGrowth from './dmMessagesGrowth';
import coreMetrics from './coreMetrics';

import totalUsersCount from './users/totalCount';
import totalUsersDeleted from './users/totalDeleted';
import totalUsersBanned from './users/totalBanned';
import usersHaveJoinedCommunity from './users/haveJoinedCommunity';
import usersHaveSentMessage from './users/haveSentMessage';
import usersHaveSetUsername from './users/haveSetUsername';
import usersHaveCreatedThread from './users/haveCreatedThread';
import averageUsersCommunitiesJoined from './users/averageCommunitiesJoined';
import averageUsersThreadsCreated from './users/averageThreadsCreated';
import averageUsersMessagesCreated from './users/averageMessagesCreated';
import usersCommunitiesJoinedDistribution from './users/joinedCommunitiesDistribution';
import usersThreadsCreatedDistribution from './users/threadsCreatedDistribution';
import usersMessagesCreatedDistribution from './users/messagesCreatedDistribution';

import totalCommunitiesCount from './communities/totalCount';
import totalCommunitiesDeleted from './communities/totalDeleted';
import communitiesHaveCreatedThread from './communities/haveCreatedThread';
import communitiesHaveImportedSlack from './communities/haveImportedSlack';
import communitiesHaveMoreThanOneMember from './communities/haveMoreThanOneMember';

module.exports = {
  Query: {
    adminOverview: () => ({}),
    adminUsers: () => ({}),
    adminCommunities: () => ({}),
    adminCoreMetrics: () => ({}),
  },
  AdminOverview: {
    totalUsers,
    totalCommunities,
    totalThreads,
    totalDMMessages,
    totalThreadMessages,
    usersGrowth,
    activeUsers,
    communitiesGrowth,
    activeCommunities,
    threadsGrowth,
    activeThreads,
    threadMessagesGrowth,
    dmMessagesGrowth,
    coreMetrics,
  },
  AdminUsers: {
    totalCount: totalUsersCount,
    totalDeleted: totalUsersDeleted,
    totalBanned: totalUsersBanned,
    haveJoinedCommunity: usersHaveJoinedCommunity,
    haveSentMessage: usersHaveSentMessage,
    haveSetUsername: usersHaveSetUsername,
    haveCreatedThread: usersHaveCreatedThread,
    growth: usersGrowth,
    activeUsers: activeUsers,
    averageCommunitiesJoined: averageUsersCommunitiesJoined,
    averageThreadsCreated: averageUsersThreadsCreated,
    averageMessagesCreated: averageUsersMessagesCreated,
    communitiesJoinedDistribution: usersCommunitiesJoinedDistribution,
    threadsCreatedDistribution: usersThreadsCreatedDistribution,
    messagesCreatedDistribution: usersMessagesCreatedDistribution,
  },
  AdminCommunities: {
    totalCount: totalCommunitiesCount,
    totalDeleted: totalCommunitiesDeleted,
    haveCreatedThread: communitiesHaveCreatedThread,
    haveImportedSlack: communitiesHaveImportedSlack,
    haveMoreThanOneMember: communitiesHaveMoreThanOneMember,
    activeCommunities: activeCommunities,
    growth: communitiesGrowth,
  },
};
