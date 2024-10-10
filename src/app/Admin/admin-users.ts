export interface AdminUsers {
    code: number;
    message: string;
    data: VerifiedUser[];
}

export interface VerifiedUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone: string;
    image: string;
    address: string;
    gender: string;
    created_at: string;
    updated_at: string;
    provider_id: string | null;
  }
