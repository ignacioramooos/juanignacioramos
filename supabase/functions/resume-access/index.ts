import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Constant-time string comparison
const safeEqual = (a: string, b: string) => {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) {
    // still burn a comparison to keep timing flat-ish
    let dummy = 0;
    for (let i = 0; i < ab.length; i++) dummy |= ab[i];
    return false;
  }
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expected = Deno.env.get("RESUME_ACCESS_PASSWORD");
  if (!expected) return json({ error: "Access is not configured." }, 500);

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const password = (payload as { password?: unknown })?.password;
  if (typeof password !== "string" || password.length < 1 || password.length > 200) {
    return json({ error: "Password is required." }, 400);
  }

  if (!safeEqual(password, expected)) {
    return json({ ok: false, error: "Incorrect password." }, 401);
  }

  return json({ ok: true });
});
