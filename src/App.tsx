import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Info,
  CheckCircle,
  Share2,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Music,
  ShieldCheck,
  Loader2,
  Disc,
  Trash2,
  Lock,
  Upload,
  ArrowRight
} from "lucide-react";
import {
  TitleSlide,
  OneLinerSlide,
  OpportunitySlide,
  LookFeelSlide,
  ProfShyamSlide,
  CastSlide,
  AboutCreatorSlide,
  COPSlide,
  RecoverySlide,
  NextStepsSlide,
  ProductionFramesSlide,
  x
} from "./components/Slides";
import { getImages, saveImage, deleteImage, UploadedImage } from "./utils/db";
import { CinematicOrchestraSynth, SecureAudioPlayer } from "./utils/secureAudio";

// @ts-ignore
import filmTrack1Url from "./assets/audio/film_track_1.mp3";
// @ts-ignore
const filmTrack2Url = filmTrack1Url;
// @ts-ignore
import fallbackHero from "./assets/images/khatu_shyam_hero_1783612474905.jpg";

const TOTAL_SLIDES = 11;
const SLIDE_NAMES = [
  "Pitch Deck Title",
  "One-Line Vision",
  "The Opportunity",
  "Look & Feel",
  "Character Blueprint",
  "All-Star Cast",
  "About the Creator",
  "Budget Model",
  "Recovery Plan",
  "Investment Steps",
  "Production Frames"
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showStartPopup, setShowStartPopup] = useState<boolean>(true);

  // Secure Audio Player and Synthesizer States
  const [audioState, setAudioState] = useState<"off" | "synth" | "song1" | "song2">("off");
  const [volume, setVolume] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [song1Name, setSong1Name] = useState<string | null>("Film Track 1 (Vocal Theme)");
  const [song2Name, setSong2Name] = useState<string | null>("Film Track 2 (Background Score)");
  const [song1Base64, setSong1Base64] = useState<string | null>(filmTrack1Url);
  const [song2Base64, setSong2Base64] = useState<string | null>(filmTrack2Url);
  const [isDecoding, setIsDecoding] = useState<boolean>(false);
  const [decodingMsg, setDecodingMsg] = useState<string | null>(null);
  const [showAudioPanel, setShowAudioPanel] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioNotification, setAudioNotification] = useState<string | null>(null);

  // Audio utility references
  const synthRef = useRef<CinematicOrchestraSynth | null>(null);
  const playerRef = useRef<SecureAudioPlayer | null>(null);

  // Synchronize fullscreen state with browser events (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const elem = containerRef.current || document.documentElement;
      elem.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  // Dynamic hero image database states
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [slideImages, setSlideImages] = useState<Record<string, string>>({});
  
  // Custom Movie Frames states
  const [movieFrames, setMovieFrames] = useState<Record<string, string>>({});

  // Load images and audio files from database on mount
  useEffect(() => {
    getImages()
      .then((imgs) => {
        // Filter out audio files, tracks, and frames from the slide visual library
        setUploadedImages(imgs.filter(img => 
          img.id !== "secure_song_1" && 
          img.id !== "secure_song_2" &&
          !img.id.startsWith("movie_track_") &&
          !img.id.startsWith("movie_frame_")
        ));
        
        // Populate slide key-value images
        const dict: Record<string, string> = {};
        const framesDict: Record<string, string> = {};

        imgs.forEach(img => {
          if (img.id.startsWith("slide_")) {
            dict[img.id] = img.dataUrl;
          } else if (img.id.startsWith("movie_frame_")) {
            framesDict[img.id] = img.dataUrl;
          }
        });
        
        setSlideImages(dict);
        setMovieFrames(framesDict);

        // Find main non-slot images (excluding secure song, track, and frame data)
        const mainImgs = imgs.filter(img => 
          !img.id.startsWith("slide_") && 
          img.id !== "secure_song_1" && 
          img.id !== "secure_song_2" &&
          !img.id.startsWith("movie_track_") &&
          !img.id.startsWith("movie_frame_")
        );
        if (mainImgs.length > 0) {
          setSelectedImageId(mainImgs[0].id);
        }
      })
      .catch((err) => {
        console.warn("IndexedDB load error:", err);
      });
  }, []);

  // Show a temporary message toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => clearTimeout(timer);
  };

  const handleImageUpload = async (dataUrl: string, name: string) => {
    const newImg: UploadedImage = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      name,
      dataUrl,
      timestamp: Date.now()
    };
    try {
      await saveImage(newImg);
      setUploadedImages(prev => [newImg, ...prev]);
      setSelectedImageId(newImg.id);
      showToast("Visual uploaded and saved persistently!");
    } catch (err) {
      console.warn("Failed to save image to IndexedDB:", err);
      showToast("Failed to store image on device");
    }
  };

  const handleImageDelete = async (id: string) => {
    try {
      await deleteImage(id);
      setUploadedImages(prev => prev.filter(img => img.id !== id));
      if (selectedImageId === id) {
        setSelectedImageId(null);
      }
      showToast("Visual deleted from device");
    } catch (err) {
      console.warn("Failed to delete image:", err);
      showToast("Failed to delete image");
    }
  };

  const handleSlotImageUpload = async (slotId: string, dataUrl: string, name: string) => {
    const newImg: UploadedImage = {
      id: slotId,
      name,
      dataUrl,
      timestamp: Date.now()
    };
    try {
      await saveImage(newImg);
      setSlideImages(prev => ({ ...prev, [slotId]: dataUrl }));
      showToast("Custom slide visual saved persistently!");
    } catch (err) {
      console.warn("Failed to save slot image:", err);
      showToast("Failed to store visual on device");
    }
  };

  const handleSlotImageReset = async (slotId: string) => {
    try {
      await deleteImage(slotId);
      setSlideImages(prev => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
      showToast("Visual reset to default");
    } catch (err) {
      console.warn("Failed to delete slot image:", err);
    }
  };

  const handleUploadMovieFrame = async (id: string, dataUrl: string, name: string) => {
    const frameItem: UploadedImage = {
      id,
      name,
      dataUrl,
      timestamp: Date.now()
    };
    try {
      await saveImage(frameItem);
      setMovieFrames(prev => ({ ...prev, [id]: dataUrl }));
      showToast("Cinematic frame slot saved persistently!");
    } catch (err) {
      console.warn("Failed to save frame:", err);
      showToast("Failed to store frame on device");
    }
  };

  const handleDeleteMovieFrame = async (id: string) => {
    try {
      await deleteImage(id);
      setMovieFrames(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      showToast("Cinematic frame slot cleared");
    } catch (err) {
      console.warn("Failed to delete frame:", err);
      showToast("Failed to delete frame");
    }
  };

  // Lazy-instantiate the Audio objects in-place safely
  if (!synthRef.current && typeof window !== "undefined") {
    synthRef.current = new CinematicOrchestraSynth();
  }
  if (!playerRef.current && typeof window !== "undefined") {
    playerRef.current = new SecureAudioPlayer();
  }

  // Handle all Audio play/pause state synchronization
  useEffect(() => {
    const synth = synthRef.current;
    const player = playerRef.current;
    if (!synth || !player) return;

    synth.setVolume(volume);
    player.setVolume(volume);

    let active = true;

    const syncAudio = async () => {
      if (!active) return;

      if (!isPlaying || audioState === "off") {
        synth.stop();
        player.pause();
        return;
      }

      if (audioState === "synth") {
        player.pause();
        synth.start();
        synth.setVolume(volume);
      } else if (audioState === "song1") {
        synth.stop();
        if (song1Base64) {
          if (player.getCurrentSongBase64() !== song1Base64) {
            setIsDecoding(true);
            setDecodingMsg("Decrypting & decoding track securely in-memory...");
            try {
              await player.loadSong(song1Base64, (msg) => {
                if (active) setDecodingMsg(msg);
              });
            } catch (err) {
              console.warn("Song 1 decoding failed:", err);
              if (active) {
                showToast("Decoding failed. Fallback to Synth.");
                setAudioState("synth");
              }
              return;
            } finally {
              if (active) {
                setIsDecoding(false);
                setDecodingMsg(null);
              }
            }
          }
          if (active) {
            player.play(volume, (curr, dur) => {
              if (active) {
                setCurrentTime(curr);
                setDuration(dur);
              }
            });
          }
        } else {
          showToast("Song 1 slot is empty! Upload a film song first.");
          setAudioState("synth");
        }
      } else if (audioState === "song2") {
        synth.stop();
        if (song2Base64) {
          if (player.getCurrentSongBase64() !== song2Base64) {
            setIsDecoding(true);
            setDecodingMsg("Decrypting & decoding track securely in-memory...");
            try {
              await player.loadSong(song2Base64, (msg) => {
                if (active) setDecodingMsg(msg);
              });
            } catch (err) {
              console.warn("Song 2 decoding failed:", err);
              if (active) {
                showToast("Decoding failed. Fallback to Synth.");
                setAudioState("synth");
              }
              return;
            } finally {
              if (active) {
                setIsDecoding(false);
                setDecodingMsg(null);
              }
            }
          }
          if (active) {
            player.play(volume, (curr, dur) => {
              if (active) {
                setCurrentTime(curr);
                setDuration(dur);
              }
            });
          }
        } else {
          showToast("Song 2 slot is empty! Upload a film song first.");
          setAudioState("synth");
        }
      }
    };

    syncAudio();

    return () => {
      active = false;
    };
  }, [audioState, volume, isPlaying, song1Base64, song2Base64]);

  // Clean up all audio nodes on component unmount
  useEffect(() => {
    return () => {
      synthRef.current?.stop();
      playerRef.current?.stop();
    };
  }, []);

  const activeImage = selectedImageId 
    ? (uploadedImages.find(img => img.id === selectedImageId)?.dataUrl || fallbackHero)
    : fallbackHero;


  // Safe slide navigation
  const navigateToSlide = (index: number) => {
    const nextIdx = (index + TOTAL_SLIDES) % TOTAL_SLIDES;
    setCurrentSlide(nextIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        navigateToSlide(currentSlide + 1);
        if (e.key === " ") e.preventDefault(); // Prevent scrolling on space
      } else if (e.key === "ArrowLeft") {
        navigateToSlide(currentSlide - 1);
      } else if (e.key === "Backspace") {
        navigateToSlide(currentSlide - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Autoplay handler
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      navigateToSlide(currentSlide + 1);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(interval);
  }, [currentSlide, isAutoplay]);

  const handleCTA = () => {
    showToast("PROZENIUS • Team will contact you shortly!");
    try {
      navigator.clipboard.writeText("PROZENIUS - contact@prozenius.com - HAAR NAHI, HAAZIR");
    } catch (err) {
      console.warn("Clipboard copy failed", err);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      showToast("Presentation link copied to clipboard!");
    } catch (err) {
      showToast("PROZENIUS: contact@prozenius.com");
    }
  };

  // Slide content selector
  const renderActiveSlide = () => {
    const commonProps = {
      images: slideImages,
      onUploadImage: handleSlotImageUpload,
      onResetImage: handleSlotImageReset
    };

    switch (currentSlide) {
      case 0:
        return (
          <TitleSlide
            heroImage={activeImage}
            onImageUpload={handleImageUpload}
            uploadedImages={uploadedImages.filter(img => !img.id.startsWith("slide_"))}
            onSelectImage={(id) => setSelectedImageId(id)}
            selectedImageId={selectedImageId}
            onDeleteImage={handleImageDelete}
            {...commonProps}
          />
        );
      case 1:
        return <OneLinerSlide {...commonProps} />;
      case 2:
        return <OpportunitySlide {...commonProps} />;
      case 3:
        return <LookFeelSlide {...commonProps} />;
      case 4:
        return <ProfShyamSlide {...commonProps} />;
      case 5:
        return <CastSlide {...commonProps} />;
      case 6:
        return <AboutCreatorSlide {...commonProps} />;
      case 7:
        return <COPSlide {...commonProps} />;
      case 8:
        return <RecoverySlide {...commonProps} />;
      case 9:
        return <NextStepsSlide onCTAClick={handleCTA} {...commonProps} />;
      case 10:
        return (
          <ProductionFramesSlide
            frames={movieFrames}
            onUploadFrame={handleUploadMovieFrame}
            onDeleteFrame={handleDeleteMovieFrame}
          />
        );
      default:
        return (
          <TitleSlide
            heroImage={activeImage}
            onImageUpload={handleImageUpload}
            uploadedImages={uploadedImages.filter(img => !img.id.startsWith("slide_"))}
            onSelectImage={(id) => setSelectedImageId(id)}
            selectedImageId={selectedImageId}
            onDeleteImage={handleImageDelete}
            {...commonProps}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      id="app-container"
      className="relative w-full h-[100svh] bg-[#111111] overflow-hidden select-none font-sans text-white"
    >
      {/* 1. TOP PROGRESS BAR */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#B8860B] via-[#FFD978] to-[#B8860B] transition-all duration-700 ease-out"
          style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
        />
      </div>

      {/* 2. HEADER BAR */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-10 h-[56px] border-b border-white/[0.08] backdrop-blur-md bg-[#1A1A1A]/70 no-print">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold tracking-widest border"
            style={{
              borderColor: x.gold,
              color: x.goldLight,
              background: `radial-gradient(circle, ${x.maroon} 0%, #1A1A1A 100%)`
            }}
          >
            KS
          </div>
          <div className="serif text-[14px] md:text-[16px] tracking-[0.22em] text-[#FFF8E7]/90 uppercase font-semibold">
            SHYAM EXPRESS
          </div>
          <div className="hidden md:block h-4 w-px bg-white/15" />
          <div className="hidden md:block text-[9px] tracking-[0.18em] text-white/40 uppercase font-semibold">
            INVESTOR ROADMAP • PROZENIUS
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isAutoplay
                ? "bg-[#B8860B] text-black hover:bg-[#FFD978]"
                : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/5"
            }`}
            title={isAutoplay ? "Pause Autoplay" : "Start Autoplay (7s Interval)"}
          >
            {isAutoplay ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Autoplay ON</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Autoplay</span>
              </>
            )}
          </button>



          <button
            onClick={handleShare}
            className="p-1.5 md:px-3 md:py-1.5 rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-1.5 cursor-pointer transition text-[10px] uppercase font-semibold"
            title="Share Presentation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Share</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 md:px-3 md:py-1.5 rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-1.5 cursor-pointer transition text-[10px] uppercase font-semibold"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Exit</span>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Fullscreen</span>
              </>
            )}
          </button>

          <div className="text-[11px] tracking-widest text-[#FFD978] font-mono bg-black/40 px-2.5 py-1 rounded-full border border-white/5 font-semibold">
            {String(currentSlide + 1).padStart(2, "0")}{" "}
            <span className="text-white/30">/</span> {TOTAL_SLIDES}
          </div>
        </div>
      </header>

      {/* 3. ACTIVE SLIDE VIEW WITH ANIMATED PRESENCE */}
      <main className="relative w-full h-full pt-[56px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            {renderActiveSlide()}
          </motion.div>
        </AnimatePresence>

        {/* 4. NAVIGATION TRIGGERS (LEFT / RIGHT) */}
        <button
          onClick={() => navigateToSlide(currentSlide - 1)}
          aria-label="Previous Slide"
          className="no-print absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#1A1A1A]/80 hover:bg-[#B8860B] border border-white/10 text-white hover:text-black flex items-center justify-center shadow-lg transition duration-300 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => navigateToSlide(currentSlide + 1)}
          aria-label="Next Slide"
          className="no-print absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#B8860B] hover:bg-[#FFD978] text-black flex items-center justify-center font-bold shadow-[0_8px_24px_rgba(184,134,11,0.3)] transition duration-300 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 5. SLIDE JUMP BULLET POINTS (BOTTOM RAIL) */}
        <div className="no-print absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
          {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                onClick={() => navigateToSlide(idx)}
                className="group relative p-1 cursor-pointer"
                aria-label={`Jump to slide ${idx + 1}`}
              >
                <div
                  className={`h-[6px] rounded-full transition-all duration-500 ${
                    isActive ? "w-8" : "w-[6px] bg-white/20 group-hover:bg-white/50"
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(90deg, ${x.gold}, ${x.goldLight})`
                        }
                      : {}
                  }
                />
                
                {/* Floating tooltip preview for each slide */}
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/90 border border-white/15 px-2.5 py-1 rounded text-[9px] tracking-wide uppercase font-semibold text-[#FFF8E7] opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow-md z-50">
                  {SLIDE_NAMES[idx]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 6. SYSTEM STATUS OVERLAY OR FEEDBACK CHANNELS */}
        <div className="absolute bottom-5 left-6 hidden md:flex items-center gap-1.5 opacity-40 hover:opacity-100 transition z-30 text-[9px] tracking-widest font-mono uppercase">
          <Info className="w-3.5 h-3.5 text-[#FFD978]" />
          <span>Use Arrow keys / Spacebar to navigate</span>
        </div>
      </main>

      {/* 7. TOAST NOTIFICATION CONTAINER */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#FFF8E7] text-[#1A1A1A] text-[12px] font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.4)] border border-[#B8860B]/30 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-[#B8860B]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. AUTO-START AUDIO POPUP FOR AUTOPLAY POLICY */}
      <AnimatePresence>
        {showStartPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[9999] flex items-center justify-center p-6 select-none"
          >
            <div className="absolute inset-0 mandala opacity-15 pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="relative p-8 md:p-12 rounded-[28px] bg-[#1A1A1A] border border-[#B8860B]/30 max-w-[480px] w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center"
            >
              {/* Top accent glow */}
              <div
                className="absolute top-0 w-[250px] h-[250px] rounded-full blur-[50px] opacity-20 pointer-events-none"
                style={{ background: x.gold }}
              />

              {/* Logo icon */}
              <div className="w-16 h-16 rounded-full border border-[#B8860B]/40 flex items-center justify-center mb-6 relative" style={{ background: `${x.maroon}30` }}>
                <div className="absolute inset-0 rounded-full border border-dashed border-[#FFD978]/30 animate-[spin_20s_linear_infinite]" />
                <Play className="w-6 h-6 text-[#FFD978] fill-[#FFD978] ml-1" />
              </div>

              {/* Titles */}
              <span className="text-[10px] tracking-[0.3em] text-[#FFD978] uppercase font-bold">PROZENIUS</span>
              <h2 className="serif text-[28px] sm:text-[34px] text-white font-extrabold tracking-wider leading-none mt-2 uppercase">
                shyam express
              </h2>
              <p className="text-[14px] tracking-[0.25em] text-[#FFF8E7]/70 font-semibold uppercase mt-1">
                हारे का सहारा
              </p>

              <div className="h-px w-24 bg-[#B8860B]/20 my-6" />

              {/* Info text */}
              <p className="text-[13px] text-white/60 leading-relaxed font-sans max-w-[340px]">
                Welcome to the official film investor roadmap and cultural showcase proposal.
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  setShowStartPopup(false);
                }}
                className="mt-8 w-full h-[54px] rounded-full font-bold tracking-[0.16em] uppercase text-[12.5px] shadow-[0_8px_24px_rgba(184,134,11,0.25)] hover:shadow-[0_12px_32px_rgba(184,134,11,0.4)] hover:scale-[1.01] active:scale-[0.99] transition duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                style={{ background: `linear-gradient(90deg, ${x.gold}, ${x.goldLight})`, color: "#1A1A1A" }}
              >
                <span>Start Presentation</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              
              <div className="mt-4 text-[9px] tracking-widest text-white/30 font-mono uppercase font-bold">
                CONFIDENTIAL • IN-MEMORY AUDIO
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. SECURE MUSIC AUTO-SHIFT NOTIFICATION WITH USER CLARITY */}
      <AnimatePresence>
        {audioNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[999] max-w-[420px] w-[calc(100vw-48px)] sm:w-full p-5 rounded-2xl bg-[#1A1A1A]/95 border border-[#B8860B]/50 shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-white backdrop-blur-lg"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Disc className="w-5 h-5 text-emerald-400 animate-spin" />
              </div>
              <div className="flex-1">
                <h4 className="serif text-[14px] font-bold text-[#FFD978] uppercase tracking-wider">
                  Soundtrack Auto-Shifted
                </h4>
                <p className="mt-1.5 text-[11.8px] text-white/80 leading-relaxed font-sans">
                  {audioNotification}
                </p>
                <div className="mt-4 flex gap-2.5">
                  <button
                    onClick={() => setAudioNotification(null)}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10.5px] uppercase font-bold tracking-wider transition cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
