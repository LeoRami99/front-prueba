import { Image, Text, View } from "react-native";

const CardProduct = () => {
	return (
		<View className='bg-white p-4 rounded-lg shadow-md'>
			<Image source={{ uri: "https://via.placeholder.com/150" }} className='w-full h-32 rounded-lg mb-4' />
			<Text className='text-lg font-semibold'>Product Name</Text>
			<Text className='text-gray-500 mt-1'>$19.99</Text>
		</View>
	);
};
export default CardProduct;
