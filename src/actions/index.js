// import currenciesAPI from '../services/currenciesAPI';

// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const receivedCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES,
  payload: {
    currencies,
  },
});

export const thunkCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response?.json();
    if (json) {
      const initialsCurrency = Object
        .keys(json).filter((currency) => currency !== 'USDT');

      dispatch(receivedCurrencies(initialsCurrency));
    }
  } catch (error) {
    console.log(error);
  }
};

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: {
    expense,
  },
});

export const TOTAL_PRICE = 'TOTAL_PRICE';

export const totalPrice = (price) => ({
  type: TOTAL_PRICE,
  payload: {
    price,
  },
});

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: {
    expense,
  },
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpenseAction = (expense) => ({
  type: EDIT_EXPENSE,
  payload: {
    expense,
  },
});

export const ATT_TOTAL = 'ATT_TOTAL';

export const attTotal = (total) => ({
  type: ATT_TOTAL,
  payload: {
    total,
  },
});

export const VALUE_INPUTS = 'VALUE_INPUTS';

export const valueInputs = (value) => ({
  type: VALUE_INPUTS,
  payload: {
    value,
  },
});

export const EDITED_EXPENSE = 'EDITED_EXPENSE';

export const editedExpenseAction = (expenseEdited) => ({
  type: EDITED_EXPENSE,
  payload: {
    expenseEdited,
  },
});
