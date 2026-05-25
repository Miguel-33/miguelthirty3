import { useState, useEffect, useRef, useReducer } from "react";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────── */
const T = {
  ink: "#232528",
  cream: "#f8f8f8",
  yellow: "#fbee16",
  navy: "#0e1c3d",
  cobalt: "#1a3a6e",
  white: "#ffffff",
  mid: "#6b7280",
  border: "#e5e7eb",
  orange: "#ff5c1a",   // small accent only
};

/* ─────────────────────────────────────────────────────────────
   TILES
───────────────────────────────────────────────────────────── */
const TILES = [
  {
    id: "website",
    label: "Website",
    sub: "Get online or level up what you have.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="24" height="18" rx="2" />
        <line x1="2" y1="10" x2="26" y2="10" />
        <circle cx="6" cy="7" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="7" r="1" fill="currentColor" stroke="none" />
        <line x1="8" y1="15" x2="20" y2="15" />
        <line x1="8" y1="19" x2="16" y2="19" />
      </svg>
    ),
  },
  {
    id: "flyer",
    label: "Flyer",
    sub: "Promote an event, service, or announcement.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="18" height="24" rx="2" />
        <line x1="9" y1="8" x2="19" y2="8" />
        <line x1="9" y1="12" x2="19" y2="12" />
        <line x1="9" y1="16" x2="15" y2="16" />
        <rect x="9" y="19" width="10" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: "logo",
    label: "Logo / Brand",
    sub: "Build a look people recognize and remember.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="14,3 26,21 2,21" />
        <circle cx="14" cy="14" r="3" />
      </svg>
    ),
  },
  {
    id: "card",
    label: "Business Card",
    sub: "Make a strong first impression, every time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="24" height="14" rx="2" />
        <line x1="7" y1="13" x2="14" y2="13" />
        <line x1="7" y1="17" x2="11" y2="17" />
        <circle cx="20" cy="14" r="3" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Social Post",
    sub: "Graphics that stop the scroll.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="22" height="22" rx="4" />
        <circle cx="14" cy="14" r="5" />
        <circle cx="20.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "qr",
    label: "QR Sign",
    sub: "Bridge the physical world to wherever you need.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="9" height="9" rx="1" />
        <rect x="16" y="3" width="9" height="9" rx="1" />
        <rect x="3" y="16" width="9" height="9" rx="1" />
        <rect x="5" y="5" width="5" height="5" rx="0.5" fill="currentColor" stroke="none" opacity="0.4" />
        <rect x="18" y="5" width="5" height="5" rx="0.5" fill="currentColor" stroke="none" opacity="0.4" />
        <rect x="5" y="18" width="5" height="5" rx="0.5" fill="currentColor" stroke="none" opacity="0.4" />
        <line x1="16" y1="16" x2="19" y2="16" />
        <line x1="22" y1="16" x2="25" y2="16" />
        <line x1="16" y1="20" x2="16" y2="23" />
        <line x1="20" y1="20" x2="25" y2="20" />
        <line x1="25" y1="22" x2="25" y2="25" />
        <line x1="20" y1="25" x2="23" y2="25" />
      </svg>
    ),
  },
  {
    id: "event",
    label: "Event Graphics",
    sub: "Programs, banners, tickets, and more.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="22" height="20" rx="2" />
        <line x1="3" y1="11" x2="25" y2="11" />
        <line x1="9" y1="3" x2="9" y2="7" />
        <line x1="19" y1="3" x2="19" y2="7" />
        <line x1="8" y1="16" x2="20" y2="16" />
        <line x1="8" y1="20" x2="15" y2="20" />
      </svg>
    ),
  },
  {
    id: "other",
    label: "Something Else",
    sub: "Not sure? Just describe it — we'll figure it out.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 10c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 2-3 4" />
        <circle cx="14" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   DISCOVERY DATA
───────────────────────────────────────────────────────────── */
const FLOW = {
  website: {
    q1: { label: "What kind of site?", opts: ["Business", "Church", "School", "Nonprofit", "Campaign", "Personal Brand", "Portfolio", "Other"] },
    q2: { label: "What's the main goal?", opts: ["More customers", "More donations", "More registrations", "More volunteers", "Build credibility", "Better communication", "Other"] },
  },
  flyer: {
    q1: { label: "What's the flyer for?", opts: ["Event", "Business Promo", "Church Service", "School Announcement", "Community Notice", "Sale / Special", "Other"] },
    q2: { label: "When do you need it?", opts: ["ASAP — this week", "In the next 2 weeks", "This month", "Just exploring"] },
  },
  logo: {
    q1: { label: "What kind of brand?", opts: ["Business", "Church", "School", "Nonprofit", "Personal brand", "Side project", "Other"] },
    q2: { label: "What stage are you at?", opts: ["Starting from scratch", "Redesigning an existing logo", "Adding to an existing brand", "Not sure yet"] },
  },
  card: {
    q1: { label: "Who's the card for?", opts: ["Me personally", "My business", "My team", "My ministry", "My nonprofit", "Other"] },
    q2: { label: "What's your vibe?", opts: ["Clean & minimal", "Bold & modern", "Classic & professional", "Playful & fun", "Match my existing brand"] },
  },
  social: {
    q1: { label: "Which platform(s)?", opts: ["Instagram", "Facebook", "LinkedIn", "X / Twitter", "Multiple platforms", "Not sure yet"] },
    q2: { label: "What's the purpose?", opts: ["Announce an event", "Promote a product / service", "Build a following", "Run an ad", "Share a message", "Other"] },
  },
  qr: {
    q1: { label: "Where will it live?", opts: ["Storefront window", "Event table", "Church lobby", "School hallway", "Restaurant or menu", "Direct mail", "Other"] },
    q2: { label: "Where should it link?", opts: ["My website", "A signup / form", "A donation page", "A menu", "Social media", "Other"] },
  },
  event: {
    q1: { label: "What type of event?", opts: ["Community gathering", "Church service / revival", "School event", "Fundraiser", "Birthday / celebration", "Conference", "Other"] },
    q2: { label: "What materials do you need?", opts: ["Flyers / Posters", "Programs", "Banners", "Social graphics", "Tickets", "All of the above", "Not sure yet"] },
  },
  other: {
    q1: { label: "What's closest?", opts: ["Print design", "Digital design", "Branding / logo", "Website", "Photography editing", "Something totally unique"] },
    q2: { label: "How soon do you need this?", opts: ["ASAP", "This week", "This month", "Just exploring"] },
  },
};

/* ─────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────── */
const PROJECTS = [
  { id: 1, type: "Website", name: "Isabella Transport", desc: "Full business site with service pages, contact form, and booking flow for a licensed carrier.", tag: "Transportation", accent: T.yellow, wide: true },
  { id: 2, type: "Website", name: "Gregory S. Chatman", desc: "Personal brand site for an author and speaker — clean, fast, built to convert visitors into readers.", tag: "Personal Brand", accent: T.navy },
  { id: 3, type: "Campaign Site", name: "Community Campaign", desc: "One-page action site built to collect signatures and drive awareness for a local initiative.", tag: "Campaign", accent: T.cobalt },
  { id: 4, type: "Realtor Concept", name: "Agent Landing Page", desc: "Lead-gen concept for a real estate agent — listings, bio, and a direct inquiry form.", tag: "Real Estate", accent: T.ink },
  { id: 5, type: "Print Design", name: "Business Cards + Flyers", desc: "Brand print package: matching cards, promo flyers, and a takeaway one-pager for a local service business.", tag: "Small Business", accent: T.orange },
  { id: 6, type: "QR Campaign", name: "Storefront QR Sign", desc: "Designed and printed QR signs linking customers to a Google review page. Simple system, real results.", tag: "Local Business", accent: T.yellow, wide: true },
];

/* ─────────────────────────────────────────────────────────────
   DISCOVERY REDUCER
───────────────────────────────────────────────────────────── */
const initDisc = { tile: null, step: 0, a1: "", a2: "" };
function discReducer(state, action) {
  switch (action.type) {
    case "SELECT_TILE": return { ...initDisc, tile: action.tile, step: 1 };
    case "ANSWER_1": return { ...state, a1: action.val, step: 2 };
    case "ANSWER_2": return { ...state, a2: action.val, step: 3 };
    case "BACK_TO_1": return { ...state, a1: "", step: 1 };
    case "RESET": return initDisc;
    default: return state;
  }
}

/* ─────────────────────────────────────────────────────────────
   INLINE STYLES (CSS-in-JS variables for Tailwind-like control)
   We use a single <style> injected to avoid huge inline repetition.
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #232528;
    --cream:  #f8f8f8;
    --yellow: #fbee16;
    --navy:   #0e1c3d;
    --cobalt: #1a3a6e;
    --white:  #ffffff;
    --mid:    #6b7280;
    --border: #e5e7eb;
    --orange: #ff5c1a;
    --font-head: 'Barlow Condensed', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body { background: var(--cream); color: var(--ink); font-family: var(--font-body); }

  /* Focus styles for keyboard nav */
  :focus-visible {
    outline: 3px solid var(--yellow);
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* Tile grid */
  .tile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
  @media (max-width: 480px) {
    .tile-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* Tile button */
  .tile-btn {
    background: var(--white);
    border: 2px solid transparent;
    border-radius: 14px;
    padding: 20px 16px;
    text-align: left;
    cursor: pointer;
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, border-color 0.18s, background 0.18s;
    position: relative;
    overflow: hidden;
  }
  .tile-btn:hover, .tile-btn:focus-visible {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 16px 36px rgba(35,37,40,0.14);
    border-color: var(--yellow);
    background: var(--ink);
    color: var(--white);
  }
  .tile-btn:active { transform: scale(0.97); }

  /* Discovery option pill */
  .disc-opt {
    background: rgba(255,255,255,0.07);
    border: 2px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.85);
    border-radius: 40px;
    padding: 11px 22px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  }
  .disc-opt:hover, .disc-opt:focus-visible {
    background: var(--yellow);
    border-color: var(--yellow);
    color: var(--ink);
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 8px 24px rgba(251,238,22,0.35);
  }

  /* Project card */
  .proj-card {
    border-radius: 18px;
    padding: 28px 24px;
    cursor: default;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
  }
  .proj-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 44px rgba(35,37,40,0.13);
  }

  /* CTA buttons */
  .btn-primary {
    background: var(--yellow);
    color: var(--ink);
    border: none;
    border-radius: 50px;
    padding: 16px 36px;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary:hover, .btn-primary:focus-visible {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(251,238,22,0.45);
  }
  .btn-secondary {
    background: transparent;
    border: 2px solid rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.65);
    border-radius: 50px;
    padding: 14px 28px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-secondary:hover, .btn-secondary:focus-visible {
    border-color: rgba(255,255,255,0.6);
    color: white;
  }

  /* Input */
  .field-input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid var(--border);
    border-radius: 10px;
    background: var(--white);
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--ink);
    transition: border-color 0.2s;
    outline: none;
  }
  .field-input:focus {
    border-color: var(--ink);
  }
  .field-input::placeholder { color: #aaa; }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
    }
  }

  /* Progress bar */
  .prog-bar {
    height: 3px;
    flex: 1;
    border-radius: 3px;
    background: rgba(255,255,255,0.15);
    overflow: hidden;
  }
  .prog-bar-fill {
    height: 100%;
    background: var(--yellow);
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  /* Section fade-in */
  .section-fade {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .section-fade.visible {
    opacity: 1;
    transform: none;
  }

  /* Nav scroll shrink */
  .nav-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 22px 5vw;
    transition: padding 0.3s, background 0.3s, box-shadow 0.3s;
  }
  .nav-bar.scrolled {
    padding: 14px 5vw;
    background: rgba(248,248,248,0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 var(--border);
  }

  /* Hero stagger */
  .hero-1 { opacity:0; transform:translateY(20px); animation: fadeUp 0.7s 0.1s forwards ease; }
  .hero-2 { opacity:0; transform:translateY(20px); animation: fadeUp 0.7s 0.2s forwards ease; }
  .hero-3 { opacity:0; transform:translateY(20px); animation: fadeUp 0.7s 0.35s forwards ease; }
  .hero-4 { opacity:0; transform:translateY(20px); animation: fadeUp 0.7s 0.5s forwards ease; }
  @keyframes fadeUp {
    to { opacity: 1; transform: none; }
  }

  /* Mobile project grid */
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }
  .proj-wide { grid-column: span 2; }
  @media (max-width: 640px) {
    .proj-wide { grid-column: span 1; }
  }

  /* Contact form grid */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 600px) {
    .form-grid { grid-template-columns: 1fr; }
  }

  /* Yellow marker underline */
  .hl {
    display: inline;
    background: linear-gradient(transparent 55%, var(--yellow) 55%);
  }
