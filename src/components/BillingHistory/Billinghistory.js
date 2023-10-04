import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import PlanStatus from "../../assets/images/plan_status.png";
import Exporticon from "../../assets/images/cancel_icon.png";
import RefundIcon from "../../assets/images/refund_icon.png";
import Viewsicon from "../../assets/images/views_icon.png";
import Downloadicon from "../../assets/images/download_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";

function Billinghistory() {
  const [validated, setValidated] = useState(false);
  const text = <span>View</span>;
  const refund = <span>Download</span>;

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
              <h2>Billing History</h2>
            </div>
            <div className={mybookStyle.mybook_pro_section}>
              <div className={mybookStyle.mybook_product}>
                <div
                  className={`${mybookStyle.mybook_product_content} ${mybookStyle.subscription_product_content}`}
                >
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Invoice number:
                    </span>
                    <span className={mybookStyle.mybook_text02}>12345</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Billing date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      11-06-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Plan name period:
                    </span>
                    <span className={mybookStyle.mybook_text02}>Gold</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Payment status:
                    </span>
                    <span className={mybookStyle.mybook_text02}>Paid</span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.views_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Viewsicon} />
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.download_icon}`}
                    >
                      <Tooltip placement="top" title={refund}>
                        <Button>
                          <img src={Downloadicon} />
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
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Invoice number:
                    </span>
                    <span className={mybookStyle.mybook_text02}>12345</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Billing date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      11-06-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Plan name period:
                    </span>
                    <span className={mybookStyle.mybook_text02}>Gold</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Payment status:
                    </span>
                    <span className={mybookStyle.mybook_text02}>Paid</span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.views_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Viewsicon} />
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.download_icon}`}
                    >
                      <Tooltip placement="top" title={refund}>
                        <Button>
                          <img src={Downloadicon} />
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
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Invoice number:
                    </span>
                    <span className={mybookStyle.mybook_text02}>12345</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Billing date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      11-06-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Plan name period:
                    </span>
                    <span className={mybookStyle.mybook_text02}>Gold</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Payment status:
                    </span>
                    <span className={mybookStyle.mybook_text02}>Paid</span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.views_icon}`}
                    >
                      <Tooltip placement="top" title={text}>
                        <Button>
                          <img src={Viewsicon} />
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className={`${mybookStyle.edit_icon} ${mybookStyle.download_icon}`}
                    >
                      <Tooltip placement="top" title={refund}>
                        <Button>
                          <img src={Downloadicon} />
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
}

export default Billinghistory;
