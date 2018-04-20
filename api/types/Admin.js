// @flow
const Admin = /* GraphQL */ `
  type PeriodGrowth {
    currentPeriodCount: Int
    previousPeriodCount: Int
    growthRate: Float
  }

  type AdminGrowthData {
    dailyGrowth: PeriodGrowth
    weeklyGrowth: PeriodGrowth
    monthlyGrowth: PeriodGrowth
    quarterlyGrowth: PeriodGrowth
  }

  type AdminActiveData {
    dailyActive: Int
    weeklyActive: Int
    monthlyActive: Int
    quarterlyActive: Int
  }

  type Distribution {
    key: Int
    value: Int
  }

  type AdminOverview {
    # counts
    totalUsers: Int
    totalCommunities: Int
    totalThreads: Int
    totalThreadMessages: Int
    totalDMMessages: Int

    # growth
    usersGrowth: AdminGrowthData
    activeUsers: AdminActiveData
    communitiesGrowth: AdminGrowthData
    activeCommunities: AdminActiveData
    threadsGrowth: AdminGrowthData
    activeThreads: AdminActiveData
    threadMessagesGrowth: AdminGrowthData
    dmMessagesGrowth: AdminGrowthData

    # revenue
    monthly: Int
    paidModeratorSeats: Int
    freeModeratorSeats: Int
    paidPrivateChannels: Int
    freePrivateChannels: Int
    analyticsEnabled: Int
    discountsApplied: Int

    # core metrics
    coreMetrics(timeframe: Int): [CoreMetrics]
  }

  type AdminUsers {
    # counts
    totalCount: Int
    totalDeleted: Int
    totalBanned: Int

    # onboarding
    haveJoinedCommunity: Int
    haveSentMessage: Int
    haveCreatedThread: Int
    haveSetUsername: Int

    # growth
    activeUsers: AdminActiveData
    growth: AdminGrowthData

    # 
    averageCommunitiesJoined: Float
    communitiesJoinedDistribution: [Distribution]
    averageThreadsCreated: Float
    threadsCreatedDistribution: [Distribution]
    averageMessagesCreated: Float
    messagesCreatedDistribution: [Distribution]
  }

  type AdminCommunities {
    # counts
    totalCount: Int
    totalDeleted: Int

    # onboarding
    haveCreatedThread: Int
    haveImportedSlack: Int
    haveMoreThanOneMember: Int

    # growth
    activeCommunities: AdminActiveData
    growth: AdminGrowthData

    # 
    averageThreadsCreated: Float
    averageMembers: Float
    threadsCreatedDistribution: [Distribution]
    membersDistribution: [Distribution]
  }

  extend type Query {
    adminOverview: AdminOverview
    adminUsers: AdminUsers
    adminCommunities: AdminCommunities
    # adminThreads: AdminThreads
    # adminDirectMessageThreads: AdminDirectMessageThreads
    adminCoreMetrics: AdminOverview
  }
`;

module.exports = Admin;
