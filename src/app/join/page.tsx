"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Dumbbell, Award, Flame, UserCheck } from "lucide-react";
import { INITIAL_BRANCHES } from "@/lib/constants";
import confetti from "canvas-confetti";

function JoinForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Pro Cardio Plan",
    branch: "Muscle Gym, Bagambur",
    fitnessGoal: "Muscle Gain",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-fill form from URL parameters
  useEffect(() => {
    const planParam = searchParams.get("plan");
    const branchParam = searchParams.get("branch");

    if (planParam) {
      setFormData((prev) => ({ ...prev, plan: planParam }));
    }
    if (branchParam) {
      const match = INITIAL_BRANCHES.find(b => b.name.toLowerCase().includes(branchParam.toLowerCase()));
      if (match) {
        setFormData((prev) => ({ ...prev, branch: match.name }));
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#FFEB3B", "#FF893B", "#ffffff"]
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          plan: "Pro Cardio Plan",
          branch: "Muscle Gym, Bagambur",
          fitnessGoal: "Muscle Gain",
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-brand-dark-gray/80 relative">
      {submitSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
          <div className="w-20 h-20 rounded-full bg-brand-yellow/10 border border-brand-yellow flex items-center justify-center text-brand-yellow animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="font-bebas text-3xl text-white tracking-widest">REGISTRATION SUCCESSFUL!</h3>
          <p className="text-brand-gray text-xs leading-relaxed max-w-sm">
            Welcome to the Muscle Gym family! Your membership spot is reserved. A gym coach will contact you within 2 hours to activate your plan.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-4 text-xs font-bold text-brand-yellow hover:text-white uppercase tracking-widest underline cursor-pointer"
          >
            Register Another Spot
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h3 className="font-bebas text-2xl text-white tracking-wider mb-2">Member Sign-Up Form</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter name"
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="10-digit number"
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Select Membership Plan</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
              >
                <option value="Starter Plan">Starter Plan (₹1,200/mo)</option>
                <option value="Pro Cardio Plan">Pro Cardio Plan (₹2,000/mo)</option>
                <option value="Transformation Plan">Transformation Plan (₹5,000/mo)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Preferred Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
              >
                {INITIAL_BRANCHES.map((b) => (
                  <option key={b.id} value={b.name}>{b.name.replace(" Branch", "")}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Fitness Goal</label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleInputChange}
                className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
              >
                <option value="Muscle Gain">Muscle Gain & Hypertrophy</option>
                <option value="Weight Loss">Weight Loss & Fat Burn</option>
                <option value="Strength Training">Powerlifting & Strength</option>
                <option value="General Fitness">General Fitness & Core</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Remarks / Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Preferred training times, past injuries, query notes..."
              rows={3}
              className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase py-4 rounded-xl hover:scale-102 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Dumbbell className="h-4.5 w-4.5" /> {isSubmitting ? "Processing spot..." : "Confirm Registration"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function Join() {
  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            JOIN <span className="text-brand-yellow">MUSCLE GYM</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Secure your membership spot. Select your branch and goals, and start training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Benefits text */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              YOUR DISCIPLINE. YOUR <span className="text-brand-yellow">BODY</span>.
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">
              Unlock a premium fitness experience. Join our community to access high-quality equipment, AC training floors, and get a customized diet profile.
            </p>

            <div className="flex flex-col gap-4 text-xs font-bold text-brand-gray uppercase text-left max-w-sm mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <span>Coached by Master Rajkumar (18+ yrs)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                  <Flame className="h-5 w-5" />
                </div>
                <span>Imported Heavy-Duty Lifting Gear</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                  <UserCheck className="h-5 w-5" />
                </div>
                <span>Secured Unisex Gym environment</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form with Suspense for useSearchParams */}
          <div className="lg:col-span-7">
            <Suspense fallback={
              <div className="glass-card p-10 rounded-3xl border border-brand-dark-gray/50 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin mb-4" />
                <span className="text-xs text-brand-gray uppercase font-bold animate-pulse">Loading signup sheet...</span>
              </div>
            }>
              <JoinForm />
            </Suspense>
          </div>
        </div>

      </div>
    </div>
  );
}
