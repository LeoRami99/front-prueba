import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Animated, View } from "react-native";

const CardProductSkeleton = () => {
	// Create animated value for shimmer effect
	const shimmerAnimated = new Animated.Value(-100);

	useEffect(() => {
		// Create looping animation
		const startShimmerAnimation = () => {
			Animated.loop(
				Animated.timing(shimmerAnimated, {
					toValue: 100,
					duration: 1000,
					useNativeDriver: true,
				})
			).start();
		};

		startShimmerAnimation();

		// Clean up animation when component unmounts
		return () => {
			shimmerAnimated.stopAnimation();
		};
	}, []);

	const getAnimatedStyle = () => {
		return {
			transform: [{ translateX: shimmerAnimated }],
		};
	};

	return (
		<View className='bg-white rounded-2xl min:h-[280px] border border-gray-200 min:w-1/2'>
			<View className='p-4'>
				{/* Image skeleton */}
				<View className='w-full h-32 rounded-lg mb-4 bg-gray-200 overflow-hidden'>
					<Animated.View style={getAnimatedStyle()} className='w-full h-full'>
						<LinearGradient
							colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							className='w-full h-full absolute'
						/>
					</Animated.View>
				</View>

				{/* Title skeleton */}
				<View className='h-5 bg-gray-200 rounded-md mb-2 w-3/4 overflow-hidden'>
					<Animated.View style={getAnimatedStyle()} className='w-full h-full'>
						<LinearGradient
							colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							className='w-full h-full absolute'
						/>
					</Animated.View>
				</View>

				{/* Price skeleton */}
				<View className='h-4 bg-gray-200 rounded-md mt-1 w-1/4 overflow-hidden'>
					<Animated.View style={getAnimatedStyle()} className='w-full h-full'>
						<LinearGradient
							colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							className='w-full h-full absolute'
						/>
					</Animated.View>
				</View>

				{/* Button skeleton */}
				<View className='mt-4 bg-gray-200 p-2 rounded-2xl h-10 overflow-hidden'>
					<Animated.View style={getAnimatedStyle()} className='w-full h-full'>
						<LinearGradient
							colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							className='w-full h-full absolute'
						/>
					</Animated.View>
				</View>
			</View>
		</View>
	);
};

export default CardProductSkeleton;
