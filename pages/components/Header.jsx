import { Layout } from "antd";
import { GamepadOutlined } from "@mui/icons-material";

const HeaderComponent = () => {
  const { Header } = Layout;

  return (
    <Header style={{ backgroundColor: "#181818" }}>
      <h1 className="AppHeader">
        <GamepadOutlined fontSize="large" />
        &nbsp; Play Zone
      </h1>
    </Header>
  );
};

export default HeaderComponent;
