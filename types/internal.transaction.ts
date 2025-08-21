export interface InternalTransaction {
	id: string;
	referenceInternalTransaction: string;
	amount: number;
	status: string;
	idExternalTransaction: string;
	userId: string;
	methodPayment: string;
	productId: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}
