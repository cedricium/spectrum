import * as React from 'react';
import { Router, Route, Switch } from 'react-router';
import styled from 'styled-components';
import { history } from './helpers/history';
import ModalRoot from './components/modals/modalRoot';
import Toasts from './components/toasts';
import Users from './views/users';
import Threads from './views/threads';
import Communities from './views/communities';
import Navbar from './views/navbar';
import Home from './views/home';
import PrivateRoute from './utils/routeAuth';

const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: ${props => props.theme.bg.wash};

  @media (max-width: 768px) {
    height: 100vh;
    max-height: ${window.innerHeight}px;
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: auto;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 16px;
`;

class Routes extends React.Component<Props, State> {
  render() {
    return (
      <Router history={history}>
        <Body>
          <Route component={Navbar} />
          <Route component={ModalRoot} />
          <Route component={Toasts} />

          <ContentContainer>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/users/:username" component={Users} />
              <PrivateRoute path="/users" component={Users} />
              <PrivateRoute path="/communities/:slug" component={Communities} />
              <PrivateRoute path="/communities" component={Communities} />
              <PrivateRoute path="/threads" component={Threads} />
            </Switch>
          </ContentContainer>
        </Body>
      </Router>
    );
  }
}

export default Routes;
