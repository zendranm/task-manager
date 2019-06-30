import * as React from 'react';
import { createUser } from '../queries/auth';
import { withRouter } from 'react-router';

interface Props {
  history: any;
}

interface State {
  username: string;
  email: string;
  password: string;
}

class Home extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick() {
    createUser(this.state.email, this.state.password);
    this.props.history.push('/yourlists');
    this.setState({ username: '', email: '', password: '' });
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
          <input type="text" onChange={(e: any) => this.setState({ username: e.target.value })} />
          <div className="home-label">Email</div>
          <input type="email" onChange={(e: any) => this.setState({ email: e.target.value })} />
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

export default withRouter(Home);
