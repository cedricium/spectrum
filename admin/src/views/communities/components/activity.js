// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getActiveCommunitiesReport from '../../../api/queries/communities/activity';
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
      activeCommunities: {
        dailyActive: number,
        weeklyActive: number,
        monthlyActive: number,
        quarterlyActive: number,
      },
    },
  },
};

class Onboarding extends React.Component<Props> {
  getPercent = (count, comparison) => {
    return Math.round(count / comparison * 100);
  };

  render() {
    const { data, isLoading } = this.props;

    console.log('activity', this.props.data);

    if (data.adminCommunities) {
      const {
        totalCount: totalCommunities,
        totalDeleted,
        activeCommunities: {
          dailyActive,
          weeklyActive,
          monthlyActive,
          quarterlyActive,
        },
      } = data.adminCommunities;

      const totalCount = totalCommunities - totalDeleted;

      return (
        <CardList>
          <GrowthRow count={dailyActive} label={'Daily'} total={totalCount} />
          <GrowthRow count={weeklyActive} label={'Weekly'} total={totalCount} />
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
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    return <ViewError />;
  }
}

export default compose(getActiveCommunitiesReport, viewNetworkHandler)(
  Onboarding
);
