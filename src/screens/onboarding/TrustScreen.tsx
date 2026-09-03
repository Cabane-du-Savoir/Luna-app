import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';

type TrustScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Trust'>;

const TrustScreen: React.FC = () => {
  const navigation = useNavigation<TrustScreenNavigationProp>();

  const trustPoints = [
    { title: 'Tes données t\'appartiennent', icon: '🔒' },
    { title: 'Email uniquement pour sauvegarder', icon: '📧' },
    { title: 'Code de sécurité optionnel', icon: '🔐' },
  ];

  const handleContinue = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nous prenons soin de tes données</Text>

      <View style={styles.pointsContainer}>
        {trustPoints.map((point, index) => (
          <View key={index} style={styles.trustPoint}>
            <View style={styles.pointIcon}>
              <Text style={styles.iconText}>{point.icon}</Text>
            </View>
            <Text style={styles.pointText}>{point.title}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.primaryButtonText}>J'ai compris</Text>
      </TouchableOpacity>
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
  pointsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  trustPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  pointIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.BlushLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  pointText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
});

export default TrustScreen;
