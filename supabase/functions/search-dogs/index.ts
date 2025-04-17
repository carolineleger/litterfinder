import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    }
  );

  const { primaryBreed, secondaryBreed, breederName, startDate, endDate, page = 1, limit = 10 } = await req.json();
  const offset = (page - 1) * limit;

  let query = supabase.from("dogs").select("*").range(offset, offset + limit - 1);

  if (primaryBreed) query = query.ilike("primary_breed", `%${primaryBreed}%`);
  if (secondaryBreed) query = query.ilike("secondary_breed", `%${secondaryBreed}%`);
  if (breederName) query = query.ilike("breeder_name", `%${breederName}%`);
  if (startDate) query = query.gte("dob", startDate);
  if (endDate) query = query.lte("dob", endDate);

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ data, page, limit }), { status: 200 });
});
