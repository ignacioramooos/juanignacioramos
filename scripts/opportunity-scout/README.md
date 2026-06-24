# Daily opportunity scout helpers

This folder contains the delivery helper for the Codex automation named
`daily-opportunity-scout`.

## Cloudflare delivery

Preferred path:

1. Onboard `juanignacioramos.com` to Cloudflare Email Service.
2. Deploy `cloudflare/opportunity-scout-email`.
3. Set `DIGEST_SEND_TOKEN` as a Worker secret.
4. Add these values to the repo's ignored `.env.local` file:

```bash
OPPORTUNITY_SCOUT_WORKER_URL=https://daily-opportunity-scout-email.<subdomain>.workers.dev
DIGEST_SEND_TOKEN=...
OPPORTUNITY_SCOUT_TO_EMAIL=ignacio@juanignacioramos.com,macagutierrez71@gmail.com,valentinaoundjian@gmail.com
```

Every address in `OPPORTUNITY_SCOUT_TO_EMAIL` must also be present in the
Worker `allowed_destination_addresses` list and verified as a Cloudflare Email
Routing destination address before the Worker can deliver to it.

Then the automation can send with:

```bash
$env:NODE_OPTIONS='--use-system-ca'; node scripts/opportunity-scout/send-digest.mjs \
  --subject "Daily opportunity scout - 2026-06-02" \
  --text path/to/report.txt
```

## Brevo fallback

The automation can send the generated digest through Brevo when these
environment variables are available in the process environment or in the repo's
private `.env.local` file:

```bash
BREVO_API_KEY=...
OPPORTUNITY_SCOUT_FROM_EMAIL=verified-sender@juanignacioramos.com
OPPORTUNITY_SCOUT_FROM_NAME=Ignacio Opportunity Scout
OPPORTUNITY_SCOUT_TO_EMAIL=ignacio@juanignacioramos.com,macagutierrez71@gmail.com,valentinaoundjian@gmail.com
```

The sender address must be verified in Brevo. The helper uses Brevo's
transactional email API endpoint:

```bash
$env:NODE_OPTIONS='--use-system-ca'; node scripts/opportunity-scout/send-digest.mjs \
  --subject "Daily opportunity scout - 2026-06-02" \
  --text path/to/report.txt
```

It also accepts `--html path/to/report.html` for richer email formatting. If no
`--text` file is provided, it reads the plain-text digest from stdin.
