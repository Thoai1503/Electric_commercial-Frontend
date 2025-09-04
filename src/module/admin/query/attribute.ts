import { queryOptions } from "@tanstack/react-query";
import { getAllAttribute } from "../service/attribute";

const attributeQuery = {
  list: queryOptions({
    queryKey: ["attributes"],
    queryFn: () => getAllAttribute(), // just return the promise
  }),
};
export default attributeQuery;
