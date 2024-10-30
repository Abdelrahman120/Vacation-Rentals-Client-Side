export interface AdminOwners {
    code: number;
    message: string;
    data: User[];
}
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string | null;
    role: string;
    phone: string | null;
    image: string;
    address: string | null;
    company_name: string | null;
    description: string | null;
    gender: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    provider_id: string | null;
    bank_account: string | null;
    wallet: string;
  }

