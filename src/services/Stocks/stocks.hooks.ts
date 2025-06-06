import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { StockListApi } from "./stocks.api";
import { StockDataType } from "./stocks.types";

const useFetchStockList = (
  filters?: Record<string, string>,
  options?: Partial<UseQueryOptions<StockDataType, Error>>
) => {
  return useQuery({
    queryKey: ["getStockLists", filters],
    queryFn: () => StockListApi.getStockList(filters),
    ...options,
  });
};

export {
  useFetchStockList
};
