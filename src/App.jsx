import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import "./Home.css";
import ProjectInquiryModal from "./components/ProjectInquiryModal.jsx";
import SiteHeader from "./components/SiteHeader.jsx";

const PROJECTS = [
  {
    number: "01",
    name: "Isabella Transport",
    type: "Transportation website",
    summary:
      "A clearer digital presence built to explain the service, strengthen trust, and make the next step obvious.",
    result: "Clearer services. Easier contact.",
    href: "/proof-of-work/isabella-transport",
    image: "/isabellaTransportHero.png",
    mobileImage: "/isabellaTransportHeroMobile.png",
    alt: "Isabella Transport website designed by Thirty3 Digital Designs",
    accent: "#ee7c36",
  },
  {
    number: "02",
    name: "Joseph P. Day",
    type: "Campaign website",
    summary:
      "A modern public-facing platform organized around credibility, accomplishments, and voter-focused information.",
    result: "A stronger digital campaign presence.",
    href: "/proof-of-work/joseph-p-day",
    image: "/josephPDayHero.png",
    mobileImage: "/josephPDayHeroMobile.png",
    alt: "Joseph P. Day campaign website designed by Thirty3 Digital Designs",
    accent: "#c9a862",
  },
  {
    number: "03",
    name: "Gregory S. Chatman",
    type: "Ministry website",
    summary:
      "An editorial home for sermons, videos, and a focused message with room for the work to keep growing.",
    result: "A more intentional stage for the message.",
    href: "/proof-of-work/gregory-chatman",
    image: "/gregorySChatmanHero.png",
    mobileImage: "/gregorySChatmanHeroMobile.png",
    alt: "Gregory S. Chatman website designed by Thirty3 Digital Designs",
    accent: "#770000",
  },
  {
    number: "04",
    name: "Blayneâ€™s Family Research",
    type: "Genealogy website",
    summary:
      "A welcoming website that makes professional family-history research feel accessible, organized, and trustworthy.",
    result: "Research organized. Next steps clarified.",
    href: "/proof-of-work/blaynes-family-research",
    image: "/blaynesFamilyResearchHero.png",
    mobileImage: "/blaynesFamilyResearchHeroMobile.png",
    alt: "Blayneâ€™s Family Research website designed by Thirty3 Digital Designs",
    accent: "#3d6770",
  },
  {
  number: "05",
  name: "Glamp Camp Nashville",
  type: "Luxury glamping website",
  summary:
    "A playful, conversion-focused website that turns backyard sleepovers into an experience parents can picture, price, and book.",
  result: "Backyard magic. Ready to book.",
  href: "/proof-of-work/glamp-camp-nashville",
  image: "/glampCampNashvilleHero.png",
  mobileImage: "/glampCampNashvilleHeroMobile.png",
  alt: "Glamp Camp Nashville website designed by Thirty3 Digital Designs",
  accent: "#ff6d5d",
},
];

const PROOF_ITEMS = [
  { value: "10", label: "websites built for real businesses" },
  { value: "â˜… â˜… â˜… â˜… â˜…", label: "Google reviews from real clients" },
  { value: "1:1", label: "direct access to Miguel" },
  { value: "Local", label: "Clarksville + Nashville" },
];

const SERVICES = [
  {
    number: "01",
    title: "New website",
    projectType: "New website",
    className: "homeService--primary",
    text: "For businesses that need a credible online home built from the ground up.",
    details: [
      "Strategy and page planning",
      "Custom responsive design",
      "Development and launch support",
    ],
    cta: "Plan my website",
  },
  {
    number: "02",
    title: "Website redesign",
    projectType: "Website redesign",
    className: "homeService--secondary",
    text: "For strong businesses behind websites that no longer represent the quality of their work.",
    details: ["Content and UX audit", "A sharper visual direction", "Mobile and conversion improvements"],
    cta: "Redesign my website",
  },
  {
    number: "03",
    title: "Landing page",
    projectType: "Landing page",
    className: "homeService--tertiary",
    text: "For a campaign, service, event, or offer that needs one focused destination.",
    details: ["One clear conversion goal", "Focused copy and structure", "Fast, responsive build"],
    cta: "Build my landing page",
  },
];

