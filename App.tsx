import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_400Regular, PlayfairDisplay_500Medium, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Screens
import OnboardingStack from './src/navigation/OnboardingStack';
import CycleScreen from './src/screens/main/CycleScreen';
import TipsScreen from './src/screens/main/TipsScreen';
import JournalScreen from './src/screens/main/JournalScreen';
import QuestionsScreen from './src/screens/main/QuestionsScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';

// Navigation
import { RootStackParamList, RootTabParamList } from './src/types/navigation';

// Context & Stores
import { AppProvider } from './src/context/AppContext';
import { useAuthStore } from './src/store/authStore';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#7a2d4f',
        tabBarInactiveTintColor: '#9d8991',
        tabBarStyle: {
          backgroundColor: '#fffdfc',
          borderTopColor: '#f6e7e4',
          height: 64,
          paddingTop: 4,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Cycle: 'calendar-month',
            Tips: 'lightbulb-outline',
            Journal: 'notebook-outline',
            Questions: 'message-question-outline',
            Profile: 'account-circle-outline',
          } as const;

          return <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Cycle"
        component={CycleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tips"
        component={TipsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Questions"
        component={QuestionsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
  });
  const { isAuthenticated, restoreToken } = useAuthStore();

  useEffect(() => {
    if (!fontsLoaded) return;

    async function prepare() {
      try {
        // Restore token
        await restoreToken();

        setAppReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded, restoreToken]);

  if (!appReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fffaf8" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <Stack.Screen name="Onboarding" component={OnboardingStack} />
            ) : (
              <Stack.Screen name="Main" component={MainApp} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
