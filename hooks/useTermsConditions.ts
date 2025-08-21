import { getTokenTerms } from "@/services/token.terms";
import { useQuery } from "@tanstack/react-query";

export const useGetTermsConditions = () => {
	return useQuery({
		queryKey: ["termsConditions"],
		queryFn: getTokenTerms,
	});
};
