import { useGetProducts } from "@/hooks/useProducts";
import { IProduct } from "@/types/product.interface";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import CardProduct from "./CardProduct";
import CardProductSkeleton from "./loaders/CardProductSkeleton";

type Props = {
	isRefetchProducts?: boolean;
};

const Index = ({ isRefetchProducts = false }: Props) => {
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [pageSize, setPageSize] = useState(10);

	const { data: productsData, isLoading, isError, refetch } = useGetProducts(page, pageSize, filter);

	const handleFilterChange = (text: string) => {
		setFilter(text);
		setPage(1);
	};

	useEffect(() => {
		if (isRefetchProducts) {
			refetch();
		}
	}, [isRefetchProducts, refetch]);

	const totalPages = Math.max(1, Math.ceil((productsData?.total ?? 0) / pageSize));

	return (
		<View>
			<TextInput
				className=' bg-white border p-4 m-2 rounded-full'
				placeholder='Buscar Producto'
				onChangeText={handleFilterChange}
				value={filter}
			/>

			<View className='m-2'>
				<Text className='mb-1 text-gray-700'>Page Size</Text>
				<View className='flex-row flex-wrap'>
					{[10, 20, 30, 50, 100].map((size) => (
						<Pressable
							key={size}
							onPress={() => {
								if (pageSize !== size) {
									setPageSize(size);
									setPage(1);
									refetch();
								}
							}}
							className={`mr-2 mb-2 px-3 py-1.5 rounded-full border ${
								pageSize === size ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
							}`}>
							<Text className={pageSize === size ? "text-white" : "text-gray-700"}>{size}</Text>
						</Pressable>
					))}
				</View>
			</View>

			<View className='flex-row items-center justify-between m-2 p-2'>
				<View className='w-1/2 '></View>
			</View>

			<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, margin: 10 }}>
				{isLoading &&
					Array(4)
						.fill(0)
						.map((_, index) => (
							<View key={index} style={{ width: "48%", marginBottom: 10 }}>
								<CardProductSkeleton />
							</View>
						))}

				{!isLoading &&
					!isError &&
					productsData?.products?.map((product: IProduct) => (
						<View key={product.id} style={{ width: "48%", marginBottom: 10 }}>
							<CardProduct product={product} />
						</View>
					))}
			</View>

			{!isLoading && productsData?.products?.length === 0 && <Text className='text-gray-500 text-center'>No products found</Text>}

			{isError && <Text className='text-red-500 text-center'>Error loading products</Text>}

			<View className='flex-row items-center justify-center mt-6'>
				<Pressable
					onPress={() => setPage((p) => Math.max(1, p - 1))}
					disabled={page === 1}
					className='px-4 py-2 rounded-full border border-gray-300 bg-white mx-1 disabled:opacity-50'>
					<Text className='text-gray-700'>Previous</Text>
				</Pressable>

				<View className='flex-row items-center mx-2'>
					<Pressable
						key={`page-${page}`}
						onPress={() => setPage(page)}
						className={`mx-1 px-3 py-1.5 rounded-full border border-gray-300 ${page === page ? "bg-blue-500" : "bg-white"}`}>
						<Text className='text-white'>{page}</Text>
					</Pressable>
				</View>

				<Pressable
					onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
					disabled={page >= totalPages}
					className='px-4 py-2 rounded-full border border-gray-300 bg-white mx-1 disabled:opacity-50'>
					<Text className='text-gray-700'>Next</Text>
				</Pressable>
			</View>
		</View>
	);
};
export default Index;