const OUTCOMES = [
  { title: "Clear", text: "Visitors understand what you do quickly." },
  { title: "Credible", text: "Your website matches the quality of your real work." },
  { title: "Easy", text: "People can find information and take the next step." },
  { title: "Distinctive", text: "Your business does not disappear into a sea of templates." },
];

const PROCESS = [
  { number: "01", title: "Strategy", text: "We identify what visitors need to understand, feel, and do." },
  { number: "02", title: "Direction", text: "I shape the message, structure, visual concept, and experience." },
  { number: "03", title: "Design + build", text: "The approved direction becomes a responsive, polished website." },
  { number: "04", title: "Launch + support", text: "We review, refine, launch, and make sure the next step is clear." },
];

const CLIENT_TYPES = [
  "Attorneys and advisors",
  "Transportation and service companies",
  "Realtors and property professionals",
  "Authors, speakers, and personal brands",
  "Nonprofits and community organizations",
  "Growing Clarksville businesses",
];

const REVIEWS = [
  {
    name: "Gregory S. Chatman",
    project: "Website design",
    website: "gregoryschatman.com",
    websiteUrl: "https://gregoryschatman.com",
    featured: true,
    quote:
      "Miguel listened thoroughly to what I wanted to obtain from my site: the look, the feel, and the overall flow of information. I really appreciate his attentiveness to detail. The website exceeded my expectations!",
  },
  {
    name: "Kiesha Bass",
    project: "Glamp Camp website",
    website: "glampcampnashville.com",
    websiteUrl: "https://glampcampnashville.com",
    featured: true,
    quote:
      "They created a stunning website for my business, Glamp Camp, and I couldnâ€™t be happier. The design was top-notch, they communicated clearly, and everything was done quickly and professionally. Truly a flawless experience from start to finish!",
  },
  {
    name: "Nick De Leon",
    project: "Business card design",
    quote:
      "Miguel was incredible to work with: professional, responsive, and clearly passionate about his craft. The quality, creativity, and attention to detail were next level.",
  },
  {
    name: "Blayne Clements",
    project: "Logo design",
    website: "blaynesfamilyresearch.com",
    websiteUrl: "https://blaynesfamilyresearch.com",
    quote: "Miguel did a great job on my logo. Highly recommend!",
  },
];

const HOME_TITLE = "Thirty3 Digital Designs | Websites, Branding & Digital Design";
const HOME_DESCRIPTION =
  "Thirty3 designs websites, identities, and digital materials for businesses in Clarksville, Nashville, and Middle Tennessee. Work directly with Miguel.";
const HOME_URL = "https://miguelthirty3.com/";
const HOME_OG_IMAGE = "https://miguelthirty3.com/thirty3-og-2026.png";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  const created = !element;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  const previous = Object.fromEntries(
    Object.keys(attributes).map((key) => [key, element.getAttribute(key)]),
  );

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return () => {
    if (created) {
      element.remove();
      return;
    }

    Object.entries(previous).forEach(([key, value]) => {
      if (value === null) element.removeAttribute(key);
      else element.setAttribute(key, value);
    });
  };
}

function upsertCanonical(url) {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  const created = !canonical;
  const previousHref = canonical?.getAttribute("href") ?? null;

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = url;

  return () => {
    if (created) canonical.remove();
    else if (previousHref === null) canonical.removeAttribute("href");
    else canonical.setAttribute("href", previousHref);
  };
}

function Thirty3Intro() {
  return (
    <div className="thirty3Intro" aria-hidden="true">
      <div className="thirty3Intro__center">
        <span className="thirty3Intro__digits">33</span>

        <div className="thirty3Intro__wordmark">
          <strong>Thirty3</strong>
          <span>Digital Designs</span>
        </div>
      </div>

      <span className="thirty3Intro__line" />
    </div>
  );
}

