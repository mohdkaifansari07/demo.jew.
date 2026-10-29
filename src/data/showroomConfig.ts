import { ShowroomConfig, Product, AppointmentRequest } from '../types/jewellery';

/**
 * ============================================================================
 * SHOWROOM OWNER CONFIGURATION
 * ============================================================================
 * To personalize this website for your jewellery showroom:
 * 1. Replace 'whatsappNumber' with your showroom's 10-digit WhatsApp number (prefixed with country code, without + or spaces, e.g. 919876543210).
 * 2. Update the brand name, address, phone number, and Google Maps URL.
 * 3. Add or modify product items in 'src/data/products.ts'.
 */
export const SHOWROOM_CONFIG: ShowroomConfig = {
  brandName: "ROYAL GOLD JEWELLERS",
  tagline: "Jewellery That Tells Your Story",
  announcement: "Timeless Elegance. Exceptional Craftsmanship.",
  // SHOWROOM OWNER: Authorized showroom WhatsApp number in international format:
  whatsappNumber: "917084183605", 
  displayPhone: "+91 70841 83605",
  email: "concierge@royalgoldjewellers.example.com",
  address: {
    line1: "Heritage Jewel Plaza, Ground & 1st Floor",
    line2: "Turner Road, Near Waterfield Junction, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    landmark: "Opposite Royal Heritage Garden"
  },
  openingHours: "Mon – Sun: 11:00 AM – 8:30 PM (Private Bridal Salons by Appointment)",
  googleMapsUrl: "https://maps.google.com/?q=Turner+Road+Bandra+West+Mumbai+Jewellery",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com"
};

/**
 * Generates an instant WhatsApp chat link for a specific jewellery piece
 */
export function generateProductWhatsAppUrl(product: Product, customNumber?: string): string {
  const number = customNumber || SHOWROOM_CONFIG.whatsappNumber;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const text = encodeURIComponent(
    `Namaste Royal Gold Jewellers,\n\nI am interested in inquiring about:\n*${product.name}*\nRef. Category: ${product.category}\nDemo Ref. Price: ${formattedPrice}\n\nCould you please share availability, customization options, and arrange a showroom preview?`
  );

  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Generates an instant WhatsApp chat link for booking a showroom visit
 */
export function generateAppointmentWhatsAppUrl(request: AppointmentRequest, customNumber?: string): string {
  const number = customNumber || SHOWROOM_CONFIG.whatsappNumber;
  
  const text = encodeURIComponent(
    `Namaste Royal Gold Jewellers,\n\nI would like to request an exclusive showroom appointment:\n\n` +
    `• Name: ${request.fullName}\n` +
    `• Contact: ${request.phoneNumber}\n` +
    `• Preferred Date: ${request.preferredDate}\n` +
    `• Preferred Time: ${request.preferredTimeSlot}\n` +
    `• Collection of Interest: ${request.collectionInterest}\n` +
    (request.specialNotes ? `• Note: ${request.specialNotes}\n\n` : `\n`) +
    `Please confirm the appointment slot at your earliest convenience.`
  );

  return `https://wa.me/${number}?text=${text}`;
}

/**
 * General showroom concierge inquiry link
 */
export function generateGeneralWhatsAppUrl(customNumber?: string): string {
  const number = customNumber || SHOWROOM_CONFIG.whatsappNumber;
  const text = encodeURIComponent(
    `Namaste Royal Gold Jewellers,\n\nI would like to speak with a showroom jewellery consultant regarding your gold, diamond, and bridal collections.`
  );
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Format INR currency in Indian standard numbering
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
