import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getRecipeById } from '../src/services/recipeService';

const FAV_KEY = 'FAV_RECIPES';

export default function FavouritesScreen() {
  const router = useRouter();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD FAVOURITES ================= */
  const loadFavourites = async () => {
    try {
      setLoading(true);

      const stored = await AsyncStorage.getItem(FAV_KEY);
      if (!stored) {
        setRecipes([]);
        return;
      }

      const favIds: string[] = JSON.parse(stored);

      if (favIds.length === 0) {
        setRecipes([]);
        return;
      }

      // Fetch each recipe by id
      const results = await Promise.all(
        favIds.map(id => getRecipeById(id).catch(() => null))
      );

      // Filter out failed / deleted recipes
      setRecipes(results.filter(Boolean));
    } catch (err) {
      console.log('FAV LOAD ERROR:', err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F66300" />
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons
          name="heart-outline"
          size={64}
          color="#ddd"
        />
        <Text style={styles.emptyTitle}>
          No favourite recipes
        </Text>
        <Text style={styles.emptyText}>
          Tap the heart icon on any recipe to save it
        </Text>

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.exploreText}>
            Explore Recipes
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ================= LIST ================= */
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={22}
            color="#565656"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Favourite Recipes
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
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
              <Text style={styles.title}>
                {item.title}
              </Text>

              <View style={styles.metaRow}>
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
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#565656',
  },

  emptyText: {
    marginTop: 6,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },

  exploreBtn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F66300',
  },

  exploreText: {
    color: '#F66300',
    fontWeight: '600',
  },

  /* HEADER */
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#565656',
  },

  /* CARD */
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 160,
  },

  cardContent: {
    padding: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#565656',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },

  metaText: {
    fontSize: 13,
    color: '#777',
    marginRight: 12,
  },
});
