export interface UserInfo {
  code: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone: string;
    image: string;
    address: string;
    gender: string;
    payments: Payment[];
    favorites: Favorite[];
    reviews: Review[];
    bookings: Booking[];
  };
}

export interface Payment {
  id: number;
  user_id: number;
  payment_id: string;
  product_name: string;
  amount: string;
  currency: string;
  payment_status: string;
  payment_method: string;
  start_date: string;
  end_date: string;
  owner_name: string;
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
  location: string;
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

export interface Booking {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  property_id: number;
  property: Property;
  start_date: string;
  end_date: string;
  status: string;
  book_date: string;
}

export interface Property {
  id: number;
  name: string;
  headline: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  night_rate: string;
  status: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  latitude: string;
  longitude: string;
  owner_id: number;
  location: string;
}
