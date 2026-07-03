import { Link, useLocation } from "react-router-dom";
import "../styles/site-chrome.css";

export default function SiteFooter() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const workHref = isHome ? "#work" : "/#work";
  const startHref = isHome ? "#project-picker" : "/#project-picker";

  return (
    <footer className="site-footer pageChromeFooter">
      <div>
        <strong>
          MIGUEL<span>THIRTY3</span>.COM
        </strong>
        <p>
          Websites, flyers, logos, branding, and digital design for small
          businesses.
        </p>
      </div>

      <div>
        <a href={startHref}>Start a project →</a>
        <a href={workHref}>See the work →</a>
        <Link to="/proof-of-work">Proof of Work →</Link>
        <a
          href="https://www.instagram.com/thirty3digitaldesigns/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram →
        </a>
      </div>
    </footer>
  );
}