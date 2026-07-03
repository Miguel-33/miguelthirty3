import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import "../styles/proof-of-work.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import PageCTA from "../components/PageCTA";

export default function ProofOfWork() {
  return (
    <>
      <SiteHeader />

      <main className="pow">
        <section className="powHero">
          <p className="powKicker">Proof of Work</p>

          <div className="powHero__grid">
            <h1>
              Real projects.
              <br />
              Real businesses.
              <br />
              Real strategy.
            </h1>

            <p>
              A closer look at websites designed and built for small businesses,
              local brands, public-facing projects, and organizations that needed
              a stronger digital first impression.
            </p>
          </div>
        </section>

        <section className="powGrid" aria-label="Project case studies">
          {projects.map((project) => (
            <article className="powCard" key={project.slug}>
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

              <Link className="powCard__link" to={`/proof-of-work/${project.slug}`}>
                View Project
              </Link>
            </article>
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