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
