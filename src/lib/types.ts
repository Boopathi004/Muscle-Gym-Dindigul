export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string[];
  coordinates: { lat: number; lng: number };
  contactNumber: string;
  hours: { weekdays: string; sunday: string; womens?: string };
  amenities: string[];
  rating: string;
  reviews: number;
  mapUrl: string;
}

export interface Member {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  plan: string;
  branch: string;
  fitnessGoal: string | null;
  message: string | null;
  createdAt: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  subject: string | null;
  message: string;
  preferredBranch: string | null;
  preferredTime: string | null;
  createdAt: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  source: string;
  leadScore: number;
  status: string; // new, contacted, qualified, converted, lost
  notes: string | null;
  lastContactedAt: string | null;
  convertedAt: string | null;
  createdAt: string;
}
