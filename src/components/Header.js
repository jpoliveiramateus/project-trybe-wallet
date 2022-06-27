import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { attTotal } from '../actions';
import wallet from '../images/wallet.jpg';
import './Header.css';

class Header extends React.Component {
  componentDidMount() {
    const { expenses, attTotalAction } = this.props;
    let total = '0.00';
    expenses.forEach((expense) => {
      const { exchangeRates, currency } = expense;
      total = Number(total)
      + (Math.floor(100 * (expense.value * exchangeRates[currency].ask)) / 100);
    });
    attTotalAction(total);
  }

  render() {
    const { email, total } = this.props;
    return (
      <header className="wallet-header">
        <img
          src={ wallet }
          alt="Logo da Carteira"
          className="wallet-img"
        />
        <section className="wallet-info">
          <div className="wallet-user">
            <FaUserCircle />
            <span data-testid="email-field">{email}</span>
          </div>
          <div className="wallet-money">
            <span data-testid="total-field">{total}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.infos.total,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  attTotalAction: (total) => dispatch(attTotal(total)),
});

Header.propTypes = {
  email: propTypes.string,
  total: propTypes.number,
  attTotalAction: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
