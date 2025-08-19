import CardProduct from "@/components/CardProduct";
import CarouselComponent from "@/components/CarouselProducts";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Stack } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const ViewProducstMain = () => {
	return (
		<View className='flex-1 bg-white '>
			<Stack.Screen
				options={{
					contentStyle: { backgroundColor: "white" },
					headerStyle: { backgroundColor: "white" },

					title: "Products",
					// andd button of cart
					headerRight: () => (
						<View className='flex-row items-center p-4'>
							<Pressable>
								<FontAwesome5 name='shopping-cart' size={24} color='black' />
							</Pressable>
						</View>
					),
				}}
			/>
			<View className='container p-2 space-y-4 flex mx-auto max-w-4xl'>
				{/* <Text className='text-2xl'>Products Main View</Text> */}
				<ScrollView style={{ marginTop: 10 }}>
					<CarouselComponent />
					<TextInput className=' bg-white border p-4 m-2 rounded-full' placeholder='Buscar Producto' />
					<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, margin: 10 }}>
						{Array(10)
							.fill(0)
							.map((_, index) => (
								<View key={index} style={{ width: "48%", marginBottom: 10 }}>
									<CardProduct />
								</View>
							))}
					</View>
					<View className='flex flex-row justify-center mt-4'>
						<Text className='text-gray-500'>1</Text>
						<Text className='text-gray-500 ml-2'>2</Text>
						<Text className='text-gray-500 ml-2'>3</Text>
						<Text className='text-gray-500 ml-2'>4</Text>
						<Text className='text-gray-500 ml-2'>5</Text>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default ViewProducstMain;
