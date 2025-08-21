import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TransactionState = {
	name: string;
	amount: number;
	userId: string;
	methodPayment: string;
	productId: string;
	price: number;
	installments: number;
};

const initialState: TransactionState = {
	name: "",
	amount: 0,
	userId: "",
	methodPayment: "",
	productId: "",
	price: 0,
	installments: 0,
};

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		setTransaction: (state, action: PayloadAction<TransactionState>) => {
			state.name = action.payload.name;
			state.amount = action.payload.amount;
			state.userId = action.payload.userId;
			state.methodPayment = action.payload.methodPayment;
			state.productId = action.payload.productId;
			state.price = action.payload.price;
			state.installments = action.payload.installments;
		},
		clearTransaction: (state) => {
			state.name = "";
			state.amount = 0;
			state.userId = "";
			state.methodPayment = "";
			state.productId = "";
			state.price = 0;
			state.installments = 0;
		},
	},
});

export const { setTransaction, clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
