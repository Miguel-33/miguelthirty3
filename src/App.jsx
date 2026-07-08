import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader.jsx";

const TILES = [
  {
    id: "website",
    label: "Website",
    sub: "Business websites, landing pages, portfolio sites, and campaign sites.",
    icon: "⌁",
    featured: true,
  },
  {
    id: "websiteRefresh",
    label: "Website Refresh",
    sub: "Already have a site? Improve the structure, message, and visual trust.",
    icon: "↻",
    featured: true,
  },
  {
    id: "landing",
    label: "Landing Page",
    sub: "A focused page for one offer, campaign, event, or service.",
    icon: "▣",
    featured: true,
  },
  {
    id: "brandSupport",
    label: "Brand Support",
    sub: "Logo direction, colors, fonts, and matching visual assets.",
    icon: "△",
  },
  {
    id: "flyer",
    label: "Flyer / Promo",
    sub: "Events, promos, announcements, specials, and launches.",
    icon: "✦",
  },
  {
    id: "social",
    label: "Social Graphic",
    sub: "Graphics for Instagram, Facebook, ads, and updates.",
    icon: "◉",
  },
  {
    id: "qr",
    label: "QR Sign",
    sub: "Menus, reviews, forms, links, and table signs.",
    icon: "▦",
  },
  {
    id: "other",
    label: "Something Else",
    sub: "Not sure where it fits? Start here.",
    icon: "?",
  },
];

const TRUSTED_WORK = [
  "Isabella Transport",
  "Gregory S. Chatman",
  "Joseph P. Day",
  "Blayne’s Family Research",
  "Thirty3 Digital Designs",
];

const FLOW = {
  website: {
    q1: { label: "What kind of website?", opts: ["Business", "Campaign", "Portfolio", "Personal Brand", "Nonprofit", "Church", "School", "Other"] },
    q2: { label: "What should it help you do?", opts: ["Get more customers", "Look more professional", "Explain services", "Collect leads", "Promote something", "Share information", "Other"] },
  },
  websiteRefresh: {
    q1: {
      label: "What needs the most help?",
      opts: [
        "Homepage message",
        "Mobile layout",
        "Outdated design",
        "Better calls to action",
        "SEO structure",
        "Overall trust",
        "Not sure yet",
      ],
    },
    q2: {
      label: "What should the refresh help you do?",
      opts: [
        "Get more inquiries",
        "Look more professional",
        "Explain services better",
        "Improve local trust",
        "Make the site easier to use",
        "Prepare for advertising",
        "Other",
      ],
    },
  },

  landing: {
    q1: {
      label: "What is the page for?",
      opts: [
        "Service",
        "Event",
        "Campaign",
        "Product",
        "Lead capture",
        "Announcement",
        "Other",
      ],
    },
    q2: {
      label: "What should people do on the page?",
      opts: [
        "Call",
        "Book",
        "Fill out a form",
        "Buy",
        "Learn more",
        "Sign up",
        "Other",
      ],
    },
  },

  brandSupport: {
    q1: {
      label: "What kind of brand help do you need?",
      opts: [
        "Logo direction",
        "Colors and fonts",
        "Social look",
        "Print materials",
        "Website visuals",
        "Full visual refresh",
        "Not sure yet",
      ],
    },
    q2: {
      label: "Where will this be used most?",
      opts: [
        "Website",
        "Social media",
        "Business cards",
        "Flyers",
        "Signs",
        "All of the above",
        "Other",
      ],
    },
  },
  flyer: {
    q1: { label: "What is the flyer for?", opts: ["Event", "Business Promo", "Sale or Special", "Church Service", "School Announcement", "Community Notice", "Other"] },
    q2: { label: "When do you need it?", opts: ["ASAP", "This week", "Within 2 weeks", "This month", "Just exploring"] },
  },
  logo: {
    q1: { label: "What kind of brand?", opts: ["Business", "Personal Brand", "Nonprofit", "Church", "School", "Side Project", "Other"] },
    q2: { label: "Where are you starting?", opts: ["Starting from scratch", "Redesigning a logo", "Need brand direction", "Need matching materials", "Not sure yet"] },
  },
  card: {
    q1: { label: "Who is the card for?", opts: ["Me personally", "My business", "My team", "My ministry", "My nonprofit", "Other"] },
    q2: { label: "What style do you want?", opts: ["Clean and minimal", "Bold and modern", "Classic and professional", "Playful and fun", "Match my brand"] },
  },
  social: {
    q1: { label: "Which platform?", opts: ["Instagram", "Facebook", "LinkedIn", "Multiple platforms", "Not sure yet"] },
    q2: { label: "What is the purpose?", opts: ["Announce something", "Promote a service", "Run an ad", "Build engagement", "Share a message", "Other"] },
  },
  qr: {
    q1: { label: "Where will it be used?", opts: ["Storefront", "Event table", "Restaurant or menu", "Church lobby", "School hallway", "Direct mail", "Other"] },
    q2: { label: "Where should it send people?", opts: ["Website", "Form", "Menu", "Reviews", "Donation page", "Social media", "Other"] },
  },
  event: {
    q1: { label: "What type of event?", opts: ["Community event", "Church event", "School event", "Fundraiser", "Birthday or celebration", "Conference", "Other"] },
    q2: { label: "What do you need?", opts: ["Flyer", "Program", "Banner", "Social graphics", "Tickets", "All of the above", "Not sure yet"] },
  },
  other: {
    q1: { label: "What is closest?", opts: ["Website", "Print design", "Digital design", "Branding", "Social media", "Something unique"] },
    q2: { label: "How soon do you need it?", opts: ["ASAP", "This week", "This month", "No rush", "Just exploring"] },
  },
};

