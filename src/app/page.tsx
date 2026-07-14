"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Dumbbell, Flame, ShieldAlert, Award, MapPin, 
  Phone, Users, ChevronRight, Star, Heart, ArrowRight,
  MessageSquare, Sparkles, CheckCircle2
} from "lucide-react";
import ThreeDScene from "@/components/ThreeDScene";
import TiltCard from "@/components/TiltCard";
import { INITIAL_BRANCHES, INITIAL_PROGRAMS, INITIAL_TESTIMONIALS } from "@/lib/constants";
import confetti from "canvas-confetti";

export default function Home() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    goal: "Muscle Gain",
    branch: "Begampur Branch",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Active testimonial slider index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          preferredBranch: formData.branch,
          message: `Goal: ${formData.goal}. Message: ${formData.message || "Consultation request"}`
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Trigger confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F4D03F", "#FF8C00", "#ffffff"]
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          goal: "Muscle Gain",
          branch: "Begampur Branch",
          message: ""
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/50 to-brand-black pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden">
        {/* Left Side: Headlines */}
        <div className="flex flex-col gap-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-orange/20 rounded-full w-max mx-auto lg:mx-0">
            <Sparkles className="h-4 w-4 text-brand-yellow" />
            <span className="text-xs font-semibold text-brand-yellow uppercase tracking-widest">
              Dindigul's Premier Power Zone
            </span>
          </div>
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wider text-white">
            BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange text-neon-glow-orange">STRENGTH</span><br />
            BURN LIMITS<br />
            BECOME <span className="text-brand-yellow">MUSCLE</span>
          </h1>
          <p className="text-brand-gray text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Train at Muscle Gym Dindigul — strength training, weight loss, powerlifting, and transformation programs with imported premium gear under Master Rajkumar's expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-4">
            <Link
              href="/join"
              className="w-full sm:w-auto bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black px-8 py-4 rounded-full font-extrabold text-base tracking-wider hover:scale-105 hover:shadow-[0_0_20px_rgba(255,140,0,0.5)] transition-all duration-300 uppercase flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://wa.me/919787045050?text=Hi%20Muscle%20Gym%20Dindigul,%20I'm%20interested%20in%20joining%20the%20gym!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-brand-dark-gray/80 hover:border-brand-yellow hover:text-brand-yellow px-8 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right Side: 3D Scene */}
        <div className="relative flex items-center justify-center h-[400px] md:h-[500px] lg:h-[600px] z-10">
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-brand-orange/10 to-brand-yellow/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
          <ThreeDScene />
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-black/80 border-y border-brand-dark-gray/30 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col gap-1">
            <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-brand-yellow text-neon-glow">3</span>
            <span className="text-brand-gray text-xs sm:text-sm uppercase tracking-wider font-bold">Premium Branches</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-brand-orange text-neon-glow-orange">18+</span>
            <span className="text-brand-gray text-xs sm:text-sm uppercase tracking-wider font-bold">Years Experience</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-brand-yellow text-neon-glow">10+</span>
            <span className="text-brand-gray text-xs sm:text-sm uppercase tracking-wider font-bold">Expert Coaches</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bebas text-4xl sm:text-5xl md:text-6xl text-brand-orange text-neon-glow-orange">5000+</span>
            <span className="text-brand-gray text-xs sm:text-sm uppercase tracking-wider font-bold">Members Transformed</span>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
            WHY <span className="text-brand-yellow">MUSCLE GYM</span> DINDIGUL
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Dindigul's premier health center offering an unparalleled gym atmosphere, specialized bodybuilding training, and premium amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard className="glass-card p-8 rounded-2xl border-neon-glow flex flex-col gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-xl flex items-center justify-center text-brand-black">
              <Award className="h-7 w-7" />
            </div>
            <h3 className="font-bebas text-2xl text-white tracking-wide">Expert Mentorship</h3>
            <p className="text-brand-gray text-sm leading-relaxed">
              Train directly under Master Rajkumar, an acclaimed bodybuilding veteran with 18+ years of coaching success. Correct mechanics, optimal planning.
            </p>
          </TiltCard>

          <TiltCard className="glass-card p-8 rounded-2xl border-neon-glow flex flex-col gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-xl flex items-center justify-center text-brand-black">
              <Dumbbell className="h-7 w-7" />
            </div>
            <h3 className="font-bebas text-2xl text-white tracking-wide">Imported Premium Gear</h3>
            <p className="text-brand-gray text-sm leading-relaxed">
              Equipped with high-end, bio-mechanically sound imported weight plates, heavy-duty racks, dumbbells, cable pulley rows, and elite cardio machines.
            </p>
          </TiltCard>

          <TiltCard className="glass-card p-8 rounded-2xl border-neon-glow flex flex-col gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-xl flex items-center justify-center text-brand-black">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="font-bebas text-2xl text-white tracking-wide">Motivating Atmosphere</h3>
            <p className="text-brand-gray text-sm leading-relaxed">
              Unisex training environment, fully air-conditioned interiors, motivational workout soundtrack, locker facilities, and a supportive fitness community.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* TRAINING PROGRAMS PREVIEW */}
      <section className="py-24 bg-brand-surface-card/30 border-y border-brand-dark-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
                ELITE <span className="text-brand-yellow">TRAINING</span> CLASSES
              </h2>
              <p className="text-brand-gray text-sm mt-2">
                Engineered workouts for targeted results, from beginners to pro athletes.
              </p>
            </div>
            <Link
              href="/programs"
              className="text-brand-yellow hover:text-white flex items-center gap-1 font-bold text-sm uppercase tracking-wider group transition-colors"
            >
              View All Programs <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_PROGRAMS.slice(0, 3).map((prog) => (
              <div 
                key={prog.id} 
                className="glass-card p-6 rounded-2xl border border-brand-dark-gray/50 hover:border-brand-yellow/30 hover:shadow-[0_4px_25px_rgba(244,208,63,0.05)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-xl flex items-center justify-center text-brand-yellow mb-5">
                    {prog.id === 1 ? <Dumbbell className="h-6 w-6" /> : prog.id === 2 ? <Flame className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
                  </div>
                  <h3 className="font-bebas text-xl tracking-wide text-white mb-2">{prog.title}</h3>
                  <p className="text-brand-gray text-xs leading-relaxed mb-6">{prog.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-brand-dark-gray/20">
                  <span className="text-xs text-brand-gray font-bold">{prog.schedule}</span>
                  <Link href="/join" className="text-xs text-brand-yellow hover:text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1">
                    Book Class <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
            TRANSFORMATION <span className="text-brand-orange">REVIEWS</span>
          </h2>
          <p className="text-brand-gray text-sm mt-3">
            Real stories of weight loss, strength gains, and active lifestyle changes from our local members.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto glass-card p-8 sm:p-12 rounded-3xl border border-brand-yellow/20 shadow-[0_10px_40px_rgba(244,208,63,0.03)]">
          {/* Quote Icon */}
          <span className="absolute top-6 right-8 text-8xl font-serif text-brand-yellow/10 pointer-events-none">“</span>
          
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-1">
              {[...Array(INITIAL_TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>

            <p className="text-white text-base sm:text-lg italic leading-relaxed font-medium">
              "{INITIAL_TESTIMONIALS[activeTestimonial].quote}"
            </p>

            <div className="mt-4">
              <h4 className="font-bebas text-2xl text-brand-yellow tracking-wide">
                {INITIAL_TESTIMONIALS[activeTestimonial].name}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-brand-gray font-bold uppercase mt-1">
                <span>Goal: {INITIAL_TESTIMONIALS[activeTestimonial].goal}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span className="text-brand-orange">Result: {INITIAL_TESTIMONIALS[activeTestimonial].result}</span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {INITIAL_TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? "bg-brand-yellow w-6" : "bg-brand-dark-gray/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* QUICK CONSULTATION / LEAD CAPTURE */}
      <section className="py-24 bg-gradient-to-t from-brand-surface to-brand-black border-t border-brand-dark-gray/30 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Offer Content */}
          <div className="flex flex-col gap-5">
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">
              GET A FREE <span className="text-brand-yellow">COACHING</span> SESSION
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">
              Submit your details now to book a free 1-day pass. Tour the facility, test the premium imported machines, and get a professional fat loss/strength assessment from Master Rajkumar.
            </p>
            <div className="flex flex-col gap-3 text-sm text-brand-gray font-bold mt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                <span>Zero obligations. Completely free first visit.</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                <span>Custom nutrition and macros roadmap.</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                <span>Tour of all three branches in Dindigul.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="glass-card p-8 rounded-3xl border border-brand-dark-gray/80 relative">
            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow flex items-center justify-center text-brand-yellow animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide">BOOKING REQUESTED!</h3>
                <p className="text-brand-gray text-xs leading-relaxed max-w-xs">
                  Thank you! Our gym manager will contact you within 2 hours to confirm your free training session. Get ready to train hard!
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 text-xs font-bold text-brand-yellow hover:text-white uppercase tracking-wider underline"
                >
                  Book another session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-bebas text-2xl text-white tracking-wider mb-2">Book Your Visit</h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 10-digit number"
                    className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1">Fitness Goal</label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors"
                    >
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Strength Training">Strength Training</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1">Select Branch</label>
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
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Preferred time, queries, etc."
                    rows={2}
                    className="w-full bg-brand-black border border-brand-dark-gray/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-sm uppercase py-3.5 rounded-xl hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all duration-300 flex items-center justify-center mt-2 cursor-pointer"
                >
                  {isSubmitting ? "Bookings Loading..." : "Claim Free Pass"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
