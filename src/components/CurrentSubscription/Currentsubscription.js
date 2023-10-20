import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import PlanStatus from "../../assets/images/plan_status.png";
import Exporticon from "../../assets/images/cancel_icon.png";
import RefundIcon from "../../assets/images/refund_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";

const Currentsubscription = () => {
  const [validated, setValidated] = useState(false);
  const text = <span>Cancel</span>;
  const refund = <span>Refund</span>;

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
              <h2>Current Subscription</h2>
            </div>
            <div className={mybookStyle.mybook_pro_section}>
              <div className={mybookStyle.mybook_product}>
                <div
                  className={`${mybookStyle.mybook_product_content} ${mybookStyle.subscription_product_content}`}
                >
                  <div className={mybookStyle.subscription_pro_text}>Free</div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Start Date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      10-05-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Next billing date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      11-06-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Link to change plan:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      Change Plan
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Plan status:
                    </span>
                    <span className={mybookStyle.plan_status}>
                      <img src={PlanStatus} />
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.cancel_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Exporticon} />
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.refund_icon}`}
                    >
                      <Tooltip placement="top" title={refund}>
                        <Button>
                          <img src={RefundIcon} />
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
                  <div className={mybookStyle.subscription_pro_text}>Basic</div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Start Date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      10-05-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Next billing date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      11-06-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Link to change plan:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      Change Plan
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Plan status:
                    </span>
                    <span className={mybookStyle.plan_status}>
                      <img src={PlanStatus} />
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.cancel_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Exporticon} />
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.refund_icon}`}
                    >
                      <Tooltip placement="top" title={refund}>
                        <Button>
                          <img src={RefundIcon} />
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
                    <span className={mybookStyle.mybook_text01}>
                      Start Date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      10-05-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Next billing date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      11-06-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Link to change plan:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      Change Plan
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Plan status:
                    </span>
                    <span className={mybookStyle.plan_status}>
                      <img src={PlanStatus} />
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.cancel_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Exporticon} />
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.refund_icon}`}
                    >
                      <Tooltip placement="top" title={refund}>
                        <Button>
                          <img src={RefundIcon} />
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

export default Currentsubscription;
