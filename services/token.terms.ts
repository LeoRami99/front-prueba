import axios from "axios";
import Constants from "expo-constants";
const token = Constants.expoConfig?.extra?.PUBLIC_KEY as string;
const apiUrl = Constants.expoConfig?.extra?.API_EXTERNAL as string;
export const getTokenTerms = async () => {
	try {
		const response = await axios.get(`${apiUrl}/${token}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
