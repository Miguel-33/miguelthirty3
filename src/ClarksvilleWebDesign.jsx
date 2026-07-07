import { useEffect } from "react";
import "./App.css";

const LOCAL_PROJECTS = [
  {
    name: "Isabella Transport",
    type: "Transportation Website",
    text: "A service-focused website built to make transportation options, credibility, and contact steps easier to understand.",
    href: "/proof-of-work/isabella-transport",
  },
  {
    name: "Gregory S. Chatman",
    type: "Personal Brand Website",
    text: "A personal brand website designed around message, trust, sermons, videos, and clear next steps.",
    href: "/proof-of-work/gregory-chatman",
  },
  {
    name: "Blayne's Family Research",
    type: "Research Website",
    text: "A focused website built to explain services, build confidence, and guide people toward an inquiry.",
    href: "/proof-of-work/blaynes-family-research",
  },
];

const FAQS = [
  {
    q: "Do you build websites for small businesses in Clarksville?",
    a: "Yes. Thirty3 Digital Designs creates custom websites for small businesses in Clarksville, Nashville, and Middle Tennessee.",
  },
  {
    q: "What kind of websites do you design?",
    a: "Business websites, landing pages, portfolio sites, personal brand sites, campaign sites, and website refreshes.",
  },
  {
    q: "Can you refresh an existing website?",
    a: "Yes. If your current site feels outdated, unclear, or hard to use on mobile, I can help improve the structure, message, and visual trust.",
  },
  {
    q: "Do you also design logos, flyers, or social graphics?",
    a: "Yes. Websites are the main focus, but supporting design materials can be created when the project needs them.",
  },
];

function upsertMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export default function ClarksvilleWebDesign() {
  useEffect(() => {
    document.title = "Clarksville Web Design for Small Businesses | MiguelThirty3";
    upsertMeta(
      "description",
      "Custom Clarksville web design for small businesses that need to look professional, build trust, and get chosen before customers call."
    );
    upsertCanonical("https://www.miguelthirty3.com/clarksville-web-design");
  }, []);

  return (
    <main className="local-page">
      <nav className="local-nav" aria-label="Clarksville web design page navigation">
        <a className="local-logo" href="/">
          MIGUEL<span>THIRTY3</span>
        </a>

        <div>
          <a href="/proof-of-work">Work</a>
          <a href="/field-notes">Notes</a>
          <a href="/request-website">Request Website</a>
        </div>
      </nav>

      <section className="local-hero">
        <div className="local-hero-copy">
          <p className="local-kicker">Clarksville Web Design</p>

          <h1>
  Clarksville Web Design for small businesses that need to look ready.
</h1>

          <p>
            Custom website design for Clarksville businesses that want to look
            professional, explain their services clearly, and make it easier for
            people to take the next step.
          </p>

          <div className="local-actions">
            <a className="btn-primary" href="/request-website">
              Request a Website
            </a>
            <a className="btn-ghost" href="/proof-of-work">
              See Proof of Work
            </a>
          </div>

          <div className="local-proof-strip" aria-label="Website design proof">
            <span>★★★★★ 5.0 Google Rating</span>
            <span>Clarksville, TN</span>
            <span>Direct Designer Access</span>
          </div>
        </div>

        <aside className="local-hero-card" aria-label="Website design summary">
          <span>Thirty3</span>
          <h2>A website should make your business easier to trust.</h2>
          <p>
            Your website should make your business easier to understand before a
            customer calls, messages, books, or visits.
          </p>
        </aside>
      </section>

      <section className="local-problem">
        <div>
          <p className="local-kicker dark">The real problem</p>
          <h2>Your website is often the first trust test.</h2>
        </div>

        <p>
          Before someone calls, books, visits, or asks for a quote, they usually
          check your website. If the site feels outdated, confusing, unfinished,
          or too generic, trust leaks out before the conversation starts.
        </p>
      </section>

      <section className="local-services">
        <div className="local-section-head">
          <p className="local-kicker dark">What I build</p>
          <h2>Website-first design for local businesses.</h2>
        </div>

        <div className="local-card-grid">
          <article>
            <span>01</span>
            <h3>Business Websites</h3>
            <p>
              Clear, professional websites for small businesses that need a
              stronger online presence.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Website Refreshes</h3>
            <p>
              Better structure, cleaner messaging, improved mobile layouts, and
              stronger calls to action.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Landing Pages</h3>
            <p>
              Focused pages for services, campaigns, events, offers, lead
              capture, or announcements.
            </p>
          </article>
        </div>
      </section>

      <section className="local-fit">
        <div className="local-fit-card">
          <p className="local-kicker">Good fit if</p>
          <h2>You need your business to look more established online.</h2>

          <div className="local-checks">
            <span>Your current site feels outdated</span>
            <span>Your business only lives on Facebook</span>
            <span>Your services are hard to explain</span>
            <span>Your mobile experience needs work</span>
            <span>You want something custom, not template-heavy</span>
            <span>You need a clearer path for inquiries</span>
          </div>
        </div>
      </section>

      <section className="local-process">
        <div className="local-section-head">
          <p className="local-kicker dark">Simple process</p>
          <h2>A simple website process without the agency runaround.</h2>
        </div>

        <div className="local-process-grid">
          <article>
            <b>01</b>
            <h3>Send the request</h3>
            <p>
              Tell me what kind of website you need, where you are starting, and
              what the site should help people do.
            </p>
          </article>

          <article>
            <b>02</b>
            <h3>Shape the direction</h3>
            <p>
              I review the goal, content needs, design direction, and next steps
              before jumping into visuals.
            </p>
          </article>

          <article>
            <b>03</b>
            <h3>Build with purpose</h3>
            <p>
              The website is designed around clarity, trust, mobile usability,
              and action.
            </p>
          </article>
        </div>
      </section>

      <section className="local-work">
        <div className="local-section-head">
          <p className="local-kicker dark">Proof of work</p>
          <h2>Recent website projects.</h2>
        </div>

        <div className="local-work-grid">
          {LOCAL_PROJECTS.map((project) => (
            <a href={project.href} key={project.name}>
              <small>{project.type}</small>
              <h3>{project.name}</h3>
              <p>{project.text}</p>
              <b>View case study →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="local-seo-copy">
        <p className="local-kicker dark">Local web design</p>

        <h2>Web design for Clarksville businesses that need clarity.</h2>

        <p>
          Thirty3 Digital Designs helps small businesses in Clarksville and
          Middle Tennessee create websites that feel professional, easy to use,
          and ready to share. Whether you need a new website, a landing page, or
          a cleaner version of what you already have, the goal is the same:
          make your business easier to trust before someone contacts you.
        </p>

        <p>
          The design is not just about looking polished. It is about helping
          visitors understand who you are, what you offer, why it matters, and
          what they should do next.
        </p>
      </section>

      <section className="local-faq">
        <div className="local-section-head">
          <p className="local-kicker dark">Questions</p>
          <h2>Clarksville web design FAQs.</h2>
        </div>

        <div className="local-faq-list">
          {FAQS.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="local-final-cta">
        <p className="local-kicker">Start here</p>
        <h2>Need a better website for your Clarksville business?</h2>
        <p>
          Send the request. I will review it and follow up with the right next
          step.
        </p>
        <a className="btn-primary" href="/request-website">
          Request a Website
        </a>
      </section>
    </main>
  );
}