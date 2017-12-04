import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { AppBar, Toolbar, Tabs, Tab } from 'material-ui';
import logo from './logo.svg';

import Home from 'containers/Home';
import Tralgo from 'containers/Tralgo';
import TralgoEditor from 'containers/TralgoEditor';
//import './style.css';

const NavBar = (props) => {
  function handleRouteChange(event, value) {
    props.changeRoute(value);
  }

  return (
    <AppBar position="static" color="default">
      <img src={logo} className="app-logo" alt="logo" />
      <Tabs
        value={props.location.pathname}
        onChange={handleRouteChange}
        centered
      >
        <Tab label="Home" value="/" />
        <Tab label="Tralgo" value="/tralgo" />
        <Tab label="Editor" value="/editor" />
      </Tabs>
    </AppBar>
  );
};
/*
*/

const mapStateToProps = state => {
  return {
    location: state.router.location
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeRoute: (value) => dispatch(push(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);