import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import ProjectInquiryModal from "./components/ProjectInquiryModal";
import "./ClarksvilleWebDesign.css";

const pageNavigation = [
  { id: "selected-work", label: "Work", number: "01", href: "#selected-work" },
  { id: "services", label: "Services", number: "02", href: "#services" },
  { id: "process", label: "Process", number: "03", href: "#process" },
  { id: "faq", label: "FAQs", number: "04", href: "#faq" },
];

const heroProof = [
  {
    value: "10+",
    label: "completed websites",
  },
  {
    value: "Local",
    label: "Clarksville based",
  },
  {
    value: "Direct",
    label: "work with Miguel",
  },
  {
    value: "Flexible",
    label: "WordPress + custom front end",
  },
];

const websiteSignals = [
  {
    number: "01",
    title: "Facebook is doing most of the work",
    text: "Social media can help people discover you, but it should not have to explain your entire business or serve as your only home online.",
  },
  {
    number: "02",
    title: "The website no longer matches the business",
    text: "Your services, experience, and presentation have grown, while the website still reflects an earlier version of the company.",
  },
  {
    number: "03",
    title: "Visitors have to work too hard",
    text: "When services, next steps, or contact information are difficult to find, interested customers may leave with unanswered questions.",
  },
  {
    number: "04",
    title: "Mobile feels like an afterthought",
    text: "Many local customers will meet your business from a phone first. That experience should feel simple, polished, and intentional.",
  },
  {
    number: "05",
    title: "You hesitate before sharing the link",
    text: "A strong website should feel useful in a conversation, a proposal, an email signature, or anywhere someone asks what you do.",
  },
];

const services = [
  {
    number: "01",
    name: "New small-business websites",
    description:
      "A complete website shaped around your business, your customers, and the information people need before reaching out.",
    fit: "Best for a new business, a growing service company, or an organization ready for a professional home online.",
  },
  {
    number: "02",
    name: "Website redesigns",
    description:
      "A thoughtful rebuild that improves the structure, writing, visual direction, mobile experience, and path to contact.",
    fit: "Best when the current website feels dated, difficult to update, or disconnected from the quality of your work.",
  },
  {
    number: "03",
    name: "Focused landing pages",
    description:
      "A clear, campaign-specific page for a service, event, offer, launch, or audience that needs a more direct message.",
    fit: "Best when one important action needs its own page instead of getting buried inside a larger website.",
  },
];

const selectedProjects = [
  {
    name: "Isabella Transport",
    category: "Transportation website · Clarksville, Tennessee",
    image: "/isabellaTransportHero.png",
    alt: "Isabella Transport custom website homepage",
    href: "/proof-of-work/isabella-transport",
    size: "feature",
  },
  {
    name: "Joseph P. Day",
    category: "Public service and campaign website",
    image: "/josephPDayHero.png",
    alt: "Joseph P. Day website homepage",
    href: "/proof-of-work/joseph-p-day",
    size: "wide",
  },
  {
    name: "Gregory S. Chatman",
    category: "Author and speaker website",
    image: "/gregorySChatmanHero.png",
    alt: "Gregory S. Chatman website homepage",
    href: "/proof-of-work/gregory-chatman",
    size: "standard",
  },
  {
    name: "Blayne’s Family Research",
    category: "Genealogy research website",
    image: "/blaynesFamilyResearchHero.png",
    alt: "Blayne's Family Research website homepage",
    href: "/proof-of-work/blaynes-family-research",
    size: "standard",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell me about the business",
    text: "We start with what you do, who you serve, what is changing, and what the website needs to help people understand.",
  },
  {
    number: "02",
    title: "Shape the direction",
    text: "I organize the content, define the visual approach, and build a page structure around your goals instead of forcing a template to fit.",
  },
  {
    number: "03",
    title: "Design, build, and launch",
    text: "You review the work as it develops. I refine the details, prepare the responsive experience, and help move the finished site live.",
  },
];

