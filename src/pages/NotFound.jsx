import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import "../styles/not-found.css";
import "../styles/site-flow.css";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="The page could not be found. Return home, request a website, or read Field Notes from Thirty3 Digital Designs."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteHeader />

      <main className="notFound">
        <section className="notFound__hero">
          <div className="notFound__copy">
            <p className="notFound__eyebrow">404 • Page Not Found</p>
            <h1>This page wandered off.</h1>
            <p>
              The link may be broken or the page may have moved. Easy fix. Pick
              where you want to go next.
            </p>

            <div className="notFound__actions">
              <Link to="/request-website">Start a Project</Link>
              <Link to="/">Go Home</Link>
              <Link to="/field-notes">Read Field Notes</Link>
            </div>
          </div>

          <div className="notFound__visual" aria-hidden="true">
            <div className="notFound__type">
              <span>Wrong turn</span>
              <strong>404</strong>
              <p>Nothing to load here.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}