# Luna - Application de Suivi des Cycles Menstruels

Luna est une application mobile React Native (Expo) qui aide les femmes à suivre leurs cycles menstruels et à accéder à des conseils pratiques sur la santé intime. L'application offre des fonctionnalités de suivi, des articles éducatifs, un journal personnel et une communauté de questions-réponses.

## 🚀 Caractéristiques

### 1. Onboarding (9 étapes)
- **Écran de bienvenue** : Introduction et login
- **Trust** : Information sur la confidentialité des données
- **Signup** : Création de compte Gmail
- **Informations personnelles** : Nom, âge, situation
- **Cycle** : Dernier cycle et durée
- **Intérêts** : Sujets d'intérêt et notifications

### 2. 5 Onglets Principaux

#### Cycle (Accueil)
- Vue d'ensemble du cycle actuel
- Nombre de jours jusqu'aux prochaines règles
- Phase actuelle du cycle
- Calendrier hebdomadaire et mensuel
- Actions rapides (enregistrement flux, conseil du jour)

#### Astuces (Articles)
- 5 articles éducatifs validés médicalement
- Filtrage par sujet (Toilette, Odeurs, Rasage, Démangeaisons, Exercices)
- Système de paiement (essai gratuit 3 jours, puis 5$ une fois)
- Articles avec photos, étapes numérotées, sections à éviter

#### Journal
- Enregistrement du flux menstruel
- Suivi de l'humeur
- Enregistrement des symptômes
- Historique des entrées récentes

#### Questions
- Poser des questions à la communauté
- Parcourir les questions récentes et sans réponse
- Réponses vérifiées par des professionnels de santé
- Système de like et compteur de réponses

#### Profil
- Informations utilisateur
- Accès (essai ou accès payant)
- Paramètres (notifications, code de sécurité, sauvegarde)
- Gestion des données et sauvegarde

## 📁 Structure du Projet

```
luna-app/
├── App.tsx                    # Point d'entrée principal
├── app.json                   # Configuration Expo
├── package.json               # Dépendances
├── tsconfig.json              # Configuration TypeScript
├── src/
│   ├── screens/
│   │   ├── onboarding/        # 9 écrans d'onboarding
│   │   └── main/              # 5 écrans principaux (tabs)
│   ├── components/            # Composants réutilisables
│   ├── navigation/            # Configuration de navigation
│   ├── store/                 # Zustand stores (auth, app, data)
│   ├── context/               # Context API
│   ├── types/                 # Types TypeScript
│   ├── constants/             # Tokens de design et données
│   └── utils/                 # Fonctions utilitaires
└── assets/
    ├── fonts/                 # Google Fonts (Cormorant, Jost)
    ├── images/                # Images et icônes
    └── photos/                # Photos d'articles
```

## 🎨 Design Tokens

### Couleurs
- **Primaire (Plum)**: `#7a2d4f`
- **Accentuer (Rose)**: `#a8506b`
- **Fond (Cream)**: `#fffaf8`
- **Cartes**: `#fffdfc` avec bordure `#f6e7e4`

### Typographie
- **Titres**: Cormorant Garamond (400, 500, 600)
- **Corps**: Jost (300, 400, 500)

### Espacement
- **Padding écran**: 22px
- **Espacement vertical**: 16-18px
- **Radius cartes**: 20-21px

## 🔐 Authentification

- Google Sign-In (Gmail)
- Option de compte sans email
- Stockage local des credentials avec AsyncStorage
- Passcode optionnel (4 chiffres avec clavier personnalisé)

## 💰 Système de Paiement

- **Essai gratuit**: 3 jours d'accès complet
- **Paiement unique**: 5$ (à vie)
- **Méthodes supportées**:
  - Google Play Billing (Android)
  - PayPal
  - Carte bancaire
  - Mobile Money (Orange, MTN, Moov)

## 📊 Gestion de l'État

### Zustand Stores

**authStore**:
- `user`: Informations utilisateur
- `isAuthenticated`: État authentification
- `token`: Token d'accès
- `trialDays`: Jours restants d'essai
- `paid`: Accès premium

