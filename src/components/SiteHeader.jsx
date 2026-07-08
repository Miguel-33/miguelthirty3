import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/site-chrome.css";

export default function SiteHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";

  const workHref = isHome ? "#work" : "/#work";
  const startHref = isHome ? "#project-picker" : "/#project-picker";

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("pageChromeMenuOpen", menuOpen);

    return () => {
      document.body.classList.remove("pageChromeMenuOpen");
    };
  }, [menuOpen]);

 return (
  <>
    <header className={`pageChromeHeaderWrap${scrolled ? " is-scrolled" : ""}`}>
      <nav
        className={`pageChromeHeader${scrolled ? " is-scrolled" : ""}${
          menuOpen ? " menu-is-open" : ""
        }`}
        aria-label="Main navigation"
      >
        <Link
          className="pageChromeLogo"
          to="/"
          aria-label="MiguelThirty3 homepage"
          onClick={closeMenu}
        >
          <span>
            MIGUEL<b>THIRTY3</b>
          </span>
          <small>Websites & Design for Small Businesses</small>
        </Link>

        <button
          type="button"
          className="pageChromeMenuButton"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="pageChromeNav"
        >
          <span />
          <span />
        </button>

        <div
          id="pageChromeNav"
          className="pageChromeNav"
          data-open={menuOpen ? "true" : "false"}
        >
          <a href={workHref} onClick={closeMenu}>
            Work
          </a>

          <Link to="/proof-of-work" onClick={closeMenu}>
            Proof
          </Link>

          <Link to="/request-website" onClick={closeMenu}>
            Websites
          </Link>

          <Link to="/field-notes" onClick={closeMenu}>
            Notes
          </Link>

          <a className="pageChromeCta" href={startHref} onClick={closeMenu}>
            Start a Project
          </a>
        </div>
      </nav>
    </header>

    <div className="pageChromeSpacer" aria-hidden="true" />
  </>
);
}