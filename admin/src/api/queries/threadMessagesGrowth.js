// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getThreadMessagesGrowthQuery = gql`
  query getThreadMessagesGrowth {
    adminOverview {
      totalThreadMessages
      threadMessagesGrowth {
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

const getThreadMessagesGrowthOptions = {
  props: props => ({
    data: {
      total:
        props.data.adminOverview &&
        props.data.adminOverview.totalThreadMessages,
      growth:
        props.data.adminOverview &&
        props.data.adminOverview.threadMessagesGrowth,
    },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
};

export default graphql(
  getThreadMessagesGrowthQuery,
  getThreadMessagesGrowthOptions
);
