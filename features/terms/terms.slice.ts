import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TermsConditionsState = {
	acceptedToken: string;
};

const initialState: TermsConditionsState = {
	acceptedToken: "",
};

const termsSlice = createSlice({
	name: "terms",
	initialState,
	reducers: {
		setAccepted: (state, action: PayloadAction<string>) => {
			state.acceptedToken = action.payload;
		},
		resetTerms: (state) => {
			state.acceptedToken = "";
		},
	},
});

export const { setAccepted, resetTerms } = termsSlice.actions;
export default termsSlice.reducer;
