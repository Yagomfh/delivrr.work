import { createFileRoute } from "@tanstack/react-router";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_landing/terms-of-service")({
  head: () => ({
    meta: [
      {
        title: "Terms of Service | delivrr.work",
      },
      {
        name: "description",
        content:
          "Read the terms of service for delivrr.work. Understand your rights and responsibilities when using our GitHub summary automation platform.",
      },
      {
        name: "robots",
        content: "index,follow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/terms-of-service`,
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
            Terms of Service
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            These Terms of Service govern your access to and use of the
            Delivrr.work website, dashboard, APIs, and related services. By
            accessing or using our services, you agree to be bound by these
            Terms.
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
          <section id="eligibility">
            <h2 className="text-base font-semibold text-foreground">
              1. Eligibility &amp; Account Registration
            </h2>
            <p className="mt-2">
              You must be at least 18 years old and capable of forming a binding
              contract to use the Service. You are responsible for maintaining
              the confidentiality of your account credentials and for all
              activities that occur under your account. You agree to notify us
              immediately of any unauthorized use of your account.
            </p>
            <p className="mt-2">
              If you are using the Service on behalf of a company or
              organization, you represent that you have authority to bind that
              organization, and &quot;you&quot; refers to both you as an
              individual and the organization.
            </p>
          </section>

          <section id="service-description">
            <h2 className="text-base font-semibold text-foreground">
              2. SaaS Service Description
            </h2>
            <p className="mt-2">
              Delivrr.work provides a software-as-a-service platform to help
              teams manage projects, integrations, and delivery workflows. We
              may update or improve features from time to time. Certain features
              may be made available only under specific subscription plans or
              beta programs.
            </p>
          </section>

          <section id="acceptable-use">
            <h2 className="text-base font-semibold text-foreground">
              3. Acceptable Use
            </h2>
            <p className="mt-2">
              You agree not to misuse the Service or help anyone else do so.
              This includes, without limitation:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Attempting to access the Service without authorization.</li>
              <li>
                Interfering with or disrupting the integrity or performance of
                the Service.
              </li>
              <li>
                Uploading or transmitting malicious code, spam, or other harmful
                content.
              </li>
              <li>
                Using the Service to violate any applicable law, regulation, or
                third-party rights.
              </li>
            </ul>
          </section>

          <section id="customer-data">
            <h2 className="text-base font-semibold text-foreground">
              4. Customer Data &amp; Privacy
            </h2>
            <p className="mt-2">
              You retain all rights to content, data, and materials you submit
              to the Service (&quot;Customer Data&quot;). You grant us the
              rights necessary to host, process, and display Customer Data
              solely for the purpose of providing and improving the Service. Our
              use of personal data is described in our Privacy Policy.
            </p>
          </section>

          <section id="billing">
            <h2 className="text-base font-semibold text-foreground">
              5. Subscriptions, Billing &amp; Trials
            </h2>
            <p className="mt-2">
              Access to certain features of the Service may require a paid
              subscription. Unless otherwise stated, subscriptions renew
              automatically at the end of each billing period unless cancelled
              in accordance with these Terms. You are responsible for providing
              accurate billing information and for all applicable fees, taxes,
              and charges.
            </p>
          </section>

          <section id="integrations">
            <h2 className="text-base font-semibold text-foreground">
              6. Third-Party Integrations
            </h2>
            <p className="mt-2">
              The Service may integrate with third-party tools and platforms
              (such as GitHub or email providers). Your use of those
              integrations is subject to the third party&apos;s own terms and
              policies. We are not responsible for third-party services or for
              any changes or outages they may experience.
            </p>
          </section>

          <section id="intellectual-property">
            <h2 className="text-base font-semibold text-foreground">
              7. Intellectual Property
            </h2>
            <p className="mt-2">
              We own all rights, title, and interest in and to the Service,
              including all software, features, and associated intellectual
              property rights. Except for the limited rights expressly granted
              to you in these Terms, no other rights are granted, whether by
              implication or otherwise.
            </p>
          </section>

          <section id="termination">
            <h2 className="text-base font-semibold text-foreground">
              8. Termination
            </h2>
            <p className="mt-2">
              You may stop using the Service at any time. We may suspend or
              terminate your access to the Service if you breach these Terms, if
              we are required to do so by law, or if continuing to provide the
              Service is no longer commercially viable. Upon termination, your
              right to access the Service will cease, but certain provisions of
              these Terms will survive.
            </p>
          </section>

          <section id="disclaimers">
            <h2 className="text-base font-semibold text-foreground">
              9. Disclaimers &amp; Limitation of Liability
            </h2>
            <p className="mt-2">
              The Service is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis without warranties of any kind, whether
              express or implied. To the maximum extent permitted by law, we
              disclaim all warranties, and we will not be liable for any
              indirect, incidental, special, or consequential damages, or loss
              of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section id="changes">
            <h2 className="text-base font-semibold text-foreground">
              10. Changes to These Terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. When we make material
              changes, we will update the &quot;Last updated&quot; date at the
              top of this page and, where appropriate, provide additional
              notice. Your continued use of the Service after changes become
              effective constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-base font-semibold text-foreground">
              11. Contact
            </h2>
            <p className="mt-2">
              If you have any questions about these Terms or about Delivrr.work,
              you can contact us via the form on our website or using the
              contact details provided in the dashboard.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
