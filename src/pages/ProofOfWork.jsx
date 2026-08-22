import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "../data/projects";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import PageCTA from "../components/PageCTA";
import "../styles/proof-of-work.css";
import "../styles/site-flow.css";

export default function ProofOfWork() {
  return (
    <>
      <Helmet>
        <title>Proof of Work | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="Explore website case studies for small businesses, local brands, public-facing projects, and organizations designed by Thirty3."
        />
        <link rel="canonical" href="https://miguelthirty3.com/proof-of-work" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Proof of Work | Thirty3 Digital Designs" />
        <meta
          property="og:description"
          content="Real websites, real businesses, and the strategy behind the work."
        />
        <meta property="og:url" content="https://miguelthirty3.com/proof-of-work" />
      </Helmet>

      <SiteHeader />

      <main className="pow">
        <section className="powHero">
          <p className="powKicker">Proof of Work</p>
          <div className="powHero__grid">
            <h1>Real projects.<br />Real businesses.<br />Real strategy.</h1>
            <div>
              <p>
                A closer look at websites designed and built for small businesses,
                local brands, public-facing projects, and organizations that needed
                a stronger digital first impression.
              </p>
              <p className="powHero__count">{projects.length} case studies and counting.</p>
            </div>
          </div>
        </section>

        <section className="powGrid" aria-label="Project case studies">
          {projects.map((project) => (
            <Link
              className="powCard"
              key={project.slug}
              to={`/proof-of-work/${project.slug}`}
              aria-label={`View the ${project.title} case study`}
            >
              <div>
                <p className="powCard__eyebrow">{project.eyebrow}</p>
                <h2>{project.title}</h2>
                <p className="powCard__excerpt">{project.excerpt}</p>
              </div>
              <div className="powCard__meta">
                <span>{project.industry}</span>
                <span>{project.platform}</span>
                <span>{project.status}</span>
              </div>
              <span className="powCard__link">View Project</span>
            </Link>
          ))}
        </section>
      </main>

      <PageCTA
        kicker="Ready when you are"
        title="Your website should make the first impression easier."
        text="If your business is relying on Facebook, Yelp, or word of mouth alone, a clear website can help people trust you faster."
      />
      <SiteFooter />
    </>
  );
}