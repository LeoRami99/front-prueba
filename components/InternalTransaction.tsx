import { selectInternalTx } from "@/features/selectors";
import { useGetInternalTransaction } from "@/hooks/useInternalTransaction";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
// Si usas expo-router, descomenta:
// import { useRouter } from "expo-router";

type InternalTx = {
	id: string;
	amount: number;
	currency?: string; // opcional: si tu API lo incluye
	status: "pending" | "approved" | "rejected" | string;
	created_at: string | number; // ISO o timestamp
};

const ScreenContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<View className='flex-1 bg-white'>
		<View className='flex-1 px-5 py-6'>{children}</View>
	</View>
);

const InfoButton: React.FC<{ onPress: () => void; label: string; testID?: string }> = ({ onPress, label, testID }) => (
	<Pressable accessibilityRole='button' onPress={onPress} className='mt-4 self-start rounded-2xl px-4 py-2' testID={testID}>
		<Text className='text-blue-600 text-lg font-semibold'>{label}</Text>
	</Pressable>
);

const Pill: React.FC<{ text: string; intent?: "success" | "warning" | "error" | "default" }> = ({ text, intent = "default" }) => {
	const intentStyles =
		intent === "success" ? "bg-green-100 text-green-700"
		: intent === "warning" ? "bg-yellow-100 text-yellow-700"
		: intent === "error" ? "bg-red-100 text-red-700"
		: "bg-slate-100 text-slate-700";
	return (
		<View className={`self-start rounded-full px-3 py-1 ${intentStyles}`}>
			<Text className='text-sm font-medium'>{text}</Text>
		</View>
	);
};

const InternalTransaction: React.FC = () => {
	const internalTxId: string | undefined = useSelector(selectInternalTx);
	// const router = useRouter();
	const [isPulling, setIsPulling] = useState(false);

	const { data, isLoading, error, refetch } = useGetInternalTransaction(internalTxId);

	const tx = data as InternalTx | undefined;
	const currency = tx?.currency ?? "COP"; // ajusta según tu caso

	const amountFmt = useMemo(() => {
		if (!tx) return "";
		try {
			return new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(tx.amount);
		} catch {
			return `${tx.amount}`;
		}
	}, [tx, currency]);

	const createdAtFmt = useMemo(() => {
		if (!tx) return "";
		try {
			const d = new Date(tx.created_at);
			return new Intl.DateTimeFormat("es-CO", {
				dateStyle: "medium",
				timeStyle: "short",
			}).format(d);
		} catch {
			return String(tx.created_at);
		}
	}, [tx]);

	const statusIntent = useMemo(() => {
		if (!tx) return "default" as const;
		return (
			tx.status === "approved" ? "success"
			: tx.status === "pending" ? "warning"
			: tx.status === "rejected" ? "error"
			: "default"
		);
	}, [tx]) as "success" | "warning" | "error" | "default";

	const onRefresh = useCallback(async () => {
		setIsPulling(true);
		try {
			await refetch();
		} finally {
			setIsPulling(false);
		}
	}, [refetch]);

	const goHome = useCallback(() => {
		// Si usas expo-router:
		// router.replace("/");
	}, []);

	if (!internalTxId) {
		return (
			<ScreenContainer>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-2xl font-semibold text-slate-800'>No hay transacción seleccionada</Text>
					<InfoButton onPress={goHome} label='Ir al inicio' testID='btn-go-home-empty' />
				</View>
			</ScreenContainer>
		);
	}

	if (isLoading) {
		return (
			<ScreenContainer>
				<View className='flex-1 items-center justify-center'>
					<ActivityIndicator size='large' color='#0000ff' />
					<Text className='mt-4 text-slate-600'>Cargando transacción...</Text>
				</View>
			</ScreenContainer>
		);
	}

	if (error || !data) {
		return (
			<ScreenContainer>
				<View className='flex-1 items-center justify-center'>
					<Text className='text-xl font-semibold text-red-600'>Error al cargar la transacción</Text>
					<InfoButton onPress={() => refetch()} label='Reintentar' testID='btn-retry' />
					<InfoButton onPress={goHome} label='Ir al inicio' testID='btn-go-home-error' />
				</View>
			</ScreenContainer>
		);
	}

	return (
		<ScreenContainer>
			<ScrollView
				className='flex-1'
				refreshControl={<RefreshControl refreshing={isPulling} onRefresh={onRefresh} />}
				contentContainerClassName='pb-10'>
				<View className='rounded-2xl bg-white shadow-sm border border-slate-200 p-5'>
					<Text className='text-2xl font-bold text-slate-900 mb-3'>Detalles de la transacción</Text>

					<Pill text={tx.status.toUpperCase()} intent={statusIntent} />

					<View className='mt-4 space-y-2'>
						<Text className='text-base text-slate-700'>
							<Text className='font-semibold'>ID:</Text> {tx.id}
						</Text>
						<Text className='text-base text-slate-700'>
							<Text className='font-semibold'>Monto:</Text> {amountFmt}
						</Text>
						<Text className='text-base text-slate-700'>
							<Text className='font-semibold'>Fecha de creación:</Text> {createdAtFmt}
						</Text>
					</View>

					{tx.status === "approved" && (
						<View className='mt-5 rounded-xl border border-green-200 bg-green-50 p-4'>
							<Text className='text-green-700 font-semibold text-lg'>¡Pago aprobado!</Text>
							<Text className='text-green-700 mt-1'>Puedes continuar con el siguiente paso.</Text>
							<InfoButton onPress={goHome} label='Ir al inicio' testID='btn-go-home-approved' />
						</View>
					)}

					<InfoButton onPress={() => refetch()} label='Actualizar' testID='btn-refresh' />
				</View>
			</ScrollView>
		</ScreenContainer>
	);
};

export default InternalTransaction;
