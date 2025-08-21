import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardTokenReducer from "../features/cardToken/cardToken.slice";
import internalTxReducer from "../features/internalTx/internalTx.slice";
import productReducer from "../features/product/product.slice";
import stepsReducer from "../features/steps/steps.slice";
import termsReducer from "../features/terms/terms.slice";
import transactionReducer from "../features/transaction/transaction.slice";

const rootReducer = combineReducers({
	product: productReducer,
	terms: termsReducer,
	cardToken: cardTokenReducer,
	transaction: transactionReducer,
	steps: stepsReducer,
	internalTx: internalTxReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
