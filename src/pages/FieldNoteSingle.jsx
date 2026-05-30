import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fieldNotes } from "../data/fieldNotes";
import FieldNotesHeader from "../components/FieldNotesHeader";

export default function FieldNoteSingle() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const note = fieldNotes.find((item) => item.slug === slug);

    const goToContact = (e) => {
        e.preventDefault();

        navigate("/", { replace: false });

        setTimeout(() => {
            const contact = document.getElementById("contact");

            if (contact) {
                contact.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 300);
    };
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
                        {note.content.map((block, index) => {
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

                                default:
                                    return (
                                        <p key={index}>
                                            {block.text}
                                        </p>
                                    );
                            }
                        })}
                    </div>

                    <section className="article-cta">
                        <h2>Need a website review?</h2>
                        <div>
                            <p>
                                I can look at your site and send back practical ways to make it clearer,
                                stronger, and easier to act on.
                            </p>
                            <a href="/#contact" onClick={goToContact}>
                                Request a Free Website Review
                            </a>
                        </div>
                    </section>
                </article>
            </main>
        </>
    );
}