import { clearTokenCard } from "@/features/cardToken/cardToken.slice";
import { selectStep } from "@/features/selectors";
import { resetSteps } from "@/features/steps/steps.slice";
import { resetTerms } from "@/features/terms/terms.slice";
import { clearTransaction } from "@/features/transaction/transaction.slice";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChecPreviousTx from "./CheckPreviusTx";
import CreditCardValidator from "./CreditCard";
import TermsConditions from "./TermConditions";

import { useRouter } from "expo-router";
import type { AppDispatch } from "../app/store";
import InternalTransaction from "./InternalTransaction";

const CheckInComponent = () => {
	const router = useRouter();
	const steps = useSelector(selectStep);
	const dispatch = useDispatch<AppDispatch>();
	const cancelPayment = () => {
		dispatch(resetSteps());
		dispatch(resetTerms());
		dispatch(clearTokenCard());
		dispatch(clearTransaction());
		router.replace("/");
	};

	if (!steps) {
		return (
			<View className='flex-1 items-center justify-center'>
				<Text className='text-2xl'>No step selected</Text>
			</View>
		);
	}

	return (
		<>
			{steps === 1 && (
				<View>
					<CreditCardValidator />
				</View>
			)}
			{steps === 2 && (
				<View>
					<TermsConditions />
				</View>
			)}
			{steps === 3 && (
				<View className='p-6 bg-white rounded-2xl shadow-sm m-4 flex items-center justify-center'>
					<Text className='text-2xl font-bold mb-2 text-center'>Review & Confirm</Text>
					<Text className='text-base mb-4 text-center text-gray-700'>
						Please review your information before proceeding with the payment.
					</Text>
					<ChecPreviousTx />
					<Pressable
						className='bg-red-600 p-3 rounded-2xl mt-6 active:bg-red-700 w-[300px]'
						accessibilityLabel='Pay Now'
						onPress={cancelPayment}>
						<Text className='text-white text-lg font-semibold text-center'>Cancel</Text>
					</Pressable>
				</View>
			)}
			{steps === 4 && (
				<View className='flex-1 items-center justify-center'>
					<InternalTransaction />
				</View>
			)}
		</>
	);
};

export default CheckInComponent;
