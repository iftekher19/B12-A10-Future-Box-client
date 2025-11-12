import React from "react";
import gmail from "../assets/gmail.svg";
import facebook from "../assets/facebook.svg";
import linkdin from "../assets/linkdin.png";
import instagram from "../assets/insts.svg";
import logo from "../assets/TT.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-10 mt-20">
      <div className="footer max-w-6xl mx-auto flex flex-wrap justify-between">
        <aside>
          <img src={logo} alt="logo" className="w-10 h-10 mb-2" />
          <p>
            <span className="text-xl font-bold text-[#00a1b7]">
              Table<span className="text-black">Together</span>
            </span>
            <br />a welcoming table where everyone belongs
          </p>
        </aside>

        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>

        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>

        <nav>
          <header className="footer-title">Follow Us On</header>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src={facebook}
                alt="Facebook logo"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src={linkdin}
                alt="LinkedIn logo"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src={instagram}
                alt="Instagram logo"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>

            <a
              href="mailto:info@warmpaws.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <img
                src={gmail}
                alt="Gmail logo"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </nav>
      </div>

      <p className="text-center text-sm mt-10 text-gray-600">
        © {new Date().getFullYear()}TableTogether.All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
