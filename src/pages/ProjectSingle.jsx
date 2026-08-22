import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "../data/projects";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import PageCTA from "../components/PageCTA";
import "../styles/project-single.css";
import "../styles/site-flow.css";

const projectScreenshots = {
  "isabella-transport": {
    src: "/isabellaTransportHero.png",
    alt: "Isabella Transport website homepage screenshot",
  },
  "joseph-p-day": {
    src: "/josephPDayHero.png",
    alt: "Joseph P. Day campaign website homepage presenting campaign priorities, accomplishments, and voter information",
  },
  "gregory-chatman": {
    src: "/gregorySChatmanHero.png",
    alt: "Gregory S. Chatman website homepage screenshot",
  },
  "blaynes-family-research": {
    src: "/blaynesFamilyResearchHero.png",
    alt: "Blayne’s Family Research website homepage screenshot",
  },
  "glamp-camp-nashville": {
    src: "/glampCampNashvilleHero.png",
    mobileSrc: "/glampCampNashvilleHeroMobile.png",
    alt: "Glamp Camp Nashville luxury backyard glamping website designed by Thirty3 Digital Designs",
  },
};

export default function ProjectSingle() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <>
        <Helmet>
          <title>Project Not Found | Thirty3 Digital Designs</title>
          <meta name="robots" content="noindex" />
        </Helmet>
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
  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];
  const siteUrl = "https://miguelthirty3.com";
  const canonicalUrl = `${siteUrl}/proof-of-work/${project.slug}`;
  const seoTitle = `${project.title} Website Case Study | Thirty3 Digital Designs`;
  const seoDescription = project.excerpt;
  const shareImage = screenshot?.src
    ? `${siteUrl}${screenshot.src}`
    : `${siteUrl}/thirty3-og-2026.png`;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Thirty3 Digital Designs" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={shareImage} />
      </Helmet>

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
          <div><span>Industry</span><strong>{project.industry}</strong></div>
          <div><span>Platform</span><strong>{project.platform}</strong></div>
          <div><span>Focus</span><strong>{project.focus}</strong></div>
          <div><span>Status</span><strong>{project.status}</strong></div>
        </section>

        {screenshot ? (
          <section className="projectImageShowcase" aria-label={`${project.title} website screenshot`}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit the live ${project.title} website`}>
              <picture>
                {screenshot.mobileSrc && <source media="(max-width: 700px)" srcSet={screenshot.mobileSrc} />}
                <img src={screenshot.src} alt={screenshot.alt} />
              </picture>
              <span className="projectImageShowcase__link">Visit live website ↗</span>
            </a>
          </section>
        ) : (
          <section className="projectImagePlaceholder">
            <div><span>Screenshot Area</span><strong>Add project homepage or mobile image here.</strong></div>
          </section>
        )}

        <section className="projectStory">
          <article>
            <p className="projectSectionKicker">The Challenge</p>
            <h2>{project.challengeTitle || "Before the website, trust had to work harder."}</h2>
            <p>{project.challenge}</p>
          </article>
          <article>
            <p className="projectSectionKicker">The Solution</p>
            <h2>{project.solutionTitle || "A cleaner path from first impression to first contact."}</h2>
            <p>{project.solution}</p>
          </article>
        </section>

        <section className="projectServices">
          <div><p className="projectSectionKicker">Services</p><h2>What Thirty3 handled.</h2></div>
          <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
        </section>

        <section className="projectResults">
          <p className="projectSectionKicker">What Improved</p>
          <h2>How the website got stronger.</h2>
          <div className="projectResults__grid">
            {project.results.map((result) => <div key={result}><strong>{result}</strong></div>)}
          </div>
        </section>

        {project.quote && (
          <section className="projectQuote">
            <blockquote>“{project.quote}”</blockquote>
            <p>Client feedback{project.quoteAttribution && ` · ${project.quoteAttribution}`}</p>
          </section>
        )}

        <section className="projectNext">
          <div><p className="projectSectionKicker">Next Step</p><h2>{project.next}</h2></div>
          <a href={project.url} target="_blank" rel="noreferrer">Visit Website</a>
        </section>

        <nav className="siteJourney siteJourney--project" aria-label="More case studies">
          <p className="siteJourney__label">Keep exploring</p>
          <div className="siteJourney__grid">
            {previousProject ? (
              <Link to={`/proof-of-work/${previousProject.slug}`}>
                <span>Previous project</span><strong>{previousProject.title}</strong>
              </Link>
            ) : <span aria-hidden="true" />}
            {nextProject ? (
              <Link to={`/proof-of-work/${nextProject.slug}`}>
                <span>Next project</span><strong>{nextProject.title}</strong>
              </Link>
            ) : (
              <Link to="/proof-of-work"><span>Back to all work</span><strong>See every case study</strong></Link>
            )}
          </div>
        </nav>
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