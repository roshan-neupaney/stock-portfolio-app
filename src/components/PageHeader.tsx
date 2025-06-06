import { Box, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface PageHeader {
  title: string;
  toggleFormModal?: (value: { state: boolean; id?: string }) => void;
  hideAdd: boolean;
  addTitle: string;
  showBack: boolean;
}

const PageHeader = ({
  title = "",
  toggleFormModal,
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
        <Box className="flex flex-1 items-center gap-2.5">
          {showBack && (
            <IconButton onClick={() => router(-1)}>
              <ArrowBackIcon fontSize="inherit" style={{ color: "#0291DD" }} />
            </IconButton>
          )}
          <h1 className="items-center text-2xl font-bold ">{title}</h1>
        </Box>
      </Box>
      <Box>
        {!hideAdd && (
          <Tooltip title={addTitle}>
            <IconButton
              onClick={() => {
                toggleFormModal({ state: true, id: "" });
              }}
              style={{
                backgroundColor: "#0291DD",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              className="!px-4"
            >
              <AddIcon fontSize="medium" htmlColor="white" />
              <label
                className="text-base py-1 px-2"
                style={{ color: "white", cursor: "pointer" }}
              >
                {addTitle}
              </label>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
