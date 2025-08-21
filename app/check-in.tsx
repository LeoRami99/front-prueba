import CheckInComponent from "@/components/CheckInComponent";
import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const CheckInScreen = () => {
	return (
		<View className='flex-1 bg-white '>
			<Stack.Screen
				options={{
					contentStyle: { backgroundColor: "white" },
					headerStyle: { backgroundColor: "white" },

					title: "Check In",
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
			<View className='flex-1 items-center justify-center bg-white'>
				<CheckInComponent />
				<Toast />
			</View>
			<Stack.Screen />
		</View>
	);
};
export default CheckInScreen;
