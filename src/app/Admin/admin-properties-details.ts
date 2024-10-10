export interface AdminPropertiesDetails {
    data: PropertyDetails;
}
export interface PropertyDetails {
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
    images: Image[];
    amenities: Amenity[];
    bookings: Booking[];
}

export interface Image {
    id: number;
    image: string;
}

export interface Amenity {
    id: number;
    name: string;
}

export interface Booking {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    property_id: number;
    start_date: string;
    end_date: string;
    status: string;
    book_date: string;
}