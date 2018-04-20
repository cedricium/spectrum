// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getCommunitiesReportQuery = gql`
  query getCommunitiesReport {
    adminCommunities {
      totalCount
      totalDeleted
    }
  }
`;

export default graphql(getCommunitiesReportQuery, {});
