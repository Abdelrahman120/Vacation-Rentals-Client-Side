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
      payments: {
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
      }[];
      favorites: any[];
      reviews: any[];
    };
}
