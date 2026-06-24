const MAX_BODY_BYTES = 1024 * 1024;

const jsonHeaders = {
  "content-type": "application/json",
};

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...(init.headers || {}),
    },
  });
}

function readBearerToken(request) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);

  return match?.[1] || "";
}

function utf8Bytes(value) {
  return new TextEncoder().encode(value);
}

function timingSafeEqual(a, b) {
  const left = utf8Bytes(a);
  const right = utf8Bytes(b);

  if (left.length !== right.length) {
    return false;
  }

  let difference = 0;

  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }

  return difference === 0;
}

async function parseJsonBody(request) {
  const contentLength = Number(request.headers.get("content-length") || "0");

  if (contentLength > MAX_BODY_BYTES) {
    throw new Error("Request body is too large.");
  }

  return request.json();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseRecipients(value) {
  if (typeof value !== "string") {
    return [];
  }

  const seen = new Set();
  const recipients = [];

  for (const rawRecipient of value.split(",")) {
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

function normalizeDigest(input, env) {
  const subject = typeof input.subject === "string" ? input.subject.trim() : "";
  const text = typeof input.text === "string" ? input.text.trim() : "";
  const html = typeof input.html === "string" ? input.html.trim() : "";
  const requestedRecipients = typeof input.to === "string" && input.to.trim()
    ? input.to.trim()
    : env.OPPORTUNITY_SCOUT_TO;
  const recipients = parseRecipients(requestedRecipients);
  const allowedRecipients = new Set(
    parseRecipients(env.OPPORTUNITY_SCOUT_TO).map((recipient) => recipient.toLowerCase())
  );

  if (!subject) {
    throw new Error("Missing subject.");
  }

  if (!text && !html) {
    throw new Error("Missing text or html digest content.");
  }

  if (!recipients.length) {
    throw new Error("Missing recipient.");
  }

  for (const recipient of recipients) {
    if (!allowedRecipients.has(recipient.toLowerCase())) {
      throw new Error(`Recipient is not allowed: ${recipient}`);
    }
  }

  return {
    recipients,
    from: env.OPPORTUNITY_SCOUT_FROM,
    subject,
    text,
    html: html || `<pre>${escapeHtml(text)}</pre>`,
  };
}

export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return jsonResponse({ ok: true, service: "daily-opportunity-scout-email" });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed." }, { status: 405 });
    }

    if (!env.DIGEST_SEND_TOKEN) {
      return jsonResponse({ error: "Worker secret DIGEST_SEND_TOKEN is not configured." }, { status: 500 });
    }

    const token = readBearerToken(request);
    const authorized = token ? timingSafeEqual(token, env.DIGEST_SEND_TOKEN) : false;

    if (!authorized) {
      return jsonResponse({ error: "Unauthorized." }, { status: 401 });
    }

    try {
      const body = await parseJsonBody(request);
      const message = normalizeDigest(body, env);
      const results = await Promise.all(
        message.recipients.map((recipient) =>
          env.EMAIL.send({
            to: recipient,
            from: message.from,
            subject: message.subject,
            text: message.text,
            html: message.html,
          })
        )
      );

      return jsonResponse({
        success: true,
        recipients: message.recipients,
        messageIds: results.map((result) => result?.messageId || null),
      });
    } catch (error) {
      return jsonResponse({
        error: error instanceof Error ? error.message : "Failed to send digest.",
      }, { status: 400 });
    }
  },
};
