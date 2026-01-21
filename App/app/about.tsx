import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AboutSavora() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="#565656"
            style={{marginTop:20}}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          About Savora
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* APP NAME */}
        <Text style={styles.title}>Savora</Text>
        <Text style={styles.tagline}>
          Discover • Cook • Enjoy
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.text}>
          Savora is a modern recipe discovery app designed
          to make everyday cooking simple, enjoyable, and
          inspiring.
        </Text>

        <Text style={styles.text}>
          Explore a wide range of Indian and global recipes,
          save your favourite dishes, and follow step-by-step
          cooking instructions — all in one clean and
          user-friendly app.
        </Text>

        <Text style={styles.text}>
          Whether you’re a beginner or a passionate home
          cook, Savora helps you cook smarter and eat better.
        </Text>

        {/* FEATURES */}
        <Text style={styles.sectionTitle}>
          Key Features
        </Text>

        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={18} color="#F66300" />
          <Text style={styles.featureText}>
            Browse and search recipes easily
          </Text>
        </View>

        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={18} color="#F66300" />
          <Text style={styles.featureText}>
            Save favourite recipes locally
          </Text>
        </View>

        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={18} color="#F66300" />
          <Text style={styles.featureText}>
            Clean, fast, and modern UI
          </Text>
        </View>

        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={18} color="#F66300" />
          <Text style={styles.featureText}>
            No login required to explore
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Developed with ❤️ by Mukesh
          </Text>
          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* HEADER */
  header: {
    height: 100,
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
    marginTop:20
  },

  /* CONTENT */
  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#565656',
    textAlign: 'center',
  },

  tagline: {
    marginTop: 4,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },

  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 14,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#565656',
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },

  featureText: {
    fontSize: 14,
    color: '#555',
  },

  /* FOOTER */
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: '#777',
  },

  versionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#aaa',
  },
});
