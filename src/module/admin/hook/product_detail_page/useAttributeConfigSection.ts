import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Product } from "../../../../type/Product";
import type { CategoryAttribute } from "../../../../type/CategoryAttribute";
import type { ProductAttribute } from "../../../../type/ProductAttribute";
import { updateProductAttribute } from "../../service/productAttribute";

export const useAttributeConfigSection = (id: number) => {
  interface Param {
    id: number;
    en: Partial<ProductAttribute>;
  }
  const queryClient = useQueryClient();

  const product = queryClient.getQueryData(["product", id]) as Product;

  const categoryAttributes = product?.category.category_attributes.filter(
    (item) => item.is_variant_level == false
  ) as CategoryAttribute[];

  const selectedAttributes = product?.product_attribute;

  const handleSubmit = (id: number, en: Partial<ProductAttribute>) => {
    updatePA({ id: id, en: en });
  };

  const { isPending, mutate: updatePA } = useMutation({
    mutationFn: ({ id, en }: Param) => updateProductAttribute(id, en),
    onSuccess: () => {},
    onError: () => {},
  });

  const nonVariantProductAttributes = product?.product_attribute.filter((pa) =>
    categoryAttributes.some(
      (ca) =>
        ca.attribute_id === pa.attribute_id && ca.is_variant_level === false
    )
  ) as ProductAttribute[];

  return {
    product,
    categoryAttributes,
    selectedAttributes,
    nonVariantProductAttributes,
    isPending,
    handleSubmit,
  };
};
