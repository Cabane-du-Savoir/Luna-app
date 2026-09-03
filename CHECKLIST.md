# 🚀 Checklist - Luna App - Prochaines Étapes

## Phase 1: Installation & Setup (1-2 jours)

### Installation des dépendances
- [ ] Exécuter `npm install` dans `luna-app/`
- [ ] Vérifier l'installation: `npm start`
- [ ] Tester sur web: `npm run web`

### Assets & Configuration
- [ ] Créer dossier `assets/fonts/`
- [ ] Télécharger Google Fonts (Cormorant, Jost)
- [ ] Placer fichiers .ttf dans `assets/fonts/`
- [ ] Créer dossier `assets/images/` avec icones de base
- [ ] Créer dossier `assets/photos/` avec images articles
- [ ] Créer `icon.png` et `splash.png` (voir dimensions dans SETUP.md)

### Configuration Expo
- [ ] Mettre à jour `app.json` avec vos IDs
- [ ] Créer compte Expo si nécessaire
- [ ] Configurer `eas.json` pour builds

## Phase 2: Composants Réutilisables (3-4 jours)

### Composants de base
- [ ] `Button` component (primary, secondary, tertiary)
- [ ] `Card` component (with variants)
- [ ] `Header` component
- [ ] `Input` component
- [ ] `Chip` component
- [ ] `ProgressBar` component
- [ ] `EmptyState` component

### Composants avancés
- [ ] `BottomSheet` component (pour sheets)
- [ ] `Modal` component
- [ ] `Slider` component avec labels
- [ ] `RadioButton` component
- [ ] `Checkbox` component

### Helpers
- [ ] Placer tous les composants dans `src/components/`
- [ ] Créer `src/components/index.ts` avec exports

## Phase 3: Services & Intégrations (4-5 jours)

### Firebase (si utilisation)
- [ ] Créer projet Firebase
- [ ] Configurer clés d'API
- [ ] Implémenter authentification Gmail
- [ ] Configurer Firestore pour les données
- [ ] Configurer Storage pour photos

### Paiement
- [ ] Choisir provider (Stripe, Google Play, etc.)
- [ ] Créer account & keys
- [ ] Intégrer SDK
- [ ] Tester flux paiement

### Notifications
- [ ] Configurer Firebase Cloud Messaging
- [ ] Implémenter notifications locales
- [ ] Ajouter permissions (Android/iOS)

### Google Sign-In
- [ ] Créer Google OAuth credentials
- [ ] Implémenter @react-native-google-signin
- [ ] Tester sur device

## Phase 4: Logique métier (3-4 jours)

### Authentification
- [ ] Implémenter login Gmail réel
- [ ] Implémenter passcode (4 chiffres)
- [ ] Implémenter logout
- [ ] Implémenter restore token
- [ ] Implémenter reset password

### Cycle Logic
- [ ] Implémenter calcul prédiction cycle
- [ ] Implémenter détection phases
- [ ] Implémenter fertility window
- [ ] Implémenter graphes prédictions

### Journal
- [ ] Implémenter save/load journal entries
- [ ] Implémenter statistiques
- [ ] Implémenter trending patterns
- [ ] Implémenter export données

### Questions & Réponses
- [ ] Implémenter post question
- [ ] Implémenter get questions
- [ ] Implémenter modération
- [ ] Implémenter upvote/downvote

## Phase 5: Contenu & Données (2-3 jours)

### Articles
- [ ] Valider médical des 5 articles
- [ ] Créer photos pour chaque article
- [ ] Implémenter paywall
- [ ] Ajouter médications dans Firestore

### Questions pré-chargées
- [ ] Créer collection de Q&A de démarrage
- [ ] Ajouter réponses vérifiées
- [ ] Seeder la base de données

### Internationalization (optionnel)
- [ ] Ajouter i18n pour FR/EN
- [ ] Traduire tous les textes
- [ ] Créer versions articles EN
- [ ] Tester sur device

