import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signIn } from '../queries/auth';

interface Props {
  history: any;
  isLogged: boolean;
}

interface State {
  email: string;
  password: string;
}

class Signin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    if (props.isLogged == true) {
      console.log('Przekieruj');
      this.props.history.push('/yourlists');
    }

    this.state = {
      email: '',
      password: '',
    };
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  async onSignInClick() {
    const confirmation = await signIn(this.state.email, this.state.password);

    if (confirmation == null) {
      console.log('error');
    } else {
      //Tu dodać wczytywanie do stora emaila (confirmation) i imienia
      this.setState({ email: '', password: '' }, () => this.props.history.push('/yourlists'));
    }
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

function mapPropsToState(state: any) {
  return {
    isLogged: state.userReducer.isLogged,
  };
}

export default connect(mapPropsToState)(withRouter(Signin));
