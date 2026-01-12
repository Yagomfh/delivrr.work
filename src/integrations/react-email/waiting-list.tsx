import {
  Button,
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Img,
} from "@react-email/components";

export default function WaitingListEmail() {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          backgroundColor: "#ffffff",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "40px 20px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Header */}
          <Section>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <Img
                src="https://delivrr.work/apple-touch-icon.png"
                alt="Delivrr Work"
                width="32"
                height="32"
                style={{
                  borderRadius: "8px",
                  marginRight: "6px",
                }}
              />
              <Text
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                Delivrr Work
              </Text>
            </div>
          </Section>

          {/* Main Content */}
          <Section style={{ marginBottom: "32px" }}>
            <Heading
              style={{
                margin: "0 0 16px 0",
                fontSize: "28px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#1a1a1a",
              }}
            >
              Welcome to the waiting list! 🎉
            </Heading>

            <Text
              style={{
                margin: "0 0 24px 0",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#4b5563",
              }}
            >
              Thanks for joining! We&apos;re excited to have you on board.
            </Text>

            <Text
              style={{
                margin: "0 0 24px 0",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#4b5563",
              }}
            >
              <strong>Delivrr Work</strong> turns noisy GitHub activity into
              clear, AI-crafted summaries. We connect to your GitHub projects,
              generate concise summaries of pull requests and commits, and
              automatically deliver them to your teams or your client&apos;s
              inboxes and Slack channels.
            </Text>

            <div
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <Text
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                What to expect:
              </Text>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  color: "#4b5563",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  Early access when we launch
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Updates on our progress and new features
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Exclusive tips and best practices
                </li>
              </ul>
            </div>

            <Text
              style={{
                margin: "0 0 32px 0",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#4b5563",
              }}
            >
              We&apos;ll notify you as soon as we&apos;re ready to welcome you
              aboard. In the meantime, feel free to reach out if you have any
              questions!
            </Text>

            <Button
              href="https://delivrr.work"
              style={{
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "inline-block",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              Visit our website
            </Button>
          </Section>

          <Hr
            style={{
              borderColor: "#e5e7eb",
              margin: "32px 0",
            }}
          />

          {/* Footer */}
          <Section>
            <Text
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              Best regards,
              <br />
              Yago - Founder & CEO
            </Text>
            <Text
              style={{
                margin: "24px 0 0 0",
                fontSize: "12px",
                color: "#9ca3af",
                lineHeight: "1.6",
              }}
            >
              You&apos;re receiving this email because you joined the Delivrr
              Work waiting list.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