const faqs = [
  {
    question: "Do you build websites for small businesses in Clarksville?",
    answer:
      "Yes. Thirty3 Digital Designs is based in Clarksville and works with small businesses, service providers, professionals, nonprofits, campaigns, and community organizations. The page structure and visual direction are shaped around the individual business.",
  },
  {
    question: "How much does a small-business website cost?",
    answer:
      "Pricing depends on the number of pages, content needs, features, and the condition of any existing website. After learning what the project needs, I provide a clear scope and price before the work begins.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "Timing depends on the size of the site, how quickly content is available, and the review process. A focused small-business website can move faster than a larger site with multiple services, integrations, or content sections. The expected timeline is defined with the project scope.",
  },
  {
    question: "Can you redesign my current website?",
    answer:
      "Yes. A redesign can keep useful content while improving the organization, visual presentation, mobile experience, and path customers take through the site.",
  },
  {
    question: "Can you help with website copy and content?",
    answer:
      "Yes. I can help organize your information, identify what each page needs to communicate, and refine the writing so it is easier for customers to understand. You do not need to arrive with every sentence finished.",
  },
  {
    question: "Do I need a website if I already use Facebook?",
    answer:
      "Facebook can be useful for conversation and updates, but a website gives your business a stable place to explain services, show work, answer questions, and guide people toward contacting you. The two can work together instead of competing.",
  },
  {
    question: "Do you also design logos and marketing materials?",
    answer:
      "Yes. Thirty3 Digital Designs also creates visual design work such as logos, flyers, business cards, and digital marketing materials when those pieces support the larger business presence.",
  },
  {
    question: "Do you only work with Clarksville businesses?",
    answer:
      "No. Clarksville is the primary local market, and I also work with clients in Nashville, across Middle Tennessee, and remotely when the project is a good fit.",
  },
];

