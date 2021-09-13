import React, { useState, useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { ActivityIndicator, View, FlatList, Animated } from 'react-native';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//components
import CarouselItem from '../CarouselItem/CarouselItem';
import CarouselButton from '../CarouselButton/CarouselButton';
//styles
import carouselStyles from '../../styles/carouselStyles';

export default function Carousel() {
	const { manifest } = Constants;
	const { container, flexView } = carouselStyles;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [blocks, setBlocks] = useState([]);
	const [lastBlock, setLastBlock] = useState('');

	const scrollX = useRef(new Animated.Value(0)).current;
	const blocksRef = useRef(null);

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const setLastBockToStore = async (index) => {
		if (currentIndex >= 0) {
			await AsyncStorage.setItem('lastBlock', index.toString());
		}
	};

	const getLastBockToStore = async () => {
		const lastBlockStore = await AsyncStorage.getItem('lastBlock');
		if (lastBlockStore) {
			setLastBlock(lastBlockStore);
		}
	};

	const ScrollToNext = async () => {
		if (currentIndex < blocks.length - 1) {
			blocksRef.current.scrollToIndex({ index: currentIndex + 1 });
		}
		if (currentIndex >= 0) {
			setLastBockToStore(currentIndex + 1);
		}
	};

	const ScrollToPrevious = () => {
		if (currentIndex > 0) {
			blocksRef.current.scrollToIndex({ index: currentIndex - 1 });
		}
		if (currentIndex >= 0) {
			setLastBockToStore(currentIndex - 1);
		}
	};

	useEffect(() => {		
		getLastBockToStore();
		const uri = `http://${manifest.debuggerHost.split(':').shift()}:3001`;
		fetch(`${uri}/carousel/`)
			.then((response) => response.json())
			.then((response) => {
				if (response.message) {
					setBlocks(setFormateBlocks(response.blocks));
				} else {
					alert('error data!');
				}
			})
			.catch((error) => {
				console.log(error);
				alert('server is not available!');
			});
	}, []);

	const setFormateBlocks = (blocks) => {
		return blocks.map((block, i) => {
			return {
				id: i.toString(),
				image: block.image,
				title: block.title,
			};
		});
	};

	const renderWithData = () => {
		return fetch('https://myapi.com')
			.then((response) => response.json())
			.then((myListData) => {})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			{blocks[0] ? (
				<View style={container}>
					<View style={flexView}>
						<FlatList
							data={blocks}
							renderItem={({ item }) => {
								return <CarouselItem key={item.id.toString()} block={item} />;
							}}
							horizontal
							showsHorizontalScrollIndicator={false}
							initialScrollIndex={parseInt(lastBlock)}
							pagingEnabled
							bounces={false}
							keyExtractor={(item) => item.id}
							onScroll={Animated.event(
								[
									{
										nativeEvent: {
											contentOffset: { x: scrollX },
										},
									},
								],
								{
									useNativeDriver: false,
								}
							)}
							scrollEventThrottle={32}
							onViewableItemsChanged={onViewableItemsChanged}
							ref={blocksRef}
						/>
					</View>
					<View style={[container, { flexDirection: 'row', flexWrap: 'wrap' }]}>
						<CarouselButton
							blocksLength={blocks.length}
							currentIndex={currentIndex}
							direction="previous"
							scrollToPrevious={ScrollToPrevious}
							percentage={(currentIndex + 1) * (100 / blocks.length)}
						/>
						<CarouselButton
							blocksLength={blocks.length}
							currentIndex={currentIndex}
							direction="next"
							scrollToNext={ScrollToNext}
							percentage={(currentIndex + 1) * (100 / blocks.length)}
						/>
					</View>
				</View>
			) : (
				<>
					<ActivityIndicator size="large" color="#0000ff" />
					<Text>Loading...</Text>
				</>
			)}
		</>
	);
}
