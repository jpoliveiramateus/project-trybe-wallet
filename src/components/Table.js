import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { editExpenseAction, removeExpense } from '../actions';
import './Table.css';

class Table extends React.Component {
  deleteExpense = (expense) => {
    const { removeExpenseAction } = this.props;
    removeExpenseAction(expense);
  };

  editExpense = (expense) => {
    const { editExpenseAc } = this.props;
    editExpenseAc(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="wallet-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { currency, exchangeRates } = expense;
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Math.floor(100
                    * (expense.value * exchangeRates[currency].ask)) / 100).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <FaRegEdit
                    data-testid="edit-btn"
                    id="edit-btn"
                    onClick={ () => this.editExpense(expense) }
                  />

                  <FaRegTrashAlt
                    ata-testid="delete-btn"
                    id="delete-btn"
                    onClick={ () => this.deleteExpense(expense) }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseAction: (expensive) => dispatch(removeExpense(expensive)),
  editExpenseAc: (expensive) => dispatch(editExpenseAction(expensive)),
});

Table.propTypes = {
  expenses: propTypes.oneOfType([
    propTypes.number,
    propTypes.string,
    propTypes.array,
    propTypes.object,
  ]).isRequired,
  removeExpenseAction: propTypes.func.isRequired,
  editExpenseAc: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
