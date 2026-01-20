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
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/theme/colors';
import { getRecipes } from '../../src/services/recipeService';

const FILTERS = ['all', 'sabzi', 'curry', 'roti', 'rice'];

export default function RecipeIndex() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH RECIPES ================= */
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await getRecipes(query, category);
      setRecipes(data);
    } catch (err) {
      console.log('RECIPE LIST ERROR:', err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FIRST LOAD ================= */
  useEffect(() => {
    loadRecipes();
  }, []);

  /* ================= FILTER CHANGE ================= */
  useEffect(() => {
    loadRecipes();
  }, [category]);

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={22}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Recipes</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ================= SEARCH ================= */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={18}
          color={COLORS.textMuted}
        />
        <TextInput
          placeholder="Search recipes..."
          placeholderTextColor={COLORS.textMuted}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={loadRecipes}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {/* ================= CONTENT AREA ================= */}
      <View style={{ flex: 1 }}>
        {loading ? (
          /* ===== Loading State ===== */
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: 40 }}
          />
        ) : recipes.length === 0 ? (
          /* ===== Empty State (BUG 2 FIX) ===== */
          <View style={styles.emptyState}>
            <Ionicons
              name="restaurant-outline"
              size={64}
              color={COLORS.textMuted}
            />
            <Text style={styles.emptyTitle}>
              No recipes found
            </Text>
            <Text style={styles.emptyText}>
              Try searching something else or publish a recipe
            </Text>
          </View>
        ) : (
          /* ===== Data State ===== */
          <FlatList
            data={recipes}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: '/recipe/[id]',
                    params: { id: item._id },
                  })
                }
              >
                <Image
                  source={{ uri: item.coverImage }}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.category}>
                    {item.category}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* ================= FILTER BAR ================= */}
      <View style={styles.filterBar}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() =>
              setCategory(f === 'all' ? '' : f)
            }
          >
            <Text
              style={[
                styles.filterText,
                category === f && styles.activeFilter,
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Header */
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  /* Search */
  searchBox: {
    margin: 16,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  /* Card */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 160,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  category: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textMuted,
    textTransform: 'capitalize',
  },

  /* Empty State */
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
    color: COLORS.textPrimary,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.textMuted,
  },

  /* Filters */
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },

  filterText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  activeFilter: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
