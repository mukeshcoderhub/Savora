import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS } from '../../src/theme/colors';
import { getRecipes } from '../../src/services/recipeService';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';


type Category = {
  key: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};
  
const CATEGORIES: Category[] = [
  { key: 'all', label: 'All', icon: 'silverware-fork-knife' },
  { key: 'sabzi', label: 'Sabzi', icon: 'food-apple' },
  { key: 'curry', label: 'Curry', icon: 'food-drumstick' },
  { key: 'roti', label: 'Roti', icon: 'bread-slice' },
  { key: 'rice', label: 'Rice', icon: 'rice' },
  { key: 'sweet', label: 'Sweet', icon: 'cupcake' },
];


export default function RecipeIndex() {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(
  typeof q === 'string' ? q : ''
);

useEffect(() => {
  if (q) {
    loadRecipes();
  }
}, [q]);


  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await getRecipes(search, category);
      setRecipes(data);
    } catch (err) {

      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [category]);

  return (
    <View style={styles.container}>
     {/* ================= HERO HEADER ================= */}
<View style={styles.heroContainer}>
  <Image
    source={require('../../assets/images/recipeHeader.webp')}
    style={styles.heroImage}
  />

  {/* Dark overlay */}
  <View style={styles.overlay} />

  {/* Header content */}
  <View style={styles.heroContent}>
    <Text style={styles.heroTitle}>What are you cooking today?</Text>
    <Text style={styles.heroSubtitle}>Search your favourite recipes</Text>

    {/* Search Bar */}
    <View style={styles.heroSearchBox}>
      <Ionicons name="search" size={20} color={COLORS.textMuted} />
      <TextInput
        placeholder="Search dishes, ingredients..."
        placeholderTextColor={COLORS.textMuted}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={loadRecipes}
        style={styles.heroSearchInput}
        returnKeyType="search"
      />
    </View>
  </View>
</View>

     {/* ================= CATEGORY CAROUSEL ================= */}
<View style={styles.categoryContainer}>
  <FlatList
    data={CATEGORIES}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryList}
    keyExtractor={(item) => item.key}
    renderItem={({ item }) => {
      const active =
        category === item.key || (item.key === 'all' && category === '');

      return (
        <TouchableOpacity
          onPress={() =>
            setCategory(item.key === 'all' ? '' : item.key)
          }
          style={styles.categoryCard}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={25}
            color={active ? "#F66300" : "#565656"}
          />

          <Text
            style={[
              styles.categoryText,
              active && styles.activeCategoryText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    }}
  />
</View>


{/* ================= RECIPE LIST ================= */}
{loading ? (
  <ActivityIndicator
    size="large"
    color="#F66300"
    style={{ marginTop: 40 }}
  />
) : recipes.length === 0 ? (
  <View style={styles.emptyState}>
    <Ionicons name="restaurant-outline" size={64} color="#F66300" />
    <Text style={styles.emptyTitle}>No recipes found</Text>
    <Text style={styles.emptyText}>
      Try another search or category
    </Text>
  </View>
) : (
  <FlatList
    data={recipes}
    keyExtractor={(item) => item._id}
    contentContainerStyle={{ padding: 16, backgroundColor: '#fff' }}
    showsVerticalScrollIndicator={false}
    renderItem={({ item, index }) => (
      <Animated.View entering={FadeInUp.delay(index * 70)}>
        <TouchableOpacity
          style={styles.recipeCard}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: '/recipe/[id]',
              params: { id: item._id },
            })
          }
        >
         <View style={styles.imageWrapper}>
  <Image
    source={{ uri: item.coverImage }}
    style={styles.recipeImage}
  />

  {/* Gradient Fade */}
  <LinearGradient
  colors={['transparent', 'rgba(0,0,0,1)']}
  style={styles.imageGradient}
/>

</View>

          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle} numberOfLines={1}>
              {item.title}
            </Text>

            <View style={styles.metaRow}>
              <MaterialCommunityIcons
                name="chef-hat"
                size={14}
                color="#F66300"
              />
              <Text style={styles.metaText}>
                {item.difficulty}
              </Text>

              <Ionicons
                name="time-outline"
                size={14}
                color="#F66300"
              />
              <Text style={styles.metaText}>
                {item.cookTime || 20} min
              </Text>

              <Ionicons
                name={
                  item.dietType === 'veg'
                    ? 'leaf-outline'
                    : 'restaurant'
                }
                size={14}
                color={
                  item.dietType === 'veg'
                    ? '#2ecc71'
                    : '#e74c3c'
                }
              />
            </View>

            <View style={styles.badgeRow}>
              <Text style={styles.categoryBadge}>
                {item.category}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )}
  />
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  heroContainer: {
  height: '25%',
  minHeight: 200,
  position: 'relative',
},

heroImage: {
  width: '100%',
  height: '100%',
},

overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.10)',
},

heroContent: {
  position: 'absolute',
  bottom: 24,
  left: 16,
  right: 16,
},

heroTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#fff',
},

heroSubtitle: {
  marginTop: 4,
  fontSize: 14,
  color: '#fff',
},

heroSearchBox: {
  marginTop: 16,
  height: 54,
  backgroundColor: '#fff',
  borderRadius: 18,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  elevation: 6,
},

heroSearchInput: {
  marginLeft: 10,
  flex: 1,
  fontSize: 15,
  color: COLORS.textPrimary,
},
categoryContainer: {
  height: '10%',
  backgroundColor: '#fff',
  justifyContent: 'center',
},

categoryList: {
  paddingHorizontal: 0,
  alignItems: 'center',
},

categoryCard: {
  width: 75,
  height: 90,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 14,
  backgroundColor: 'transparent', // 👈 transparent card
},

categoryText: {
  marginTop: 6,
  fontSize: 13,
  color: "#000",
},

activeCategoryText: {
  color: "#F66300",
  fontWeight: '700',
},


 recipeCard: {
  backgroundColor: '#fff',
  borderRadius: 20,
  marginBottom: 18,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#f1f1f1',
},

recipeImage: {
  width: '100%',
  height: 180,
  backgroundColor: '#f5f5f5',
},

recipeInfo: {
  padding: 14,
},

recipeTitle: {
  fontSize: 17,
  fontWeight: '700',
  color: '#565656',
},

metaRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 6,
},

metaText: {
  fontSize: 12,
  color: '#777',
  marginRight: 10,
  marginLeft: 4,
},

badgeRow: {
  marginTop: 10,
  flexDirection: 'row',
},

categoryBadge: {
  backgroundColor: '#F6630020', // light orange tint
  color: '#F66300',
  fontSize: 12,
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 20,
  textTransform: 'capitalize',
},

imageWrapper: {
  position: 'relative',
},
imageGradient: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 80,
},


  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: "#000",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#565656',
  },
});