**appStore**:
- État global (tab actif, articles, etc.)
- Gestion des sheets (login, paiement, question)
- Persistance avec AsyncStorage

**dataStore**:
- `cycleSettings`: Paramètres du cycle
- `journalEntries`: Entrées du journal
- `articles`: Articles disponibles

## 🗄️ Données

### User
```typescript
{
  gmail: string
  nickname?: string
  age?: number
  situation: 'not_started' | 'just_started' | 'had_for_a_while' | 'irregular'
  language: 'FR' | 'EN'
  signupDate: string
}
```

### Cycle Settings
```typescript
{
  cycleLength: number (26-35)
  periodLength: number (3-7)
  lastPeriodStart: string (ISO date)
  regularity: 'regular' | 'irregular' | 'unknown'
}
```

### Journal Entry
```typescript
{
  date: string
  flow?: 'none' | 'light' | 'medium' | 'heavy'
  mood?: 'good' | 'tired' | 'irritable' | 'sad'
  symptoms: string[]
  notes?: string
}
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
cd luna-app
npm install
```

### Démarrage

**Web:**
```bash
npm run web
```

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

### Déploiement

**Avec Expo:**
```bash
eas build --platform ios
eas build --platform android
eas submit --platform ios
eas submit --platform android
```

## 📱 Points Clés de Conception

### Navigation
- Aucune transition entre les tabs (switching instantané)
- Les sheets glissent vers le haut (~240ms, ease-out)
- Navigation par stack pour l'onboarding

### États
- Trial countdown (3 jours)
- Paid unlock de contenu
- Persistance locale complète
- Sync optionnel avec Firebase

### Interactions
- Cartes avec bordures au hover/press
- Boutons de sauvegarde qui changent d'état
- Chips à sélection unique ou multiple
- Sliders pour date/âge

## 🔄 Cycle Menstruel

### Calcul de Prédiction
- Moyenne des 3 derniers cycles observés
- Fallback sur la durée déclarée si < 3 cycles
- Affichage comme plage (estimée) si cycle irrégulier

### Phases
1. Menstruation (1-5 jours)
2. Phase folliculaire (6-12 jours)
3. Fenêtre fertile (12-14 jours)
4. Phase lutéale (15-28 jours)

## 📝 Articles Inclus

5 articles validés médicalement:

1. **Toilette intime**: Bonnes pratiques et prévention
2. **Odeurs**: Causes et solutions naturelles
3. **Rasage sans irritation**: Guide complet
4. **Démangeaisons**: Identification et soulagement
5. **Exercices**: Soulagement des douleurs menstruelles

## 🔒 Confidentialité et Sécurité

- Données enregistrées localement avec AsyncStorage
- Synchronisation Firebase désactivée tant qu'un compte et un projet Firebase ne sont pas configurés
- Aucune donnée vendue ou partagée
- Authentification Gmail sécurisée
- Passcode optionnel à 4 chiffres

## 📚 API et Intégrations

### Firebase (à configurer)
- Authentication (Gmail)
- Firestore (données utilisateur)
- Storage (photos de profil)
- Cloud Messaging (notifications)

### Dépendances Clés
- `react-navigation`: Navigation
- `zustand`: State management
- `date-fns`: Date utilities
- `react-native-gesture-handler`: Gestes
- `expo-font`: Custom fonts

## 🐛 Débogage

- Console.log activé en développement
- Error boundaries recommandés
- Logs Redux DevTools via Zustand
- Debug layouts avec React DevTools

## 📄 Licence

Propriétaire - Copyright Luna © 2024

## 👥 Support

Pour questions ou bug reports:
- GitHub Issues
- Email: support@luna.app

## 🎯 Roadmap

- [ ] Notifications locales
- [ ] Statistiques et graphiques
- [ ] Partage de cycles (famille/partenaires)
- [ ] Intégration wearables (smartwatch)
- [ ] Mode hors ligne amélioré
- [ ] Plus d'articles (contenu enrichi)
- [ ] Modération communautaire avancée
- [ ] API backend complète

---

**Version**: 1.0.0
**Dernière mise à jour**: 2024
**Plate-forme**: React Native (Expo) - iOS & Android
