import { Link, useLocation } from "react-router-dom";
import "../styles/site-footer.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

function FooterSectionLink({ id, children, isHome }) {
  if (isHome) {
    return <a href={`#${id}`}>{children}</a>;
  }

  return (
    <Link to="/" state={{ scrollTo: id }}>
      {children}
    </Link>
  );
}

export default function SiteFooter({ onStartProject }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pageChromeFooter">
      <div className="pageChromeFooter__main">
        <div className="pageChromeFooter__brand">
          <Link to="/" aria-label="Thirty3 Digital Designs homepage">
            <strong>
              MIGUEL<span>THIRTY3</span>
            </strong>
          </Link>

          <p>
            Good work deserves a website that looks the part. Websites,
            identity, and digital pieces built with you.
          </p>

          <span className="pageChromeFooter__location">
            Clarksville · Nashville · Middle Tennessee
          </span>
        </div>

        <nav className="pageChromeFooter__nav" aria-label="Footer navigation">
          <div>
            <span className="pageChromeFooter__label">Explore</span>
            <FooterSectionLink id="work" isHome={isHome}>
              Work <ArrowIcon />
            </FooterSectionLink>
            <FooterSectionLink id="services" isHome={isHome}>
              Services <ArrowIcon />
            </FooterSectionLink>
            <FooterSectionLink id="studio" isHome={isHome}>
              Studio <ArrowIcon />
            </FooterSectionLink>
            <Link to="/proof-of-work">
              Proof of Work <ArrowIcon />
            </Link>
          </div>

          <div>
            <span className="pageChromeFooter__label">Connect</span>
            {onStartProject ? (
              <button type="button" onClick={onStartProject}>
                Start a Project <ArrowIcon />
              </button>
            ) : (
              <Link to="/request-website">
                Start a Project <ArrowIcon />
              </Link>
            )}
            <Link to="/field-notes">
              Field Notes <ArrowIcon />
            </Link>
            <a
              href="https://www.instagram.com/thirty3digitaldesigns/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <ArrowIcon />
            </a>
          </div>
        </nav>
      </div>

      <div className="pageChromeFooter__bottom">
        <span>© {currentYear} Thirty3 Digital Designs</span>
        <div className="pageChromeFooter__legal">
          <span>Independent studio · Direct access to Miguel</span>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}