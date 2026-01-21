import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

const FAV_KEY = 'FAV_RECIPES';

export default function ProfileScreen() {
  const router = useRouter();

  const clearFavourites = async () => {
    Alert.alert(
      'Clear Favourites',
      'Are you sure you want to remove all favourite recipes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem(FAV_KEY);
            Alert.alert('Done', 'All favourites cleared');
          },
        },
      ]
    );
  };

  const Item = ({
    icon,
    label,
    onPress,
    color = '#565656',
  }: {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        {icon}
        <Text style={[styles.itemText, { color }]}>
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#bbb"
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="restaurant" size={28} color="#fff" />
        </View>
        <Text style={styles.appName}>Savora</Text>
        <Text style={styles.tagline}>
          Cook smart • Eat better
        </Text>
      </View>

      {/* SECTION */}
      <View style={styles.section}>
        <Item
          icon={
            <Ionicons
              name="heart"
              size={20}
              color="#F66300"
            />
          }
          label="Favourite Recipes"
          onPress={() => router.push('/favourites')}
        />

        <Item
          icon={
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color="#F66300"
            />
          }
          label="About Savora"
          onPress={() => router.push('/about')}
        />

        <Item
          icon={
            <Ionicons
              name="document-text-outline"
              size={20}
              color="#F66300"
            />
          }
          label="Privacy Policy"
          onPress={() => router.push('/privacy')}
        />

        <Item
  icon={
    <Ionicons
      name="mail-outline"
      size={20}
      color="#F66300"
    />
  }
  label="Contact & Feedback"
  onPress={() =>
    Linking.openURL('http://localhost:5173')
  }
/>

      </View>

      {/* DANGER ZONE */}
      <View style={styles.section}>
        <Item
          icon={
            <Ionicons
              name="trash-outline"
              size={20}
              color="#e74c3c"
            />
          }
          label="Clear Favourite Recipes"
          color="#e74c3c"
          onPress={clearFavourites}
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Developed with ❤️ by Mukesh
        </Text>
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

  header: {

    alignItems: 'center',
    paddingVertical: 40,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F66300',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#565656',
  },

  tagline: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    overflow: 'hidden',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  itemText: {
    fontSize: 15,
    fontWeight: '500',
  },

  footer: {
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    color: '#aaa',
  },
});
