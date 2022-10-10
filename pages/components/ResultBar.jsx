import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";

const ResultBarComponent = ({
  type,
  responseMesg,
  showResponseBar,
  handleCloseResponseMesg,
}) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showResponseBar}
        autoHideDuration={3000}
        onClose={handleCloseResponseMesg}
        action={
          <IconButton
            size="small"
            color="inherit"
            aria-label="close"
            onClick={handleCloseResponseMesg}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          severity={type}
          variant="filled"
          onClose={handleCloseResponseMesg}
        >
          {responseMesg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResultBarComponent;
