import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const requestSchema = z.object({
  service: z.string().min(1).max(200),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  description: z.string().trim().max(2000).default(""),
  budget_range: z.string().max(100).nullable().optional(),
  deadline: z.string().max(100).nullable().optional(),
  industry: z.string().max(100).nullable().optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ error: "Invalid input", details: result.error.errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase
      .from("service_requests")
      .insert({
        service: result.data.service,
        name: result.data.name,
        email: result.data.email,
        description: result.data.description,
        budget_range: result.data.budget_range || null,
        deadline: result.data.deadline || null,
        industry: result.data.industry || null,
      });

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to save request" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log notification for admin review
    console.log(`🔔 New service request: ${result.data.service} from ${result.data.name} (${result.data.email})`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
