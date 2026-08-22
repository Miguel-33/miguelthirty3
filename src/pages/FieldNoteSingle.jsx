import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fieldNotes } from "../data/fieldNotes";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import "../styles/site-flow.css";

export default function FieldNoteSingle() {
  const { slug } = useParams();
  const noteIndex = fieldNotes.findIndex((item) => item.slug === slug);
  const note = fieldNotes[noteIndex];

  if (!note) {
    return (
      <>
        <Helmet>
          <title>Field Note Not Found | Thirty3 Digital Designs</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <SiteHeader />

        <main className="article-page">
          <div className="article-wrap">
            <Link to="/field-notes" className="article-back">
              ← Back to Field Notes
            </Link>
            <h1 className="article-title">Field Note Not Found</h1>
            <p>This note may have moved. The full collection is still right here.</p>
          </div>
        </main>

        <SiteFooter />
      </>
    );
  }

  const previousNote = fieldNotes[noteIndex - 1];
  const nextNote = fieldNotes[noteIndex + 1];
  const canonicalUrl = `https://miguelthirty3.com/field-notes/${note.slug}`;
  const category = note.category || "Website Strategy";

  return (
    <>
      <Helmet>
        <title>{note.title} | Thirty3 Digital Designs</title>
        <meta name="description" content={note.metaDescription || note.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${note.title} | Thirty3 Digital Designs`} />
        <meta property="og:description" content={note.metaDescription || note.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <SiteHeader />

      <main className="article-page">
        <article className="article-wrap">
          <Link to="/field-notes" className="article-back">
            ← Back to Field Notes
          </Link>

          <header className="article-hero">
            <div>
              <p className="notes-kicker">{category}</p>
              <h1 className="article-title">{note.title}</h1>
              <p className="article-excerpt">{note.excerpt}</p>
            </div>

            <aside className="article-meta-card">
              <span>
                {note.date}
                {note.readingTime ? ` · ${note.readingTime}` : ""}
              </span>
              <p>
                A Thirty3 Field Note for business owners who want a clearer,
                sharper online presence.
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
                          <Link to="/request-website">Request a Website →</Link>
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
                Send what feels off. I’ll help shape the next step for the
                business, brand, campaign, or organization.
              </p>
              <Link to="/request-website">Request a Website →</Link>
            </div>
          </section>
        </article>

        {(previousNote || nextNote) && (
          <nav className="siteJourney" aria-label="More Field Notes">
            <p className="siteJourney__label">Keep reading</p>
            <div className="siteJourney__grid">
              {previousNote ? (
                <Link to={`/field-notes/${previousNote.slug}`}>
                  <span>Previous note</span>
                  <strong>{previousNote.title}</strong>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}

              {nextNote ? (
                <Link to={`/field-notes/${nextNote.slug}`}>
                  <span>Next note</span>
                  <strong>{nextNote.title}</strong>
                </Link>
              ) : (
                <Link to="/field-notes">
                  <span>Back to the collection</span>
                  <strong>See every Field Note</strong>
                </Link>
              )}
            </div>
          </nav>
        )}
      </main>

      <SiteFooter />
    </>
  );
}