import React from 'react';
import { Link } from 'react-router-dom';
import GlintContext from './GlintContext';

const LoginIndicator = ({ glint }) => {
  if (glint.user) {
    return (
      <span>Logged in as {glint.user}. <Link to="/datasets/logout">Logout?</Link></span>
    );
  }
  return (
    <Link to="/datasets/login">Login.</Link>
  );
};

export default () => (
  <GlintContext.Consumer>
    {glint => <LoginIndicator glint={glint} />}
  </GlintContext.Consumer>
);
