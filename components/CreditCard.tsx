import { AppDispatch } from "@/app/store";
import { setTokenCard } from "@/features/cardToken/cardToken.slice";
import { setStep } from "@/features/steps/steps.slice";
import { useGetTokenCard } from "@/hooks/useCardToken";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { CreditCard } from "../types/credit-card.interface";

const CreditCardValidator = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { mutateAsync: getTokenCard, isPending } = useGetTokenCard();

	const [cardType, setCardType] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreditCard>();

	const onSubmit = (data: CreditCard) => {
		Toast.show({ type: "info", text1: "Validating card..." });
		getTokenCard({
			number: data.number.replace(/\s/g, ""),
			cvc: data.cvc,
			exp_month: data.exp_month,
			exp_year: data.exp_year,
			card_holder: data.card_holder,
		})
			.then((res: any) => {
				Toast.show({ type: "success", text1: "Card validated successfully" });
				dispatch(setTokenCard(res.data.id));
				dispatch(setStep(2));
			})
			.catch(() => {
				Toast.show({ type: "error", text1: "There was an error validating the card" });
			});
	};

	const formatCreditCardNumber = (value: string) => {
		const digits = value.replace(/\D/g, "");
		const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");

		if (digits) {
			if (digits.startsWith("4")) setCardType("visa");
			else if (/^5[1-5]/.test(digits)) setCardType("mastercard");
			else if (/^3[47]/.test(digits)) setCardType("amex");
			else if (/^6(?:011|5)/.test(digits)) setCardType("discover");
			else setCardType(null);
		} else setCardType(null);
		return formatted.slice(0, 19);
	};

	const getCardIcon = () => {
		switch (cardType) {
			case "visa":
				return <FontAwesome5 name='cc-visa' size={24} color='black' />;
			case "mastercard":
				return <FontAwesome5 name='cc-mastercard' size={24} color='#ff9800' />;
			case "amex":
				return <FontAwesome5 name='cc-amex' size={24} color='#0070ba' />;
			case "discover":
				return <FontAwesome5 name='cc-discover' size={24} color='#f68b1e' />;
			default:
				return <FontAwesome5 name='credit-card' size={24} color='#ccc' />;
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Add Card For Payment</Text>
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Card Number</Text>
				<View style={styles.inputIconRow}>
					<Controller
						control={control}
						name='number'
						rules={{ required: true }}
						render={({ field: { onChange, value } }) => (
							<TextInput
								className='w-full'
								style={styles.input}
								placeholder='1234 5678 9012 3456'
								keyboardType='numeric'
								maxLength={19}
								value={value}
								onChangeText={(text) => onChange(formatCreditCardNumber(text))}
								editable={!isPending}
							/>
						)}
					/>
					<View style={styles.icon}>{getCardIcon()}</View>
				</View>
				{errors.number && <Text style={styles.error}>This field is required</Text>}
			</View>

			<View style={styles.row}>
				<View style={styles.col}>
					<Text style={styles.label}>CVC</Text>
					<Controller
						control={control}
						name='cvc'
						rules={{ required: true }}
						render={({ field: { onChange, value } }) => (
							<TextInput
								style={styles.input}
								placeholder='123'
								keyboardType='numeric'
								maxLength={4}
								value={value}
								onChangeText={onChange}
								editable={!isPending}
							/>
						)}
					/>
					{errors.cvc && <Text style={styles.error}>Required</Text>}
				</View>
				<View style={styles.col}>
					<Text style={styles.label}>Exp Month</Text>
					<Controller
						control={control}
						name='exp_month'
						rules={{ required: true }}
						render={({ field: { onChange, value } }) => (
							<TextInput
								style={styles.input}
								placeholder='MM'
								keyboardType='numeric'
								maxLength={2}
								value={value}
								onChangeText={onChange}
								editable={!isPending}
							/>
						)}
					/>
					{errors.exp_month && <Text style={styles.error}>Required</Text>}
				</View>
				<View style={styles.col}>
					<Text style={styles.label}>Exp Year</Text>
					<Controller
						control={control}
						name='exp_year'
						rules={{ required: true }}
						render={({ field: { onChange, value } }) => (
							<TextInput
								style={styles.input}
								placeholder='YY'
								keyboardType='numeric'
								maxLength={2}
								value={value}
								onChangeText={onChange}
								editable={!isPending}
							/>
						)}
					/>
					{errors.exp_year && <Text style={styles.error}>Required</Text>}
				</View>
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Card Holder</Text>
				<Controller
					control={control}
					name='card_holder'
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<TextInput style={styles.input} placeholder='Full Name on Card' value={value} onChangeText={onChange} editable={!isPending} />
					)}
				/>
				{errors.card_holder && <Text style={styles.error}>This field is required</Text>}
			</View>

			<TouchableOpacity
				className={"mt-4 bg-blue-600 rounded-2xl py-3 px-6 items-center " + (isPending ? "opacity-50" : "")}
				onPress={handleSubmit(onSubmit)}
				disabled={isPending}>
				{isPending ?
					<ActivityIndicator color='#fff' />
				:	<Text style={styles.buttonText}>Validate Card</Text>}
			</TouchableOpacity>
			<Toast />
		</View>
	);
};

const styles = StyleSheet.create({
	container: { padding: 24, backgroundColor: "#fff", flex: 1, justifyContent: "center" },
	title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 24, color: "#222" },
	inputGroup: { marginBottom: 16 },
	label: { color: "#333", fontWeight: "bold", marginBottom: 6 },
	input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: "#fafafa" },
	error: { color: "#e53935", fontSize: 12, marginTop: 2 },
	inputIconRow: { flexDirection: "row", alignItems: "center" },
	icon: { position: "absolute", right: 10 },
	row: { flexDirection: "row", gap: 8, marginBottom: 16 },
	col: { flex: 1 },
	button: { backgroundColor: "#1976d2", padding: 14, borderRadius: 8, alignItems: "center" },
	buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default CreditCardValidator;
