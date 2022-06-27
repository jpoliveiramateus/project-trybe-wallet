import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkCurrencies } from '../actions';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import Table from '../components/Table';
import LoginFailed from '../components/LoginFailed';

class Wallet extends React.Component {
  componentDidMount() {
    const { thunkCurrenciesAPI } = this.props;
    thunkCurrenciesAPI();
  }

  render() {
    const { login } = this.props;
    if (login === '') {
      return <LoginFailed />;
    }
    return (
      <>
        <Header />
        <ExpenseForm />
        <Table />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  thunkCurrenciesAPI: () => dispatch(thunkCurrencies()),
});

const mapStateToProps = (state) => ({
  login: state.user.email,
});

Wallet.propTypes = {
  thunkCurrenciesAPI: propTypes.func,
  login: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
