/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={monogram}>JIR</Text>
        <Hr style={divider} />
        <Heading style={h1}>Confirm reauthentication</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '32px 28px' }
const monogram = { fontSize: '18px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif", color: '#262626', letterSpacing: '2px', margin: '0 0 16px' }
const divider = { borderColor: '#e5e0d8', margin: '0 0 24px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif", color: '#171717', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 24px' }
const codeStyle = { fontFamily: "'Space Grotesk', Courier, monospace", fontSize: '28px', fontWeight: 'bold' as const, color: '#262626', letterSpacing: '4px', margin: '0 0 28px' }
const footer = { fontSize: '12px', color: '#999999', margin: '28px 0 0' }
