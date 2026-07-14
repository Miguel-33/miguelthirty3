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
    layout: "feature",
  },
  {
    number: "02",
    name: "Joseph P. Day",
    type: "Public service and campaign website",
    summary:
      "A modern public-facing platform organized around credibility, accomplishments, and voter-focused information.",
    result: "A stronger digital campaign presence.",
    href: "/proof-of-work/joseph-p-day",
    image: "/josephPDayHero.png",
    alt: "Joseph P. Day campaign website designed by Thirty3 Digital Designs",
    accent: "#c9a862",
    layout: "wide",
  },
  {
    number: "03",
    name: "Gregory S. Chatman",
    type: "Author and speaker website",
    summary:
      "An editorial home for sermons, videos, and a focused message with room for the work to keep growing.",
    result: "A more intentional stage for the message.",
    href: "/proof-of-work/gregory-chatman",
    image: "/gregorySChatmanHero.png",
    alt: "Gregory S. Chatman website designed by Thirty3 Digital Designs",
    accent: "#770000",
    layout: "tall",
  },
  {
    number: "04",
    name: "Blayne’s Family Research",
    type: "Genealogy research website",
    summary:
      "A welcoming website that makes professional family-history research feel accessible, organized, and trustworthy.",
    result: "Research organized. Next steps clarified.",
    href: "/proof-of-work/blaynes-family-research",
    image: "/blaynesFamilyResearchHero.png",
    alt: "Blayne’s Family Research website designed by Thirty3 Digital Designs",
    accent: "#3d6770",
    layout: "offset",
  },
];

const PROOF_ITEMS = [
  { value: "10+", label: "websites completed" },
  { value: "Direct", label: "access to the designer" },
  { value: "Together", label: "strategy, design, and build" },
  { value: "Bilingual", label: "English and Spanish support" },
];

