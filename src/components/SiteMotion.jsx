import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/motion.css";

const REVEAL_SELECTOR = [
  ".section-fade",
  ".picker-heading",
  ".tile-btn",
  ".why-card",
  ".proj-card",
  ".expect-card",
  ".field-list a",
  ".powHero",
  ".powCard",
  ".projectHero",
  ".projectImageShowcase",
  ".projectStory",
  ".projectServices",
  ".projectResults",
  ".projectQuote",
  ".projectNext",
  ".pageCta",
  ".requestWebsite__heroCopy",
  ".requestWebsite__visual",
  ".requestWebsite__focus article",
  ".requestWebsite__process article",
  ".requestWebsite__formIntro",
  ".requestWebsite__form",
  ".notFound__copy",
  ".notFound__visual",
].join(",");

export default function SiteMotion() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.documentElement.classList.add("motion-ready");

    if (prefersReducedMotion) {
      document.documentElement.classList.add("motion-reduced");
      return;
    }

    const elements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));

    elements.forEach((element, index) => {
      element.classList.remove("is-revealed");
      element.style.setProperty("--reveal-delay", `${Math.min((index % 8) * 55, 385)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-revealed");
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, location.hash]);

  return null;
}