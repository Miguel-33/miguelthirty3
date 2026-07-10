import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import "./HomeFlow.css";
import SiteHeader from "./components/SiteHeader.jsx";

const PROJECTS = [
  {
    number: "01",
    name: "Isabella Transport",
    type: "Transportation Website",
    image: "/isabellaTransportHero.png",
    mobileImage: "/isabellaTransportHeroMobile.png",
    alt: "Isabella Transport website homepage with airport transportation services and a prominent booking call to action",
    description:
      "A clearer online experience built to make services easier to understand and contact easier to find.",
    result: "Clearer services. Faster contact. Stronger credibility.",
    href: "/proof-of-work/isabella-transport",
    tone: "isabella",
    layout: "sweep",
    note: "Clarksville to BNA",
  },
  {
    number: "02",
    name: "Joseph P. Day",
    type: "Campaign Website",
    image: "/josephPDayHero.png",
    mobileImage: "/josephPDayHeroMobile.png",
    alt: "Joseph P. Day campaign website homepage presenting campaign priorities, accomplishments, and voter information",
    description:
      "A modern public-facing campaign platform designed around credibility, accomplishments, endorsements, and voter-focused information.",
    result: "A more focused platform for a public-facing campaign.",
    href: "/proof-of-work/joseph-p-day",
    tone: "day",
    layout: "panorama",
    motion: "expand",
    note: "Public service, clearly presented",
  },
  {
    number: "03",
    name: "Gregory S. Chatman",
    type: "Personal Brand Website",
    image: "/gregorySChatmanHero.png",
    mobileImage: "/gregorySChatmanHeroMobile.png",
    alt: "Gregory S. Chatman personal brand website featuring his message, sermons, and video content",
    description:
      "An intentional digital stage for sermons, videos, writing, and a focused spiritual message.",
    result: "One clear home for the message and the work.",
    href: "/proof-of-work/gregory-chatman",
    tone: "chatman",
    layout: "editorial",
    motion: "editorial-reveal",
    note: "From religion to sincerity",
  },
  {
    number: "04",
    name: "Blayne’s Family Research",
    type: "Genealogy and Research Website",
    image: "/blaynesFamilyResearchHero.png",
    mobileImage: "/blaynesFamilyResearchHeroMobile.png",
    alt: "Blayne’s Family Research website homepage presenting genealogy and family research services",
    description:
      "A trustworthy research website designed to present services clearly and create a more confident inquiry path.",
    result: "A more credible, personal path from curiosity to inquiry.",
    href: "/proof-of-work/blaynes-family-research",
    tone: "blayne",
    layout: "archive",
    motion: "archive-lift",
    note: "Research with a human touch",
  },
];

