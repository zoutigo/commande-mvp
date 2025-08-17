export type OrderStatus = 'EN_ATTENTE' | 'EN_COURS' | 'PRETE' | 'SERVIE';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  qty: number;
  price: number; // prix unitaire
  note?: string;
}

export interface Comment {
  id: string;
  role: 'SERVEUR' | 'CUISINE';
  message: string;
  at: string; // ISO string
}

export interface Order {
  id: string; // ex: "#108"
  tableId: string;
  status: OrderStatus;
  items: OrderItem[];
  comments: Comment[];
}
