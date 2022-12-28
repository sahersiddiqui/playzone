import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";

const ResultBarComponent = ({
  type,
  responseMesg,
  showResponseBar,
  autoHideDuration,
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
        autoHideDuration={autoHideDuration}
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
          <span>{responseMesg}</span>
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResultBarComponent;
