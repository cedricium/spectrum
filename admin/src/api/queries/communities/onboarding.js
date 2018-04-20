// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getCommunitiesOnboardingReportQuery = gql`
  query getCommunitiesOnboardingReport {
    adminCommunities {
      totalCount
      totalDeleted
      haveCreatedThread
      haveImportedSlack
      haveMoreThanOneMember
    }
  }
`;

export default graphql(getCommunitiesOnboardingReportQuery, {});
