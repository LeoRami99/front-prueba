import { api } from "@/lib/axio.api";
import { Transaction } from "@/types/transaction.interface";

export const createTransaction = async (data: Transaction) => {
	try {
		const response = await api.post("/transactions", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};
