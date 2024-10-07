export interface IGet {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCurrentUser: () => void;
  handleLogIn: () => void;
}

export type Product = {
  name: string;
  price: number;
  image: string;
};

// discount: number;
