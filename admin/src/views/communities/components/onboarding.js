// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getCommunitiesOnboardingReport from '../../../api/queries/communities/onboarding';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import { CardList } from '../../../components/card';
import GrowthRow from '../../../components/card/growthRow';

type Props = {
  ...$Exact<ViewNetworkHandlerType>,
  data: {
    adminCommunities: {
      totalCount: number,
      totalDeleted: number,
      haveCreatedThread: number,
      haveImportedSlack: number,
      haveMoreThanOneMember: number,
    },
  },
};

class Onboarding extends React.Component<Props> {
  getPercent = (count, comparison) => {
    return Math.round(count / comparison * 100);
  };

  render() {
    const { data, isLoading } = this.props;

    console.log('onboarding', this.props.data);

    if (data.adminCommunities) {
      const {
        totalCount: totalCommunities,
        totalDeleted,
        haveCreatedThread,
        haveImportedSlack,
        haveMoreThanOneMember,
      } = data.adminCommunities;

      const totalCount = totalCommunities - totalDeleted;

      return (
        <CardList>
          <GrowthRow
            count={totalCount}
            label={'Community created'}
            total={totalCount}
          />
          <GrowthRow
            count={haveCreatedThread}
            label={'Created a thread'}
            total={totalCount}
          />
          <GrowthRow
            count={haveMoreThanOneMember}
            label={'More than 1 member'}
            total={totalCount}
          />
          <GrowthRow
            count={haveImportedSlack}
            label={'Imported Slack'}
            total={totalCount}
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

export default compose(getCommunitiesOnboardingReport, viewNetworkHandler)(
  Onboarding
);
