import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/project-inquiry-modal.css";

const PROJECT_FORM_ENDPOINT = "https://formspree.io/f/xvzybvrd";

const PROJECT_OPTIONS = [
  { value: "Website", label: "New website", note: "Build a credible online home from the ground up." },
  { value: "Website redesign", label: "Website redesign", note: "Replace a site that no longer reflects the business." },
  { value: "Brand and identity", label: "Brand + identity", note: "Create or sharpen the visual foundation." },
  { value: "Flyer or campaign", label: "Flyer or campaign", note: "Give one offer, event, or message a stronger stage." },
  { value: "Design support", label: "Ongoing design", note: "Keep the brand consistent across recurring needs." },
  { value: "Not sure", label: "Not sure yet", note: "Start with the problem. We will shape the right project." },
];

const BUDGET_OPTIONS = [
  { value: "Under $1,000", label: "Under $1,000" },
  { value: "$1,000–$2,500", label: "$1,000–$2,500" },
  { value: "$2,500–$5,000", label: "$2,500–$5,000" },
  { value: "$5,000+", label: "$5,000+" },
  { value: "Not sure", label: "Not sure yet" },
];

function createInitialForm(initialProjectType = "") {
  return {
    name: "",
    email: "",
    business: "",
    projectType: initialProjectType,
    currentSite: "",
    details: "",
    budget: "",
  };
}

