// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ATT_TOTAL,
  FETCH_CURRENCIES,
  REMOVE_EXPENSE,
  SAVE_EXPENSE,
  TOTAL_PRICE, EDIT_EXPENSE, VALUE_INPUTS, EDITED_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action?.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses
        .filter((exp) => JSON.stringify(exp) !== JSON.stringify(action.payload.expense)),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.expense.id,
    };
  case EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: action.payload.expenseEdited,
    };
  default:
    return state;
  }
};

const INITIAL_STATE_TOTAL = {
  total: '0.00',
  input: {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    button: true,
  },
};

export const totalPriceReducer = (state = INITIAL_STATE_TOTAL, action) => {
  switch (action?.type) {
  case VALUE_INPUTS:
    return {
      ...state,
      input: action.payload.value,
    };
  case TOTAL_PRICE:
    return {
      ...state,
      total: (Number(state.total) + Number(action.payload.price)).toFixed(2),
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      input: { value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        price: {},
        button: true,
        idExpense: 0,
      },
      total: (Number(state.total)
      - (Math.floor(100
      * (Number(action.payload.expense.exchangeRates[action.payload.expense.currency].ask)
      * Number(action.payload.expense.value))) / 100)).toFixed(2),
    };
  case ATT_TOTAL:
    return {
      ...state,
      total: action.payload.total,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      input: action.payload.expense,
    };
  default:
    return state;
  }
};
