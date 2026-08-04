import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../styles/home-hero.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

export default function HomeHero({
  project,
  introPlaying = false,
  onStartProject,
}) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || introPlaying) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      const lines = gsap.utils.toArray(".thirty3Hero__lineInner");
      const support = hero.querySelector("[data-hero-support]");
      const actions = hero.querySelector("[data-hero-actions]");
      const visual = hero.querySelector("[data-hero-visual]");
      const image = hero.querySelector("[data-hero-image]");
      const meta = hero.querySelector("[data-hero-meta]");

      gsap.set(lines, { yPercent: 112, rotate: 1.2 });
      gsap.set([support, actions], { autoAlpha: 0, y: 22 });
      gsap.set(visual, {
        autoAlpha: 0,
        y: 72,
        clipPath: "inset(14% 0% 0% 16%)",
      });
      gsap.set(image, { scale: 1.08 });
      gsap.set(meta, { autoAlpha: 0, y: 16 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(lines, {
          yPercent: 0,
          rotate: 0,
          duration: 0.82,
          stagger: 0.08,
        })
        .to(support, { autoAlpha: 1, y: 0, duration: 0.58 }, "-=0.38")
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.58 }, "-=0.4")
        .to(
          visual,
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.58",
        )
        .to(image, { scale: 1, duration: 1.15, ease: "power3.out" }, "<")
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.42");
    }, hero);

    return () => context.revert();
  }, [introPlaying]);

  return (
    <section
      className="thirty3Hero"
      aria-labelledby="home-hero-title"
      ref={heroRef}
    >
      <div className="homeShell thirty3Hero__shell">
        <div className="thirty3Hero__copy">
          <h1 className="thirty3Hero__title" id="home-hero-title">
            <span className="thirty3Hero__line">
              <span className="thirty3Hero__lineInner">Your business</span>
            </span>
            <span className="thirty3Hero__line">
              <span className="thirty3Hero__lineInner">
                has <em>outgrown</em>
              </span>
            </span>
            <span className="thirty3Hero__line">
              <span className="thirty3Hero__lineInner">your website.</span>
            </span>
          </h1>

          <div className="thirty3Hero__support" data-hero-support>
            <p>
              Thirty3 creates the digital presence your business has already earned.
            </p>
          </div>

          <div className="thirty3Hero__actions" data-hero-actions>
            <button
              type="button"
              className="thirty3Hero__primary"
              aria-haspopup="dialog"
              onClick={onStartProject}
            >
              <span>Start a Project</span>
              <span className="thirty3Hero__primaryIcon" aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>

            <a className="thirty3Hero__secondary" href="#work">
              See selected work <ArrowIcon />
            </a>
          </div>
        </div>

        <Link
          className="thirty3Hero__visual"
          to={project.href}
          aria-label={`View the ${project.name} case study`}
          data-hero-visual
        >
          <picture>
            {project.mobileImage && (
              <source media="(max-width: 760px)" srcSet={project.mobileImage} />
            )}
            <img
              src={project.image}
              alt={project.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              data-hero-image
            />
          </picture>

          <span className="thirty3Hero__visualShade" aria-hidden="true" />

          <span className="thirty3Hero__projectMeta" data-hero-meta>
            <span>Selected work</span>
            <strong>{project.name}</strong>
            <small>{project.result}</small>
          </span>

          <span className="thirty3Hero__caseLink" aria-hidden="true">
            View case study <ArrowIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}
