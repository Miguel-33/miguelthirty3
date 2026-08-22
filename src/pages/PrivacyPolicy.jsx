import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import "../styles/legal-pages.css";

const updated = "August 22, 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Thirty3 Digital Designs</title>
        <meta
          name="description"
          content="How Thirty3 Digital Designs collects, uses, and protects information submitted through miguelthirty3.com."
        />
        <link rel="canonical" href="https://miguelthirty3.com/privacy" />
      </Helmet>

      <SiteHeader />

      <main className="legalPage">
        <header className="legalPage__hero">
          <p>Privacy Policy</p>
          <h1>Clear information about your information.</h1>
          <span>Last updated {updated}</span>
        </header>

        <div className="legalPage__layout">
          <aside>
            <strong>Short version</strong>
            <p>
              Thirty3 collects only what is needed to respond to inquiries,
              plan projects, operate the site, and protect the business. Your
              personal information is not sold.
            </p>
          </aside>

          <div className="legalPage__content">
            <section>
              <h2>Information you provide</h2>
              <p>
                When you submit a website or flyer request, you may provide
                your name, email address, business or project name, website,
                project goals, budget, timeline, event details, reference
                links, and anything you include in the message field.
              </p>
              <p>
                Please do not submit passwords, payment card details, Social
                Security numbers, medical information, or other sensitive data
                through these forms.
              </p>
            </section>

            <section>
              <h2>Technical information</h2>
              <p>
                The hosting and security services that deliver this website
                may automatically process technical information such as an IP
                address, browser and device details, request times, referring
                pages, approximate location derived from an IP address, and
                diagnostic or security logs.
              </p>
            </section>

            <section>
              <h2>How information is used</h2>
              <ul>
                <li>Respond to requests and communicate about potential work.</li>
                <li>Prepare project recommendations, scopes, and proposals.</li>
                <li>Operate, secure, troubleshoot, and improve the website.</li>
                <li>Maintain business records and meet legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2>Service providers</h2>
              <p>
                This website is hosted through Vercel. Website and flyer forms
                are processed through Formspree and delivered to Thirty3 by
                email. Those providers process information under their own
                policies and only as needed to provide their services.
              </p>
              <div className="legalPage__links">
                <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">
                  Vercel Privacy Notice ↗
                </a>
                <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                  Formspree Privacy Policy ↗
                </a>
              </div>
            </section>

            <section>
              <h2>Cookies and analytics</h2>
              <p>
                Thirty3 does not currently use advertising cookies or add a
                third-party advertising tracker to this site. Hosting and form
                providers may use technical data or necessary technologies to
                operate and secure their services. If optional analytics,
                advertising tools, or new tracking technologies are added,
                this policy will be updated and consent controls will be added
                when required.
              </p>
            </section>

            <section>
              <h2>Payments</h2>
              <p>
                This website does not collect payment card information. If a
                project moves forward, payment instructions may be provided
                through a separate invoice or payment service. That provider's
                privacy and security terms will apply to the transaction.
              </p>
            </section>

            <section>
              <h2>Sharing and retention</h2>
              <p>
                Thirty3 does not sell or rent personal information. Information
                may be shared with service providers that help operate the
                website and business, when required by law, or when reasonably
                necessary to protect the site, Thirty3, or others.
              </p>
              <p>
                Inquiry and project information is kept only as long as
                reasonably needed for communication, project records, legal
                obligations, security, and legitimate business purposes.
              </p>
            </section>

            <section>
              <h2>Your choices</h2>
              <p>
                You may request access to, correction of, or deletion of
                personal information held by Thirty3. Some records may need to
                be retained for legal, tax, security, or contractual reasons.
              </p>
            </section>

            <section>
              <h2>Children's privacy</h2>
              <p>
                This site is intended for business and professional inquiries
                and is not directed to children under 13. Thirty3 does not
                knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2>Changes and contact</h2>
              <p>
                This policy may be updated when the site, services, or legal
                requirements change. The updated date above will show the most
                recent revision.
              </p>
              <p>
                Questions or privacy requests can be sent to{" "}
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