// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getUserActivityReportQuery = gql`
  query getActiveUsersReport {
    adminUsers {
      totalCount
      averageCommunitiesJoined
      averageThreadsCreated
      averageMessagesCreated
      communitiesJoinedDistribution {
        key
        value
      }
      threadsCreatedDistribution {
        key
        value
      }
      messagesCreatedDistribution {
        key
        value
      }
    }
  }
`;

export default graphql(getUserActivityReportQuery, {});