const PROJECTS = [
  {
    id: 1,
    type: "Website",
    name: "Isabella Transport",
    desc: "A business website built to make services, credibility, and contact steps easy to understand.",
    result: "Clarified services and made it easy for customers to get in touch.",
    tag: "Transportation",
    wide: true,
    url: "/proof-of-work/isabella-transport",
    tone: "isabella",
  },
  {
    id: 2,
    type: "Website",
    name: "Gregory S. Chatman",
    desc: "A personal brand website with sermons, videos, and a focused spiritual message.",
    tag: "Personal Brand",
    url: "/proof-of-work/gregory-chatman",
    tone: "wine",
  },
  {
    id: 3,
    type: "Campaign Site",
    name: "Joseph P. Day",
    desc: "A campaign website with biography, accomplishments, endorsements, and voter-focused messaging.",
    tag: "Campaign",
    url: "/proof-of-work/joseph-p-day",
    tone: "blue",
  },
  {
    id: 4,
    type: "Research Website",
    name: "Blayne's Family Research",
    desc: "A research-focused website designed to present services, trust, and inquiry paths clearly.",
    tag: "Genealogy",
    url: "/proof-of-work/blaynes-family-research",
    tone: "sage",
  },
];

const FIELD_NOTES = [
  {
    title: "Your Homepage Has One Job",
    href: "/field-notes/your-homepage-has-one-job",
  },
  {
    title: "Why Facebook Isn't Your Website",
    href: "/field-notes/why-facebook-isnt-your-website",
  },
  {
    title: "How Much Does a Small Business Website Cost in Tennessee?",
    href: "/field-notes/how-much-does-a-small-business-website-cost-in-tennessee",
  },
];

const initDisc = { tile: null, step: 0, a1: "", a2: "" };

