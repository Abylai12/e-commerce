export interface IGet {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCurrentUser: () => void;
  handleLogIn: () => void;
}

export type Product = {
  name: string;
  price: number;
  images: string;
  discount: number;
  _id: string;
};

// discount: number;
