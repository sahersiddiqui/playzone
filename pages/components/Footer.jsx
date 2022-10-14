import { Layout } from "antd";
import { CopyrightCircleOutlined, HeartFilled } from "@ant-design/icons";

const FooterComponent = () => {
  const { Footer } = Layout;

  return (
    <Footer>
      <div className="AppFooter">
        <CopyrightCircleOutlined size={"small"} />
        &nbsp;{new Date().getFullYear()}. All rights reserved.
        <div>
          &nbsp;Made with <HeartFilled className="FooterHeart" /> by&nbsp;
          <a href="https://shivamv12.github.io/" target="_blank">
            Shivam
          </a>
          &nbsp;&amp;&nbsp;
          <a href="https://sahersiddiqui.github.io/" target="_blank">
            Saher
          </a>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
