#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import process from "node:process";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";
const DEFAULT_TO_EMAIL = "ignacio@juanignacioramos.com, macagutierrez71@gmail.com, valentinaoundjian@gmail.com";
const DEFAULT_FROM_NAME = "Ignacio Opportunity Scout";

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

async function loadDotEnvFile(filePath) {
  let content = "";

  try {
    content = await readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }

    return;
  }

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

async function loadLocalDotEnv() {
  await loadDotEnvFile(".env");
  await loadDotEnvFile(".env.local");
}

async function readStdin() {
  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

async function readContent(filePath) {
  if (filePath) {
    return readFile(filePath, "utf8");
  }

  if (!process.stdin.isTTY) {
    return readStdin();
  }

  return "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textToHtml(text) {
  const escaped = escapeHtml(text.trim());
  return `<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
    <pre style="white-space: pre-wrap; font-family: inherit;">${escaped}</pre>
  </body>
</html>`;
}

function parseRecipients(value) {
  const seen = new Set();
  const recipients = [];

  for (const rawRecipient of String(value || "").split(",")) {
    const recipient = rawRecipient.trim();
    const key = recipient.toLowerCase();

    if (!recipient || seen.has(key)) {
      continue;
    }

    seen.add(key);
    recipients.push(recipient);
  }

  return recipients;
}

async function main() {
  await loadLocalDotEnv();

  const args = parseArgs(process.argv.slice(2));
  const workerUrl = args["worker-url"] || process.env.OPPORTUNITY_SCOUT_WORKER_URL;
  const workerToken = args.token || process.env.DIGEST_SEND_TOKEN;
  const apiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY;
  const fromEmail = args.from || process.env.OPPORTUNITY_SCOUT_FROM_EMAIL;
  const fromName = args["from-name"] || process.env.OPPORTUNITY_SCOUT_FROM_NAME || DEFAULT_FROM_NAME;
  const toEmail = args.to || process.env.OPPORTUNITY_SCOUT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const toEmails = parseRecipients(toEmail);
  const subject = args.subject;
  const textContent = (await readContent(args.text)).trim();
  const explicitHtml = args.html ? (await readFile(args.html, "utf8")).trim() : "";
  const htmlContent = explicitHtml || textToHtml(textContent);

  if (!subject) {
    throw new Error("--subject is required.");
  }

  if (!textContent && !explicitHtml) {
    throw new Error("Provide digest content with --text, --html, or stdin.");
  }

  if (!toEmails.length) {
    throw new Error("At least one recipient is required.");
  }

  if (workerUrl) {
    if (!workerToken) {
      throw new Error("DIGEST_SEND_TOKEN is required when OPPORTUNITY_SCOUT_WORKER_URL is set.");
    }

    const results = [];

    for (const recipient of toEmails) {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${workerToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: recipient,
          subject,
          text: textContent || undefined,
          html: htmlContent,
        }),
      });

      const responseText = await response.text();
      let parsedBody = responseText;

      try {
        parsedBody = responseText ? JSON.parse(responseText) : {};
      } catch {
        // Keep the raw response text when the Worker returns non-JSON output.
      }

      results.push({
        recipient,
        ok: response.ok,
        status: response.status,
        body: parsedBody,
      });
    }

    const sent = results.filter((result) => result.ok);
    const failed = results.filter((result) => !result.ok);

    console.log(JSON.stringify({
      success: failed.length === 0,
      sent: sent.map((result) => result.recipient),
      failed: failed.map((result) => ({
        recipient: result.recipient,
        status: result.status,
        error: typeof result.body === "object" && result.body !== null
          ? result.body.error || result.body
          : result.body,
      })),
    }));

    if (!sent.length) {
      throw new Error("Cloudflare Worker send failed for every recipient.");
    }

    return;
  }

  if (!apiKey) {
    throw new Error("Set OPPORTUNITY_SCOUT_WORKER_URL + DIGEST_SEND_TOKEN or BREVO_API_KEY to send the opportunity scout digest.");
  }

  if (!fromEmail) {
    throw new Error("OPPORTUNITY_SCOUT_FROM_EMAIL or --from is required.");
  }

  const response = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: toEmails.map((email) => ({ email })),
      subject,
      textContent: textContent || undefined,
      htmlContent,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Brevo send failed (${response.status}): ${responseText}`);
  }

  console.log(responseText || JSON.stringify({ success: true }));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
