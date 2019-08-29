import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signIn } from '../queries/auth';
import { changeUsername, changeId, changeEmail } from '../actions/userActions';
import InfoBar from './InfoBar';

interface Props {
  id: string;
  history: any;
  isLogged: boolean;
  onUsernameChange: (value: string) => void;
  onIdChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

interface State {
  email: string;
  password: string;
  errors: {};
  showErrorBar: boolean;
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
      errors: {},
      showErrorBar: false,
    };
    this.onSignInClick = this.onSignInClick.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    //email
    if (typeof this.state.email !== 'undefined') {
      let lastAtPos = this.state.email.lastIndexOf('@');
      let lastDotPos = this.state.email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf('@@') == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors['email'] = 'Email is not valid';
      }
    }

    if (this.state.email == '') {
      formIsValid = false;
      errors['email'] = 'Cannot be empty';
    }

    //password
    if (typeof this.state.password !== 'undefined') {
      if (!this.state.password.match(/^[a-zA-Z0-9][a-zA-Z0-9_]+$/)) {
        formIsValid = false;
        errors['password'] = 'Only alphanumeric characters';
      }
    }

    if (this.state.password.length < 6) {
      formIsValid = false;
      errors['password'] = 'At least 6 characters';
    }

    if (this.state.password == '') {
      formIsValid = false;
      errors['password'] = 'Cannot be empty';
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async onSignInClick() {
    this.setState({ showErrorBar: false });
    const isValid = this.handleValidation();

    if (isValid == true) {
      const confirmation: any = await signIn(this.state.email, this.state.password);

      if (confirmation.error != '') {
        console.log('error');
        let errors = {};
        errors['query'] = confirmation.error;
        this.setState({ showErrorBar: true, errors: errors });
      } else {
        this.props.onUsernameChange(confirmation.userData.username);
        this.props.onIdChange(confirmation.userData.id);
        this.props.onEmailChange(confirmation.userData.email);
        this.setState({ email: '', password: '' }, () => this.props.history.push('/yourlists'));
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.showErrorBar ? <InfoBar type="error" content={this.state.errors['query']} /> : <div />}
        <div className="signin-container">
          <div className="signin-label">
            Email <span style={{ color: 'red', fontSize: 15 }}>{this.state.errors['email']}</span>
          </div>
          <input type="email" name="email-form" onChange={(e: any) => this.setState({ email: e.target.value })} />
          <div className="signin-label">
            Password <span style={{ color: 'red', fontSize: 15 }}>{this.state.errors['password']}</span>
          </div>
          <input type="password" onChange={(e: any) => this.setState({ password: e.target.value })} />
          <button className="signin-button-submit" onClick={this.onSignInClick}>
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    id: state.userReducer.id,
    isLogged: state.userReducer.isLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onIdChange: (value: string) => {
      dispatch(changeId(value));
    },
    onEmailChange: (value: string) => {
      dispatch(changeEmail(value));
    },
    onUsernameChange: (value: string) => {
      dispatch(changeUsername(value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signin));
