import { Link, useLocation } from "react-router-dom";
import "../styles/site-chrome.css";

export default function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const workHref = isHome ? "#work" : "/#work";
  const startHref = isHome ? "#project-picker" : "/#project-picker";

  return (
    <nav className="site-header pageChromeHeader is-scrolled" aria-label="Main navigation">
      <Link className="site-logo" to="/" aria-label="MiguelThirty3 homepage">
        <span>
          MIGUEL<b>THIRTY3</b>
        </span>
        <small>Websites, Flyers, Logos & Digital Design</small>
      </Link>

      <div className="site-nav-links">
        <a href={workHref}>Work</a>
        <Link to="/proof-of-work">Proof</Link>
        <Link to="/request-website">Websites</Link>
        <Link to="/field-notes">Notes</Link>
        <a className="site-nav-cta" href={startHref}>
          Start a Project
        </a>
      </div>
    </nav>
  );
}