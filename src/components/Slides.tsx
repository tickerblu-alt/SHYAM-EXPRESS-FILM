import React from "react";
import {
  Scale,
  Sparkles,
  MapPin,
  Tv,
  Film,
  Camera,
  Cpu,
  Zap,
  Users,
  Award,
  TrendingUp,
  Mail,
  FileText,
  Calendar,
  Layers,
  Percent,
  CheckCircle,
  HelpCircle,
  Play,
  Flame,
  ArrowRight,
  ShieldCheck,
  Clapperboard,
  DollarSign,
  Upload,
  Trash2,
  Music,
  Disc,
  Volume2,
  Pause,
  HardDrive
} from "lucide-react";

// @ts-ignore
import khatuShyamHero from "../assets/images/khatu_shyam_hero_1783612474905.jpg";
// @ts-ignore
import sumedhMudgalkar from "../assets/images/sumedh_mudgalkar_1783617889941.jpg";
// @ts-ignore
import divyaDutta from "../assets/images/divya_dutta_actress_1783617903496.jpg";
// @ts-ignore
import profShyam from "../assets/images/prof_shyam_turnaround_1783617863544.jpg";
// @ts-ignore
import hemantMentoring from "../assets/images/hemant_mentoring_1783617934923.jpg";
// @ts-ignore
import hemantNilimDas from "../assets/images/hemant_nilim_das_1783617875633.jpg";
// @ts-ignore
import prajaktaMali from "../assets/images/prajakta_mali_actress_1783617922399.jpg";
// @ts-ignore
import shyamExpressLogo from "../assets/images/shyam_express_logo_1783665032905.jpg";

// Constants
export const x = {
  maroon: "#4A0A0A",
  gold: "#B8860B",
  goldLight: "#FFD978",
  goldDeep: "#8B6914",
  cream: "#FFF8E7",
  charcoal: "#1A1A1A",
  maroonLight: "#6B1A1A"
};

// Section Badge helper
export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div
        className="w-8 h-px"
        style={{ background: `linear-gradient(90deg, ${x.gold}, transparent)` }}
      />
      <span className="text-[10px] tracking-[0.28em] uppercase text-[#B8860B] font-semibold">
        {children}
      </span>
    </div>
  );
}

export interface SlideProps {
  images: Record<string, string>;
  onUploadImage: (slotId: string, dataUrl: string, name: string) => void;
  onResetImage: (slotId: string) => void;
}

interface SlideImageZoneProps {
  slotId: string;
  images: Record<string, string>;
  onUploadImage: (slotId: string, dataUrl: string, name: string) => void;
  onResetImage: (slotId: string) => void;
  className?: string;
  aspectClass?: string;
  defaultLabel?: string;
  showCaption?: boolean;
  defaultImage?: string;
}

