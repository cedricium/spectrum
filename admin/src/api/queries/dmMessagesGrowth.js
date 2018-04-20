// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getDMMessagesGrowthQuery = gql`
  query getDMMessagesGrowth {
    adminOverview {
      totalDMMessages
      dmMessagesGrowth {
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

const getDMMessagesGrowthOptions = {
  props: props => ({
    data: {
      total:
        props.data.adminOverview && props.data.adminOverview.totalDMMessages,
      growth:
        props.data.adminOverview && props.data.adminOverview.dmMessagesGrowth,
    },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
};

export default graphql(getDMMessagesGrowthQuery, getDMMessagesGrowthOptions);
