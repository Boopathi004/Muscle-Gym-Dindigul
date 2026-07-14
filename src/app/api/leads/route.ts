import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

export async function GET() {
  try {
    const leads = await Storage.getLeads();
    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error) {
    console.error("GET Leads API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    
    if (!idParam) {
      return NextResponse.json(
        { error: "Lead ID is required." },
        { status: 400 }
      );
    }

    const id = parseInt(idParam, 10);
    const body = await req.json();
    const { status, leadScore, notes } = body;

    // Update status and notes if provided
    if (status !== undefined) {
      await Storage.updateLeadStatus(id, status, notes);
    }
    
    // Update score if provided
    if (leadScore !== undefined) {
      await Storage.updateLeadScore(id, leadScore);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("PUT Leads API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
