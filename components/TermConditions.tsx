import { setStep } from "@/features/steps/steps.slice";
import { setAccepted } from "@/features/terms/terms.slice";
import { useGetTermsConditions } from "@/hooks/useTermsConditions";
import { Linking, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

const TermsConditions = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading, isError } = useGetTermsConditions();

	// const router = useRouter();

	if (isLoading) return <Text>Loading...</Text>;
	if (isError) return <Text>Error loading terms and conditions</Text>;

	const handleAcceptTerms = () => {
		try {
			dispatch(setAccepted(data?.data.presigned_acceptance.acceptance_token));
			Toast.show({
				type: "success",
				text1: "Terms and conditions accepted",
			});
			dispatch(setStep(3));
		} catch {
			Toast.show({
				type: "error",
				text1: "Failed to accept terms and conditions",
			});
		}
	};

	const viewLink = () => {
		if (data?.data.presigned_acceptance.permalink) {
			Linking.openURL(data.data.presigned_acceptance.permalink).catch(() => {
				Toast.show({
					type: "error",
					text1: "Failed to open terms and conditions link",
				});
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Terms and conditions link is not available",
			});
		}
	};

	return (
		<View className='flex-1 items-center justify-center p-6 bg-white'>
			<Pressable onPress={viewLink} className='mb-4'>
				<Text className='text-blue-600 underline text-lg font-medium'>View Terms and Conditions</Text>
			</Pressable>
			<Text className='text-base text-center mb-2 text-gray-700'>
				For your security, please read and accept the terms and conditions before proceeding.
			</Text>
			<Text className='text-base text-center mb-6 text-gray-700'>Tap the button below to accept the terms and conditions.</Text>
			<Pressable className='bg-blue-600 px-6 py-3 rounded-lg w-full max-w-xs' onPress={handleAcceptTerms}>
				<Text className='text-white text-lg font-semibold text-center'>Accept Terms</Text>
			</Pressable>
		</View>
	);
};

export default TermsConditions;
