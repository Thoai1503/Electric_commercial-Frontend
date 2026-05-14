import { Request } from "../../../api/http";

export interface PublishedProductContent {
  html: string;
}

export const getPublishedProductContent = async (
  productId: number,
): Promise<PublishedProductContent> => {
  return await Request.get(`/api/product/${productId}/content/published`).then(
    (res) => res.data,
  );
};
