import { Link, useLocation } from "react-router-dom";

export default function SiteHeader() {
  const { pathname } = useLocation();

  const scrollToContact = (e) => {
    if (pathname === "/") return;
    e.preventDefault();
    window.location.href = "/#contact";
  };

  return (
    <nav className="site-header" aria-label="Main navigation">
      <Link to="/" className="site-logo">
        <span>
          MIGUEL<b>33</b>
        </span>
        <small>Digital Design Concierge</small>
      </Link>

      <div className="site-nav-links">
        <Link to="/#work">Work</Link>
        <Link to="/field-notes">Field Notes</Link>
        <a href="/#contact" onClick={scrollToContact}>
          Start a Project
        </a>
      </div>
    </nav>
  );
}