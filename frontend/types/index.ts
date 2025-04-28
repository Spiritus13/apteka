export interface User {
  token: string;
  name: string;
  surname: string;
  email: string;
  permission: number;
}

export interface Drug {
  idDrug: number;
  name: string;
  dose: number;
  price: number;
  type: string;
  companyName: string;
  amount: number;
}

export interface Order {
  purchased: number;
  user: string;
  amount: number;
  date: string;
}
