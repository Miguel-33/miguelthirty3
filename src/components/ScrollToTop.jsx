import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToElementById(id, behavior = "smooth") {
  const element = document.getElementById(id);

  if (!element) return false;

  const header =
    document.querySelector(".pageChromeHeaderWrap")?.getBoundingClientRect()
      .height || 0;

  const extraOffset = 14;

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    header -
    extraOffset;

  window.scrollTo({
    top: Math.max(top, 0),
    left: 0,
    behavior,
  });

  return true;
}

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const stateTarget = location.state?.scrollTo;
    const hashTarget = location.hash
      ? decodeURIComponent(location.hash.replace("#", ""))
      : "";

    if (stateTarget || hashTarget) {
      const target = stateTarget || hashTarget;

      const timer = setTimeout(() => {
        scrollToElementById(target, "smooth");
      }, 180);

      return () => clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash, location.state]);

  return null;
}