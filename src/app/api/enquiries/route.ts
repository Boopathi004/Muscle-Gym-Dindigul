import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, preferredBranch, preferredTime } = body;

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
