"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  Dumbbell, Flame, Award, MapPin, 
  Phone, Users, ChevronRight, Star, Heart, ArrowRight,
  MessageSquare, Sparkles, CheckCircle2
} from "lucide-react";
import TiltCard from "@/components/TiltCard";

import { INITIAL_BRANCHES, INITIAL_PROGRAMS, INITIAL_TESTIMONIALS } from "@/lib/constants";




export default function Home() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    goal: "Muscle Gain",
    branch: "Muscle Gym, Bagambur",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Active testimonial slider index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length), 6000);
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
        // Dynamically import confetti — only loads when actually needed
        import("canvas-confetti").then(({ default: confetti }) => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFEB3B", "#FF893B", "#ffffff"]
          });
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          goal: "Muscle Gain",
          branch: "Muscle Gym, Bagambur",
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
    <div className="relative min-h-screen" id="homePage">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/50 to-brand-black pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center overflow-hidden">
        {/* Left Side: Headlines */}
        <div className="flex flex-col gap-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-orange/20 rounded-full w-max mx-auto lg:mx-0">
            <Sparkles className="h-4 w-4 text-brand-yellow" />
            <span className="text-xs font-semibold text-brand-yellow uppercase tracking-widest">
              Dindigul's Premier Power Zone
            </span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wider text-white">
            UNLEASH YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange text-neon-glow-orange">STRENGTH</span><br />
            BURN LIMITS<br />
            BECOME <span className="text-brand-yellow">MUSCLE</span>
          </h1>
          <p className="text-brand-gray text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Train at Muscle Gym Dindigul — strength training, weight loss, powerlifting, and transformation programs with imported premium gear under Master Rajkumar's expert guidance.
            <br/><br/>
            <span className="hidden sm:inline">Muscle Gym Dindigul operates 3 branches in Begampur, Trichy Bypass Road, and Palani Road, and has been coaching members under Master Rajkumar for over 18 years.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-4">
            <Link
              href="/join"
              className="w-full sm:w-auto bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black px-8 py-4 rounded-full font-extrabold text-base tracking-wider hover:scale-105 hover:shadow-[0_0_20px_rgba(255,140,0,0.5)] transition-all duration-300 uppercase flex items-center justify-center gap-2"
            >
              Join Now <ArrowRight className="h-5 w-5" />
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

        {/* Right Side: Video */}
        <div className="relative flex items-center justify-center h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] z-10 rounded-3xl overflow-hidden border border-brand-dark-gray/50 shadow-[0_0_40px_rgba(244,208,63,0.15)] group">
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-brand-orange/20 to-brand-yellow/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-black/80 border-y border-brand-dark-gray/30 py-8 relative reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
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
      <section className="py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
            WHY <span className="text-brand-yellow">MUSCLE</span> <span className="text-white">GYM</span> DINDIGUL
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Dindigul's premier health center offering an unparalleled gym atmosphere, specialized bodybuilding training, and premium amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
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



      {/* TESTIMONIALS SLIDER */}
      <section className="py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden reveal-on-scroll">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
            TRANSFORMATION <span className="text-brand-orange">REVIEWS</span>
          </h2>
          <p className="text-brand-gray text-sm mt-3">
            Real stories of weight loss, strength gains, and active lifestyle changes from our local members.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto glass-card p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-brand-yellow/20 shadow-[0_10px_40px_rgba(244,208,63,0.03)]">
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
      <section className="py-12 sm:py-24 bg-gradient-to-t from-brand-surface to-brand-black border-t border-brand-dark-gray/30 relative reveal-on-scroll">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Offer Content */}
          <div className="flex flex-col gap-5">
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">
              BOOK A <span className="text-brand-yellow">COACHING</span> SESSION
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">
              Submit your details now to book a training session. Tour the facility, test the premium imported machines, and get a professional fat loss/strength assessment from Master Rajkumar.
            </p>
            <div className="flex flex-col gap-3 text-sm text-brand-gray font-bold mt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow" />
                <span>Zero obligations. Tour our premium facility.</span>
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
                  Thank you! Our gym manager will contact you within 2 hours to confirm your training session. Get ready to train hard!
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  {isSubmitting ? "Bookings Loading..." : "Book Session"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION (GEO & SEO Optimization) */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-widest mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mb-4"></div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-brand-dark-gray/30 p-6 rounded-2xl border border-brand-dark-gray">
            <h3 className="font-bold text-brand-yellow text-lg mb-2">Where is Muscle Gym Dindigul located?</h3>
            <p className="text-brand-gray text-sm leading-relaxed">Muscle Gym Dindigul operates 3 branches in Begampur (near Rasi Petrol Bunk), Trichy Bypass Service Road (opposite D-Mart), and Palani Road (opposite Income Tax Office).</p>
          </div>
          <div className="bg-brand-dark-gray/30 p-6 rounded-2xl border border-brand-dark-gray">
            <h3 className="font-bold text-brand-yellow text-lg mb-2">What are Muscle Gym Dindigul's timings?</h3>
            <p className="text-brand-gray text-sm leading-relaxed">Muscle Gym Dindigul is open Monday to Saturday from 5:30 AM to 9:00 PM, and Sunday from 5:30 AM to 10:00 AM.</p>
          </div>
          <div className="bg-brand-dark-gray/30 p-6 rounded-2xl border border-brand-dark-gray">
            <h3 className="font-bold text-brand-yellow text-lg mb-2">Who trains members at Muscle Gym Dindigul?</h3>
            <p className="text-brand-gray text-sm leading-relaxed">Members are coached by Master Rajkumar, a bodybuilding veteran with over 18 years of coaching experience, along with 10+ expert coaches across all branches.</p>
          </div>
          <div className="bg-brand-dark-gray/30 p-6 rounded-2xl border border-brand-dark-gray">
            <h3 className="font-bold text-brand-yellow text-lg mb-2">Is Muscle Gym Dindigul unisex?</h3>
            <p className="text-brand-gray text-sm leading-relaxed">Yes, Muscle Gym Dindigul is a unisex training facility with air-conditioned interiors and imported equipment.</p>
          </div>
        </div>
      </section>

      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Where is Muscle Gym Dindigul located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Muscle Gym Dindigul has 3 branches: Begampur (near Rasi Petrol Bunk), Trichy Bypass Service Road (opposite D-Mart), and Palani Road (opposite Income Tax Office)."
                }
              },
              {
                "@type": "Question",
                "name": "What are Muscle Gym Dindigul's timings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Muscle Gym Dindigul is open Monday to Saturday from 5:30 AM to 9:00 PM, and Sunday from 5:30 AM to 10:00 AM."
                }
              },
              {
                "@type": "Question",
                "name": "Who trains members at Muscle Gym Dindigul?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Members are coached by Master Rajkumar, a bodybuilding veteran with over 18 years of coaching experience, along with 10+ expert coaches across all branches."
                }
              },
              {
                "@type": "Question",
                "name": "Is Muscle Gym Dindigul unisex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Muscle Gym Dindigul is a unisex training facility with air-conditioned interiors and imported equipment."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
