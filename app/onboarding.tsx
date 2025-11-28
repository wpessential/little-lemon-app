import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

export default function OnboardingScreen() {
	const router = useRouter();
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');

	const isValid = firstName.trim() !== '' && email.trim() !== '' && email.includes('@');

	const handleNext = async () => {
		if (isValid) {
			try {
				const userData = {
					firstName: firstName.trim(),
					lastName: '',
					email: email.trim(),
					phone: '',
					notifications: {
						orderStatuses: true,
						passwordChanges: true,
						specialOffers: true,
						newsletter: true,
					},
				};
				await AsyncStorage.setItem('userData', JSON.stringify(userData));
				router.replace('/home');
			} catch (error) {
				console.error('Error saving user data:', error);
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>LITTLE LEMON</Text>
			</View>

			{/* Hero Section */}
			<View style={styles.heroSection}>
				<Text style={styles.restaurantName}>Little Lemon</Text>
				<Text style={styles.location}>Chicago</Text>

				<View style={styles.heroContent}>
					<Text style={styles.description}>
						We are a family owned Mediterranean restaurant, focused on traditional
						recipes served with a modern twist.
					</Text>
					<View style={styles.heroImagePlaceholder}>
						<Text style={styles.heroImageText}>🍤</Text>
					</View>
				</View>

				{/* Form */}
				<View style={styles.formContainer}>
					<Text style={styles.label}>Name *</Text>
					<TextInput
						style={styles.input}
						placeholder="First Name"
						value={firstName}
						onChangeText={setFirstName}
						placeholderTextColor="#999"
					/>

					<Text style={styles.label}>Email *</Text>
					<TextInput
						style={styles.input}
						placeholder="email@example.com"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						placeholderTextColor="#999"
					/>
				</View>
			</View>

			{/* Next Button */}
			<View style={styles.footer}>
				<TouchableOpacity
					style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
					onPress={handleNext}
					disabled={!isValid}
				>
					<Text style={styles.nextButtonText}>Next</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		backgroundColor: '#fff',
		padding: 16,
		paddingTop: 50,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	heroSection: {
		flex: 1,
		backgroundColor: '#495E57',
		padding: 20,
	},
	restaurantName: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#F4CE14',
		marginBottom: 4,
	},
	location: {
		fontSize: 24,
		color: '#fff',
		marginBottom: 16,
	},
	heroContent: {
		flexDirection: 'row',
		marginBottom: 32,
	},
	description: {
		flex: 1,
		color: '#fff',
		fontSize: 14,
		lineHeight: 20,
		marginRight: 16,
	},
	heroImagePlaceholder: {
		width: 100,
		height: 100,
		backgroundColor: '#666',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	heroImageText: {
		fontSize: 48,
	},
	formContainer: {
		marginTop: 'auto',
	},
	label: {
		color: '#fff',
		fontSize: 14,
		marginBottom: 8,
		fontWeight: '500',
	},
	input: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 16,
	},
	footer: {
		backgroundColor: '#f0f0f0',
		padding: 16,
		paddingBottom: 34,
	},
	nextButton: {
		backgroundColor: '#495E57',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	nextButtonDisabled: {
		backgroundColor: '#ccc',
	},
	nextButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});