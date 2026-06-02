import { Link, useNavigate } from "react-router-dom";

export default function FieldNotesHeader() {
  const navigate = useNavigate();

  const goToSection = (sectionId) => (e) => {
    e.preventDefault();

    navigate("/");

    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
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
        <small>Websites, Flyers, Logos & Digital Design</small>
      </Link>

      <div className="field-header__links">
        <Link to="/">Home</Link>
        <Link to="/request-website">Request Website</Link>
        <Link to="/field-notes">Notes</Link>
        <a href="/#project-picker" onClick={goToSection("project-picker")}>
          Start a Project
        </a>
      </div>
    </nav>
  );
}