function TrustedWorkStrip() {
  return (
    <section className="trusted-strip section-fade" aria-label="Trusted work and projects">
      <div className="trusted-strip-inner">
        <p>Work created for</p>

        <div className="trusted-list">
          {TRUSTED_WORK.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function discReducer(state, action) {
  switch (action.type) {
    case "SELECT_TILE":
      return { ...initDisc, tile: action.tile, step: 1 };
    case "ANSWER_1":
      return { ...state, a1: action.val, step: 2 };
    case "ANSWER_2":
      return { ...state, a2: action.val, step: 3 };
    case "BACK_TO_1":
      return { ...state, a1: "", step: 1 };
    case "RESET":
      return initDisc;
    default:
      return state;
  }
}

export default function MiguelThirty3() {
  const [disc, dispatch] = useReducer(discReducer, initDisc);
  const discRef = useRef(null);
  const pickerRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectTile = (tile) => {
    dispatch({ type: "SELECT_TILE", tile });
    setTimeout(() => discRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const location = useLocation();

  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (!targetId) return;

    const scrollTimer = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState({}, document.title);
    }, 150);

    return () => clearTimeout(scrollTimer);
  }, [location.state]);

  return (
    <main className="home-shell">
      <SiteHeader />

      <section className="home-hero-poster" aria-label="Thirty3 Digital Designs homepage">
        <div className="hero-poster-inner">
          <p className="hero-service-pill">
            CLARKSVILLE WEB DESIGN
          </p>

          <div className="hero-sticker hero-sticker-one">Clarksville, TN</div>
          <div className="hero-sticker hero-sticker-two">Small Business Ready</div>

          <h1 className="hero-poster-title">
            <span className="hero-title-top">Make your business</span>
            <strong>Look Ready</strong>
            <span className="hero-title-bottom">before they call</span>
          </h1>

          <div className="hero-proof-row" aria-label="Proof and rating">
            <span>★★★★★</span>
            <strong>5.0 Google rating</strong>
            <b>Clarksville, TN</b>
            <b>Direct access to your designer</b>
          </div>

          <div className="hero-actions hero-poster-actions">
            <button type="button" className="btn-primary" onClick={() => scrollTo("project-picker")}>
              Start My Project
            </button>
            <a className="btn-ghost btn-ghost-dark" href="#work">
              See the Work
            </a>
          </div>

          <p className="hero-lede hero-poster-lede">
            Custom websites for small businesses that want to look professional, build trust, and get chosen.
          </p>
        </div>
      </section>

      <SectionDivider
        tone="light section-divider-action"
        number="01"
        label="Start here"
        text="Pick what you need"
      />

      <TrustedWorkStrip />

      <section
        id="project-picker"
        ref={pickerRef}
        className="picker-section"
        aria-label="Pick what you need designed"
      >
        <div className="picker-heading">
          <p className="eyebrow eyebrow-dark">Start here</p>
          <h2>Need a website or something to support it?</h2>
          <p>
            Start with the website path if your business needs a stronger online presence. Need a flyer, graphic, QR sign, or brand support? Those fit here too.
          </p>
        </div>

        <div className="tile-grid">
          {TILES.map((tile, index) => (
            <button
              key={tile.id}
              type="button"
              className={`tile-btn${tile.featured ? " tile-featured" : ""}${disc.tile?.id === tile.id ? " is-selected" : ""}`}
              onClick={() => selectTile(tile)}
              aria-label={`${tile.label}: ${tile.sub}`}
            >
              <span className="tile-count">{String(index + 1).padStart(2, "0")}</span>
              <span className="tile-icon">{tile.icon}</span>
              <strong>{tile.label}</strong>
              <small>{tile.sub}</small>
              <b className="tile-arrow">Pick this →</b>
              {disc.tile?.id === tile.id && (<span className="tile-selected-badge">Selected</span>)}
            </button>
          ))}
        </div>
      </section>

      {disc.step > 0 && (
        <section ref={discRef} id="discovery" className="discovery-section" aria-label="Project discovery">
          <div className="discovery-card">
            {disc.step === 1 && <DiscoveryStep1 disc={disc} dispatch={dispatch} />}
            {disc.step === 2 && <DiscoveryStep2 disc={disc} dispatch={dispatch} />}
            {disc.step === 3 && <DiscoveryDone disc={disc} dispatch={dispatch} onContact={() => scrollTo("contact")} />}
          </div>
        </section>
      )}

      <SectionDivider
        tone="soft"
        number="02"
        label="Simple process"
        text="Less guessing, more direction"
      />

      <section className="why-section section-fade" aria-label="Why work with Miguel">
        <div className="why-main">
          <p className="eyebrow eyebrow-dark">Simple process</p>
          <h2>Send the idea. I shape the design.</h2>
        </div>

        <div className="why-grid">
          {[
  [
    "01",
    "Start with the goal",
    "Website, refresh, landing page, or supporting design. We begin with what your business needs people to understand or do.",
  ],
  [
    "02",
    "Answer two questions",
    "A quick filter helps me understand the project type, priority, and the next best step.",
  ],
  [
    "03",
    "Get clear direction",
    "I follow up with the right questions, recommended path, and what we need to move forward.",
  ],
].map(([num, title, text]) => (
  <article className="why-card" key={title}>
    <span>{num}</span>
    <h3>{title}</h3>
    <p>{text}</p>
  </article>
))}
        </div>
      </section>

      <SectionDivider
        tone="light"
        number="03"
        label="Proof"
        text="Recent work"
      />

      <section id="work" className="work-section section-fade" aria-label="Recent projects">
        <div className="work-heading">
          <div>
            <p className="eyebrow eyebrow-dark">Proof of work</p>
            <h2>Recent projects</h2>
          </div>
          <p>
            A few examples of websites and design projects built for real people, real goals, and real deadlines.
          </p>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <SectionDivider
        tone="dark"
        number="04"
        label="Field notes"
        text="Helpful website strategy"
      />

      <section className="field-preview section-fade" aria-label="Field Notes preview">
        <div className="field-preview-head">
          <p className="eyebrow">Field Notes</p>
          <h2>Helpful website notes.</h2>
          <a href="/field-notes">View all notes →</a>
        </div>

        <div className="field-list">
          {FIELD_NOTES.map((note) => (
            <a href={note.href} key={note.title}>
              <span>{note.title}</span>
              <b>Read →</b>
            </a>
          ))}
        </div>
      </section>

      <SectionDivider
  tone="light"
  number="05"
  label="Why Thirty3"
  text="Direct, local, practical"
/>

      <section className="expect-section section-fade" aria-label="What to expect when starting a project">
        <div className="expect-heading">
          <p className="eyebrow eyebrow-dark">Why Thirty3</p>
<h2>Direct design help without the agency runaround.</h2>
<p>
  You work directly with the designer, not a sales funnel, mystery team, or template machine.
</p>
        </div>

        <div className="expect-grid">
          {[
  [
    "Direct access",
    "You work with me directly, from the first request to the final launch or design handoff.",
  ],
  [
    "Website-first thinking",
    "Even supporting materials are designed to strengthen how your business shows up online.",
  ],
  [
    "Local perspective",
    "Built for small businesses in Clarksville, Nashville, and Middle Tennessee that need to look ready.",
  ],
  [
    "Useful, not just pretty",
    "The goal is clarity, trust, and action. Good design should help people know what to do next.",
  ],
].map(([title, text]) => (
            <article className="expect-card" key={title}>
              <span>✓</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <SectionDivider
        tone="light"
        number="06"
        label="Request"
        text="Send the next step"
      />

      <section id="contact" className="contact-section section-fade" aria-label="Contact form">
        <ContactSection disc={disc} />
      </section>

      <Footer />
    </main>
  );
}

function SectionDivider({ tone = "light", number, label, text }) {
  return (
    <div className={`section-divider section-divider-${tone}`} aria-hidden="true">
      <div className="section-divider-inner">
        <span>{number}</span>
        <strong>{label}</strong>
        <i />
        <small>{text}</small>
        <b>THIRTY3</b>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Project request preview">
      <div className="request-card">
        <div className="request-card-top">
          <span />
          <span />
          <span />
          <b>Project request</b>
        </div>

        <div className="request-card-body">
          <div className="request-pill">Website</div>
          <div className="request-line wide" />
          <div className="request-line" />

          <div className="request-mini-grid">
            <span>Flyer / Promo</span>
            <span>Logo / Brand</span>
            <span>QR Sign</span>
          </div>

          <div className="request-note">
            <strong>THIRTY3</strong>
            <p>Pick what you need. I will help shape the next step.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscoveryStep1({ disc, dispatch }) {
  const flow = FLOW[disc.tile.id];

  return (
    <div>
      <BackBtn label="Change project type" onClick={() => dispatch({ type: "RESET" })} />
      <ProgressBar step={1} total={2} />

      <p className="eyebrow">You picked: {disc.tile.label}</p>
      <h2>{flow.q1.label}</h2>

      <div className="disc-options">
        {flow.q1.opts.map((opt) => (
          <button key={opt} type="button" className="disc-opt" onClick={() => dispatch({ type: "ANSWER_1", val: opt })}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiscoveryStep2({ disc, dispatch }) {
  const flow = FLOW[disc.tile.id];

  return (
    <div>
      <BackBtn label="Back" onClick={() => dispatch({ type: "BACK_TO_1" })} />
      <ProgressBar step={2} total={2} />

      <p className="eyebrow">{disc.tile.label} / {disc.a1}</p>
      <h2>{flow.q2.label}</h2>

      <div className="disc-options">
        {flow.q2.opts.map((opt) => (
          <button key={opt} type="button" className="disc-opt" onClick={() => dispatch({ type: "ANSWER_2", val: opt })}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiscoveryDone({ disc, dispatch, onContact }) {
  const summary = buildSummary(disc);

  return (
    <div>
      <div className="summary-card">
        <span>Your project</span>
        <strong>{summary.title}</strong>
        <p>{summary.detail}</p>
      </div>

      <h2>Ready for the next step.</h2>
      <p>{summary.cta}</p>

      <div className="discovery-actions">
        <button type="button" className="btn-primary" onClick={onContact}>
          Fill Out the Form
        </button>
        <button type="button" className="btn-dark" onClick={() => dispatch({ type: "RESET" })}>
          Start Over
        </button>
      </div>
    </div>
  );
}

function buildSummary(disc) {
  const { tile, a1, a2 } = disc;
  const title = `${tile.label}${a1 ? ` - ${a1}` : ""}`;
  const detail = a2 ? `Goal: ${a2}` : "";
  const cta = `You are building a ${tile.label.toLowerCase()}${a1 ? ` for ${a1.toLowerCase()}` : ""}${a2 ? ` with a focus on ${a2.toLowerCase()}` : ""}. Fill out the form and I will follow up.`;
  return { title, detail, cta };
}

function ProjectCard({ project }) {
  const isExternal = project.url?.startsWith("http");

  return (
    <a
      className={`proj-card proj-card-${project.tone}${project.wide ? " proj-wide" : ""}`}
      href={project.url || "#contact"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${project.type}: ${project.name}`}
    >
      <div className="proj-card-meta">
        <span>{project.type}</span>
        <small>{project.tag}</small>
      </div>

      <div>
        <h3>{project.name}</h3>
        <p>{project.desc}</p>
        {project.result && <em>{project.result}</em>}
      </div>

      <b>{isExternal ? "View project" : "View case study"} →</b>
    </a>
  );
}

function ContactSection({ disc }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    what: "",
    timeline: "",
    budget: "",
    link: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (disc.step === 3) {
      const prefill = `${disc.tile.label}${disc.a1 ? ` - ${disc.a1}` : ""}${disc.a2 ? ` (${disc.a2})` : ""}`;
      setForm((current) => ({ ...current, what: prefill }));
    }
  }, [disc.step, disc.tile, disc.a1, disc.a2]);

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xvzybvrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({
          name: "",
          email: "",
          what: "",
          timeline: "",
          budget: "",
          link: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const headline = disc.step === 3
    ? `You picked: ${disc.tile.label}${disc.a1 ? ` for ${disc.a1}` : ""}. Send me the details.`
    : "Tell me what you need designed and I will follow up with the next steps.";

  return (
    <div className="contact-wrap">
      <p className="eyebrow eyebrow-dark">Send the request</p>

      <h2>Tell me what you need designed.</h2>

      <p>{headline}</p>
      <p className="contact-reassurance">
        I personally review each request and reply with the next step.
      </p>
      {disc.step === 3 && (
        <div className="prefill-note">
          Project added from your selection.
        </div>
      )}
      {sent ? (
        <div className="sent-card">
          <strong>Project received.</strong>
          <p>I will follow up with the next step.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            <FieldGroup label="Your name" id="f-name">
              <input id="f-name" className="field-input" type="text" placeholder="First and last" value={form.name} onChange={set("name")} required />
            </FieldGroup>

            <FieldGroup label="Email address" id="f-email">
              <input id="f-email" className="field-input" type="email" placeholder="best@email.com" value={form.email} onChange={set("email")} required />
            </FieldGroup>
          </div>

          <FieldGroup label="What do you need?" id="f-what">
            <input id="f-what" className="field-input" type="text" placeholder="Website, flyer, logo, QR sign..." value={form.what} onChange={set("what")} />
          </FieldGroup>

          <div className="form-grid">
            <FieldGroup label="Timeline" id="f-timeline">
              <select id="f-timeline" className="field-input" value={form.timeline} onChange={set("timeline")}>
                <option value="">When do you need it?</option>
                {["ASAP", "This week", "Within 2 weeks", "This month", "No rush"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </FieldGroup>

            <FieldGroup label="Budget range" id="f-budget">
              <select id="f-budget" className="field-input" value={form.budget} onChange={set("budget")}>
                <option value="">Roughly speaking...</option>
                {["Under $100", "$100-$300", "$300-$750", "$750-$1,500", "$1,500+", "Not sure yet"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </FieldGroup>
          </div>

          <FieldGroup label="Inspiration or reference link" id="f-link">
            <input id="f-link" className="field-input" type="url" placeholder="https://example.com" value={form.link} onChange={set("link")} />
          </FieldGroup>

          <FieldGroup label="Anything else?" id="f-message">
            <textarea id="f-message" className="field-input" rows={5} placeholder="Extra context, questions, or rough ideas." value={form.message} onChange={set("message")} />
          </FieldGroup>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send My Project"}
          </button>
        </form>
      )}
    </div>
  );
}

function FieldGroup({ label, id, children }) {
  return (
    <label className="field-group" htmlFor={id}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div className="prog-wrap" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={index < step ? "active" : ""} />
      ))}
    </div>
  );
}

function BackBtn({ label, onClick }) {
  return (
    <button type="button" className="btn-dark btn-small" onClick={onClick}>
      ← {label}
    </button>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>MIGUEL<span>THIRTY3</span>.COM</strong>
        <p>
          Custom websites for small businesses, with supporting design materials when the project needs them.
        </p>
      </div>

      <div>
        <a href="/clarksville-web-design">Clarksville Web Design →</a>
        <a href="#project-picker">Start a project →</a>
        <a href="#work">See the work →</a>
        <a href="https://www.instagram.com/thirty3digitaldesigns/" target="_blank" rel="noopener noreferrer">
          Instagram →
        </a>
      </div>
    </footer>
  );
}