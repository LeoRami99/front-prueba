import { useMutation } from "@tanstack/react-query";

import { getTokenCard } from "@/services/card.service";

export const useGetTokenCard = () => {
	return useMutation({
		mutationFn: (params: { number: string; cvc: string; exp_month: string; exp_year: string; card_holder: string }) =>
			getTokenCard(params.number, params.cvc, params.exp_month, params.exp_year, params.card_holder),
	});
};
