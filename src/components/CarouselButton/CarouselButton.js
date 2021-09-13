import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, View, Text } from 'react-native';

//Styles
import carouselButtonStyles from '../../styles/carouselButtonStyles';
// SVG and icons
import Svg, { G, Circle } from 'react-native-svg';

const CarouselButton = ({
	direction,
	scrollToNext,
	scrollToPrevious,
	percentage,
	currentIndex,
	blocksLength,
}) => {
	// Extract style from styles
	const { container, button } = carouselButtonStyles;

	// Declare constants for the Circle SVGs
	const size = 100,
		strokeWidth = 2,
		center = size / 2,
		radius = size / 2 - strokeWidth / 2,
		circumference = 2 * Math.PI * radius;

	// If the touchable opacity should be disabled
	const ifDisabled =
		direction === 'next' ? currentIndex >= blocksLength - 1 : currentIndex <= 0;

	// Handle the animation
	const progressAnimation = useRef(new Animated.Value(0)).current,
		progressRef = useRef(null);

	// Handle the animation
	const handleAnimation = (toValue) => {
		return Animated.timing(progressAnimation, {
			toValue,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

	// Trigger animation function call
	useEffect(() => {
		handleAnimation(percentage);
	}, [percentage]);

	useEffect(() => {
		progressAnimation.addListener(
			(value) => {
				// Set what the stroke width will be
				const strokeDashoffset =
					circumference - (circumference * value.value) / 100;

				// If progressRef is initiated, set the stroke
				if (progressRef?.current) {
					progressRef.current.setNativeProps({
						strokeDashoffset,
					});
				}
			},
			[percentage]
		);

		// Do the cleanup -- on component unmount
		return () => {
			progressAnimation.removeAllListeners();
		};
	}, []);

	return (
		<View style={container}>
			<Svg width={size} height={size}>
				<G rotation="-90" origin={center}>
					<Circle
						stroke="#000"
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
					/>
					<Circle
						ref={progressRef}
						stroke="#2e78c7"
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
					/>
				</G>
			</Svg>

			<TouchableOpacity
				onPress={direction === 'next' ? scrollToNext : scrollToPrevious}
				style={[button, ifDisabled && { backgroundColor: 'gray' }]}
				activeOpacity={0.6}
				disabled={ifDisabled}
			>
				<Text>{direction === 'next' ? 'Next' : 'Prev'}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CarouselButton;
