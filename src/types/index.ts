export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = 'card' | 'cash' ;

export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

 export type ErrorsBuyer = Partial<Record<keyof IBuyer, string>>

export type TProductResponse = {
  total: number;
  items: IProduct[];
}

export interface IOrder extends IBuyer {
  total: number;
  items: string[];
}

export type TOrderResponse = {
  id: string;
  total: number;
}

export type HeaderData = {
  counter: number;
};

export type GalleryData = {
  catalog: HTMLElement[];
};

export type ModalData = {
  content: HTMLElement;
};

export type SuccessData = {
  sum: number;
};

export type CardData = {
  name: string;
  price: number;
};

export type BasketData = {
  sum: number;
  items: HTMLElement[];
};

export type FormData = {
  errors: string;
  isValid: boolean;
};

export type CardCatalogData = {
  category: string;
  image: string;
};

export type CardPreviewData = {
  image: string;
  category: string;
  description: string;
};

export type CardBasketData = {
  index: string;
};

export interface ICardActions {
  onDelete: () => void;
}

export interface ICatalogActions {
  onSelect: () => void;
}

export type OrderData = {
  payment: TPayment | null;
  address: string;
};

export type ContactsData = {
  email: string;
  phone: string;
};