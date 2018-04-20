// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getActiveCommunitiesReportQuery = gql`
  query getActiveCommunitiesReport {
    adminCommunities {
      totalCount
      totalDeleted
      activeCommunities {
        dailyActive
        weeklyActive
        monthlyActive
        quarterlyActive
      }
    }
  }
`;

export default graphql(getActiveCommunitiesReportQuery, {});
