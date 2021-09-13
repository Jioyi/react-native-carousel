import { StyleSheet } from 'react-native';

const carouselItemStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: 800,
	},
	flexTitle: { flex: 0.5 },
	title: {
		fontWeight: 'bold',
		fontSize: 28,
		marginBottom: 18,
		color: '#2e78c7',
		textAlign: 'center',
	},
	image: {
		resizeMode: 'cover',
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
	},
});

export default carouselItemStyles;
