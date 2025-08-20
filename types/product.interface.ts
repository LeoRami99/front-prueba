export interface IProduct {
	id?: string;
	name: string;
	price: number;
	currency: string;
	description?: string;
	image: string;
	category?: string;
	stock?: number;
}
