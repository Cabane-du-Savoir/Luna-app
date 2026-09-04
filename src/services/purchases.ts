import { Platform } from 'react-native';
import {
  endConnection,
  finishTransaction,
  getAvailablePurchases,
  getProducts,
  initConnection,
  requestPurchase,
} from 'react-native-iap';

export const LUNA_PREMIUM_PRODUCT_ID = 'luna_premium_lifetime';

const ensureAndroid = () => {
  if (Platform.OS !== 'android') {
    throw new Error('Les achats Luna sont disponibles sur Google Play pour Android.');
  }
};

export const getPremiumProduct = async () => {
  ensureAndroid();
  const connected = await initConnection();
  if (!connected) throw new Error('Impossible de se connecter a Google Play.');

  const products = await getProducts({ skus: [LUNA_PREMIUM_PRODUCT_ID] });
  return products[0] ?? null;
};

export const purchasePremium = async () => {
  ensureAndroid();
  const purchase = await requestPurchase({ sku: LUNA_PREMIUM_PRODUCT_ID });
  const completedPurchase = Array.isArray(purchase) ? purchase[0] : purchase;
  if (!completedPurchase) throw new Error('Achat non termine.');

  await finishTransaction({ purchase: completedPurchase, isConsumable: false });
  return completedPurchase;
};

export const restorePremiumPurchase = async (): Promise<boolean> => {
  ensureAndroid();
  const connected = await initConnection();
  if (!connected) throw new Error('Impossible de se connecter a Google Play.');

  const purchases = await getAvailablePurchases();
  return purchases.some(purchase => purchase.productId === LUNA_PREMIUM_PRODUCT_ID);
};

export const closePurchaseConnection = async () => {
  if (Platform.OS === 'android') await endConnection();
};