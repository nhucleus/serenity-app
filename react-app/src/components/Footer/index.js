import "./Footer.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <ul className="footer-ul">
        <li><a className="footer-links" href="https://nhucleus.io" target="_blank"><IoPersonCircleOutline className="footer-icon" /><span> Portfolio</span></a></li>
        <li><a className="footer-links" href="https://www.linkedin.com/in/nhu-yphan/" target="_blank"><AiOutlineLinkedin className="footer-icon" /><span> LinkedIn</span></a></li>
        <li><a className="footer-links" href="https://github.com/nhucleus" target="_blank"><AiOutlineGithub className="footer-icon" /><span> GitHub</span></a></li>
        <li><a className="footer-links" href="mailto: nhucleus@gmail.com"><AiOutlineMail className="footer-icon" /><span> Contact</span></a></li>
      </ul>
    </div>
  )
};

export default Footer;