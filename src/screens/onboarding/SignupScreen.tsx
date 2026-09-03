import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import { useAuthStore } from '../../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignupScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setUser = useAuthStore(state => state.setUser);

  const handleGoogleSignup = async () => {
    // In a real app, this would use Google Sign-In
    if (email) {
      const user = {
        gmail: email,
        situation: 'not_started' as const,
        language: 'FR' as const,
        signupDate: new Date().toISOString(),
      };
      await AsyncStorage.setItem('@luna_user', JSON.stringify(user));
      await AsyncStorage.setItem('@luna_token', 'mock_token_' + Date.now());
      setUser(user);
      setAuthenticated(true);
    }
  };

  const handleContinueWithoutAccount = () => {
    navigation.navigate('Name');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejoins-nous</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Ton email"
          placeholderTextColor={Colors.Text}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleGoogleSignup}>
          <Text style={styles.primaryButtonText}>Continuer</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Utiliser Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleContinueWithoutAccount}>
          <Text style={styles.secondaryLink}>Continuer sans compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cream,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingTop: 60,
  },
  title: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.BlushLight,
    borderWidth: 1,
    borderColor: Colors.BorderWarm,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
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
    marginBottom: 16,
  },
  secondaryLink: {
    color: Colors.Text,
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    textAlign: 'center',
    opacity: 0.65,
  },
});

export default SignupScreen;
