/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your password — {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={monogram}>JIR</Text>
        <Hr style={divider} />
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>
          We received a request to reset your password for {siteName}. Click below to choose a new one.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Reset Password
        </Button>
        <Text style={footer}>
          If you didn't request this, you can safely ignore this email. Your password won't change.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '32px 28px' }
const monogram = { fontSize: '18px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif", color: '#262626', letterSpacing: '2px', margin: '0 0 16px' }
const divider = { borderColor: '#e5e0d8', margin: '0 0 24px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif", color: '#171717', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 24px' }
const button = { backgroundColor: '#262626', color: '#f8f6f2', fontSize: '14px', fontWeight: '500' as const, borderRadius: '8px', padding: '12px 24px', textDecoration: 'none' }
const footer = { fontSize: '12px', color: '#999999', margin: '28px 0 0' }
