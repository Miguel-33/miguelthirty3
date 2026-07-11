import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import PageCTA from "../components/PageCTA";
import "../styles/project-single.css";

const projectScreenshots = {
  "isabella-transport": {
    src: "/isabellaTransportHero.png",
    alt: "Isabella Transport website homepage screenshot",
  },
  "joseph-p-day": {
    src: "/josephPDayHero.png",
    alt:
      "Joseph P. Day campaign website homepage presenting campaign priorities, accomplishments, and voter information",
  },
  "gregory-chatman": {
    src: "/gregorySChatmanHero.png",
    alt: "Gregory S. Chatman website homepage screenshot",
  },
  "blaynes-family-research": {
    src: "/blaynesFamilyResearchHero.png",
    alt: "Blayne’s Family Research website homepage screenshot",
  },
};

export default function ProjectSingle() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <>
        <SiteHeader />

        <main className="projectMissing">
          <p>Project not found.</p>
          <Link to="/proof-of-work">Back to Proof of Work</Link>
        </main>

        <SiteFooter />
      </>
    );
  }

  const screenshot = projectScreenshots[project.slug];

  return (
    <>
      <SiteHeader />

      <main className="projectPage">
        <section className="projectHero">
          <Link className="projectBack" to="/proof-of-work">
            Back to Proof of Work
          </Link>

          <p className="projectKicker">{project.eyebrow}</p>

          <div className="projectHero__grid">
            <h1>{project.title}</h1>

            <div className="projectHero__copy">
              <h2>{project.headline}</h2>
              <p>{project.excerpt}</p>
            </div>
          </div>
        </section>

        <section className="projectSnapshot">
          <div>
            <span>Industry</span>
            <strong>{project.industry}</strong>
          </div>

          <div>
            <span>Platform</span>
            <strong>{project.platform}</strong>
          </div>

          <div>
            <span>Focus</span>
            <strong>{project.focus}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{project.status}</strong>
          </div>
        </section>

        {screenshot ? (
          <section
  className="projectImageShowcase"
  aria-label={`${project.title} website screenshot`}
>
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit the live ${project.title} website`}
  >
    <img
      src={screenshot.src}
      alt={screenshot.alt}
    />

    <span className="projectImageShowcase__link">
      Visit live website ↗
    </span>
  </a>
</section>
        ) : (
          <section className="projectImagePlaceholder">
            <div>
              <span>Screenshot Area</span>
              <strong>Add project homepage or mobile image here.</strong>
            </div>
          </section>
        )}

        <section className="projectStory">
          <article>
            <p className="projectSectionKicker">The Challenge</p>
            <h2>Before the website, trust had to work harder.</h2>
            <p>{project.challenge}</p>
          </article>

          <article>
            <p className="projectSectionKicker">The Solution</p>
            <h2>A cleaner path from first impression to first contact.</h2>
            <p>{project.solution}</p>
          </article>
        </section>

        <section className="projectServices">
          <div>
            <p className="projectSectionKicker">Services</p>
            <h2>What Thirty3 handled.</h2>
          </div>

          <ul>
            {project.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>

        <section className="projectResults">
          <p className="projectSectionKicker">Results</p>
          <h2>What changed.</h2>

          <div className="projectResults__grid">
            {project.results.map((result) => (
              <div key={result}>
                <strong>{result}</strong>
              </div>
            ))}
          </div>
        </section>

        {project.quote && (
          <section className="projectQuote">
            <blockquote>“{project.quote}”</blockquote>
            <p>Client feedback</p>
          </section>
        )}

        <section className="projectNext">
          <div>
            <p className="projectSectionKicker">Next Step</p>
            <h2>{project.next}</h2>
          </div>

          <a href={project.url} target="_blank" rel="noreferrer">
            Visit Website
          </a>
        </section>
      </main>

      <PageCTA
        kicker="Need something similar?"
        title="Let’s build the page people see before they call."
        text="A clear website can turn scattered links, old pages, and vague first impressions into something people can understand quickly."
      />

      <SiteFooter />
    </>
  );
}