const SERVICES = [
  {
    number: "01",
    title: "Websites",
    projectType: "Website",
    className: "homeService--primary",
    text: "Custom websites and redesigns that make the business easier to understand, trust, and contact.",
    details: [
      "Strategy and content structure",
      "Responsive design and development",
      "WordPress or custom front end",
      "Launch guidance and ongoing support",
    ],
    cta: "Discuss a website",
  },
  {
    number: "02",
    title: "Brand and identity",
    projectType: "Brand and identity",
    className: "homeService--secondary",
    text: "Visual direction that helps the business feel recognizable, established, and consistent across every touchpoint.",
    details: ["Logos and identity systems", "Color and typography direction", "Practical brand applications"],
    cta: "Discuss your brand",
  },
  {
    number: "03",
    title: "Design support",
    projectType: "Design support",
    className: "homeService--tertiary",
    text: "Campaigns, flyers, social graphics, and digital materials designed to feel connected to the larger business.",
    details: ["Flyers and event materials", "Campaign graphics", "Social and digital assets"],
    cta: "Discuss design support",
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

function HeroProjectStage({ activeProject, activeIndex, onSelect }) {
  return (
    <div
      className="homeProjectStage"
      style={{ "--home-project-accent": activeProject.accent }}
      data-reveal
    >
      <div className="homeProjectStage__selector" aria-label="Featured website projects">
        <p>Selected work</p>

        <div className="homeProjectStage__buttons">
          {PROJECTS.map((project, index) => {
            const active = index === activeIndex;

            return (
              <button
                type="button"
                className={active ? "is-active" : ""}
                aria-pressed={active}
                onClick={() => onSelect(index)}
                onMouseEnter={() => onSelect(index)}
                onFocus={() => onSelect(index)}
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
          <picture key={activeProject.name}>
            {activeProject.mobileImage && (
              <source media="(max-width: 700px)" srcSet={activeProject.mobileImage} />
            )}
            <img
              className="homeProjectStage__mediaImage"
              src={activeProject.image}
              alt={activeProject.alt}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              decoding="async"
            />
          </picture>

          <span className="homeProjectStage__caseLink" aria-hidden="true">
            View case study <ArrowIcon />
          </span>
        </Link>

        <div className="homeProjectStage__caption">
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

function ProjectCard({ project }) {
  return (
    <article
      className={`homeWorkCard homeWorkCard--${project.layout}`}
      style={{ "--home-project-accent": project.accent }}
      data-reveal
    >
      <Link
        className="homeWorkCard__media"
        to={project.href}
        aria-label={`View the ${project.name} case study`}
      >
        <picture>
          {project.mobileImage && (
            <source media="(max-width: 700px)" srcSet={project.mobileImage} />
          )}
          <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
        </picture>
        <span aria-hidden="true">
          View project <ArrowIcon />
        </span>
      </Link>

      <div className="homeWorkCard__meta">
        <span>{project.number}</span>
        <div>
          <p>{project.type}</p>
          <h3>
            <Link to={project.href}>{project.name}</Link>
          </h3>
          <strong>{project.result}</strong>
        </div>
      </div>
    </article>
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

  return (
    <div className="thirty3-home" ref={pageRef}>
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
            <p className="homeEyebrow" data-reveal>
              Independent design studio · Clarksville, Tennessee
            </p>

            <h1 id="home-hero-title" data-reveal>
              <span>Look ready</span>
              <span className="homeHero__titleShift">before you say</span>
              <span className="homeHero__titleAccent">a word.</span>
            </h1>

            <div className="homeHero__lead" data-reveal>
              <p>
                Thirty3 designs and builds websites, identities, and digital pieces that help
                good businesses make a stronger first impression, explain the work clearly,
                and give people a confident next step.
              </p>

              <div className="homeHero__actions">
                <button
                  type="button"
                  className="homeButton homeButton--primary"
                  onClick={(event) =>
                    openProjectModal(event, "", "Thirty3 homepage hero")
                  }
                >
                  Start a Project <ArrowIcon />
                </button>

                <a className="homeTextLink" href="#work">
                  View Selected Work <ArrowIcon />
                </a>
              </div>

              <p className="homeHero__note">
                Bring the rough idea, the old website, or the project still sitting in your notes.
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
              <p>Selected work</p>
            </div>
            <div>
              <h2 id="home-work-title">Different businesses should not look interchangeable.</h2>
              <p>
                Each project gets its own voice, pace, and visual logic. The goal is not to
                decorate a template. It is to make the business easier to recognize and trust.
              </p>
              <Link className="homeTextLink" to="/proof-of-work">
                Explore all work <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="homeShell homeWork__grid">
            {PROJECTS.map((project) => (
              <ProjectCard project={project} key={project.name} />
            ))}
          </div>
        </section>

        <section className="homePositioning" aria-labelledby="home-positioning-title">
          <div className="homeShell homePositioning__inner">
            <p className="homeEyebrow homeEyebrow--light" data-reveal>
              Design changes perception
            </p>
            <h2 id="home-positioning-title" data-reveal>
              A stronger design changes how the whole business is perceived.
            </h2>
            <div className="homePositioning__footer" data-reveal>
              <p>
                Before someone calls, visits, books, or buys, they are already deciding what
                kind of business they believe they are looking at.
              </p>
              <span aria-hidden="true">33</span>
            </div>
          </div>
        </section>

        <section className="homeServices" id="services" aria-labelledby="home-services-title">
          <div className="homeShell homeSectionHeading" data-reveal>
            <div>
              <span>02</span>
              <p>Ways to work together</p>
            </div>
            <div>
              <h2 id="home-services-title">One studio. Three practical ways to move forward.</h2>
              <p>
                Websites lead the work, with identity and design support available when the
                larger business presence needs to move with them.
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
                Thirty3 is led by Miguel. Strategy, writing direction, visual design, and
                development stay connected instead of bouncing between departments.
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
              <span>Interactive PDF · About 2 minutes</span>
            </div>
          </div>
        </section>

        <section className="homeContact" id="contact" aria-labelledby="home-contact-title">
          <div className="homeShell homeContact__inner" data-reveal>
            <p className="homeEyebrow">The next impression</p>
            <h2 id="home-contact-title">
              Bring the business.
              <span>Let’s shape how people see it.</span>
            </h2>
            <p>
              A few project details are enough to begin. You do not need a polished brief or
              every answer figured out before reaching out.
            </p>

            <div className="homeContact__actions">
              <button
                type="button"
                className="homeButton homeButton--dark"
                onClick={(event) =>
                  openProjectModal(event, "", "Thirty3 homepage final CTA")
                }
              >
                Start a Project <ArrowIcon />
              </button>
              <Link className="homeTextLink" to="/proof-of-work">
                View All Work <ArrowIcon />
              </Link>
            </div>
          </div>

          <footer className="homeShell homeFooter" aria-label="Thirty3 studio details">
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
