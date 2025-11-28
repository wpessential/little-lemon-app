import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
	const router = useRouter();

	useEffect(() => {
		checkOnboardingStatus();
	}, []);

	const checkOnboardingStatus = async () => {
		try {
			const userData = await AsyncStorage.getItem('userData');
			if (userData !== null) {
				router.replace('/home');
			} else {
				router.replace('/onboarding');
			}
		} catch (error) {
			console.error('Error checking onboarding status:', error);
			router.replace('/onboarding');
		}
	};

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#495E57" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});