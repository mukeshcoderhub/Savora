import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getRecipeById } from '../../src/services/recipeService';

const FAV_KEY = 'FAV_RECIPES';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  /* ================= CHECK IF FAV ================= */
  const checkIfFavourite = async (recipeId: string) => {
    const stored = await AsyncStorage.getItem(FAV_KEY);
    if (!stored) return false;

    const favs: string[] = JSON.parse(stored);
    return favs.includes(recipeId);
  };

  /* ================= TOGGLE FAV ================= */
  const toggleFavourite = async () => {
    if (!recipe?._id) return;

    const stored = await AsyncStorage.getItem(FAV_KEY);
    let favs: string[] = stored ? JSON.parse(stored) : [];

    if (favs.includes(recipe._id)) {
      favs = favs.filter(id => id !== recipe._id);
      setLiked(false);
    } else {
      favs.push(recipe._id);
      setLiked(true);
    }

    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(favs));
  };

  /* ================= LOAD RECIPE ================= */
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getRecipeById(id as string)
      .then(async data => {
        setRecipe(data);
        const isFav = await checkIfFavourite(data._id);
        setLiked(isFav);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F66300" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#565656' }}>Recipe not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#F66300', marginTop: 10 }}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ================= UI ================= */
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* IMAGE HEADER */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: recipe.coverImage }}
          style={styles.image}
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />

        {/* Back */}
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Favourite */}
        <TouchableOpacity
          style={styles.like}
          onPress={toggleFavourite}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color={liked ? '#F66300' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>

        {/* META */}
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={16} color="#F66300" />
          <Text style={styles.metaText}>
            {recipe.prepTime + recipe.cookTime} min
          </Text>

          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={16}
            color="#F66300"
          />
          <Text style={styles.metaText}>
            {recipe.servings} servings
          </Text>

          <Ionicons
            name={
              recipe.dietType === 'veg'
                ? 'leaf-outline'
                : 'restaurant'
            }
            size={16}
            color={
              recipe.dietType === 'veg'
                ? '#2ecc71'
                : '#e74c3c'
            }
          />
        </View>

        {/* INGREDIENTS */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.card}>
          {recipe.ingredients.map((i: any, idx: number) => (
            <Text key={idx} style={styles.listItem}>
              • {i.name} ({i.quantity} {i.unit})
            </Text>
          ))}
        </View>

        {/* STEPS */}
        <Text style={styles.sectionTitle}>Cooking Steps</Text>
        <View style={styles.card}>
          {recipe.steps.map((s: any) => (
            <View key={s.stepNumber} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>
                  {s.stepNumber}
                </Text>
              </View>
              <Text style={styles.stepText}>
                {s.instruction}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 300,
  },

  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  back: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },

  like: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#565656',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },

  metaText: {
    fontSize: 13,
    color: '#777',
    marginRight: 12,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#565656',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },

  listItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },

  stepRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F66300',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  stepNumberText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
