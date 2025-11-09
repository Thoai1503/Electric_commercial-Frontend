import type { Brand } from "./Brand";
import type { Category } from "./Category";

export interface CategoryBrand {
  id: number;
  brand_id: number;
  category_id: number;
  category: Category;
  brand: Brand;
}
