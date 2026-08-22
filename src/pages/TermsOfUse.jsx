import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import "../styles/legal-pages.css";

const updated = "August 22, 2026";

export default function TermsOfUse() {
  return (
    <>
      <Helmet>
        <title>Terms of Use | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="Terms that apply when visiting miguelthirty3.com or submitting a project inquiry to Thirty3 Digital Designs."
        />
        <link rel="canonical" href="https://miguelthirty3.com/terms" />
      </Helmet>

      <SiteHeader />

      <main className="legalPage">
        <header className="legalPage__hero">
          <p>Terms of Use</p>
          <h1>Simple rules for using this site.</h1>
          <span>Last updated {updated}</span>
        </header>

        <div className="legalPage__layout">
          <aside>
            <strong>Short version</strong>
            <p>
              The site introduces Thirty3's work and accepts inquiries. A form
              submission starts a conversation, not a client agreement.
            </p>
          </aside>

          <div className="legalPage__content">
            <section>
              <h2>Using the website</h2>
              <p>
                By using miguelthirty3.com, you agree to these Terms of Use and
                the Privacy Policy. If you do not agree, please do not use the
                site or submit information through its forms.
              </p>
            </section>

            <section>
              <h2>Information, not a professional guarantee</h2>
              <p>
                Site content is provided for general informational and
                promotional purposes. Thirty3 works to keep information useful
                and current, but does not guarantee that every page will always
                be complete, error-free, or available without interruption.
              </p>
            </section>

            <section>
              <h2>Project inquiries</h2>
              <p>
                Submitting a request does not create a client relationship,
                reserve a date, guarantee acceptance, or require either party
                to begin work. A project begins only after the parties agree to
                a written scope or agreement and any required deposit is paid.
              </p>
              <p>
                A project-specific proposal, agreement, invoice, or written
                scope controls if it conflicts with these general website
                terms.
              </p>
            </section>

            <section>
              <h2>Payments</h2>
              <p>
                Payments are not collected directly through this website. Any
                invoice or payment link provided later may be operated by a
                third-party payment service and will be subject to that
                provider's terms and privacy practices.
              </p>
            </section>

            <section>
              <h2>Intellectual property</h2>
              <p>
                Unless otherwise stated, the site's writing, layouts, branding,
                graphics, and original design work belong to Thirty3 Digital
                Designs. Client names, logos, photography, website screenshots,
                and other client materials remain the property of their
                respective owners and are shown as portfolio examples with the
                appropriate permission or project rights.
              </p>
              <p>
                You may view and share links to public pages. You may not copy,
                republish, sell, scrape, or present site content or design work
                as your own without written permission.
              </p>
            </section>

            <section>
              <h2>Acceptable use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Attempt to disrupt, damage, or gain unauthorized access to the site.</li>
                <li>Use the forms to send spam, harmful files, unlawful content, or deceptive requests.</li>
                <li>Submit information that you do not have permission to provide.</li>
                <li>Use automated methods that place an unreasonable load on the site.</li>
              </ul>
            </section>

            <section>
              <h2>Third-party websites</h2>
              <p>
                The site links to client websites, Instagram, Formspree, Vercel,
                and other third-party services. Thirty3 does not control those
                services and is not responsible for their content, availability,
                security, or privacy practices.
              </p>
            </section>

            <section>
              <h2>Liability</h2>
              <p>
                To the fullest extent permitted by law, Thirty3 is not liable
                for indirect, incidental, special, or consequential loss arising
                from use of, or inability to use, this public website or a
                third-party website linked from it.
              </p>
              <p>
                Nothing in these terms limits liability that cannot legally be
                limited. Project-specific responsibilities are governed by the
                applicable written client agreement.
              </p>
            </section>

            <section>
              <h2>Tennessee law</h2>
              <p>
                These website terms are governed by the laws of the State of
                Tennessee, without regard to conflict-of-law principles.
              </p>
            </section>

            <section>
              <h2>Changes and contact</h2>
              <p>
                These terms may be updated as the site or services change. The
                updated date above will show the most recent revision.
              </p>
              <p>
                Questions can be sent to{" "}
                <a href="mailto:hello@thirty3digitaldesigns.com">
                  hello@thirty3digitaldesigns.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}