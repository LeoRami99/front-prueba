import CarouselComponent from "@/components/CarouselProducts";
import GridProducts from "@/components/GridProducts";
import { Stack } from "expo-router";
import { useCallback, useState, type ComponentType } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const ViewProducstMain = () => {
	const [refreshing, setRefreshing] = useState(false);
	const GridProductsTyped = GridProducts as unknown as ComponentType<{ isRefetchProducts: boolean }>;

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<View className='flex-1 bg-white '>
			<Stack.Screen
				options={{
					contentStyle: { backgroundColor: "white" },
					headerStyle: { backgroundColor: "white" },

					title: "Products",
					// andd button of cart
					// headerRight: () => (
					// 	<View className='flex-row items-center p-4'>
					// 		<Pressable>
					// 			<FontAwesome5 name='shopping-cart' size={24} color='black' />
					// 		</Pressable>
					// 	</View>
					// ),
				}}
			/>
			<View className='container p-2 space-y-4 flex mx-auto max-w-4xl'>
				{/* <Text className='text-2xl'>Products Main View</Text> */}
				<ScrollView
					style={{ marginTop: 10 }}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#9Bd35A", "#689F38"]} />}>
					<CarouselComponent />
					<GridProductsTyped
						isRefetchProducts={refreshing} // Pass the refreshing state to GridProducts
					/>
				</ScrollView>
			</View>
		</View>
	);
};

export default ViewProducstMain;
