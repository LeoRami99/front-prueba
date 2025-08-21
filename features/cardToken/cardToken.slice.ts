import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CardTokenState = {
	tokenCard: string | null;
};

const initialState: CardTokenState = {
	tokenCard: "",
};

const cardTokenSlice = createSlice({
	name: "cardToken",
	initialState,
	reducers: {
		setTokenCard: (state, action: PayloadAction<string>) => {
			state.tokenCard = action.payload;
		},
		clearTokenCard: (state) => {
			state.tokenCard = "";
		},
	},
});

export const { setTokenCard, clearTokenCard } = cardTokenSlice.actions;
export default cardTokenSlice.reducer;
