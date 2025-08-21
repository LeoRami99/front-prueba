import { api } from "@/lib/axio.api";

export const getInternalTransaction = async (id: string) => {
	const response = await api.get("/transactions/" + id);
	return response.data;
};
