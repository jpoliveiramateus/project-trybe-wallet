import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import './Login.css';
import wallet from '../images/wallet.jpg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    button: true,
  }

  handleChange = ({ target }) => {
    const { loginValidation } = this;
    this.setState({
      [target.name]: target.value,
    }, loginValidation);
  }

  loginValidation = () => {
    const { email, password } = this.state;
    const emailValidation = /\S+@\S+\.\S+/;
    const minCharacters = 5;
    if (emailValidation.test(email) && password.length > minCharacters) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  // Regex usado para validação de email:
  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/

  saveEmailInGlobalState = () => {
    const { history, saveEmailState } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    saveEmailState(email);
  };

  render() {
    const { email, password, button } = this.state;
    const { handleChange, saveEmailInGlobalState } = this;
    // console.log(history);
    return (
      <div className="login">
        <div className="login-form">
          <h2>LOGIN</h2>
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            onChange={ handleChange }
          />
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ handleChange }
          />
          <button
            type="button"
            disabled={ button }
            onClick={ saveEmailInGlobalState }
          >
            Entrar
          </button>
        </div>
        <div className="login-img">
          <img src={ wallet } alt="wallet" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmailState: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  history: propTypes.oneOfType([
    propTypes.number,
    propTypes.string,
    propTypes.func,
    propTypes.array,
    propTypes.bool,
    propTypes.object,
  ]),
  saveEmailState: propTypes.func,
}.isRequired;

// Documentação utilizada para validação de props:
// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html

export default connect(null, mapDispatchToProps)(Login);
