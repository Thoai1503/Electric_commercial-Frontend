import { queryOptions } from "@tanstack/react-query";
import {
  getAllAndSelectedByCategoryId,
  getAllAttribute,
} from "../service/attribute";

const attributeQuery = {
  list: queryOptions({
    queryKey: ["attributes"],
    queryFn: () => getAllAttribute(), // just return the promise
  }),
  selectedByCategoryId: (categoryId: number) =>
    queryOptions({
      queryKey: ["selected-by-category", categoryId],
      queryFn: () => getAllAndSelectedByCategoryId(categoryId),
    }),
};
export default attributeQuery;
