import * as React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../queries/auth';
import { withRouter } from 'react-router';
import { createNewUser } from '../queries/users';
import { changeUsername, changeId, changeEmail } from '../actions/userActions';
import InfoBar from './InfoBar';
import main_picture from '../styles/main_picture.svg';

interface Props {
  id: string;
  history: any;
  isLogged: boolean;
  onChangeUsername: (value: string) => void;
  onChangeId: (value: string) => void;
  onChangeEmail: (value: string) => void;
}

interface State {
  username: string;
  email: string;
  password: string;
  errors: {};
  showErrorBar: boolean;
}

class Home extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    if (props.isLogged == true) {
      this.props.history.push('/yourlists');
    }

    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
      showErrorBar: false,
    };
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    //username
    if (typeof this.state.username !== 'undefined') {
      if (!this.state.username.match(/^[a-zA-Z0-9][a-zA-Z0-9_]+$/)) {
        formIsValid = false;
        errors['username'] = 'Only letters';
      }
    }

    if (this.state.username.length < 6) {
      formIsValid = false;
      errors['username'] = 'At least 6 characters';
    }

    if (this.state.username == '') {
      formIsValid = false;
      errors['username'] = 'Cannot be empty';
    }

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

  async onSubmitClick() {
    this.setState({ showErrorBar: false });
    const isValid = this.handleValidation();
    if (isValid == true) {
      const confirmation: any = await createUser(this.state.email, this.state.password);
      if (confirmation.error != '') {
        console.log(confirmation.error);
        let errors = {};
        errors['query'] = confirmation.error;
        this.setState({ showErrorBar: true, errors: errors });
      } else {
        const userInfo = await createNewUser(this.state.username, this.state.email);
        this.props.onChangeId(userInfo.id);
        this.props.onChangeEmail(this.state.email);
        this.props.onChangeUsername(this.state.username);
        this.setState({ username: '', email: '', password: '' }, () => this.props.history.push('/yourlists'));
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.showErrorBar ? <InfoBar type="error" content={this.state.errors['query']} /> : <div />}
        <div className="home-container">
          <div className="home-left-box">
            <h2>Manage your tasks in a convenient way!</h2>
            <img src={main_picture} className="mainImage" />
          </div>
          <div className="home-right-box">
            <div className="home-label">
              Username <span style={{ color: 'red', fontSize: 15 }}>{this.state.errors['username']}</span>
            </div>
            <input
              type="text"
              name="username-form"
              onChange={(e: any) => this.setState({ username: e.target.value })}
            />
            <div className="home-label">
              Email <span style={{ color: 'red', fontSize: 15 }}>{this.state.errors['email']}</span>
            </div>
            <input type="email" name="email-form" onChange={(e: any) => this.setState({ email: e.target.value })} />
            <div className="home-label">
              Password <span style={{ color: 'red', fontSize: 15 }}>{this.state.errors['password']}</span>
            </div>
            <input type="password" onChange={(e: any) => this.setState({ password: e.target.value })} />
            <button className="home-button-submit" onClick={this.onSubmitClick}>
              Sign Up
            </button>
            <div className="home-terms-label">
              Don't worry. You're not going to receive any emails from us. There is no terms either!
            </div>
          </div>
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
    onChangeId: (value: string) => {
      dispatch(changeId(value));
    },
    onChangeEmail: (value: string) => {
      dispatch(changeEmail(value));
    },
    onChangeUsername: (value: string) => {
      dispatch(changeUsername(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
