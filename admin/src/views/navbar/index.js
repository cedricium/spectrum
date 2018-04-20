import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import { Nav, IconLink, Label } from './style';

class Navbar extends Component {
  render() {
    const url = this.props.location.pathname;
    return (
      <Nav>
        <IconLink data-active={url === '/'} to="/">
          <Label>Home</Label>
        </IconLink>

        <IconLink data-active={url.includes('/users')} to="/users">
          <Label>Users</Label>
        </IconLink>

        <IconLink data-active={url.includes('/communities')} to="/communities">
          <Label>Communities</Label>
        </IconLink>

        <IconLink data-active={url.includes('/threads')} to="/threads">
          <Label>Threads</Label>
        </IconLink>
      </Nav>
    );
  }
}

export default compose(withRouter, connect())(Navbar);
