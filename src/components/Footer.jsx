import React from "react";
//import { Component } from "react";
import "./cssfooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="divfooter">
      <footer>
        <div className="container">
          <div className="sec about us">
            <h2> About us</h2>
            <ul className="sci">
              <li>
                <a href="#" className="facebook social">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="#" className="twitter social">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="#" className="instagram social">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="#" className="youtube social">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>

          <div className="sec quickLinks">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              {/* <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li> */}
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="sec contact">
            <h2>Get in Touch</h2>
            <ul className="info">
              <li>
                <span>
                  {" "}
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                </span>
                <span>
                  <a href="https://goo.gl/maps/iiktZAcjkqcY11Ux7">
                    The Pet Shop
                  </a>
                  <br />
                </span>
              </li>

              <li>
                {" "}
                <span>
                  {" "}
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <span>
                  <a href="moview.reviews@gmail.com">thepetshop@gmail.com </a>
                  <br />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="copyrightText">
        <p> Copyright © 2023. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
