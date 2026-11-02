export type PaperGsm = 100 | 130 | 190;

export type PageLayout = 'dot-grid' | 'cornell' | 'weekly-undated' | 'blank-art' | 'ruled';

export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  city: string; // e.g. "Sydney, NSW"
  rating: number;
  date: string;
  comment: string;
  verifiedStudent: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // in AUD
  originalPrice?: number;
  category: 'bullet-journal' | 'planner' | 'sketchbook' | 'study-notebook';
  gsm: PaperGsm;
  paperType: string;
  binding: string;
  pageCount: number;
  dimensions: string; // e.g. "A5 (148 x 210 mm)"
  image: string;
  secondaryImage?: string;
  description: string;
  features: string[];
  layouts: PageLayout[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isStudentPick?: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  selectedLayout: PageLayout;
  quantity: number;
}

export interface ShippingMethod {
  id: 'auspost-standard' | 'auspost-express' | 'auspost-locker';
  name: string;
  carrier: string;
  cost: number;
  estimatedDays: string;
  freeThreshold?: number;
  description: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  postcode: string;
  shippingMethodId: string;
  paymentMethod: 'afterpay' | 'klarna' | 'card' | 'apple-pay' | 'paypal';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  discountCode?: string;
  saveInfo?: boolean;
}

export interface OrderConfirmation {
  orderNumber: string;
  trackingNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  shippingAddress: CheckoutFormData;
  estimatedDeliveryDate: string;
}
