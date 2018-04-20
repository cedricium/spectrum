// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getHomeQuery = gql`
  query getHome {
    adminOverview {
      totalUsers
      totalCommunities
      totalThreads
      totalThreadMessages
      totalDMMessages
    }
  }
`;

export default graphql(getHomeQuery, {});
