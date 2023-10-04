import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import MybookPro from "../../assets/images/collaboration_pro.png";
import Exporticon from "../../assets/images/review_icon.png";
import mybookStyle from "../../assets/css/mybook.module.css";
import { Tooltip } from "antd";
import Sidebar from "../common/Sidebar";

function Collaborations() {
  const [validated, setValidated] = useState(false);
  const text = <span>Review</span>;

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
              <h2>Collaborations</h2>
              <NavLink
                to="/sentinvitationspage"
                className={mybookStyle.add_to_new_book}
              >
                Send Invitations
              </NavLink>
            </div>
            <div className={mybookStyle.mybook_pro_section}>
              <div className={mybookStyle.mybook_product}>
                <div className={mybookStyle.mybook_product_content}>
                  <div className={mybookStyle.mybook_pro_img}>
                    <img src={MybookPro} />
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Title:</span>
                    <span className={mybookStyle.mybook_text02}>
                      Collaborator's name
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Book Title:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      The Wool Trilogy
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Role:</span>
                    <span className={mybookStyle.mybook_text02}>Editor</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Start Date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      12-05-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div className={mybookStyle.edit_icon}>
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
                <div className={mybookStyle.mybook_product_content}>
                  <div className={mybookStyle.mybook_pro_img}>
                    <img src={MybookPro} />
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Title:</span>
                    <span className={mybookStyle.mybook_text02}>
                      Collaborator's name
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Book Title:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      The Wool Trilogy
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Role:</span>
                    <span className={mybookStyle.mybook_text02}>Editor</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Start Date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      12-05-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div className={mybookStyle.edit_icon}>
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
                <div className={mybookStyle.mybook_product_content}>
                  <div className={mybookStyle.mybook_pro_img}>
                    <img src={MybookPro} />
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Title:</span>
                    <span className={mybookStyle.mybook_text02}>
                      Collaborator's name
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Book Title:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      The Wool Trilogy
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>Role:</span>
                    <span className={mybookStyle.mybook_text02}>Editor</span>
                  </div>
                  <div className={mybookStyle.mybook_pro_text}>
                    <span className={mybookStyle.mybook_text01}>
                      Start Date:
                    </span>
                    <span className={mybookStyle.mybook_text02}>
                      12-05-2023
                    </span>
                  </div>
                  <div className={mybookStyle.mybook_tooltip_btns}>
                    <div className={mybookStyle.edit_icon}>
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
}

export default Collaborations;
