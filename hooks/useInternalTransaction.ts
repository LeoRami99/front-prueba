import { getInternalTransaction } from "@/services/internal.transaction.service";
import { useQuery } from "@tanstack/react-query";

export const useGetInternalTransaction = (id: string) => {
	return useQuery({
		queryKey: ["internalTransaction", id],
		queryFn: () => getInternalTransaction(id),
		enabled: !!id,
	});
};
