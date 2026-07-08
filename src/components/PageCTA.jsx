import { Link, useLocation } from "react-router-dom";
import "../styles/page-cta.css";

export default function PageCTA({
  kicker = "Start your project",
  title = "Need your business to look ready before they call?",
  text = "Send a quick request and I’ll help shape the next step.",
}) {
  const location = useLocation();
  const isProofPage = location.pathname === "/proof-of-work";

  const handleProofClick = (event) => {
    if (!isProofPage) return;

    event.preventDefault();

    const proofTop =
      document.getElementById("proof-of-work") ||
      document.querySelector(".powHero") ||
      document.body;

    proofTop.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="pageCta" aria-label="Start a project">
      <div className="pageCta__inner">
        <div>
          <p>{kicker}</p>
          <h2>{title}</h2>
        </div>

        <div>
          <span>{text}</span>

          <div className="pageCta__actions">
            <Link to="/request-website">Request a Website</Link>

            <Link to="/proof-of-work" onClick={handleProofClick}>
              {isProofPage ? "Back to Proof" : "See Proof of Work"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}