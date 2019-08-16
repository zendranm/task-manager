import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

library.add(faGhost);

class PageNotFound extends React.Component {
  render() {
    return (
      <div className={'pagenotfound-container'}>
        <div className={'pagenotfound-circle'}>
          <FontAwesomeIcon className={'pagenotfound-ghost'} icon="ghost" size="10x" />
        </div>
        <div className={'pagenotfound-404'}>#404</div>
        <div className={'pagenotfound-text'}>Ups... Seems that this page does not exist.</div>
      </div>
    );
  }
}

export default PageNotFound;
