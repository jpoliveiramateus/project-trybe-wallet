import React from 'react';
import { connect } from 'react-redux';
import propTypes, { string } from 'prop-types';
import { attTotal,
  editedExpenseAction, saveExpense, totalPrice, valueInputs } from '../actions';
import './ExpenseForm.css';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  price: {},
  button: true,
  idExpense: 0,
};

class ExpenseForm extends React.Component {
  state = INITIAL_STATE;

  fetchPrice = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await response?.json();
      if (json) {
        this.setState({ price: json });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = ({ target }) => {
    const { inputValue } = this.props;
    if (inputValue.value) this.setState(inputValue);

    const valueEl = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: valueEl }, this.valuesInputState);
  }

  valuesInputState = () => {
    const { value, description, currency, method, tag } = this.state;
    const objInput = { value, description, currency, method, tag };
    const { inputAction } = this.props;

    if (Number(value) > 0 && description) this.setState({ button: false });
    else this.setState({ button: true });

    inputAction(objInput);
  }

  addExpenseFunc = async () => {
    await this.fetchPrice();

    const { addExpense, sumTotal, inputAction } = this.props;
    const { value, description, currency, method, tag, price, idExpense } = this.state;
    const expense = {
      id: idExpense,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: price,
    };

    const converted = Number(value) * Number(price[currency].ask);
    const valueConverted = (Math.floor(100 * converted) / 100).toFixed(2);

    sumTotal(valueConverted);
    addExpense(expense);

    this.setState((prevState) => ({
      ...INITIAL_STATE,
      idExpense: prevState.idExpense + 1,
    }));

    inputAction(INITIAL_STATE);
  }

  editExpenseFunc = () => {
    const { inputAction, expenses, editedExpense, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const expense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };

    const objEdit = expenses.map((exp) => {
      if (exp.id === idToEdit) {
        exp = { ...exp, ...expense };
      }
      return exp;
    });

    const { attTotalAction } = this.props;
    let total = '0.00';

    objEdit.forEach((expen) => {
      const { exchangeRates } = expen;
      total = Number(total)
      + (Math.floor(100 * (expen.value * exchangeRates[expen.currency].ask)) / 100);
    });

    attTotalAction(total);

    this.setState(INITIAL_STATE);
    inputAction(INITIAL_STATE);
    editedExpense(objEdit);
  }

  render() {
    const { currencies, editor, inputValue } = this.props;
    const { value, description, currency, method, tag } = inputValue;
    const { handleChange, addExpenseFunc, editExpenseFunc } = this;
    const { button } = this.state;
    return (
      <form className="wallet-form">
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
            value={ value }
            onChange={ handleChange }
            name="value"
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            value={ description }
            onChange={ handleChange }
            name="description"
          />
        </label>

        <label htmlFor="currencies">
          Moeda:
          <select
            id="currencies"
            value={ currency }
            onChange={ handleChange }
            name="currency"
          >
            {currencies.map((cur) => <option key={ cur }>{cur}</option>)}
          </select>
        </label>

        <label htmlFor="method-input">
          Metódo de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            value={ method }
            onChange={ handleChange }
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            onChange={ handleChange }
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        {editor ? (
          <button
            type="button"
            disabled={ button }
            onClick={ editExpenseFunc }
            id="wallet-button"
          >
            Editar Despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ addExpenseFunc }
            disabled={ button }
            id="wallet-button"
          >
            Adicionar Despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  inputValue: state.infos.input,
  total: state.infos.total,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(saveExpense(expense)),
  sumTotal: (total) => dispatch(totalPrice(total)),
  inputAction: (obj) => dispatch(valueInputs(obj)),
  editedExpense: (expense) => dispatch(editedExpenseAction(expense)),
  attTotalAction: (total) => dispatch(attTotal(total)),
});

ExpenseForm.propTypes = {
  currencies: propTypes.arrayOf(string),
  addExpense: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
