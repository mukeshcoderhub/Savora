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

export default function RecipeList() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecipes = async () => {
    setLoading(true);
    const data = await getRecipes(query, category);
    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRecipes();
  }, [category]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.title}>Recipes</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          placeholder="Search recipes..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={loadRecipes}
          style={styles.searchInput}
        />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
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
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>
              <Text style={styles.category}>
                {item.category}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Filters */}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

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
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  image: {
    height: 160,
    width: '100%',
  },

  cardTitle: {
    padding: 12,
    fontSize: 16,
    fontWeight: '600',
  },

  category: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    color: COLORS.textMuted,
  },

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
