import React from 'react';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  componentWillMount() {
    this.props.unsetAuth();
  }
  render() {
    return (
      <div>You have logged out. <Link to="/datasets">Go back to front</Link> or <Link to="/datasets/login">Login again</Link>.</div>
    );
  }
}
