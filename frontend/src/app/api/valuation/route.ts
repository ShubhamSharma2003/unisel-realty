import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase.server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            fullName, phone, email,
            locality, propertyType, bhk, areaSqFt, age, floor,
            estimatedMin, estimatedMax,
        } = body;

        if (!fullName || !phone) {
            return NextResponse.json({ error: "Full name and phone are required." }, { status: 400 });
        }

        // Insert lead first
        const { data: lead, error: leadError } = await supabaseAdmin
            .from("property_valuation_leads")
            .insert({ full_name: fullName, phone, email: email || null })
            .select("id")
            .single();

        if (leadError) {
            console.error("Valuation lead insert error:", leadError);
            return NextResponse.json({ error: "Failed to save your details. Please try again." }, { status: 500 });
        }

        // Insert property request linked to lead
        const { error: requestError } = await supabaseAdmin
            .from("property_valuation_requests")
            .insert({
                lead_id: lead.id,
                locality: locality || null,
                property_type: propertyType || null,
                bhk: bhk || null,
                area_sqft: areaSqFt || null,
                age: age || null,
                floor: floor || null,
                estimated_min: estimatedMin || null,
                estimated_max: estimatedMax || null,
            });

        if (requestError) {
            console.error("Valuation request insert error:", requestError);
            return NextResponse.json({ error: "Failed to save property details. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Valuation API error:", err);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
