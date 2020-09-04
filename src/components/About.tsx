import * as React from 'react';
import secondary_picture from '../styles/secondary_picture.svg';

class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <div className="abutText">
          <h1>Hi! I'm very glad you came here</h1>
        </div>
        <div className="abutText">
          <h3>
            This ToDo application was developed simply for learning and fun purposes. It was one of my first steps
            toward becoming becoming Frontend developer and getting to know React framework. It allowed me to put my
            hands on many different technologies and tools and present my skills which right now are on higher level
            than this app shows.
          </h3>
        </div>
        <img src={secondary_picture} className="mainImage" />
      </div>
    );
  }
}

export default About;
