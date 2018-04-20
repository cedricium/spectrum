// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getActiveUsersReportQuery = gql`
  query getActiveUsersReport {
    adminUsers {
      totalCount
      totalDeleted
      totalBanned
      activeUsers {
        dailyActive
        weeklyActive
        monthlyActive
        quarterlyActive
      }
    }
  }
`;

export default graphql(getActiveUsersReportQuery, {});
