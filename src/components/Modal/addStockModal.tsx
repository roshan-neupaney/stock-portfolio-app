import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import CustomInput from "../Forms/input";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { StockFormValidation } from "../../../src/utils/validationHelper";
import { updateState } from "../../../src/hooks/useUpdate";

interface AddStockModalProps {
  open: boolean;
  handleClose: () => void;
}

const defaultForm = {
  ticker: "",
  company_name: "",
  quantity: "",
  purchased_price: "",
  current_price: "",
};

const AddStockModal = ({ open, handleClose }: AddStockModalProps) => {
//   const router = useNavigate();

  const [formData, setFormData] = useState<StockFormType>(defaultForm);
  const [formErrors, setErrorMessage] = useState(defaultForm);

  const submitStock = async () => {
    try {
        const { isValid, errors } = StockFormValidation(formData);
        if (isValid) {
            const previousData = localStorage.getItem("stocks") || "[]";
            const parsedData = JSON.parse(previousData);
            console.log('hello', parsedData)
        if (parsedData.length > 0) {
          const newPayload = [...parsedData, formData];
          localStorage.setItem("portfolio_stocks", JSON.stringify(newPayload));
        } else {
          localStorage.setItem("portfolio_stocks", JSON.stringify([formData]));
        }
        setErrorMessage(defaultForm);
        toast.success("Stock Added Successfully");
        handleClose();
        // router(0);
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
        <Box borderRadius={2} padding={9}>
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
              updateState("ticker", val.toUpperCase(), setFormData, setErrorMessage)
            }
            style={{width: '100%'}}
            placeholder="Eg. JLI"
            error={formErrors.ticker}
          />
          <CustomInput
            title="Company Name"
            value={formData.company_name}
            onChange={(val: string) =>
              updateState("company_name", val, setFormData, setErrorMessage)
            }
            style={{width: '100%'}}
            placeholder="Eg. Jyoti Life Insurance"
            error={formErrors.company_name}
          />
          <CustomInput
            title="Quantity"
            value={formData.quantity}
            onChange={(val: string) =>
              updateState("quantity", val, setFormData, setErrorMessage)
            }
            type="number"
            style={{width: '100%'}}
            placeholder="Eg. 10"
            error={formErrors.quantity}
          />
          <CustomInput
            title="Purchased Price (Rs.)"
            value={formData.purchased_price}
            onChange={(val: string) =>
              updateState("purchased_price", val, setFormData, setErrorMessage)
            }
            style={{width: '100%'}}
            type="number"
            placeholder="Eg. 420"
            error={formErrors.purchased_price}
          />
          <CustomInput
            title="Current Price (Rs.)"
            value={formData.current_price}
            onChange={(val: string) =>
              updateState("current_price", val, setFormData, setErrorMessage)
            }
            type="number"
            style={{width: '100%'}}
            placeholder="Eg. 550"
            error={formErrors.current_price}
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
              Add Stock
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
