import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { menuItems } from '../constants/menuData';

const CATEGORIES = ['starters', 'mains', 'desserts', 'drinks'];

export default function HomeScreen() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategories, setSelectedCategories] = useState(CATEGORIES);

	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const filteredMenuItems = useMemo(() => {
		return menuItems.filter((item) => {
			const matchesSearch =
				item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategories.includes(item.category);
			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategories]);

	const renderMenuItem = ({ item }: any) => (
		<View style={styles.menuItem}>
			<View style={styles.menuItemContent}>
				<Text style={styles.menuItemName}>{item.name}</Text>
				<Text style={styles.menuItemDescription} numberOfLines={2}>
					{item.description}
				</Text>
				<Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
			</View>
			<View style={styles.menuItemImageContainer}>
				<Text style={styles.menuItemImage}>{item.image}</Text>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>LITTLE LEMON</Text>
				<TouchableOpacity
					style={styles.profileButton}
					onPress={() => router.push('/profile')}
				>
					<Text style={styles.profileIcon}>👤</Text>
				</TouchableOpacity>
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

				{/* Search Bar */}
				<View style={styles.searchContainer}>
					<TextInput
						style={styles.searchInput}
						placeholder="Search menu..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholderTextColor="#999"
					/>
					<Text style={styles.searchIcon}>🔍</Text>
				</View>
			</View>

			{/* Menu Breakdown */}
			<View style={styles.menuBreakdown}>
				<Text style={styles.deliveryTitle}>ORDER FOR DELIVERY!</Text>
				<View style={styles.categoriesContainer}>
					{CATEGORIES.map((category) => (
						<TouchableOpacity
							key={category}
							style={[
								styles.categoryButton,
								selectedCategories.includes(category) && styles.categoryButtonActive,
							]}
							onPress={() => toggleCategory(category)}
						>
							<Text
								style={[
									styles.categoryText,
									selectedCategories.includes(category) && styles.categoryTextActive,
								]}
							>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Menu Items List */}
			<FlatList
				data={filteredMenuItems}
				renderItem={renderMenuItem}
				keyExtractor={(item) => item.id.toString()}
				style={styles.menuList}
			/>
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
	headerTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	profileButton: {
		width: 40,
		height: 40,
		backgroundColor: '#495E57',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileIcon: {
		fontSize: 20,
	},
	heroSection: {
		backgroundColor: '#495E57',
		padding: 20,
	},
	restaurantName: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#F4CE14',
		marginBottom: 4,
	},
	location: {
		fontSize: 20,
		color: '#fff',
		marginBottom: 12,
	},
	heroContent: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	description: {
		flex: 1,
		color: '#fff',
		fontSize: 14,
		lineHeight: 20,
		marginRight: 16,
	},
	heroImagePlaceholder: {
		width: 80,
		height: 80,
		backgroundColor: '#666',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	heroImageText: {
		fontSize: 40,
	},
	searchContainer: {
		position: 'relative',
	},
	searchInput: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		paddingRight: 40,
	},
	searchIcon: {
		position: 'absolute',
		right: 12,
		top: 12,
		fontSize: 20,
	},
	menuBreakdown: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	deliveryTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	categoriesContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	categoryButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: '#e0e0e0',
		borderRadius: 20,
	},
	categoryButtonActive: {
		backgroundColor: '#495E57',
	},
	categoryText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
	},
	categoryTextActive: {
		color: '#fff',
	},
	menuList: {
		flex: 1,
	},
	menuItem: {
		flexDirection: 'row',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	menuItemContent: {
		flex: 1,
		marginRight: 12,
	},
	menuItemName: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	menuItemDescription: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	menuItemPrice: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	menuItemImageContainer: {
		width: 80,
		height: 80,
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	menuItemImage: {
		fontSize: 40,
	},
});