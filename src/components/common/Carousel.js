import React from "react";
import { Carousel } from "antd";
import Previousbtn from "../../assets/images/previous_btn.png";
import Nextbtn from "../../assets/images/next_btn.png";
import previewexportStyle from "../../assets/css/previewexport.module.css";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const EbookCarousel = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className={previewexportStyle.carousel_invitation_content}>
      <div className={previewexportStyle.carousel_next_previous_btn}>
        <a href="/" className={previewexportStyle.carousel_previous_btn}>
          <img src={Previousbtn} />
        </a>
        <a href="/" className={previewexportStyle.carousel_next_btn}>
          <img src={Nextbtn} />
        </a>
      </div>
      <Carousel afterChange={onChange}>
        <div className={previewexportStyle.carousel_invitation_text}>
          <h3>The Wool Trilogy</h3>
          <p>
            In a ruined and hostile landscape, in a future few have been unlucky
            enough to survive, a community exists in a giant underground silo.
            Jules is part of this community, but she is different. She dares to
            hope. And as her walls start closing in, she must decide whether to
            fight, or to die.
          </p>
          <p>
            The bestselling Wool trilogy now available in one download. Includes
            Wool, Shift and Dust.
          </p>
          <p>
            In a ruined and hostile landscape, in a future few have been unlucky
            enough to survive, a community exists in a giant underground silo.
            Jules is part of this community, but she is different. She dares to
            hope. And as her walls start closing in, she must decide whether to
            fight, or to die.
          </p>
        </div>
        <div className={previewexportStyle.carousel_invitation_text}>
          <h3>The Wool Trilogy</h3>
          <p>
            In a ruined and hostile landscape, in a future few have been unlucky
            enough to survive, a community exists in a giant underground silo.
            Jules is part of this community, but she is different. She dares to
            hope. And as her walls start closing in, she must decide whether to
            fight, or to die.
          </p>
        </div>
        <div className={previewexportStyle.carousel_invitation_text}>
          <h3>The Wool Trilogy</h3>
          <p>
            In a ruined and hostile landscape, in a future few have been unlucky
            enough to survive, a community exists in a giant underground silo.
            Jules is part of this community, but she is different. She dares to
            hope. And as her walls start closing in, she must decide whether to
            fight, or to die.
          </p>
          <p>
            The bestselling Wool trilogy now available in one download. Includes
            Wool, Shift and Dust.
          </p>
        </div>
        <div className={previewexportStyle.carousel_invitation_text}>
          <h3>The Wool Trilogy</h3>
          <p>
            The bestselling Wool trilogy now available in one download. Includes
            Wool, Shift and Dust.
          </p>
          <p>
            In a ruined and hostile landscape, in a future few have been unlucky
            enough to survive, a community exists in a giant underground silo.
            Jules is part of this community, but she is different. She dares to
            hope. And as her walls start closing in, she must decide whether to
            fight, or to die.
          </p>
        </div>
      </Carousel>
    </div>
  );
};
export default EbookCarousel;
