import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/site-chrome.css";

const sectionLinks = [
  { id: "work", label: "Work", number: "01" },
  { id: "services", label: "Services", number: "02" },
  { id: "studio", label: "Studio", number: "03" },
  { id: "contact", label: "Contact", number: "04" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

export default function SiteHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = location.pathname === "/";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "pageChromeMenuOpen",
      menuOpen,
    );

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove(
        "pageChromeMenuOpen",
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return undefined;
    }

    const sections = sectionLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio,
          );

        if (visibleSections.length) {
          setActiveSection(
            visibleSections[0].target.id,
          );
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  const headerClasses = [
    "pageChromeHeaderWrap",
    isHome ? "is-home" : "is-inner",
    scrolled ? "is-scrolled" : "",
    menuOpen ? "menu-is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClasses}>
        <nav
          className="pageChromeHeader"
          aria-label="Main navigation"
        >
          <Link
            className="pageChromeLogo"
            to="/"
            aria-label="Thirty3 Digital Designs homepage"
            onClick={closeMenu}
          >
            <span className="pageChromeLogoWord">
              MIGUELTHIRTY<span>3</span>
            </span>

            <span className="pageChromeLogoMeta">
              Digital Design Studio
            </span>
          </Link>

          <button
            type="button"
            className="pageChromeMenuButton"
            onClick={() => {
              setMenuOpen((current) => !current);
            }}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
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
            <div className="pageChromeNavLinks">
              {sectionLinks.map((item) => {
                const href = isHome
                  ? `#${item.id}`
                  : `/#${item.id}`;

                const isActive =
                  isHome &&
                  activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={href}
                    className={
                      isActive ? "is-active" : ""
                    }
                    aria-current={
                      isActive ? "location" : undefined
                    }
                    onClick={closeMenu}
                  >
                    <span
                      className="pageChromeNavNumber"
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>

                    <span>{item.label}</span>
                  </a>
                );
              })}

              <Link
                to="/field-notes"
                className={
                  location.pathname.startsWith(
                    "/field-notes",
                  )
                    ? "is-active"
                    : ""
                }
                aria-current={
                  location.pathname.startsWith(
                    "/field-notes",
                  )
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                <span
                  className="pageChromeNavNumber"
                  aria-hidden="true"
                >
                  05
                </span>

                <span>Field Notes</span>
              </Link>
            </div>

            <Link
              className="pageChromeCta"
              to="/request-website"
              onClick={closeMenu}
            >
              <span>Start a Project</span>
              <ArrowIcon />
            </Link>

            <div className="pageChromeMenuFooter">
              <span>Clarksville / Nashville</span>
              <span>Websites / Identity / Design</span>
            </div>
          </div>
        </nav>
      </header>

      {!isHome && (
        <div
          className="pageChromeSpacer"
          aria-hidden="true"
        />
      )}
    </>
  );
}