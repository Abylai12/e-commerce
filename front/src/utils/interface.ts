export interface IGet {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCurrentUser: () => void;
  handleLogIn: () => void;
}

type catObj = {
  _id: string;
};
export type Product = {
  name: string;
  description?: string;
  price: number;
  images: string;
  discount: number;
  _id: string;
  category: catObj;
};
export type IProduct = {
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
}
// discount: number;
