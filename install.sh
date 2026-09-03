#!/bin/bash

# Luna App - Installation Script

echo "🚀 Installation de Luna App..."

# Install dependencies
echo "📦 Installation des dépendances npm..."
npm install

# Install specific packages that may have issues
echo "📥 Installation des packages spécifiques..."
npm install --save zustand @react-native-async-storage/async-storage

# Install dev dependencies
echo "🔧 Installation des dépendances de développement..."
npm install --save-dev @types/react @types/react-native

# Create directories if they don't exist
echo "📁 Création des répertoires..."
mkdir -p assets/fonts
mkdir -p assets/images
mkdir -p assets/photos
mkdir -p src/components
mkdir -p src/hooks

# Optionally download Google Fonts
echo "🎨 Fonts: Vous devez télécharger Cormorant Garamond et Jost depuis Google Fonts"
echo "📍 Lien: https://fonts.google.com/"
echo "   - Téléchargez: Cormorant Garamond (400, 500, 600, 400i)"
echo "   - Téléchargez: Jost (300, 400, 500)"
echo "   - Placez les fichiers .ttf dans: assets/fonts/"

# Print success message
echo ""
echo "✅ Installation terminée!"
echo ""
echo "🎬 Pour démarrer:"
echo "   - Web:    npm run web"
echo "   - iOS:    npm run ios"
echo "   - Android: npm run android"
echo ""
echo "📖 Documentation: Voir README.md"
