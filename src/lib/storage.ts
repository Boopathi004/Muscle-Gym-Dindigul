import fs from "fs";
import path from "path";
import { Member, Enquiry, Lead } from "./types";

const MOCK_DB_PATH = path.join(process.cwd(), "src/db/mock-db.json");

interface MockDBData {
  members: Member[];
  enquiries: Enquiry[];
  leads: Lead[];
}

// Ensure mock db file exists
function ensureMockDB(): MockDBData {
  const dir = path.dirname(MOCK_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(MOCK_DB_PATH)) {
    const defaultData: MockDBData = {
      members: [],
      enquiries: [],
      leads: [
        {
          id: 1,
          name: "Rajesh Sekar",
          email: "rajesh@gmail.com",
          phone: "9876543210",
          source: "google_ads",
          leadScore: 85,
          status: "contacted",
          notes: "Interested in the Pro Membership Plan. Preferred Begampur branch.",
          lastContactedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          convertedAt: null,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          name: "Vikram Nathan",
          email: "vikram@yahoo.com",
          phone: "9123456789",
          source: "social",
          leadScore: 45,
          status: "new",
          notes: "Submitted general inquiry about operating hours.",
          lastContactedAt: null,
          convertedAt: null,
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Subha Sri",
          email: "subha.sri@outlook.com",
          phone: "9944112233",
          source: "organic",
          leadScore: 95,
          status: "converted",
          notes: "Signed up for the 12-Month Transformation Plan! Assigned to Master Rajkumar.",
          lastContactedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          convertedAt: new Date().toISOString(),
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ]
    };
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }

  try {
    const data = fs.readFileSync(MOCK_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading mock DB, resetting", e);
    const defaultData: MockDBData = { members: [], enquiries: [], leads: [] };
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

// Read/write functions helper
function writeMockDB(data: MockDBData) {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export const Storage = {
  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    const db = ensureMockDB();
    return db.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async addEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt">): Promise<Enquiry> {
    const db = ensureMockDB();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: db.enquiries.length > 0 ? Math.max(...db.enquiries.map((e) => e.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
    };
    db.enquiries.push(newEnquiry);

    // Create a corresponding Lead automatically!
    const newLead: Lead = {
      id: db.leads.length > 0 ? Math.max(...db.leads.map((l) => l.id)) + 1 : 1,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      source: "organic", // Default to organic search
      leadScore: 60,     // Initial score for submitting an enquiry
      status: "new",
      notes: `Inquiry: "${enquiry.message}" (Preferred Branch: ${enquiry.preferredBranch || "Any"})`,
      lastContactedAt: null,
      convertedAt: null,
      createdAt: new Date().toISOString(),
    };
    db.leads.push(newLead);

    writeMockDB(db);
    return newEnquiry;
  },

  // Members
  async getMembers(): Promise<Member[]> {
    const db = ensureMockDB();
    return db.members.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async addMember(member: Omit<Member, "id" | "createdAt">): Promise<Member> {
    const db = ensureMockDB();
    const newMember: Member = {
      ...member,
      id: db.members.length > 0 ? Math.max(...db.members.map((m) => m.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
    };
    db.members.push(newMember);

    // Create / Update corresponding Lead
    const newLead: Lead = {
      id: db.leads.length > 0 ? Math.max(...db.leads.map((l) => l.id)) + 1 : 1,
      name: member.name,
      email: member.email,
      phone: member.phone,
      source: "organic",
      leadScore: 100, // Direct conversion score!
      status: "converted",
      notes: `Registered for plan: ${member.plan} at branch: ${member.branch}. Goal: ${member.fitnessGoal || "Unspecified"}.`,
      lastContactedAt: new Date().toISOString(),
      convertedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    db.leads.push(newLead);

    writeMockDB(db);
    return newMember;
  },

  // Leads (for Admin Panel)
  async getLeads(): Promise<Lead[]> {
    const db = ensureMockDB();
    return db.leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async updateLeadStatus(id: number, status: string, notes?: string): Promise<Lead | null> {
    const db = ensureMockDB();
    const leadIndex = db.leads.findIndex((l) => l.id === id);
    if (leadIndex === -1) return null;

    db.leads[leadIndex].status = status;
    db.leads[leadIndex].lastContactedAt = new Date().toISOString();
    if (notes) {
      db.leads[leadIndex].notes = notes;
    }
    if (status === "converted") {
      db.leads[leadIndex].convertedAt = new Date().toISOString();
      db.leads[leadIndex].leadScore = 100;
    }
    
    writeMockDB(db);
    return db.leads[leadIndex];
  },

  async updateLeadScore(id: number, score: number): Promise<Lead | null> {
    const db = ensureMockDB();
    const leadIndex = db.leads.findIndex((l) => l.id === id);
    if (leadIndex === -1) return null;

    db.leads[leadIndex].leadScore = score;
    writeMockDB(db);
    return db.leads[leadIndex];
  }
};
