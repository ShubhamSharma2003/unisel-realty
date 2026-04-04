import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = "sshubham.2003@gmail.com";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { fullName, phone, email, city, budget, propertyType, preferredContact, source, propertySlug } = body;

        if (!fullName || !phone) {
            return NextResponse.json({ error: "Full name and phone are required." }, { status: 400 });
        }

        const { error } = await supabaseAdmin.from("leads").insert({
            full_name: fullName,
            phone,
            email: email || null,
            city: city || null,
            budget: budget || null,
            property_type: propertyType || null,
            preferred_contact: preferredContact || null,
            source: source || "contact",
            property_slug: propertySlug || null,
        });

        if (error) {
            console.error("Supabase insert error:", error);
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            return NextResponse.json({
                error: "Failed to save your enquiry. Please try again.",
                details: error.message
            }, { status: 500 });
        }

        // Send notification email (non-blocking — don't fail the request if email fails)
        resend.emails.send({
            from: "Unisel Realty <onboarding@resend.dev>",
            to: NOTIFY_EMAIL,
            subject: `New Lead: ${fullName}`,
            html: `
                <h2>New Enquiry Received</h2>
                <table style="border-collapse:collapse;width:100%;max-width:500px">
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${fullName}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
                    ${email ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>` : ""}
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">City</td><td style="padding:8px;border:1px solid #ddd">${city || "—"}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${budget || "—"}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Property Type</td><td style="padding:8px;border:1px solid #ddd">${propertyType || "—"}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred Contact</td><td style="padding:8px;border:1px solid #ddd">${preferredContact || "—"}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td><td style="padding:8px;border:1px solid #ddd">${source || "contact"}</td></tr>
                    ${propertySlug ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Property</td><td style="padding:8px;border:1px solid #ddd">${propertySlug}</td></tr>` : ""}
                </table>
            `,
        }).catch((err) => console.error("Resend email error:", err));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Lead API error:", err);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
