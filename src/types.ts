export interface DeviceItem {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Accessories';
  category: 'smartphones' | 'tablets' | 'wearables' | 'accessories';
  condition: 'Brand New' | 'Refurbished Grade A+' | 'Open Box';
  storage?: string;
  color: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  batteryHealth?: string;
  warranty: string;
  image: string;
  specs: string[];
  popular?: boolean;
}

export interface RepairService {
  id: string;
  name: string;
  iconName: string;
  description: string;
  estimatedTime: string;
  startingPrice: number;
  popular?: boolean;
  warranty: string;
  features: string[];
}

export interface ModelPricing {
  model: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'iPad';
  screenPrice: number;
  batteryPrice: number;
  backGlassPrice?: number;
  chargingPortPrice: number;
  cameraPrice?: number;
}

export interface RepairBooking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deviceBrand: string;
  deviceModel: string;
  services: string[];
  estimatedTotal: number;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export interface DeviceReservation {
  id: string;
  reservationCode: string;
  deviceId: string;
  deviceName: string;
  price: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupDate: string;
  createdAt: string;
  status: 'pending_pickup' | 'collected' | 'cancelled';
}

export interface TradeInEstimate {
  device: string;
  condition: 'flawless' | 'good' | 'fair' | 'cracked';
  estimatedValue: number;
}

export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
}
