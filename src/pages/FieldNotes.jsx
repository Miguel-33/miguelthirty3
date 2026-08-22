import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fieldNotes } from "../data/fieldNotes";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import "../styles/site-flow.css";

export default function FieldNotes() {
  return (
    <>
      <Helmet>
        <title>Field Notes | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="Practical website strategy, branding tips, and digital design insights for small business owners."
        />
        <link rel="canonical" href="https://miguelthirty3.com/field-notes" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Field Notes | Thirty3 Digital Designs" />
        <meta
          property="og:description"
          content="Straightforward notes about websites, branding, content, and digital presence for small business owners."
        />
        <meta property="og:url" content="https://miguelthirty3.com/field-notes" />
      </Helmet>

      <SiteHeader />

      <main className="notes-page">
        <div className="notes-wrap">
          <p className="notes-kicker">Thirty3 Field Notes</p>
          <h1 className="notes-title">
            Practical website strategy for <span>small businesses.</span>
          </h1>
          <p className="notes-intro">
            Straightforward notes on websites, branding, content, and digital
            presence for business owners who want their online presence to work.
          </p>

          <div className="notesIndexMeta" aria-label="Field Notes collection details">
            <span>{fieldNotes.length} notes</span>
            <span>Written for real business decisions</span>
          </div>

          <section className="notes-list" aria-label="Field Notes articles">
            {fieldNotes.map((note) => (
              <Link
                key={note.id}
                to={`/field-notes/${note.slug}`}
                className="notes-card"
                aria-label={`Read ${note.title}`}
              >
                <span className="notes-card-date">{note.date}</span>
                <div>
                  <h2>{note.title}</h2>
                  <p>{note.excerpt}</p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}