import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InternalTxState = {
	id: string;
};

const initialState: InternalTxState = {
	id: "",
};

const internalTxSlice = createSlice({
	name: "internalTx",
	initialState,
	reducers: {
		setInternalTx: (state, action: PayloadAction<InternalTxState>) => {
			state.id = action.payload.id;
		},
		clearInternalTx: (state) => {
			state.id = "";
		},
	},
});

export const { setInternalTx, clearInternalTx } = internalTxSlice.actions;
export default internalTxSlice.reducer;
