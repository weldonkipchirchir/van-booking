import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Learn more about our VanVibe Rentals service and company.</p>
          <p>
            <MdMarkEmailRead /> <span>Contact us: info@vanviberentals.com</span>
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/vans">Vans</a>
            </li>
            <li>
              <a href="/host">Profile</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <FaFacebookF />
              <a
                href="https://www.facebook.com/vanrental"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <FaTwitter />
              <a
                href="https://twitter.com/vanrental"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <FaInstagramSquare />
              <a
                href="https://www.instagram.com/vanrental"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} VanVibe Rentals. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
