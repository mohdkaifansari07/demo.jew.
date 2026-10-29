export interface Product {
  id: string;
  name: string;
  category: JewelleryCategory;
  price: number; // in INR
  image: string;
  shortDescription: string;
  description: string;
  motif?: string;
  idealFor?: string;
  customization?: string;
  collection: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export type JewelleryCategory = 
  | 'Gold'
  | 'Diamond'
  | 'Bridal'
  | 'Rings'
  | 'Earrings'
  | 'Bangles'
  | 'Necklaces'
  | 'Mangalsutras';

export interface CategoryInfo {
  id: JewelleryCategory;
  title: string;
  subtitle: string;
  image: string;
  itemCount: number;
}

export interface AppointmentRequest {
  fullName: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTimeSlot: string;
  collectionInterest: JewelleryCategory | 'All Collections';
  specialNotes?: string;
}

export interface ShowroomConfig {
  brandName: string;
  tagline: string;
  announcement: string;
  whatsappNumber: string; // international format e.g. "919876543210"
  displayPhone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
  };
  openingHours: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
}