const siteUrl = "https://miguelthirty3.com/";
const canonicalUrl = "https://miguelthirty3.com/clarksville-web-design";
const ogImageUrl = "https://miguelthirty3.com/thirty3-og-2026.png";
const pageTitle = "Clarksville Web Design for Small Businesses | Thirty3";
const pageDescription =
  "Custom Clarksville web design for small businesses ready to look established, explain their value clearly, and make inquiries easier. Start a project.";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  const created = !element;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  const previousAttributes = Object.fromEntries(
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

    Object.entries(previousAttributes).forEach(([key, value]) => {
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

function addJsonLd(id, data) {
  document.getElementById(id)?.remove();

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function Arrow({ external = false }) {
  return (
    <span className="cwd-arrow" aria-hidden="true">
      {external ? "↗" : "→"}
    </span>
  );
}

function ClarksvilleWebDesign() {
  const [openFaq, setOpenFaq] = useState(0);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const pageRef = useRef(null);
  const modalTriggerRef = useRef(null);

  const openProjectModal = (event, returnFocusTarget) => {
    modalTriggerRef.current = returnFocusTarget ?? event.currentTarget;
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;

    const restoreMetadata = [
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: pageDescription,
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
        content: pageTitle,
      }),
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: pageDescription,
      }),
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: canonicalUrl,
      }),
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: ogImageUrl,
      }),
      upsertMeta('meta[property="og:image:alt"]', {
        property: "og:image:alt",
        content: "Thirty3 Digital Designs website work",
      }),
      upsertMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
        content: "summary_large_image",
      }),
      upsertMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: pageTitle,
      }),
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: pageDescription,
      }),
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: ogImageUrl,
      }),
      upsertCanonical(canonicalUrl),
    ];

    const businessId = `${siteUrl}#business`;
    const websiteId = `${siteUrl}#website`;
    const webpageId = `${canonicalUrl}#webpage`;
    const serviceId = `${canonicalUrl}#service`;
    const breadcrumbId = `${canonicalUrl}#breadcrumb`;
    const faqId = `${canonicalUrl}#faq`;

    addJsonLd("cwd-page-schema", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": businessId,
          name: "Thirty3 Digital Designs",
          url: siteUrl,
          description:
            "Website strategy, design, development, and visual design for small businesses, professionals, campaigns, nonprofits, and organizations.",
          founder: {
            "@type": "Person",
            name: "Miguel De Jesus",
          },
          areaServed: [
            {
              "@type": "City",
              name: "Clarksville",
              containedInPlace: {
                "@type": "State",
                name: "Tennessee",
              },
            },
            {
              "@type": "City",
              name: "Nashville",
              containedInPlace: {
                "@type": "State",
                name: "Tennessee",
              },
            },
            {
              "@type": "AdministrativeArea",
              name: "Middle Tennessee",
            },
          ],
        },
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: siteUrl,
          name: "Thirty3 Digital Designs",
          publisher: {
            "@id": businessId,
          },
        },
        {
          "@type": "WebPage",
          "@id": webpageId,
          url: canonicalUrl,
          name: pageTitle,
          description: pageDescription,
          isPartOf: {
            "@id": websiteId,
          },
          about: {
            "@id": serviceId,
          },
          breadcrumb: {
            "@id": breadcrumbId,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: ogImageUrl,
          },
        },
        {
          "@type": "Service",
          "@id": serviceId,
          name: "Custom Web Design in Clarksville, Tennessee",
          serviceType: "Website design and development",
          url: canonicalUrl,
          description: pageDescription,
          provider: {
            "@id": businessId,
          },
          areaServed: [
            "Clarksville, Tennessee",
            "Montgomery County, Tennessee",
            "Nashville, Tennessee",
            "Middle Tennessee",
          ],
        },
        {
          "@type": "BreadcrumbList",
          "@id": breadcrumbId,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Clarksville Web Design",
              item: canonicalUrl,
            },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": faqId,
          url: `${canonicalUrl}#faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    });

    const root = pageRef.current;
    let observer = null;

    if (root) {
      root.classList.add("has-reveal");
      const revealItems = root.querySelectorAll("[data-reveal]");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -6%" },
        );

        revealItems.forEach((item) => observer.observe(item));
      }
    }

    return () => {
      observer?.disconnect();
      document.title = previousTitle;
      restoreMetadata.reverse().forEach((restore) => restore());
      document.getElementById("cwd-page-schema")?.remove();
    };
  }, []);

  return (
    <div className="cwd-page" ref={pageRef}>
      <a className="cwd-skip-link" href="#main-content">
        Skip to main content
      </a>

      <main id="main-content">
        <section className="cwd-hero" aria-labelledby="cwd-hero-title">
          <div className="cwd-hero__header">
            <SiteHeader
              embedded
              variant="editorial"
              navigationItems={pageNavigation}
              showFieldNotes={false}
              onStartProject={openProjectModal}
              ctaLabel="Start a Website Project"
              menuFooterPrimary="Clarksville / Middle Tennessee"
              menuFooterSecondary="Strategy / Design / Development"
            />
          </div>

          <div className="cwd-shell cwd-hero__grid">
            <p className="cwd-hero__eyebrow" data-reveal>
              Clarksville web design · Serving Middle Tennessee
            </p>

            <h1 id="cwd-hero-title" data-reveal>
              Make the website match
              <span>the business you’ve built.</span>
            </h1>

            <div className="cwd-hero__copy" data-reveal>
              <p>
                Custom websites for businesses that are doing serious work but still look
                smaller, less clear, or less established online than they really are.
              </p>

              <div className="cwd-hero__actions">
                <button
                  type="button"
                  className="cwd-button cwd-button--yellow"
                  onClick={openProjectModal}
                  aria-haspopup="dialog"
                >
                  Start a Website Project <Arrow />
                </button>
                <Link className="cwd-text-link" to="/proof-of-work">
                  View Website Work <Arrow />
                </Link>
              </div>

              <p className="cwd-hero__action-note">
                Start with the business and what needs to change. You do not need a finished brief.
              </p>
            </div>

            <article className="cwd-hero-project" data-reveal>
              <Link
                className="cwd-hero-project__image"
                to="/proof-of-work/isabella-transport"
                aria-label="View the Isabella Transport website case study"
              >
                <picture>
                  <source
                    media="(max-width: 700px)"
                    srcSet="/isabellaTransportHeroMobile.png"
                  />
                  <img
                    src="/isabellaTransportHero.png"
                    alt="Isabella Transport custom website designed by Thirty3 Digital Designs"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
                <span className="cwd-hero-project__index" aria-hidden="true">
                  Project 01
                </span>
                <span className="cwd-hero-project__view" aria-hidden="true">
                  View case study <Arrow />
                </span>
              </Link>

              <div className="cwd-hero-project__caption">
                <div>
                  <p>Featured local project</p>
                  <h2>Isabella Transport</h2>
                </div>
                <dl>
                  <div>
                    <dt>Location</dt>
                    <dd>Clarksville, Tennessee</dd>
                  </div>
                  <div>
                    <dt>Work</dt>
                    <dd>Strategy, design, development</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>

          <div className="cwd-shell cwd-hero__proof" aria-label="Thirty3 website design proof" data-reveal>
            {heroProof.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="cwd-hero__transition">
            <div className="cwd-shell">
              <p data-reveal>
                The problem is rarely the business. It is the gap between the business and
                what people see online.
              </p>
              <span aria-hidden="true">↓</span>
            </div>
          </div>
        </section>

        <section className="cwd-recognition" aria-labelledby="cwd-recognition-title">
          <div className="cwd-shell cwd-recognition__grid">
            <div className="cwd-section-lead" data-reveal>
              <span className="cwd-section-number">01</span>
              <p className="cwd-section-label">A familiar turning point</p>
              <h2 id="cwd-recognition-title">Your business may have outgrown its website.</h2>
              <p>
                That does not mean everything is broken. It usually means the business has
                moved forward and the online experience has not caught up yet.
              </p>
              <Link className="cwd-text-link" to="/field-notes">
                Read more website thinking <Arrow />
              </Link>
            </div>

            <div className="cwd-signal-list" data-reveal>
              {websiteSignals.map((signal) => (
                <article className="cwd-signal" key={signal.number}>
                  <span>{signal.number}</span>
                  <div>
                    <h3>{signal.title}</h3>
                    <p>{signal.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cwd-case-study" aria-labelledby="cwd-case-study-title">
          <div className="cwd-shell cwd-case-study__heading" data-reveal>
            <div>
              <span className="cwd-section-number cwd-section-number--yellow">02</span>
              <p className="cwd-section-label">Featured Clarksville project</p>
            </div>
            <h2 id="cwd-case-study-title">
              Isabella Transport needed more than a page. It needed a clear route forward.
            </h2>
          </div>

          <div className="cwd-case-study__image-wrap" data-reveal>
            <div className="cwd-shell cwd-case-study__image-shell">
              <img
                src="/isabellaTransportHero.png"
                alt="Isabella Transport website homepage with transportation services and contact options"
                loading="lazy"
                decoding="async"
              />
              <div className="cwd-case-study__caption">
                <span>Transportation</span>
                <span>Clarksville, Tennessee</span>
                <span>Website strategy, design, and development</span>
              </div>
            </div>
          </div>

          <div className="cwd-shell cwd-case-study__details" data-reveal>
            <div className="cwd-case-study__intro">
              <p className="cwd-overline">The assignment</p>
              <p>
                Present Isabella Transport as organized, dependable, and easy to contact,
                while helping visitors quickly understand what the company provides and where
                it operates.
              </p>
            </div>

            <div className="cwd-case-study__columns">
              <div>
                <span>01 / Business</span>
                <h3>A local transportation company</h3>
                <p>
                  The site needed to introduce the company with enough confidence and detail
                  for a first-time visitor to keep moving.
                </p>
              </div>
              <div>
                <span>02 / Approach</span>
                <h3>Direct information, strong visual pacing</h3>
                <p>
                  Services, positioning, and contact points were organized into a focused
                  journey instead of disconnected sections.
                </p>
              </div>
              <div>
                <span>03 / Customer path</span>
                <h3>Understand, trust, contact</h3>
                <p>
                  Visitors can identify the service, learn why the business is relevant, and
                  move toward an inquiry without searching for the next step.
                </p>
              </div>
            </div>

            <div className="cwd-case-study__actions">
              <Link className="cwd-button cwd-button--dark" to="/proof-of-work/isabella-transport">
                View Case Study <Arrow />
              </Link>
              <a
                className="cwd-button cwd-button--line"
                href="https://isabellatransport.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Live Website <Arrow external />
              </a>
            </div>
          </div>
        </section>

        <section className="cwd-services" id="services" aria-labelledby="cwd-services-title">
          <div className="cwd-shell">
            <div className="cwd-services__intro" data-reveal>
              <div>
                <span className="cwd-section-number">03</span>
                <p className="cwd-section-label">Ways to work together</p>
              </div>
              <div>
                <h2 id="cwd-services-title">The right website depends on what needs to change.</h2>
                <p>
                  Each project begins with the business, not a preset page count or a recycled
                  layout. These are the three most common starting points.
                </p>
              </div>
            </div>

            <div className="cwd-service-list" data-reveal>
              {services.map((service) => (
                <article className="cwd-service-row" key={service.number}>
                  <span className="cwd-service-row__number">{service.number}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p className="cwd-service-row__fit">{service.fit}</p>
                </article>
              ))}
            </div>

            <div className="cwd-services__footer" data-reveal>
              <p>
                Not sure which one fits? Start with what is happening in the business. I will
                help define the right scope from there.
              </p>
              <button
                type="button"
                className="cwd-button cwd-button--yellow"
                onClick={openProjectModal}
                aria-haspopup="dialog"
              >
                Tell Me About Your Project <Arrow />
              </button>
            </div>
          </div>
        </section>

        <section className="cwd-about" aria-labelledby="cwd-about-title">
          <div className="cwd-shell cwd-about__grid">
            <div className="cwd-about__rail" aria-hidden="true">
              <span>THIRTY3 / CLARKSVILLE</span>
            </div>

            <div className="cwd-about__statement" data-reveal>
              <p className="cwd-section-label cwd-section-label--light">The person behind the work</p>
              <h2 id="cwd-about-title">You will work directly with me.</h2>
              <p className="cwd-about__lead">
                I’m Miguel, the designer and developer behind Thirty3 Digital Designs. I’m
                based in Clarksville and build websites for businesses and organizations that
                want their online presence to reflect the quality of the work they already do.
              </p>
              <div className="cwd-about__name" aria-label="Miguel, Thirty3 Digital Designs">
                <span>Miguel</span>
                <small>Designer + developer</small>
              </div>
            </div>

            <div className="cwd-about__details" data-reveal>
              <p>
                My work combines visual design, content structure, website planning, and
                front-end development. The design and the customer journey are considered
                together from the beginning.
              </p>
              <p>
                I work with small businesses, professionals, campaigns, nonprofits, and
                community organizations. The process stays direct, collaborative, and shaped
                around the individual business rather than a standard template.
              </p>

              <div className="cwd-about__principles">
                <div>
                  <span>01</span>
                  <p>Direct communication from the person designing the site</p>
                </div>
                <div>
                  <span>02</span>
                  <p>Page structures built around real customer questions</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Visual direction that belongs to the business, not the template</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="cwd-selected-work"
          id="selected-work"
          aria-labelledby="cwd-selected-work-title"
        >
          <div className="cwd-shell cwd-selected-work__header" data-reveal>
            <div>
              <span className="cwd-section-number">04</span>
              <p className="cwd-section-label">Selected website work</p>
            </div>
            <div>
              <h2 id="cwd-selected-work-title">Different businesses should not look interchangeable.</h2>
              <Link className="cwd-text-link" to="/proof-of-work">
                Explore all work <Arrow />
              </Link>
            </div>
          </div>

          <div className="cwd-shell cwd-work-grid">
            {selectedProjects.map((project) => (
              <article
                className={`cwd-work-item cwd-work-item--${project.size}`}
                key={project.name}
                data-reveal
              >
                <Link
                  className="cwd-work-item__image"
                  to={project.href}
                  aria-label={`View ${project.name} case study`}
                >
                  <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                  <span className="cwd-work-item__view" aria-hidden="true">
                    View project <Arrow />
                  </span>
                </Link>
                <div className="cwd-work-item__meta">
                  <h3>
                    <Link to={project.href}>{project.name}</Link>
                  </h3>
                  <p>{project.category}</p>
                  <Link className="cwd-work-item__link" to={project.href}>
                    Case study <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cwd-process" id="process" aria-labelledby="cwd-process-title">
          <div className="cwd-shell">
            <div className="cwd-process__heading" data-reveal>
              <div>
                <span className="cwd-section-number">05</span>
                <p className="cwd-section-label">A simple process</p>
              </div>
              <div>
                <h2 id="cwd-process-title">You do not need to know website language to get started.</h2>
                <p>
                  Bring the business knowledge. I will help turn it into a useful website plan
                  and guide the project from first conversation through launch.
                </p>
              </div>
            </div>

            <div className="cwd-process__steps" data-reveal>
              {processSteps.map((step) => (
                <article className="cwd-process-step" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cwd-faq" id="faq" aria-labelledby="cwd-faq-title">
          <div className="cwd-shell cwd-faq__grid">
            <div className="cwd-faq__intro" data-reveal>
              <span className="cwd-section-number cwd-section-number--yellow">06</span>
              <p className="cwd-section-label">Before you reach out</p>
              <h2 id="cwd-faq-title">Common questions, answered plainly.</h2>
              <p>
                You do not need a finished brief. A general idea of what is not working and
                what you want the website to help with is enough to begin.
              </p>
              <button
                type="button"
                className="cwd-text-link"
                onClick={openProjectModal}
                aria-haspopup="dialog"
              >
                Start with your questions <Arrow />
              </button>
            </div>

            <div className="cwd-accordion" data-reveal>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const answerId = `cwd-faq-answer-${index}`;

                return (
                  <div
                    className={`cwd-accordion__item ${isOpen ? "is-open" : ""}`}
                    key={faq.question}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      >
                        <span>{faq.question}</span>
                        <span className="cwd-accordion__symbol" aria-hidden="true">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div className="cwd-accordion__answer" id={answerId} hidden={!isOpen}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="cwd-final-cta" aria-labelledby="cwd-final-cta-title">
          <div className="cwd-shell cwd-final-cta__inner" data-reveal>
            <div className="cwd-final-cta__marker" aria-hidden="true">
              33
            </div>
            <div>
              <p className="cwd-section-label">A better website starts with the business</p>
              <h2 id="cwd-final-cta-title">Ready for a website you feel good sending people to?</h2>
            </div>
            <div>
              <p>
                Tell me about the business, the current website, or the idea you have been
                putting off. Reaching out starts a conversation. It does not commit you to a
                project before the scope makes sense.
              </p>
              <div className="cwd-final-cta__actions">
                <button
                  type="button"
                  className="cwd-button cwd-button--yellow"
                  onClick={openProjectModal}
                  aria-haspopup="dialog"
                >
                  Start a Website Project <Arrow />
                </button>
                <Link className="cwd-text-link cwd-text-link--light" to="/proof-of-work">
                  View the work first <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="cwd-footer">
        <div className="cwd-shell cwd-footer__inner">
          <p>Thirty3 Digital Designs</p>
          <p>Clarksville, Tennessee · Serving Middle Tennessee</p>
          <Link to="/">miguelthirty3.com</Link>
        </div>
      </footer>

      <ProjectInquiryModal
        open={projectModalOpen}
        onClose={closeProjectModal}
        returnFocusRef={modalTriggerRef}
        source="Clarksville web design page popup"
        initialProjectType="Website"
      />
    </div>
  );
}

export default ClarksvilleWebDesign;
