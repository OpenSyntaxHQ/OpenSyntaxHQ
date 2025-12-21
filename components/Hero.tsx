"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

interface Orb {
  id: number;
  className: string;
  baseX: number;
  baseY: number;
  parallaxStrength: number;
}

const ORBS: Orb[] = [
  { id: 1, className: "orb-1", baseX: 10, baseY: 15, parallaxStrength: 0.08 },
  { id: 2, className: "orb-2", baseX: 85, baseY: 25, parallaxStrength: 0.12 },
  { id: 3, className: "orb-3", baseX: 20, baseY: 70, parallaxStrength: 0.06 },
  { id: 4, className: "orb-4", baseX: 90, baseY: 60, parallaxStrength: 0.1 },
  { id: 5, className: "orb-5", baseX: 75, baseY: 85, parallaxStrength: 0.07 },
  { id: 6, className: "orb-6", baseX: 5, baseY: 40, parallaxStrength: 0.09 },
];

// Title characters
const TITLE_CHARS = "OpenSyntax".split("");
const HQ_CHARS = "HQ".split("");

// Animation variants
type TitleAnimationType = "scatter" | "cinematic";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hqCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shatterRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Random animation selection
  const animationType = useMemo<TitleAnimationType>(() => {
    return Math.random() > 0.5 ? "cinematic" : "scatter";
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (e.clientX - rect.left - centerX) / centerX;
    const deltaY = (e.clientY - rect.top - centerY) / centerY;
    
    mousePos.current = { x: deltaX, y: deltaY };

    // Parallax orbs
    orbsRef.current.forEach((orb, index) => {
      if (!orb) return;
      const strength = ORBS[index]?.parallaxStrength || 0.1;
      gsap.to(orb, {
        x: deltaX * 100 * strength,
        y: deltaY * 100 * strength,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    // 3D tilt on title - more dramatic effect
    if (titleContainerRef.current) {
      gsap.to(titleContainerRef.current, {
        rotationY: deltaX * 15,
        rotationX: -deltaY * 10,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  // Shatter fragments
  const generateShatterFragments = () => {
    const fragments = [];
    const cols = 8, rows = 6;
    const fragWidth = 100 / cols, fragHeight = 100 / rows;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        fragments.push(
          <div
            key={`${i}-${j}`}
            className="shatter-fragment"
            style={{
              left: `${j * fragWidth}%`,
              top: `${i * fragHeight}%`,
              width: `${fragWidth + 0.5}%`,
              height: `${fragHeight + 0.5}%`,
              opacity: 1,
            }}
          />
        );
      }
    }
    return fragments;
  };

  // SCATTER Animation - Characters fly in from random positions
  const animateScatter = (tl: gsap.core.Timeline, titleChars: HTMLSpanElement[], hqChars: HTMLSpanElement[]) => {
    // Set initial random positions
    titleChars.forEach((char) => {
      gsap.set(char, {
        x: gsap.utils.random(-300, 300),
        y: gsap.utils.random(-200, 200),
        rotation: gsap.utils.random(-180, 180),
        scale: 0,
        opacity: 0,
      });
    });
    
    hqChars.forEach((char) => {
      gsap.set(char, {
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-150, 150),
        rotation: gsap.utils.random(-180, 180),
        scale: 0,
        opacity: 0,
      });
    });

    // Animate title characters flying in
    tl.to(titleChars, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
      stagger: { amount: 0.6, from: "random" },
      ease: "back.out(1.4)",
    }, "-=0.5");

    // Animate HQ characters
    tl.to(hqChars, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: { amount: 0.2, from: "start" },
      ease: "elastic.out(1, 0.5)",
    }, "-=0.6");

    // Floating wave effect
    tl.add(() => {
      titleChars.forEach((char, i) => {
        gsap.to(char, {
          y: "random(-3, 3)",
          duration: "random(2, 3)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.05,
        });
      });
      hqChars.forEach((char, i) => {
        gsap.to(char, {
          y: "random(-4, 4)",
          duration: "random(1.5, 2.5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });
    }, "+=0.2");
  };

  // CINEMATIC Animation - 3D flip with scanning line
  const animateCinematic = (tl: gsap.core.Timeline, titleChars: HTMLSpanElement[], hqChars: HTMLSpanElement[], allChars: HTMLSpanElement[]) => {
    // Set initial state - characters hidden in 3D space
    allChars.forEach((char) => {
      gsap.set(char, {
        opacity: 0,
        scale: 0,
        z: -1000,
        rotationX: gsap.utils.random(-90, 90),
        rotationY: gsap.utils.random(-180, 180),
        filter: "blur(20px)",
      });
    });

    // Scanning line reveal
    tl.set(scanLineRef.current, { opacity: 1, left: "0%" });
    tl.to(scanLineRef.current, {
      left: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    }, "-=0.3");

    // Characters flip in with 3D rotation
    titleChars.forEach((char, i) => {
      tl.to(char, {
        opacity: 1,
        scale: 1,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "back.out(1.7)",
      }, `-=1.0`);
    });

    // HQ with explosive entrance
    tl.to(hqChars, {
      opacity: 1,
      scale: 1,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: 0.1,
      ease: "elastic.out(1.2, 0.5)",
    }, "-=0.4");

    // Hide scan line
    tl.to(scanLineRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");

    // Glow pulse wave
    tl.add(() => {
      allChars.forEach((char, i) => {
        gsap.to(char, {
          textShadow: "0 0 60px rgba(16, 185, 129, 1), 0 0 120px rgba(16, 185, 129, 0.8)",
          duration: 0.3,
          delay: i * 0.05,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      });
    }, "-=0.2");

    // Continuous animations
    tl.add(() => {
      allChars.forEach((char, i) => {
        gsap.to(char, {
          y: "random(-2, 2)",
          rotationZ: "random(-1, 1)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.02,
        });
      });
      gsap.to(hqChars, {
        textShadow: "0 0 40px rgba(16, 185, 129, 0.8)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, "+=0.3");
  };

  // Master animation
  useGSAP(() => {
    if (!mounted || !containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Phase 1: Shatter
    const fragments = shatterRef.current?.querySelectorAll(".shatter-fragment");
    if (fragments && fragments.length > 0) {
      tl.set(fragments, { opacity: 1 });
      tl.to(fragments, {
        x: () => gsap.utils.random(-600, 600),
        y: () => gsap.utils.random(-600, 600),
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180),
        rotationZ: () => gsap.utils.random(-90, 90),
        scale: 0,
        opacity: 0,
        duration: 1.2,
        stagger: { amount: 0.5, from: "center", grid: "auto" },
        ease: "power2.in",
      }, "+=0.1");
    }

    // Phase 2: Nebula
    tl.to(nebulaRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.8");

    // Phase 3: Orbs
    tl.from(orbsRef.current.filter(Boolean), {
      scale: 0, opacity: 0, duration: 1.2, stagger: 0.1, ease: "elastic.out(1, 0.5)",
    }, "-=1");

    // Phase 4: Title Animation (RANDOM SELECTION)
    const titleChars = titleCharsRef.current.filter(Boolean) as HTMLSpanElement[];
    const hqChars = hqCharsRef.current.filter(Boolean) as HTMLSpanElement[];
    const allChars = [...titleChars, ...hqChars];

    if (animationType === "scatter") {
      animateScatter(tl, titleChars, hqChars);
    } else {
      animateCinematic(tl, titleChars, hqChars, allChars);
    }

    // Phase 5: Badge
    tl.from(".hero-badge", { y: 30, opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" }, "-=2");

    // Phase 6: Subtitle
    if (subtitleRef.current) {
      const words = subtitleRef.current.querySelectorAll(".subtitle-word");
      tl.from(words, { y: 40, opacity: 0, filter: "blur(10px)", duration: 0.6, stagger: 0.03, ease: "power2.out" }, "-=1.5");
    }

    // Phase 7: CTAs
    tl.from(".hero-cta-container", { y: 40, opacity: 0, duration: 0.8 }, "-=1");
    tl.from(".cta-btn", { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)" }, "-=0.5");

    // Cleanup shatter
    tl.set(shatterRef.current, { display: "none" }, "+=0.2");

    // Mouse tracking
    tl.add(() => window.addEventListener("mousemove", handleMouseMove));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      tl.kill();
    };
  }, { scope: containerRef, dependencies: [mounted, animationType] });

  // Subtitle words
  const subtitleWords = useMemo(() => 
    "Building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain.".split(" "),
  []);

  if (!mounted) {
    return (
      <div className="cosmic-hero flex items-center justify-center" style={{ visibility: 'hidden' }}>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/80 border border-border/50 text-xs font-medium">
            <span className="w-3.5 h-3.5" />
            <span>Engineer-first Open Source</span>
            <span className="w-3 h-3" />
          </div>
          <h1 className="md:text-7xl text-4xl lg:text-8xl font-bold tracking-tight">
            <span>OpenSyntax</span><span className="text-primary">HQ</span>
          </h1>
          <div className="md:text-xl text-base max-w-2xl mx-auto leading-relaxed">
            Building practical, well-documented tools and reference implementations.
          </div>
          <div className="flex items-center justify-center gap-4 pt-6">
            <div className="h-12 w-44 rounded-full" />
            <div className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="cosmic-hero flex items-center justify-center">
      {/* Shatter Overlay */}
      <div ref={shatterRef} className="shatter-container">
        {generateShatterFragments()}
      </div>

      {/* Nebula Background */}
      <div ref={nebulaRef} className="nebula-bg">
        <div className="nebula-layer" />
        <div className="nebula-layer" />
        <div className="nebula-layer" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {ORBS.map((orb, index) => (
          <div
            key={orb.id}
            ref={(el) => { orbsRef.current[index] = el; }}
            className={`floating-orb ${orb.className}`}
            style={{ left: `${orb.baseX}%`, top: `${orb.baseY}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8 py-20">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm border border-border/50 text-muted-foreground text-xs font-medium cosmic-glow">
          <Terminal className="w-3.5 h-3.5" />
          <span>Engineer-first Open Source</span>
          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        </div>

        {/* Title with character animation */}
        <div ref={titleContainerRef} className="title-3d-container relative" style={{ perspective: "1000px" }}>
          {/* Scanning Line (for cinematic mode) */}
          <div
            ref={scanLineRef}
            className="absolute top-0 bottom-0 w-1 opacity-0 pointer-events-none z-30"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 1), rgba(16, 185, 129, 1), transparent)",
              boxShadow: "0 0 30px 10px rgba(16, 185, 129, 0.8), 0 0 60px 20px rgba(16, 185, 129, 0.4)",
            }}
          />
          
          <h1 className="md:text-7xl text-4xl lg:text-8xl font-bold text-center text-foreground relative z-20 tracking-tight" style={{ transformStyle: "preserve-3d" }}>
            {TITLE_CHARS.map((char, index) => (
              <span
                key={index}
                ref={(el) => { titleCharsRef.current[index] = el; }}
                className="title-char inline-block"
                style={{ display: 'inline-block', transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
            {HQ_CHARS.map((char, index) => (
              <span
                key={`hq-${index}`}
                ref={(el) => { hqCharsRef.current[index] = el; }}
                className="title-char hq-char inline-block text-primary"
                style={{ display: 'inline-block', transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="text-muted-foreground md:text-xl text-base max-w-2xl mx-auto relative z-20 leading-relaxed">
          {subtitleWords.map((word, index) => (
            <span key={index} className="subtitle-word inline-block mr-[0.3em]">{word}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-cta-container flex items-center justify-center gap-4 pt-6">
          <Link href="/build">
            <Button
              size="lg"
              className="cta-btn magnetic-btn rounded-full px-8 h-12 text-base font-medium cosmic-glow"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
              }}
            >
              See what we build
            </Button>
          </Link>
          <Link href="/mission">
            <Button
              variant="outline"
              size="lg"
              className="cta-btn magnetic-btn rounded-full px-8 h-12 text-base font-medium bg-transparent/50 backdrop-blur-sm border-border/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground cosmic-glow"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
              }}
            >
              How to start <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