`;

/* ─────────────────────────────────────────────────────────────
   HOOK: intersection observer
───────────────────────────────────────────────────────────── */
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll(".section-fade");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────────────────────── */
export default function MiguelThirty3() {
  const [scrolled, setScrolled] = useState(false);
  const [disc, dispatch] = useReducer(discReducer, initDisc);
  const discRef = useRef(null);

  useFadeIn();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const selectTile = (tile) => {
    dispatch({ type: "SELECT_TILE", tile });
    setTimeout(() => discRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ── NAV ── */}
      <nav className={`nav-bar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: 22, letterSpacing: "0.02em", color: T.ink }}>
            MIGUEL<span style={{ color: T.yellow, WebkitTextStroke: `1px ${T.ink}` }}>33</span>
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid, marginTop: -2 }}>
            Digital Design Concierge
          </div>
        </div>
        <button className="btn-primary" onClick={scrollToContact} aria-label="Start a project with Miguel" style={{ padding: "10px 22px", fontSize: 14 }}>
          Start a Project
        </button>
      </nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        aria-label="Hero — What do you need designed?"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 5vw 80px",
          position: "relative",
          overflow: "hidden",
          background: T.cream,
        }}
      >
        {/* Background graphic accent */}
        <div aria-hidden="true" style={{
          position: "absolute", top: -60, right: -80,
          width: "clamp(280px,40vw,560px)", height: "clamp(280px,40vw,560px)",
          background: T.yellow, borderRadius: "50%", opacity: 0.18, zIndex: 0,
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 40, left: "55%",
          fontFamily: "var(--font-head)", fontWeight: 900,
          fontSize: "clamp(120px,22vw,280px)", color: "rgba(35,37,40,0.04)",
          lineHeight: 1, userSelect: "none", zIndex: 0, whiteSpace: "nowrap",
        }}>33</div>

        <div style={{ maxWidth: 960, position: "relative", zIndex: 1 }}>
          <div className="hero-1" style={{
            fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: T.ink, opacity: 0.5, marginBottom: 20,
          }}>
            Thirty3 Digital Designs · MiguelThirty3.com
          </div>

          <h1 className="hero-2" style={{
            fontFamily: "var(--font-head)", fontWeight: 900,
            fontSize: "clamp(60px, 10vw, 140px)",
            lineHeight: 0.92, letterSpacing: "-0.01em",
            textTransform: "uppercase", marginBottom: 28,
            color: T.ink,
          }}>
            Need a<br />
            Website, Flyer<br />
            or <span className="hl">Design?</span>
          </h1>

          <p className="hero-3" style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(16px,2vw,19px)",
            color: T.mid, maxWidth: 480, lineHeight: 1.65, marginBottom: 52,
          }}>
            Websites. Flyers. Logos. Social graphics. QR signs. Whatever you need built — pick it below and let's figure out the details together.
          </p>

          {/* TILE GRID */}
          <div className="tile-grid hero-4" role="group" aria-label="Select what you need designed">
            {TILES.map((tile) => (
              <button
                key={tile.id}
                className="tile-btn"
                onClick={() => selectTile(tile)}
                aria-label={`${tile.label} — ${tile.sub}`}
              >
                <div style={{ color: T.mid, marginBottom: 12, transition: "color 0.18s" }} aria-hidden="true">
                  {tile.icon}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 5 }}>
                  {tile.label}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, lineHeight: 1.4, opacity: 0.55 }}>
                  {tile.sub}
                </div>
              </button>
            ))}
          </div>

          <div className="hero-4" style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontSize: 13, color: T.mid }}>
            <span aria-hidden="true" style={{ display: "inline-block", width: 24, height: 1, background: T.mid }} />
            Pick a tile above — or scroll down to see the work
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DISCOVERY
      ════════════════════════════════════════ */}
      <section
        ref={discRef}
        id="discovery"
        aria-label="Project discovery"
        style={{
          background: T.ink,
          color: T.white,
          padding: "100px 5vw",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", top: -80, right: -80, width: 360, height: 360,
          borderRadius: "50%", background: T.yellow, opacity: 0.04,
        }} />

        <div style={{ maxWidth: 760, width: "100%", position: "relative", zIndex: 1 }}>
          {disc.step === 0 && <DiscoveryIdle onScrollUp={() => window.scrollTo({ top: 0, behavior: "smooth" })} />}
          {disc.step === 1 && <DiscoveryStep1 disc={disc} dispatch={dispatch} />}
          {disc.step === 2 && <DiscoveryStep2 disc={disc} dispatch={dispatch} />}
          {disc.step === 3 && <DiscoveryDone disc={disc} dispatch={dispatch} onContact={scrollToContact} />}
        </div>
      </section>

      <section
        id="how"
        className="section-fade"
        aria-label="How it works"
        style={{ padding: "80px 5vw", background: T.white }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              ["01", "Pick the project", "Choose what you need designed, even if the idea is still rough."],
              ["02", "Answer two questions", "The quick flow helps shape the project before the first message."],
              ["03", "Miguel follows up", "You’ll get next steps, questions, and a clear path forward."]
            ].map(([num, title, text]) => (
              <div key={num} style={{
                background: T.cream,
                border: `1px solid ${T.border}`,
                borderRadius: 18,
                padding: 28
              }}>
                <div style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 42,
                  fontWeight: 900,
                  color: T.yellow,
                  WebkitTextStroke: `1px ${T.ink}`,
                  marginBottom: 18
                }}>
                  {num}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 28,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  lineHeight: 1,
                  marginBottom: 10,
                  color: T.ink
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: T.mid,
                  lineHeight: 1.6
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROOF OF WORK
      ════════════════════════════════════════ */}
      <section
        id="work"
        className="section-fade"
        aria-label="Recent projects"
        style={{ padding: "120px 5vw", background: T.cream }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid, marginBottom: 12 }}>
                Real work
              </div>
              <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.01em" }}>
                Proof of<br /><span className="hl">Work</span>
              </h2>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: T.mid, maxWidth: 300, lineHeight: 1.65 }}>
              Projects built for real clients with real goals. Design that had to actually work.
            </p>
          </div>

          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT MIGUEL
      ════════════════════════════════════════ */}
      <section
        className="section-fade"
        aria-label="About Miguel"
        style={{ background: T.navy, color: T.white, padding: "120px 5vw", position: "relative", overflow: "hidden" }}
      >
        <div aria-hidden="true" style={{
          position: "absolute", right: "4vw", top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-head)", fontWeight: 900,
          fontSize: "clamp(160px,26vw,360px)", lineHeight: 1,
          color: "rgba(255,255,255,0.04)", userSelect: "none", letterSpacing: "-0.03em",
        }}>T3</div>

        <div style={{ maxWidth: 680, position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: T.yellow, marginBottom: 24 }}>
            The designer behind the work
          </div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", textTransform: "uppercase", lineHeight: 0.92, letterSpacing: "-0.01em", marginBottom: 32 }}>
            I'm Miguel.<br />I Build Things<br /><span style={{ color: T.yellow }}>That Work.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: 20 }}>
            I'm the designer behind Thirty3 Digital Designs. I help people turn loose ideas into websites, flyers, signs, brands, and digital tools that look sharp and actually make sense.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: 44 }}>
            My clients are small businesses, churches, schools, coaches, local organizations, and real people with real deadlines. You don't need to know the design terms. Just tell me what you're trying to make.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px" }}>
            {["Websites", "Flyers + Print", "Logos + Branding", "QR Campaigns", "Social Graphics", "Event Materials"].map((s) => (
              <div key={s} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 6, height: 6, background: T.yellow, borderRadius: "50%" }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      <section
        id="contact"
        className="section-fade"
        aria-label="Contact and project inquiry"
        style={{ padding: "120px 5vw", background: T.cream }}
      >
        <ContactSection disc={disc} />
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{ background: T.ink, color: T.white, padding: "72px 5vw 40px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{
          fontSize: "clamp(64px,15vw,200px)", fontWeight: 900, lineHeight: 0.82,
          letterSpacing: "-0.04em", color: "rgba(255,255,255,0.04)",
          userSelect: "none", marginBottom: 60,
          fontFamily: "var(--font-head)", textTransform: "uppercase",
        }}>
          Miguel<br />Thirty3
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: 26, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>
              MIGUEL<span style={{ color: T.yellow }}>33</span>.COM
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
              Digital Design Concierge<br />
              Powered by Thirty3 Digital Designs
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Start a project", "#contact"], ["See the work", "#work"], ["Instagram", "#"]].map(([label, href]) => (
              <a key={label} href={href} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.yellow)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                {label} →
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.22)" }}>
            © 2026 Thirty3 Digital Designs · Made with intention.
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.22)", fontStyle: "italic" }}>
            Good design doesn't whisper. It shows up.
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   DISCOVERY: IDLE
───────────────────────────────────────────────────────────── */
function DiscoveryIdle({ onScrollUp }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: T.yellow, marginBottom: 20 }}>
        ↑ Start above
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(36px,5vw,72px)", textTransform: "uppercase", lineHeight: 0.92, marginBottom: 20 }}>
        Pick the project.<br />
        <span style={{ color: T.yellow }}>I'll help shape it.</span>
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 460, marginBottom: 28 }}>
        Tap any tile above and I'll ask two quick questions to understand what you're building — then we'll connect and make it happen.
      </p>
      <button className="btn-secondary" onClick={onScrollUp} style={{ fontSize: 14, padding: "10px 24px" }}>
        ↑ Back to top
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DISCOVERY: STEP 1
───────────────────────────────────────────────────────────── */
function DiscoveryStep1({ disc, dispatch }) {
  const flow = FLOW[disc.tile.id];
  return (
    <div>
      <BackBtn label="Change project type" onClick={() => dispatch({ type: "RESET" })} />
      <ProgressBar step={1} total={2} />
      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: T.yellow, marginBottom: 12 }}>
        You picked: {disc.tile.label}
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(30px,4vw,56px)", textTransform: "uppercase", lineHeight: 0.95, marginBottom: 36 }}>
        {flow.q1.label}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {flow.q1.opts.map((opt) => (
          <button key={opt} className="disc-opt" onClick={() => dispatch({ type: "ANSWER_1", val: opt })} aria-label={`Select ${opt}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DISCOVERY: STEP 2
───────────────────────────────────────────────────────────── */
function DiscoveryStep2({ disc, dispatch }) {
  const flow = FLOW[disc.tile.id];
  return (
    <div>
      <BackBtn label="Back" onClick={() => dispatch({ type: "BACK_TO_1" })} />
      <ProgressBar step={2} total={2} />
      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: T.yellow, marginBottom: 12 }}>
        {disc.tile.label} — {disc.a1}
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(30px,4vw,56px)", textTransform: "uppercase", lineHeight: 0.95, marginBottom: 36 }}>
        {flow.q2.label}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {flow.q2.opts.map((opt) => (
          <button key={opt} className="disc-opt" onClick={() => dispatch({ type: "ANSWER_2", val: opt })} aria-label={`Select ${opt}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DISCOVERY: DONE
───────────────────────────────────────────────────────────── */
function DiscoveryDone({ disc, dispatch, onContact }) {
  const summary = buildSummary(disc);
  return (
    <div>
      {/* Summary card */}
      <div style={{
        background: T.yellow, color: T.ink, borderRadius: 16,
        padding: "28px 28px", marginBottom: 36,
        display: "flex", flexDirection: "column", gap: 6,
      }} role="region" aria-label="Your project summary">
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
          Your project
        </div>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(20px,3vw,32px)", textTransform: "uppercase", lineHeight: 1.1 }}>
          {summary.title}
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 15, opacity: 0.7, marginTop: 4 }}>
          {summary.detail}
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(30px,4vw,52px)", textTransform: "uppercase", lineHeight: 0.95, marginBottom: 16, color: T.white }}>
        Miguel can help<br />with this.
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 36, maxWidth: 480 }}>
        {summary.cta}
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={onContact} aria-label="Go to contact form">
          Tell me what you need →
        </button>
        <button className="btn-secondary" onClick={() => dispatch({ type: "RESET" })} aria-label="Start over with a different project">
          Start over
        </button>
      </div>
    </div>
  );
}

