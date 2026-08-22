import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/site-chrome.css";

const TOP_HEADER_LIMIT = 140;
const HEADER_HIDE_START = 220;
const HEADER_HIDE_DISTANCE = 64;
const HEADER_SHOW_DISTANCE = 18;

const DEFAULT_SECTION_LINKS = [
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

function useHeaderVisibility(location) {
  const lastScrollYRef = useRef(0);
  const scrollFrameRef = useRef(null);
  const scrollDirectionRef = useRef("");
  const scrollTravelRef = useRef(0);
  const headerVisibleRef = useRef(true);
  const floatingHeaderRef = useRef(false);
  const [floatingHeader, setFloatingHeader] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const shouldFloat = currentScrollY > TOP_HEADER_LIMIT;

    headerVisibleRef.current = true;
    floatingHeaderRef.current = shouldFloat;
    lastScrollYRef.current = currentScrollY;
    scrollDirectionRef.current = "";
    scrollTravelRef.current = 0;

    const resetFrame = window.requestAnimationFrame(() => {
      setHeaderVisible(true);
      setFloatingHeader(shouldFloat);
    });

    return () => window.cancelAnimationFrame(resetFrame);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const setVisibleState = (nextVisible) => {
      if (headerVisibleRef.current === nextVisible) return;
      headerVisibleRef.current = nextVisible;
      setHeaderVisible(nextVisible);
    };

    const setFloatingState = (nextFloating) => {
      if (floatingHeaderRef.current === nextFloating) return;
      floatingHeaderRef.current = nextFloating;
      setFloatingHeader(nextFloating);
    };

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= TOP_HEADER_LIMIT) {
        setVisibleState(true);
        setFloatingState(false);
        scrollDirectionRef.current = "";
        scrollTravelRef.current = 0;
      } else if (scrollDelta !== 0) {
        const nextDirection = scrollDelta > 0 ? "down" : "up";

        if (nextDirection !== scrollDirectionRef.current) {
          scrollDirectionRef.current = nextDirection;
          scrollTravelRef.current = 0;
        }

        scrollTravelRef.current += Math.abs(scrollDelta);

        if (
          nextDirection === "down" &&
          currentScrollY >= HEADER_HIDE_START &&
          scrollTravelRef.current >= HEADER_HIDE_DISTANCE
        ) {
          setVisibleState(false);
          setFloatingState(false);
          scrollTravelRef.current = 0;
        }

        if (
          nextDirection === "up" &&
          scrollTravelRef.current >= HEADER_SHOW_DISTANCE
        ) {
          setFloatingState(true);
          setVisibleState(true);
          scrollTravelRef.current = 0;
        }
      }

      lastScrollYRef.current = currentScrollY;
      scrollFrameRef.current = null;
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return { floatingHeader, headerVisible };
}

