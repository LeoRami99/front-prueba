import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image, Pressable, Text, View } from "react-native";

interface CardProductProps {
	product: {
		id?: string;
		name: string;
		price: number;
		currency: string;
		description?: string;
		image: string;
		category?: string;
		stock?: number;
	};
}

const CardProduct = ({ product }: CardProductProps) => {
	return (
		<View className='bg-white rounded-2xl h-[280px] border border-gray-200 min:w-1/2 relative'>
			<Image source={{ uri: product.image }} className='w-full h-full rounded-2xl absolute' />
			<View className='p-4 min:h-[280px] rounded-2xl w-full h-full justify-between bg-black/50 hover:backdrop-blur-md'>
				<View className='relative'>
					<Text className='text-2xl font-bold text-white'>{product.name}</Text>
					<Text className='text-white mt-1 font-semibold bottom-0'>
						{product.price} {product.currency}
					</Text>
					{/* <Text className='text-gray-400 mt-2'>{product.description}</Text> */}
					{/* <Text className='text-gray-400 mt-2'>Category: {product.category}</Text> */}
					<Text className='text-gray-400 mt-2'>Stock: {product.stock}</Text>
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
