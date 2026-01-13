import { createFileRoute } from "@tanstack/react-router";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_landing/privacy-policy")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy | delivrr.work",
      },
      {
        name: "description",
        content:
          "Read our privacy policy to understand how delivrr.work collects, uses, and protects your personal data in compliance with GDPR.",
      },
      {
        name: "robots",
        content: "index,follow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/privacy-policy`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-0 md:pt-12 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-20">
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-primary/80">
            Legal
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            This Privacy Policy explains how we collect, use, and protect your
            personal data when you use our services. It is intended to comply
            with the EU General Data Protection Regulation (GDPR) and other
            applicable data protection laws.
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-[11px] text-muted-foreground">
            This template is provided for informational purposes only and does
            not constitute legal advice. You should consult with your own legal
            counsel to adapt it to your specific situation.
          </p>
        </header>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section id="controller">
            <h2 className="text-base font-semibold text-foreground">
              1. Data Controller
            </h2>
            <p className="mt-2">
              The data controller responsible for processing your personal data
              is:
            </p>
            <p className="mt-2">
              <span className="font-medium">[Company Name]</span>
              <br />
              [Registered Address]
              <br />
              [Country]
              <br />
              Email: [contact@email]
            </p>
          </section>

          <section id="data-we-collect">
            <h2 className="text-base font-semibold text-foreground">
              2. Personal Data We Collect
            </h2>
            <p className="mt-2">
              We collect and process the following categories of personal data
              when you use our website and services:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium">Account data</span>: name, email
                address, password (hashed), and authentication identifiers.
              </li>
              <li>
                <span className="font-medium">Usage data</span>: logs, feature
                usage, and configuration data related to your projects and
                integrations.
              </li>
              <li>
                <span className="font-medium">Billing data</span>: company
                details, billing address, and limited payment information
                (processed via our payment provider).
              </li>
              <li>
                <span className="font-medium">Technical data</span>: IP address,
                device and browser information, and cookies or similar
                technologies.
              </li>
            </ul>
          </section>

          <section id="purposes-and-legal-bases">
            <h2 className="text-base font-semibold text-foreground">
              3. Purposes and Legal Bases for Processing
            </h2>
            <p className="mt-2">
              We process your personal data only when we have a valid legal
              basis to do so under the GDPR:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium">
                  To provide and operate the service
                </span>{" "}
                (Art. 6(1)(b) GDPR – performance of a contract), including
                creating and managing your account, enabling product features,
                and providing customer support.
              </li>
              <li>
                <span className="font-medium">
                  To improve and secure our services
                </span>{" "}
                (Art. 6(1)(f) GDPR – legitimate interests), such as monitoring
                usage, preventing abuse, and developing new features.
              </li>
              <li>
                <span className="font-medium">
                  To comply with legal obligations
                </span>{" "}
                (Art. 6(1)(c) GDPR), including tax, accounting, and regulatory
                requirements.
              </li>
              <li>
                <span className="font-medium">
                  For marketing communications
                </span>{" "}
                (Art. 6(1)(a) GDPR – consent, or Art. 6(1)(f) GDPR – legitimate
                interests where permitted), such as product updates and
                newsletters. You can opt out at any time.
              </li>
            </ul>
          </section>

          <section id="sharing">
            <h2 className="text-base font-semibold text-foreground">
              4. Sharing Your Data
            </h2>
            <p className="mt-2">
              We do not sell your personal data. We may share it with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <span className="font-medium">Service providers</span> who help
                us operate our infrastructure, analytics, email delivery,
                payment processing, and customer support. These providers act as
                data processors and are bound by data protection agreements.
              </li>
              <li>
                <span className="font-medium">Integration partners</span> that
                you explicitly connect to (for example, Git hosting or project
                management tools), in accordance with your configuration.
              </li>
              <li>
                <span className="font-medium">Public authorities</span> where
                required by law or to protect our rights, users, or the public.
              </li>
            </ul>
          </section>

          <section id="international-transfers">
            <h2 className="text-base font-semibold text-foreground">
              5. International Data Transfers
            </h2>
            <p className="mt-2">
              Where we transfer personal data outside the European Economic Area
              (EEA), we ensure an adequate level of protection through
              mechanisms such as adequacy decisions, Standard Contractual
              Clauses approved by the European Commission, or other appropriate
              safeguards as required by applicable law.
            </p>
          </section>

          <section id="retention">
            <h2 className="text-base font-semibold text-foreground">
              6. Data Retention
            </h2>
            <p className="mt-2">
              We retain your personal data only for as long as necessary to
              fulfill the purposes described in this Privacy Policy or to comply
              with legal, accounting, or reporting requirements. When your
              account is closed, we will delete or anonymize your data within a
              reasonable period, unless we are required to retain certain
              information for longer.
            </p>
          </section>

          <section id="rights">
            <h2 className="text-base font-semibold text-foreground">
              7. Your Rights Under GDPR
            </h2>
            <p className="mt-2">
              Subject to applicable law, you have the following rights regarding
              your personal data:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Right of access to your personal data.</li>
              <li>Right to rectification of inaccurate or incomplete data.</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;).</li>
              <li>Right to restriction of processing.</li>
              <li>Right to data portability.</li>
              <li>
                Right to object to processing based on legitimate interests or
                direct marketing.
              </li>
              <li>
                Where processing is based on consent, the right to withdraw your
                consent at any time, without affecting the lawfulness of
                processing before withdrawal.
              </li>
            </ul>
            <p className="mt-2">
              To exercise your rights, please contact us at the email address
              provided above. You also have the right to lodge a complaint with
              your local data protection authority.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-base font-semibold text-foreground">
              8. Cookies and Similar Technologies
            </h2>
            <p className="mt-2">
              We use cookies and similar technologies to operate our website,
              enable core functionality, remember your preferences, and analyze
              how our services are used. Where required by law, we will obtain
              your consent before setting non-essential cookies. For more
              information, please refer to our separate Cookie Policy (if
              available) or contact us.
            </p>
          </section>

          <section id="security">
            <h2 className="text-base font-semibold text-foreground">
              9. Data Security
            </h2>
            <p className="mt-2">
              We take appropriate technical and organizational measures to
              protect your personal data against accidental or unlawful
              destruction, loss, alteration, unauthorized disclosure, or access.
              However, no method of transmission over the internet or electronic
              storage is completely secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-base font-semibold text-foreground">
              10. Changes to This Privacy Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technologies, or legal requirements. We
              will post the updated policy on this page and, where appropriate,
              notify you by email or through the service. The &quot;Last
              updated&quot; date at the top indicates when the latest changes
              took effect.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-base font-semibold text-foreground">
              11. Contact
            </h2>
            <p className="mt-2">
              If you have any questions or concerns about this Privacy Policy or
              our data protection practices, please contact us at:
            </p>
            <p className="mt-2">
              <span className="font-medium">[Company Name]</span>
              <br />
              Email: [contact@email]
              <br />
              [Optional: Data Protection Officer contact details]
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
