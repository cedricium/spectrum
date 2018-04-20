// @flow
import * as React from 'react';
import { Card, CardTitle } from '../../components/card';
import { Grid } from './style';
// import Onboarding from './components/onboarding'
// import Overview from './components/overview'
// import ActiveUsers from './components/activeUsers'
import Activity from './components/activity';

class Users extends React.Component<{}> {
  render() {
    return (
      <Grid>
        <Card>
          <CardTitle title={'Activity'} />
          <Activity />
        </Card>
      </Grid>
    );
  }
}

export default Users;

// <Card>
//           <CardTitle title={'Overview'} />
//           <Overview />
//         </Card>

//         <Card>
//           <CardTitle title={'Onboarding'} />
//           <Onboarding />
//         </Card>

//         <Card>
//           <CardTitle title={'Active users'} />
//           <ActiveUsers />
//         </Card>
