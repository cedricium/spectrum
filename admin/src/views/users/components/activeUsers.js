// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getActiveUsersReport from '../../../api/queries/users/activeUsers';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import {
  CardList,
  Divider,
  Spacer,
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
      activeUsers: {
        dailyActive: number,
        weeklyActive: number,
        monthlyActive: number,
        quarterlyActive: number,
      },
    },
  },
};

type Label = {
  key: string,
  value: string,
};

type Timeframe = {
  key: string,
  value: number,
};

type State = {
  labels: Array<Label>,
  timeframes: Array<Timeframe>,
  activeLabel: Label,
  activeTimeframe: Timeframe,
};

const labels = [
  { key: 'DAU', value: 'dau' },
  { key: 'WAU', value: 'wau' },
  { key: 'MAU', value: 'mau' },
];

const timeframes = [
  { key: '7 Days', value: 7 },
  { key: '30 Days', value: 30 },
  { key: '90 Days', value: 90 },
];

class Activity extends React.Component<Props, State> {
  render() {
    const { data, isLoading } = this.props;

    if (data.adminUsers) {
      const {
        totalCount: totalUsers,
        totalDeleted,
        totalBanned,
        activeUsers: {
          dailyActive,
          weeklyActive,
          monthlyActive,
          quarterlyActive,
        },
      } = data.adminUsers;

      const totalCount = totalUsers - totalDeleted - totalBanned;

      return (
        <React.Fragment>
          <CardList>
            <GrowthRow count={dailyActive} label={'Daily'} total={totalCount} />
            <GrowthRow
              count={weeklyActive}
              label={'Weekly'}
              total={totalCount}
            />
            <GrowthRow
              count={monthlyActive}
              label={'Monthly'}
              total={totalCount}
            />
            <GrowthRow
              count={quarterlyActive}
              label={'Quarterly'}
              total={totalCount}
            />
          </CardList>

          <Spacer height={16} />

          <CardSectionTitle>Active users</CardSectionTitle>

          <ActivityChart
            labels={labels}
            fields={labels.map(o => o.value)}
            timeframes={timeframes}
          />

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

export default compose(getActiveUsersReport, viewNetworkHandler)(Activity);
