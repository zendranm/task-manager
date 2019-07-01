import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signIn } from '../queries/auth';
import { changeUsername, changeEmail } from '../actions/userActions';

interface Props {
  history: any;
  isLogged: boolean;
  onUsernameChange: any;
  onEmailChange: any;
}

interface State {
  email: string;
  password: string;
}

class Signin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    if (props.isLogged == true) {
      this.props.history.push('/yourlists');
    }

    this.state = {
      email: '',
      password: '',
    };
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  async onSignInClick() {
    const confirmation: any = await signIn(this.state.email, this.state.password);

    if (confirmation == null) {
      console.log('error');
    } else {
      this.props.onUsernameChange(confirmation.username);
      this.props.onEmailChange(this.state.email);
      this.setState({ email: '', password: '' }, () => this.props.history.push('/yourlists'));
    }
  }

  render() {
    return (
      <div className="signin-container">
        <div className="signin-label">Email</div>
        <input type="email" name="email-form" onChange={(e: any) => this.setState({ email: e.target.value })} />
        <div className="signin-label">Password</div>
        <input type="password" onChange={(e: any) => this.setState({ password: e.target.value })} />
        <div className="signin-button-submit" onClick={this.onSignInClick}>
          Sign In
        </div>
      </div>
    );
  }
}

function mapPropsToState(state: any) {
  return {
    isLogged: state.userReducer.isLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onUsernameChange: (value: string) => {
      dispatch(changeUsername(value));
    },
    onEmailChange: (value: string) => {
      dispatch(changeEmail(value));
    },
  };
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withRouter(Signin));
