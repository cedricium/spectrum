// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getUsersOverviewReportQuery = gql`
  query getUsersReport {
    adminUsers {
      totalCount
      totalDeleted
      totalBanned
      growth {
        dailyGrowth {
          currentPeriodCount
          previousPeriodCount
          growthRate
        }
        weeklyGrowth {
          currentPeriodCount
          previousPeriodCount
          growthRate
        }
        monthlyGrowth {
          currentPeriodCount
          previousPeriodCount
          growthRate
        }
        quarterlyGrowth {
          currentPeriodCount
          previousPeriodCount
          growthRate
        }
      }
    }
  }
`;

export default graphql(getUsersOverviewReportQuery, {});
