import { Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface PageHeader {
  title: string;
  toggleModal: (value: { state: boolean; id?: string }) => void;
  hideAdd: boolean;
  addTitle: string;
  showBack: boolean;
}

const PageHeader = ({
  title = "",
  toggleModal,
  hideAdd = false,
  addTitle = "Add",
  showBack = false,
}: any) => {
  const router = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginX={2}
      paddingY={0.3}
    >
      <Box
        className="flex-1 justify-between"
        display={"flex"}
        alignItems={"center"}
        gap={1}
      >
        <div className="flex-1 items-center gap-10">
          {showBack && (
            <IconButton onClick={() => router(-1)} className="control-btn-back">
              <ArrowBackIcon fontSize="inherit" style={{ color: "#0291DD" }} />
            </IconButton>
          )}
          <h1 className="items-center ">{title}</h1>
        </div>
      </Box>
      <div>
        {!hideAdd && (
          <Tooltip title={addTitle}>
            <IconButton
              onClick={() => {
                toggleModal({ state: true, id: "" });
              }}
              style={{
                backgroundColor: "#0291DD",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <AddIcon fontSize="medium" htmlColor="white" />
              <label
                className="label-medium"
                style={{ color: "white", cursor: "pointer" }}
              >
                {addTitle}
              </label>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Box>
  );
};

export default PageHeader;
