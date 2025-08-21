import type { AppDispatch } from "@/app/store";
import { IVA } from "@/constants/Tax";
import { setInternalTx } from "@/features/internalTx/internalTx.slice";
import { selectAcceptedToken, selectTokenCard, selectTransaction } from "@/features/selectors";
import { setStep } from "@/features/steps/steps.slice";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const ChecPreviousTx = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { mutateAsync: createTransaction, isPending } = useCreateTransaction();
	const transaction = useSelector(selectTransaction);
	const tokenCard = useSelector(selectTokenCard);
	const acceptedToken = useSelector(selectAcceptedToken);

	if (!transaction) {
		return (
			<View>
				<Text>No transaction data available.</Text>
			</View>
		);
	}

	const calculateTotal = (price: number, amount: number) => {
		const subtotal = price * amount;
		const tax = subtotal * IVA;
		return subtotal + tax;
	};
	const onSubmitTransaction = () => {
		if (!tokenCard || !acceptedToken) {
			Toast.show({
				type: "error",
				text1: "Missing required tokens",
			});
			return;
		}
		Toast.show({
			type: "info",
			text1: "Processing transaction...",
		});
		createTransaction({
			token_card: tokenCard,
			acceptance_token: acceptedToken,
			amount: transaction.amount,
			userId: transaction.userId,
			methodPayment: transaction.methodPayment,
			productId: transaction.productId,
			price: transaction.price,
			installments: transaction.installments.toString(),
		})
			.then((res: any) => {
				console.log("Transaction successful:", res.id);
				dispatch(setInternalTx({ id: res.id }));
				Toast.show({
					type: "success",
					text1: "Transaction created successfully",
				});
				dispatch(setStep(4));
			})
			.catch((error) => {
				Toast.show({
					type: "error",
					text1: `Transaction failed: ${error.message}`,
				});
			});
	};

	return (
		<View className='p-4 bg-gray-100 rounded-2xl w-full space-y-4'>
			<Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Resume of before transaction</Text>
			<Text>Producto Name: {transaction.name}</Text>
			<Text>Precio: ${transaction.price.toLocaleString("es-CO")}</Text>
			<Text>Cantidad: {transaction.amount}</Text>
			<Text>Subtotal: ${(transaction.price * transaction.amount).toLocaleString("es-CO")}</Text>
			<Text>IVA (19%): ${(transaction.price * transaction.amount * IVA).toLocaleString("es-CO")}</Text>
			<Text>Total: ${calculateTotal(transaction.price, transaction.amount).toLocaleString("es-CO")}</Text>
			<Text>Método de Pago: {transaction.methodPayment}</Text>
			<Text>Cuotas: {transaction.installments}</Text>
			<Text>Token de Tarjeta: {tokenCard ? "Disponible" : "No Disponible"}</Text>
			<Text>Token de Aceptación de Términos: {acceptedToken ? "Disponible" : "No Disponible"}</Text>

			<Pressable
				className='bg-blue-600 flex items-center p-3 rounded-2xl active:bg-blue-200 mt-10'
				onPress={onSubmitTransaction}
				disabled={isPending}>
				<Text className='text-white text-lg font-semibold text-center' accessibilityLabel='Pay Now'>
					Pay Now
				</Text>
			</Pressable>
		</View>
	);
};

export default ChecPreviousTx;
