import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
//styles
import globalStyles from '../styles/globalSyles';
//components
import Carousel from '../components/Carousel/Carousel';

const ViewCarousel = () => {
	const { container } = globalStyles;
	return (
		<>
			<View style={container}>
				<Text>Demo Carouse in react-native</Text>
				<Carousel />
				<StatusBar style="auto" />
			</View>
		</>
	);
};

export default ViewCarousel;
