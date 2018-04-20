// @flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getAdminCoreMetricsQuery = gql`
  query getAdminCoreMetrics($timeframe: Int) {
    adminOverview {
      coreMetrics(timeframe: $timeframe) {
        dau
        wau
        mau
        dac
        wac
        mac
        cpu
        mpu
        tpu
        users
        communities
        threads
        dmThreads
        threadMessages
        dmMessages
        date
      }
    }
  }
`;

export const getAdminCoreMetricsOptions = {
  options: ({ timeframe }: { timeframe: number }) => ({
    variables: {
      timeframe,
    },
    fetchPolicy: 'cache-and-network',
  }),
};

export default graphql(getAdminCoreMetricsQuery, getAdminCoreMetricsOptions);
