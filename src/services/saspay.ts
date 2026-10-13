/**
 * SasPay Integration Service for Luna
 * Official monetization platform for subscriptions and payments.
 * Supports: Mobile Money (M-Pesa, Airtel, Orange) & Visa/Mastercard.
 */

export interface SasPayCheckoutOptions {
  userId: string;
  userPhone?: string;
  userName?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: 'mpesa' | 'airtel' | 'orange' | 'card' | 'all';
}

export interface SasPayTransactionResult {
  success: boolean;
  transactionId?: string;
  code?: string;
  message: string;
}

export const SASPAY_CONFIG = {
  serviceName: 'SasPay',
  portalUrl: 'https://saspay.me',
  defaultPaymentLink: (import.meta as any).env?.VITE_SASPAY_PAYMENT_LINK || 'https://link.saspay.me/luna-premium',
  monthlyPriceCDF: 2500,
  monthlyPriceUSD: 0.89,
  currencyCDF: 'CDF',
  supportedOperators: [
    { id: 'mpesa', name: 'Vodacom M-Pesa', badge: 'M', color: '#E60000', fee: 'Sans frais' },
    { id: 'airtel', name: 'Airtel Money', badge: 'air', color: '#ED1C24', fee: 'Sans frais' },
    { id: 'orange', name: 'Orange Money', badge: 'OM', color: '#FF6600', fee: 'Sans frais' },
    { id: 'card', name: 'Carte Visa / Mastercard', badge: '💳', color: '#1A1F71', fee: 'International' },
  ],
};

/**
 * Builds the URL to open SasPay checkout
 */
export function buildSasPayCheckoutUrl(options: SasPayCheckoutOptions): string {
  const customLink = (import.meta as any).env?.VITE_SASPAY_PAYMENT_LINK;
  const baseUrl = customLink || '/pay.html';
  
  const params = new URLSearchParams({
    gateway: 'saspay',
    uid: options.userId || 'luna-user',
    amount: (options.amount || SASPAY_CONFIG.monthlyPriceCDF).toString(),
    currency: options.currency || SASPAY_CONFIG.currencyCDF,
  });

  if (options.userPhone) {
    params.set('phone', options.userPhone);
  }
  if (options.paymentMethod && options.paymentMethod !== 'all') {
    params.set('method', options.paymentMethod);
  }

  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${params.toString()}`;
}

/**
 * Generates an official SasPay formatted activation code
 */
export function generateSasPayCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let part = '';
  for (let i = 0; i < 5; i++) {
    part += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SASPAY-${part}`;
}