const CAPABILITIES = [
  {
    number: "01",
    title: "Websites",
    text: "Strategic websites designed to make the business easier to understand, trust, and contact.",
    label: "Discuss a website",
  },
  {
    number: "02",
    title: "Brand and Identity",
    text: "Visual direction that helps the business feel recognizable, established, and consistent.",
    label: "Discuss your brand",
  },
  {
    number: "03",
    title: "Design Support",
    text: "Campaigns, flyers, social graphics, and digital materials built around the brand.",
    label: "Discuss design support",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

const PROJECT_FORM_ENDPOINT =
  "https://formspree.io/f/xvzybvrd";

const INITIAL_PROJECT_FORM = {
  name: "",
  email: "",
  business: "",
  projectType: "",
  details: "",
  budget: "",
};

function ProjectInquiryModal({
  open,
  onClose,
  returnFocusRef,
}) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const [form, setForm] = useState(INITIAL_PROJECT_FORM);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      firstFieldRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll(
          [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
          ].join(","),
        ) ?? [],
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      window.requestAnimationFrame(() => {
        returnFocusRef.current?.focus();
      });
    };
  }, [open, onClose, returnFocusRef]);

  useEffect(() => {
    if (open) return;

    const timer = window.setTimeout(() => {
      setForm(INITIAL_PROJECT_FORM);
      setStatus("idle");
      setMessage("");
    }, 250);

    return () => window.clearTimeout(timer);
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(
        PROJECT_FORM_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...form,
            _subject: `New Thirty3 project inquiry from ${form.name}`,
            source: "Thirty3 homepage popup",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to submit project inquiry.");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage(
        "Something did not go through. Please try again or use the full project request page.",
      );
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="showcase-home project-modal-host">
      <div
        className="project-modal"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={dialogRef}
          className="project-modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          aria-describedby="project-modal-description"
        >
          <button
            type="button"
            className="project-modal__close"
            onClick={onClose}
            aria-label="Close project inquiry form"
          >
            <span />
            <span />
          </button>

          {status === "success" ? (
            <div
              className="project-modal__success"
              role="status"
            >
              <p className="showcase-kicker">
                Message received
              </p>

              <h2>Good start.</h2>

              <p>
                Your project details are on their way to
                Thirty3. Miguel will review them and follow
                up directly.
              </p>

              <button
                type="button"
                className="showcase-button showcase-button--primary"
                onClick={onClose}
              >
                Back to the work
              </button>
            </div>
          ) : (
            <>
              <div className="project-modal__intro">
                <p className="showcase-kicker">
                  Start a project
                </p>

                <h2 id="project-modal-title">
                  Tell me what needs to move forward.
                </h2>

                <p id="project-modal-description">
                  A few details are enough to begin. We can
                  work through the rest together.
                </p>
              </div>

              <form
                className="project-modal__form"
                onSubmit={handleSubmit}
              >
                <div className="project-modal__grid">
                  <label>
                    <span>Name</span>
                    <input
                      ref={firstFieldRef}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label>
                    <span>Business name</span>
                    <input
                      type="text"
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </label>

                  <label>
                    <span>What do you need?</span>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Choose a project
                      </option>
                      <option value="Website">
                        Website
                      </option>
                      <option value="Website redesign">
                        Website redesign
                      </option>
                      <option value="Brand and identity">
                        Brand and identity
                      </option>
                      <option value="Flyer or campaign">
                        Flyer or campaign
                      </option>
                      <option value="Design support">
                        Ongoing design support
                      </option>
                      <option value="Not sure">
                        Not sure yet
                      </option>
                    </select>
                  </label>
                </div>

                <label>
                  <span>What should I know?</span>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    rows="4"
                    placeholder="What is not working now, and what would a better result look like?"
                    required
                  />
                </label>

                <label>
                  <span>Estimated investment</span>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a range
                    </option>
                    <option value="Under $1,000">
                      Under $1,000
                    </option>
                    <option value="$1,000–$2,500">
                      $1,000–$2,500
                    </option>
                    <option value="$2,500–$5,000">
                      $2,500–$5,000
                    </option>
                    <option value="$5,000+">
                      $5,000+
                    </option>
                    <option value="Not sure">
                      Not sure yet
                    </option>
                  </select>
                </label>

                {message && (
                  <p
                    className="project-modal__error"
                    role="alert"
                  >
                    {message}
                  </p>
                )}

                <div className="project-modal__actions">
                  <button
                    type="submit"
                    className="showcase-button showcase-button--primary"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Sending..."
                      : "Send project details"}

                    <ArrowIcon />
                  </button>

                  <Link
                    className="project-modal__full-link"
                    to="/request-website#website-request-form"
                    onClick={onClose}
                  >
                    Prefer the full request form?
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ScrollLetterText({ text }) {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;

    if (!element) return undefined;

    const letters = Array.from(
      element.querySelectorAll("[data-scroll-letter]"),
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches) {
      letters.forEach((letter) => {
        letter.classList.add("is-lit");
      });

      return undefined;
    }

    let frameId = 0;
    let active = false;

    const update = () => {
      frameId = 0;

      if (!active) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      const startPoint = viewportHeight * 0.9;
      const endPoint = viewportHeight * 0.08;

      const progress = Math.min(
        1,
        Math.max(
          0,
          (startPoint - rect.top) /
          (startPoint - endPoint),
        ),
      );

      const litCount = Math.round(
        progress * letters.length,
      );

      letters.forEach((letter, index) => {
        letter.classList.toggle(
          "is-lit",
          index < litCount,
        );
      });
    };

    const queueUpdate = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(update);
    };

    const activate = () => {
      if (active) return;

      active = true;

      window.addEventListener("scroll", queueUpdate, {
        passive: true,
      });

      window.addEventListener("resize", queueUpdate);

      queueUpdate();
    };

    const deactivate = () => {
      if (!active) return;

      active = false;

      window.removeEventListener(
        "scroll",
        queueUpdate,
      );

      window.removeEventListener(
        "resize",
        queueUpdate,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
        } else {
          deactivate();
        }
      },
      {
        rootMargin: "25% 0px 25% 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      deactivate();
      observer.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [text]);

  return (
    <span
      ref={textRef}
      className="showcase-scroll-letters"
      aria-label={text}
    >
      <span
        className="showcase-scroll-letters__visual"
        aria-hidden="true"
      >
        {text.split(" ").map((word, wordIndex) => (
          <b
            className="showcase-scroll-word"
            key={`${word}-${wordIndex}`}
          >
            {Array.from(word).map((letter, letterIndex) => (
              <i
                key={`${letter}-${letterIndex}`}
                className="showcase-scroll-letter"
                data-scroll-letter
              >
                {letter}
              </i>
            ))}
          </b>
        ))}
      </span>
    </span>
  );
}

function useProjectMotion(motion) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene || !motion) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const mobileLayout = window.matchMedia(
      "(max-width: 700px)",
    );

    let frameId = 0;
    let active = false;

    const applyFinalState = () => {
      scene.style.setProperty("--scene-progress", "1");
      scene.style.setProperty("--scene-scale", "1");
      scene.style.setProperty("--scene-y", "0px");
      scene.style.setProperty("--scene-x", "0px");
      scene.style.setProperty("--scene-opacity", "1");
      scene.style.setProperty("--scene-inset", "0%");
      scene.style.setProperty("--scene-clip", "0%");
      scene.style.setProperty("--scene-radius", "0px");
      scene.style.setProperty("--scene-tilt", "0deg");
      scene.style.setProperty("--archive-x", "0px");
      scene.style.setProperty("--archive-y", "0px");
      scene.style.setProperty("--archive-scale", "1");
      scene.style.setProperty("--archive-tilt", "0deg");
      scene.style.setProperty("--archive-back-x", "18px");
      scene.style.setProperty("--archive-back-y", "18px");
      scene.style.setProperty("--archive-back-tilt", "-0.6deg");
    };

    const update = () => {
      frameId = 0;

      if (!active) return;

      if (
        reducedMotion.matches ||
        mobileLayout.matches
      ) {
        applyFinalState();
        return;
      }

      const rect = scene.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || 1;

      const motionSettings =
        {
          expand: {
            start: 0.76,
            distance: 1.2,
            easing: 2,
          },
          "editorial-reveal": {
            start: 0.92,
            distance: 1,
            easing: 1.25,
          },
          "archive-lift": {
            start: 0.9,
            distance: 1.15,
            easing: 1.6,
          },
        }[motion] ?? {
          start: 0.8,
          distance: 1.1,
          easing: 1.5,
        };

      const startPoint =
        viewportHeight * motionSettings.start;

      const travelDistance =
        viewportHeight * motionSettings.distance;

      const rawProgress =
        (startPoint - rect.top) / travelDistance;

      const progress = Math.min(
        1,
        Math.max(0, rawProgress),
      );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          motionSettings.easing,
        );

      scene.style.setProperty(
        "--scene-progress",
        eased.toFixed(4),
      );

      if (motion === "expand") {
        const scale = 0.66 + eased * 0.34;
        const y = 64 * (1 - eased);
        const opacity = 0.72 + eased * 0.28;
        const inset = 6 * (1 - eased);
        const radius = 18 * (1 - eased);

        scene.style.setProperty(
          "--scene-scale",
          scale.toFixed(4),
        );

        scene.style.setProperty(
          "--scene-y",
          `${y.toFixed(2)}px`,
        );

        scene.style.setProperty(
          "--scene-opacity",
          opacity.toFixed(4),
        );

        scene.style.setProperty(
          "--scene-inset",
          `${inset.toFixed(2)}%`,
        );

        scene.style.setProperty(
          "--scene-radius",
          `${radius.toFixed(2)}px`,
        );
      }

      if (motion === "editorial-reveal") {
        const x = -120 * (1 - eased);
        const clip = 42 * (1 - eased);
        const tilt = -2.5 * (1 - eased);
        const opacity = 0.42 + eased * 0.58;

        scene.style.setProperty(
          "--scene-x",
          `${x.toFixed(2)}px`,
        );

        scene.style.setProperty(
          "--scene-clip",
          `${clip.toFixed(2)}%`,
        );

        scene.style.setProperty(
          "--scene-tilt",
          `${tilt.toFixed(3)}deg`,
        );

        scene.style.setProperty(
          "--scene-opacity",
          opacity.toFixed(4),
        );
      }
      if (motion === "archive-lift") {
        const x = 30 * (1 - eased);
        const y = 82 * (1 - eased);
        const scale = 0.91 + eased * 0.09;
        const tilt = 2.2 * (1 - eased);
        const opacity = 0.58 + eased * 0.42;

        const backX = 48 - eased * 30;
        const backY = 42 - eased * 24;
        const backTilt = -2.4 + eased * 1.8;

        scene.style.setProperty(
          "--archive-x",
          `${x.toFixed(2)}px`,
        );

        scene.style.setProperty(
          "--archive-y",
          `${y.toFixed(2)}px`,
        );

        scene.style.setProperty(
          "--archive-scale",
          scale.toFixed(4),
        );

        scene.style.setProperty(
          "--archive-tilt",
          `${tilt.toFixed(3)}deg`,
        );

        scene.style.setProperty(
          "--archive-back-x",
          `${backX.toFixed(2)}px`,
        );

        scene.style.setProperty(
          "--archive-back-y",
          `${backY.toFixed(2)}px`,
        );

        scene.style.setProperty(
          "--archive-back-tilt",
          `${backTilt.toFixed(3)}deg`,
        );

        scene.style.setProperty(
          "--scene-opacity",
          opacity.toFixed(4),
        );
      }
    };

    const queueUpdate = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(update);
    };

    const activate = () => {
      if (active) return;

      active = true;

      window.addEventListener(
        "scroll",
        queueUpdate,
        { passive: true },
      );

      window.addEventListener(
        "resize",
        queueUpdate,
      );

      queueUpdate();
    };

    const deactivate = () => {
      if (!active) return;

      active = false;

      window.removeEventListener(
        "scroll",
        queueUpdate,
      );

      window.removeEventListener(
        "resize",
        queueUpdate,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
        } else {
          deactivate();
        }
      },
      {
        rootMargin: "30% 0px 30% 0px",
        threshold: 0,
      },
    );

    observer.observe(scene);

    if (
      reducedMotion.matches ||
      mobileLayout.matches
    ) {
      applyFinalState();
    }

    return () => {
      deactivate();
      observer.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [motion]);

  return sceneRef;
}

