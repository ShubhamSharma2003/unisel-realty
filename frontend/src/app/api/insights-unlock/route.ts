import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = "sshubham.2003@gmail.com";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            fullName,
            phone,
            email,
            budget,
            propertyType,
            propertySlug,
            source,
        } = body;

        if (!fullName || !phone || !email) {
            return NextResponse.json(
                { error: "Name, phone, and email are required." },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin.from("leads").insert({
            full_name: fullName,
            phone,
            email: email || null,
            budget: budget || null,
            property_type: propertyType || null,
            source: source || "insights-report",
            property_slug: propertySlug || null,
        });

        if (error) {
            console.error("Supabase insert error (insights):", error);
            return NextResponse.json(
                { error: "Failed to save. Please try again.", details: error.message },
                { status: 500 }
            );
        }

        resend.emails
            .send({
                from: "Unisel Realty <onboarding@resend.dev>",
                to: NOTIFY_EMAIL,
                subject: `Insights Report Unlocked: ${fullName}`,
                html: `
                    <h2>Insights Report Unlocked</h2>
                    <table style="border-collapse:collapse;width:100%;max-width:500px">
                        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${fullName}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Budget</td><td style="padding:8px;border:1px solid #ddd">${budget || "—"}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Type</td><td style="padding:8px;border:1px solid #ddd">${propertyType || "—"}</td></tr>
                        ${propertySlug ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Project Interest</td><td style="padding:8px;border:1px solid #ddd">${propertySlug}</td></tr>` : ""}
                        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td><td style="padding:8px;border:1px solid #ddd">${source || "insights-report"}</td></tr>
                    </table>
                `,
            })
            .catch((err) => console.error("Resend email error:", err));

        const res = NextResponse.json({ success: true });
        res.cookies.set("insights_unlocked", "1", {
            httpOnly: false,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 90,
            path: "/",
        });
        return res;
    } catch (err) {
        console.error("Insights-unlock API error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
