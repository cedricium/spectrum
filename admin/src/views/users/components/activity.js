// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getUsersActivityReport from '../../../api/queries/users/activity';
import { CardList, Spacer, CardSectionTitle } from '../../../components/card';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import CountRow from '../../../components/card/countRow';
import ActivityChart from '../../../components/card/activityChart';
import TabBar from '../../../components/card/tabBar';
import { bucketDistributions } from '../helpers/bucketDistributions';

type Distribution = {
  key: number,
  value: number,
};

type Props = {
  ...$Exact<ViewNetworkHandlerType>,
  data: {
    adminUsers: {
      totalCount: number,
      averageCommunitiesJoined: number,
      averageThreadsCreated: number,
      averageMessagesCreated: number,
      communitiesJoinedDistribution: Array<Distribution>,
      threadsCreatedDistribution: Array<Distribution>,
      messagesCreatedDistribution: Array<Distribution>,
    },
  },
};

type Label = {
  key: string,
  value: string,
};

type State = {
  activeDataSet: Label,
};

const labels = [
  { key: 'Communities per user', value: 'cpu' },
  { key: 'Threads per user', value: 'tpu' },
  { key: 'Messages per user', value: 'mpu' },
];

const timeframes = [
  { key: '7 Days', value: 7 },
  { key: '30 Days', value: 30 },
  { key: '90 Days', value: 90 },
];

const distributionLabels = [
  { key: 'Communities joined', value: 'communitiesJoinedDistribution' },
  { key: 'Threads created', value: 'threadsCreatedDistribution' },
  { key: 'Messages created', value: 'messagesCreatedDistribution' },
];

class Onboarding extends React.Component<Props, State> {
  state = {
    activeDataSet: distributionLabels[0],
  };

  switchDataSet = (label: string) => {
    return this.setState({
      activeDataSet: distributionLabels.find(o => o.key === label),
    });
  };

  render() {
    const { data, isLoading } = this.props;
    const { activeDataSet } = this.state;

    console.log('ACTIVITY', data);
    console.log('ACTIVITY STATE', this.state);
    if (data.adminUsers) {
      const {
        averageCommunitiesJoined,
        averageThreadsCreated,
        averageMessagesCreated,
      } = data.adminUsers;

      return (
        <React.Fragment>
          <CardList>
            <CountRow
              count={averageCommunitiesJoined}
              label={'Average communities per user'}
            />

            <CountRow
              count={averageThreadsCreated}
              label={'Average threads per user'}
            />

            <CountRow
              count={averageMessagesCreated}
              label={'Average messages per user'}
            />
          </CardList>

          <Spacer height={16} />

          <CardSectionTitle>Activity</CardSectionTitle>

          <ActivityChart
            labels={labels}
            fields={labels.map(o => o.value)}
            timeframes={timeframes}
          />

          <CardSectionTitle>Distributions</CardSectionTitle>
          <TabBar
            labels={distributionLabels.map(o => o.key)}
            active={activeDataSet.key}
            type="tabs"
            onLabelSelect={label => this.switchDataSet(label)}
          />
          <Spacer height={16} />
          <ResponsiveContainer width="100%" aspect={5.0 / 2.0}>
            <BarChart
              data={bucketDistributions(data.adminUsers[activeDataSet.value])}
            >
              <Bar
                dataKey="value"
                fill="#3B5998"
                name={activeDataSet.key}
                unit={' users'}
              />
              <YAxis hide={true} domain={['dataMin', 'dataMax']} />
              <XAxis dataKey={'key'} hide={true} />
              <Tooltip cursor={false} />
            </BarChart>
          </ResponsiveContainer>
        </React.Fragment>
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    return <ViewError />;
  }
}

export default compose(getUsersActivityReport, viewNetworkHandler)(Onboarding);
