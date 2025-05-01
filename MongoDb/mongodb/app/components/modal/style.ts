import { Box, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ModalContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "500px",
  minHeight: "400px",
  backgroundColor: "green",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  borderRadius: "20px",
  padding: "20px",
});

export const ModalHeader = styled(Box)({
  fontSize: "30px",
  fontWeight: "bold",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
});

export const CloseButton = styled(CloseIcon)({
  cursor: "pointer",
  fontSize: "30px",
});
