import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import basic from 'basic-authorization-header';

import { modules } from 'stripes-config'; // eslint-disable-line

import Datasets from './Datasets';
import GlintContext from './GlintContext';
import Login from './Login';
import Logout from './Logout';
import LoginIndicator from './LoginIndicator';
import { debug } from 'util';

const moduleConfig = modules.app.filter(app => app.module === '@folio/datasets')[0];
if (!moduleConfig.glint || !moduleConfig.glint.url) {
  throw new Error('Glint URL not configured');
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glint: {
        url: moduleConfig.glint.url,
      }
    };
    if (moduleConfig.glint.debuguser && moduleConfig.glint.debugpass) {
      this.state.glint.headers = {
        Authorization: basic(moduleConfig.glint.debuguser, moduleConfig.glint.debugpass),
      };
      this.state.glint.user = moduleConfig.glint.debuguser;
    }
  }

  setAuth = (username, password) => {
    this.setState({
      glint: {
        ...this.state.glint,
        user: username,
        headers: {
          ...this.state.glint.headers,
          Authorization: basic(username, password),
        }
      }
    });
  }

  unsetAuth = () => {
    this.setState({
      glint: {
        ...this.state.glint,
        user: undefined,
        headers: {
          Authorization: undefined,
        },
      }
    });
  }

  render() {
    return (
      <GlintContext.Provider value={this.state.glint}>
        <Switch>
          <Route
            path={`${this.props.match.path}/login`}
            render={props => <Login setAuth={this.setAuth} glint={this.state.glint} {...props} />}
          />
          <Route
            path={`${this.props.match.path}/logout`}
            render={props => <Logout unsetAuth={this.unsetAuth} {...props} />}
          />
          <Route
            path={`${this.props.match.path}/:user`}
            render={props => <Datasets glint={this.state.glint} stripes={this.props.stripes} {...props} />}
          />
          <Route component={() => (
            <div>
              <div>TODO: listing available datasets from all users</div>
              <div><LoginIndicator /></div>
            </div>
           )}
          />
        </Switch>
      </GlintContext.Provider>
    );
  }
}
