import type { NodeModel } from "@minoru/react-dnd-treeview";
import { catalogRequest, Request } from "../../../api/http";
import type {
  Category,
  CategoryReponse,
  UpdatedCategory,
} from "../../../type/Category";
import { categoryTreeMapping } from "../../../utils/categoryTreeMapping";

export const addCategoryService = async (
  category: Category
): Promise<Category> => {
  try {
    console.log("Data 1:" + JSON.stringify(category));
    const res = await Request.post<Category>("/api/v1/category", category);
    console.log("Data:" + JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.log("Lỗi khi thêm category:", error);
    throw error; // đẩy lỗi ra cho react-query xử lý (onError)
  }
};

export const getCategoryTree = async (): Promise<NodeModel[]> => {
  return catalogRequest.get<CategoryReponse[]>("/category").then((res) => {
    console.log("category:" + res.data);
    return categoryTreeMapping(res.data);
  });
};
export const updateCategory = async (
  id: number,
  cate: UpdatedCategory | null
): Promise<boolean> => {
  if (!cate) {
    alert("");
    return false;
  }

  return Request.put(`/api/v1/category/${id}`, cate).then(
    (res) => res.data?.success
  );
};

export const getPost = () => {
  return new Promise((res) => res([]));
};
