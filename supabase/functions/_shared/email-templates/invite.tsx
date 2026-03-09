/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to join {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={monogram}>JIR</Text>
        <Hr style={divider} />
        <Heading style={h1}>You've been invited</Heading>
        <Text style={text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Click below to accept and create your account.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Accept Invitation
        </Button>
        <Text style={footer}>
          If you weren't expecting this, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '32px 28px' }
const monogram = { fontSize: '18px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif", color: '#262626', letterSpacing: '2px', margin: '0 0 16px' }
const divider = { borderColor: '#e5e0d8', margin: '0 0 24px' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif", color: '#171717', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 24px' }
const link = { color: '#262626', textDecoration: 'underline' }
const button = { backgroundColor: '#262626', color: '#f8f6f2', fontSize: '14px', fontWeight: '500' as const, borderRadius: '8px', padding: '12px 24px', textDecoration: 'none' }
const footer = { fontSize: '12px', color: '#999999', margin: '28px 0 0' }
