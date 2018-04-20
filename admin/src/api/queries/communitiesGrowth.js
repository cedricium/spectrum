// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getCommunitiesGrowthQuery = gql`
  query getCommunitiesGrowth {
    adminOverview {
      totalCommunities
      activeCommunities {
        dailyActive
        weeklyActive
        monthlyActive
        quarterlyActive
      }
      communitiesGrowth {
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

const getCommunitiesGrowthOptions = {
  props: props => ({
    data: {
      total:
        props.data.adminOverview && props.data.adminOverview.totalCommunities,
      growth:
        props.data.adminOverview && props.data.adminOverview.communitiesGrowth,
      active:
        props.data.adminOverview && props.data.adminOverview.activeCommunities,
    },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
};

export default graphql(getCommunitiesGrowthQuery, getCommunitiesGrowthOptions);
