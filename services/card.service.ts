import { api } from "@/lib/axio.api";

export const getTokenCard = async (number: string, cvc: string, exp_month: string, exp_year: string, card_holder: string) => {
	const response = await api.post("/cards/token", {
		number,
		cvc,
		exp_month,
		exp_year,
		card_holder,
	});
	return response.data;
};
