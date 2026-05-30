import { Link, useNavigate } from "react-router-dom";

export default function FieldNotesHeader() {
  const navigate = useNavigate();

  const goToContact = (e) => {
    e.preventDefault();

    navigate("/");

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  return (
    <nav className="field-header" aria-label="Field Notes navigation">
      <Link to="/" className="field-header__brand">
        <span>
          MIGUEL<b>33</b>
        </span>
        <small>Digital Design Concierge</small>
      </Link>

      <div className="field-header__links">
        <Link to="/">Home</Link>
        <Link to="/field-notes">Field Notes</Link>
        <a href="/#contact" onClick={goToContact}>
          Start a Project
        </a>
      </div>
    </nav>
  );
}