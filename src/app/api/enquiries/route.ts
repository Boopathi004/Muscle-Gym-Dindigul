import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now - rateData.timestamp < 3600000) {
      if (rateData.count >= 5) {
        return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();
    const { name, email, phone, subject, message, preferredBranch, preferredTime, botField } = body;

    // Honeypot check
    if (botField) {
      return NextResponse.json({ success: true }, { status: 200 }); // silently drop
    }

    // Basic validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required fields." },
        { status: 400 }
      );
    }

    const saved = await Storage.addEnquiry({
      name,
      email: email || null,
      phone,
      subject: subject || "General Inquiry",
      message,
      preferredBranch: preferredBranch || null,
      preferredTime: preferredTime || null,
    });

    return NextResponse.json({ success: true, enquiry: saved }, { status: 201 });
  } catch (error: any) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await Storage.getEnquiries();
    return NextResponse.json({ success: true, enquiries }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
