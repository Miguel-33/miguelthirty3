import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/project-inquiry-modal.css";

const PROJECT_FORM_ENDPOINT = "https://formspree.io/f/xvzybvrd";

function createInitialForm(initialProjectType = "") {
  return {
    name: "",
    email: "",
    business: "",
    projectType: initialProjectType,
    details: "",
    budget: "",
  };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

export default function ProjectInquiryModal({
  open,
  onClose,
  returnFocusRef,
  source = "Thirty3 website popup",
  initialProjectType = "",
}) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const [form, setForm] = useState(() => createInitialForm(initialProjectType));
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      firstFieldRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
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

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      window.requestAnimationFrame(() => {
        const returnTarget = returnFocusRef?.current;

        if (returnTarget && document.contains(returnTarget)) {
          returnTarget.focus();
        }
      });
    };
  }, [open, onClose, returnFocusRef]);

  useEffect(() => {
    if (open) return undefined;

    const timer = window.setTimeout(() => {
      setForm(createInitialForm(initialProjectType));
      setStatus("idle");
      setMessage("");
    }, 250);

    return () => window.clearTimeout(timer);
  }, [initialProjectType, open]);

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
      const response = await fetch(PROJECT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          _subject: `New Thirty3 project inquiry from ${form.name}`,
          source,
          page: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit project inquiry.");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage(
        "Something did not go through. Please try again or use the full project request form.",
      );
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="projectInquiryModalHost">
      <div
        className="projectInquiryModal"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          className="projectInquiryModal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          aria-busy={status === "submitting"}
        >
          <button
            type="button"
            className="projectInquiryModal__close"
            onClick={onClose}
            aria-label="Close project inquiry form"
          >
            <span />
            <span />
          </button>

          {status === "success" ? (
            <div className="projectInquiryModal__success" role="status">
              <p className="projectInquiryModal__kicker">Message received</p>
              <h2 id={titleId}>Good start.</h2>
              <p id={descriptionId}>
                Your project details are on their way to Thirty3. Miguel will review them and
                follow up directly.
              </p>
              <button
                type="button"
                className="projectInquiryModal__primaryButton"
                onClick={onClose}
              >
                Back to the page
              </button>
            </div>
          ) : (
            <>
              <div className="projectInquiryModal__intro">
                <p className="projectInquiryModal__kicker">Start a project</p>
                <h2 id={titleId}>Tell me what needs to move forward.</h2>
                <p id={descriptionId}>
                  A few details are enough to begin. We can work through the rest together.
                </p>
              </div>

              <form className="projectInquiryModal__form" onSubmit={handleSubmit}>
                <div className="projectInquiryModal__grid">
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
                      <option value="">Choose a project</option>
                      <option value="Website">Website</option>
                      <option value="Website redesign">Website redesign</option>
                      <option value="Brand and identity">Brand and identity</option>
                      <option value="Flyer or campaign">Flyer or campaign</option>
                      <option value="Design support">Ongoing design support</option>
                      <option value="Not sure">Not sure yet</option>
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
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select a range</option>
                    <option value="Under $1,000">Under $1,000</option>
                    <option value="$1,000–$2,500">$1,000–$2,500</option>
                    <option value="$2,500–$5,000">$2,500–$5,000</option>
                    <option value="$5,000+">$5,000+</option>
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </label>

                {message && (
                  <p className="projectInquiryModal__error" role="alert">
                    {message}
                  </p>
                )}

                <div className="projectInquiryModal__actions">
                  <button
                    type="submit"
                    className="projectInquiryModal__primaryButton"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Send project details"}
                    <ArrowIcon />
                  </button>

                  <Link
                    className="projectInquiryModal__fullLink"
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
