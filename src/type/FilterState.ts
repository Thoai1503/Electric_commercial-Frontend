export interface QueryState {
  category: string;
  sortBy?: string;
  order?: string;
  filters?: Record<string, (string | number)[]>;
}
