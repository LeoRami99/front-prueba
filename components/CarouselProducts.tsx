import * as React from "react";
import { Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
// import { window } from "../constants/sizes";
// import { renderItem } from "../utils/render-item";

const defaultDataWith6Colors = ["#B0604D", "#899F9C", "#B3C680", "#5C6265", "#F5D399", "#F1F1F1"];

const LIST_OFFERS = [
	{
		id: "1",
		title: "Oferta 1",
		image: "https://static.vecteezy.com/system/resources/previews/003/692/287/non_2x/big-sale-discount-promotion-banner-template-with-blank-product-podium-scene-graphic-free-vector.jpg",
	},
	{
		id: "2",
		title: "Oferta 2",
		image: "https://static.vecteezy.com/system/resources/previews/011/320/988/non_2x/big-sale-banner-design-with-podium-gradient-background-social-media-post-product-advertisement-design-special-discount-design-vector.jpg",
	},
	{
		id: "3",
		title: "Oferta 3",
		image: "https://static.vecteezy.com/system/resources/previews/002/617/575/non_2x/summer-sale-offer-banner-promotion-podium-display-product-with-orange-background-vector.jpg",
	},
];

function Index() {
	const progress = useSharedValue<number>(0);

	return (
		<View id='carousel-component' testID='carousel-component-parallax'>
			<Carousel
				autoPlayInterval={1000}
				data={LIST_OFFERS}
				height={258}
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
				width={400}
				style={{
					width: "100%",
				}}
				mode='parallax'
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onProgressChange={progress}
				renderItem={({ item, index }) => (
					<View
						style={{
							backgroundColor: defaultDataWith6Colors[index % defaultDataWith6Colors.length],
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 20,
						}}>
						<Image source={{ uri: item.image }} className='w-full h-full rounded-2xl absolute' />
					</View>
				)}
			/>
		</View>
	);
}

export default Index;
