import { Layout } from "antd";
import { GamepadOutlined } from "@mui/icons-material";

const HeaderComponent = () => {
  const { Header } = Layout;

  return (
    <Header>
      <h1 className="AppHeader">
        <GamepadOutlined fontSize="large" />
        &nbsp; Play Zone
      </h1>
    </Header>
  );
};

export default HeaderComponent;
