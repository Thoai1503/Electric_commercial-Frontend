import { queryOptions } from "@tanstack/react-query";
import { getCategoryAttributes } from "../service/categoryAttribute";

const categoryAttributeQuery = {
  list: queryOptions({
    queryKey: ["category-attributes"],
    queryFn: () => getCategoryAttributes(), // just return the promise
  }),
};
export default categoryAttributeQuery;
