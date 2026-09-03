# Configuration - Luna App

## 📦 Dépendances à installer

### Installation initiale
```bash
npm install
```

### Dépendances clés avec des notes spéciales

#### React Navigation
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
```

#### État & Stockage
```bash
npm install zustand @react-native-async-storage/async-storage
```

#### Fonts
```bash
npm install expo-font
```

#### Date & Locale
```bash
npm install date-fns
```

#### Optional - Firebase
```bash
npm install firebase
# Configuration à faire dans src/services/firebase.ts
```

## 🎨 Fichiers Assets

### Dossiers à créer
```
assets/
├── fonts/
│   ├── CormorantGaramond-Regular.ttf
│   ├── CormorantGaramond-Medium.ttf
│   ├── CormorantGaramond-SemiBold.ttf
│   ├── CormorantGaramond-Italic.ttf
│   ├── Jost-Light.ttf
│   ├── Jost-Regular.ttf
│   └── Jost-Medium.ttf
├── images/
│   ├── icon.png (1024x1024)
│   ├── splash.png (1080x1920)
│   ├── adaptive-icon.png (1080x1080)
│   └── favicon.png (180x180)
└── photos/
    ├── toilette.png (210x210 min)
    ├── odeurs.png
    ├── rasage.png
    ├── demangeaisons.png
    ├── exercices.png
    └── header.png (generic fallback)
```

### Téléchargement des polices

1. **Cormorant Garamond** - https://fonts.google.com/specimen/Cormorant+Garamond
   - Télécharge les poids: 400, 500, 600, Italic 400
   - Nomme les fichiers:
     - Regular → `CormorantGaramond-Regular.ttf`
     - Medium → `CormorantGaramond-Medium.ttf`
     - SemiBold → `CormorantGaramond-SemiBold.ttf`
     - Italic → `CormorantGaramond-Italic.ttf`

2. **Jost** - https://fonts.google.com/specimen/Jost
   - Télécharge les poids: 300, 400, 500
   - Nomme les fichiers:
     - 300 Light → `Jost-Light.ttf`
     - 400 Regular → `Jost-Regular.ttf`
     - 500 Medium → `Jost-Medium.ttf`

## 🖼️ Images & Photos

### Icones (à créer ou générer)
- Tab bar icons: 24x24px chacun
- Article step markers: 30x30px
- Avatar placeholders: 48x48px

### Photos articles (à générer/acheter)
- Dimensions: 112px (liste) ou 210px (article)
- Format: JPG, optimisé
- Contenu: Images représentant chaque sujet

Peut utiliser:
- Stock photos: Unsplash, Pexels, Pixabay
- AI generation: Midjourney, DALL-E, Stable Diffusion

## 🔧 Configuration Expo

### eas.json (pour build/submit)
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "preview2": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview3": {
      "ios": {
        "resourceClass": "m1-large"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

## 🔐 Variables d'environnement

Créer `.env.local`:
```
# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=

# Google Sign-In
EXPO_PUBLIC_GOOGLE_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_CLIENT_SECRET=

# Payment
EXPO_PUBLIC_STRIPE_KEY=
```

## 📱 Certificats & Provisioning

### iOS
- Apple Developer Account ($99/an)
- Certificat de développement
- Profil de provisioning
- Bundle ID: `com.luna.app`

### Android
- Google Play Developer Account ($25 une fois)
- Keystore pour signatures
- SHA-1 Fingerprint pour Google Sign-In

## 🚀 Build & Deploy

### Build local
```bash
# iOS (Mac seulement)
npm run ios

# Android
npm run android

# Web
npm run web
```

### Build Expo
```bash
eas build --platform ios
eas build --platform android
```

### Submit to App Stores
```bash
eas submit --platform ios --latest
eas submit --platform android --latest
```

## 🧪 Testing

### Tester l'authentification
- Compte Gmail test
- Expo dev client pour tester

### Tester le paiement
- Sandbox de votre provider (Stripe test mode)
- Identifiants de test

### Tester sur device
```bash
# iOS
eas build --platform ios --profile preview
# Scan QR code to open on device

# Android
eas build --platform android --profile preview
# Scan QR code to install APK
```

## 🐛 Troubleshooting

### Fonts not loading
- Vérifier noms exacts des fichiers
- Vérifier chemin dans App.tsx
- Clear cache: `npm start -c`

### Navigation errors
- Vérifier structure de navigation Stack/Tab
- Vérifier ParamList types
- Reload: `r` in Metro

### State not persisting
- Vérifier AsyncStorage permissions
- Vérifier JSON sérializable
- Vérifier appel de restore() au démarrage

## 📚 Resources

- Expo Docs: https://docs.expo.dev
- React Native: https://reactnative.dev
- React Navigation: https://reactnavigation.org
- Zustand: https://github.com/pmndrs/zustand
- Firebase React Native: https://rnfirebase.io

---

**Last updated**: 2024
**Configuration version**: 1.0
