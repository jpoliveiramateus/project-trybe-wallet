import React from 'react';
import { Link } from 'react-router-dom';
import './LoginFailed.css';
import { FaArrowDown } from 'react-icons/fa';

class LoginFailed extends React.Component {
  render() {
    return (
      <div className="login-failed">
        <h1>Login não efetuado!</h1>
        <h3>
          Volte para a página de login
          <FaArrowDown />
        </h3>
        <Link to="/" className="pagelogin-btn">Página de login</Link>
      </div>
    );
  }
}

export default LoginFailed;
