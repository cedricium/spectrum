// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getUsersOverviewReport from '../../../api/queries/users/overview';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import {
  CardList,
  Spacer,
  Divider,
  CardSectionTitle,
} from '../../../components/card';
import GrowthRow from '../../../components/card/growthRow';
import ActivityChart from '../../../components/card/activityChart';

type Props = {
  ...$Exact<ViewNetworkHandlerType>,
  data: {
    adminUsers: {
      totalCount: number,
      totalDeleted: number,
      totalBanned: number,
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
  },
};

const timeframes = [
  { key: '7 Days', value: 7 },
  { key: '30 Days', value: 30 },
  { key: '90 Days', value: 90 },
];

class Overview extends React.Component<Props> {
  render() {
    const { data, isLoading } = this.props;

    if (data.adminUsers) {
      const { totalCount, totalDeleted, totalBanned, growth } = data.adminUsers;

      return (
        <React.Fragment>
          <CardList>
            <GrowthRow
              count={totalCount}
              label={'Signed up'}
              total={totalCount}
              noPercent
            />

            <GrowthRow
              count={totalDeleted}
              label={'Deleted'}
              total={totalCount}
            />

            <GrowthRow
              count={totalBanned}
              label={'Banned'}
              total={totalCount}
            />

            <GrowthRow
              count={totalCount - totalDeleted - totalBanned}
              label={'Net'}
              total={totalCount}
            />
          </CardList>

          <Spacer height={16} />
          <CardSectionTitle>Signups</CardSectionTitle>

          <CardList>
            <GrowthRow
              count={growth.dailyGrowth.currentPeriodCount}
              label={'Today'}
              total={totalCount}
              comparison={growth.dailyGrowth.previousPeriodCount}
            />
            <GrowthRow
              count={growth.weeklyGrowth.currentPeriodCount}
              label={'Week'}
              total={totalCount}
              comparison={growth.weeklyGrowth.previousPeriodCount}
            />
            <GrowthRow
              count={growth.monthlyGrowth.currentPeriodCount}
              label={'Month'}
              total={totalCount}
              comparison={growth.monthlyGrowth.previousPeriodCount}
            />
            <GrowthRow
              count={growth.quarterlyGrowth.currentPeriodCount}
              label={'Quarter'}
              total={totalCount}
              comparison={growth.quarterlyGrowth.previousPeriodCount}
            />
            <GrowthRow count={totalCount} label={'Total'} noPercent />
          </CardList>

          <Spacer height={16} />
          <CardSectionTitle>Signups</CardSectionTitle>

          <ActivityChart fields={['users']} timeframes={timeframes} />

          <Divider />
        </React.Fragment>
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    return <ViewError />;
  }
}

export default compose(getUsersOverviewReport, viewNetworkHandler)(Overview);
