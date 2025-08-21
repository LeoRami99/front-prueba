import { createTransaction } from "@/services/transaction.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateTransaction = () => {
	return useMutation({
		mutationFn: createTransaction,
	});
};
