import {
  Box,
  Button,
  Dialog,
  Typography,
  DialogContent,
  Fade,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DeleteModalProps {
  label: string;
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const DeleteModal = ({
  label,
  open,
  handleClose,
  handleSubmit,
}: DeleteModalProps) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className="!z-999999"
      maxWidth="xs"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={200}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          py={5}
          px={3}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "rgba(244, 67, 54, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 30, color: "#f44336" }} />
          </Box>

          <Typography
            variant="h6"
            fontWeight="500"
            gutterBottom
            sx={{
              color: "#212121",
              fontSize: "1.25rem",
              fontFamily: "outfit",
              letterSpacing: "-0.01em",
            }}
          >
            Are you sure to delete this {label}?
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            width="100%"
            mt={4}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                py: 1,
                px: 3,
                minWidth: 100,
                borderColor: "#e0e0e0",
                color: "#757575",
                textTransform: "none",
                fontFamily: "outfit",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#bdbdbd",
                  bgcolor: "transparent",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                borderRadius: 2,
                py: 1,
                px: 3,
                minWidth: 100,
                bgcolor: "#f44336",
                color: "white",
                textTransform: "none",
                fontFamily: "outfit",
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#d32f2f",
                  boxShadow: "none",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
