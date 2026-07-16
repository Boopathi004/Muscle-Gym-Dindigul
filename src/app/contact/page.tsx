"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, CheckCircle2, MessageSquare, Send } from "lucide-react";
import { INITIAL_BRANCHES } from "@/lib/constants";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Membership Inquiry",
    preferredBranch: "Muscle Gym, Bagambur",
    preferredTime: "Morning (06:00 AM - 11:00 AM)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          preferredBranch: formData.preferredBranch,
          preferredTime: formData.preferredTime,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F4D03F", "#FF8C00", "#ffffff"]
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Membership Inquiry",
          preferredBranch: "Muscle Gym, Bagambur",
          preferredTime: "Morning (06:00 AM - 11:00 AM)",
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
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white">
            CONTACT <span className="text-brand-yellow">MUSCLE GYM</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Have questions about prices, offers, or personal training? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Columns: Contact info cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 rounded-2xl border border-brand-dark-gray/50 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bebas text-lg text-white tracking-wide mb-1">Phone Contacts</h4>
                <p className="text-brand-gray text-xs leading-relaxed">Begampur: 9787045050</p>
                <p className="text-brand-gray text-xs leading-relaxed">Trichy Bypass: 9944579994</p>
                <p className="text-brand-gray text-xs leading-relaxed">Palani Road: 9600578808</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-brand-dark-gray/50 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bebas text-lg text-white tracking-wide mb-1">Email Address</h4>
                <p className="text-brand-gray text-xs leading-relaxed">contact@musclegymdindigul.com</p>
                <p className="text-brand-gray text-xs leading-relaxed">support@musclegymdindigul.com</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-brand-dark-gray/50 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bebas text-lg text-white tracking-wide mb-1">Operating Hours</h4>
                <p className="text-brand-gray text-xs leading-relaxed">Monday - Saturday: 05:30 AM - 09:30 PM</p>
                <p className="text-brand-gray text-xs leading-relaxed">Sunday Batches: 05:30 AM - 10:00 AM</p>
              </div>
            </div>
          </div>

          {/* Right Columns: Inquiry Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-brand-dark-gray/80 relative">
            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow flex items-center justify-center text-brand-yellow animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide">MESSAGE TRANSMITTED!</h3>
                <p className="text-brand-gray text-xs leading-relaxed max-w-xs">
                  We have logged your enquiry! A gym manager from your preferred branch will reach out to you within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 text-xs font-bold text-brand-yellow hover:text-white uppercase tracking-widest underline cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-bebas text-2xl text-white tracking-wider mb-2">Send General Enquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Name</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
                    >
                      <option value="Membership Inquiry">Membership Inquiry</option>
                      <option value="Personal Training Options">Personal Training Options</option>
                      <option value="Complaints / Feedback">Complaints / Feedback</option>
                      <option value="Other Queries">Other Queries</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Preferred Branch</label>
                    <select
                      name="preferredBranch"
                      value={formData.preferredBranch}
                      onChange={handleInputChange}
                      className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
                    >
                      {INITIAL_BRANCHES.map((b) => (
                        <option key={b.id} value={b.name}>{b.name.replace(" Branch", "")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Best Time to Call</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
                    >
                      <option value="Morning (06:00 AM - 11:00 AM)">Morning (06:00 AM - 11:00 AM)</option>
                      <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                      <option value="Evening (05:00 PM - 09:00 PM)">Evening (05:00 PM - 09:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your queries here..."
                    rows={4}
                    className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase py-4 rounded-xl hover:scale-102 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="h-4.5 w-4.5" /> {isSubmitting ? "Transmitting..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