function HeroProjectStage({
  activeProject,
  activeIndex,
  onSelect,
}) {
  const hoverTimerRef = useRef(null);

  const clearHoverTimer = () => {
    if (!hoverTimerRef.current) return;

    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
  };

  const scheduleSelection = (index) => {
    clearHoverTimer();

    hoverTimerRef.current = window.setTimeout(() => {
      onSelect(index);
      hoverTimerRef.current = null;
    }, 90);
  };

  const selectImmediately = (index) => {
    clearHoverTimer();
    onSelect(index);
  };

  useEffect(() => clearHoverTimer, []);

  return (
    <div
      className="homeProjectStage"
      style={{
        "--home-project-accent": activeProject.accent,
      }}
      data-reveal
    >
      <div
        className="homeProjectStage__selector"
        aria-label="Featured website projects"
      >
        <p>Selected work</p>

        <div className="homeProjectStage__buttons">
          {PROJECTS.map((project, index) => {
            const active = index === activeIndex;

            return (
              <button
                type="button"
                className={active ? "is-active" : ""}
                aria-pressed={active}
                onClick={() => selectImmediately(index)}
                onFocus={() => selectImmediately(index)}
                onPointerEnter={(event) => {
                  if (
                    event.pointerType === "mouse" ||
                    event.pointerType === "pen"
                  ) {
                    scheduleSelection(index);
                  }
                }}
                onPointerLeave={clearHoverTimer}
                key={project.name}
              >
                <span>{project.number}</span>
                <strong>{project.name}</strong>
                <small>{project.type}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className="homeProjectStage__presentation">
        <Link
          className="homeProjectStage__media"
          to={activeProject.href}
          aria-label={`View the ${activeProject.name} case study`}
        >
          <div className="homeProjectStage__imageStack">
            {PROJECTS.map((project, index) => (
              <picture
                className={[
                  "homeProjectStage__picture",
                  index === activeIndex ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={index !== activeIndex}
                key={project.name}
              >
                {project.mobileImage && (
                  <source
                    media="(max-width: 760px)"
                    srcSet={project.mobileImage}
                  />
                )}

                <img
                  src={project.image}
                  alt=""
                  loading="eager"
                  decoding="async"
                  fetchPriority={
                    index === 0 ? "high" : "low"
                  }
                />
              </picture>
            ))}
          </div>

          <span
            className="homeProjectStage__caseLink"
            aria-hidden="true"
          >
            View case study <ArrowIcon />
          </span>
        </Link>

        <div
          className="homeProjectStage__caption"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <p>{activeProject.type}</p>
            <h2>{activeProject.name}</h2>
          </div>

          <div>
            <p>{activeProject.summary}</p>
            <strong>{activeProject.result}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCaseStories() {
  const isabellaExpansionRef = useRef(null);

  useEffect(() => {
    const expansion = isabellaExpansionRef.current;
    if (!expansion) return undefined;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 760px)",
    );

    if (motionQuery.matches) {
      expansion.style.setProperty("--case-scale", "1");
      expansion.style.setProperty("--case-lift", "0px");
      expansion.style.setProperty("--case-radius", "0px");
      return undefined;
    }

    let frameId = null;

    const updateExpansion = () => {
      frameId = null;

      const rect = expansion.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 0.86;
      const travel = Math.max(rect.height * 0.62, viewportHeight * 0.72);
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / travel),
      );

      expansion.style.setProperty(
        "--case-scale",
        (0.84 + progress * 0.16).toFixed(4),
      );
      expansion.style.setProperty(
        "--case-lift",
        `${Math.round((1 - progress) * 28)}px`,
      );
      expansion.style.setProperty(
        "--case-radius",
        `${Math.round((1 - progress) * 24)}px`,
      );
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateExpansion);
    };

    updateExpansion();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const isabella = PROJECTS[0];
  const joseph = PROJECTS[1];

  return (
    <div className="homeCaseStories">
      <article
        className="homeCase homeCase--isabella"
        style={{ "--home-project-accent": isabella.accent }}
      >
        <div className="homeShell homeCase__meta" data-reveal>
          <span>{isabella.number}</span>
          <p>{isabella.type}</p>
          <strong>{isabella.name}</strong>
        </div>

        <div
          className="homeCase__expansion"
          ref={isabellaExpansionRef}
          style={{
            "--case-scale": "0.84",
            "--case-lift": "28px",
            "--case-radius": "24px",
          }}
        >
          <div className="homeCase__expansionSticky">
            <Link
              className="homeCase__expansionMedia"
              to={isabella.href}
              aria-label={`View the ${isabella.name} case study`}
            >
              <picture>
                {isabella.mobileImage && (
                  <source
                    media="(max-width: 760px)"
                    srcSet={isabella.mobileImage}
                  />
                )}
                <img
                  src={isabella.image}
                  alt={isabella.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <span className="homeCase__visualLabel" aria-hidden="true">
                Built for clarity <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        <div className="homeShell homeCase__story" data-reveal>
          <div className="homeCase__storyLead">
            <p className="homeEyebrow">The assignment</p>
            <h3>Make the service feel as dependable as the people behind it.</h3>
            <Link className="homeTextLink" to={isabella.href}>
              View Isabella Transport <ArrowIcon />
            </Link>
          </div>

          <div className="homeCase__storyDetails">
            <div>
              <span>Challenge</span>
              <p>
                The business needed visitors to understand the transportation service quickly,
                feel reassured, and know exactly how to begin a conversation.
              </p>
            </div>
            <div>
              <span>Design response</span>
              <p>
                A sharper service hierarchy, trust-forward messaging, and a direct contact path
                turned the website into a guided decision instead of a digital brochure.
              </p>
            </div>
            <div>
              <span>Result</span>
              <p>
                A clearer, more established presence that explains the work without flattening
                the companyâ€™s personality.
              </p>
            </div>
          </div>
        </div>
      </article>

      <article
        className="homeShell homeCase homeCase--joseph"
        style={{ "--home-project-accent": joseph.accent }}
      >
        <div className="homeCase__josephCopy" data-reveal>
          <div className="homeCase__meta homeCase__meta--compact">
            <span>{joseph.number}</span>
            <p>{joseph.type}</p>
            <strong>{joseph.name}</strong>
          </div>

          <p className="homeEyebrow">Public trust, organized</p>
          <h3>Give the campaign story a structure people can believe.</h3>
          <p className="homeCase__josephIntro">
            The site needed to balance personality, public service, accomplishments, and campaign
            information without turning into a wall of political copy.
          </p>

          <div className="homeCase__josephDetails">
            <div>
              <span>01</span>
              <div>
                <strong>Lead with credibility</strong>
                <p>Establish who Joseph is and why the work matters before asking for support.</p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <strong>Make the record readable</strong>
                <p>Organize accomplishments and priorities into clear, scannable sections.</p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <strong>Keep the next step visible</strong>
                <p>Guide voters toward events, updates, and campaign participation.</p>
              </div>
            </div>
          </div>

          <Link className="homeTextLink" to={joseph.href}>
            View Joseph P. Day <ArrowIcon />
          </Link>
        </div>

        <div className="homeCase__josephVisual" data-reveal>
          <Link
            className="homeCase__josephMedia"
            to={joseph.href}
            aria-label={`View the ${joseph.name} case study`}
          >
            <picture>
              {joseph.mobileImage && (
                <source media="(max-width: 760px)" srcSet={joseph.mobileImage} />
              )}
              <img
                src={joseph.image}
                alt={joseph.alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <span aria-hidden="true">Campaign website Â· 02 / 02</span>
          </Link>

          <div className="homeCase__josephResult">
            <span>Outcome</span>
            <strong>{joseph.result}</strong>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function MiguelThirty3() {
  const location = useLocation();
  const pageRef = useRef(null);
  const modalTriggerRef = useRef(null);
  const [activeHeroProject, setActiveHeroProject] = useState(0);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalProjectType, setModalProjectType] = useState("");
  const [modalSource, setModalSource] = useState("Thirty3 homepage");
  const [modalInstance, setModalInstance] = useState(0);
  const [introPlaying, setIntroPlaying] = useState(() => {
    if (typeof window === "undefined") return false;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return false;

    try {
      return !window.sessionStorage.getItem("thirty3-home-intro-seen");
    } catch {
      return true;
    }
  });

  const openProjectModal = (
    event,
    projectType = "",
    source = "Thirty3 homepage",
  ) => {
    modalTriggerRef.current = event.currentTarget;
    setModalProjectType(projectType);
    setModalSource(source);
    setModalInstance((current) => current + 1);
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    if (!introPlaying) return undefined;

    try {
      window.sessionStorage.setItem("thirty3-home-intro-seen", "true");
    } catch {}

    document.documentElement.classList.add("thirty3-intro-active");

    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("thirty3-intro-active");
      setIntroPlaying(false);
    }, 2300);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("thirty3-intro-active");
    };
  }, [introPlaying]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = HOME_TITLE;

    const restoreMetadata = [
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: HOME_DESCRIPTION,
      }),
      upsertMeta('meta[name="robots"]', {
        name: "robots",
        content: "index, follow, max-image-preview:large",
      }),
      upsertMeta('meta[property="og:type"]', {
        property: "og:type",
        content: "website",
      }),
      upsertMeta('meta[property="og:site_name"]', {
        property: "og:site_name",
        content: "Thirty3 Digital Designs",
      }),
      upsertMeta('meta[property="og:title"]', {
        property: "og:title",
        content: HOME_TITLE,
      }),
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: HOME_DESCRIPTION,
      }),
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: HOME_URL,
      }),
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: HOME_OG_IMAGE,
      }),
      upsertMeta('meta[property="og:image:alt"]', {
        property: "og:image:alt",
        content: "Thirty3 Digital Designs selected website work",
      }),
      upsertMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
        content: "summary_large_image",
      }),
      upsertMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: HOME_TITLE,
      }),
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: HOME_DESCRIPTION,
      }),
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: HOME_OG_IMAGE,
      }),
      upsertCanonical(HOME_URL),
    ];
    
    const schema = document.createElement("script");
    schema.id = "thirty3-home-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": `${HOME_URL}#business`,
          name: "Thirty3 Digital Designs",
          url: HOME_URL,
          description: HOME_DESCRIPTION,
          founder: {
            "@type": "Person",
            name: "Miguel De Jesus",
          },
          areaServed: [
            "Clarksville, Tennessee",
            "Nashville, Tennessee",
            "Middle Tennessee",
          ],
        },
        {
          "@type": "WebSite",
          "@id": `${HOME_URL}#website`,
          url: HOME_URL,
          name: "Thirty3 Digital Designs",
          publisher: { "@id": `${HOME_URL}#business` },
        },
      ],
    });
    document.getElementById(schema.id)?.remove();
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      restoreMetadata.reverse().forEach((restore) => restore());
      document.getElementById("thirty3-home-schema")?.remove();
    };
  }, []);

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState({}, document.title);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.state]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    root.classList.add("has-reveal");
    const elements = root.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -7%",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const activeProject = PROJECTS[activeHeroProject];

  useEffect(() => {
    const preloadProjects = () => {
      const useMobileImages = window.matchMedia("(max-width: 760px)").matches;

      PROJECTS.slice(1).forEach((project) => {
        const image = new Image();
        image.decoding = "async";
        image.src =
          useMobileImages && project.mobileImage
            ? project.mobileImage
            : project.image;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadProjects, {
        timeout: 1200,
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(preloadProjects, 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`thirty3-home${introPlaying ? " is-intro-playing" : ""}`}
      ref={pageRef}
    >
      {introPlaying && <Thirty3Intro />}

      <a className="homeSkipLink" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader
        variant="paper"
        ctaLabel="Start a Project"
        onStartProject={(event) =>
          openProjectModal(event, "", "Thirty3 homepage header")
        }
      />

      <main id="main-content">
        <section className="homeHero" aria-labelledby="home-hero-title">
          <div className="homeShell homeHero__intro">
            <div className="homeHero__eyebrowRow" data-reveal>
              <p className="homeEyebrow">
                Web design + development Â· Clarksville, Tennessee
              </p>
              <p className="homeHero__disciplines">
                Thirty3 Digital Designs
              </p>
            </div>

            <h1 id="home-hero-title" data-reveal>
              <span>Your business</span>
              <span className="homeHero__titleShift">is better than</span>
              <span className="homeHero__titleAccent">your website.</span>
            </h1>

            <div className="homeHero__lead" data-reveal>
              <p>
                Thirty3 designs strategic websites that help Clarksville and Nashville businesses
                look trusted, communicate clearly, and turn more visitors into customers.
              </p>

              <div className="homeHero__actions">
                <button
                  type="button"
                  className="homeButton homeButton--primary"
                  onClick={(event) =>
                    openProjectModal(event, "", "Thirty3 homepage hero")
                  }
                >
                  Start a Website Project <ArrowIcon />
                </button>

                <a className="homeTextLink" href="#work">
                  See the Work <ArrowIcon />
                </a>
              </div>

              <p className="homeHero__note">
                Designed and developed by Miguel De Jesus. No polished brief required.
              </p>
            </div>
          </div>

          <div className="homeShell homeHero__stageWrap">
            <HeroProjectStage
              activeProject={activeProject}
              activeIndex={activeHeroProject}
              onSelect={setActiveHeroProject}
            />
          </div>

          <div className="homeShell homeProof" aria-label="Thirty3 studio proof" data-reveal>
            {PROOF_ITEMS.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="homeWork" id="work" aria-labelledby="home-work-title">
          <div className="homeShell homeSectionHeading" data-reveal>
            <div>
              <span>01</span>
              <p>Inside the work</p>
            </div>
            <div>
              <h2 id="home-work-title">Built to make the business feel as good online as it does in real life.</h2>
              <p>
                Every project begins with a different problem. The goal stays the same: make the
                next customer understand, trust, and choose the business.
              </p>
              <Link className="homeTextLink" to="/proof-of-work">
                Explore all work <ArrowIcon />
              </Link>
            </div>
          </div>

          <FeaturedCaseStories />
        </section>

        <div className="homeWaveDivider" aria-hidden="true">
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
            <path
              className="homeWaveDivider__fill"
              d="M0 108C184 34 360 24 554 82c224 67 408 102 886 10v88H0Z"
            />
            <path
              className="homeWaveDivider__line"
              d="M0 108C184 34 360 24 554 82c224 67 408 102 886 10"
            />
          </svg>
        </div>

        <section className="homePositioning" aria-labelledby="home-positioning-title">
          <div className="homeShell homePositioning__inner">
            <p className="homeEyebrow homeEyebrow--light" data-reveal>
              A better website changes the conversation
            </p>
            <h2 id="home-positioning-title" data-reveal>
              Before someone calls, books, visits, donates, or buys, they look you up.
            </h2>
            <div className="homePositioning__footer" data-reveal>
              <p>
                Your website should answer the questions already forming in their mind and make
                the next step feel obvious.
              </p>
              <span aria-hidden="true">33</span>
            </div>

            <div className="homeOutcomes" data-reveal>
              {OUTCOMES.map((outcome) => (
                <article key={outcome.title}>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="homeServices" id="services" aria-labelledby="home-services-title">
          <div className="homeShell homeSectionHeading" data-reveal>
            <div>
              <span>02</span>
              <p>Website services</p>
            </div>
            <div>
              <h2 id="home-services-title">What are we building?</h2>
              <p>
                Choose the closest starting point. We will shape the right scope together.
              </p>
            </div>
          </div>

          <div className="homeShell homeServices__grid">
            {SERVICES.map((service) => (
              <article className={`homeService ${service.className}`} key={service.number} data-reveal>
                <span className="homeService__number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={(event) =>
                    openProjectModal(
                      event,
                      service.projectType,
                      `Thirty3 homepage ${service.title} service`,
                    )
                  }
                >
                  {service.cta} <ArrowIcon />
                </button>
              </article>
            ))}
          </div>

          <p className="homeShell homeServices__support" data-reveal>
            Need the pieces around the website too? Thirty3 also creates flyers, business cards,
            pricing guides, social graphics, and supporting brand materials.
          </p>
        </section>

        <section className="homeClients" aria-labelledby="home-clients-title">
          <div className="homeShell homeClients__grid">
            <div data-reveal>
              <p className="homeEyebrow">Who it is for</p>
              <h2 id="home-clients-title">Built for businesses where trust matters.</h2>
              <p>
                Thirty3 works especially well with service businesses, professional practices,
                personal brands, organizations, campaigns, and local companies ready to look
                more established online.
              </p>
            </div>
            <ul data-reveal>
              {CLIENT_TYPES.map((client) => <li key={client}>{client}</li>)}
            </ul>
          </div>
        </section>

        <section className="homeProcess" aria-labelledby="home-process-title">
          <div className="homeShell homeSectionHeading" data-reveal>
            <div><span>03</span><p>The process</p></div>
            <div>
              <h2 id="home-process-title">You bring the business. Iâ€™ll help shape the website.</h2>
              <p>Working directly with Miguel keeps the strategy, design, and development connected.</p>
            </div>
          </div>
          <div className="homeShell homeProcess__grid">
            {PROCESS.map((step) => (
              <article key={step.number} data-reveal>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="homeStudio" id="studio" aria-labelledby="home-studio-title">
          <div className="homeShell homeStudio__grid">
            <div className="homeStudio__mark" aria-hidden="true" data-reveal>
              <span>THIR</span>
              <span>TY3</span>
            </div>

            <div className="homeStudio__copy" data-reveal>
              <p className="homeEyebrow homeEyebrow--light">The studio</p>
              <h2 id="home-studio-title">You work with the person doing the work.</h2>
              <p className="homeStudio__lead">
                Iâ€™m Miguel De Jesus, a web designer and developer based in Clarksville. I turn
                scattered ideas into clear, credible digital experiences without layers of
                account managers or mysterious design language.
              </p>

              <div className="homeStudio__principles">
                <div>
                  <span>01</span>
                  <p>Direct communication from the first conversation through launch.</p>
                </div>
                <div>
                  <span>02</span>
                  <p>Decisions explained clearly, without burying the project in jargon.</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Custom work shaped around the business instead of a template swap.</p>
                </div>
              </div>

              <Link className="homeTextLink homeTextLink--light" to="/field-notes">
                Read Field Notes <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="homeReviews" aria-labelledby="home-reviews-title">
          <div className="homeShell homeReviews__inner" data-reveal>
            <div>
              <p className="homeEyebrow">Client proof</p>
              <h2 id="home-reviews-title">Good work gets noticed.</h2>
            </div>
            <div className="homeReviews__score">
              <strong>4</strong>
              <span>Google reviews from real Thirty3 clients</span>
              <a className="homeTextLink" href="https://www.google.com/search?q=Thirty3+Digital+Designs+Clarksville" target="_blank" rel="noopener noreferrer">
                Read Google Reviews <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="homeShell homeReviews__grid">
            {REVIEWS.map((review) => (
              <figure
                className={`homeReview${review.featured ? " homeReview--featured" : ""}`}
                key={review.name}
                data-reveal
              >
                <div className="homeReview__rating" aria-label="5 out of 5 stars">
                  <span aria-hidden="true">â˜…â˜…â˜…â˜…â˜…</span>
                  <small>Google Review</small>
                </div>
                <blockquote>â€œ{review.quote}â€</blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span>{review.project}</span>
                  {review.website && (
                    <a href={review.websiteUrl} target="_blank" rel="noopener noreferrer">
                      {review.website} <ArrowIcon />
                    </a>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="homeResource" aria-labelledby="home-resource-title">
          <div className="homeShell homeResource__inner" data-reveal>
            <div>
              <p className="homeEyebrow">Free first-impression scorecard</p>
              <h2 id="home-resource-title">Does your business look ready?</h2>
              <p>
                Take two minutes to see where your website, brand, or customer experience may
                be making trust work harder than it should.
              </p>
            </div>

            <div className="homeResource__action">
              <a
                className="homeButton homeButton--dark"
                href="/downloads/does-your-business-look-ready.pdf?utm_source=website&utm_medium=homepage&utm_campaign=free_scorecard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the Scorecard <ArrowIcon />
              </a>
              <span>Interactive PDF Â· About 2 minutes</span>
            </div>
          </div>
        </section>

        <section className="homeContact" id="contact" aria-labelledby="home-contact-title">
          <div className="homeShell homeContact__inner" data-reveal>
            <p className="homeEyebrow">Your next website</p>
            <h2 id="home-contact-title">
              Letâ€™s make your business
              <span>look as ready as it really is.</span>
            </h2>
            <p>
              Tell me what you are building, what is not working, or what you wish your website
              could do. You do not need to have everything figured out yet.
            </p>

            <div className="homeContact__actions">
              <button
                type="button"
                className="homeButton homeButton--dark"
                onClick={(event) =>
                  openProjectModal(event, "", "Thirty3 homepage final CTA")
                }
              >
                Start a Website Project <ArrowIcon />
              </button>
              <Link className="homeTextLink" to="/proof-of-work">
                View All Work <ArrowIcon />
              </Link>
            </div>
          </div>

          <footer className="homeShell homeFooter" aria-label="Thirty3 studio details">
            <span>Thirty3 Digital Designs</span>
            <span>Clarksville Â· Nashville Â· Middle Tennessee</span>
            <span>Websites Â· Identity Â· Digital Design</span>
          </footer>
        </section>
      </main>

      <ProjectInquiryModal
        key={modalInstance}
        open={projectModalOpen}
        onClose={closeProjectModal}
        returnFocusRef={modalTriggerRef}
        source={modalSource}
        initialProjectType={modalProjectType}
      />
    </div>
  );
}