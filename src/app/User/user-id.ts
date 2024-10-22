export interface UserId {
  data: User;
}
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  phone: string;
  image: string;
  address: string;
  gender: string;
  payments: Payment[];
  favorites: Favorite[];
  reviews: Review[];
}

export interface Payment {
  id: number;
  user_id: number;
  owner_id: number | null;
  payment_id: string;
  product_name: string;
  amount: string;
  currency: string;
  payment_status: string;
  payment_method: string;
  start_date: string;
  end_date: string;
}

export interface Favorite {
  id: number;
  user_id: number;
  property_id: number;
  property_name: string;
  night_rate: string;
  headline: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  city: string | null;
  country: string | null;
  address: string | null;
  nightRate: string;
  sleeps: number;
  property_type: string;
  images: Image[];
}

export interface Image {
  id: number;
  image: string;
}

export interface Review {
  id: number;
  user_id: number;
  rating: number;
  review: string;
  property_id: number;
  property_name: string;
}
