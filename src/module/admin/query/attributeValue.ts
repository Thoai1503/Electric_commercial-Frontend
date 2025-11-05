import { queryOptions } from "@tanstack/react-query";
import { getByAttributeId } from "../service/attributeValue";

const attributevalueQuery = {
  getByAttributeId: (attributeId: number) =>
    queryOptions({
      queryKey: ["attribute-values", attributeId],
      queryFn: () => getByAttributeId(attributeId),
    }),
};

export default attributevalueQuery;