function useMenuDialog(menuOpen, setMenuOpen, menuButtonRef, navRef) {
  useEffect(() => {
    document.body.classList.toggle("pageChromeMenuOpen", menuOpen);

    if (!menuOpen) {
      return () => document.body.classList.remove("pageChromeMenuOpen");
    }

    const menuItems = Array.from(
      navRef.current?.querySelectorAll("a[href], button:not([disabled])") ?? [],
    );
    const focusableElements = [menuButtonRef.current, ...menuItems].filter(
      Boolean,
    );
    const focusFrame = window.requestAnimationFrame(() => {
      menuItems[0]?.focus();
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
  }, [menuOpen, menuButtonRef, navRef, setMenuOpen]);
}

function useActiveSection(isHome, navigationItems, resolvedLinks) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const localLinks = resolvedLinks.filter(
      (item) => item.id && item.href?.startsWith("#"),
    );
    const observedLinks = localLinks.length
      ? localLinks
      : isHome
        ? resolvedLinks
        : [];

    if (!observedLinks.length) {
      const clearFrame = window.requestAnimationFrame(() => {
        setActiveSection("");
      });
      return () => window.cancelAnimationFrame(clearFrame);
    }

    const sections = observedLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

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
    return () => observer.disconnect();
  }, [isHome, navigationItems, resolvedLinks]);

  return activeSection;
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
  logoAriaLabel = "Thirty3 Digital Designs homepage",
  logoMetaPrimary = "Independent web studio",
  logoMetaSecondary = "Clarksville, Tennessee",
}) {
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { floatingHeader, headerVisible } = useHeaderVisibility(location);
  const isHome = location.pathname === "/";
  const resolvedLinks = useMemo(
    () => navigationItems ?? DEFAULT_SECTION_LINKS,
    [navigationItems],
  );
  const activeSection = useActiveSection(
    isHome,
    navigationItems,
    resolvedLinks,
  );
  const topStateIsLight = variant === "paper";
  const useDarkLogo = topStateIsLight && !floatingHeader && !menuOpen;
  const headerLogoSrc = useDarkLogo
    ? "/Thirty3-Logo_charcoal.png"
    : "/Thirty3-Logo.png";

  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = () => {
    closeMenu();

    if (!isHome) return;

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  useMenuDialog(menuOpen, setMenuOpen, menuButtonRef, navRef);

  useEffect(() => {
    ["/Thirty3-Logo_charcoal.png", "/Thirty3-Logo.png"].forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const closeFrame = window.requestAnimationFrame(() => {
      setMenuOpen(false);
    });

    return () => window.cancelAnimationFrame(closeFrame);
  }, [location.hash, location.pathname]);

  const headerClasses = [
    "pageChromeHeaderWrap",
    isHome ? "is-home" : "is-inner",
    embedded ? "is-embedded" : "",
    variant !== "default" ? `is-${variant}` : "",
    floatingHeader ? "is-scrolled" : "",
    !headerVisible && !menuOpen ? "is-hidden" : "",
    menuOpen ? "menu-is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClasses}>
        <nav className="pageChromeHeader" aria-label="Main navigation">
          <div className="pageChromeHeaderBar">
            <Link
              className="pageChromeLogo"
              to="/"
              aria-label={logoAriaLabel}
              onClick={handleLogoClick}
            >
              <img
                className="pageChromeLogoImage"
                src={headerLogoSrc}
                alt=""
                decoding="async"
                fetchPriority="high"
              />
              <span className="pageChromeLogoMeta">
                <strong>{logoMetaPrimary}</strong>
                <small>{logoMetaSecondary}</small>
              </span>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="pageChromeMenuButton"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="pageChromeNav"
            >
              <span className="pageChromeMenuButtonText" aria-hidden="true">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span className="pageChromeMenuButtonIcon" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>

            <div
              ref={navRef}
              id="pageChromeNav"
              className="pageChromeNav"
              data-open={menuOpen ? "true" : "false"}
            >
              <div className="pageChromeNavLinks">
                {resolvedLinks.map((item) => {
                  const isWorkRoute =
                    item.id === "work" &&
                    location.pathname.startsWith("/proof-of-work");
                  const isActive = activeSection === item.id || isWorkRoute;
                  const content = (
                    <>
                      <span className="pageChromeNavNumber" aria-hidden="true">
                        {item.number}
                      </span>
                      <span className="pageChromeNavLabel">{item.label}</span>
                    </>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={`${item.id}-${item.label}`}
                        href={item.href}
                        className={isActive ? "is-active" : ""}
                        aria-current={isActive ? "location" : undefined}
                        onClick={closeMenu}
                      >
                        {content}
                      </a>
                    );
                  }

                  if (!isHome) {
                    return (
                      <Link
                        key={`${item.id}-${item.label}`}
                        to="/"
                        state={{ scrollTo: item.id }}
                        className={isActive ? "is-active" : ""}
                        aria-current={isActive ? "location" : undefined}
                        onClick={closeMenu}
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={`${item.id}-${item.label}`}
                      href={`#${item.id}`}
                      className={isActive ? "is-active" : ""}
                      aria-current={isActive ? "location" : undefined}
                      onClick={closeMenu}
                    >
                      {content}
                    </a>
                  );
                })}

                {showFieldNotes && (
                  <Link
                    to="/field-notes"
                    className={
                      location.pathname.startsWith("/field-notes")
                        ? "is-active"
                        : ""
                    }
                    aria-current={
                      location.pathname.startsWith("/field-notes")
                        ? "page"
                        : undefined
                    }
                    onClick={closeMenu}
                  >
                    <span className="pageChromeNavNumber" aria-hidden="true">
                      {String(resolvedLinks.length + 1).padStart(2, "0")}
                    </span>
                    <span className="pageChromeNavLabel">Field Notes</span>
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
                  <span className="pageChromeCtaIcon" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </button>
              ) : (
                <Link className="pageChromeCta" to={ctaTo} onClick={closeMenu}>
                  <span>{ctaLabel}</span>
                  <span className="pageChromeCtaIcon" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </Link>
              )}

              <div className="pageChromeMenuFooter">
                <span>{menuFooterPrimary}</span>
                <span>{menuFooterSecondary}</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {!isHome && !embedded && (
        <div className="pageChromeSpacer" aria-hidden="true" />
      )}
    </>
  );
}