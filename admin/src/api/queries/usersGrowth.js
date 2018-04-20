// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getUserGrowthQuery = gql`
  query getUserGrowth {
    adminOverview {
      totalUsers
      activeUsers {
        dailyActive
        weeklyActive
        monthlyActive
        quarterlyActive
      }
      usersGrowth {
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

const getUserGrowthOptions = {
  props: props => ({
    data: {
      total: props.data.adminOverview && props.data.adminOverview.totalUsers,
      growth: props.data.adminOverview && props.data.adminOverview.usersGrowth,
      active: props.data.adminOverview && props.data.adminOverview.activeUsers,
    },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
};

export default graphql(getUserGrowthQuery, getUserGrowthOptions);
