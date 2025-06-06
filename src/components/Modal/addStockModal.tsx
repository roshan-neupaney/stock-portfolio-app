import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomInput from "../Forms/input";
import { toast } from "react-toastify";
import { StockFormValidation } from "../../../src/utils/validationHelper";
import { updateState } from "../../../src/hooks/useUpdate";
import { UUidGenerator } from "../../../src/utils/helper";
import { BeautifyStockList } from "../../../src/utils/beautify";

interface AddStockModalProps {
  open: boolean;
  handleClose: () => void;
  id?: string;
  setData: (value: StockFormType[]) => void;
}

const defaultForm = {
  id: "",
  ticker: "",
  company_name: "",
  quantity: "",
  purchased_price: "",
  current_price: "",
};

const AddStockModal = ({
  open,
  handleClose,
  id,
  setData,
}: AddStockModalProps) => {
  console.log("id", id);

  const [formData, setFormData] = useState<StockFormType>(defaultForm);
  const [formErrors, setErrorMessage] = useState(defaultForm);

  useEffect(() => {
    const previousData = localStorage.getItem("portfolio_stocks") || "[]";
    const parsedData: StockFormType[] = JSON.parse(previousData);
    const filteredData = parsedData.filter((items) => items?.id === id)[0];
    setFormData({
      id: filteredData?.id,
      ticker: filteredData?.ticker || "",
      company_name: filteredData?.company_name || "",
      quantity: filteredData?.quantity || "",
      purchased_price: filteredData?.purchased_price || "",
      current_price: filteredData?.current_price || "",
    });
  }, [id]);

  const addStock = () => {
    const uuid = UUidGenerator();
    console.log("uuid", uuid);
    const previousData = localStorage.getItem("portfolio_stocks") || "[]";
    const parsedData = JSON.parse(previousData);
    const newPayload = [...parsedData, { ...formData, id: uuid }];
    localStorage.setItem("portfolio_stocks", JSON.stringify(newPayload));
    const beautifiedData = BeautifyStockList(newPayload);
    setData(beautifiedData);
  };

  const updateStock = () => {
    const previousData = localStorage.getItem("portfolio_stocks") || "[]";
    const parsedData: StockFormType[] = JSON.parse(previousData);
    const updatedData = parsedData.map((items) => {
      if (items.id === id) {
        return { ...items, ...formData };
      }
      return items;
    });
    localStorage.setItem("portfolio_stocks", JSON.stringify(updatedData));
    const beautifiedData = BeautifyStockList(updatedData);
    setData(beautifiedData);
  };

  const submitStock = async () => {
    try {
      const { isValid, errors } = StockFormValidation(formData);
      if (isValid) {
        id ? updateStock() : addStock();
        setErrorMessage(defaultForm);
        toast.success(`Stock ${id ? "Updated" : "Added"} Successfully`);
        setFormData(defaultForm);
        setErrorMessage(defaultForm);
        handleClose();
      } else {
        setErrorMessage(errors);
        toast.error("Validation Error");
      }
    } catch (error) {
      toast.error("Error while adding Stock");
    }
  };
  return (
    <Modal
      onClose={() => {
        handleClose();
        setFormData(defaultForm);
      }}
      open={open}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        zIndex: 99999,
      }}
    >
      <Box
        display="flex"
        sx={{
          height: "max-content",
          width: "550px",
          borderRadius: "16px",
          backgroundColor: "white",
        }}
        flexDirection="column"
      >
        <Box borderRadius={2} paddingY={9} paddingX={6}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h3"
            sx={{ borderBottom: "1px solid #DFE2E7", paddingBottom: 2 }}
          >
            Add Stock
          </Typography>

          <CustomInput
            title="Ticker"
            value={formData.ticker}
            onChange={(val: string) =>
              updateState(
                "ticker",
                val.toUpperCase(),
                setFormData,
                setErrorMessage
              )
            }
            style={{ width: "100%" }}
            placeholder="Eg. JLI"
            error={formErrors.ticker}
            required
          />
          <CustomInput
            title="Company Name"
            value={formData.company_name}
            onChange={(val: string) =>
              updateState("company_name", val, setFormData, setErrorMessage)
            }
            style={{ width: "100%" }}
            placeholder="Eg. Jyoti Life Insurance"
            error={formErrors.company_name}
            required
          />
          <CustomInput
            title="Quantity"
            value={formData.quantity}
            onChange={(val: string) =>
              updateState("quantity", val, setFormData, setErrorMessage)
            }
            type="number"
            style={{ width: "100%" }}
            placeholder="Eg. 10"
            error={formErrors.quantity}
            required
          />
          <CustomInput
            title="Purchased Price (Rs.)"
            value={formData.purchased_price}
            onChange={(val: string) =>
              updateState("purchased_price", val, setFormData, setErrorMessage)
            }
            style={{ width: "100%" }}
            type="number"
            placeholder="Eg. 420"
            error={formErrors.purchased_price}
            required
          />
          <CustomInput
            title="Current Price (Rs.)"
            value={formData.current_price}
            onChange={(val: string) =>
              updateState("current_price", val, setFormData, setErrorMessage)
            }
            type="number"
            style={{ width: "100%" }}
            placeholder="Eg. 550"
            error={formErrors.current_price}
            required
          />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            marginTop={1}
          >
            <Button
              onClick={() => submitStock()}
              variant="contained"
              sx={{
                marginRight: 1,
                color: "white",
                backgroundColor: "#0291DD",
              }}
            >
              {id ? "Update Stock" : "Add Stock"}
            </Button>
            <Button
              onClick={() => {
                handleClose();
                setFormData(defaultForm);
              }}
              variant="outlined"
              sx={{ color: "#4E6072", outlineColor: "#4E6072" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStockModal;
