export interface ProductAPIList {
    status: boolean;
    data: Product[];
}

export interface ProductAPIDelete {
    status: boolean;
    message: string;
}

export interface ProductAPIUpdate {
    status: boolean;
    message: string;
}

export interface ProductAPIUpdate {
    status: boolean;
    data: any;
}

export interface Product {
    _id: string;
    product: string;
    cost: number;
    description: string;
    quantity: number;
    loading: boolean;
}

