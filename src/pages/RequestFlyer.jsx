import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import "../styles/request-flyer.css";
import "../styles/site-flow.css";

const FLYER_TYPES = [
  "Business Promo",
  "Event Flyer",
  "Church Event",
  "School Announcement",
  "Community Notice",
  "Sale / Special",
  "Social Graphic",
  "Other",
];

const FLYER_FORMATS = [
  "Print Flyer",
  "Instagram Post",
  "Facebook Graphic",
  "Story Graphic",
  "Poster",
  "Both Print + Digital",
  "Not sure yet",
];

const FLYER_GOALS = [
  "Promote an event",
  "Announce something",
  "Sell a product or service",
  "Get signups",
  "Share information",
  "Make it look more professional",
  "Other",
];

const FLYER_FOCUS = [
  ["Clear Message", "People should understand what it is for fast."],
  ["Strong Hierarchy", "Date, time, price, location, and action should be easy to find."],
  ["Right Format", "Print, social, story, poster, or all of the above."],
  ["Ready to Use", "Designed for the platform or print size you need."],
];

const PROCESS = [
  ["01", "Request", "Send the details, timeline, and any reference images or links."],
  ["02", "Direction", "I organize the message so the most important info stands out."],
  ["03", "Design", "You get a polished flyer or promo graphic ready to share or print."],
];

