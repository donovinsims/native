import React from "react";
import { Container } from "../ui/container";

const MagicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 10.67 10.67"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Magic Icon</title>
    <path d="M5.33333 0L6.41334 4.28L10.6667 5.33333L6.41334 6.38667L5.33333 10.6667L4.25333 6.38667L0 5.33333L4.25333 4.28L5.33333 0Z" />
  </svg>
);

interface FooterProps {
  onSubmitClick?: () => void;
  onSubscribeClick?: () => void;
}

const Footer = ({ onSubmitClick, onSubscribeClick }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border-1 bg-page py-xl transition-colors">
      <Container>
        <div className="grid grid-cols-1 gap-xl md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and Tagline */}
          <div className="md:col-span-2 lg:col-span-2">
              <a
                className="flex w-max cursor-pointer items-center gap-xs rounded-full border border-border-1 bg-page px-md py-sm text-h1 leading-none transition-all duration-200 ease-in-out hover:-rotate-3 hover:border hover:bg-ui-2 mb-md"
                href="/"
              >
              <span>see</span>
              <MagicIcon className="w-[10.67px]" />
              <span>saw</span>
            </a>
            <p className="text-grey body-md max-w-xs">
              A curated directory of exceptional digital experiences and modern web aesthetics.
            </p>
          </div>

          {/* Directory Links */}
          <div>
            <h4 className="text-text h4 mb-md">Directory</h4>
            <ul className="space-y-sm">
              <li>
                <button 
                  onClick={onSubmitClick}
                  className="text-grey body-md hover:text-text transition-colors"
                >
                  Submit Website
                </button>
              </li>
              <li>
                <button 
                  onClick={onSubscribeClick}
                  className="text-grey body-md hover:text-text transition-colors"
                >
                  Newsletter
                </button>
              </li>
              <li>
                <a href="#" className="text-grey body-md hover:text-text transition-colors">
                  Featured Apps
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-text h4 mb-md">Connect</h4>
            <ul className="space-y-sm">
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-grey body-md hover:text-text transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-grey body-md hover:text-text transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:hello@seesaw.com" className="text-grey body-md hover:text-text transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-text h4 mb-md">Legal</h4>
            <ul className="space-y-sm">
              <li>
                <a href="#" className="text-grey body-md hover:text-text transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-grey body-md hover:text-text transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-xl pt-lg border-t border-border-1 flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-grey body-sm">
            © {currentYear} seesaw. All rights reserved.
          </p>
          <div className="flex items-center gap-lg">
            <p className="text-grey body-sm flex items-center gap-xs">
              Built with <span className="text-error">❤</span> for the web.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