function createSteps(projectType) {
  return [
    "projectType",
    "business",
    ...(projectType === "Website redesign" ? ["currentSite"] : []),
    "details",
    "budget",
    "name",
    "email",
  ];
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="m11 4-5 5 5 5M6 9h9" />
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
  const formRef = useRef(null);
  const activeFieldRef = useRef(null);
  const advanceTimerRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const questionId = useId();
  const [form, setForm] = useState(() => createInitialForm(initialProjectType));
  const [currentStepId, setCurrentStepId] = useState(
    initialProjectType ? "business" : "projectType",
  );
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const steps = useMemo(() => createSteps(form.projectType), [form.projectType]);
  const currentStepIndex = Math.max(steps.indexOf(currentStepId), 0);
  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  const clearAdvanceTimer = () => {
    if (!advanceTimerRef.current) return;
    window.clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = null;
  };

  useEffect(() => clearAdvanceTimer, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      activeFieldRef.current?.focus({
        preventScroll: true,
      });
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
    if (!open || status === "success") return undefined;

    const focusFrame = window.requestAnimationFrame(() => {
      formRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      activeFieldRef.current?.focus({
        preventScroll: true,
      });
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [currentStepId, open, status]);

  useEffect(() => {
    if (open) return undefined;

    const timer = window.setTimeout(() => {
      const nextForm = createInitialForm(initialProjectType);
      setForm(nextForm);
      setCurrentStepId(initialProjectType ? "business" : "projectType");
      setStatus("idle");
      setMessage("");
    }, 250);

    return () => window.clearTimeout(timer);
  }, [initialProjectType, open]);

  const updateField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setMessage("");
  };

  const handleChange = (event) => {
    updateField(event.target.name, event.target.value);
  };

  const goToStep = (stepId) => {
    clearAdvanceTimer();
    setCurrentStepId(stepId);
    setMessage("");
  };

  const goBack = () => {
    const previousStep = steps[currentStepIndex - 1];
    if (previousStep) goToStep(previousStep);
  };

  const validateCurrentStep = () => {
    if (currentStepId === "projectType" && !form.projectType) {
      setMessage("Choose the closest project type to continue.");
      return false;
    }

    if (currentStepId === "details" && !form.details.trim()) {
      setMessage("Give me a little context so I know where to begin.");
      return false;
    }

    if (currentStepId === "name" && !form.name.trim()) {
      setMessage("Add your name to continue.");
      return false;
    }

    if (currentStepId === "email") {
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

      if (!emailIsValid) {
        setMessage("Enter a valid email address.");
        return false;
      }
    }

    return true;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;

    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) goToStep(nextStep);
  };

  const chooseProjectType = (value) => {
    clearAdvanceTimer();
    setForm((current) => ({
      ...current,
      projectType: value,
      currentSite: value === "Website redesign" ? current.currentSite : "",
    }));
    setMessage("");
    advanceTimerRef.current = window.setTimeout(() => {
      setCurrentStepId("business");
      advanceTimerRef.current = null;
    }, 180);
  };

  const chooseBudget = (value) => {
    clearAdvanceTimer();
    updateField("budget", value);
    advanceTimerRef.current = window.setTimeout(() => {
      setCurrentStepId("name");
      advanceTimerRef.current = null;
    }, 180);
  };

  const handleInputKeyDown = (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    if (event.currentTarget.tagName === "TEXTAREA") return;

    event.preventDefault();

    if (currentStepId === "email") {
      event.currentTarget.form?.requestSubmit();
      return;
    }

    goNext();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStepId !== "email") {
      goNext();
      return;
    }

    if (!validateCurrentStep()) return;

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

  const renderStep = () => {
    if (currentStepId === "projectType") {
      return (
        <div className="projectInquiryModal__stepBody" role="group" aria-labelledby={titleId}>
          <div className="projectInquiryModal__choices projectInquiryModal__choices--projects">
            {PROJECT_OPTIONS.map((option, index) => (
              <button
                ref={index === 0 ? activeFieldRef : undefined}
                type="button"
                className={form.projectType === option.value ? "is-selected" : ""}
                onClick={() => chooseProjectType(option.value)}
                aria-pressed={form.projectType === option.value}
                key={option.value}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{option.label}</strong>
                <small>{option.note}</small>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentStepId === "business") {
      return (
        <label className="projectInquiryModal__field" htmlFor={`${questionId}-business`}>
          <span>Business, organization, or project name</span>
          <input
            ref={activeFieldRef}
            id={`${questionId}-business`}
            type="text"
            name="business"
            value={form.business}
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
            autoComplete="organization"
            placeholder="Thirty3 Digital Designs"
          />
        </label>
      );
    }

    if (currentStepId === "currentSite") {
      return (
        <label className="projectInquiryModal__field" htmlFor={`${questionId}-site`}>
          <span>Current website</span>
          <input
            ref={activeFieldRef}
            id={`${questionId}-site`}
            type="url"
            name="currentSite"
            value={form.currentSite}
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
            autoComplete="url"
            inputMode="url"
            placeholder="https://yourwebsite.com"
          />
        </label>
      );
    }

    if (currentStepId === "details") {
      return (
        <label className="projectInquiryModal__field" htmlFor={`${questionId}-details`}>
          <span>Project context</span>
          <textarea
            ref={activeFieldRef}
            id={`${questionId}-details`}
            name="details"
            value={form.details}
            onChange={handleChange}
            rows="5"
            placeholder="What is not working now, and what would a better result look like?"
            required
          />
        </label>
      );
    }

    if (currentStepId === "budget") {
      return (
        <div className="projectInquiryModal__stepBody" role="group" aria-labelledby={titleId}>
          <div className="projectInquiryModal__choices projectInquiryModal__choices--budget">
            {BUDGET_OPTIONS.map((option, index) => (
              <button
                ref={index === 0 ? activeFieldRef : undefined}
                type="button"
                className={form.budget === option.value ? "is-selected" : ""}
                onClick={() => chooseBudget(option.value)}
                aria-pressed={form.budget === option.value}
                key={option.value}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{option.label}</strong>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentStepId === "name") {
      return (
        <label className="projectInquiryModal__field" htmlFor={`${questionId}-name`}>
          <span>Your name</span>
          <input
            ref={activeFieldRef}
            id={`${questionId}-name`}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
            autoComplete="name"
            placeholder="Miguel De Jesus"
            required
          />
        </label>
      );
    }

    return (
      <label className="projectInquiryModal__field" htmlFor={`${questionId}-email`}>
        <span>Email address</span>
        <input
          ref={activeFieldRef}
          id={`${questionId}-email`}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourbusiness.com"
          required
        />
      </label>
    );
  };

  const stepContent = {
    projectType: {
      eyebrow: "First, the big picture",
      title: "What are we building?",
      description: "Choose the closest starting point. Nothing here locks you into a final scope.",
    },
    business: {
      eyebrow: "Make it real",
      title: "What should I call the business?",
      description: "A business, organization, or project name is enough. You can skip this for now.",
    },
    currentSite: {
      eyebrow: "The starting point",
      title: "Where does the current website live?",
      description: "Share the link so I can understand what is already there. You can skip this too.",
    },
    details: {
      eyebrow: "The part that matters",
      title: "What needs to move forward?",
      description: "Tell me what feels stuck, unclear, outdated, or ready for something better.",
    },
    budget: {
      eyebrow: "Roughly speaking",
      title: "What investment range feels realistic?",
      description: "A range helps me recommend the right path. “Not sure yet” is a perfectly useful answer.",
    },
    name: {
      eyebrow: "Almost there",
      title: "What should I call you?",
      description: "You will work directly with Miguel, not a sales team or mystery account manager.",
    },
    email: {
      eyebrow: "Final step",
      title: "Where should I send the next step?",
      description: "I will review the details and follow up directly. No automated sales parade.",
    },
  }[currentStepId];

  const canSkip = currentStepId === "business" || currentStepId === "currentSite";
  const showsContinue = !["projectType", "budget", "email"].includes(currentStepId);

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
              <div className="projectInquiryModal__successMark" aria-hidden="true">33</div>
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
              <aside className="projectInquiryModal__rail" aria-label="Inquiry progress">
                <div>
                  <p className="projectInquiryModal__kicker">Start a project</p>
                  <strong>One clear question at a time.</strong>
                  <p>No polished brief required. A few honest answers are enough to begin.</p>
                </div>

                <div className="projectInquiryModal__progressBlock">
                  <div className="projectInquiryModal__progressMeta">
                    <span>Step {String(currentStepIndex + 1).padStart(2, "0")}</span>
                    <span>{String(steps.length).padStart(2, "0")}</span>
                  </div>
                  <div
                    className="projectInquiryModal__progress"
                    role="progressbar"
                    aria-label="Project inquiry progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={progress}
                  >
                    <span style={{ "--project-progress": `${progress}%` }} />
                  </div>
                  <p>{progress}% complete</p>
                </div>

                <Link
                  className="projectInquiryModal__fullLink"
                  to="/request-website#website-request-form"
                  onClick={onClose}
                >
                  Prefer the full request form?
                </Link>
              </aside>

              <form
                ref={formRef}
                className={`projectInquiryModal__form ${currentStepId === "projectType" ? "is-project-step" : ""
                  }`}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="projectInquiryModal__mobileProgress" aria-hidden="true">
                  <span>Step {currentStepIndex + 1} of {steps.length}</span>
                  <div><i style={{ "--project-progress": `${progress}%` }} /></div>
                </div>

                <div className="projectInquiryModal__question" key={currentStepId} aria-live="polite">
                  <p className="projectInquiryModal__questionEyebrow">{stepContent.eyebrow}</p>
                  <h2 id={titleId}>{stepContent.title}</h2>
                  <p id={descriptionId}>{stepContent.description}</p>

                  <div className="projectInquiryModal__answer" id={questionId}>
                    {renderStep()}
                  </div>
                </div>

                {message && (
                  <p className="projectInquiryModal__error" role="alert">
                    {message}
                  </p>
                )}

                <div className="projectInquiryModal__actions">
                  <button
                    type="button"
                    className="projectInquiryModal__backButton"
                    onClick={goBack}
                    disabled={currentStepIndex === 0 || status === "submitting"}
                  >
                    <BackIcon /> Back
                  </button>

                  <div className="projectInquiryModal__nextActions">
                    {canSkip && (
                      <button
                        type="button"
                        className="projectInquiryModal__skipButton"
                        onClick={goNext}
                      >
                        Skip for now
                      </button>
                    )}

                    {showsContinue && (
                      <button
                        type="button"
                        className="projectInquiryModal__primaryButton"
                        onClick={goNext}
                      >
                        Continue <ArrowIcon />
                      </button>
                    )}

                    {currentStepId === "email" && (
                      <button
                        type="submit"
                        className="projectInquiryModal__primaryButton"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Sending..." : "Send project details"}
                        <ArrowIcon />
                      </button>
                    )}
                  </div>
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