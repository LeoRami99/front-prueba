import type { AppDispatch } from "@/app/store";
import { selectInternalTx } from "@/features/selectors";
import { resetSteps } from "@/features/steps/steps.slice";
import { useGetInternalTransaction } from "@/hooks/useInternalTransaction";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const InternalTransaction = () => {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();
	const internalTxId = useSelector(selectInternalTx);
	const [isPulling, setIsPulling] = useState(false);
	const { data: tx, isLoading, error, refetch } = useGetInternalTransaction(internalTxId);

	const onRefresh = useCallback(async () => {
		setIsPulling(true);
		try {
			await refetch();
		} finally {
			setIsPulling(false);
		}
	}, [refetch]);

	const goHome = () => {
		dispatch(resetSteps());
		router.replace("/");
	};

	const getStatusStyle = () => {
		if (!tx) return "bg-slate-100 text-slate-700";
		if (tx.status === "approved") return "bg-green-100 text-green-700";
		if (tx.status === "pending") return "bg-yellow-100 text-yellow-700";
		if (tx.status === "rejected") return "bg-red-100 text-red-700";
		return "bg-slate-100 text-slate-700";
	};

	if (!internalTxId) {
		return (
			<View className='flex-1 bg-white p-5'>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-2xl font-semibold'>No hay transacción seleccionada</Text>
					<Pressable onPress={goHome} className='mt-4'>
						<Text className='text-blue-600 text-lg'>Ir al inicio</Text>
					</Pressable>
				</View>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View className='flex-1 bg-white p-5 items-center justify-center'>
				<ActivityIndicator size='large' color='#0000ff' />
				<Text className='mt-4'>Cargando transacción...</Text>
			</View>
		);
	}

	if (error || !tx) {
		return (
			<View className='flex-1 bg-white p-5 items-center justify-center'>
				<Text className='text-xl font-semibold text-red-600'>Error al cargar la transacción</Text>
				<Pressable onPress={() => refetch()} className='mt-4'>
					<Text className='text-blue-600 text-lg'>Reintentar</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View className='flex-1'>
			<ScrollView refreshControl={<RefreshControl refreshing={isPulling} onRefresh={onRefresh} />}>
				<View className=''>
					<Text className='text-2xl font-bold mb-3'>Detalles de la transacción</Text>

					<View className={`self-start rounded-full px-3 py-1 ${getStatusStyle()}`}>
						<Text className='text-sm font-medium'>{tx.status.toUpperCase()}</Text>
					</View>

					<View className='mt-4'>
						<Text className='text-base'>
							<Text className='font-semibold'>ID:</Text> {tx.id}
						</Text>
						<Text className='text-base'>
							<Text className='font-semibold'>Monto:</Text> {tx.amount}
						</Text>
						<Text className='text-base'>
							<Text className='font-semibold'>Fecha:</Text> {tx.created_at}
						</Text>
					</View>

					{tx.status === "approved" && (
						<View className='mt-5 bg-green-50 border border-green-200 p-4 rounded-xl'>
							<Text className='text-green-700 font-semibold'>¡Pago aprobado!</Text>
						</View>
					)}
					{tx.status === "approved" ?
						<Pressable className='mt-5 bg-blue-400 p-4 rounded-xl' onPress={goHome}>
							<Text className='text--700 font-semibold'>Go to Home</Text>
						</Pressable>
					:	<Pressable onPress={() => refetch()} className='mt-4'>
							<Text className='bg-blue-400 text-center p-4 rounded-2xl text-lg'>Actualizar</Text>
						</Pressable>
					}
				</View>
			</ScrollView>
		</View>
	);
};

export default InternalTransaction;
