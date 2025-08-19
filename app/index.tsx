import CardProduct from "@/components/CardProduct";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const ViewProducstMain = () => {
	return (
		<>
			<Stack.Screen options={{ title: "Products" }} />
			<View className='container p-2'>
				<Text className='text-2xl'>Products Main View</Text>
				<CardProduct />
			</View>
		</>
	);
};
export default ViewProducstMain;
