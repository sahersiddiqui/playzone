import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

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
          if (index === 1) border = "0px 3px 0px 3px";
          else if (index === 3) border = "3px 0px 3px 0px";
          else if (index === 5) border = "3px 0px 3px 0px";
          else if (index === 7) border = "0px 3px 0px 3px";
          else if (index === 4) border = "3px";
          return (
            <Grid
              item
              xs={4}
              style={{
                borderWidth: border,
                borderColor: "#fff",
                borderStyle: "solid",
              }}
              key={index}
            >
              {responses?.[index] ? (
                <Item className="PlayIconBlank">
                  {responses?.[index] === "x" ? (
                    <img
                      src="/images/tictactoe/x.svg"
                      className="PlayIconX"
                    />
                  ) : (
                    <img
                      src="/images/tictactoe/o.svg"
                      className="PlayIconO"
                    />
                  )}
                </Item>
              ) : (
                <Item
                  style={{ cursor: "Pointer" }}
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
