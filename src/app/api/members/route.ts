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
    const { name, email, phone, plan, branch, fitnessGoal, message, botField } = body;

    // Honeypot check
    if (botField) {
      return NextResponse.json({ success: true }, { status: 200 }); // silently drop
    }

    // Basic validation
    if (!name || !phone || !plan || !branch) {
      return NextResponse.json(
        { error: "Name, phone, plan, and branch are required fields." },
        { status: 400 }
      );
    }

    const saved = await Storage.addMember({
      name,
      email: email || null,
      phone,
      plan,
      branch,
      fitnessGoal: fitnessGoal || null,
      message: message || null,
    });

    return NextResponse.json({ success: true, member: saved }, { status: 201 });
  } catch (error: any) {
    console.error("Member API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const members = await Storage.getMembers();
    return NextResponse.json({ success: true, members }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
