export interface GroceryItem {
  id: string;
  name: string;
  completed: boolean;
  createdAt: number;
  createdBy: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName?: string;
}