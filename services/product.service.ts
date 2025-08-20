import { api } from "../lib/axio.api";

export const getAllProducts = async (page: number = 1, pageSize: number = 10, filter?: string) => {
	const response = await api.get("/products", {
		params: {
			page,
			pageSize,
			filter,
		},
	});
	return response.data;
};
