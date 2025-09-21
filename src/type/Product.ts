import type { Brand } from "./Brand";
import type { Category } from "./Category";
import type { ProductAttribute } from "./ProductAttribute";

export interface Product {
  id: number;
  brand: Brand;
  category: Category;
  brand_id: number;
  category_id: number;
  name: string;
  status: number;
  image?: string;
  product_attribute: ProductAttribute[];
}

export interface ProductWithBrandId {
  id: number;
  brand: number; // Assuming brand is represented by an ID
  name: string;
  price: number;
  img: string;
}
