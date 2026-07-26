import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import "./Home.css";
import ArrowIcon from "./components/ArrowIcon.jsx";
import ProjectInquiryModal from "./components/ProjectInquiryModal.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import HeroSection from "./components/sections/HeroSection.jsx";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    name: "Isabella Transport",
    type: "Transportation website",
    statement: "Build trust before the first ride.",
    summary:
      "A clearer digital presence that explains the service quickly and makes the next step obvious.",
    services: ["Strategy", "UX", "Design", "Development"],
    href: "/proof-of-work/isabella-transport",
    image: "/isabellaTransportHero.png",
    mobileImage: "/isabellaTransportHeroMobile.png",
    alt: "Isabella Transport website designed by Thirty3 Digital Designs",
    accent: "#ee7c36",
  },
  {
    number: "02",
    name: "Glamp Camp Nashville",
    type: "Luxury glamping website",
    statement: "Turn backyard magic into a bookable experience.",
    summary:
      "A playful, conversion-focused website that helps parents picture the experience and take action.",
    services: ["Direction", "Copy", "Design", "WordPress"],
    href: "/proof-of-work/glamp-camp-nashville",
    image: "/glampCampNashvilleHero.png",
    mobileImage: "/glampCampNashvilleHeroMobile.png",
    alt: "Glamp Camp Nashville website designed by Thirty3 Digital Designs",
    accent: "#ff6d5d",
  },
  {
    number: "03",
    name: "Joseph P. Day",
    type: "Campaign website",
    statement: "Organize credibility for public view.",
    summary:
      "A modern campaign platform shaped around accomplishments, trust, and voter-focused information.",
    services: ["Strategy", "Content", "Design", "Development"],
    href: "/proof-of-work/joseph-p-day",
    image: "/josephPDayHero.png",
    mobileImage: "/josephPDayHeroMobile.png",
    alt: "Joseph P. Day campaign website designed by Thirty3 Digital Designs",
    accent: "#c9a862",
  },
  {
    number: "04",
    name: "Gregory S. Chatman",
    type: "Author and speaker website",
    statement: "Give the message a stronger stage.",
    summary:
      "An editorial home for sermons, videos, and a focused message with room for the work to grow.",
    services: ["Content", "UX", "Design", "WordPress"],
    href: "/proof-of-work/gregory-chatman",
    image: "/gregorySChatmanHero.png",
    mobileImage: "/gregorySChatmanHeroMobile.png",
    alt: "Gregory S. Chatman website designed by Thirty3 Digital Designs",
    accent: "#770000",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "New websites",
    projectType: "New website",
    text: "A custom digital home built around what visitors need to understand, trust, and do.",
  },
  {
    number: "02",
    title: "Website redesigns",
    projectType: "Website redesign",
    text: "A sharper experience for a strong business whose website no longer reflects the work.",
  },
  {
    number: "03",
    title: "Landing pages",
    projectType: "Landing page",
    text: "One focused destination for a campaign, service, event, launch, or important offer.",
  },
  {
    number: "04",
    title: "Brand support",
    projectType: "Brand and digital design",
    text: "The supporting identity, print, and digital pieces that keep the business looking consistent.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Find the gap",
    text: "We identify where the current website is weakening the first impression.",
  },
  {
    number: "02",
    title: "Shape the story",
    text: "Message, structure, and visual direction become one clear system.",
  },
  {
    number: "03",
    title: "Design + build",
    text: "The approved direction becomes a responsive, polished website.",
  },
  {
    number: "04",
    title: "Launch clearly",
    text: "We refine the details, launch confidently, and keep the next step obvious.",
  },
];

const REVIEWS = [
  {
    name: "Gregory S. Chatman",
    project: "Website design",
    quote:
      "Miguel listened thoroughly to what I wanted from my site: the look, the feel, and the overall flow of information. The website exceeded my expectations!",
  },
  {
    name: "Kiesha Bass",
    project: "Glamp Camp website",
    quote:
      "The design was top-notch, communication was clear, and everything was done quickly and professionally. Truly a flawless experience from start to finish!",
  },
];

const HOME_TITLE =
  "Thirty3 Digital Designs | Web Design in Clarksville & Nashville";
const HOME_DESCRIPTION =
  "Thirty3 creates strategic websites, redesigns, and digital design for established businesses in Clarksville, Nashville, and Middle Tennessee.";
