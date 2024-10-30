export interface AdminOwnerDetails {
    owner: OwnerDetails;
}
export interface OwnerDetails {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string;
    role: string;
    phone: string;
    image: string;
    address: string;
    company_name: string;
    description: string;
    gender: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    provider_id: string | null;
    bank_account: string | null;
    wallet: string;
    properties: Property[];
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
