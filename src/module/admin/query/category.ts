import { queryOptions } from "@tanstack/react-query";
import { getCategoryTree } from "../service/category";

const categoriesTreeQuery = {
  list: queryOptions({
    queryKey: ["categories"],
    queryFn: () => getCategoryTree(), // just return the promise
  }),
};

export default categoriesTreeQuery;
