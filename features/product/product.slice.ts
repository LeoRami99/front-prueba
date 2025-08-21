import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
	id?: string;
	name: string;
	price: number;
	currency: string;
	description?: string;
	image: string;
	category?: string;
	stock?: number;
};

const initialState: ProductState = {
	id: "",
	name: "",
	price: 0,
	currency: "",
	description: "",
	image: "",
	category: "",
	stock: 0,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProduct: (state, action: PayloadAction<ProductState>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.price = action.payload.price;
			state.currency = action.payload.currency;
			state.description = action.payload.description;
			state.image = action.payload.image;
			state.category = action.payload.category;
			state.stock = action.payload.stock;
		},
		clearProduct: (state) => {
			state.id = "";
			state.name = "";
			state.price = 0;
			state.currency = "";
			state.description = "";
			state.image = "";
			state.category = "";
			state.stock = 0;
		},
	},
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