function ProjectScene({ project }) {
  const sceneRef = useProjectMotion(project.motion);
  return (
    <section
      ref={sceneRef}
      className={[
        "showcase-project",
        `showcase-project--${project.tone}`,
        `showcase-project--${project.layout}`,
        project.motion
          ? `showcase-project--motion-${project.motion}`
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`project-${project.tone}-title`}
    >
      <div className="showcase-project__ambient" aria-hidden="true" />

      <div className="showcase-project__inner">
        <div className="showcase-project__copy" data-reveal>
          <div className="showcase-project__eyebrow">
            <span>{project.number}</span>
            <span>{project.type}</span>
          </div>

          <h2 id={`project-${project.tone}-title`}>{project.name}</h2>

          <p className="showcase-project__description">
            {project.description}
          </p>

          <p className="showcase-project__result">{project.result}</p>

          <Link className="showcase-text-link" to={project.href}>
            View case study
            <ArrowIcon />
          </Link>
        </div>

        <div className="showcase-project__visual" data-reveal>
          <div className="showcase-project__rail" aria-hidden="true">
            <span>{project.number}</span>
            <span>{project.note}</span>
          </div>
          <Link className="showcase-project__link" to={project.href} aria-label={`View case study for ${project.name}`}>
            <figure className="showcase-project__frame">
              <div className="showcase-browser-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <b>thirty3 / selected work</b>
              </div>

              <picture>
                {project.mobileImage && (
                  <source
                    media="(max-width: 700px)"
                    srcSet={project.mobileImage}
                  />
                )}

                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <figcaption>{project.note}</figcaption>
            </figure>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MiguelThirty3() {
  const location = useLocation();

  const [projectModalOpen, setProjectModalOpen] =
    useState(false);

  const modalTriggerRef = useRef(null);

  const openProjectModal = (event) => {
    modalTriggerRef.current = event.currentTarget;
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (!targetId) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState({}, document.title);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.state]);

  useEffect(() => {
    const root = document.querySelector(".showcase-home");

    if (!root) return undefined;

    const elements = root.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10%",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-shell showcase-home">
      <SiteHeader onStartProject={openProjectModal} />

      <main>
        <section
          className="showcase-hero"
          aria-labelledby="showcase-hero-title"
        >
          <div className="showcase-hero__grid" aria-hidden="true" />

          <div className="showcase-hero__inner">
            <div className="showcase-hero__copy" data-reveal>
              <p className="showcase-kicker">
                Thirty3 Digital Designs / Clarksville, Tennessee
              </p>

              <h1 id="showcase-hero-title">
                Make your business
                <span>look ready.</span>
              </h1>

              <p className="showcase-hero__lede">
                Strategic websites and visual design for businesses ready to
                look established and get chosen.
              </p>

              <div className="showcase-actions">
                <button
                  type="button"
                  className="showcase-button showcase-button--primary"
                  onClick={openProjectModal}
                >
                  Start a project
                  <ArrowIcon />
                </button>

                <a
                  className="showcase-button showcase-button--secondary"
                  href="#work"
                >
                  View selected work
                </a>
              </div>

              <ul
                className="showcase-proof"
                aria-label="Studio highlights"
              >
                <li>Clarksville, Tennessee</li>
                <li>Direct collaboration</li>
                <li>Custom-built websites</li>
              </ul>
            </div>

            <div className="showcase-hero__visual" data-reveal>
              <div className="showcase-hero__index" aria-hidden="true">
                <span>Featured / 01</span>
                <span>Transportation website</span>
              </div>

              <div className="showcase-hero__browser">
                <div className="showcase-browser-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <b>isabellatransport.com</b>
                </div>

                <img
                  src="/isabellaTransportHero.png"
                  alt="Isabella Transport website homepage designed by Thirty3 Digital Designs"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              <div className="showcase-hero__crop" aria-hidden="true">
                <img
                  src="/isabellaTransportHeroMobile.png"
                  alt=""
                  decoding="async"
                />
              </div>

              <div className="showcase-hero__caption">
                <span>Isabella Transport</span>
                <strong>
                  Clearer services. Stronger first impression.
                </strong>
              </div>
            </div>
          </div>

          <a
            className="showcase-scroll-cue"
            href="#work"
            aria-label="Scroll to selected work"
          >
            <span>Selected work</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section
          id="work"
          className="showcase-work-intro"
          aria-labelledby="showcase-work-title"
        >
          <div className="showcase-work-intro__inner" data-reveal>
            <p className="showcase-kicker">Selected work / 2026</p>

            <h2 id="showcase-work-title">
              Work for businesses
              <ScrollLetterText text="Ready to be taken seriously." />
            </h2>

            <p>
              Different businesses should not leave with the same website.
              Each project gets its own voice, pace, and visual logic.
            </p>
          </div>
        </section>

        <div className="showcase-projects">
          {PROJECTS.map((project) => (
            <ProjectScene project={project} key={project.name} />
          ))}
        </div>

        <section
          id="services"
          className="showcase-capabilities"
          aria-labelledby="showcase-capabilities-title"
        >
          <div className="showcase-capabilities__head" data-reveal>
            <p className="showcase-kicker">
              Focused creative support
            </p>

            <h2 id="showcase-capabilities-title">
              Three ways to
              <ScrollLetterText text="move the business forward." />
            </h2>
          </div>

          <div className="showcase-capabilities__list">
            {CAPABILITIES.map((capability) => (
              <article
                className="showcase-capability"
                key={capability.number}
                data-reveal
              >
                <span className="showcase-capability__number">
                  {capability.number}
                </span>

                <h3>{capability.title}</h3>

                <p>{capability.text}</p>

                <Link
                  to="/request-website"
                  aria-label={capability.label}
                >
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="studio"
          className="showcase-studio"
          aria-labelledby="showcase-studio-title"
        >
          <div className="showcase-studio__mark" aria-hidden="true">
            <span>THIR</span>
            <span>TY3</span>
          </div>

          <div className="showcase-studio__copy" data-reveal>
            <p className="showcase-kicker">The studio</p>

            <h2 id="showcase-studio-title">
              Small studio.
              <span>Serious attention.</span>
            </h2>

            <p>
              Thirty3 is led by Miguel. Every project gets direct
              collaboration, thoughtful strategy, and design shaped around
              the business behind it.
            </p>

            <ul>
              <li>No mystery team</li>
              <li>Strategy before decoration</li>
              <li>Custom work, not a template swap</li>
              <li>Clarksville and Nashville focused</li>
              <li>Bilingual support when it matters</li>
            </ul>
          </div>
        </section>

        <section
          id="contact"
          className="showcase-cta"
          aria-labelledby="showcase-cta-title"
        >
          <div className="showcase-cta__inner" data-reveal>
            <p className="showcase-kicker">The next impression</p>

            <h2 id="showcase-cta-title">
              Bring the business.
              <ScrollLetterText text="Let’s shape how people see it." />
            </h2>

            <p>
              Bring the rough idea, outdated website, or project sitting in
              your notes. We will shape the right next move.
            </p>

            <div className="showcase-actions showcase-actions--centered">
              <button
                type="button"
                className="showcase-button showcase-button--primary"
                onClick={openProjectModal}
              >
                Start a project
                <ArrowIcon />
              </button>

              <Link
                className="showcase-button showcase-button--secondary"
                to="/proof-of-work"
              >
                View all work
              </Link>
            </div>
          </div>

          <div
            className="showcase-cta__footer"
            aria-label="Thirty3 studio details"
          >
            <span>Thirty3 Digital Designs</span>
            <span>Clarksville / Nashville</span>
            <span>Websites / Identity / Design</span>
          </div>
        </section>
      </main>

      <ProjectInquiryModal
        open={projectModalOpen}
        onClose={closeProjectModal}
        returnFocusRef={modalTriggerRef}
      />
    </div>
  );
}