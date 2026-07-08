import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader.jsx";
import "../styles/not-found.css";

export default function NotFound() {
  const navigate = useNavigate();

  const goToProjectPicker = () => {
    navigate("/", {
      state: { scrollTo: "project-picker" },
    });
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="The page could not be found. Start a project, request a website, or read Field Notes from Thirty3 Digital Designs."
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
              The link may be broken, moved, or still waiting to be designed.
              You can head home, request a website, or start a project from the main page.
            </p>

            <div className="notFound__actions">
              <button type="button" onClick={goToProjectPicker}>
                Start a Project
              </button>

              <Link to="/request-website">Request Website</Link>
              <Link to="/field-notes">Read Field Notes</Link>
            </div>
          </div>

          <div className="notFound__visual" aria-hidden="true">
            <div className="notFound__browser">
              <div className="notFound__browserTop">
                <span />
                <span />
                <span />
                <b>missing-page.html</b>
              </div>

              <div className="notFound__browserBody">
                <strong>404</strong>
                <div className="notFound__line wide" />
                <div className="notFound__line" />
                <div className="notFound__miniGrid">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className="notFound__tag">
              <span>Redirecting energy</span>
              <b>Back to clarity.</b>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}