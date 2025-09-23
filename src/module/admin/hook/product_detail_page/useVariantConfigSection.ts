import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../../../type/Product";
import type { CategoryAttribute } from "../../../../type/CategoryAttribute";
import type { ProductAttribute } from "../../../../type/ProductAttribute";
import { addProductVariant } from "../../service/productVariant";
import { useState } from "react";
import type { ProductVariant } from "../../../../type/productVariant";
import productVariantQuery from "../../query/productVariant";

export const useVariantConfigSection = (id: number) => {
  const [submitVariant, setSubmitVariant] = useState<Partial<ProductVariant>>({
    product_id: id,
    sku: "",
    price: 0,
  });
  const { data: variants, isPending: isPendingVariant } = useQuery(
    productVariantQuery.detail_by_product_id(id)
  );
  const queryClient = useQueryClient();
  const product = queryClient.getQueryData(["product", id]) as Product;

  //For adding modal
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubmitVariant({ ...submitVariant, [name]: value });
  };
  const handleSubmit = () => {
    // alert("Submited data: " + JSON.stringify(submitVariant));
    // return;
    addVariant(submitVariant);
  };

  const { isPending, mutate: addVariant } = useMutation({
    mutationFn: (en: Partial<ProductAttribute>) => addProductVariant(en),
    onSuccess: () => {},
    onError: () => {},
  });

  //variant infomation

  const categoryAttributes = product?.category.category_attributes.filter(
    (item) => item.is_variant_level == true
  ) as CategoryAttribute[];

  //   const variantProductAttributes = product?.product_attribute.filter((pa) =>
  //     categoryAttributes.some(
  //       (ca) =>
  //         ca.attribute_id === pa.attribute_id && ca.is_variant_level === true
  //     )
  //   ) as ProductAttribute[];
  return {
    handleChange,
    handleSubmit,
    isPending,
    variants,
    categoryAttributes,
    isPendingVariant,
  };
};