const HOME_URL = "https://miguelthirty3.com/";
const HOME_OG_IMAGE = "https://miguelthirty3.com/thirty3-og-2026.png";

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

function WaveDivider({ tone = "paper", flip = false }) {
  return (
    <div
      className={`homeWave homeWave--${tone}${flip ? " is-flipped" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none">
        <path d="M0 51C220 82 424 74 640 42c220-33 458-39 800 4v50H0Z" />
        <path
          className="homeWave__line"
          d="M0 51C220 82 424 74 640 42c220-33 458-39 800 4"
        />
      </svg>
    </div>
  );
}

function ProjectVisual({ project, index, isActive }) {
  return (
    <Link
      className={`homeWorkVisual__item${isActive ? " is-active" : ""}`}
      to={project.href}
      aria-label={`View the ${project.name} case study`}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      data-work-visual-item
    >
      <picture>
        <img
          src={project.image}
          alt={project.alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      <span className="homeWorkVisual__shade" aria-hidden="true" />
      <span className="homeWorkVisual__number" aria-hidden="true">
        {project.number} / {String(PROJECTS.length).padStart(2, "0")}
      </span>
      <span className="homeWorkVisual__open" aria-hidden="true">
        View project <ArrowIcon />
      </span>
    </Link>
  );
}

function ProjectStory({ project, index, isActive, onSelect }) {
  return (
    <article
      className={`homeCase${isActive ? " is-active" : ""}`}
      style={{ "--case-accent": project.accent }}
      data-project-index={index}
      data-case
      data-work-card
    >
      <div className="homeCase__meta">
        <span>{project.number}</span>
        <p>{project.type}</p>
      </div>

      <h3>{project.name}</h3>
      <p className="homeCase__statement">{project.statement}</p>

      <Link
        className="homeCase__mobileMedia"
        to={project.href}
        aria-label={`View the ${project.name} case study`}
        data-case-media
      >
        <picture>
          {project.mobileImage && (
            <source media="(max-width: 760px)" srcSet={project.mobileImage} />
          )}
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </Link>

      <p className="homeCase__summary">{project.summary}</p>

      <ul aria-label={`${project.name} project services`}>
        {project.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>

      <div className="homeCase__actions">
        <button
          type="button"
          className="homeCase__preview"
          aria-pressed={isActive}
          onClick={onSelect}
        >
          {isActive ? "Currently viewing" : "Preview project"}
          <span aria-hidden="true">{project.number}</span>
        </button>

        <Link className="homeTextLink" to={project.href}>
          View case study <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

export default function MiguelThirty3() {
  const location = useLocation();
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const modalTriggerRef = useRef(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalProjectType, setModalProjectType] = useState("");
  const [modalSource, setModalSource] = useState("Thirty3 homepage");
  const [modalInstance, setModalInstance] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

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

  const closeProjectModal = () => setProjectModalOpen(false);

  const selectProject = (index, scrollToChapter = false) => {
    setActiveProject(index);

    if (!scrollToChapter) return;

    const chapter = pageRef.current?.querySelector(
      `[data-project-index="${index}"]`,
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    chapter?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const previousTitle = document.title;
    const restoreMetadata = [
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: HOME_DESCRIPTION,
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
      upsertMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
        content: "summary_large_image",
      }),
      upsertCanonical(HOME_URL),
    ];

    document.title = HOME_TITLE;

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
          image: HOME_OG_IMAGE,
          description: HOME_DESCRIPTION,
          founder: { "@type": "Person", name: "Miguel De Jesus" },
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

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    if (!page || !hero) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      page.querySelectorAll("[data-reveal]").forEach((element) => {
        element.classList.add("is-visible");
      });
      return undefined;
    }

    let motionQueries;
    let heroPointerCleanup = () => {};
    const context = gsap.context(() => {
      gsap.set("[data-hero-screen]", { opacity: 0 });
      gsap.set("[data-hero-signal]", {
        opacity: 0,
        scale: 0.82,
        rotate: -8,
      });
      gsap.set("[data-hero-mark]", { opacity: 0, yPercent: 12 });
      gsap.set("[data-hero-signal-label]", { opacity: 0, y: 10 });
      gsap.set(".pageChromeHeaderWrap.is-home", { opacity: 0, y: -10 });
      gsap.set('[data-hero-word="base"]', {
        opacity: 0,
        rotateX: -38,
        yPercent: 118,
      });
      gsap.set("[data-hero-emphasis]", {
        clipPath: "inset(0 100% 0 0)",
        yPercent: 12,
      });
      gsap.set("[data-hero-support], [data-hero-action], [data-hero-footer]", {
        opacity: 0,
        y: 14,
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to("[data-hero-screen]", { opacity: 1, duration: 0.25 }, 0)
        .to(
          "[data-hero-signal]",
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            ease: "expo.out",
          },
          0.08,
        )
        .to(
          ".pageChromeHeaderWrap.is-home",
          { opacity: 1, y: 0, duration: 0.36 },
          0.06,
        )
        .to(
          '[data-hero-word="base"]',
          {
            opacity: 1,
            rotateX: 0,
            yPercent: 0,
            duration: 0.72,
            stagger: 0.035,
            ease: "expo.out",
          },
          0.16,
        )
        .to(
          "[data-hero-emphasis]",
          {
            clipPath: "inset(0 0% 0 0)",
            yPercent: 0,
            duration: 0.72,
            ease: "expo.out",
          },
          0.58,
        )
        .to(
          "[data-hero-mark]",
          { opacity: 1, yPercent: 0, duration: 0.7, ease: "expo.out" },
          0.38,
        )
        .to(
          "[data-hero-signal-label]",
          { opacity: 1, y: 0, duration: 0.38 },
          0.7,
        )
        .to("[data-hero-support]", { opacity: 1, y: 0, duration: 0.46 }, 0.72)
        .to(
          "[data-hero-action]",
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.05 },
          0.84,
        )
        .to("[data-hero-footer]", { opacity: 1, y: 0, duration: 0.48 }, 0.92);

      const signal = hero.querySelector("[data-hero-signal]");
      const signalMark = hero.querySelector("[data-hero-mark]");

      if (
        signal &&
        signalMark &&
        window.matchMedia("(pointer: fine)").matches
      ) {
        const handleHeroPointer = (event) => {
          const bounds = hero.getBoundingClientRect();
          const x =
            (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
          const y =
            (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;

          gsap.to(signal, {
            x: x * 22,
            y: y * 16,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
          });
          gsap.to(signalMark, {
            x: x * 8,
            y: y * 5,
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const resetHeroPointer = () => {
          gsap.to([signal, signalMark], {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        };

        hero.addEventListener("pointermove", handleHeroPointer);
        hero.addEventListener("pointerleave", resetHeroPointer);

        heroPointerCleanup = () => {
          hero.removeEventListener("pointermove", handleHeroPointer);
          hero.removeEventListener("pointerleave", resetHeroPointer);
        };
      }

      page.querySelectorAll("[data-reveal]").forEach((element) => {
        if (element.closest("[data-work-card]")) return;

        gsap.fromTo(
          element,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      const syncProjectFromViewport = () => {
        const chapters = Array.from(page.querySelectorAll("[data-work-card]"));
        const viewportFocus = window.innerHeight * 0.5;
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        chapters.forEach((chapter, index) => {
          const bounds = chapter.getBoundingClientRect();
          const center = bounds.top + bounds.height / 2;
          const distance = Math.abs(center - viewportFocus);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveProject(nearestIndex);
      };

      motionQueries = gsap.matchMedia();

      motionQueries.add("(min-width: 981px)", () => {
        const workVisual = page.querySelector("[data-work-visual]");
        const magneticItems = gsap.utils.toArray("[data-magnetic]");

        ScrollTrigger.create({
          trigger: "[data-work-experience]",
          start: "top bottom",
          end: "bottom top",
          onEnter: syncProjectFromViewport,
          onEnterBack: syncProjectFromViewport,
          onUpdate: syncProjectFromViewport,
        });

        if (workVisual) {
          gsap.fromTo(
            workVisual,
            { y: 24 },
            {
              y: -18,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-work-experience]",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        }

        const magneticCleanups = magneticItems.map((item) => {
          const move = (event) => {
            const bounds = item.getBoundingClientRect();
            const x = event.clientX - (bounds.left + bounds.width / 2);
            const y = event.clientY - (bounds.top + bounds.height / 2);
            gsap.to(item, {
              x: x * 0.1,
              y: y * 0.12,
              duration: 0.35,
              ease: "power3.out",
              overwrite: true,
            });
          };
          const reset = () => {
            gsap.to(item, {
              x: 0,
              y: 0,
              duration: 0.55,
              ease: "elastic.out(1, 0.45)",
              overwrite: true,
            });
          };

          item.addEventListener("pointermove", move);
          item.addEventListener("pointerleave", reset);

          return () => {
            item.removeEventListener("pointermove", move);
            item.removeEventListener("pointerleave", reset);
          };
        });

        return () => {
          magneticCleanups.forEach((cleanup) => cleanup());
        };
      });

      motionQueries.add("(max-width: 980px)", () => {
        ScrollTrigger.create({
          trigger: "[data-work-experience]",
          start: "top bottom",
          end: "bottom top",
          onEnter: syncProjectFromViewport,
          onEnterBack: syncProjectFromViewport,
          onUpdate: syncProjectFromViewport,
        });

        page.querySelectorAll("[data-work-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.18, y: 64, scale: 0.975 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                once: true,
              },
            },
          );

          const image = card.querySelector(".homeCase__mobileMedia img");
          if (!image) return;

          gsap.fromTo(
            image,
            { scale: 1.08, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      });
    }, page);

    return () => {
      heroPointerCleanup();
      motionQueries?.revert();
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const visualItems = Array.from(
      page.querySelectorAll("[data-work-visual-item]"),
    );
    const activeItem = visualItems[activeProject];
    if (!activeItem) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      visualItems.forEach((item, index) => {
        if (index !== activeProject) {
          gsap.to(item, {
            autoAlpha: 0,
            duration: reduceMotion ? 0 : 0.28,
            overwrite: true,
          });
        }
      });

      gsap.fromTo(
        activeItem,
        { autoAlpha: 0, scale: reduceMotion ? 1 : 1.025 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: reduceMotion ? 0 : 0.62,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }, page);

    return () => context.revert();
  }, [activeProject]);

  const navigationItems = [
    { id: "work", label: "Work", number: "01" },
    { id: "services", label: "Services", number: "02" },
    { id: "studio", label: "Studio", number: "03" },
    { id: "contact", label: "Contact", number: "04" },
  ];

  return (
    <div className="thirty3-home" ref={pageRef}>
      <a className="homeSkipLink" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader
        variant="paper"
        navigationItems={navigationItems}
        ctaLabel="Start a Project"
        onStartProject={(event) =>
          openProjectModal(event, "", "Thirty3 homepage header")
        }
      />

      <main id="main-content">
        <HeroSection
          ref={heroRef}
          onStartProject={(event, projectType, source) =>
            openProjectModal(event, projectType, source)
          }
        />

        <section
          className="homeStatement"
          id="story"
          aria-labelledby="home-statement-title"
        >
          <div className="homeShell homeStatement__grid">
            <h2 id="home-statement-title" data-reveal>
              People meet the website before they meet the business.
            </h2>
            <div className="homeStatement__copy" data-reveal>
              <p>
                When the site makes people work to understand you, trust takes
                longer. We give the story a sharper shape so the right people
                know what matters and what to do next.
              </p>
              <a className="homeTextLink" href="#work">
                See the work <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="homeShell homeStatement__signals" data-reveal>
            <span>Clear story</span>
            <span>Credible presence</span>
            <span>Obvious next step</span>
          </div>
        </section>

        <section
          className="homeWork"
          id="work"
          aria-labelledby="home-work-title"
          data-work-section
        >
          <div className="homeShell homeSectionIntro">
            <h2 id="home-work-title" data-reveal>
              The work is the proof.
            </h2>
            <div data-reveal>
              <p>
                A few examples of businesses made easier to understand, trust,
                and choose.
              </p>
              <Link className="homeTextLink" to="/proof-of-work">
                View all work <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="homeWork__stage">
            <nav className="homeShell homeWork__tabs" aria-label="Select work">
              {PROJECTS.map((project, index) => (
                <button
                  type="button"
                  className={activeProject === index ? "is-active" : ""}
                  aria-pressed={activeProject === index}
                  onClick={() => selectProject(index, true)}
                  key={project.name}
                >
                  <span>{project.number}</span>
                  {project.name}
                </button>
              ))}
            </nav>

            <div
              className="homeShell homeWork__experience"
              data-work-experience
            >
              <div className="homeWork__visualColumn">
                <div className="homeWorkVisual" data-work-visual>
                  {PROJECTS.map((project, index) => (
                    <ProjectVisual
                      project={project}
                      index={index}
                      isActive={activeProject === index}
                      key={project.name}
                    />
                  ))}
                </div>

                <div className="homeWork__visualMeta" aria-live="polite">
                  <span>
                    {String(activeProject + 1).padStart(2, "0")} /{" "}
                    {String(PROJECTS.length).padStart(2, "0")}
                  </span>
                  <p>{PROJECTS[activeProject].type}</p>
                </div>
              </div>

              <div className="homeWork__list">
                {PROJECTS.map((project, index) => (
                  <ProjectStory
                    project={project}
                    index={index}
                    isActive={activeProject === index}
                    onSelect={() => selectProject(index)}
                    key={project.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <WaveDivider tone="black"  />

        <section
          className="homeServices"
          id="services"
          aria-labelledby="home-services-title"
        >
          <div className="homeShell homeServices__header">
            <h2 id="home-services-title" data-reveal>
              What should your website do next?
            </h2>
            <p data-reveal>
              Start with the pressure point. We will define the right scope
              around it.
            </p>
          </div>

          <div className="homeShell homeServiceList">
            {SERVICES.map((service) => (
              <article className="homeService" key={service.number} data-reveal>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <button
                  type="button"
                  onClick={(event) =>
                    openProjectModal(
                      event,
                      service.projectType,
                      `Thirty3 homepage ${service.title}`,
                    )
                  }
                >
                  Start here <ArrowIcon />
                </button>
              </article>
            ))}
          </div>
        </section>

        <WaveDivider tone="paper" />

        <section
          className="homeProcess"
          id="process"
          aria-labelledby="home-process-title"
        >
          <div className="homeShell homeSectionIntro">
            <h2 id="home-process-title" data-reveal>
              A clear path from first conversation to launch.
            </h2>
            <p data-reveal>
              One studio, one working relationship, and a project with no
              mystery between the steps.
            </p>
          </div>

          <div className="homeShell homeProcess__list">
            {PROCESS.map((step) => (
              <article key={step.number} data-reveal>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="homeStudio"
          id="studio"
          aria-labelledby="home-studio-title"
        >
          <div className="homeStudio__ghost" aria-hidden="true">
            THIRTY3
          </div>

          <div className="homeShell homeStudio__grid">
            <div data-reveal>
              <h2 id="home-studio-title">
                The person selling the work is the person building it.
              </h2>
            </div>

            <div className="homeStudio__copy" data-reveal>
              <p>
                Thirty3 is a Clarksville-based studio for businesses that want
                custom thinking, direct communication, and a website that does
                not disappear into a sea of templates.
              </p>
              <div className="homeStudio__facts">
                <span>Web strategy</span>
                <span>Design + development</span>
                <span>Brand support</span>
                <span>Launch guidance</span>
              </div>
              <Link
                className="homeTextLink homeTextLink--light"
                to="/field-notes"
              >
                Read Field Notes <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="homeProof" aria-labelledby="home-proof-title">
          <div className="homeShell homeSectionIntro">
            <h2 id="home-proof-title" data-reveal>
              Better work starts with a better working relationship.
            </h2>
            <div data-reveal>
              <p>Real feedback from the people behind the projects.</p>
              <a
                className="homeTextLink"
                href="https://www.google.com/search?q=Thirty3+Digital+Designs+Clarksville"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Google reviews <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="homeShell homeProof__quotes">
            {REVIEWS.map((review) => (
              <figure key={review.name} data-reveal>
                <div className="homeProof__stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span>{review.project}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
<WaveDivider tone="black"  />
        <section
          className="homeContact"
          id="contact"
          aria-labelledby="home-contact-title"
        >
          <div className="homeContact__ghost" aria-hidden="true">
            33
          </div>

          <div className="homeShell homeContact__inner" data-reveal>
            <h2 id="home-contact-title">
              Your business already grew.
              <span>Let’s make the website catch up.</span>
            </h2>
            <p>
              Tell me what is not working, what you are building, or what the
              website needs to do next. No polished brief required.
            </p>
            <button
              type="button"
              className="homeButton homeButton--yellow"
              data-magnetic
              onClick={(event) =>
                openProjectModal(event, "", "Thirty3 homepage final CTA")
              }
            >
              Start a Project <ArrowIcon />
            </button>
          </div>

          <footer
            className="homeShell homeFooter"
            aria-label="Thirty3 studio details"
          >
            <span>Thirty3 Digital Designs</span>
            <span>Clarksville · Nashville · Middle Tennessee</span>
            <span>Websites · Identity · Digital Design</span>
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
