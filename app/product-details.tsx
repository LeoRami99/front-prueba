import { selectProduct } from "@/features/selectors";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setTransaction } from "@/features/transaction/transaction.slice";
import Toast from "react-native-toast-message";
import type { AppDispatch } from "./store";

const ProductDetails = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const product = useSelector(selectProduct);
	const [quantity, setQuantity] = useState("1");

	if (!product) {
		return (
			<View className='flex-1 items-center justify-center'>
				<Text className='text-2xl'>No product selected</Text>
			</View>
		);
	}

	// amount: number;
	// userId: string;
	// methodPayment: string;
	// productId: string;
	// price: number;
	// installments: number;
	const handleCheckIn = () => {
		if (parseInt(quantity) <= 0 || isNaN(parseInt(quantity))) {
			Toast.show({
				type: "error",
				text1: "Invalid quantity",
			});
			return;
		}
		if (parseInt(quantity) > (product.stock ?? 0) || (product.stock ?? 0) === 0) {
			Toast.show({
				type: "error",
				text1: "Quantity exceeds available stock",
			});
			return;
		}
		const transaction = {
			name: product.name,
			amount: parseInt(quantity),
			userId: "1087a9cf-e12e-4c95-afd0-964737b3df59",
			methodPayment: "CARD",
			productId: product.id as string,
			price: product.price,
			installments: 1,
		};
		dispatch(setTransaction({ ...transaction }));

		router.push("/check-in");
	};

	return (
		<View className='flex-1 bg-white'>
			<Stack.Screen
				options={{
					contentStyle: { backgroundColor: "white" },
					headerStyle: { backgroundColor: "white" },
					title: `Product Details ${product.name}`,
				}}
			/>
			<View className='flex-1 px-4 py-6'>
				<View
					style={{
						alignItems: "center",
						marginBottom: 24,
					}}>
					<Image
						source={{ uri: product.image }}
						style={{
							width: 220,
							height: 220,
							borderRadius: 16,
							backgroundColor: "#f3f3f3",
						}}
						resizeMode='contain'
					/>
				</View>
				<Text className='text-3xl font-bold mb-2'>{product.name}</Text>
				<Text className='text-base text-gray-600 mb-4'>{product.description}</Text>
				<View className='flex-row justify-between mb-2'>
					<Text className='text-lg font-semibold text-green-700'>Price:</Text>
					<Text className='text-lg font-bold'>${product.price}</Text>
				</View>
				<View className='flex-row justify-between mb-2'>
					<Text className='text-base text-gray-700'>Stock:</Text>
					<Text className='text-base'>{product.stock}</Text>
				</View>
				<View className='flex-row justify-between mb-6'>
					<Text className='text-base text-gray-700'>Category:</Text>
					<Text className='text-base'>{product.category}</Text>
				</View>
				<View className='flex-row items-center mb-6'>
					<Text className='mr-2 text-base'>Quantity:</Text>
					<TextInput
						style={{
							borderWidth: 1,
							borderColor: "#ccc",
							paddingVertical: 6,
							paddingHorizontal: 12,
							width: 70,
							borderRadius: 8,
							backgroundColor: "#fafafa",
							fontSize: 16,
						}}
						keyboardType='numeric'
						value={quantity}
						onChangeText={setQuantity}
					/>
				</View>
				<Pressable className='bg-blue-600 rounded-lg py-3 px-6 items-center' android_ripple={{ color: "#fff" }} onPress={handleCheckIn}>
					<Text className='text-white text-lg font-semibold'>Buy Now</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default ProductDetails;
