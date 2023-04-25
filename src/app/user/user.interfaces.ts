export interface Address {
  area: string;
  road: string;
}

export interface Phone {
  type: string;
  number: string;
}

export interface User {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  address: Address;
  phone: Phone[];
  loading: boolean;
}

export const EmptyUser: User = {
  username: "",
  password: "",
  name: "",
  surname: "",
  email: "",
  address: { area: "", road: "" },
  phone: [ {type: "", number: ""} ],
  loading: false
}

export interface UserUpdate {
  username: string,
  name: string,
  surname: string,
  email: string,
  address: {
    area: string,
    road: string
  },
  phone: [
    {
      type: string,
      number: string
    }
  ]
}

export interface UserAPIList {
  status: boolean;
  data: User[];
}

export interface UserAPIDelete {
  status: boolean;
}

export interface UserAPIUpdate {
  status: boolean;
  data: any;
}