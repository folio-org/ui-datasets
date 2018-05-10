import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Redirect from 'react-router-dom/Redirect';
import basic from 'basic-authorization-header';

import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const LoginForm = reduxForm({
  form: 'NewDataset',
})(({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="username" placeholder="Username" aria-label="Username" component={TextField} />
    <Field name="password" type="password" placeholder="Password" aria-label="Password" component={TextField} />
    <Button buttonStyle="primary noRadius" type="submit" disabled={submitting}>Login</Button>
  </form>
));

class Login extends React.Component {
  handleSubmit = (data) => {
    const { username, password } = data;
    const { url, headers } = this.props.glint;
    console.log(data);
    fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': basic(username, password)
      },
      body: '{}',
    }).then(res => res.text().then(() => {
      console.log(res)
      if (res.ok) {
        this.props.setAuth(username, password);
        this.setState({ success: username });
      } else {
        this.setState({ fail: true });
      }
    }));
  };

  render() {
    if (this.state && this.state.success) {
      return (
        <Redirect to={`/datasets/${this.state.success}`} />
      );
    }
    return (
      <div style={wrapperStyle}>
        <div>
          <LoginForm onSubmit={this.handleSubmit} />
          {this.state && this.state.fail &&
            <div>Something went wrong, try again.</div>
          }
        </div>
      </div>
    );
  }
}

export default Login;
