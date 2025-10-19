import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../service/useraddress";
import type { UserAddress } from "../../../../type/UserAddress";

export const useCheckoutPage = (user_id: number) => {
  const queryClient = useQueryClient();
  interface UpdatedProp {
    id: number;
    data: Partial<UserAddress>;
  }

  const handleUpdate = (id: number, data: Partial<UserAddress>) => {
    update({ id: id, data: data });
  };

  const { mutate: update } = useMutation({
    mutationFn: ({ id, data }: UpdatedProp) => updateAddress(id, data),
    onSuccess: (data) => {
      if (data)
        queryClient.invalidateQueries({ queryKey: ["user_address", user_id] });
    },
    onError: (error) => {
      alert(error);
    },
  });
  return { handleUpdate };
};
