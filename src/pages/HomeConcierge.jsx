import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ArrowIcon from "../components/ArrowIcon.jsx";
import ProjectInquiryModal from "../components/ProjectInquiryModal.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import {
  featuredWork,
  labColors,
  labShapes,
  labWords,
  projectChoices,
  quickDesignPackages,
  websitePackages,
} from "../data/homeConcierge.js";
import "../styles/home-concierge.css";

const HOME_TITLE =
  "Miguel De Jesus | Websites, Flyers & Digital Design in Clarksville";
const HOME_DESCRIPTION =
  "Websites, flyers, invitations, school materials, QR forms, logos, and digital design by Miguel De Jesus of Thirty3 Digital Designs in Clarksville, Tennessee.";
const HOME_URL = "https://miguelthirty3.com/";

const navigationItems = [
  { id: "project-picker", label: "Pick a project", number: "01" },
  { id: "pricing", label: "Prices", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "creative-corner", label: "Creative corner", number: "04" },
];

const badgeShapeMarkup = {
  burst:
    '<polygon points="300,80 340,154 425,118 408,202 495,215 426,270 480,340 392,338 385,425 318,370 265,442 235,358 150,388 172,302 84,282 158,232 108,158 195,165 208,78" />',
  circle: '<circle cx="290" cy="260" r="178" />',
  shield:
    '<path d="M290 72 458 132v126c0 108-67 189-168 234-101-45-168-126-168-234V132Z" />',
};

