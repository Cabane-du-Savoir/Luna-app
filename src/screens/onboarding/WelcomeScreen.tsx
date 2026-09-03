import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import TrustScreen from './TrustScreen';

type WelcomeScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [showTrustFallback, setShowTrustFallback] = React.useState(false);

  const handleStart = () => {
    setShowTrustFallback(true);
    navigation.push('Trust');
  };

  const handleLogin = () => {
    navigation.push('Signup');
  };

  if (showTrustFallback) {
    return <TrustScreen />;
  }

  return (
    <View style={styles.container}>
      {/* Logo Mark */}
      <View style={styles.logoContainer}>
        <View style={styles.logoMark} />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.mainTitle}>Ton cycle,</Text>
        <Text style={[styles.mainTitle, styles.subtitle]}>en douceur.</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Luna calcule et suit tes cycles, et t'enseigne comment prendre soin de ta santé intime.
      </Text>

      {/* Primary Button */}
      <Pressable style={styles.primaryButton} onPress={handleStart} onPressIn={handleStart} onClick={handleStart}>
        <Text style={styles.primaryButtonText}>Commencer</Text>
      </Pressable>

      {/* Text Link */}
      <Pressable onPress={handleLogin} onPressIn={handleLogin} onClick={handleLogin}>
        <Text style={styles.link}>J'ai déjà un compte</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cream,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoMark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.Rose,
  },
  textContainer: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: Typography.sizes.greeting,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.Rose,
    fontStyle: 'italic',
  },
  description: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
  link: {
    color: Colors.Plum,
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