export function SlideImageZone({
  slotId,
  images,
  onUploadImage,
  onResetImage,
  className = "",
  aspectClass = "aspect-[16/10]",
  defaultLabel = "Visual Plate",
  showCaption = true,
  defaultImage
}: SlideImageZoneProps) {
  const currentUrl = (images && images[slotId]) || defaultImage;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 ${aspectClass} ${className}`}
    >
      {currentUrl ? (
        <img
          src={currentUrl}
          alt={defaultLabel}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition duration-500 hover:scale-102"
        />
      ) : (
        <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-white/10 rounded-2xl">
          <Sparkles className="w-5 h-5 text-[#FFD978] animate-pulse" />
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold text-center">
            {defaultLabel}
          </div>
        </div>
      )}

      {/* Caption bar */}
      {showCaption && currentUrl && (
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/75 backdrop-blur-[4px] border border-white/5 rounded-lg p-1.5 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="text-[9px] uppercase tracking-widest text-[#FFD978] font-bold truncate">
              {defaultLabel}
            </div>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
        </div>
      )}
    </div>
  );
}

interface TitleSlideProps extends SlideProps {
  heroImage: string;
  onImageUpload: (dataUrl: string, name: string) => void;
  uploadedImages: Array<{ id: string; name: string; dataUrl: string; timestamp: number }>;
  onSelectImage: (id: string | null) => void;
  selectedImageId: string | null;
  onDeleteImage: (id: string) => void;
}

// 0. Title Slide
export function TitleSlide({
  images,
  onUploadImage,
  onResetImage,
  heroImage,
  onImageUpload,
  uploadedImages,
  onSelectImage,
  selectedImageId,
  onDeleteImage
}: TitleSlideProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const posterInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === "string") {
          onImageUpload(event.target.result, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="slide relative w-full h-full bg-[#1A1A1A] overflow-hidden flex max-w-[100vw]">
      {/* Cinematic Background Image from heroImage */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 select-none pointer-events-none" 
        style={{ backgroundImage: `url(${heroImage})` }} 
      />
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(74, 10, 10, 0.88) 0%, rgba(15, 3, 3, 0.98) 100%)`
        }}
      />
      <div className="absolute inset-0 mandala opacity-30 select-none pointer-events-none" />

      {/* Burning incense/smoke elements */}
      {[...Array(6)].map((_, t) => (
        <div
          key={t}
          className="incense"
          style={{
            left: `${20 + t * 12}%`,
            animationDelay: `${t * 1.5}s`,
            animationDuration: `${9 + (t % 3)}s`
          }}
        />
      ))}

      {/* Main Content Area - Split Grid Layout */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full overflow-y-auto overflow-x-hidden py-8 md:py-10">
        
        {/* Top Header - Branding */}
        <div className="flex items-center justify-between w-full border-b border-white/10 pb-3">
          <div className="flex flex-col items-start gap-1">
            <SectionBadge>PROZENIUS Presents</SectionBadge>
          </div>
          <div className="text-[11px] tracking-widest text-[#FFD978] font-mono bg-black/40 px-3 py-1 rounded-full border border-white/5 font-semibold">
            OFFICIAL FILM PROPOSAL
          </div>
        </div>

        {/* Grand Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center my-auto py-4">
          
          {/* Left Column: Breathtaking Interactive Poster Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Elegant Creator Credit in Golden letters above the poster/production header */}
            <div className="w-full max-w-[380px] sm:max-w-[420px] text-left mb-2 px-1">
              <span className="text-[12px] sm:text-[14px] tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#FFD978] to-[#B8860B] uppercase font-serif font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                A film Created By HEMANT NILIM DAS
              </span>
            </div>

            {/* Produced/Presented Header above poster */}
            <div className="mb-4 text-center max-w-[380px] sm:max-w-[420px] w-full bg-black/40 border border-[#B8860B]/20 rounded-xl p-3 shadow-inner">
              <div className="text-[12.5px] tracking-[0.2em] text-[#FFD978] font-bold uppercase">
                Presented by <span className="text-white">EXCELLENCY STUDIOS</span>
              </div>
              <div className="text-[10.5px] text-white/80 tracking-wide mt-1.5 font-medium leading-snug">
                Produced by <span className="text-white font-semibold">Ravinder Kumar</span> • Executive Producer <span className="text-white font-semibold">Bijendra Tusamad</span>
              </div>
            </div>

            <div 
              className="relative group/poster w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] flex flex-col justify-between rounded-[24px] overflow-hidden border transition-transform duration-500 hover:scale-[1.01] shadow-[0_0_50px_rgba(184,134,11,0.25)] p-6"
              style={{
                background: "linear-gradient(135deg, rgba(74, 10, 10, 0.96) 0%, rgba(30, 5, 5, 0.99) 100%)",
                borderColor: `${x.gold}60`
              }}
            >
              {/* If user uploaded a custom poster image, display it. Otherwise show our ultra-premium poster replication! */}
              {images?.slide_0_poster ? (
                <img
                  src={images.slide_0_poster}
                  alt="Shyam Express Poster"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              ) : (
                <>
                  {/* Glowing Halos & Background Artwork inside CSS Poster */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-25 z-0" style={{ backgroundImage: `url(${khatuShyamHero})` }} />
                  <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-[#B8860B]/20 to-transparent blur-[30px] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 z-1" />

                  {/* Poster Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    {/* Poster Top */}
                    <div className="text-center">
                      <span className="text-[8px] tracking-[0.3em] text-[#FFD978] uppercase font-bold">A FILM BY PROZENIUS</span>
                    </div>

                    {/* Poster Title & Logo replication */}
                    <div className="text-center my-auto py-2">
                      <h1 className="serif font-extrabold leading-none tracking-tight">
                        <span className="block text-[32px] sm:text-[38px] text-transparent bg-clip-text bg-gradient-to-r from-[#FFD978] via-white to-[#FFD978] drop-shadow-[0_0_12px_rgba(255,217,120,0.6)] tracking-[0.08em] font-serif uppercase">
                          shyam express
                        </span>
                        <span className="block text-[14px] sm:text-[16px] tracking-[0.25em] text-[#FFF8E7]/90 font-bold uppercase mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                          हारे का सहारा
                        </span>
                      </h1>
                    </div>

                    {/* Poster Cast Listing (the 5 faces requested by user) */}
                    <div className="relative z-10 bg-black/60 backdrop-blur-[2px] rounded-xl p-3 border border-white/5 mt-auto">
                      <div className="text-[7.5px] tracking-[0.2em] text-white/40 uppercase font-extrabold text-center mb-1.5">STARRING ENSEMBLE</div>
                      <div className="grid grid-cols-2 gap-1.5 text-left text-[8.5px]">
                        <div className="text-[#FFF8E7]/90"><strong className="text-[#FFD978]">ANANYA</strong> <span className="text-white/40">- UPSC Dream</span></div>
                        <div className="text-[#FFF8E7]/90"><strong className="text-[#FFD978]">MEHER</strong> <span className="text-white/40">- The Voice</span></div>
                        <div className="text-[#FFF8E7]/90"><strong className="text-[#FFD978]">PROF S KHATU</strong> <span className="text-white/40">- The Sahara</span></div>
                        <div className="text-[#FFF8E7]/90"><strong className="text-[#FFD978]">DR BANSAL</strong> <span className="text-white/40">- The System</span></div>
                        <div className="text-[#FFF8E7]/90 col-span-2 text-center"><strong className="text-[#FFD978]">MR VERMA</strong> <span className="text-white/40">- The Hope</span></div>
                      </div>
                    </div>

                    {/* Poster Bottom Taglines */}
                    <div className="text-center mt-3 pt-2 border-t border-white/5">
                      <div className="text-[10px] text-[#FFF8E7] italic font-semibold tracking-wide">"A journey of faith, hope & second chances"</div>
                      <div className="text-[9px] text-[#FFD978] font-bold tracking-[0.2em] uppercase mt-1">RELEASING SOON</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Grand and Elegant Pitch: Why It Should Be Made & How It Will Break Records */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            
            {/* Title / Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD978]/10 border border-[#FFD978]/20 text-[#FFD978] text-[9px] tracking-widest uppercase font-extrabold mb-2.5">
                EXECUTIVE PRODUCTION BRIEF
              </div>
              <h2 className="serif text-[32px] sm:text-[44px] text-white leading-[1.1] font-bold tracking-tight">
                SHYAM EXPRESS: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD978] via-white to-[#FFD978]">A BLOCKBUSTER HYBRID DRAMA</span>
              </h2>
            </div>

            {/* Why This Film Should Be Made Section */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#B8860B]/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD978]" />
                  </div>
                  <h3 className="text-[13.5px] uppercase tracking-widest font-extrabold text-[#FFD978]">
                    Why This Film Should Be Made
                  </h3>
                </div>
                <ul className="space-y-2 text-[12.5px] text-white/70 leading-relaxed font-sans pl-1">
                  <li>
                    <strong className="text-white">Unprecedented Socio-Cultural Resonance:</strong> Melds highly realistic coaching-mafia drama (reminiscent of 12th Fail) with the massive, visceral faith-driven emotional current of 10 Crore+ Khatu Shyam devotees.
                  </li>
                  <li>
                    <strong className="text-white">Highly Relatable Protagonist Journey:</strong> A deeply human story where a declared "systemic failure" succeeds not through supernatural miracles, but through the sheer, unshakeable cultural resilience inspired by Khatu Shyam.
                  </li>
                </ul>
              </div>

              {/* How It Will Break Records Section */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#B8860B]/20 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FFD978]" />
                  </div>
                  <h3 className="text-[13.5px] uppercase tracking-widest font-extrabold text-[#FFD978]">
                    How the Film Will Break Records
                  </h3>
                </div>
                <ul className="space-y-2 text-[12.5px] text-white/70 leading-relaxed font-sans pl-1">
                  <li>
                    <strong className="text-white">Built-in Devotee Groundswell:</strong> Direct marketing tie-ins across a massive network of 600+ temples, and organic promotion directly to millions of devotees during the historic Falgun Mela.
                  </li>
                  <li>
                    <strong className="text-white">Explosive Advance Bookings:</strong> Block bookings organized through regional devotee communities across Rajasthan, UP, MP, Delhi NCR, and Haryana, guaranteeing packed theaters from the very first morning.
                  </li>
                  <li>
                    <strong className="text-white">Total Economic Safety:</strong> High streaming and digital demand for modern clean family content secures exceptionally strong OTT pre-licensing valuation, ensuring massive capital safety and astronomical ROI.
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Quote & Footer info */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="serif text-[12px] text-white/55 italic max-w-[480px]">
            "Faith is the courage to stand up one more time when the world declares you finished."
          </div>
          <div className="text-[9px] tracking-wider text-white/30 font-mono uppercase">
            Produced by Mr. Ravinder • PROZENIUS • Hindi • 108 min • U
          </div>
        </div>

      </div>
    </div>
  );
}

// 1. One Liner / High Concept
export function OneLinerSlide({ images, onUploadImage, onResetImage }: SlideProps) {
  const pillars = [
    {
      t: "Systemic defeat vs personal worth",
      d: "Coaching mafia, algorithmic shortlisting, viral shame. The system is designed to declare him useless.",
      icon: <Scale className="w-5 h-5" />
    },
    {
      t: "Faith vs Cynicism",
      d: "Dadi lights diya daily. The world says faith is superstition. Film asks: what if faith is raw discipline?",
      icon: <Flame className="w-5 h-5 text-amber-500" />
    },
    {
      t: "Quiet justice vs spectacle",
      d: "No thunder, no magical VFX entry. Justice arrives as paperwork corrected, courage witnessed, the crowd turning.",
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  return (
    <div className="slide w-full h-full bg-[#FFF8E7] text-[#1A1A1A] relative overflow-hidden flex max-w-[100vw]">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${x.gold} 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, ${x.gold} 0 1px, transparent 1px 48px)`
        }}
      />
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>One Liner / High Concept</SectionBadge>
        
        <h1 className="serif mt-2 text-[32px] md:text-[42px] font-extrabold text-[#4A0A0A] uppercase tracking-wide leading-tight">
          the CORE of the story we are telling
        </h1>
        
        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-start">
          {/* Main concept logline */}
          <div className="lg:col-span-7 pr-2">
            <h2 className="serif text-[28px] md:text-[44px] lg:text-[48px] leading-[1.05] font-semibold text-[#4A0A0A]">
              When a publicly shamed Indian is declared a failure by the system, a grandmother's belief summons Khatu Shyam not as magical lightning but as absolute human resilience.
            </h2>
            
            <div
              className="mt-8 p-6 md:p-8 rounded-[20px] border bg-white shadow-[0_20px_60px_rgba(74,10,10,0.06)]"
              style={{ borderColor: `${x.gold}30` }}
            >
              <div className="text-[11px] tracking-[0.24em] uppercase text-[#B8860B] mb-3 font-semibold flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Logline • 28 Words
              </div>
              <p className="serif text-[18px] md:text-[20px] leading-relaxed text-[#1A1A1A] italic">
                "A failed government aspirant, shamed in a viral video, must prove his worth in 7 days before his family land is seized, guided only by his Dadi's unwavering conviction that Haar Ka Sahara still answers."
              </p>
              
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#4A0A0A] text-[#FFF8E7] text-[10px] tracking-wider uppercase font-semibold">
                  Uplifting Drama
                </span>
                <span className="px-3 py-1 rounded-full border border-[#B8860B]/40 text-[#8B6914] text-[10px] font-semibold bg-amber-50">
                  Grounded • Real India
                </span>
                <span className="px-3 py-1 rounded-full border border-black/10 text-[10px] text-black/60 font-medium">
                  Festival Screenings + Mass Appeal
                </span>
              </div>
            </div>
          </div>

          {/* 3 Pillars & Comps */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-[11px] tracking-[0.2em] uppercase text-black/50 font-bold">
              Three Core Pillars of Conflict
            </div>
            
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-4.5 rounded-xl border bg-[#FFF8E7] hover:bg-white transition shadow-sm"
                style={{ borderColor: `${x.gold}22` }}
              >
                <div className="flex gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: `${x.maroon}0F`,
                      border: `1px solid ${x.gold}30`,
                      color: x.gold
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <div className="serif text-[16px] font-semibold text-[#4A0A0A]">
                      {p.t}
                    </div>
                    <div className="mt-1 text-[12px] leading-relaxed text-black/60">
                      {p.d}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="p-4 rounded-xl text-[12px] leading-relaxed text-black/65 border border-dashed"
              style={{
                borderColor: `${x.gold}55`,
                background: "linear-gradient(135deg, rgba(184,134,11,0.08), transparent)"
              }}
            >
              <strong className="text-[#4A0A0A] font-semibold">Cinematic Comps:</strong>{" "}
              <span className="italic">Kantara</span>'s deep-rooted cultural soul ×{" "}
              <span className="italic">12th Fail</span>'s grit ×{" "}
              <span className="italic">OMG – Oh My God!</span>'s philosophical dialogue. Devotional without being preachy.
            </div>

            {/* Custom Atmosphere Visual slot for Slide 1 */}
            <div className="pt-2">
              <SlideImageZone
                slotId="slide_1_image"
                images={images}
                onUploadImage={onUploadImage}
                onResetImage={onResetImage}
                aspectClass="aspect-[16/7.5]"
                defaultLabel="Atmospheric concept visual (e.g., Mela, Devotees, Sunset atmosphere)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. The Opportunity
export function OpportunitySlide({ images, onUploadImage, onResetImage }: SlideProps) {
  const synergisticFactors = [
    {
      icon: <Layers className="w-5 h-5 text-amber-500" />,
      title: "Temple Trust Ecosystem",
      desc: "Direct tie-ins for screening in ashrams, Falgun Mela launch, and custom QR codes on physical prasad boxes linking to the movie's trailer. Organic outreach to devotees.",
      stat: "600+ temples"
    },
    {
      icon: <Tv className="w-5 h-5 text-amber-500" />,
      title: "OTT Devotional Appetite",
      desc: "Consistently in the top-trending charts on Hotstar, Prime, and Zee5. Hindi heartland audiences show the highest multi-session retention rates for stories of faith.",
      stat: "4.2x retention"
    },
    {
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      title: "Theatrical Heartlands First",
      desc: "Strong focus on Rajasthan, UP, MP, Haryana, and Delhi NCR. Lower Print & Advertising (P&A) cost required, high local morning-show occupancy powered by family bookings.",
      stat: "Rs 3.2 Cr Breakeven"
    }
  ];

  return (
    <div className="slide w-full h-full bg-[#1A1A1A] relative overflow-hidden flex max-w-[100vw]">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at 20% 20%, ${x.maroon} 0%, transparent 60%), radial-gradient(60% 60% at 90% 80%, rgba(184,134,11,0.18) 0%, transparent 60%)`
        }}
      />
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>The Audience Opportunity</SectionBadge>
        
        <h1 className="serif mt-2 text-[32px] md:text-[42px] font-extrabold text-[#FFD978] uppercase tracking-wide leading-tight">
          How Revenue-Model would be built
        </h1>
        
        <div className="mt-6 grid lg:grid-cols-12 gap-8 items-center">
          {/* Main Opportunity Info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="serif text-[38px] md:text-[56px] leading-[0.95] font-semibold">
                <span className="text-white block">10 Crore+ Devotees.</span>
                <span className="gold-text block mt-1">One Untold Cinematic Story.</span>
              </h2>
              <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/60">
                Khatu Shyamji is India's fastest-growing devotional deity cult. Yet no high-quality, modern, grounded Hindi feature film has ever explored this massive phenomenon beyond low-budget mythological TV serials. The market is absolutely starved for respectful, high-quality cinematic stories of faith.
              </p>
              
              {/* 3 Metric blocks */}
              <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
                {[
                  { k: "10 Cr+", l: "Active Lifetime\nDevotees globally" },
                  { k: "25 Lakh+", l: "Falgun Mela\n12-Day Footfall" },
                  { k: "₹800 Cr", l: "Devotional Video\nContent Market" }
                ].map((m, t) => (
                  <div key={t} className="p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur">
                    <div className="serif text-[24px] md:text-[30px] font-bold gold-text leading-none">
                      {m.k}
                    </div>
                    <div className="mt-2 text-[10px] leading-[1.3] whitespace-pre-line text-white/60 font-medium">
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {["First Premium Feature", "Tier-2/Tier-3 Magnets", "Vast Music Synergy", "Ekadashi Release Lock"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] bg-white/[0.07] border border-white/10 text-white/50 tracking-wider uppercase font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Audience Atmosphere Visual slot for Slide 2 */}
            <div className="pt-6">
              <SlideImageZone
                slotId="slide_2_image"
                images={images}
                onUploadImage={onUploadImage}
                onResetImage={onResetImage}
                aspectClass="aspect-[16/6.5]"
                defaultLabel="Audience Demographic / Temple Devotee Atmosphere Plate"
              />
            </div>
          </div>

          {/* Synergistic cards */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-3.5">
            {synergisticFactors.map((f, t) => (
              <div
                key={t}
                className="group p-5 rounded-xl border bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur hover:from-white/[0.10] transition-all duration-300"
                style={{ borderColor: `${x.gold}22` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[16px]"
                      style={{
                        background: `${x.gold}18`,
                        color: x.goldLight,
                        border: `1px solid ${x.gold}30`
                      }}
                    >
                      {f.icon}
                    </div>
                    <div className="serif text-[18px] font-semibold text-white">
                      {f.title}
                    </div>
                  </div>
                  <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#B8860B]/20 text-[#FFD978] border border-[#B8860B]/30 font-semibold font-mono">
                    {f.stat}
                  </span>
                </div>
                <div className="mt-2.5 text-[12px] leading-relaxed text-white/55">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Look Feel Tone
export function LookFeelSlide({ images, onUploadImage, onResetImage }: SlideProps) {
  return (
    <div className="slide w-full h-full bg-[#FFF8E7] text-[#1A1A1A] flex max-w-[100vw] overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>Look • Feel • Tone</SectionBadge>
        
        <h1 className="serif mt-2 text-[32px] md:text-[42px] font-extrabold text-[#4A0A0A] uppercase tracking-wide leading-tight">
          How the format of the film looks like
        </h1>
        
        <div className="mt-6 grid md:grid-cols-2 gap-6 flex-1 items-stretch max-h-full">
          {/* World A */}
          <div className="relative p-6 md:p-8 rounded-2xl bg-[#EDE6D6] border border-black/10 overflow-hidden flex flex-col justify-between min-h-[340px] shadow-sm">
            <div
              className="absolute inset-0 opacity-[0.25] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E")`
              }}
            />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[9px] tracking-widest uppercase font-bold">
                <Camera className="w-3 h-3" />
                World A • Realist India
              </div>
              <h3 className="serif mt-4 text-[24px] md:text-[28px] leading-[1.1] font-semibold text-[#1A1A1A]">
                Gritty handheld cameras, desaturated shadows, fluorescent glare, and dusty crowded lanes.
              </h3>
              <ul className="mt-4 space-y-2 text-[12.5px] leading-relaxed text-black/75">
                <li>• <strong className="font-semibold">Format:</strong> Realism, 35mm handheld, natural light, shallow depth. Filmed in actual coaching zones, bus stations, and village layouts.</li>
                <li>• <strong className="font-semibold">Palette:</strong> Dust grey, faded denim blue, sodium yellow, rust.</li>
                <li>• <strong className="font-semibold">Soundscape:</strong> Local traffic roar, background hum, clicking pens, rustling exam papers. No bhajan until the third act.</li>
              </ul>

              {/* Custom Image Zone for World A */}
              <div className="mt-4">
                <SlideImageZone
                  slotId="slide_3_world_a"
                  images={images}
                  onUploadImage={onUploadImage}
                  onResetImage={onResetImage}
                  aspectClass="aspect-[16/6]"
                  defaultLabel="World A Realist Concept Plate"
                />
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-black/10">
              <div className="grid grid-cols-4 gap-2">
                {["#8B8B83", "#6B705C", "#A7A49A", "#D6CEB8"].map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div className="h-8 w-full rounded border border-black/10 shadow-sm" style={{ background: c }} />
                    <span className="text-[8px] font-mono text-black/40">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[9px] tracking-wider uppercase text-black/55 font-bold font-mono">
                Realism Texture • Diegetic Only
              </div>
            </div>
          </div>

          {/* World B */}
          <div className="relative p-6 md:p-8 rounded-2xl bg-[#4A0A0A] text-[#FFF8E7] overflow-hidden flex flex-col justify-between min-h-[340px] border border-white/5 shadow-md">
            <div
              className="absolute inset-0 opacity-[0.25]"
              style={{
                background: `radial-gradient(60% 80% at 75% 20%, ${x.gold} 0%, transparent 60%)`
              }}
            />
            <div className="absolute right-[-40px] top-[-40px] w-[200px] h-[200px] rounded-full border border-white/5 pointer-events-none" />
            
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] tracking-widest uppercase border font-bold"
                style={{
                  borderColor: `${x.gold}55`,
                  color: "#FFD978",
                  background: "rgba(184,134,11,0.15)"
                }}
              >
                <Sparkles className="w-3 h-3" />
                World B • Mythic Tableau
              </div>
              <h3 className="serif mt-4 text-[24px] md:text-[28px] leading-[1.1] font-semibold">
                Symmetrical frames, temple gold, deep indigo stillness. Khatu Shyam is felt, not paraded.
              </h3>
              <ul className="mt-4 space-y-2 text-[12.5px] leading-relaxed text-white/80">
                <li>• <strong className="font-semibold">Format:</strong> Symmetrical locked-off compositions, slow dolly slides. Real corridors that feel almost majestic and infinite.</li>
                <li>• <strong className="font-semibold">Palette:</strong> Deep divine maroon, antique gold, indigo twilight, warm cream.</li>
                <li>• <strong className="font-semibold">Visuals:</strong> Golden hour shadows, single candle/diya illumination, slow push-ins. Highly stylized, respectful, and artistic.</li>
              </ul>

              {/* Custom Image Zone for World B */}
              <div className="mt-4">
                <SlideImageZone
                  slotId="slide_3_world_b"
                  images={images}
                  onUploadImage={onUploadImage}
                  onResetImage={onResetImage}
                  aspectClass="aspect-[16/6]"
                  defaultLabel="World B Mythic Concept Plate"
                />
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
              <div className="grid grid-cols-4 gap-2">
                {["#4A0A0A", "#B8860B", "#1E3A5F", "#FFF8E7"].map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div className="h-8 w-full rounded border border-white/10 shadow-sm" style={{ background: c }} />
                    <span className="text-[8px] font-mono text-white/50">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[9px] tracking-wider uppercase text-[#FFD978] font-bold font-mono">
                Darshan Symmetries • Antique Devotion
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Character Blueprint • Protagonist
export function ProfShyamSlide({ images, onUploadImage, onResetImage }: SlideProps) {
  return (
    <div className="slide w-full h-full bg-[#1A1A1A] text-[#FFF8E7] relative overflow-hidden flex max-w-[100vw]">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(60% 60% at 85% 50%, ${x.maroon} 0%, transparent 70%), radial-gradient(50% 50% at 15% 20%, rgba(184,134,11,0.1) 0%, transparent 60%)`
        }}
      />
      
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>Character Blueprint • Protagonist</SectionBadge>
        
        <h1 className="serif mt-2 text-[32px] md:text-[42px] font-extrabold text-[#FFD978] uppercase tracking-wide leading-tight">
          look & feel of the HERO
        </h1>
        
        <div className="mt-6 grid md:grid-cols-[420px_1fr] gap-8 items-center flex-1 max-h-full">
          {/* Left Column: Visual Sheet */}
          <div className="relative mx-auto w-full max-w-[380px] md:max-w-full">
            <SlideImageZone
              slotId="slide_4_image"
              images={images}
              onUploadImage={onUploadImage}
              onResetImage={onResetImage}
              aspectClass="aspect-[4/3]"
              defaultLabel="Prof S Khatu Character Sheet"
            />
            
            <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 text-center">
              <span className="serif text-[15px] font-bold tracking-wider text-[#FFD978]">
                "Shraddha + Skill + Seva = Shiksha"
              </span>
              <div className="text-[9.5px] uppercase font-mono text-white/40 mt-1 tracking-widest">
                The Core Pedagogic Philosophy
              </div>
            </div>
          </div>

          {/* Right Column: Character Description & Socio-Emotional Range */}
          <div className="flex flex-col justify-center">
            <h2 className="serif text-[28px] md:text-[38px] leading-[1.0] text-white" style={{ fontFamily: "Georgia", fontSize: "45px", fontStyle: "normal", fontWeight: "bold", color: "#d9b731" }}>
              Prof Shyam: A Vision of Modern Resilience & Unshakeable Faith
            </h2>
            <p className="mt-3 text-[13px] text-white/60 leading-relaxed" style={{ fontFamily: "Georgia" }}>
              Prof S Khatu (Shyam) is a 30-year-old passionate local educator who believes that education is incomplete without moral direction (Disha) and service. He stands as a pillar of hope, wearing a vibrant blue turban adorned with a peacock feather—embodying his deep-seated connection with Khatu Shyam.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] tracking-wider uppercase text-[#FFD978] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Visual Identity
                </div>
                <ul className="mt-2.5 space-y-2 text-[11.5px] text-white/70 leading-relaxed">
                  <li>• <strong className="text-white">The Blue Turban:</strong> A vibrant, crowning crown representing divine connection and absolute devotion.</li>
                  <li>• <strong className="text-white">The Canvas Messenger Bag:</strong> Packed with books and diaries, symbolizing his grounding in raw intellectual pursuit.</li>
                  <li>• <strong className="text-white">Traditional White Kurta:</strong> Symbol of purity and simplicity in daily academic life.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] tracking-wider uppercase text-[#FFD978] font-bold flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#FFD978]" />
                  Emotional Expression Palette
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px] font-mono text-white/60">
                  <div className="p-1.5 rounded bg-black/30 border border-white/5" style={{ fontFamily: "Georgia" }}>• Calm Smile</div>
                  <div className="p-1.5 rounded bg-black/30 border border-white/5" style={{ fontFamily: "Georgia" }}>• Quiet Anger</div>
                  <div className="p-1.5 rounded bg-black/30 border border-white/5" style={{ fontFamily: "Georgia" }}>• Tired but Standing</div>
                  <div className="p-1.5 rounded bg-black/30 border border-white/5" style={{ fontFamily: "Georgia" }}>• Bleeding & Peaceful</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. All Star Cast • Powerhouse Ensemble
export function CastSlide({ images, onUploadImage, onResetImage }: SlideProps) {
  const castList = [
    {
      role: "The Aspirant • 28",
      name: "Sumedh Mudgalkar",
      note: "Raw middle-class struggle, everyday anger mixed with soft vulnerability and divine devotion.",
      icon: <Users className="w-4 h-4" />,
      defaultImg: sumedhMudgalkar
    },
    {
      role: "Dadi & Maternal Pillars",
      name: "DIVYA DUTTA / PRAJAKTA MALI",
      note: "Unshakeable cultural anchor, carrying deep faith without any melodrama.",
      icon: <Award className="w-4 h-4 text-amber-500" />,
      defaultImg: divyaDutta
    },
    {
      role: "The Presence",
      name: "Gajraj Rao / Raghubir Yadav",
      note: "Divine voiceover, majestic silhouettes, and high-impact cameo roles.",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      defaultImg: profShyam
    },
    {
      role: "The Mentor • 58",
      name: "Rajesh Sharma / Brijendra Kala",
      note: "Skeptical coaching institution owner with a golden heart.",
      icon: <CheckCircle className="w-4 h-4" />,
      defaultImg: hemantMentoring
    }
  ];

  return (
    <div className="slide w-full h-full bg-[#FFF8E7] text-[#1A1A1A] flex max-w-[100vw] overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-6 md:py-8 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <SectionBadge>All-Star Cast • Production Candidates</SectionBadge>
          <span className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border bg-white text-[#8B6914] border-[#B8860B]/30 font-bold font-mono">
            Provisional Cast Options
          </span>
        </div>
        
        <h1 className="serif mt-2 text-[32px] md:text-[42px] font-extrabold text-[#4A0A0A] uppercase tracking-wide leading-tight">
          Probable Stars for the film
        </h1>
        <p className="text-[12.5px] text-black/60 mt-1 max-w-[650px]">
          Faces that audiences trust implicitly. Real performers, zero typical vanity, capable of deep socio-emotional range.
        </p>
        
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {castList.map((c, idx) => (
            <div
              key={idx}
              className="group p-4 rounded-2xl bg-white border shadow-sm hover:shadow-md hover:border-[#B8860B]/40 transition duration-300 flex flex-col justify-between"
              style={{ borderColor: `${x.gold}18` }}
            >
              <div>
                {/* Large high-impact photo placeholder so faces are clearly visible */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-[#B8860B]/20 shadow-inner bg-amber-50/20 mb-3">
                  <SlideImageZone
                    slotId={`slide_5_cast_${idx + 1}`}
                    images={images}
                    onUploadImage={onUploadImage}
                    onResetImage={onResetImage}
                    aspectClass="w-full h-full"
                    showCaption={false}
                    defaultLabel={c.name}
                    defaultImage={c.defaultImg}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-2">
                  <div className="text-[9.5px] tracking-[0.16em] uppercase text-[#B8860B] font-bold">
                    {c.role}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center border shrink-0 text-[10px]"
                    style={{
                      background: `${x.maroon}08`,
                      borderColor: `${x.gold}20`,
                      color: x.gold
                    }}
                  >
                    {c.icon}
                  </div>
                </div>

                <div className="serif mt-2 text-[16px] md:text-[18px] font-bold text-[#1A1A1A] leading-tight">
                  {c.name}
                </div>
              </div>
              <div className="mt-2 text-[12px] leading-relaxed text-black/70">
                {c.note}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 p-4 rounded-xl border border-dashed flex flex-wrap gap-2 items-center text-[12px] text-black/65"
          style={{
            borderColor: `${x.gold}40`,
            background: "rgba(184,134,11,0.04)"
          }}
        >
          <strong className="text-[#4A0A0A] font-semibold">Casting Strategy:</strong> A-list powerhouse character actors keep our upfront cost light through profit-sharing backend structures. High audience relatability and performance credibility guarantee theater and OTT buy-in.
        </div>
      </div>
    </div>
  );
}

// 7. COP Breakdown
export function COPSlide({ images, onUploadImage, onResetImage }: SlideProps) {
  const breakdown = [
    { l: "Casting & Ensemble Compensation", v: 22, amt: "Highly Scalable (A/B-Tier Cast)", c: "#B8860B" },
    { l: "VFX, AI Crowd & Plates Compositing", v: 18, amt: "VFX Intensity-Dependent", c: "#D4A017" },
    { l: "CGI & AI Engineering Team", v: 12, amt: "Complexity-Based", c: "#8B6914" },
    { l: "Dana Dolly, MoCo Rig Rentals & Logistics", v: 11.2, amt: "Rig Setup-Dependent", c: "#4A0A0A" },
    { l: "Story, Screenplay, Dialogue & Direction", v: 8, amt: "Creative-Led", c: "#6B1A1A" },
    { l: "Edit, Grade, Sound & Post-Production", v: 8, amt: "Format-Dependent", c: "#A07A10" },
    { l: "Set Design (Authentic Temple Corridors)", v: 6, amt: "Visual Depth Scale", c: "#C9A227" },
    { l: "On-Location Shoots (Primary Schedule)", v: 6, amt: "Schedule-Dependent", c: "#E6C86A" },
    { l: "Unforeseen Production Contingencies", v: 8.8, amt: "Proportional (10%)", c: "#FFF8E7" }
  ];

  const totalCircumference = 2 * Math.PI * 78;
  let accumulatedOffset = 0;

  return (
    <div className="slide w-full h-full bg-[#FFF8E7] text-[#1A1A1A] flex max-w-[100vw] overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-6 md:py-8 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>Resource Allocation • Dynamic & Scalable Budgeting</SectionBadge>
        
        <h1 className="serif mt-2 text-[32px] md:text-[42px] font-extrabold text-[#4A0A0A] uppercase tracking-wide leading-tight">
          ELEMENTS OF MAKING A BLOCKBUSTER
        </h1>
        
        <div className="mt-4 grid lg:grid-cols-[400px_1fr] gap-8 items-center">
          {/* Chart Card */}
          <div className="p-6 rounded-[22px] bg-white border shadow-sm flex flex-col items-center" style={{ borderColor: `${x.gold}22` }}>
            <div className="relative w-[180px] h-[180px]">
              <svg width="180" height="180" viewBox="0 0 200 200" className="-rotate-90">
                <circle cx="100" cy="100" r="78" fill="none" stroke="#F3EAD0" strokeWidth="22" />
                {breakdown.map((item, idx) => {
                  const strokeLen = (item.v / 100) * totalCircumference;
                  const itemOffset = accumulatedOffset;
                  accumulatedOffset += strokeLen;
                  return (
                    <circle
                      key={idx}
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke={item.c}
                      strokeWidth="22"
                      strokeDasharray={`${strokeLen} ${totalCircumference - strokeLen}`}
                      strokeDashoffset={-itemOffset}
                      strokeLinecap="round"
                      style={{ transition: "all 0.6s" }}
                    />
                  );
                })}
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <div className="serif text-[18px] md:text-[20px] font-bold text-[#4A0A0A] leading-tight">
                  Dynamic Scale
                </div>
                <div className="text-[9px] tracking-widest uppercase text-black/45 mt-1 font-bold">
                  Adaptive COP
                </div>
                <div className="text-[8px] text-black/55 font-mono mt-0.5 leading-none">
                  Tailored to Creative Scope
                </div>
              </div>
            </div>

            <div className="mt-5 w-full text-center px-4 py-2 rounded-full text-[9px] bg-[#4A0A0A] text-[#FFF8E7] font-semibold tracking-wider uppercase font-mono">
              BUDGET SCALED TO CREATIVE COMPLEXITY • U CERTIFICATE
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 w-full mb-4">
              {breakdown.slice(0, 6).map((b) => (
                <div key={b.l} className="flex items-center gap-2 text-[10px] text-black/60 font-mono">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: b.c }} />
                  <span className="truncate">{b.l.split(" ")[0]} • {b.v}%</span>
                </div>
              ))}
            </div>

            {/* Custom visual uploader for budget slide */}
            <div className="mt-2 w-full pt-2 border-t border-black/5">
              <SlideImageZone
                slotId="slide_7_budget_visual"
                images={images}
                onUploadImage={onUploadImage}
                onResetImage={onResetImage}
                aspectClass="aspect-[16/6]"
                showCaption={false}
                defaultLabel="Budget Visual Plate"
              />
            </div>
          </div>

          {/* Detailed Table */}
          <div>
            <h2 className="serif text-[28px] md:text-[38px] leading-[1.0] font-semibold text-[#4A0A0A]">
              Every single rupee visible on screen. Strategic, creative-driven budgets.
            </h2>
            
            <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white">
              <div className="grid grid-cols-[1.4fr_0.5fr_1.1fr] px-4 py-2.5 bg-[#FFF2CC] text-[10px] tracking-widest uppercase text-black/50 border-b border-black/10 font-bold font-mono">
                <span>Budget Head / Department</span>
                <span>Share</span>
                <span className="text-right">Investment Scale / Scope</span>
              </div>
              
              <div className="divide-y divide-black/5 max-h-[220px] overflow-y-auto">
                {breakdown.map((b) => (
                  <div key={b.l} className="grid grid-cols-[1.4fr_0.5fr_1.1fr] px-4 py-2 items-center hover:bg-[#FFF8E7] transition text-[11.5px] text-black/80 font-sans">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: b.c }} />
                      <span className="font-medium truncate">{b.l}</span>
                    </span>
                    <span className="font-mono text-black/55">{b.v}%</span>
                    <span className="font-semibold text-right font-mono text-black/90">{b.amt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-3.5 p-3.5 rounded-lg border border-dashed text-[11px] leading-relaxed text-black/60 font-sans"
              style={{ borderColor: `${x.gold}45`, background: "rgba(184,134,11,0.03)" }}
            >
              <strong className="text-[#4A0A0A] font-semibold">Discreet, Creative-Driven Budgets:</strong> The actual production investment is fully adaptive and depends entirely on the level of visual creativity, cast tier, and CGI/VFX complexity required by the co-producers. By leveraging in-house MoCo rigs and proprietary AI pipelines, we ensure that every rupee spent translates directly into premium onscreen production value.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Recovery and ROI
export function RecoverySlide({ images, onUploadImage, onResetImage }: SlideProps) {
  const scenarios = [
    {
      label: "Conservative Case",
      sub: "Limited Hindi-belt theatrical theatrical launch only",
      rev: "₹6 - 8 Crore",
      mult: "2.4x - 3.2x",
      highlight: false,
      color: "border-white/10 bg-white/[0.04]"
    },
    {
      label: "Base Case (Most Likely)",
      sub: "Robust OTT + Satellite + regional belt releases",
      rev: "₹15 - 20 Crore",
      mult: "6.0x - 8.0x",
      highlight: true,
      color: "border-[#B8860B]/40 bg-[rgba(184,134,11,0.12)]"
    },
    {
      label: "Optimistic Case",
      sub: "Falgun wave momentum + chartbusting bhajan soundtracks",
      rev: "₹30 Crore+",
      mult: "12x+ ROI",
      highlight: false,
      color: "border-white/10 bg-white/[0.04]"
    }
  ];

  return (
    <div className="slide w-full h-full bg-[#111] text-white relative overflow-hidden flex max-w-[100vw]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 70% at 50% 0%, ${x.maroon} 0%, transparent 60%), linear-gradient(180deg, #1A1A1A 0%, #121212 100%)`
        }}
      />
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>Recovery and ROI</SectionBadge>
        
        <h2 className="serif mt-3 text-[28px] md:text-[40px] leading-[0.95] font-semibold text-white">
          Low capital floor, infinite vertical ceiling.{" "}
          <span className="gold-text">Faith-driven films yield compounding returns.</span>
        </h2>
        
        {/* Scenarios Grid */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {scenarios.map((s, idx) => (
            <div
              key={idx}
              className={`relative p-5 rounded-2xl border backdrop-blur ${s.color} flex flex-col justify-between transition-all duration-300 ${
                s.highlight ? "shadow-[0_16px_48px_rgba(184,134,11,0.18)] hover:bg-[#B8860B]/15" : "hover:bg-white/[0.07]"
              }`}
            >
              {s.highlight && (
                <div
                  className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[8.5px] tracking-widest uppercase font-bold"
                  style={{ background: `linear-gradient(90deg, ${x.gold}, ${x.goldLight})`, color: "#1A1A1A" }}
                >
                  Most Likely Output
                </div>
              )}
              
              <div>
                <div className="text-[10px] tracking-[0.16em] uppercase text-white/40 font-bold">
                  {s.label}
                </div>
                <div className="text-[11.5px] text-white/55 mt-1 leading-snug">
                  {s.sub}
                </div>
              </div>
 
              <div className="mt-4">
                <div className="serif text-[28px] md:text-[34px] font-bold leading-none gold-text">
                  {s.rev}
                </div>
                <div
                  className="mt-2 inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border font-mono"
                  style={{
                    borderColor: s.highlight ? `${x.gold}55` : "rgba(255,255,255,0.12)",
                    background: s.highlight ? "rgba(184,134,11,0.18)" : "rgba(255,255,255,0.06)",
                    color: s.highlight ? "#FFD978" : "white"
                  }}
                >
                  {s.mult} ROI Multiplier
                </div>
              </div>
            </div>
          ))}
        </div>
 
        <div className="mt-6 grid lg:grid-cols-12 gap-5 items-stretch">
          {/* Windows list */}
          <div className="lg:col-span-7 p-5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-[#B8860B] font-bold">
                Recovery Channels • 6 Windows
              </div>
              <div className="mt-3.5 grid grid-cols-2 gap-3 text-[12px] font-mono">
                {[
                  { k: "Theatrical Belt First", v: "40% • Rs 1 Cr MG" },
                  { k: "OTT Hindi Platforms", v: "Hotstar / Prime • 35%" },
                  { k: "Satellite Rights", v: "Star Gold / Zee • 10%" },
                  { k: "Music & Devotional Audio", v: "Tips / Saregama • 5%" },
                  { k: "Temple & Community Screenings", v: "Paid darshan halls • 5%" },
                  { k: "Diaspora Markets (YouTube/Web)", v: "US UK UAE • 5%" }
                ].map((item) => (
                  <div key={item.k} className="flex flex-col p-2.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-white/90 font-medium truncate">{item.k}</span>
                    <span className="text-[10px] text-white/45 mt-1 truncate">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Release Advantage */}
          <div
            className="lg:col-span-5 p-5 rounded-xl border flex flex-col justify-between"
            style={{
              borderColor: `${x.gold}25`,
              background: "linear-gradient(135deg, rgba(184,134,11,0.14), rgba(74,10,10,0.35))"
            }}
          >
            <div>
              <div className="text-[10px] tracking-widest uppercase text-[#FFD978] font-bold">
                Strategic Release Playbook
              </div>
              <h4 className="serif mt-2 text-[18px] md:text-[20px] font-bold leading-snug text-white">
                Falgun Mela or Ekadashi Launch provides multi-crore organic marketing.
              </h4>
              <ul className="mt-3.5 space-y-2.5 text-[12px] leading-relaxed text-white/70">
                <li>• <strong className="text-white font-semibold">Massive Footprint:</strong> 25 Lakh devotees gather. Postering in dharamsalas reaches our core audience with zero paid media billings.</li>
                <li>• <strong className="text-white font-semibold">Ecosystem Partnerships:</strong> Temple trusts facilitate community premieres. Divine devotee WhatsApp networks enable instant, free word-of-mouth reach.</li>
              </ul>
            </div>
            
            {/* Custom visual uploader for recovery slide */}
            <div className="mt-4">
              <SlideImageZone
                slotId="slide_8_recovery"
                images={images}
                onUploadImage={onUploadImage}
                onResetImage={onResetImage}
                aspectClass="aspect-[16/5.5]"
                showCaption={false}
                defaultLabel="Distribution Map / ROI Infographic Visual"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. Next Steps
export interface NextStepsSlideProps extends SlideProps {
  onCTAClick: () => void;
}

export function NextStepsSlide({ onCTAClick, images, onUploadImage, onResetImage }: NextStepsSlideProps) {
  const points = [
    "10 Crore+ underserved devotees with minimal modern cinematic representation.",
    "₹100 Crore visual scope delivered on an optimized budget via programmed camera tracks and AI tools, scaled to creative depth.",
    "Ensemble power-cast guarantees credibility without high vanity star margins.",
    "A story of true human resilience - clean, sensor-friendly U certificate, high community repetition.",
    "Built-in distribution channel via direct temple trust and festival marketing partnerships."
  ];

  const workflow = [
    { s: "01", t: "NDA & Deck Sign-Off", d: "You are currently reviewing this phase" },
    { s: "02", t: "90-Min Script Reading", d: "With writer-director and creative leads" },
    { s: "03", t: "Cast Commitments & LOI", d: "Securing lead actor and Dadi role" },
    { s: "04", t: "CGI & Camera Test Shoot", d: "Proof-of-concept crowd compositing" },
    { s: "05", t: "Production Capital Tranches", d: "30% upfront, 40% shooting, 30% grading/master" }
  ];

  return (
    <div className="slide w-full h-full bg-[#FFF8E7] text-[#1A1A1A] relative overflow-hidden flex max-w-[100vw]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(80% 80% at 50% 0%, rgba(184,134,11,0.18) 0%, transparent 60%), radial-gradient(60% 60% at 0% 100%, rgba(74,10,10,0.1) 0%, transparent 60%)`
        }}
      />
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-6 md:py-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center overflow-y-auto overflow-x-hidden max-h-full">
        
        {/* Why Now */}
        <div>
          <SectionBadge>Why Invest • Why Now</SectionBadge>
          <h2 className="serif mt-3 text-[34px] md:text-[48px] leading-[0.95] font-bold text-[#4A0A0A]">
            HAAR NAHI,<br />
            <span className="gold-text">HAAZIR.</span>
          </h2>
          
          <div className="mt-5 space-y-2.5">
            {points.map((p, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3 rounded-xl bg-white border shadow-sm items-start hover:border-[#B8860B]/40 transition duration-300"
                style={{ borderColor: `${x.gold}15` }}
              >
                <div
                  className="w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold font-mono"
                  style={{
                    background: "rgba(184,134,11,0.15)",
                    color: x.goldDeep,
                    border: `1px solid ${x.gold}30`
                  }}
                >
                  {idx + 1}
                </div>
                <div className="text-[12.5px] leading-relaxed text-black/75">
                  {p}
                </div>
              </div>
            ))}
          </div>

          {/* Closing Brand Visual */}
          <div className="mt-4 pt-2 border-t border-black/5">
            <SlideImageZone
              slotId="slide_9_next_steps"
              images={images}
              onUploadImage={onUploadImage}
              onResetImage={onResetImage}
              aspectClass="aspect-[16/5]"
              showCaption={false}
              defaultLabel="Closing Visionary Concept Visual"
            />
          </div>
        </div>

        {/* Next Steps Form Card */}
        <div className="space-y-4">
          <div
            className="p-5 rounded-2xl bg-[#1A1A1A] text-[#FFF8E7] border relative overflow-hidden"
            style={{ borderColor: `${x.gold}30` }}
          >
            <div
              className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full blur-[40px] opacity-25 pointer-events-none"
              style={{ background: x.gold }}
            />
            
            <div className="relative z-10">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#B8860B] font-bold flex items-center gap-1.5 mb-3.5">
                <Calendar className="w-3.5 h-3.5" />
                Execution Roadmap • 30 Days to Greenlight
              </div>
              
              <div className="space-y-2">
                {workflow.map((item) => (
                  <div key={item.s} className="flex gap-2.5 items-start p-2 rounded-xl bg-white/[0.04] border border-white/5">
                    <div
                      className="w-6.5 h-6.5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 font-mono"
                      style={{ background: `linear-gradient(135deg, ${x.gold}, ${x.goldLight})`, color: "#1A1A1A" }}
                    >
                      {item.s}
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-white leading-tight">{item.t}</div>
                      <div className="text-[10.5px] text-white/45">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROZENIUS Contact Card */}
          <div className="p-4 rounded-xl bg-white border shadow-sm flex flex-col justify-between" style={{ borderColor: `${x.gold}22` }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="serif text-[17px] font-bold text-[#4A0A0A] leading-tight">
                  PROZENIUS
                </div>
                <div className="text-[11px] text-black/55 font-mono">
                  www.prozenius.com • Mumbai
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] border"
                style={{ borderColor: x.gold, color: x.gold, background: "rgba(184,134,11,0.08)" }}
              >
                PZ
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="px-2 py-1.5 rounded-lg bg-[#FFF8E7] border border-black/5 text-black/60 truncate text-center">
                Produced by Mr. Ravinder
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-[#FFF8E7] border border-black/5 text-black/60 truncate text-center flex items-center justify-center gap-1">
                <Mail className="w-3 h-3 text-[#B8860B]" />
                contact@prozenius.com
              </div>
            </div>

            <button
              onClick={onCTAClick}
              className="mt-4 w-full h-[46px] rounded-full font-bold tracking-[0.12em] uppercase text-[12px] shadow-sm hover:brightness-110 active:scale-[0.99] transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: `linear-gradient(90deg, ${x.gold}, ${x.goldLight})`, color: "#1A1A1A" }}
            >
              Haar Nahi, Haazir — Let's Collaborate
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
            
            <div className="mt-2 text-center text-[9px] tracking-wide text-black/40 font-semibold uppercase font-mono">
              Confidential • Do Not Circulate • For Evaluation Only
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// 10. About the Creator Slide (Hemant Nilim Das)
export function AboutCreatorSlide({ images, onUploadImage, onResetImage }: SlideProps) {
  return (
    <div className="slide w-full h-full bg-[#1A1A1A] text-[#FFF8E7] relative overflow-hidden flex max-w-[100vw]">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(60% 60% at 85% 20%, ${x.maroon} 0%, transparent 70%), radial-gradient(50% 50% at 15% 80%, rgba(184,134,11,0.1) 0%, transparent 60%)`
        }}
      />
      
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-6 flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-full">
        <SectionBadge>ABOUT THE CREATOR OF THE PROJECT</SectionBadge>
        
        <h1 className="serif mt-1 text-[26px] md:text-[36px] font-extrabold text-[#FFD978] uppercase tracking-wide leading-tight">
          HEMANT NILIM DAS
        </h1>
        <p 
          className="text-[11px] font-mono tracking-widest uppercase mt-0.5"
          style={{
            color: "#d3f5f3",
            borderColor: "#b9d6d0",
            borderWidth: "-3px",
            borderStyle: "dashed",
            fontFamily: "Inter",
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: "28.5px"
          }}
        >
          Writer, Director & CEO, Prozenius Media
        </p>

        <div className="mt-4 grid md:grid-cols-[300px_1fr] gap-6 items-start flex-1 max-h-full overflow-hidden">
          {/* Left Column: Creator Photo */}
          <div className="flex flex-col gap-3 w-full max-w-[300px] mx-auto">
            <SlideImageZone
              slotId="slide_6_creator_portrait"
              images={images}
              onUploadImage={onUploadImage}
              onResetImage={onResetImage}
              aspectClass="aspect-[3/4]"
              defaultLabel="Creator Portrait"
              defaultImage={hemantMentoring}
            />
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
              <div className="text-[10px] font-mono tracking-wider uppercase text-[#FFD978] font-bold">
                DIRECTING FOCUS
              </div>
              <p className="mt-1.5 text-[11px] text-white/70 leading-relaxed">
                Profound understanding of gritty realism and grand mythic tableau aesthetics. Mature restraint in divine storytelling, honoring his personal devotional roots while delivering commercial scale.
              </p>
            </div>
          </div>

          {/* Right Column: Full content with smooth scrolling */}
          <div className="flex flex-col justify-between h-full max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
            <div className="space-y-4 text-[12.5px] text-white/80 leading-relaxed font-sans">
              
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <h3 className="serif text-[16px] md:text-[18px] font-semibold text-[#FFD978] leading-snug">
                  The Man Who Shot India's First One-Take Film is Now Building India's First AI Film Studio
                </h3>
                <p className="mt-2 text-white/90 font-medium italic">
                  In an industry racing to understand Artificial Intelligence, one filmmaker didn't just adapt - he built the studio for it.
                </p>
                <p className="mt-2 text-white/70">
                  Hemant Nilim Das, Writer, Director & CEO of Prozenius Media - widely regarded as India's topmost creative AI film studio - is the bridge between two eras of Indian cinema: the gritty, single-take realism of independent film and the limitless, neural-powered future of storytelling.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <div className="text-[10px] tracking-wider uppercase text-[#FFD978] font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Directing Excellence (18+ Years)
                  </div>
                  <p className="mt-2 text-white/70 text-[12px]">
                    He debuted with <strong className="text-white">Pocket Gangsters (2015)</strong> - India’s pioneering single-take feature film starring Slumdog Millionaire fame Madhur Mittal. The audacious one-shot thriller won Best Feature and Best Director at multiple international indie circuits and was listed as India’s first true one-take commercial film. He followed it with the Assamese hit <strong className="text-white">Khalnayika (2017)</strong>, cementing his reputation for grounded socio-economic realism told with a grand, mythic canvas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                  <div className="text-[10px] tracking-wider uppercase text-[#FFD978] font-bold flex items-center gap-1">
                    <Tv className="w-3.5 h-3.5 text-[#FFD978]" />
                    Trusted TVC & Corporate Films
                  </div>
                  <p className="mt-2 text-white/70 text-[12px]">
                    That same discipline made him a trusted TVC and corporate film director for India’s biggest blue-chip brands: <strong className="text-white">TATA Motors, Mahindra & Mahindra, Castrol, Piaggio</strong> and 15+ national TV campaigns.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-[10px] tracking-wider uppercase text-[#FFD978] font-bold mb-2">
                  THE AI REVOLUTION: PROZENIUS MEDIA
                </div>
                <p className="text-white/70 text-[12px]">
                  In the last 2 years of the AI revolution, Hemant has quietly executed what no traditional director has. Under his leadership, <strong className="text-white">Prozenius Media (www.prozenius.com)</strong> has delivered AI-driven Sales Films, Ad Films, and Campaign Films for over 25+ clients, transforming how industrial giants pitch, sell, and train.
                </p>
                <p className="mt-2 text-white/70 text-[12px]">
                  Where others use AI as a gimmick, Hemant uses it as a production pipeline: complete in-house control over MoCap setups, Neural CGI, and Generative Visual Workflows, keeping budgets tight, timelines robust, and quality global.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#B8860B]/30 bg-gradient-to-r from-amber-500/10 to-red-500/5">
                <div className="text-[10px] tracking-wider uppercase text-[#FFD978] font-bold mb-2">
                  HIS DIRECTING FOCUS & THE KHATU SHYAM UNIVERSE
                </div>
                <p className="text-white/80 text-[12px]">
                  This philosophy is now culminating in his most ambitious universe: <strong className="text-[#FFD978]">KHATU SHYAM / SHYAM EXPRESS - PROF S KHATU: INDIA’S SAHARA (Hare Ka Sahara)</strong> and <strong className="text-[#FFD978]">PROF S KHATU - INDIA’S CULTURAL ATTIRE SHOWCASE</strong>. A 9-look pan-India saga blending education transformation, bhakti, and 2027 futurism - designed ground-up as an AI + Live Action hybrid for theatrical and global OTT.
                </p>
                <p className="mt-2 text-white/80 text-[12px]">
                  From directing actors on a single-take film set to directing 200 AI artists and neural engines, Hemant Nilim Das is not just telling stories. He is prototyping the future of Indian filmmaking.
                </p>
              </div>

              <div className="text-center py-2 border-t border-white/5 mt-4">
                <p className="text-[11px] text-white/50">
                  Hemant Nilim Das is available for Direction, AI Film Production, and Brand Storytelling via Prozenius Media.
                </p>
              </div>

            </div>

            {/* Footer Credits */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-black/40 p-3 rounded-lg">
              <div className="text-[10px] text-white/60">
                Credit: <strong className="text-[#FFD978]">Written, Designed & Directed by HEMANT NILIM DAS</strong>
              </div>
              <div className="text-[9px] font-mono text-white/40 uppercase">
                Studio: Prozenius Media | Mumbai | <a href="https://www.prozenius.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD978] hover:underline">www.prozenius.com</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Production Frames Slide
interface ProductionFramesSlideProps {
  frames: Record<string, string>;
  onUploadFrame: (id: string, dataUrl: string, name: string) => void;
  onDeleteFrame: (id: string) => void;
}

const DEFAULT_FRAMES: Record<string, string> = {
  "movie_frame_1": khatuShyamHero,
  "movie_frame_2": profShyam,
  "movie_frame_3": hemantNilimDas,
  "movie_frame_4": sumedhMudgalkar,
  "movie_frame_5": divyaDutta,
  "movie_frame_6": prajaktaMali,
  "movie_frame_7": hemantMentoring,
  "movie_frame_8": shyamExpressLogo,
};

export function ProductionFramesSlide({ frames = {}, onUploadFrame, onDeleteFrame }: ProductionFramesSlideProps) {
  const [activePreviewUrl, setActivePreviewUrl] = React.useState<string | null>(null);

  const onFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUploadFrame(id, dataUrl, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="slide w-full h-full bg-[#1A1A1A] text-[#FFF8E7] relative overflow-hidden flex max-w-[100vw]">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(60% 60% at 85% 20%, ${x.maroon} 0%, transparent 70%), radial-gradient(50% 50% at 15% 80%, rgba(184,134,11,0.1) 0%, transparent 60%)`
        }}
      />
      
      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-6 flex flex-col justify-center overflow-y-auto max-h-full">
        <SectionBadge>PRODUCTION END PRODUCT SHOWCASE</SectionBadge>
        
        <h1 className="serif mt-1 text-[26px] md:text-[36px] font-extrabold text-[#FFD978] uppercase tracking-wide leading-tight">
          CINEMATIC MOVIE FRAMES
        </h1>
        <p className="text-[12px] text-white/50 font-mono tracking-widest uppercase mt-0.5">
          how we use 5P SVF to build a world of extremely immersive viewing experience.
        </p>

        {/* Responsive Grid for 10 frames */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3.5 flex-1 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
          {Array.from({ length: 10 }).map((_, idx) => {
            const num = idx + 1;
            const id = `movie_frame_${num}`;
            const isCustom = !!frames[id];
            const imgUrl = frames[id] || DEFAULT_FRAMES[id];

            return (
              <div
                key={id}
                className={`relative rounded-xl border overflow-hidden aspect-[16/10] transition-all flex flex-col justify-center items-center group ${
                  imgUrl
                    ? "border-[#B8860B]/50 hover:border-[#FFD978]"
                    : "border-white/10 border-dashed bg-black/15 hover:bg-black/30 animate-pulse"
                }`}
              >
                {imgUrl ? (
                  <>
                    <img
                      src={imgUrl}
                      alt={`Frame ${num}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                      onClick={() => setActivePreviewUrl(imgUrl)}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover controls overlay */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-2 border border-[#FFD978]/20 rounded-xl">
                      <div className="text-[9px] font-mono tracking-wider uppercase text-[#FFD978] font-bold text-center">
                        {isCustom ? `Custom Frame ${String(num).padStart(2, "0")}` : `Default Frame ${String(num).padStart(2, "0")}`}
                      </div>
                      
                      <div className="flex gap-1.5 justify-center">
                        <button
                          onClick={() => setActivePreviewUrl(imgUrl)}
                          className="px-2 py-0.5 rounded bg-[#B8860B] text-black text-[9px] font-bold uppercase tracking-wider hover:bg-[#FFD978] transition cursor-pointer"
                        >
                          View
                        </button>
                        
                        <label className="px-2 py-0.5 rounded bg-white/10 text-white text-[9px] font-bold uppercase tracking-wider hover:bg-white/20 transition cursor-pointer flex items-center justify-center">
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onFileChange(id, e)}
                            className="hidden"
                          />
                        </label>

                        {isCustom && (
                          <button
                            onClick={() => onDeleteFrame(id)}
                            className="p-1 rounded bg-red-950 border border-red-500/30 text-red-400 hover:text-white hover:bg-red-600 transition cursor-pointer"
                            title="Reset to Default"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center cursor-pointer">
                    <Camera className="w-5 h-5 text-[#FFD978]/60 group-hover:text-[#FFD978] transition" />
                    <span className="text-[9.5px] uppercase font-bold tracking-wider text-white/50 mt-1 group-hover:text-white transition">
                      Frame {String(num).padStart(2, "0")}
                    </span>
                    <span className="text-[7.5px] text-white/30 mt-0.5 block">
                      Click to load
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onFileChange(id, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full screen active preview modal */}
      {activePreviewUrl && (
        <div
          className="fixed inset-0 bg-black/98 z-[9999] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActivePreviewUrl(null)}
        >
          <div className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center">
            <img
              src={activePreviewUrl}
              alt="Cinematic Preview"
              className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setActivePreviewUrl(null)}
              className="mt-4 px-6 py-2 rounded-full bg-[#B8860B] text-black font-bold text-[11px] uppercase tracking-wider hover:bg-[#FFD978] transition"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
