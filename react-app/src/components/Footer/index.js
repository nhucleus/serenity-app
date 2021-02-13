import "./Footer.css";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <ul className="footer-ul">
        <li><a className="footer-links" href="https://www.linkedin.com/in/nhu-yphan/"><AiOutlineLinkedin className="footer-icon"/> LinkedIn</a></li>
        <li><a className="footer-links" href="https://github.com/nhucleus"><AiOutlineGithub className="footer-icon"/> GitHub</a></li>
        <li><a className="footer-links" href="mailto: nhucleus@gmail.com"><AiOutlineMail className="footer-icon"/> Contact</a></li>
      </ul>
    </div>
  )
}

export default Footer;