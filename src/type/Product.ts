export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  img: string;
}

export interface ProductWithBrandId {
  id: number;
  brand: number; // Assuming brand is represented by an ID
  name: string;
  price: number;
  img: string;
}
