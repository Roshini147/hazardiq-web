/**
 * Direct Messaging Utilities for HazardIQ
 * Generates direct SMS URIs, WhatsApp Web/Mobile dispatch URLs, and desktop notifications
 */

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

export function formatIndianInternationalNumber(phone: string): string {
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    clean = '91' + clean;
  }
  return clean;
}

/**
 * Generate native SMS protocol URI
 * Works on mobile phones, tablets, and Windows with Phone Link / Messages app
 */
export function getDirectSmsUrl(phone: string, message: string): string {
  const clean = cleanPhoneNumber(phone);
  return `sms:${clean}?body=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp Web/App direct send URL
 * Directly opens WhatsApp chat with recipient and message pre-filled
 */
export function getDirectWhatsAppUrl(phone: string, message: string): string {
  const intlPhone = formatIndianInternationalNumber(phone);
  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Trigger Native Web Share or direct SMS fallback
 */
export async function triggerDirectMessageSend(
  phone: string,
  _recipientName: string,
  message: string,
  preferChannel: 'sms' | 'whatsapp' = 'sms'
): Promise<void> {
  if (preferChannel === 'whatsapp') {
    const waUrl = getDirectWhatsAppUrl(phone, message);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  const smsUrl = getDirectSmsUrl(phone, message);
  window.location.href = smsUrl;
}

/**
 * Browser Desktop Notification
 */
export function triggerDesktopNotification(title: string, body: string): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/vite.svg',
      });
    } catch (e) {
      console.warn('Desktop notification failed:', e);
    }
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        try {
          new Notification(title, {
            body,
            icon: '/vite.svg',
          });
        } catch (e) {
          console.warn('Desktop notification failed:', e);
        }
      }
    });
  }
}
