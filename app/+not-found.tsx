import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops! not found" }} />

			<View className='flex-1 items-center justify-center'>
				<Text>404 - Not Found</Text>
				<Link href='/' className='text-blue-500 mt-4'>
					Go to Home
				</Link>
			</View>
		</>
	);
}
