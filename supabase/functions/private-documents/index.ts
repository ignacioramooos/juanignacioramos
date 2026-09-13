import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const ROOT_FOLDER_ID = "10ZXh1l7qdRd4dbRZ7VcUCcxOHfWCJc2c";
const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";
const MAX_DEPTH = 4;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const safeEqual = (a: string, b: string) => {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) {
    let dummy = 0;
    for (let i = 0; i < ab.length; i++) dummy |= ab[i];
    return false;
  }
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
};

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  hasThumbnail?: boolean;
}

// Drive thumbnail links are signed URLs; bump the requested size for crisp cards.
const upscaleThumb = (link?: string) =>
  link ? link.replace(/=s\d+(-c)?$/, "=s800") : undefined;

interface FolderNode {
  id: string;
  name: string;
  files: DriveFile[];
  folders: FolderNode[];
}

const cleanName = (name: string) => name.replace(/^Copy of\s+/i, "").trim();

async function listChildren(parentId: string): Promise<DriveFile[]> {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const connectionKey = Deno.env.get("GOOGLE_DRIVE_API_KEY");
  if (!lovableKey || !connectionKey) throw new Error("Drive access is not configured.");

  const params = new URLSearchParams({
    q: `'${parentId}' in parents and trashed=false`,
    fields: "files(id,name,mimeType,size,modifiedTime,webViewLink,thumbnailLink,hasThumbnail)",
    pageSize: "200",
    orderBy: "folder,name",
  });

  const res = await fetch(`${GATEWAY}/files?${params}`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
  });

  if (!res.ok) {
    const details = await res.text();
    console.error(`Drive list failed [${res.status}]: ${details}`);
    throw new Error(`[${res.status}] ${details}`);
  }

  const data = (await res.json()) as { files?: DriveFile[] };
  return data.files ?? [];
}

async function buildTree(id: string, name: string, depth: number): Promise<FolderNode> {
  const children = await listChildren(id);
  const files = children
    .filter((f) => f.mimeType !== FOLDER_MIME)
    .map((f) => ({
      ...f,
      name: cleanName(f.name),
      thumbnailLink: f.hasThumbnail ? upscaleThumb(f.thumbnailLink) : undefined,
    }));
  const subfolders = children.filter((f) => f.mimeType === FOLDER_MIME);

  const folders =
    depth >= MAX_DEPTH
      ? []
      : await Promise.all(subfolders.map((f) => buildTree(f.id, cleanName(f.name), depth + 1)));

  return { id, name, files, folders };
}

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

  try {
    const tree = await buildTree(ROOT_FOLDER_ID, "Documents", 0);
    return json({ ok: true, tree });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("private-documents failed:", message);
    return json({ ok: false, error: "Could not load documents.", details: message }, 502);
  }
});
