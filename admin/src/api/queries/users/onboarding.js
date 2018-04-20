// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getUsersOnboardingReportQuery = gql`
  query getUsersOnboardingReport {
    adminUsers {
      totalCount
      haveJoinedCommunity
      haveSentMessage
      haveSetUsername
      haveCreatedThread
      averageCommunitiesJoined
      averageThreadsCreated
    }
  }
`;

export default graphql(getUsersOnboardingReportQuery, {});
