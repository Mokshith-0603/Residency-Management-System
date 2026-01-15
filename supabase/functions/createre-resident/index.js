// @ts-nocheck
export const config = {
  auth: false,
};

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // 🔐 Require Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    const {
      name,
      email,
      password,
      phone,
      house_no,
      move_in_date,
      status,
    } = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    /* 1️⃣ Create Auth User */
    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return new Response(authError.message, { status: 400 });
    }

    /* 2️⃣ Resolve house_id */
    const { data: house, error: houseError } = await supabaseAdmin
      .from("houses")
      .select("id")
      .eq("unit_number", Number(house_no))
      .single();

    if (houseError || !house) {
      return new Response("House number not found", { status: 400 });
    }

    /* 3️⃣ Insert resident */
    const { error: residentError } = await supabaseAdmin
      .from("residents")
      .insert({
        name,
        email,
        phone,
        move_in_date,
        status,
        house_id: house.id,
        user_id: authUser.user.id,
      });

    if (residentError) {
      return new Response(residentError.message, { status: 400 });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
});
