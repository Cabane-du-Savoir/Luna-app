import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/tokens';

interface Question {
  id: string;
  tag: string;
  content: string;
  createdAt: string;
  author: string;
  answered: boolean;
  likes: number;
}

const QuestionsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'recent' | 'unanswered'>('recent');
  const [askOpen, setAskOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionTag, setQuestionTag] = useState('Cycle');
  const [submitted, setSubmitted] = useState(false);

  const questions: Question[] = [
    {
      id: '1',
      tag: 'Toilette',
      content: 'Est-ce normal d\'avoir des variations dans la durée de mes règles ?',
      createdAt: 'il y a 2h',
      author: 'Marie D.',
      answered: true,
      likes: 12,
    },
    {
      id: '2',
      tag: 'Symptômes',
      content: 'Comment gérer la douleur pendant les règles ?',
      createdAt: 'il y a 5h',
      author: 'Sophie M.',
      answered: false,
      likes: 3,
    },
    {
      id: '3',
      tag: 'Cycle',
      content: 'Pourquoi mon cycle change-t-il de longueur ?',
      createdAt: 'il y a 1j',
      author: 'Emma L.',
      answered: true,
      likes: 8,
    },
  ];

  const filteredQuestions = selectedTab === 'recent' 
    ? questions 
    : questions.filter(q => !q.answered);

  const submitQuestion = () => {
    if (!questionText.trim()) return;
    setSubmitted(true);
    setQuestionText('');
    setAskOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Questions</Text>
          <Text style={styles.subtitle}>Anonyme. Des réponses claires, sans diagnostic.</Text>
        </View>

        <View style={styles.transparencyCard}>
          <Text style={styles.transparencyTitle}>Qui répond ?</Text>
          <Text style={styles.transparencyText}>
            Luna, notre assistante IA, répond aux questions d'hygiène et de cycle. Les questions sur une douleur ou un symptôme sont transmises à une professionnelle de santé.
          </Text>
          <Text style={styles.transparencyNote}>Aucune réponse ne remplace une consultation.</Text>
        </View>

        {/* Ask Question Card */}
        <TouchableOpacity style={styles.askCard} onPress={() => setAskOpen(true)}>
          <Text style={styles.askCardIcon}>+</Text>
          <View style={styles.askCardContent}>
            <Text style={styles.askCardTitle}>Poser ma question</Text>
            <Text style={styles.askCardSubtitle}>Pose une question, reçois une réponse</Text>
          </View>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'recent' && styles.tabActive]}
            onPress={() => setSelectedTab('recent')}
          >
            <Text style={[styles.tabText, selectedTab === 'recent' && styles.tabTextActive]}>
              Récentes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'unanswered' && styles.tabActive]}
            onPress={() => setSelectedTab('unanswered')}
          >
            <Text style={[styles.tabText, selectedTab === 'unanswered' && styles.tabTextActive]}>
              Sans réponse
            </Text>
          </TouchableOpacity>
        </View>
        {submitted && <Text style={styles.submittedMessage}>Question envoyée anonymement. Luna prépare une réponse.</Text>}

        {/* Questions List */}
        <View style={styles.questionsContainer}>
          {filteredQuestions.map(question => (
            <View key={question.id} style={styles.questionCard}>
              {/* Tag and Time */}
              <View style={styles.questionHeader}>
                <Text style={styles.questionTag}>{question.tag}</Text>
                <Text style={styles.questionTime}>{question.createdAt}</Text>
              </View>

              {/* Question Text */}
              <Text style={styles.questionText}>{question.content}</Text>

              {/* Answer (if exists) */}
              {question.answered && (
                <View style={styles.answerContainer}>
                  <View style={styles.answerLine} />
                  <View style={styles.answerContent}>
                    <Text style={styles.answerText}>
                      La durée des règles peut varier selon plusieurs facteurs : stress, changement de régime alimentaire, exercice physique, ou des variations hormonales normales.
                    </Text>
                    <Text style={styles.answerAttribution}>
                      Réponse vérifiée · sage-femme
                    </Text>
                  </View>
                </View>
              )}

              {!question.answered && (
                <Text style={styles.unansweredText}>
                  2 réponses en attente
                </Text>
              )}

              {/* Footer */}
              <View style={styles.questionFooter}>
                <TouchableOpacity style={styles.likeButton}>
                  <Text style={styles.likeButtonText}>♥ {question.likes}</Text>
                </TouchableOpacity>
                <Text style={styles.replyCount}>💬 Répondre</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={askOpen} transparent animationType="slide" onRequestClose={() => setAskOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.askSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Poser ma question</Text>
            <Text style={styles.sheetDescription}>Ta question sera publiée anonymement. Luna ne pose pas de diagnostic.</Text>
            <TextInput
              style={styles.questionInput}
              multiline
              maxLength={500}
              placeholder="Écris ta question ici..."
              placeholderTextColor={Colors.Text}
              value={questionText}
              onChangeText={setQuestionText}
              textAlignVertical="top"
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagScroll}>
              {['Cycle', 'Toilette', 'Douleurs', 'Symptômes'].map(tag => (
                <TouchableOpacity key={tag} style={[styles.tagChip, questionTag === tag && styles.tagChipSelected]} onPress={() => setQuestionTag(tag)}>
                  <Text style={styles.tagChipText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={[styles.sendButton, !questionText.trim() && styles.sendButtonDisabled]} onPress={submitQuestion} disabled={!questionText.trim()}>
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAskOpen(false)}><Text style={styles.cancelText}>Plus tard</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  askCard: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.Plum,
    borderRadius: 21,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  askCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.Plum,
    color: Colors.TextOnPlum,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 40,
    marginRight: 12,
  },
  askCardContent: {
    flex: 1,
  },
  askCardTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 2,
  },
  askCardSubtitle: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  transparencyCard: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
    backgroundColor: Colors.BlushLight,
    borderRadius: 20,
    padding: 16,
  },
  transparencyTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 6,
  },
  transparencyText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    lineHeight: 19,
  },
  transparencyNote: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Alert,
    marginTop: 8,
  },
  submittedMessage: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: 12,
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(74,33,53,.4)',
    justifyContent: 'flex-end',
  },
  askSheet: {
    backgroundColor: Colors.Cream,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 22,
    paddingBottom: 30,
  },
  sheetHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.Blush,
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetTitle: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
  },
  sheetDescription: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    lineHeight: 19,
    color: Colors.Text,
    opacity: 0.65,
    marginTop: 4,
    marginBottom: 14,
  },
  questionInput: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: Colors.BorderWarm,
    borderRadius: 16,
    backgroundColor: Colors.BlushLight,
    padding: 14,
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  tagScroll: {
    marginVertical: 14,
  },
  tagChip: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 22,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginRight: 8,
  },
  tagChipSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  tagChipText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  sendButton: {
    minHeight: 52,
    borderRadius: 26,
    backgroundColor: Colors.Plum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    color: Colors.TextOnPlum,
  },
  cancelText: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.Plum,
  },
  tabText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  tabTextActive: {
    color: Colors.Plum,
    opacity: 1,
    fontWeight: '500',
  },
  questionsContainer: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 21,
    padding: 16,
    marginBottom: 12,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  questionTag: {
    fontSize: 10,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  questionTime: {
    fontSize: 10,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  questionText: {
    fontSize: Typography.sizes.questionText,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 12,
    lineHeight: 24,
  },
  answerContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
  },
  answerLine: {
    width: 2,
    backgroundColor: Colors.BorderWarm,
    marginRight: 12,
  },
  answerContent: {
    flex: 1,
  },
  answerText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    marginBottom: 8,
    lineHeight: 20,
  },
  answerAttribution: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  unansweredText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Alert,
    marginBottom: 12,
  },
  questionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  likeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  likeButtonText: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  replyCount: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
});

export default QuestionsScreen;
