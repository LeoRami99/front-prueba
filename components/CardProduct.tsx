import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image, Pressable, Text, View } from "react-native";

const CardProduct = () => {
	return (
		<View className='bg-white rounded-2xl h-[280px] border border-gray-200 min:w-1/2 relative'>
			<Image
				source={{ uri: "https://cdn.pixabay.com/photo/2025/03/13/10/50/fall-9467534_1280.jpg" }}
				className='w-full h-full rounded-2xl absolute'
			/>
			<View className='p-4 min:h-[280px] rounded-2xl w-full h-full justify-between bg-black/50 hover:backdrop-blur-md'>
				<View>
					<Text className='text-2xl font-bold text-white'>Product Name</Text>
					<Text className='text-gray-500 mt-1'>$19.99</Text>
				</View>

				<Pressable className='mt-4 bg-[#1bb1f7] p-2 rounded-2xl flex flex-row w-full justify-center items-center gap-2'>
					<Text className='text-white text-center'>Show</Text>
					<FontAwesome5 name='chevron-right' size={15} color='white' />
				</Pressable>
			</View>
		</View>
	);
};
export default CardProduct;
