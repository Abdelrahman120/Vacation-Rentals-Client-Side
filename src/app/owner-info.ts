export interface OwnerInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
  description: string;
  company_name: string;
  wallet: string;
  properties: {
    id: number;
    owner_id: number;
    property_name: string;
    status: string;
    night_rate: string;
    location: string;
    category: {
      id: number;
      name: string;
    };
    bookings: {
      id: number;
      user_id: number;
      user_name: string;
      user_email: string;
      user_phone: string;
      book_date: string;
      property_id: number;
      start_date: string;
      end_date: string;
      status: string;
    }[];
    booking_count: number;
  }[];
}

export interface Booking {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  book_date: string;
  property_id: number;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Property {
  id: number;
  name: string;
  headline: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  location: string;
  night_rate: string;
  sleeps: number;
  status: string;
  createdAt: string;
  modifiedAt: string;
  category_id: number;
  property_type: string;
  owner_name: string;
  owner_email: string;
  owner_image: string;
  owner_id: number;
  owner_company_name: string;
  owner_phone: string;
  longitude: string;
  latitude: string;
  images: {
    id: number;
    image: string;
  }[];
  amenities: {
    id: number;
    name: string;
  }[];
  bookings: {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    book_date: string;
    property_id: number;
    start_date: string;
    end_date: string;
    status: string;
  }[];
}
