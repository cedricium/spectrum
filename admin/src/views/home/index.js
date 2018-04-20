// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import viewNetworkHandler from '../../components/viewNetworkHandler';
import getUsersGrowth from '../../api/queries/usersGrowth';
import getCommunitiesGrowth from '../../api/queries/communitiesGrowth';
import getThreadsGrowth from '../../api/queries/threadsGrowth';
import getThreadMessagesGrowth from '../../api/queries/threadMessagesGrowth';
import getDMMessagesGrowth from '../../api/queries/dmMessagesGrowth';
import { Grid } from './style';
import { Card, Divider, Spacer, CardTitle } from '../../components/card';
import { TextButton } from '../../components/buttons';
import Link from '../../components/link';
import Growth from './growth';

const UserGrowth = compose(getUsersGrowth, viewNetworkHandler)(Growth);
const CommunityGrowth = compose(getCommunitiesGrowth, viewNetworkHandler)(
  Growth
);
const ThreadsGrowth = compose(getThreadsGrowth, viewNetworkHandler)(Growth);
const ThreadMessagesGrowth = compose(
  getThreadMessagesGrowth,
  viewNetworkHandler
)(Growth);
const DMMessagesGrowth = compose(getDMMessagesGrowth, viewNetworkHandler)(
  Growth
);

class Home extends React.Component<{}> {
  render() {
    return (
      <Grid>
        <Card>
          <CardTitle title={'Users'} />

          <UserGrowth />

          <Divider />
          <Link to={'/users'}>
            <TextButton block color={'text.default'}>
              Users Report &rarr;
            </TextButton>
          </Link>
        </Card>

        <Card>
          <CardTitle title={'Communities'} />

          <CommunityGrowth />

          <Divider />
          <Spacer height={16} />
          <Link to={'/communities'}>
            <TextButton block color={'text.default'}>
              Communities Report &rarr;
            </TextButton>
          </Link>
        </Card>

        <Card>
          <CardTitle title={'Threads'} />

          <ThreadsGrowth />

          <Divider />
          <Spacer height={16} />
          <Link to={'/threads'}>
            <TextButton block color={'text.default'}>
              Threads Report &rarr;
            </TextButton>
          </Link>
        </Card>

        <Card>
          <CardTitle title={'Messages'} />

          <ThreadMessagesGrowth />

          <Divider />
          <Spacer height={16} />
          <Link to={'/messages'}>
            <TextButton block color={'text.default'}>
              Thread Messages Report &rarr;
            </TextButton>
          </Link>
        </Card>

        <Card>
          <CardTitle title={'Direct Messages'} />

          <DMMessagesGrowth />

          <Divider />
          <Spacer height={16} />
          <Link to={'/direct-messages'}>
            <TextButton block color={'text.default'}>
              Direct Messages Report &rarr;
            </TextButton>
          </Link>
        </Card>
      </Grid>
    );
  }
}

export default Home;
