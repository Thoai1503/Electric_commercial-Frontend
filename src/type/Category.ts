import type { CategoryAttribute } from "./CategoryAttribute";

export interface Category {
  id: number;
  name: string;
  parent_id: number;
  category_attributes: CategoryAttribute[];
}

export interface CategoryReponse {
  id: number;
  name: string;
  parent_id: number;
  slug: string;
  path: string;
  level: number;
}

export interface CategoryTree {
  id: number;
  parent: number;
  text: string;
  droppable: boolean;
}
export interface UpdatedCategory {
  name: string;
  parent_id: number;
}
