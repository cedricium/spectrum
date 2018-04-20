// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getUsersOnboardingReport from '../../../api/queries/users/onboarding';
import { CardList } from '../../../components/card';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import GrowthRow from '../../../components/card/growthRow';

type Props = {
  ...$Exact<ViewNetworkHandlerType>,
  data: {
    adminUsers: {
      totalCount: number,
      haveJoinedCommunity: number,
      haveSentMessage: number,
      haveSetUsername: number,
      haveCreatedThread: number,
      averageCommunitiesJoined: number,
      averageThreadsPosted: number,
    },
  },
};

class Onboarding extends React.Component<Props> {
  getPercent = (count, comparison) => {
    return Math.round(count / comparison * 100);
  };

  render() {
    const { data, isLoading } = this.props;

    if (data.adminUsers) {
      const {
        totalCount,
        haveJoinedCommunity,
        haveCreatedThread,
        haveSentMessage,
        haveSetUsername,
      } = data.adminUsers;

      return (
        <CardList>
          <GrowthRow
            count={totalCount}
            label={'Total'}
            total={totalCount}
            noPercent
          />

          <GrowthRow
            count={haveSetUsername}
            label={'Have set username'}
            total={totalCount}
          />

          <GrowthRow
            count={haveJoinedCommunity}
            label={'Have created thread'}
            total={haveSetUsername}
          />

          <GrowthRow
            count={haveCreatedThread}
            label={'Have created thread'}
            total={haveJoinedCommunity}
          />

          <GrowthRow
            count={haveSentMessage}
            label={'Have sent message'}
            total={haveJoinedCommunity}
          />
        </CardList>
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    return <ViewError />;
  }
}

export default compose(getUsersOnboardingReport, viewNetworkHandler)(
  Onboarding
);
