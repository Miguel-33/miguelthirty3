import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/site-chrome.css";

const defaultSectionLinks = [
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

export default function SiteHeader({
  onStartProject,
  embedded = false,
  variant = "default",
  navigationItems,
  showFieldNotes = true,
  ctaLabel = "Start a Project",
  ctaTo = "/request-website",
  menuFooterPrimary = "Clarksville / Nashville",
  menuFooterSecondary = "Websites / Identity / Design",
}) {
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = location.pathname === "/";
  const resolvedLinks = useMemo(
    () => navigationItems ?? defaultSectionLinks,
    [navigationItems],
  );

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
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("pageChromeMenuOpen", menuOpen);

    if (!menuOpen) {
      return () => {
        document.body.classList.remove("pageChromeMenuOpen");
      };
    }

    const focusableInMenu = Array.from(
      navRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [],
    );
    const focusableElements = [menuButtonRef.current, ...focusableInMenu].filter(Boolean);

    const focusFrame = window.requestAnimationFrame(() => {
      focusableInMenu[0]?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length < 2) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("pageChromeMenuOpen");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const localLinks = resolvedLinks.filter((item) => item.id && item.href?.startsWith("#"));
    const fallbackHomeLinks = navigationItems ? [] : resolvedLinks;
    const observedLinks = localLinks.length ? localLinks : isHome ? fallbackHomeLinks : [];

    if (!observedLinks.length) {
      setActiveSection("");
      return undefined;
    }

    const sections = observedLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        if (visibleSections.length) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [isHome, navigationItems, resolvedLinks]);

  const headerClasses = [
    "pageChromeHeaderWrap",
    isHome ? "is-home" : "is-inner",
    embedded ? "is-embedded" : "",
    variant !== "default" ? `is-${variant}` : "",
    scrolled ? "is-scrolled" : "",
    menuOpen ? "menu-is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClasses}>
        <nav className="pageChromeHeader" aria-label="Main navigation">
          <Link
            className="pageChromeLogo"
            to="/"
            aria-label="Thirty3 Digital Designs homepage"
            onClick={closeMenu}
          >
            <span className="pageChromeLogoWord">
              MIGUELTHIRTY<span>3</span>
            </span>

            <span className="pageChromeLogoMeta">Digital Design Studio</span>
          </Link>

          <button
            ref={menuButtonRef}
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
            ref={navRef}
            id="pageChromeNav"
            className="pageChromeNav"
            data-open={menuOpen ? "true" : "false"}
          >
            <div className="pageChromeNavLinks">
              {resolvedLinks.map((item) => {
                const href = item.href ?? (isHome ? `#${item.id}` : `/#${item.id}`);
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={`${item.id}-${item.label}`}
                    href={href}
                    className={isActive ? "is-active" : ""}
                    aria-current={isActive ? "location" : undefined}
                    onClick={closeMenu}
                  >
                    <span className="pageChromeNavNumber" aria-hidden="true">
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}

              {showFieldNotes && (
                <Link
                  to="/field-notes"
                  className={location.pathname.startsWith("/field-notes") ? "is-active" : ""}
                  aria-current={
                    location.pathname.startsWith("/field-notes") ? "page" : undefined
                  }
                  onClick={closeMenu}
                >
                  <span className="pageChromeNavNumber" aria-hidden="true">
                    {String(resolvedLinks.length + 1).padStart(2, "0")}
                  </span>
                  <span>Field Notes</span>
                </Link>
              )}
            </div>

            {onStartProject ? (
              <button
                type="button"
                className="pageChromeCta"
                aria-haspopup="dialog"
                onClick={(event) => {
                  const returnFocusTarget = menuOpen
                    ? menuButtonRef.current
                    : event.currentTarget;

                  closeMenu();
                  onStartProject(event, returnFocusTarget);
                }}
              >
                <span>{ctaLabel}</span>
                <ArrowIcon />
              </button>
            ) : (
              <Link className="pageChromeCta" to={ctaTo} onClick={closeMenu}>
                <span>{ctaLabel}</span>
                <ArrowIcon />
              </Link>
            )}

            <div className="pageChromeMenuFooter">
              <span>{menuFooterPrimary}</span>
              <span>{menuFooterSecondary}</span>
            </div>
          </div>
        </nav>
      </header>

      {!isHome && !embedded && <div className="pageChromeSpacer" aria-hidden="true" />}
    </>
  );
}
