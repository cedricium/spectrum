// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getThreadsGrowthQuery = gql`
  query getUserGrowth {
    adminOverview {
      totalThreads
      activeThreads {
        dailyActive
        weeklyActive
        monthlyActive
        quarterlyActive
      }
      threadsGrowth {
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

const getThreadsGrowthOptions = {
  props: props => ({
    data: {
      total: props.data.adminOverview && props.data.adminOverview.totalThreads,
      growth:
        props.data.adminOverview && props.data.adminOverview.threadsGrowth,
      active:
        props.data.adminOverview && props.data.adminOverview.activeThreads,
    },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
};

export default graphql(getThreadsGrowthQuery, getThreadsGrowthOptions);
