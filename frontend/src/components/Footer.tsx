import { FC } from 'react';
import NFSLogo from "/images/nfs.png";
import UCLogo from "/images/uncon.png";
import MULogo from "/images/mu.png";
import LWLogo from "/images/living-wage.png";
import GAILogo from "/images/GAI.png";
import "./Footer.css";

const Footer: FC = () => {
  return (
    <div id="footer">
      <p><b>Our Partners</b></p>
      <div id="footerImageLinks">
        <a href="https://www.newfoundsound.co.uk/" target="_blank">
          <img
            src={NFSLogo}
            alt="New Found Sound Link"
            className="footerImage"
          />
        </a>
        <a href="https://www.unconventionhub.org/" target="_blank">
          <img
            src={UCLogo}
            alt="Unconvention Hub Link"
            className="footerImage"
          />
        </a>
        <a href="https://musiciansunion.org.uk/" target="_blank">
          <img
            src={MULogo}
            alt="Musicians Union Link"
            className="footerImage"
          />
        </a>
        <a href="https://www.livingwage.org.uk/accredited-living-wage-employers/" target="_blank">
          <img
            src={LWLogo}
            alt="Living Wage Employer Link"
            className="footerImage"
          />
        </a>
        <a href="https://www.creativecarbonscotland.com/green-arts-initiative/" target="_blank">
          <img
            src={GAILogo}
            alt="Green Arts Initiative Link"
            className="footerImage"
          />
        </a>
      </div>

      <div id="footerLinks">
        <a href="">Terms & Conditions</a>
        <a href="">Privacy Policy</a>
      </div>

      <p id="unavoided">
        OFF AXIS TOURS CIC © 2024 | Website built by SH32, Designed by{" "}
        <a href="https://unavoided.com/" target="_blank">unavoided</a>
      </p>
    </div>
  );
}

export default Footer;
