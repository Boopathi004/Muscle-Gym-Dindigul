"use client";

import React, { useState, useEffect } from "react";
import {
  Users, MessageSquare, Award, TrendingUp,
  Search, ShieldAlert, Filter, Edit3,
  RefreshCw, Eye, EyeOff, Lock, LogOut, ShieldCheck
} from "lucide-react";
import { Member, Enquiry, Lead } from "@/lib/types";

// ─── Admin credentials (client-side guard — pair with server middleware for production) ──
const ADMIN_PASSWORD = "MuscleGym@2024";
const SESSION_KEY = "mg_admin_session";

// ─── Login Screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Short artificial delay for polish
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "true");
        onSuccess();
      } else {
        setError("Incorrect password. Try again.");
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,208,63,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orbFloat 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "orbFloat 8s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(244,208,63,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,208,63,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Login Card */}
      <div
        className={shaking ? "animate-shake" : ""}
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 1rem",
          background: "rgba(18,18,18,0.85)",
          border: "1px solid rgba(244,208,63,0.2)",
          borderRadius: "24px",
          padding: "40px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(244,208,63,0.05)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Icon */}
        <div className="flex flex-col items-center mb-8">
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(244,208,63,0.15), rgba(255,140,0,0.15))",
              border: "1px solid rgba(244,208,63,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              boxShadow: "0 0 30px rgba(244,208,63,0.15)",
            }}
          >
            <ShieldCheck className="text-brand-yellow w-8 h-8" />
          </div>
          <h1
            className="font-bebas tracking-widest text-3xl text-white"
            style={{ letterSpacing: "0.1em" }}
          >
            ADMIN ACCESS
          </h1>
          <p className="text-brand-gray text-xs mt-1 text-center">
            <span className="text-brand-yellow font-bold">Muscle</span> <span className="text-white font-bold">Gym</span> Dindigul — Restricted Area
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-brand-gray/50 focus:outline-none focus:border-brand-yellow transition-colors"
                style={{ fontSize: "14px" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gray hover:text-white transition-colors cursor-pointer"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "12px",
                color: "#f87171",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              background: loading
                ? "rgba(255,235,59,0.3)"
                : "linear-gradient(135deg, #FFEB3B, #FF893B)",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              padding: "13px",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: loading ? "none" : "0 0 24px rgba(255,235,59,0.3)",
              marginTop: "4px",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Unlock Dashboard"
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-brand-gray/50 mt-6">
          Authorized personnel only · <span className="text-brand-yellow font-bold">Muscle</span> <span className="text-white font-bold">Gym</span> Dindigul © 2024
        </p>
      </div>

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}

// ─── Main Admin Dashboard ────────────────────────────────────────────────────
export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [activeTab, setActiveTab] = useState<"leads" | "enquiries" | "members">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadStatusInput, setLeadStatusInput] = useState("");
  const [leadScoreInput, setLeadScoreInput] = useState(50);
  const [leadNotesInput, setLeadNotesInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Check session on mount
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "true") setAuthenticated(true);
    setCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const enqResponse = await fetch("/api/enquiries");
      const memResponse = await fetch("/api/members");

      if (enqResponse.ok && memResponse.ok) {
        const enqData = await enqResponse.json();
        const memData = await memResponse.json();
        setEnquiries(enqData.enquiries || []);
        setMembers(memData.members || []);

        const leadsResponse = await fetch("/api/leads");
        if (leadsResponse.ok) {
          const leadsData = await leadsResponse.json();
          setLeads(leadsData.leads || []);
        }
      }
    } catch (err) {
      console.error("Fetch dashboard error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchDashboardData();
  }, [authenticated]);

  const handleOpenEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadStatusInput(lead.status);
    setLeadScoreInput(lead.leadScore);
    setLeadNotesInput(lead.notes || "");
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/leads?id=${selectedLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: leadStatusInput,
          leadScore: Number(leadScoreInput),
          notes: leadNotesInput,
        }),
      });
      if (response.ok) {
        setSelectedLead(null);
        await fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const totalLeads = leads.length;
  const totalMembers = members.length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const conversionRate =
    totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";
  const averageLeadScore =
    totalLeads > 0
      ? (leads.reduce((acc, curr) => acc + curr.leadScore, 0) / totalLeads).toFixed(0)
      : "0";

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredEnquiries = enquiries.filter(
    (enq) =>
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.phone.includes(searchQuery) ||
      enq.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(
    (mem) =>
      mem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.phone.includes(searchQuery) ||
      mem.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Auth guard ────────────────────────────────────────────────────────────
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen py-10 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-dark-gray/30 pb-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow rounded-xl">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-white">ADMIN PORTAL</h1>
              <p className="text-brand-gray text-xs">Manage enquiries, score leads, and track memberships.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-1.5 bg-brand-dark-gray/30 border border-brand-dark-gray/60 hover:border-brand-yellow hover:text-brand-yellow px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* METRICS WIDGETS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Enquiries", value: enquiries.length, icon: <MessageSquare className="h-5 w-5" />, color: "brand-yellow" },
            { label: "Registered Members", value: totalMembers, icon: <Users className="h-5 w-5" />, color: "brand-orange" },
            { label: "Lead Conversion", value: `${conversionRate}%`, icon: <TrendingUp className="h-5 w-5" />, color: "brand-yellow" },
            { label: "Avg Lead Score", value: `${averageLeadScore}/100`, icon: <Award className="h-5 w-5" />, color: "brand-orange" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="glass-card p-6 rounded-2xl border border-brand-dark-gray/40 flex items-center justify-between"
            >
              <div>
                <span className={`text-brand-gray text-[10px] font-bold uppercase tracking-widest block mb-1`}>
                  {metric.label}
                </span>
                <span className="font-bebas text-3xl text-white tracking-wide">{metric.value}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-${metric.color}/10 flex items-center justify-center text-${metric.color}`}>
                {metric.icon}
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS BAR */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          <div className="flex bg-brand-surface-card p-1 rounded-xl border border-brand-dark-gray/40 w-max">
            {(["leads", "enquiries", "members"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black"
                    : "text-brand-gray hover:text-white"
                }`}
              >
                {tab === "leads" ? `Leads (${leads.length})` : tab === "enquiries" ? `Enquiries (${enquiries.length})` : `Members (${totalMembers})`}
              </button>
            ))}
          </div>

          <div className="flex flex-1 md:max-w-md items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-brand-gray" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-surface-card border border-brand-dark-gray/60 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>
            {activeTab === "leads" && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-brand-surface-card border border-brand-dark-gray/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            )}
          </div>
        </div>

        {/* DATA CONTAINER */}
        <div className="glass-card rounded-2xl border border-brand-dark-gray/50 overflow-hidden min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-10 h-10 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-xs text-brand-gray font-bold tracking-widest animate-pulse">SYNCING DATA STORAGE...</span>
            </div>
          ) : activeTab === "leads" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-brand-dark-gray/50 bg-brand-surface-card/45 font-bebas text-sm text-brand-yellow uppercase tracking-widest">
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-brand-dark-gray/30 hover:bg-brand-dark-gray/10 transition-colors">
                        <td className="p-4 font-semibold text-white">{lead.name}</td>
                        <td className="p-4 text-brand-gray">{lead.phone}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-brand-dark-gray/30 border border-brand-dark-gray/60 rounded text-[9px] font-bold uppercase tracking-wider text-brand-gray">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`font-bold ${lead.leadScore >= 80 ? "text-green-400" : lead.leadScore >= 50 ? "text-brand-yellow" : "text-brand-gray"}`}>
                            {lead.leadScore} / 100
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                            lead.status === "converted" ? "bg-green-500/10 border border-green-500/30 text-green-400" :
                            lead.status === "contacted" ? "bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow" :
                            lead.status === "lost" ? "bg-red-500/10 border border-red-500/30 text-red-400" :
                            "bg-brand-gray/10 border border-brand-gray/30 text-brand-gray"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-brand-gray max-w-[200px] truncate" title={lead.notes || ""}>{lead.notes || "-"}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleOpenEditLead(lead)}
                            className="bg-brand-dark-gray/40 hover:bg-brand-yellow hover:text-brand-black p-2 rounded-lg text-brand-gray transition-colors cursor-pointer"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7} className="p-8 text-center text-brand-gray text-xs">No matching leads discovered.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : activeTab === "enquiries" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-brand-dark-gray/50 bg-brand-surface-card/45 font-bebas text-sm text-brand-yellow uppercase tracking-widest">
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Preferred Branch</th>
                    <th className="p-4">Best Call Time</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="border-b border-brand-dark-gray/30 hover:bg-brand-dark-gray/10 transition-colors">
                        <td className="p-4 font-semibold text-white">{enq.name}</td>
                        <td className="p-4 text-brand-gray">{enq.phone}</td>
                        <td className="p-4 text-brand-light-gray">{enq.preferredBranch ? enq.preferredBranch.replace(" Branch", "") : "Any"}</td>
                        <td className="p-4 text-brand-gray">{enq.preferredTime || "-"}</td>
                        <td className="p-4 text-brand-gray max-w-[250px] truncate" title={enq.message}>{enq.message}</td>
                        <td className="p-4 text-brand-gray">{new Date(enq.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={6} className="p-8 text-center text-brand-gray text-xs">No matching enquiries discovered.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-brand-dark-gray/50 bg-brand-surface-card/45 font-bebas text-sm text-brand-yellow uppercase tracking-widest">
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Plan</th>
                    <th className="p-4">Branch</th>
                    <th className="p-4">Fitness Goal</th>
                    <th className="p-4">Signed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((mem) => (
                      <tr key={mem.id} className="border-b border-brand-dark-gray/30 hover:bg-brand-dark-gray/10 transition-colors">
                        <td className="p-4 font-semibold text-white">{mem.name}</td>
                        <td className="p-4 text-brand-gray">{mem.phone}</td>
                        <td className="p-4 text-brand-yellow font-bold">{mem.plan}</td>
                        <td className="p-4 text-brand-light-gray">{mem.branch.replace(" Branch", "")}</td>
                        <td className="p-4 text-brand-gray">{mem.fitnessGoal || "-"}</td>
                        <td className="p-4 text-brand-gray">{new Date(mem.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={6} className="p-8 text-center text-brand-gray text-xs">No matching members discovered.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* EDIT LEAD MODAL */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-brand-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card max-w-md w-full rounded-2xl border border-brand-yellow/30 p-6 relative">
              <h3 className="font-bebas text-2xl text-white tracking-wider mb-4 border-b border-brand-dark-gray/30 pb-2">
                UPDATE LEAD: <span className="text-brand-yellow">{selectedLead.name}</span>
              </h3>
              <form onSubmit={handleUpdateLead} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gray mb-1">Lead Status</label>
                  <select
                    value={leadStatusInput}
                    onChange={(e) => setLeadStatusInput(e.target.value)}
                    className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow"
                  >
                    {["new","contacted","qualified","converted","lost"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gray mb-1">Engagement Score (0-100)</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="100" value={leadScoreInput} onChange={(e) => setLeadScoreInput(Number(e.target.value))} className="flex-1 accent-brand-yellow cursor-pointer" />
                    <span className="text-xs font-bold text-white w-8 text-right">{leadScoreInput}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-gray mb-1">Internal Manager Notes</label>
                  <textarea rows={3} value={leadNotesInput} onChange={(e) => setLeadNotesInput(e.target.value)} placeholder="Enter follow-up comments..." className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-yellow resize-none" />
                </div>
                <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-brand-dark-gray/30">
                  <button type="button" onClick={() => setSelectedLead(null)} className="px-4 py-2 border border-brand-dark-gray/85 rounded-lg text-xs font-bold uppercase tracking-wider text-brand-gray hover:text-white cursor-pointer">Cancel</button>
                  <button type="submit" disabled={isUpdating} className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