## Phase 6: Testing & QA (2-3 jours)

### Tests unitaires
- [ ] Cycle calculations
- [ ] Date formatting
- [ ] Validation inputs
- [ ] Coverage > 80%

### Tests d'intégration
- [ ] Navigation flow
- [ ] Authentification flow
- [ ] Paiement flow
- [ ] Sync data

### Tests manuels
- [ ] Tous les écrans sur iOS
- [ ] Tous les écrans sur Android
- [ ] Tous les flows: onboarding → main → logout
- [ ] Offline behavior
- [ ] Performance (< 1s load)

### Accessibility
- [ ] Screen reader testing
- [ ] Color contrast check
- [ ] Touch target sizes (44px+)
- [ ] Keyboard navigation

## Phase 7: Build & Deploy (2-3 jours)

### Build Expo
- [ ] `eas build --platform ios --profile production`
- [ ] `eas build --platform android --profile production`
- [ ] Tester IPA/APK
- [ ] Signer avec certificats

### App Store
- [ ] iOS: Créer app record, uploads build
- [ ] Remplir description, screenshots
- [ ] Soumettre pour review (1-3 jours)
- [ ] Gérer rejections si nécessaire

### Play Store
- [ ] Android: Créer app listing, upload APK
- [ ] Remplir description, graphics
- [ ] Soumettre pour review (1-4h)
- [ ] Gérer rejections

### Post-launch
- [ ] Monitorer crashes
- [ ] Collecter feedback
- [ ] Fix bugs critiques
- [ ] Itérer sur UX

## Phase 8: Maintenance & Improvements (Ongoing)

### Bugs & Fixes
- [ ] Monitorer error logs
- [ ] Reproduire bugs
- [ ] Créer releases hotfix
- [ ] Version patches (1.0.1, 1.0.2)

### Features
- [ ] Implémenter statistiques avancées
- [ ] Ajouter plus d'articles
- [ ] Implémenter wearables sync
- [ ] Ajouter community features

### Marketing
- [ ] Analytics setup (Firebase Analytics)
- [ ] Crash reporting (Sentry)
- [ ] Performance monitoring
- [ ] User funnel tracking

## Ressources Utiles

### Documentation
- [Expo Docs](https://docs.expo.dev)
- [React Native](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Zustand](https://github.com/pmndrs/zustand)

### Community
- Stack Overflow
- React Native Discord
- Expo Community Slack

### Tools
- Figma (design)
- GitHub (version control)
- Firebase Console (monitoring)
- App Store Connect (iOS)
- Google Play Console (Android)

## 📊 Estimation de temps

| Phase | Jours | Total |
|-------|-------|-------|
| Setup | 2 | 2 |
| Composants | 4 | 6 |
| Services | 5 | 11 |
| Logique | 4 | 15 |
| Contenu | 3 | 18 |
| Testing | 3 | 21 |
| Build/Deploy | 3 | 24 |

**Total estimé: ~3-4 semaines avec 1 dev full-time**

## 🎯 MVP vs v1.0

### MVP (Semaine 1-2)
- ✅ Tous les écrans UI
- ✅ Authentification (mock/real)
- ✅ Cycle tracking basique
- ✅ Journal + symtômes
- ✅ 5 articles
- ✅ Questions/réponses (mock)
- ✅ Paiement (interface)
- ❌ Push notifications
- ❌ Intégrations avancées
- ❌ Analytics

### v1.0 (Complet)
- ✅ Tout du MVP
- ✅ Authentification complète
- ✅ Paiement réel
- ✅ Notifications push
- ✅ Firebase sync
- ✅ Backup chiffré
- ✅ Analytics
- ✅ Modération Q&A
- ✅ Statistiques avancées
- ✅ Wearables prep

---

**Status**: Ready to implement
**Priority**: High
**Audience**: Women 13+
**Platforms**: iOS, Android, Web (PWA)
**Business Model**: 5$ one-time payment
