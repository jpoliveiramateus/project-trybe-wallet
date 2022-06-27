import { combineReducers } from 'redux';

import user from './user';
import { walletReducer, totalPriceReducer } from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ user,
  wallet: walletReducer,
  infos: totalPriceReducer });

export default rootReducer;
