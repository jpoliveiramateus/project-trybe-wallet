import React from 'react';
import './NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h3>Not Found</h3>
        <h4>Página não encontrada!</h4>
      </div>
    );
  }
}

export default NotFound;
