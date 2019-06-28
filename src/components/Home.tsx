import * as React from 'react';

class About extends React.Component {
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
          <input type="text" />
          <div className="home-label">Email</div>
          <input type="email" />
          <div className="home-label">Password</div>
          <input type="password" />
          <div className="home-button-submit">Sign Up</div>
          <div className="home-terms-label">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus enim magna.
          </div>
        </div>
      </div>
    );
  }
}

export default About;
