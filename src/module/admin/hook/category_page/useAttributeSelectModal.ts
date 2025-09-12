import { useState } from "react";

export const useAttributeSelectModal = (category_id: number) => {
  const [selectedList, setSelectedList] = useState<number[]>([]);
  console.log(category_id);
  const handleChange = (id: number) => {
    let newList = [...selectedList, id];

    setSelectedList(newList);
  };
  console.log("Number list: " + JSON.stringify(selectedList));
  return { setSelectedList, handleChange };
};
