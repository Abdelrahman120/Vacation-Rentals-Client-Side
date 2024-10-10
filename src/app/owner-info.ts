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
  property_id: number;
  start_date: string;
  end_date: string;
  status: string;
}