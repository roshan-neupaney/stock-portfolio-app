export const StockFormValidation = (payload: StockFormType) => {
  const { company_name, ticker, current_price, purchased_price, quantity } =
    payload;
  let count = 0;
  let errorMessages = {
    company_name: "",
    ticker: "",
    current_price: "",
    purchased_price: "",
    quantity: "",
  };

  if (!(company_name.length > 0)) {
    errorMessages.company_name = "Company name is required";
    count++;
  }
  if (!(ticker.length > 0)) {
    errorMessages.ticker = "Ticker number is required";
    count++;
  }
  if (!(current_price.length > 0)) {
    errorMessages.current_price = "Current price is required";
    count++;
  }
  if (!(purchased_price.length > 0)) {
    errorMessages.purchased_price = "Purchased price is required";
    count++;
  }
  if (!(quantity.length > 0)) {
    errorMessages.quantity = "Quantity is required";
    count++;
  } else if(Number(quantity) < 10) {
    errorMessages.quantity = "Quantity must be greater than 10"
  }

  if (count == 0) return { isValid: true, errors: errorMessages };
  else return { isValid: false, errors: errorMessages };
};
