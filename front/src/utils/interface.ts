export interface IGet {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCurrentUser: () => void;
  handleLogIn: () => void;
}

export interface ISave {
  product_id: SaveProduct;
  _id: string;
}

export interface IPack {
  product_id: SaveProduct;
  quantity: number;
  size: string;
  _id: string;
}
export type SaveProduct = {
  size?: string;
  _id: string;
  name: string;
  price: number;
  images: [string];
  discount: number;
};

export type Product = {
  name: string;
  description?: string;
  price: number;
  images: [string];
  discount: number;
  _id: string;
  category: string;
};
export type IProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: [string];
  discount: number;
  isNew: boolean;
};

export interface IUser {
  firstName: String;
  lastName: String;
  email: string;
  password: String;
  repassword: String;
}

export interface ILoggedUser {
  firstName: string;
  lastName: string;
  email: string;
  profile_img: string;
  address?: string;
  phoneNumber?: string;
  additionalInfo?: string;
}
// discount: number;
