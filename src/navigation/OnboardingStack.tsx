import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';

// Screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import TrustScreen from '../screens/onboarding/TrustScreen';
import SignupScreen from '../screens/onboarding/SignupScreen';
import NameScreen from '../screens/onboarding/NameScreen';
import AgeScreen from '../screens/onboarding/AgeScreen';
import SituationScreen from '../screens/onboarding/SituationScreen';
import LastPeriodScreen from '../screens/onboarding/LastPeriodScreen';
import CycleLengthScreen from '../screens/onboarding/CycleLengthScreen';
import InterestsScreen from '../screens/onboarding/InterestsScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Trust" component={TrustScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Age" component={AgeScreen} />
      <Stack.Screen name="Situation" component={SituationScreen} />
      <Stack.Screen name="LastPeriod" component={LastPeriodScreen} />
      <Stack.Screen name="CycleLength" component={CycleLengthScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
