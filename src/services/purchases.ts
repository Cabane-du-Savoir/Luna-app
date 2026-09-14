/**
 * LUNA Google Play In-App Purchase Service
 * Configuration Play Console :
 * SKU : luna_premium_monthly
 * Prix : 2.500 FC / mois (~0.89 USD)
 */

export const LUNA_PREMIUM_PRODUCT_ID = 'luna_premium_monthly';
export const LUNA_PREMIUM_PRICE_CDF = 2500;
export const LUNA_PREMIUM_PRICE_USD = 0.89;

export interface PurchaseItem {
  productId: string;
  transactionDate?: number;
  transactionReceipt?: string;
}

export const getPremiumProduct = async () => {
  return {
    productId: LUNA_PREMIUM_PRODUCT_ID,
    title: 'Luna Premium (1 mois)',
    description: 'Prédictions IA irrégulières, historique illimité, mode icône discrète, export PDF & thèmes',
    price: '2.500 FC',
    currency: 'CDF',
  };
};

export const purchasePremium = async () => {
  return {
    productId: LUNA_PREMIUM_PRODUCT_ID,
    transactionDate: Date.now(),
    transactionReceipt: 'mock_google_play_token',
  };
};

export const restorePremiumPurchase = async (): Promise<boolean> => {
  return true;
};

export const closePurchaseConnection = async () => {};
