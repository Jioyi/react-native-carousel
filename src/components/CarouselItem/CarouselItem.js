import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';

//styles
import carouselItemStyles from '../../styles/carouselItemStyles';

const CarouselItem = ({ block }) => {
	const { height, scale, width } = useWindowDimensions();
	const { container, flexTitle, title, image } = carouselItemStyles;
	return (
		<View style={(container, { width })}>
			<Image
				source={{
					uri: block.image,
				}}
                style={[image, { width: width }]}
			/>
			<View style={flexTitle}>
				<Text style={title}>{block.title}</Text>
			</View>
		</View>
	);
};

export default CarouselItem;
