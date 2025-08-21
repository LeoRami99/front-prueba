import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StepsState = {
	step: number;
};

const initialState: StepsState = {
	step: 1,
};

const stepsSlice = createSlice({
	name: "steps",
	initialState,
	reducers: {
		setStep: (state, action: PayloadAction<number>) => {
			state.step = action.payload;
		},
		nextStep: (state) => {
			state.step += 1;
		},
		prevStep: (state) => {
			state.step = Math.max(1, state.step - 1);
		},
		resetSteps: (state) => {
			state.step = 1;
		},
	},
});

export const { setStep, nextStep, prevStep, resetSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
