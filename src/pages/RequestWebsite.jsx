import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/request-website.css";

const WEBSITE_TYPES = [
    "Small Business",
    "Restaurant / Food",
    "Service Business",
    "Personal Brand",
    "Campaign",
    "Nonprofit",
    "Portfolio",
    "Other",
];

const WEBSITE_GOALS = [
    "Get more customers",
    "Look more professional",
    "Explain my services",
    "Collect leads",
    "Promote an event or launch",
    "Replace a Facebook-only presence",
    "Not sure yet",
];

const WEBSITE_SECTIONS = [
    ["Clear Offer", "People should know what you do within seconds."],
    ["Trust Signals", "Your site should make the business feel real, current, and credible."],
    ["Mobile First", "Most visitors will judge the site from their phone."],
    ["Next Step", "Call, book, message, request, or learn more. The action should be obvious."],
];

const PROCESS = [
    ["01", "Request", "Tell me what kind of website you need and what it should help you do."],
    ["02", "Direction", "I review the details and follow up with the right questions and next steps."],
    ["03", "Build", "The site gets designed around clarity, trust, mobile flow, and your main goal."],
];

const TRUST_POINTS = [
    "Clear first impression",
    "Mobile-friendly direction",
    "Built around trust",
    "Simple next step",
];

export default function RequestWebsite() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        business: "",
        type: "",
        goal: "",
        timeline: "",
        budget: "",
        currentSite: "",
        message: "",
    });

    const navigate = useNavigate();

    const goToHomepagePicker = () => {
        navigate("/", {
            state: { scrollTo: "project-picker" },
        });
    };

    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = (key) => (event) => {
        setForm((current) => ({ ...current, [key]: event.target.value }));
    };

    const scrollToForm = () => {
        document.getElementById("website-request-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
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
                body: JSON.stringify({
                    ...form,
                    requestType: "Website Request Landing Page",
                    sourcePage: "/request-website",
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setSent(true);
                setForm({
                    name: "",
                    email: "",
                    business: "",
                    type: "",
                    goal: "",
                    timeline: "",
                    budget: "",
                    currentSite: "",
                    message: "",
                });
            }
        } catch (error) {
            console.error("Website request form submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="requestWebsite">
            <Helmet>
                <title>Request a Website | Thirty3 Digital Designs in Clarksville, TN</title>
                <meta
                    name="description"
                    content="Request a website for your small business, brand, campaign, nonprofit, or organization. Thirty3 Digital Designs helps create clear, mobile-friendly websites in Clarksville, TN."
                />
                <link rel="canonical" href="https://www.miguelthirty3.com/request-website" />
                <meta property="og:title" content="Request a Website | Thirty3 Digital Designs" />
                <meta
                    property="og:description"
                    content="Need a website? Send a request and get help shaping the next step for your business, brand, campaign, or organization."
                />
                <meta property="og:url" content="https://www.miguelthirty3.com/request-website" />
                <meta property="og:type" content="website" />
            </Helmet>

            <nav className="requestWebsite__nav" aria-label="Website request navigation">
                <Link className="requestWebsite__logo" to="/">
                    MIGUEL<span>THIRTY3</span>
                </Link>

                <div>
                    <Link to="/">Home</Link>
                    <Link to="/field-notes">Notes</Link>
                    <button type="button" className="requestWebsite__navTextBtn" onClick={goToHomepagePicker}>
                        Other Projects
                    </button>
                    <button type="button" onClick={scrollToForm}>
                        Request Website
                    </button>
                </div>
            </nav>

            <section className="requestWebsite__hero">
                <div className="requestWebsite__heroCopy">
                    <p className="requestWebsite__eyebrow">Website Request • Clarksville, TN</p>

                    <h1>Make your business easier to trust.</h1>

                    <p>
                        Request a website for your business, brand, campaign, or organization.
                        I’ll help shape the idea into a clear, mobile-friendly site that tells
                        people what you do and what to do next.
                    </p>

                    <div className="requestWebsite__actions">
                        <button type="button" onClick={scrollToForm}>
                            Request a Website
                        </button>
                        <a href="#website-focus">See What Matters</a>
                    </div>

                    <div className="requestWebsite__trustStrip" aria-label="Website request benefits">
                        {TRUST_POINTS.map((point) => (
                            <span key={point}>{point}</span>
                        ))}
                    </div>
                </div>

                <div className="requestWebsite__visual" aria-label="Website request preview">
                    <div className="requestWebsite__browser">
                        <div className="requestWebsite__browserTop">
                            <span />
                            <span />
                            <span />
                            <b>Website first impression</b>
                        </div>

                        <div className="requestWebsite__browserBody">
                            <span className="requestWebsite__tag">Clear Offer</span>
                            <div className="requestWebsite__line requestWebsite__lineLarge" />
                            <div className="requestWebsite__line" />
                            <div className="requestWebsite__buttonMock" />
                            <div className="requestWebsite__mockGrid">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>

                    <div className="requestWebsite__stat">
                        <strong>3 sec</strong>
                        <span>to feel clear, credible, and worth the next click.</span>
                    </div>
                </div>
            </section>

            <section id="website-focus" className="requestWebsite__focus">
                <div className="requestWebsite__sectionHead">
                    <p className="requestWebsite__eyebrow requestWebsite__eyebrowDark">
                        What the site should do
                    </p>
                    <h2>Pretty is not enough. The page has to work.</h2>
                </div>

                <div className="requestWebsite__focusGrid">
                    {WEBSITE_SECTIONS.map(([title, text]) => (
                        <article key={title}>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="requestWebsite__process">
                <div className="requestWebsite__sectionHead">
                    <p className="requestWebsite__eyebrow">Simple process</p>
                    <h2>Request it. Shape it. Build it.</h2>
                </div>

                <div className="requestWebsite__processGrid">
                    {PROCESS.map(([num, title, text]) => (
                        <article key={num}>
                            <span>{num}</span>
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="website-request-form" className="requestWebsite__formSection">
                <div className="requestWebsite__formIntro">
                    <p className="requestWebsite__eyebrow requestWebsite__eyebrowDark">Start here</p>
                    <h2>Tell me about the website.</h2>
                    <p>
                        You do not need to have everything figured out. Send what you know,
                        and I’ll help with the next step.
                    </p>
                </div>

                {sent ? (
                    <div className="requestWebsite__success">
                        <strong>Website request received.</strong>
                        <p>I’ll follow up with the next step.</p>
                    </div>
                ) : (
                    <form className="requestWebsite__form" onSubmit={handleSubmit}>
                        <input type="hidden" name="requestType" value="Website Request Landing Page" />

                        <div className="requestWebsite__formGrid">
                            <Field label="Your name" id="rw-name">
                                <input
                                    id="rw-name"
                                    type="text"
                                    value={form.name}
                                    onChange={set("name")}
                                    required
                                    placeholder="First and last"
                                />
                            </Field>

                            <Field label="Email address" id="rw-email">
                                <input
                                    id="rw-email"
                                    type="email"
                                    value={form.email}
                                    onChange={set("email")}
                                    required
                                    placeholder="best@email.com"
                                />
                            </Field>
                        </div>

                        <Field label="Business / project name" id="rw-business">
                            <input
                                id="rw-business"
                                type="text"
                                value={form.business}
                                onChange={set("business")}
                                placeholder="Business, brand, campaign, or organization"
                            />
                        </Field>

                        <div className="requestWebsite__formGrid">
                            <Field label="What kind of website?" id="rw-type">
                                <select id="rw-type" value={form.type} onChange={set("type")}>
                                    <option value="">Choose one</option>
                                    {WEBSITE_TYPES.map((item) => (
                                        <option value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Main goal" id="rw-goal">
                                <select id="rw-goal" value={form.goal} onChange={set("goal")}>
                                    <option value="">Choose one</option>
                                    {WEBSITE_GOALS.map((item) => (
                                        <option value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <div className="requestWebsite__formGrid">
                            <Field label="Timeline" id="rw-timeline">
                                <select id="rw-timeline" value={form.timeline} onChange={set("timeline")}>
                                    <option value="">When do you need it?</option>
                                    {["ASAP", "This week", "Within 2 weeks", "This month", "No rush"].map((item) => (
                                        <option value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Budget range" id="rw-budget">
                                <select id="rw-budget" value={form.budget} onChange={set("budget")}>
                                    <option value="">Roughly speaking...</option>
                                    {["Under $500", "$500-$1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000+", "Not sure yet"].map((item) => (
                                        <option value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <Field label="Current website or reference link" id="rw-current">
                            <input
                                id="rw-current"
                                type="url"
                                value={form.currentSite}
                                onChange={set("currentSite")}
                                placeholder="https://example.com"
                            />
                        </Field>

                        <Field label="What should I know?" id="rw-message">
                            <textarea
                                id="rw-message"
                                rows={5}
                                value={form.message}
                                onChange={set("message")}
                                placeholder="Tell me what you need, what is not working, or what you want the site to help with."
                            />
                        </Field>

                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Website Request →"}
                        </button>
                    </form>
                )}
            </section>

            <section className="requestWebsite__finalCta">
                <h2>Need more than a website?</h2>
                <p>Flyers, logos, QR signs, social graphics, and other design requests can start from the homepage.</p>
                <button type="button" onClick={goToHomepagePicker}>
                    Start a different project →
                </button>
            </section>

            <button type="button" className="requestWebsite__sticky" onClick={scrollToForm}>
                Request Website →
            </button>
        </main>
    );
}

function Field({ label, id, children }) {
    return (
        <label className="requestWebsite__field" htmlFor={id}>
            <span>{label}</span>
            {children}
        </label>
    );
}