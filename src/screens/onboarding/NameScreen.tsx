import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';

type NameScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Name'>;

const NameScreen: React.FC = () => {
  const navigation = useNavigation<NameScreenNavigationProp>();
  const [name, setName] = useState('');

  const handleContinue = () => {
    navigation.navigate('Age');
  };

  const handleSkip = () => {
    navigation.navigate('Age');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quel est ton prénom ?</Text>

      <TextInput
        style={styles.input}
        placeholder="Ton prénom"
        placeholderTextColor={Colors.Text}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.primaryButtonText}>Continuer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.link}>Passer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cream,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.BlushLight,
    borderWidth: 1,
    borderColor: Colors.BorderWarm,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 40,
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
  },
});

export default NameScreen;
