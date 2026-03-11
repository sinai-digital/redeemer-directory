import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InviteEmailProps {
  firstName: string;
  email: string;
  loginUrl: string;
}

export function InviteEmail({ firstName, email, loginUrl }: InviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re invited to the Redeemer Church Directory</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${loginUrl.replace("/login", "")}/logo.png`}
              width="48"
              height="44"
              alt="Redeemer Church"
              style={logo}
            />
          </Section>

          <Heading style={heading}>
            Welcome to the Redeemer Church Directory
          </Heading>

          <Text style={paragraph}>
            Hi {firstName},
          </Text>

          <Text style={paragraph}>
            You&apos;re invited to join the Redeemer Church online member
            directory. It&apos;s a private, members-only space where you can
            find contact info and stay connected with your church family.
          </Text>

          <Section style={buttonSection}>
            <Button style={button} href={`${loginUrl}?invite=1&email=${encodeURIComponent(email)}`}>
              Sign In to the Directory
            </Button>
          </Section>

          <Text style={smallText}>
            After clicking the button, you&apos;ll receive a second email with
            a verification code to enter on the sign-in page. Then you&apos;ll
            set a password and review your privacy settings.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Redeemer Presbyterian Church (PCA) &middot; Riverview, FL
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    "'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 32px",
  borderRadius: "8px",
  maxWidth: "480px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logo = {
  margin: "0 auto",
};

const heading = {
  color: "#22313f",
  fontSize: "22px",
  fontWeight: "700" as const,
  textAlign: "center" as const,
  margin: "0 0 24px",
  fontFamily: "'Literata', Georgia, serif",
};

const paragraph = {
  color: "#4a5568",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#d4b030",
  borderRadius: "6px",
  color: "#22313f",
  fontSize: "15px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const smallText = {
  color: "#718096",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "24px 0",
};

const footer = {
  color: "#a0aec0",
  fontSize: "12px",
  textAlign: "center" as const,
};
