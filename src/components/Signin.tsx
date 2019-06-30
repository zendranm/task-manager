import * as React from 'react';
import { signIn } from '../queries/auth';

interface Props {
  history: any;
}

interface State {
  email: string;
  password: string;
}

class Signin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  onSignInClick() {
    signIn(this.state.email, this.state.password);
    this.props.history.push('/yourlists');
    this.setState({ email: '', password: '' });
  }

  render() {
    return (
      <div className="signin-container">
        <div className="signin-label">Email</div>
        <input type="email" onChange={(e: any) => this.setState({ email: e.target.value })} />
        <div className="signin-label">Password</div>
        <input type="password" onChange={(e: any) => this.setState({ password: e.target.value })} />
        <div className="signin-button-submit" onClick={this.onSignInClick}>
          Sign In
        </div>
      </div>
    );
  }
}
import { withRouter } from 'react-router';
export default withRouter(Signin);
