import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase.server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { fullName, phone, city, budget, propertyType, preferredContact, source, propertySlug } = body;

        if (!fullName || !phone) {
            return NextResponse.json({ error: "Full name and phone are required." }, { status: 400 });
        }

        const { error } = await supabaseAdmin.from("leads").insert({
            full_name: fullName,
            phone,
            city: city || null,
            budget: budget || null,
            property_type: propertyType || null,
            preferred_contact: preferredContact || null,
            source: source || "contact",
            property_slug: propertySlug || null,
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: "Failed to save your enquiry. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Lead API error:", err);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
