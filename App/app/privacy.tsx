import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicy() {
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
          Privacy Policy
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* INTRO */}
        <Text style={styles.text}>
          Savora respects your privacy. This Privacy Policy
          explains how information is handled when you use
          the Savora mobile application.
        </Text>

        {/* DATA COLLECTION */}
        <Text style={styles.sectionTitle}>
          Information We Collect
        </Text>

        <Text style={styles.text}>
          Savora does not collect, store, or process any
          personal user data.
        </Text>

        <Text style={styles.text}>
          You can browse recipes, view details, and save
          favourite recipes without creating an account or
          providing any personal information.
        </Text>

        {/* LOCAL STORAGE */}
        <Text style={styles.sectionTitle}>
          Local Storage
        </Text>

        <Text style={styles.text}>
          Savora uses local device storage to save your
          favourite recipes. This data is stored only on
          your device and is never transmitted to any
          server.
        </Text>

        <Text style={styles.text}>
          You can remove all locally stored favourite
          recipes at any time from the app settings.
        </Text>

        {/* INTERNET */}
        <Text style={styles.sectionTitle}>
          Internet & Third-Party Services
        </Text>

        <Text style={styles.text}>
          Savora fetches recipe content from its own backend
          server. No personal or sensitive user information
          is sent during this process.
        </Text>

        <Text style={styles.text}>
          Savora does not use third-party analytics,
          advertising services, or tracking tools.
        </Text>

        {/* SECURITY */}
        <Text style={styles.sectionTitle}>
          Data Security
        </Text>

        <Text style={styles.text}>
          Since Savora does not collect personal data, there
          is no risk of your personal information being
          shared, sold, or misused.
        </Text>

        {/* CHILDREN */}
        <Text style={styles.sectionTitle}>
          Children’s Privacy
        </Text>

        <Text style={styles.text}>
          Savora is safe for users of all ages. The app does
          not knowingly collect any information from
          children under the age of 13.
        </Text>

        {/* CHANGES */}
        <Text style={styles.sectionTitle}>
          Changes to This Policy
        </Text>

        <Text style={styles.text}>
          If Savora introduces new features that affect
          privacy, this policy will be updated accordingly.
        </Text>

        {/* CONTACT */}
        <Text style={styles.sectionTitle}>
          Contact
        </Text>

        <Text style={styles.text}>
          If you have any questions about this Privacy
          Policy, please contact the developer.
        </Text>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Savora – Cook smart • Eat better
          </Text>
          <Text style={styles.footerText}>
            Developed by Mukesh
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

  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#565656',
  },

  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },

  /* FOOTER */
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
