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
    const res = await Request.post<Category>("/api/v1/category", category);

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

  try {
    const res = await Request.post(`/api/v1/category/${id}`, cate);
    console.log("Update res:" + JSON.stringify(res.data));
    return res.data?.success;
  } catch (error) {
    console.log("Lỗi khi cập nhật category:", error);
    throw error; // đẩy lỗi ra cho reactQuery xử lý
  }
};

export const getPost = () => {
  return new Promise((res) => res([]));
};
