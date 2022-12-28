import { Col, Layout, Row } from "antd";
import { CopyrightCircleOutlined, HeartFilled } from "@ant-design/icons";

const FooterComponent = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ backgroundColor: "#181818" }}>
      <Row className="AppFooter">
        <Col xs={24} sm={12} className="RightsText">
          <CopyrightCircleOutlined size={"small"} />
          &nbsp;{new Date().getFullYear()}. All rights reserved.
        </Col>
        <Col xs={24} sm={12} className="CreditsText">
          &nbsp;Made with <HeartFilled className="FooterHeart" /> by&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://shivamv12.github.io/"
          >
            Shivam
          </a>
          &nbsp;&amp;&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://sahersiddiqui.github.io/"
          >
            Saher
          </a>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
