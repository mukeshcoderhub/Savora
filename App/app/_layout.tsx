import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />  
      <Stack.Screen name="recipe/index" />
      <Stack.Screen name="recipe/[id]" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="favourites" />
      <Stack.Screen name="about" />
      <Stack.Screen name="privacy" />
    </Stack>
  );
}
