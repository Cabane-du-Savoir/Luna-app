import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import { articlesData } from '../../constants/articles';
import { Article } from '../../types/data';

const articleImages: Record<string, number> = {
  toilette: require('../../../assets/photos/bain.png'),
  odeurs: require('../../../assets/photos/odeurs.png'),
  rasage: require('../../../assets/photos/rasage.png'),
  demangeaisons: require('../../../assets/photos/demangeaisons.png'),
  exercices: require('../../../assets/photos/exercices.png'),
  rapports: require('../../../assets/photos/bain.png'),
  alimentation: require('../../../assets/photos/cycle.png'),
  prevention: require('../../../assets/photos/cycle.png'),
};

const TipsScreen: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('Tout');
  const [trialDays] = useState(2);
  const [paid] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const topics = ['Tout', 'Toilette', 'Odeurs', 'Rasage', 'Démangeaisons', 'Exercices', 'Rapports', 'Alimentation', 'Prévention'];

  const articles = articlesData;

  const filteredArticles = selectedTopic === 'Tout'
    ? articles
    : articles.filter(a => a.topic === selectedTopic);

  const openArticle = (article: Article) => {
    if (!paid && !article.free) {
      Alert.alert('Article verrouillé', 'Débloque tous les articles avec un paiement unique de 5 $.');
      return;
    }
    setSelectedArticle(article);
  };

  if (selectedArticle) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.articleHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedArticle(null)}>
              <Text style={styles.backButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.articleHeaderLabel}>{selectedArticle.topic}</Text>
          </View>
          <View style={styles.articleHero}>
            <Image
              source={articleImages[selectedArticle.image] || require('../../../assets/photos/header.png')}
              style={styles.articleHeroImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.articleBody}>
            <Text style={styles.articleMeta}>ASTUCE · {selectedArticle.topic.toUpperCase()}</Text>
            <Text style={styles.articlePageTitle}>{selectedArticle.title}</Text>
            <Text style={styles.articleIntro}>{selectedArticle.intro}</Text>
            {selectedArticle.steps.map(step => (
              <View key={step.number} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepText}>{step.body}</Text>
                </View>
              </View>
            ))}
            <View style={styles.avoidCard}>
              <Text style={styles.avoidLabel}>À ÉVITER</Text>
              <Text style={styles.avoidText}>{selectedArticle.avoid}</Text>
            </View>
            <Text style={styles.disclaimer}>
              Ces informations ne remplacent pas l'avis d'un professionnel de santé. Consulte si un symptôme persiste ou t'inquiète.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Astuces</Text>
          <Text style={styles.subtitle}>Conseils pratiques et prouvés</Text>
        </View>

        {/* Trial Banner */}
        {!paid && (
          <View style={styles.trialBanner}>
            <Text style={styles.trialLabel}>ESSAI GRATUIT</Text>
            <Text style={styles.trialText}>Encore {trialDays} jours d'essai</Text>
            <Text style={styles.trialSubtext}>Ensuite 5 $ une seule fois, à vie.</Text>
          </View>
        )}

        {/* Topic Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
        >
          {topics.map(topic => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.filterChip,
                selectedTopic === topic && styles.filterChipActive,
              ]}
              onPress={() => setSelectedTopic(topic)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedTopic === topic && styles.filterChipTextActive,
                ]}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Articles List */}
        <View style={styles.articlesContainer}>
          {filteredArticles.map(article => (
            <TouchableOpacity key={article.id} style={styles.articleCard} onPress={() => openArticle(article)}>
              <View style={styles.articleImage}>
                <Image
                  source={articleImages[article.image] || require('../../../assets/photos/header.png')}
                  style={styles.articleImagePhoto}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleMeta}>
                  4 min · {article.topic}
                </Text>
              </View>
              <View style={styles.articleBadge}>
                <Text style={styles.articleBadgeText}>
                  {article.free || paid ? '›' : '🔒'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.Cream,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Cream,
  },
  header: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingVertical: 20,
  },
  title: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  trialBanner: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
    backgroundColor: Colors.BlushPale,
    backgroundImage: 'linear-gradient(160deg,#f8e4e2,#f1d6da)',
    borderRadius: 21,
    padding: 16,
  },
  trialLabel: {
    fontSize: 10.5,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontWeight: '500',
  },
  trialText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 2,
  },
  trialSubtext: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  filtersScroll: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
  },
  filterChip: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  filterChipActive: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  filterChipText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  filterChipTextActive: {
    color: Colors.Plum,
    fontWeight: '500',
  },
  articlesContainer: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: 20,
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: Colors.CreamCard,
    borderRadius: 21,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.Border,
    alignItems: 'center',
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: Colors.BlushLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  articleImageEmoji: {
    fontSize: 40,
  },
  articleImagePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 4,
  },
  articleMeta: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  articleBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.BlushLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleBadgeText: {
    fontSize: 16,
    color: Colors.Plum,
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.BlushLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 28,
    lineHeight: 32,
    color: Colors.Plum,
  },
  articleHeaderLabel: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  articleHero: {
    height: 150,
    backgroundColor: Colors.Blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleHeroImage: {
    width: '100%',
    height: '100%',
  },
  articleBody: {
    padding: Spacing.screenHorizontalPadding,
  },
  articlePageTitle: {
    fontSize: Typography.sizes.articleTitle,
    lineHeight: 36,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 12,
  },
  articleIntro: {
    fontSize: Typography.sizes.body,
    lineHeight: 22,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.72,
    marginBottom: 24,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 18,
    fontFamily: Typography.families.heading,
    color: Colors.Plum,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 4,
  },
  stepText: {
    fontSize: Typography.sizes.body,
    lineHeight: 21,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.72,
  },
  avoidCard: {
    backgroundColor: '#fdf5f6',
    borderWidth: 1,
    borderColor: Colors.BorderAlert,
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
    marginBottom: 18,
  },
  avoidLabel: {
    fontSize: 10.5,
    letterSpacing: 1.5,
    fontFamily: Typography.families.body,
    color: Colors.Alert,
    marginBottom: 8,
  },
  avoidText: {
    fontSize: Typography.sizes.secondary,
    lineHeight: 20,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  disclaimer: {
    fontSize: Typography.sizes.caption,
    lineHeight: 17,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.45,
    paddingBottom: 28,
  },
});

export default TipsScreen;