function buildSummary(disc) {
  const { tile, a1, a2 } = disc;
  const title = `${tile.label}${a1 ? ` — ${a1}` : ""}`;
  const detail = a2 ? `Goal: ${a2}` : "";
  const cta = `You're building a ${tile.label.toLowerCase()}${a1 ? ` for ${a1.toLowerCase()}` : ""}${a2 ? ` with a focus on ${a2.toLowerCase()}` : ""}. Fill in the form below and Miguel will follow up directly.`;
  return { title, detail, cta };
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────── */
function ProjectCard({ project: p }) {
  return (
    <div
      className={`proj-card${p.wide ? " proj-wide" : ""}`}
      style={{ background: T.white }}
      role="article"
      aria-label={`${p.type}: ${p.name}`}
    >
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -20, right: -20, width: 100, height: 100,
        borderRadius: "50%", background: p.accent, opacity: 0.1,
        transition: "opacity 0.3s",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: p.accent, background: p.accent + "18", padding: "4px 10px", borderRadius: 20 }}>
            {p.type}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: T.mid, background: "#f3f4f6", padding: "4px 10px", borderRadius: 20 }}>
            {p.tag}
          </span>
        </div>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(18px,2.2vw,24px)", textTransform: "uppercase", lineHeight: 1.05, marginBottom: 12, color: T.ink }}>
          {p.name}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: T.mid, lineHeight: 1.6 }}>
          {p.desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────────────────────── */
function ContactSection({ disc }) {
  const [form, setForm] = useState({ name: "", email: "", what: "", timeline: "", budget: "", link: "", message: "" });
  const [sent, setSent] = useState(false);

  // Pre-fill "what" if discovery was completed
  useEffect(() => {
    if (disc.step === 3) {
      const { tile, a1, a2 } = disc;
      const pre = `${tile.label}${a1 ? ` — ${a1}` : ""}${a2 ? ` (${a2})` : ""}`;
      setForm((f) => ({ ...f, what: pre }));
    }
  }, [disc.step, disc.tile, disc.a1, disc.a2]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) setSent(true);
  };

  const headline = disc.step === 3
    ? `You're building: ${disc.tile.label}${disc.a1 ? ` for ${disc.a1}` : ""}. Tell me where to send the next step.`
    : "Tell me what you need designed.";

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: T.mid, marginBottom: 20, textAlign: "center" }}>
        Zero pressure
      </div>
      <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: "clamp(36px,5vw,72px)", textTransform: "uppercase", lineHeight: 0.9, marginBottom: 20, textAlign: "center" }}>
        {disc.step === 3 ? (
          <><span className="hl">You're set.</span><br />Let's talk.</>
        ) : (
          <>Tell me what<br />you need <span className="hl">designed.</span></>
        )}
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: T.mid, lineHeight: 1.65, textAlign: "center", marginBottom: 52 }}>
        {headline}
      </p>

      {sent ? (
        <div style={{ textAlign: "center", padding: "56px 32px", background: T.white, borderRadius: 20, border: `3px solid ${T.yellow}` }}>
          <div style={{ fontSize: 40, marginBottom: 16 }} aria-hidden="true">✦</div>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 10 }}>Got it.</h3>
          <p style={{ fontFamily: "var(--font-body)", color: T.mid, fontSize: 16 }}>
            Miguel will follow up directly. Keep your eyes on your inbox.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Row 1: name + email */}
          <div className="form-grid">
            <FieldGroup label="Your name" id="f-name">
              <input id="f-name" className="field-input" type="text" placeholder="First and last" value={form.name} onChange={set("name")} required aria-required="true" />
            </FieldGroup>
            <FieldGroup label="Email address" id="f-email">
              <input id="f-email" className="field-input" type="email" placeholder="best@email.com" value={form.email} onChange={set("email")} required aria-required="true" />
            </FieldGroup>
          </div>

          {/* What do you need */}
          <FieldGroup label="What do you need?" id="f-what">
            <input id="f-what" className="field-input" type="text" placeholder="Website, flyer, logo, QR sign…" value={form.what} onChange={set("what")} />
          </FieldGroup>

          {/* Row: timeline + budget */}
          <div className="form-grid">
            <FieldGroup label="Timeline" id="f-timeline">
              <select id="f-timeline" className="field-input" value={form.timeline} onChange={set("timeline")} style={{ cursor: "pointer" }}>
                <option value="">When do you need it?</option>
                {["ASAP", "This week", "Within 2 weeks", "This month", "No rush"].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </FieldGroup>
            <FieldGroup label="Budget range" id="f-budget">
              <select id="f-budget" className="field-input" value={form.budget} onChange={set("budget")} style={{ cursor: "pointer" }}>
                <option value="">Roughly speaking…</option>
                {["Under $100", "$100–$300", "$300–$750", "$750–$1,500", "$1,500+", "Not sure yet"].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </FieldGroup>
          </div>

          {/* Inspiration link */}
          <FieldGroup label="Inspiration or reference link (optional)" id="f-link">
            <input id="f-link" className="field-input" type="url" placeholder="https://example-you-like.com" value={form.link} onChange={set("link")} />
          </FieldGroup>

          {/* Message */}
          <FieldGroup label="Anything else?" id="f-msg">
            <textarea id="f-msg" className="field-input" rows={4} placeholder="Extra context, questions, or just 'I have no idea, help me think' — all valid." value={form.message} onChange={set("message")} style={{ resize: "vertical" }} />
          </FieldGroup>

          <div>
            <button
              type="submit"
              className="btn-primary"
              aria-label="Submit your project inquiry"
              style={{ marginTop: 8 }}
            >
              Send it over →
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────────────────────── */
function FieldGroup({ label, id, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={id} style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.mid }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${step} of ${total}`} style={{ display: "flex", gap: 6, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="prog-bar">
          <div className="prog-bar-fill" style={{ width: i < step ? "100%" : "0%" }} />
        </div>
      ))}
    </div>
  );
}

function BackBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary"
      aria-label={label}
      style={{ marginBottom: 32, padding: "8px 18px", fontSize: 13 }}
    >
      ← {label}
    </button>
  );
}
