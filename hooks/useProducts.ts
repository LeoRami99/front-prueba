import { getAllProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (page: number = 1, pageSize: number = 10, filter?: string) => {
	return useQuery({
		queryKey: ["products", page, pageSize, filter],
		queryFn: () => getAllProducts(page, pageSize, filter),
		staleTime: 1000 * 60 * 5,
	});
};
