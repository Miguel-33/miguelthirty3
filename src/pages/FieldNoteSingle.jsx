import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fieldNotes } from "../data/fieldNotes";
import FieldNotesHeader from "../components/FieldNotesHeader";

export default function FieldNoteSingle() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const note = fieldNotes.find((item) => item.slug === slug);

    if (!note) {
        return (
            <main className="article-page">
                <div className="article-wrap">
                    <Link to="/field-notes" className="article-back">
                        ← Back to Field Notes
                    </Link>
                    <h1 className="article-title">Field Note Not Found</h1>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>{note.title} | Thirty3 Digital Designs</title>
                <meta name="description" content={note.metaDescription} />
            </Helmet>
            <FieldNotesHeader />
            <main className="article-page">
                <article className="article-wrap">
                    <Link to="/field-notes" className="article-back">
                        ← Back to Field Notes
                    </Link>

                    <header className="article-hero">
                        <div>
                            <p className="notes-kicker">Website Strategy</p>
                            <h1 className="article-title">{note.title}</h1>
                            <p className="article-excerpt">{note.excerpt}</p>
                        </div>

                        <aside className="article-meta-card">
                            <span>{note.date}</span>
                            <p>
                                A Thirty3 Field Note for small business owners who want their
                                website to feel clearer, sharper, and easier to act on.
                            </p>
                        </aside>
                    </header>

                    <div className="article-content">
                        {Array.isArray(note.content)
                            ? note.content.map((block, index) => {
                                switch (block.type) {
                                    case "callout":
                                        return (
                                            <div key={index} className="article-callout">
                                                {block.text}
                                            </div>
                                        );

                                    case "strategy":
                                        return (
                                            <div key={index} className="article-strategy">
                                                <span>Strategy Note</span>
                                                <h3>{block.text}</h3>
                                            </div>
                                        );

                                    case "quote":
                                        return (
                                            <blockquote key={index} className="article-quote">
                                                {block.text}
                                            </blockquote>
                                        );
                                    case "websiteCta":
                                        return (
                                            <div key={index} className="article-inline-cta">
                                                <span>Need a website?</span>
                                                <h3>{block.title || "Make your business easier to trust."}</h3>
                                                <p>
                                                    {block.text ||
                                                        "Send a website request and I’ll help shape the next step."}
                                                </p>
                                                <Link to="/request-website">
                                                    Request a Website →
                                                </Link>
                                            </div>
                                        );
                                    default:
                                        return <p key={index}>{block.text}</p>;
                                }
                            })
                            : note.content
                                .trim()
                                .split("\n\n")
                                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                    </div>

                    <section className="article-cta">
                        <h2>Need a clearer website?</h2>
                        <div>
                            <p>
                                Send a website request and I’ll help shape the next step for your business,
                                brand, campaign, or organization.
                            </p>
                            <Link to="/request-website">
                                Request a Website →
                            </Link>
                        </div>
                    </section>
                </article>
            </main>
        </>
    );
}