export default function RequestFlyer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    type: "",
    format: "",
    goal: "",
    timeline: "",
    budget: "",
    eventDate: "",
    referenceLink: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const scrollToForm = () => {
    document.getElementById("flyer-request-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://formspree.io/f/xvzybvrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          requestType: "Flyer Request Landing Page",
          sourcePage: "/request-flyer",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Flyer request could not be sent.");

      setSent(true);
      setForm({
        name: "",
        email: "",
        business: "",
        type: "",
        format: "",
        goal: "",
        timeline: "",
        budget: "",
        eventDate: "",
        referenceLink: "",
        message: "",
      });
    } catch (error) {
      console.error("Flyer request form submission failed:", error);
      setErrorMessage(
        "That did not go through. Please try again or email hello@thirty3digitaldesigns.com.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Request a Flyer | Thirty3 Digital Designs in Clarksville, TN</title>
        <meta
          name="description"
          content="Request a flyer, promo graphic, event design, social post, or print-ready design from Thirty3 Digital Designs in Clarksville, TN."
        />
        <link rel="canonical" href="https://miguelthirty3.com/request-flyer" />
        <meta property="og:title" content="Request a Flyer | Thirty3 Digital Designs" />
        <meta
          property="og:description"
          content="Need a flyer or promo graphic? Send the details and get help shaping a clean, ready-to-use design."
        />
        <meta property="og:url" content="https://miguelthirty3.com/request-flyer" />
        <meta property="og:type" content="website" />
      </Helmet>

      <SiteHeader
        variant="paper"
        ctaLabel="Request a Flyer"
        onStartProject={scrollToForm}
      />

      <main className="requestFlyer">

      <section className="requestFlyer__hero">
        <div className="requestFlyer__heroCopy">
          <p className="requestFlyer__eyebrow">Flyer Request • Clarksville, TN</p>

          <h1>Make the announcement look ready.</h1>

          <p>
            Request a flyer, promo graphic, event design, or social post. I’ll help organize
            the message and turn it into something clean, clear, and ready to share.
          </p>

          <div className="requestFlyer__actions">
            <button type="button" onClick={scrollToForm}>
              Request a Flyer
            </button>
            <a href="#flyer-focus">See What Matters</a>
          </div>

          <div className="requestFlyer__trustStrip">
            <span>Print ready</span>
            <span>Social friendly</span>
            <span>Clear message</span>
            <span>Fast next step</span>
          </div>
        </div>

        <div className="requestFlyer__visual" aria-label="Flyer request preview">
          <div className="requestFlyer__poster">
            <div className="requestFlyer__posterTop">
              <span>Promo Design</span>
            </div>

            <div className="requestFlyer__posterBody">
              <strong>EVENT</strong>
              <div className="requestFlyer__line requestFlyer__lineLarge" />
              <div className="requestFlyer__line" />
              <div className="requestFlyer__badge">Flyer / Social</div>
            </div>
          </div>

          <div className="requestFlyer__stat">
            <strong>Ready</strong>
            <span>for print, social, or both.</span>
          </div>
        </div>
      </section>

      <section id="flyer-focus" className="requestFlyer__focus">
        <div className="requestFlyer__sectionHead">
          <p className="requestFlyer__eyebrow requestFlyer__eyebrowDark">What the design should do</p>
          <h2>Good flyers make the next step obvious.</h2>
        </div>

        <div className="requestFlyer__focusGrid">
          {FLYER_FOCUS.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="requestFlyer__process">
        <div className="requestFlyer__sectionHead">
          <p className="requestFlyer__eyebrow">Simple process</p>
          <h2>Send it. Shape it. Share it.</h2>
        </div>

        <div className="requestFlyer__processGrid">
          {PROCESS.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="flyer-request-form" className="requestFlyer__formSection">
        <div className="requestFlyer__formIntro">
          <p className="requestFlyer__eyebrow requestFlyer__eyebrowDark">Start here</p>
          <h2>Tell me about the flyer.</h2>
          <p>
            Send what you know: purpose, deadline, size, platform, and the details that need
            to be included.
          </p>
        </div>

        {sent ? (
          <div className="requestFlyer__success" role="status">
            <strong>Flyer request received.</strong>
            <p>I’ll follow up with the next step.</p>
          </div>
        ) : (
          <form className="requestFlyer__form" onSubmit={handleSubmit}>
            <input type="hidden" name="requestType" value="Flyer Request Landing Page" />

            <div className="requestFlyer__formGrid">
              <Field label="Your name" id="rf-name">
                <input
                  id="rf-name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  required
                  placeholder="First and last"
                />
              </Field>

              <Field label="Email address" id="rf-email">
                <input
                  id="rf-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  placeholder="best@email.com"
                />
              </Field>
            </div>

            <Field label="Business / event / project name" id="rf-business">
              <input
                id="rf-business"
                type="text"
                value={form.business}
                onChange={set("business")}
                placeholder="Business, event, brand, or organization"
              />
            </Field>

            <div className="requestFlyer__formGrid">
              <Field label="What kind of design?" id="rf-type">
                <select id="rf-type" value={form.type} onChange={set("type")}>
                  <option value="">Choose one</option>
                  {FLYER_TYPES.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Format needed" id="rf-format">
                <select id="rf-format" value={form.format} onChange={set("format")}>
                  <option value="">Choose one</option>
                  {FLYER_FORMATS.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="requestFlyer__formGrid">
              <Field label="Main goal" id="rf-goal">
                <select id="rf-goal" value={form.goal} onChange={set("goal")}>
                  <option value="">Choose one</option>
                  {FLYER_GOALS.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Timeline" id="rf-timeline">
                <select id="rf-timeline" value={form.timeline} onChange={set("timeline")}>
                  <option value="">When do you need it?</option>
                  {["ASAP", "This week", "Within 2 weeks", "This month", "No rush"].map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="requestFlyer__formGrid">
              <Field label="Budget range" id="rf-budget">
                <select id="rf-budget" value={form.budget} onChange={set("budget")}>
                  <option value="">Roughly speaking...</option>
                  {["Under $75", "$75-$150", "$150-$300", "$300+", "Not sure yet"].map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Event date, if any" id="rf-event-date">
                <input
                  id="rf-event-date"
                  type="text"
                  value={form.eventDate}
                  onChange={set("eventDate")}
                  placeholder="Example: July 20 at 6 PM"
                />
              </Field>
            </div>

            <Field label="Reference link" id="rf-reference">
              <input
                id="rf-reference"
                type="url"
                value={form.referenceLink}
                onChange={set("referenceLink")}
                placeholder="Canva, website, Instagram post, etc."
              />
            </Field>

            <Field label="What should be included?" id="rf-message">
              <textarea
                id="rf-message"
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Add the text, date, time, location, price, contact info, colors, or anything important."
              />
            </Field>

          {errorMessage && (
            <p className="requestFlyer__formError" role="alert">
              {errorMessage}
            </p>
          )}

          <p className="requestLegalNotice">
            By submitting this form, you agree to the <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>.
          </p>

          <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Flyer Request →"}
            </button>
          </form>
        )}
      </section>

      <section className="requestFlyer__finalCta">
        <h2>Need a website instead?</h2>
        <p>Website requests have their own focused page so we can gather the right details.</p>
        <Link to="/request-website">Request a website →</Link>
        <Link to="/" state={{ scrollTo: "services" }}>
          See all services →
        </Link>
      </section>

        {!sent && (
          <button type="button" className="requestFlyer__sticky" onClick={scrollToForm}>
            Request Flyer →
          </button>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

function Field({ label, id, children }) {
  return (
    <label className="requestFlyer__field" htmlFor={id}>
      <span>{label}</span>
      {children}
    </label>
  );
}