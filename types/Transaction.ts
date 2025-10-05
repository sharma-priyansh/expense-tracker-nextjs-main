export interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: string;
  category?: string | null;
  createdAt: string;
}
