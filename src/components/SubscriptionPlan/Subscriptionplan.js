import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import MybookPro from "../../assets/images/collaboration_pro.png";
import Exporticon from "../../assets/images/upgrade_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";

const Subscriptionplan = () => {
  const [validated, setValidated] = useState(false);
  const text = <span>Upgrade</span>;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <div className="common-container">
        <div className={mybookStyle.change_password_page}>
          <Sidebar />
          <div className={mybookStyle.change_password_right}>
            <div className={mybookStyle.mybook_top_section}>
              <h2>Subscription Plans</h2>
            </div>
            <div className={mybookStyle.mybook_pro_section}>
              <div className={mybookStyle.mybook_product}>
                <div
                  className={`${mybookStyle.mybook_product_content} ${mybookStyle.subscription_product_content}`}
                >
                  <div className={mybookStyle.subscription_pro_text}>Free</div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Plan:</span>
                    <span className={mybookStyle.mybook_text02}>Free</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Price:</span>
                    <span className={mybookStyle.mybook_text02}>0</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Period:</span>
                    <span className={mybookStyle.mybook_text02}>
                      Monthly amount
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.upgrade_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Exporticon} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div className={mybookStyle.mybook_product}>
                <div
                  className={`${mybookStyle.mybook_product_content} ${mybookStyle.subscription_product_red}`}
                >
                  <div className={mybookStyle.subscription_pro_text}>Basic</div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Plan:</span>
                    <span className={mybookStyle.mybook_text02}>Free</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Price:</span>
                    <span className={mybookStyle.mybook_text02}>$40</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Period:</span>
                    <span className={mybookStyle.mybook_text02}>Annualy</span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.upgrade_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Exporticon} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div className={mybookStyle.mybook_product}>
                <div
                  className={`${mybookStyle.mybook_product_content} ${mybookStyle.subscription_product_content}`}
                >
                  <div className={mybookStyle.subscription_pro_text}>Pro</div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Plan:</span>
                    <span className={mybookStyle.mybook_text02}>Free</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Price:</span>
                    <span className={mybookStyle.mybook_text02}>$35</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Period:</span>
                    <span className={mybookStyle.mybook_text02}>
                      Monthly amount
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.upgrade_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Exporticon} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriptionplan;
