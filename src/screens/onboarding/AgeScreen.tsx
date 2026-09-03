import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';

type AgeScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Age'>;

const AgeScreen: React.FC = () => {
  const navigation = useNavigation<AgeScreenNavigationProp>();
  const [age, setAge] = useState(16);

  const handleContinue = () => {
    navigation.navigate('Situation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quel âge as-tu ?</Text>

      <View style={styles.ageDisplay}>
        <Text style={styles.ageNumber}>{Math.round(age)}</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={55}
        value={age}
        onValueChange={setAge}
        step={1}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.primaryButtonText}>Continuer</Text>
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
    marginBottom: 60,
    textAlign: 'center',
  },
  ageDisplay: {
    alignItems: 'center',
    marginBottom: 60,
  },
  ageNumber: {
    fontSize: Typography.sizes.heroNumber,
    fontFamily: Typography.families.heading,
    color: Colors.Rose,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 60,
  },
  primaryButton: {
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
});

export default AgeScreen;
