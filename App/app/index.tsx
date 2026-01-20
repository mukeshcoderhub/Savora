import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../src/theme/colors';
import { useRef } from 'react';
import { useRouter } from 'expo-router';


export default function Home() {
  const router = useRouter();

  /* ===== ROTATION STATE ===== */
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  /* ===== ROTATE ON TAP ===== */
  const rotateOnce = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* ===== TOP HEADER ===== */}
      <ImageBackground
        source={require('../assets/images/brown-texture_1253-95.avif')}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.topRow}>
          <Text style={styles.logoText}>Savora</Text>

          <TouchableOpacity style={styles.profile}>
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={18}
            color={COLORS.textMuted}
          />
          <TextInput
            placeholder="Search recipes"
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
            autoFocus={false}
            caretHidden={true}
          />
        </View>
      </ImageBackground>

      {/* ===== HERO SECTION ===== */}
      <LinearGradient
        colors={[
          '#FFFFFF',
          COLORS.primarySoft,
          COLORS.primarySoft,
        ]}
        style={styles.heroSection}
      >
        {/* Title */}
        <Text style={styles.heroTitle}>
          Clarity in every recipe
        </Text>

        {/* Tap-to-Rotate Image */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={rotateOnce}
        >
          <Animated.Image
            source={require('../assets/images/foodHomePage.png')}
            style={[
              styles.heroFoodImage,
              { transform: [{ rotate: rotation }] },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* CTA */}
        <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/recipe/index')}>
          <Text style={styles.exploreText}>
            Explore Recipes
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ===== HEADER ===== */
  header: {
    height: 180,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginTop: 20,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: COLORS.textPrimary,
  },

  /* ===== HERO ===== */
  heroSection: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.textPrimary,
    lineHeight: 36,
    marginBottom: 32,
  },

  heroFoodImage: {
    width: 220,
    height: 220,
    marginBottom: 36,
  },

  exploreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 28,
    elevation: 3,
  },

  exploreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
 