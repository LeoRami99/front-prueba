import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../styles/global.css";

import { useColorScheme } from "@/hooks/useColorScheme";

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
			<ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
				<Stack
					screenOptions={{
						headerShadowVisible: false, // iOS
						sheetElevation: 0, // Android
					}}>
					<Stack.Screen name='index' />
					<Stack.Screen name='+not-found' />
				</Stack>
				<StatusBar style='auto' />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
