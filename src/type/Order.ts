import type { UserDataRespone } from "./User";

export interface Order {
  id: number;
  user_id: number;
  discount: number;
  total: number;
  address_id: number;
  status: number;
  created_at: Date;
  user?: UserDataRespone;
}