function SparkMascot({ found = false }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="m50 4 10 28 28-10-14 26 24 16-30 4 3 30-21-21-21 21 3-30-30-4 24-16-14-26 28 10Z"
        fill="currentColor"
      />
      <circle cx="38" cy="48" r="4" fill="#17191b" />
      <circle cx="62" cy="48" r="4" fill="#17191b" />
      <path
        d={found ? "M36 61c8 10 20 10 28 0" : "M38 64c7-5 17-5 24 0"}
        fill="none"
        stroke="#17191b"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

function SparkFinder({ id, label, found, onFind, className = "" }) {
  return (
    <button
      type="button"
      className={`conciergeSpark ${found ? "is-found" : ""} ${className}`}
      aria-label={found ? `${label} found` : `Find the hidden spark near ${label}`}
      aria-pressed={found}
      onClick={() => onFind(id)}
    >
      <SparkMascot found={found} />
      <span>{found ? "Found!" : "Psst"}</span>
    </button>
  );
}

function SectionHeading({ label, title, text, inverse = false }) {
  return (
    <div className={`conciergeSectionHeading ${inverse ? "is-inverse" : ""}`}>
      <p>{label}</p>
      <h2>{title}</h2>
      {text && <div>{text}</div>}
    </div>
  );
}

function ProjectChoiceCard({
  choice,
  active,
  onToggle,
  onChoose,
  showSpark,
  sparkFound,
  onFindSpark,
}) {
  const detailsId = `project-choice-${choice.id}`;

  return (
    <article
      className={`projectChoice projectChoice--${choice.tone} projectChoice--${choice.size} ${active ? "is-active" : ""}`}
      style={{ "--choice-index": Number(choice.number) }}
    >
      <button
        type="button"
        className="projectChoice__toggle"
        aria-expanded={active}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className="projectChoice__number">{choice.number}</span>
        <span className="projectChoice__label">{choice.label}</span>
        <strong>{choice.title}</strong>
        <span className="projectChoice__summary">{choice.summary}</span>
        <span className="projectChoice__price">{choice.price}</span>
        <span className="projectChoice__expand" aria-hidden="true">
          {active ? "Close" : "Open"}
          <i>{active ? "−" : "+"}</i>
        </span>
      </button>

      {active && (
        <div className="projectChoice__details" id={detailsId}>
          <div className="projectChoice__packages">
            {choice.packages.map((item) => (
              <div key={item.name}>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </div>

          <ul>
            {choice.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <button
            type="button"
            className="conciergeButton conciergeButton--ink"
            onClick={onChoose}
          >
            Choose this project <ArrowIcon />
          </button>
        </div>
      )}

      {showSpark && (
        <SparkFinder
          id="project"
          label="the school project card"
          found={sparkFound}
          onFind={onFindSpark}
          className="projectChoice__spark"
        />
      )}
    </article>
  );
}

function BadgePreview({ shape, color, word }) {
  return (
    <svg
      className="creativeLab__badge"
      viewBox="0 0 580 520"
      role="img"
      aria-label={`${word} badge in ${color.name}`}
    >
      <rect width="580" height="520" rx="48" fill="#f4f5f3" />
      <g fill={color.value}>
        {shape === "burst" && (
          <polygon points="300,80 340,154 425,118 408,202 495,215 426,270 480,340 392,338 385,425 318,370 265,442 235,358 150,388 172,302 84,282 158,232 108,158 195,165 208,78" />
        )}
        {shape === "circle" && <circle cx="290" cy="260" r="178" />}
        {shape === "shield" && (
          <path d="M290 72 458 132v126c0 108-67 189-168 234-101-45-168-126-168-234V132Z" />
        )}
      </g>
      <text
        x="290"
        y="250"
        fill="#17191b"
        fontFamily="Arial, sans-serif"
        fontSize={word.length > 9 ? "42" : "54"}
        fontWeight="900"
        textAnchor="middle"
      >
        {word}
      </text>
      <text
        x="290"
        y="296"
        fill="#17191b"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="4"
        textAnchor="middle"
      >
        MADE IN THE THIRTY3 LAB
      </text>
    </svg>
  );
}

function CreativeLab({ bonusUnlocked }) {
  const [color, setColor] = useState(labColors[0]);
  const [shape, setShape] = useState(labShapes[0].id);
  const [word, setWord] = useState(labWords[0]);

  const availableWords = useMemo(
    () => (bonusUnlocked ? [...labWords, "FOUND ALL 3"] : labWords),
    [bonusUnlocked],
  );

  const downloadBadge = () => {
    const shapeMarkup = badgeShapeMarkup[shape];
    const fontSize = word.length > 9 ? 42 : 54;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1080" viewBox="0 0 580 520"><rect width="580" height="520" rx="48" fill="#f4f5f3"/><g fill="${color.value}">${shapeMarkup}</g><text x="290" y="250" fill="#17191b" font-family="Arial,sans-serif" font-size="${fontSize}" font-weight="900" text-anchor="middle">${word}</text><text x="290" y="296" fill="#17191b" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="4" text-anchor="middle">MADE IN THE THIRTY3 LAB</text></svg>`;
    const url = URL.createObjectURL(
      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "thirty3-creative-badge.svg";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  return (
    <div className="creativeLab">
      <div className="creativeLab__controls">
        <div>
          <p className="creativeLab__step">1. Pick a shape</p>
          <div className="creativeLab__choices" aria-label="Badge shape">
            {labShapes.map((item) => (
              <button
                type="button"
                aria-pressed={shape === item.id}
                onClick={() => setShape(item.id)}
                key={item.id}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="creativeLab__step">2. Pick a color</p>
          <div className="creativeLab__swatches" aria-label="Badge color">
            {labColors.map((item) => (
              <button
                type="button"
                className={color.name === item.name ? "is-active" : ""}
                style={{ "--swatch": item.value }}
                aria-label={item.name}
                aria-pressed={color.name === item.name}
                onClick={() => setColor(item)}
                key={item.name}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="creativeLab__step">3. Pick your message</p>
          <div className="creativeLab__choices" aria-label="Badge message">
            {availableWords.map((item) => (
              <button
                type="button"
                aria-pressed={word === item}
                onClick={() => setWord(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="conciergeButton conciergeButton--yellow"
          onClick={downloadBadge}
        >
          Download my badge <ArrowIcon />
        </button>
      </div>

      <div className="creativeLab__preview">
        <BadgePreview shape={shape} color={color} word={word} />
        <p>Made in your browser. Nothing is uploaded or saved.</p>
      </div>
    </div>
  );
}

export default function HomeConcierge() {
  const pageRef = useRef(null);
  const modalTriggerRef = useRef(null);
  const [activeChoice, setActiveChoice] = useState("");
  const [foundSparks, setFoundSparks] = useState(() => new Set());
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalProjectType, setModalProjectType] = useState("");
  const [modalSource, setModalSource] = useState("MiguelThirty3 homepage");
  const [modalInstance, setModalInstance] = useState(0);

  const foundCount = foundSparks.size;
  const bonusUnlocked = foundCount === 3;

  const openProjectModal = (
    event,
    projectType = "",
    source = "MiguelThirty3 homepage",
    returnFocusTarget = null,
  ) => {
    modalTriggerRef.current = returnFocusTarget ?? event.currentTarget;
    setModalProjectType(projectType);
    setModalSource(source);
    setModalInstance((current) => current + 1);
    setProjectModalOpen(true);
  };

  const findSpark = (id) => {
    setFoundSparks((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const revealItems = Array.from(page.querySelectorAll("[data-concierge-reveal]"));
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
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
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeChoice) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveChoice("");
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeChoice]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Thirty3 Digital Designs",
    alternateName: "MiguelThirty3",
    url: HOME_URL,
    description: HOME_DESCRIPTION,
    telephone: "+1-615-440-6033",
    email: "hello@miguelthirty3.com",
    founder: {
      "@type": "Person",
      name: "Miguel De Jesus",
      jobTitle: "Web Designer and Developer",
    },
    areaServed: ["Clarksville, Tennessee", "Nashville, Tennessee", "Middle Tennessee"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website and digital design packages",
      itemListElement: [...websitePackages, ...quickDesignPackages].map(
        (item) => ({
          "@type": "Offer",
          priceCurrency: "USD",
          price: item.price.replace(/[$,]/g, ""),
          itemOffered: { "@type": "Service", name: item.name },
        }),
      ),
    },
  };

  return (
    <div className="conciergeHome" ref={pageRef}>
      <Helmet>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta name="theme-color" content="#f4d40a" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:url" content={HOME_URL} />
        <link rel="canonical" href={HOME_URL} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <a className="conciergeSkipLink" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader
        variant="paper"
        navigationItems={navigationItems}
        showFieldNotes={false}
        ctaLabel="Start here"
        menuFooterPrimary="Clarksville, Tennessee"
        menuFooterSecondary="Websites / Quick design / School + family"
        logoAriaLabel="MiguelThirty3 homepage"
        logoMetaPrimary="Web + everyday design"
        logoMetaSecondary="Made by Miguel"
        onStartProject={(event, returnFocusTarget) =>
          openProjectModal(
            event,
            "",
            "MiguelThirty3 header",
            returnFocusTarget,
          )
        }
      />

      <main id="main-content">
        <section className="conciergeHero" aria-labelledby="concierge-hero-title">
          <div className="conciergeShell conciergeHero__grid">
            <div className="conciergeHero__copy" data-concierge-reveal>
              <div className="conciergeSearchPill" aria-label="Thirty3 Digital Designs">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6" />
                  <path d="m16 16 5 5" />
                </svg>
                <span>Thirty3 Digital Designs</span>
              </div>

              <p className="conciergeHero__hello">Hi, I’m Miguel.</p>
              <h1 id="concierge-hero-title">
                What are we
                <span>making today?</span>
              </h1>
              <p className="conciergeHero__intro">
                I’m a Clarksville-based web designer, developer, proud dad, and
                owner of Thirty3 Digital Designs. I create websites and everyday
                design pieces for businesses, schools, and families.
              </p>

              <div className="conciergeHero__actions">
                <a className="conciergeButton conciergeButton--ink" href="#project-picker">
                  Pick a project <ArrowIcon />
                </a>
                <a className="conciergeTextLink" href="#pricing">
                  See clear prices <ArrowIcon />
                </a>
              </div>

              <div className="conciergeHero__facts" aria-label="Studio facts">
                <span>Clarksville, TN</span>
                <span>Web + design</span>
                <span>Real person, no agency maze</span>
              </div>
            </div>

            <div className="conciergeHero__board" data-concierge-reveal>
              <div className="conciergeHero__boardTop">
                <span>Today’s project menu</span>
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </div>
              <div className="conciergeHero__miniGrid">
                <a href="#project-picker" className="is-yellow">
                  <span>Website</span>
                  <strong>$750+</strong>
                </a>
                <a href="#project-picker" className="is-blue">
                  <span>Flyer</span>
                  <strong>$35</strong>
                </a>
                <a href="#project-picker" className="is-coral">
                  <span>Party set</span>
                  <strong>$45</strong>
                </a>
                <a href="#project-picker" className="is-mint">
                  <span>School kit</span>
                  <strong>$95</strong>
                </a>
              </div>
              <p>Creative designs that help businesses grow and moments stand out.</p>
              <SparkFinder
                id="hero"
                label="the project menu"
                found={foundSparks.has("hero")}
                onFind={findSpark}
                className="conciergeHero__spark"
              />
            </div>
          </div>

          <div className="conciergeTicker" aria-hidden="true">
            <div>
              <span>WEBSITES</span><b>✦</b><span>FLYERS</span><b>✦</b>
              <span>INVITATIONS</span><b>✦</b><span>SCHOOL MATERIALS</span><b>✦</b>
              <span>QR FORMS</span><b>✦</b><span>LOGOS</span><b>✦</b>
              <span>WEBSITES</span><b>✦</b><span>FLYERS</span><b>✦</b>
              <span>INVITATIONS</span><b>✦</b><span>SCHOOL MATERIALS</span><b>✦</b>
              <span>WEBSITES</span><b>✦</b><span>FLYERS</span><b>✦</b>
              <span>INVITATIONS</span><b>✦</b><span>SCHOOL MATERIALS</span><b>✦</b>
              <span>QR FORMS</span><b>✦</b><span>LOGOS</span><b>✦</b>
              <span>WEBSITES</span><b>✦</b><span>FLYERS</span><b>✦</b>
              <span>INVITATIONS</span><b>✦</b><span>SCHOOL MATERIALS</span><b>✦</b>
              <span>WEBSITES</span><b>✦</b><span>FLYERS</span><b>✦</b>
              <span>INVITATIONS</span><b>✦</b><span>SCHOOL MATERIALS</span><b>✦</b>
              <span>QR FORMS</span><b>✦</b><span>LOGOS</span><b>✦</b>
              <span>WEBSITES</span><b>✦</b><span>FLYERS</span><b>✦</b>
              <span>INVITATIONS</span><b>✦</b><span>SCHOOL MATERIALS</span><b>✦</b>
            </div>
          </div>
        </section>

        <section
          className="projectPicker"
          id="project-picker"
          aria-labelledby="project-picker-title"
        >
          <div className="conciergeShell">
            <SectionHeading
              label="Start with what you need"
              title="Choose a tile. See the price. Skip the guesswork."
              text={
                <p>
                  Tap any project to see exactly what is included. If your idea
                  does not fit neatly into a box, that last tile is there for a reason.
                </p>
              }
            />

            <div className="projectBento" data-concierge-reveal>
              {projectChoices.map((choice) => (
                <ProjectChoiceCard
                  choice={choice}
                  active={activeChoice === choice.id}
                  onToggle={() =>
                    setActiveChoice((current) =>
                      current === choice.id ? "" : choice.id,
                    )
                  }
                  onChoose={(event) =>
                    openProjectModal(
                      event,
                      choice.projectType,
                      `MiguelThirty3 project picker: ${choice.title}`,
                    )
                  }
                  showSpark={choice.id === "school"}
                  sparkFound={foundSparks.has("project")}
                  onFindSpark={findSpark}
                  key={choice.id}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="conciergePricing" id="pricing" aria-labelledby="pricing-title">
          <div className="conciergeShell">
            <SectionHeading
              label="Clear packages"
              title="Know the number before we start."
              text={<p>No mystery estimates for clearly defined work. Bigger or more custom projects receive an exact scope first.</p>}
            />

            <div className="websitePricing" data-concierge-reveal>
              {websitePackages.map((item) => (
                <article className={item.featured ? "is-featured" : ""} key={item.name}>
                  {item.featured && <span className="websitePricing__flag">Most popular</span>}
                  <h3>{item.name}</h3>
                  <p className="websitePricing__price">{item.price}</p>
                  <p className="websitePricing__best">{item.bestFor}</p>
                  <ul>
                    {item.includes.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                  <button
                    type="button"
                    onClick={(event) =>
                      openProjectModal(event, "Website", `Pricing: ${item.name}`)
                    }
                  >
                    Choose {item.name} <ArrowIcon />
                  </button>
                </article>
              ))}
            </div>

            <div className="quickPricing" data-concierge-reveal>
              <div className="quickPricing__intro">
                <p>Need it sooner and smaller?</p>
                <h3>Everyday design menu</h3>
                <span>Design-only prices. Printing and third-party fees are separate.</span>
              </div>
              <div className="quickPricing__list">
                {quickDesignPackages.map((item) => (
                  <button
                    type="button"
                    onClick={(event) =>
                      openProjectModal(
                        event,
                        item.name === "Starter Logo" ? "Logo design" : "Flyer, invitation, or quick design",
                        `Quick design pricing: ${item.name}`,
                      )
                    }
                    key={item.name}
                  >
                    <span><strong>{item.name}</strong><small>{item.note}</small></span>
                    <b>{item.price}</b>
                    <ArrowIcon />
                  </button>
                ))}
              </div>
            </div>

            <div className="pricingNotes" data-concierge-reveal>
              <span>Quick designs: 3-5 business days</span>
              <span>Rush service: +35%</span>
              <span>Additional revisions: $25 per round</span>
              <span>Websites begin with a 50% deposit</span>
            </div>
          </div>
        </section>

        <section className="conciergeWork" id="work" aria-labelledby="work-title">
          <div className="conciergeShell">
            <SectionHeading
              label="A little proof"
              title="Real work for real people."
              text={
                <p>
                  This is the quick introduction. The deeper case studies live on the
                  <a href="https://thirty3digitaldesigns.com"> Thirty3 studio site</a>.
                </p>
              }
            />

            <div className="conciergeWork__grid">
              {featuredWork.map((project, index) => (
                <Link
                  className={index === 0 ? "is-featured" : ""}
                  to={project.href}
                  data-concierge-reveal
                  key={project.name}
                >
                  <div className="conciergeWork__image">
                    <img src={project.image} alt={`${project.name} website`} loading="lazy" />
                  </div>
                  <span>{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.result}</p>
                  <b>View project <ArrowIcon /></b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="conciergeAbout" id="about" aria-labelledby="about-title">
          <div className="conciergeShell conciergeAbout__grid">
            <div className="conciergeAbout__mark" data-concierge-reveal>
              <span>M</span>
              <b>/33</b>
              <p>Designer. Developer. Dad.</p>
              <SparkFinder
                id="about"
                label="Miguel’s introduction"
                found={foundSparks.has("about")}
                onFind={findSpark}
                className="conciergeAbout__spark"
              />
            </div>

            <div className="conciergeAbout__copy" data-concierge-reveal>
              <p className="conciergeAbout__label">A quick introduction</p>
              <h2 id="about-title">You work directly with the person making the thing.</h2>
              <p>
                I’m Miguel De Jesus, a Clarksville-based web designer and developer,
                owner of Thirty3 Digital Designs, and a dad who understands that busy
                families, teachers, and business owners do not need one more confusing process.
              </p>
              <p>
                Bring me the idea, the information, and even the messy notes. I’ll help
                shape them into something clear, useful, and ready to share.
              </p>
              <div className="conciergeAbout__links">
                <a href="https://thirty3digitaldesigns.com">
                  Visit the studio site <ArrowIcon />
                </a>
                <a href="mailto:hello@miguelthirty3.com">
                  Email Miguel <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="creativeCorner"
          id="creative-corner"
          aria-labelledby="creative-corner-title"
        >
          <div className="conciergeShell">
            <SectionHeading
              inverse
              label="For curious kids and grown-ups"
              title="Welcome to the Creative Corner."
              text={
                <p>
                  Make a badge, download a printable activity, and see if you can find
                  all three little yellow sparks hiding around the page.
                </p>
              }
            />

            <div className="creativeCorner__status" aria-live="polite">
              <SparkMascot found={bonusUnlocked} />
              <div>
                <strong>
                  {bonusUnlocked
                    ? "You found all three sparks!"
                    : `${foundCount} of 3 hidden sparks found`}
                </strong>
                <span>
                  {bonusUnlocked
                    ? "The bonus FOUND ALL 3 badge message is unlocked."
                    : "Look near the project menu, school tile, and Miguel’s introduction."}
                </span>
              </div>
            </div>

            <CreativeLab bonusUnlocked={bonusUnlocked} />

            <div className="creativeCorner__printable" data-concierge-reveal>
              <div>
                <span>Free printable</span>
                <h3>Design Your Own Flyer + Logo</h3>
                <p>
                  Two printer-friendly activity pages made for elementary-age creators.
                  No sign-up required.
                </p>
              </div>
              <a
                className="conciergeButton conciergeButton--paper"
                href="/downloads/thirty3-creative-corner.pdf"
                download
              >
                Download the activity <ArrowIcon />
              </a>
            </div>

            <p className="creativeCorner__privacy">
              The Creative Corner has no accounts, uploads, advertising, tracking fields,
              or requests for a child’s information.
            </p>
          </div>
        </section>

        <section className="conciergeContact" id="contact" aria-labelledby="contact-title">
          <div className="conciergeShell conciergeContact__grid" data-concierge-reveal>
            <div>
              <p>Ready when you are</p>
              <h2 id="contact-title">You bring the need. I’ll help make the thing.</h2>
            </div>
            <div>
              <p>
                Websites, flyers, invitations, school materials, QR forms, logos,
                and the project that does not have a neat name yet.
              </p>
              <button
                type="button"
                className="conciergeButton conciergeButton--yellow"
                onClick={(event) => openProjectModal(event, "", "MiguelThirty3 final CTA")}
              >
                Start your project <ArrowIcon />
              </button>
              <a href="mailto:hello@miguelthirty3.com">hello@miguelthirty3.com</a>
              <a href="tel:+16154406033">615-440-6033</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="conciergeFooter">
        <div className="conciergeShell">
          <strong>MIGUELTHIRTY3.COM</strong>
          <span>Thirty3 Digital Designs</span>
          <span>Clarksville, Tennessee</span>
          <span>© {new Date().getFullYear()} Miguel De Jesus</span>
        </div>
      </footer>

      {foundCount > 0 && (
        <div className={`conciergeSparkProgress ${bonusUnlocked ? "is-complete" : ""}`} aria-live="polite">
          <SparkMascot found={bonusUnlocked} />
          <span>{bonusUnlocked ? "All sparks found" : `${foundCount} / 3 sparks`}</span>
        </div>
      )}

      <ProjectInquiryModal
        key={modalInstance}
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        returnFocusRef={modalTriggerRef}
        source={modalSource}
        initialProjectType={modalProjectType}
      />
    </div>
  );
}
