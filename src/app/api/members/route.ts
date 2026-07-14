import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, plan, branch, fitnessGoal, message } = body;

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
