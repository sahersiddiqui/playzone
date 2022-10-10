import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import { CloseOutlined, RadioButtonUnchecked } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  padding: "10%",
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
  boxShadow: "none",
  backgroundColor: "#f0f2f5",
  justifyContent: "center",
  alignItems: "center",
  height: 110,
  [theme.breakpoints.down("sm")]: {
    height: 60,
  },
}));

const CrossBoardComponent = ({ counter, responses, populateBoard }) => {
  const fields = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <Grid container spacing={0} columnSpacing={0}>
        {fields.map((item, index) => {
          let border = "0";
          if (index === 1) border = "0px 2px 0px 2px";
          else if (index === 3) border = "2px 0px 2px 0px";
          else if (index === 5) border = "2px 0px 2px 0px";
          else if (index === 7) border = "0px 2px 0px 2px";
          else if (index === 4) border = "2px";
          return (
            <Grid
              item
              xs={4}
              style={{
                borderWidth: border,
                borderColor: "#606162",
                borderStyle: "solid",
              }}
              key={index}
            >
              {responses?.[index] ? (
                <Item>
                  {responses?.[index] === "x" ? (
                    <CloseOutlined fontSize="large" className="PlayIconX" />
                  ) : (
                    <RadioButtonUnchecked
                      fontSize="large"
                      className="PlayIconO"
                    />
                  )}
                </Item>
              ) : (
                <Item
                  className="PlayIconBlank"
                  onClick={() =>
                    populateBoard(index, counter % 2 === 0 ? "x" : "o")
                  }
                ></Item>
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CrossBoardComponent;
