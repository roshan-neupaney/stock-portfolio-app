export const BeautifyStockList = (data: StockFormType[]) => {
  try {
    const filteredData = data?.map((stock) => {
      const detail = {
        id: "",
        ticker: "",
        company_name: "",
        quantity: "",
        purchased_price: "",
        current_price: "",
      };
      detail.id = stock?.id;
      detail.ticker = stock?.ticker || "";
      detail.company_name = stock?.company_name || "";
      detail.purchased_price = 'Rs. ' + stock?.purchased_price || "";
      detail.current_price = 'Rs. ' + stock?.current_price || "";
      detail.quantity = stock?.quantity || "";
      return detail;
    });
    return filteredData;
  } catch (error) {
    return [];
  }
};
