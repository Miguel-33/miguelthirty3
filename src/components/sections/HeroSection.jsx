import { forwardRef } from "react";
import ArrowIcon from "../ArrowIcon.jsx";

function HeroLine({ accent = false, children }) {
  const words = children.split(" ");
  const LineTag = accent ? "strong" : "span";

  return (
    <span className="homeHero__lineWrap">
      <LineTag
        className={accent ? "homeHero__emphasis" : undefined}
        data-hero-emphasis={accent ? "" : undefined}
      >
        {words.map((word, index) => (
          <span
            className="homeHero__word"
            data-hero-word={accent ? "accent" : "base"}
            key={`${word}-${index}`}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </LineTag>
    </span>
  );
}

const HeroSection = forwardRef(function HeroSection({ onStartProject }, ref) {
  return (
    <section className="homeHero" ref={ref} aria-labelledby="home-hero-title">
      <div className="homeHero__screen" data-hero-screen>
        <div
          className="homeHero__emblemField"
          data-hero-signal
          aria-hidden="true"
        >
          <span
            className="homeHero__emblem homeHero__emblem--strategic"
            data-hero-emblem
            data-hero-depth="1.15"
          >
            <img
              src="/hero-emblems/premium-set/strategic-33-premium.png"
              alt=""
            />
          </span>

          <span
            className="homeHero__emblem homeHero__emblem--local"
            data-hero-emblem
            data-hero-depth="0.72"
          >
            <img
              src="/hero-emblems/premium-set/built-tennessee-premium.png"
              alt=""
            />
          </span>

          <span
            className="homeHero__emblem homeHero__emblem--work"
            data-hero-emblem
            data-hero-depth="0.88"
          >
            <img
              src="/hero-emblems/premium-set/websites-that-work-premium.png"
              alt=""
            />
          </span>

          <span
            className="homeHero__emblem homeHero__emblem--clear"
            data-hero-emblem
            data-hero-depth="1.02"
          >
            <img
              src="/hero-emblems/premium-set/clear-thinking-premium.png"
              alt=""
            />
          </span>
        </div>

        <div className="homeHero__inner">
          <div className="homeHero__content">
            <h1
              id="home-hero-title"
              aria-label="Your business is already memorable. Let it catch up."
            >
              <HeroLine>Your business is</HeroLine>
              <HeroLine>already memorable.</HeroLine>
              <HeroLine accent>Let it catch up.</HeroLine>
            </h1>

            <div className="homeHero__supportRow">
              <p className="homeHero__support" data-hero-support>
                Websites that make your value clear, your business credible, and
                the next step easy.
              </p>

              <div className="homeHero__actions">
                <button
                  type="button"
                  className="homeButton homeButton--yellow"
                  data-hero-action
                  data-magnetic
                  onClick={(event) =>
                    onStartProject(event, "", "Thirty3 homepage hero")
                  }
                >
                  Start a Project
                  <span className="homeButton__icon" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </button>

                <a
                  className="homeTextLink homeTextLink--light"
                  href="#work"
                  data-hero-action
                >
                  See the Work <ArrowIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="homeHero__footer" data-hero-footer>
            <p>
              Real client work <span aria-hidden="true">·</span> Direct access
              to Miguel
            </p>
            <a href="#story">
              Scroll to discover <span aria-hidden="true" />
            </a>
            <p>Clarksville + Nashville</p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
