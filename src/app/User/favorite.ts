export interface Favorite {
    data: Property[];
}
export interface Property {
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