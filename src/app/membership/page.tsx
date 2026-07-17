"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, Phone, HelpCircle } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter Plan",
      monthlyPrice: "1,200",
      yearlyPrice: "10,000",
      desc: "Perfect for budget-conscious lifting and consistent strength workouts.",
      features: [
        "Unisex Gym Floor Access",
        "Imported Strength Equipment",
        "General Trainer Assistance",
        "Locker Room & Showers",
        "AC Floor Access",
      ],
      notIncluded: [
        "Cardio Zone access",
        "Master Rajkumar Diet Plans",
        "Personal Training Support",
        "Progress Analytics Tracking",
      ],
      popular: false,
    },
    {
      name: "Pro Cardio Plan",
      monthlyPrice: "2,000",
      yearlyPrice: "16,000",
      desc: "Our most popular tier. Full gym floor access including metabolic cardio zones.",
      features: [
        "Unisex Gym Floor Access",
        "Imported Strength Equipment",
        "Full Cardio Zone Access",
        "General Trainer Assistance",
        "Locker Room & Showers",
        "AC Floor Access",
        "Supplements Store Discount (5%)",
      ],
      notIncluded: [
        "Master Rajkumar Diet Plans",
        "Personal Training Support",
        "Progress Analytics Tracking",
      ],
      popular: true,
    },
    {
      name: "Transformation Plan",
      monthlyPrice: "5,000",
      yearlyPrice: "45,000",
      desc: "Premium 1-on-1 coaching under Master Rajkumar. Fully customized results.",
      features: [
        "Unisex Gym Floor Access",
        "Imported Strength Equipment",
        "Full Cardio Zone Access",
        "Personal Coach: Master Rajkumar",
        "Custom Nutrition & Macro Diet Profile",
        "Weekly Body Metrics Assessment",
        "Locker Room & Showers",
        "AC Floor Access",
        "Supplements Store Discount (15%)",
      ],
      notIncluded: [],
      popular: false,
      recommended: true,
    },
  ];

  const comparisonFeatures = [
    { name: "Strength Floor Access", starter: true, pro: true, trans: true },
    { name: "AC Gym Environment", starter: true, pro: true, trans: true },
    { name: "Lockers & Showers", starter: true, pro: true, trans: true },
    { name: "Cardio Machines Access", starter: false, pro: true, trans: true },
    { name: "Supplements Store Discount", starter: false, pro: "5%", trans: "15%" },
    { name: "Master Rajkumar Coaching", starter: false, pro: false, trans: true },
    { name: "Custom Nutrition Diet Charts", starter: false, pro: false, trans: true },
    { name: "Weekly Body Fat/Weight Assessment", starter: false, pro: false, trans: true },
  ];

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            MEMBERSHIP <span className="text-brand-yellow">PLANS</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Choose the membership tier that fits your timeline and training objectives.
          </p>
        </div>

        {/* BILLING TOGGLE */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-xs font-bold uppercase tracking-wider ${billingCycle === "monthly" ? "text-brand-yellow" : "text-brand-gray"}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="w-14 h-7 bg-brand-dark-gray/50 rounded-full p-1 transition-all duration-300 relative border border-brand-dark-gray cursor-pointer"
          >
            <div className={`w-5 h-5 bg-gradient-to-tr from-brand-yellow to-brand-orange rounded-full transition-all duration-300 ${billingCycle === "yearly" ? "translate-x-7" : "translate-x-0"}`} />
          </button>
          <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-brand-yellow" : "text-brand-gray"}`}>
            Billed Annually <span className="px-2 py-0.5 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange rounded text-[9px] font-black">SAVE 20%</span>
          </span>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {plans.map((plan) => {
            const isHighlight = plan.popular || plan.recommended;
            return (
              <TiltCard
                key={plan.name}
                className={`glass-card rounded-3xl border p-8 flex flex-col justify-between h-full transition-all duration-300 ${
                  plan.recommended 
                    ? "border-brand-yellow shadow-[0_4px_30px_rgba(244,208,63,0.08)] bg-gradient-to-b from-brand-yellow/[0.02] to-transparent" 
                    : plan.popular 
                    ? "border-brand-orange/70 shadow-[0_4px_30px_rgba(255,140,0,0.05)]" 
                    : "border-brand-dark-gray/50"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bebas text-2xl tracking-wider text-white">{plan.name}</h3>
                    {plan.recommended && (
                      <span className="bg-brand-yellow text-brand-black text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> COACH CHOICE
                      </span>
                    )}
                    {plan.popular && (
                      <span className="bg-brand-orange text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <p className="text-brand-gray text-xs leading-relaxed mb-6">{plan.desc}</p>
                  
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">₹</span>
                    <span className="text-5xl font-bebas tracking-wide text-white">
                      {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-brand-gray text-xs font-bold uppercase tracking-wider ml-1">
                      / {billingCycle === "monthly" ? "Month" : "Year"}
                    </span>
                  </div>

                  {/* Features checklist */}
                  <div className="flex flex-col gap-3.5 mb-8">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-brand-light-gray">
                        <Check className="h-4.5 w-4.5 text-brand-yellow shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-brand-gray/50 line-through">
                        <X className="h-4.5 w-4.5 text-brand-dark-gray shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/join?plan=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-widest text-center transition-all duration-300 block ${
                    isHighlight
                      ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black hover:shadow-[0_0_15px_rgba(255,140,0,0.3)]"
                      : "bg-brand-dark-gray/30 border border-brand-dark-gray/80 text-brand-gray hover:text-white hover:border-brand-yellow"
                  }`}
                >
                  Subscribe Plan
                </Link>
              </TiltCard>
            );
          })}
        </div>

        {/* DETAILED COMPARISON TABLE */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-bebas text-3xl text-white tracking-widest uppercase">
              FEATURE <span className="text-brand-orange">COMPARISON</span>
            </h3>
          </div>

          {/* Scroll Cue on Mobile */}
          <div className="lg:hidden flex items-center justify-center gap-1.5 text-[10px] text-brand-gray/80 font-bold uppercase tracking-widest mb-3 bg-brand-surface-card/20 py-1.5 rounded-lg border border-brand-dark-gray/20">
            <span>Swipe Left/Right to Compare Features</span>
            <span className="animate-pulse text-brand-yellow font-black">↔</span>
          </div>

          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-brand-orange scrollbar-track-transparent glass-card rounded-2xl border border-brand-dark-gray/60 scroll-hint">
                <table className="w-full text-left border-collapse text-xs md:text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-dark-gray/60 font-bebas text-base text-brand-yellow uppercase tracking-widest bg-brand-surface-card/45">
                  <th className="p-4 md:p-6 text-left min-w-[160px]">Gym Amenity / Feature</th>
                  <th className="p-4 md:p-6 text-center min-w-[90px]">Starter</th>
                  <th className="p-4 md:p-6 text-center min-w-[90px]">Pro Cardio</th>
                  <th className="p-4 md:p-6 text-center min-w-[110px]">Transformation</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className="border-b border-brand-dark-gray/30 hover:bg-brand-dark-gray/10 transition-colors">
                    <td className="p-4 md:p-6 font-semibold text-white">{row.name}</td>
                    <td className="p-4 md:p-6 text-center text-brand-gray">
                      {typeof row.starter === "boolean" ? (row.starter ? <Check className="h-5 w-5 text-brand-yellow mx-auto" /> : <X className="h-5 w-5 text-brand-dark-gray mx-auto" />) : row.starter}
                    </td>
                    <td className="p-4 md:p-6 text-center text-brand-gray">
                      {typeof row.pro === "boolean" ? (row.pro ? <Check className="h-5 w-5 text-brand-yellow mx-auto" /> : <X className="h-5 w-5 text-brand-dark-gray mx-auto" />) : row.pro}
                    </td>
                    <td className="p-4 md:p-6 text-center text-brand-gray">
                      {typeof row.trans === "boolean" ? (row.trans ? <Check className="h-5 w-5 text-brand-yellow mx-auto" /> : <X className="h-5 w-5 text-brand-dark-gray mx-auto" />) : row.trans}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs SUMMARY */}
        <section className="max-w-3xl mx-auto bg-brand-surface-card/30 border border-brand-dark-gray/50 p-8 rounded-2xl">
          <h4 className="font-bebas text-2xl text-white tracking-wider mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-brand-yellow" /> Membership FAQ
          </h4>
          <div className="flex flex-col gap-5 text-xs sm:text-sm">
            <div>
              <p className="font-bold text-white mb-1">Is there an admission / setup fee?</p>
              <p className="text-brand-gray leading-relaxed">No, there are zero admission fees or hidden service charges. You only pay for your plan duration.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Can I access multiple branches with my membership?</p>
              <p className="text-brand-gray leading-relaxed">Yes, Pro and Transformation members can train across all 3 branches in Dindigul at no additional charge.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Are there separate batches for women?</p>
              <p className="text-brand-gray leading-relaxed">Yes, we support highly flexible unisex batches and designated session timings with expert female trainer options.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
