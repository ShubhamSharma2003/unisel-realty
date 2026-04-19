import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = "sshubham.2003@gmail.com";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
        }

        const { error } = await supabaseAdmin.from("subscribers").insert({ email });

        if (error) {
            // Unique violation — already subscribed
            if (error.code === "23505") {
                return NextResponse.json({ success: true, alreadySubscribed: true });
            }
            console.error("Supabase subscriber insert error:", error);
            return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
        }

        // Welcome email to subscriber
        resend.emails.send({
            from: "Unisel Realty <noreply@uniselrealty.com>",
            to: email,
            subject: "You're on the list — Unisel Realty",
            html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07)">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:32px 40px;text-align:center">
            <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">Unisel Realty</p>
            <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase">Est. 2006 · Gurgaon</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;line-height:1.3">
              Thanks for subscribing.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.7">
              You're now on our list for exclusive real estate updates — new launches, pre-launch access to DLF, Godrej &amp; M3M, market insights, and high-return investment opportunities in Gurgaon.
            </p>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
              <tr><td style="border-top:1px solid #e2e8f0"></td></tr>
            </table>

            <!-- What to expect -->
            <p style="margin:0 0 14px;font-size:13px;font-weight:600;color:#94a3b8;letter-spacing:0.06em;text-transform:uppercase">What to expect</p>
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#334155">
                  <span style="color:#2596be;margin-right:10px">→</span> New launch alerts before they go public
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#334155">
                  <span style="color:#2596be;margin-right:10px">→</span> Curated investment picks with ROI insights
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#334155">
                  <span style="color:#2596be;margin-right:10px">→</span> Gurgaon market reports &amp; price trends
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#334155">
                  <span style="color:#2596be;margin-right:10px">→</span> NRI advisory &amp; remote buying guidance
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <a href="https://www.uniselrealty.com/contact"
               style="display:inline-block;background:#2596be;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:14px;font-weight:600;letter-spacing:0.01em">
              Talk to an Advisor — Free
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0">
            <p style="margin:0 0 4px;font-size:12px;color:#94a3b8">
              408, 4th Floor, Adani Miracle Mile, Sector 60, Gurgaon
            </p>
            <p style="margin:0;font-size:12px;color:#94a3b8">
              You're receiving this because you subscribed at
              <a href="https://www.uniselrealty.com" style="color:#2596be;text-decoration:none">uniselrealty.com</a>.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
        }).catch((err) => console.error("Resend welcome email error:", err));

        // Internal notification
        resend.emails.send({
            from: "Unisel Realty <noreply@uniselrealty.com>",
            to: NOTIFY_EMAIL,
            subject: `New Subscriber: ${email}`,
            html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
        }).catch((err) => console.error("Resend notify email error:", err));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Subscribe API error:", err);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
