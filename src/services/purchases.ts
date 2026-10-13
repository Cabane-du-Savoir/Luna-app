/**
 * LUNA Monetization & Subscription Service - Powered by SasPay
 * Plateforme officielle : SasPay (saspay.me)
 * Prix officiel : 2.500 FC / mois (~0.89 USD)
 * Modes de paiement : Mobile Money (M-Pesa, Airtel, Orange) & Cartes bancaires
 */

import { SASPAY_CONFIG, buildSasPayCheckoutUrl, generateSasPayCode } from './saspay';

export const LUNA_PREMIUM_PRODUCT_ID = 'saspay_luna_premium_monthly';
export const LUNA_PREMIUM_PRICE_CDF = SASPAY_CONFIG.monthlyPriceCDF;
export const LUNA_PREMIUM_PRICE_USD = SASPAY_CONFIG.monthlyPriceUSD;

export interface PurchaseItem {
  productId: string;
  transactionDate?: number;
  transactionReceipt?: string;
  provider?: string;
}

export const getPremiumProduct = async () => {
  return {
    productId: LUNA_PREMIUM_PRODUCT_ID,
    title: 'Luna Premium (1 mois via SasPay)',
    description: 'Prédictions IA irrégulières, historique illimité, mode icône discrète, export PDF & thèmes',
    price: '2.500 FC',
    localizedPrice: '2.500 FC',
    currency: 'CDF',
    provider: 'SasPay',
  };
};

export const purchasePremium = async (userId: string = 'luna-user') => {
  // Initiates payment via SasPay
  const checkoutUrl = buildSasPayCheckoutUrl({ userId });
  if (typeof window !== 'undefined') {
    window.open(checkoutUrl, '_blank');
  }
  return {
    productId: LUNA_PREMIUM_PRODUCT_ID,
    transactionDate: Date.now(),
    transactionReceipt: generateSasPayCode(),
    provider: 'SasPay',
  };
};

export const restorePremiumPurchase = async (): Promise<boolean> => {
  return true;
};

export const closePurchaseConnection = async () => {};

