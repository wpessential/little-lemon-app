import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

export default function ProfileScreen() {
	const router = useRouter();
	const [profileData, setProfileData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		notifications: {
			orderStatuses: true,
			passwordChanges: true,
			specialOffers: true,
			newsletter: true,
		},
	});
	const [originalData, setOriginalData] = useState(null);

	useEffect(() => {
		loadUserData();
	}, []);

	const loadUserData = async () => {
		try {
			const userData = await AsyncStorage.getItem('userData');
			if (userData) {
				const parsed = JSON.parse(userData);
				setProfileData(parsed);
				setOriginalData(parsed);
			}
		} catch (error) {
			console.error('Error loading user data:', error);
		}
	};

	const handleSave = async () => {
		try {
			await AsyncStorage.setItem('userData', JSON.stringify(profileData));
			setOriginalData(profileData);
			Alert.alert('Success', 'Changes saved successfully!');
		} catch (error) {
			console.error('Error saving profile:', error);
			Alert.alert('Error', 'Failed to save changes');
		}
	};

	const handleDiscard = () => {
		if (originalData) {
			setProfileData(originalData);
		}
		router.back();
	};

	const handleLogout = () => {
		Alert.alert(
			'Log Out',
			'Are you sure you want to log out?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Log Out',
					style: 'destructive',
					onPress: async () => {
						try {
							await AsyncStorage.removeItem('userData');
							router.replace('/onboarding');
						} catch (error) {
							console.error('Error logging out:', error);
						}
					},
				},
			]
		);
	};

	const toggleNotification = (key: string) => {
		setProfileData({
			...profileData,
			notifications: {
				...profileData.notifications,
				[key]: !profileData.notifications[key],
			},
		});
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<Text style={styles.backButtonText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>LITTLE LEMON</Text>
				<View style={styles.profileIcon}>
					<Text style={styles.profileIconText}>👤</Text>
				</View>
			</View>

			<ScrollView style={styles.content}>
				<Text style={styles.sectionTitle}>Personal information</Text>

				{/* Avatar Section */}
				<View style={styles.avatarSection}>
					<Text style={styles.label}>Avatar</Text>
					<View style={styles.avatarContainer}>
						<View style={styles.avatar}>
							<Text style={styles.avatarText}>👤</Text>
						</View>
						<TouchableOpacity style={styles.changeButton}>
							<Text style={styles.changeButtonText}>Change</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.removeButton}>
							<Text style={styles.removeButtonText}>Remove</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Form Fields */}
				<View style={styles.formSection}>
					<Text style={styles.label}>First name</Text>
					<TextInput
						style={styles.input}
						value={profileData.firstName}
						onChangeText={(text) =>
							setProfileData({ ...profileData, firstName: text })
						}
					/>

					<Text style={styles.label}>Last name</Text>
					<TextInput
						style={styles.input}
						value={profileData.lastName}
						onChangeText={(text) =>
							setProfileData({ ...profileData, lastName: text })
						}
					/>

					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						value={profileData.email}
						onChangeText={(text) =>
							setProfileData({ ...profileData, email: text })
						}
						keyboardType="email-address"
						autoCapitalize="none"
					/>

					<Text style={styles.label}>Phone number</Text>
					<TextInput
						style={styles.input}
						value={profileData.phone}
						onChangeText={(text) =>
							setProfileData({ ...profileData, phone: text })
						}
						keyboardType="phone-pad"
						placeholder="(217) 555-0113"
					/>
				</View>

				{/* Email Notifications */}
				<View style={styles.notificationsSection}>
					<Text style={styles.sectionTitle}>Email notifications</Text>

					<TouchableOpacity
						style={styles.checkboxRow}
						onPress={() => toggleNotification('orderStatuses')}
					>
						<View style={styles.checkbox}>
							{profileData.notifications.orderStatuses && (
								<Text style={styles.checkmark}>✓</Text>
							)}
						</View>
						<Text style={styles.checkboxLabel}>Order statuses</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.checkboxRow}
						onPress={() => toggleNotification('passwordChanges')}
					>
						<View style={styles.checkbox}>
							{profileData.notifications.passwordChanges && (
								<Text style={styles.checkmark}>✓</Text>
							)}
						</View>
						<Text style={styles.checkboxLabel}>Password changes</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.checkboxRow}
						onPress={() => toggleNotification('specialOffers')}
					>
						<View style={styles.checkbox}>
							{profileData.notifications.specialOffers && (
								<Text style={styles.checkmark}>✓</Text>
							)}
						</View>
						<Text style={styles.checkboxLabel}>Special offers</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.checkboxRow}
						onPress={() => toggleNotification('newsletter')}
					>
						<View style={styles.checkbox}>
							{profileData.notifications.newsletter && (
								<Text style={styles.checkmark}>✓</Text>
							)}
						</View>
						<Text style={styles.checkboxLabel}>Newsletter</Text>
					</TouchableOpacity>
				</View>

				{/* Logout Button */}
				<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
					<Text style={styles.logoutButtonText}>Log out</Text>
				</TouchableOpacity>

				{/* Action Buttons */}
				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
						<Text style={styles.discardButtonText}>Discard changes</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
						<Text style={styles.saveButtonText}>Save changes</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 16,
		paddingTop: 50,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backButtonText: {
		fontSize: 24,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	profileIcon: {
		width: 40,
		height: 40,
		backgroundColor: '#495E57',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileIconText: {
		fontSize: 20,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	avatarSection: {
		marginBottom: 24,
	},
	label: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	avatarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	avatar: {
		width: 80,
		height: 80,
		backgroundColor: '#495E57',
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarText: {
		fontSize: 40,
	},
	changeButton: {
		backgroundColor: '#495E57',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	changeButtonText: {
		color: '#fff',
		fontWeight: '600',
	},
	removeButton: {
		borderWidth: 1,
		borderColor: '#ccc',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	removeButtonText: {
		fontWeight: '600',
	},
	formSection: {
		marginBottom: 24,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 16,
	},
	notificationsSection: {
		marginBottom: 24,
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	checkbox: {
		width: 24,
		height: 24,
		borderWidth: 2,
		borderColor: '#495E57',
		borderRadius: 4,
		marginRight: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkmark: {
		fontSize: 16,
		color: '#495E57',
		fontWeight: 'bold',
	},
	checkboxLabel: {
		fontSize: 16,
	},
	logoutButton: {
		backgroundColor: '#F4CE14',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 16,
	},
	logoutButtonText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	actionButtons: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 32,
	},
	discardButton: {
		flex: 1,
		borderWidth: 2,
		borderColor: '#495E57',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	discardButtonText: {
		fontSize: 16,
		fontWeight: '600',
	},
	saveButton: {
		flex: 1,
		backgroundColor: '#495E57',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});