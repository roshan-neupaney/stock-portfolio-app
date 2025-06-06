import axios, { AxiosInstance } from "axios";
import { StockApiBaseUrl, StockApiKey } from "../../../src/config/envConfig";
import { StockDataType } from "./stocks.types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: StockApiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const StockListApi = {
  getStockList: async (filters?: Record<string, string>): Promise<StockDataType> => {
    const queryFilters = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(
      `/query?${queryFilters}&outputsize=compact&apikey=${StockApiKey}`
    );
    return response.data;
  },
};
