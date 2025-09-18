import type { Brand } from "./Brand";
import type { Category } from "./Category";

export interface Product {
  id: number;
  brand: Brand;
  category: Category;
  brand_id: number;
  category_id: number;
  name: string;
  status: number;
  image?: string;
}

export interface ProductWithBrandId {
  id: number;
  brand: number; // Assuming brand is represented by an ID
  name: string;
  price: number;
  img: string;
}

// const val = {
//   id: 3,
//   name: "Iphone 15 pro max",
//   description: "",
//   category_id: 11,
//   brand_id: 8,
//   rating: 0,
//   status: 1,
//   category: {
//     id: 11,
//     name: "Điện thoại",
//     slug: "dien-thoai",
//     parent_id: 0,
//     path: "/dien-thoai",
//     level: 0,
//     created_at: "2025-09-18T18:13:31.908328+07:00",
//   },
//   brand: {
//     name: "Apple",
//     slug: "apple",
//     status: 1,
//     id: 8,
//   },
//   created_at: "0001-01-01T00:00:00",
// };
