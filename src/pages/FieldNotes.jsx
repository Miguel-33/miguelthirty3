import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fieldNotes } from "../data/fieldNotes";
import FieldNotesHeader from "../components/FieldNotesHeader";

export default function FieldNotes() {
  return (
    <>
      <Helmet>
        <title>Field Notes | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="Practical website strategy, branding tips, and digital design insights for small business owners."
        />
      </Helmet>
<FieldNotesHeader />
      <main className="notes-page">
  <div className="notes-wrap">
    <p className="notes-kicker">Thirty3 Field Notes</p>
    <h1 className="notes-title">
      Practical website strategy for <span>small businesses.</span>
    </h1>
    <p className="notes-intro">
      Straightforward notes on websites, branding, content, and digital presence
      for business owners who want their online presence to work.
    </p>

    <section className="notes-list">
      {fieldNotes.map((note) => (
        <Link key={note.id} to={`/field-notes/${note.slug}`} className="notes-card">
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
    </>
  );
}