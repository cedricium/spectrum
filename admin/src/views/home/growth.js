// @flow
import * as React from 'react';
import type { ViewNetworkHandlerType } from '../../components/viewNetworkHandler';
import { Loading } from '../../components/loading';
import ViewError from '../../components/viewError';
import { CardSectionTitle, CardList } from '../../components/card';
import GrowthRow from '../../components/card/growthRow';

type Props = {
  ...$Exact<ViewNetworkHandlerType>,
  data: {
    total: number,
    active?: {
      dailyActive: number,
      weeklyActive: number,
      monthlyActive: number,
      quarterlyActive: number,
    },
    growth: {
      dailyGrowth: {
        currentPeriodCount: number,
        previousPeriodCount: number,
        growthRate: number,
      },
      weeklyGrowth: {
        currentPeriodCount: number,
        previousPeriodCount: number,
        growthRate: number,
      },
      monthlyGrowth: {
        currentPeriodCount: number,
        previousPeriodCount: number,
        growthRate: number,
      },
      quarterlyGrowth: {
        currentPeriodCount: number,
        previousPeriodCount: number,
        growthRate: number,
      },
    },
  },
};

class Growth extends React.Component<Props> {
  render() {
    const { isLoading, hasError, data } = this.props;

    console.log('growth props', this.props.data);

    if (isLoading || !data.growth) {
      return <Loading />;
    }

    if (hasError) {
      return <ViewError />;
    }

    // users growth
    if (data.growth && data.growth !== undefined) {
      return (
        <React.Fragment>
          {data.active && (
            <React.Fragment>
              <CardSectionTitle>Active</CardSectionTitle>

              <CardList>
                <GrowthRow
                  count={data.active.dailyActive}
                  label={'Daily'}
                  total={data.total}
                />
                <GrowthRow
                  count={data.active.weeklyActive}
                  label={'Weekly'}
                  total={data.total}
                />
                <GrowthRow
                  count={data.active.monthlyActive}
                  label={'Monthly'}
                  total={data.total}
                />
                <GrowthRow
                  count={data.active.quarterlyActive}
                  label={'Quarterly'}
                  total={data.total}
                />
              </CardList>
            </React.Fragment>
          )}

          <CardSectionTitle>Created</CardSectionTitle>
          <CardList>
            <GrowthRow
              count={data.growth.dailyGrowth.currentPeriodCount}
              label={'Today'}
              total={data.total}
              comparison={data.growth.dailyGrowth.previousPeriodCount}
            />
            <GrowthRow
              count={data.growth.weeklyGrowth.currentPeriodCount}
              label={'Week'}
              total={data.total}
              comparison={data.growth.weeklyGrowth.previousPeriodCount}
            />
            <GrowthRow
              count={data.growth.monthlyGrowth.currentPeriodCount}
              label={'Month'}
              total={data.total}
              comparison={data.growth.monthlyGrowth.previousPeriodCount}
            />
            <GrowthRow
              count={data.growth.quarterlyGrowth.currentPeriodCount}
              label={'Quarter'}
              total={data.total}
              comparison={data.growth.quarterlyGrowth.previousPeriodCount}
            />
            <GrowthRow count={data.total} label={'Total'} noPercent />
          </CardList>
        </React.Fragment>
      );
    }

    return null;
  }
}

export default Growth;
