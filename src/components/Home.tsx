import * as React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../queries/auth';
import { withRouter } from 'react-router';
import { createNewUser } from '../queries/queries';
import { changeUsername, changeEmail } from '../actions/userActions';

interface Props {
  history: any;
  isLogged: boolean;
  onUsernameChange: any;
  onEmailChange: any;
}

interface State {
  username: string;
  email: string;
  password: string;
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
    };
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  async onSubmitClick() {
    const confirmation = await createUser(this.state.email, this.state.password);

    if (confirmation == null) {
      console.log('error');
    } else {
      createNewUser(this.state.username, this.state.email);
      this.props.onUsernameChange(this.state.username);
      this.props.onEmailChange(this.state.email);
      this.setState({ username: '', email: '', password: '' }, () => this.props.history.push('/yourlists'));
    }
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-left-box">
          <h2>Lorem ipsum dolor sit amet</h2>Consectetur adipiscing elit. Suspendisse faucibus enim magna, quis
          vestibulum sem pharetra at. Integer posuere lectus eget lobortis facilisis. Aenean a blandit quam. Etiam in
          ipsum elit. Aliquam sed urna a orci convallis pellentesque at sed est.{' '}
        </div>
        <div className="home-right-box">
          <div className="home-label">Username</div>
          <input type="text" name="username-form" onChange={(e: any) => this.setState({ username: e.target.value })} />
          <div className="home-label">Email</div>
          <input type="email" name="email-form" onChange={(e: any) => this.setState({ email: e.target.value })} />
          <div className="home-label">Password</div>
          <input type="password" onChange={(e: any) => this.setState({ password: e.target.value })} />
          <div className="home-button-submit" onClick={this.onSubmitClick}>
            Sign Up
          </div>
          <div className="home-terms-label">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus enim magna.
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
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
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
