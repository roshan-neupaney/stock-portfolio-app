interface FilterTypes {
  function: string;
  symbol: string;
}

interface DailyData {
  "1. open": number;
  "2. high": number;
  "3. low": number;
  "4. close": number;
  "5. volume": number;
}

interface TimeSeriesDaily {
  [date: string]: DailyData;
}

interface MetaData {
  "1. Information": string;
  "2. Symbol"?: string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

interface StockData {
  date: string;
  close: number;
  volume: number;
}

interface StockDataType {
  [key: string]: StockData[];
}

export type { FilterTypes, StockDataType,StockData, DailyData, TimeSeriesDaily, MetaData };
