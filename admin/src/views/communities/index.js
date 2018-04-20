// @flow
import * as React from 'react';
import { CardTitle, Card } from '../../components/card';
import { Grid } from './style';
import Onboarding from './components/onboarding';
import Overview from './components/overview';
import Activity from './components/activity';

class Communities extends React.Component<{}> {
  render() {
    return (
      <Grid>
        <Card>
          <CardTitle title={'Overview'} />
          <Overview />
        </Card>

        <Card>
          <CardTitle title={'Onboarding'} />
          <Onboarding />
        </Card>

        <Card>
          <CardTitle title={'Active'} />
          <Activity />
        </Card>
      </Grid>
    );
  }
}

export default Communities;
