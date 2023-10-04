import React from "react";
import servicesStyle from "../../assets/css/services.module.css";

const Services = () => {
  return (
    <div className="common-container">
      <div className={servicesStyle.services_section}>
        <div className={servicesStyle.services_top}>
          <h2>Services</h2>
          <p>Create a book & start adding chapters and characters</p>
        </div>
        <div className={servicesStyle.services_content}>
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
          <h3>Shift</h3>
          <p>
            Donald Keene was recruited by the government to design an
            underground shelter. Over fifty years later Donald’s design has been
            realised and the last remnants of mankind live in his silo. But no
            one can remember what life was like before. In fact, they’re forced
            to forget. One simple pill erases a memory. And with it, any chance
            of hope.
          </p>
          <p>
            In the aftermath of the uprising, the people of Silo 18 are coming
            to terms with a dangerous new order. And some want it destroyed. The
            battle has been won. The war is just beginning.
          </p>
          <h3>About the Author</h3>
          <p>
            Hugh Howey spent eight years living on boats and working as a yacht
            captain for the rich and famous. It wasn't until the love of his
            life carried him away from these vagabond ways that he began to
            pursue literary adventures, rather than literal ones.
          </p>
          <p>
            Hugh wrote and self-published the Wool trilogy, which won rave
            reviews and praise from readers, and whose three books have gone on
            to become international bestsellers.
          </p>
          <p>
            He lives in Jupiter, Florida, with his wife Amber and their dog
            Bella.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
