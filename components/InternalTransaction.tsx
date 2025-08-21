import { selectInternalTx } from "@/features/selectors";
import { useGetInternalTransaction } from "@/hooks/useInternalTransaction";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

const InternalTransaction = () => {
	const internalTxId: string = useSelector(selectInternalTx);

	const { data, isLoading, error, refetch } = useGetInternalTransaction(internalTxId);

	if (!internalTxId) {
		return (
			<View className='flex-1 bg-white'>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-2xl'>No transaction selected.</Text>
					<Pressable className='mt-4' onPress={() => router.replace("/")}>
						<Text className='text-blue-600 text-lg font-bold'>Go to home</Text>
					</Pressable>
				</View>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View className='flex-1 bg-white'>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-2xl'>Loading transaction...</Text>
				</View>
			</View>
		);
	}

	if (error) {
		return (
			<View className='flex-1 bg-white'>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-2xl'>Error loading transaction.</Text>
					<Pressable className='mt-4' onPress={() => refetch()}>
						<Text className='text-blue-600 text-lg font-bold'>Retry</Text>
					</Pressable>
				</View>
			</View>
		);
	}

	if (!data) {
		return (
			<View className='flex-1 bg-white'>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-2xl'>No transaction data available.</Text>
					<Pressable className='mt-4' onPress={() => refetch()}>
						<Text className='text-blue-600 text-lg font-bold'>Refresh</Text>
					</Pressable>
				</View>
			</View>
		);
	}

	return (
		<View className='flex-1 bg-white'>
			<View className='p-6 bg-white rounded-2xl shadow-sm m-4'>
				<Text className='text-2xl font-bold mb-4'>Transaction Details</Text>
				<Text className='text-lg mb-2'>Transaction ID: {data.id}</Text>
				<Text className='text-lg mb-2'>Amount: ${data.amount}</Text>
				<Text className='text-lg mb-2'>Status: {data.status}</Text>
				<Text className='text-lg mb-2'>Created At: {new Date(data.created_at).toLocaleString()}</Text>

				{data.status === "approved" && (
					<>
						<Text className='text-green-600 text-lg font-bold mt-4'>Payment Approved!</Text>
						{/* <Pressable className='mt-4' onPress={() => router.replace("/")}>
							<Text className='text-blue-600 text-lg font-bold'>Go to home</Text>
						</Pressable> */}
					</>
				)}

				<Pressable className='mt-4' onPress={() => refetch()}>
					<Text className='text-blue-600 text-lg font-bold'>Refresh</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default InternalTransaction;
