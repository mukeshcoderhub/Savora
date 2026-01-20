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
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/theme/colors';
import { getRecipeById } from '../../src/services/recipeService';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getRecipeById(id as string)
      .then(data => {
        setRecipe(data);
        setError(false);
      })
      .catch(err => {
        console.log('DETAIL ERROR:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (error || !recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: COLORS.primary }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.coverImage }} style={styles.image} />

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>

        <Text style={styles.meta}>
          ⏱ {recipe.prepTime + recipe.cookTime} min • 🍽 {recipe.servings}
        </Text>

        <Text style={styles.section}>Ingredients</Text>
        {recipe.ingredients.map((i: any, idx: number) => (
          <Text key={idx}>
            • {i.name} ({i.quantity} {i.unit})
          </Text>
        ))}

        <Text style={styles.section}>Steps</Text>
        {recipe.steps.map((s: any) => (
          <Text key={s.stepNumber}>
            {s.stepNumber}. {s.instruction}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  image: { height: 260, width: '100%' },
  back: { position: 'absolute', top: 50, left: 16 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  meta: { marginVertical: 8, color: COLORS.textMuted },
  section: { marginTop: 16, fontSize: 18, fontWeight: '600' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
