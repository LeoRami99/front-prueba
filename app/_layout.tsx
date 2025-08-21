import { store } from "@/app/store";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../styles/global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5, // 5 minutes
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
					<Stack
						screenOptions={{
							headerShadowVisible: false, // iOS
							sheetElevation: 0, // Android
						}}>
						<Stack.Screen name='index' />
						<Stack.Screen name='+not-found' />
					</Stack>
					<Toast />
					<StatusBar style='auto' />
				</ThemeProvider>
			</Provider>
		</QueryClientProvider>
	);
}
