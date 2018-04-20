// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from '../../../components/viewNetworkHandler';
import getCommunitiesOverview from '../../../api/queries/communities/overview';
import { Loading } from '../../../components/loading';
import ViewError from '../../../components/viewError';
import { H5, H3 } from '../../../components/type';
import { Divider, Spacer } from '../../../components/card';

type Props = {
  ...$Exact<ViewNetworkHandlerType>,
  data: {
    adminCommunities: {
      totalCount: number,
      totalDeleted: number,
    },
  },
};

class Onboarding extends React.Component<Props> {
  render() {
    const { data, isLoading } = this.props;

    if (data.adminCommunities) {
      return (
        <React.Fragment>
          <H5>Signed up</H5>
          <H3>{data.adminCommunities.totalCount.toLocaleString()}</H3>

          <Spacer height={16} />

          <Spacer height={16} />

          <H5>Deleted</H5>
          <H3>{data.adminCommunities.totalDeleted.toLocaleString()}</H3>

          <Divider />

          <H5>Net</H5>
          <H3>
            {(
              data.adminCommunities.totalCount -
              data.adminCommunities.totalDeleted
            ).toLocaleString()}
          </H3>
        </React.Fragment>
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    return <ViewError />;
  }
}

export default compose(getCommunitiesOverview, viewNetworkHandler)(Onboarding);
