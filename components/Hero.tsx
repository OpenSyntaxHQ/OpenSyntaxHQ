"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import Link from "next/link";

// Register GSAP React plugin
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

// Scramble text characters for glitch effect
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shatterRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scramble text animation
  const scrambleText = useCallback((element: HTMLElement, finalText: string, duration: number = 1.5) => {
    let iteration = 0;
    const totalIterations = duration * 60;
    
    const interval = setInterval(() => {
      element.innerText = finalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration / (totalIterations / finalText.length)) {
            return finalText[index];
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      if (iteration >= totalIterations) {
        element.innerText = finalText;
        clearInterval(interval);
      }
      iteration += 1;
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, []);

  // Mouse move handler for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (e.clientX - rect.left - centerX) / centerX;
    const deltaY = (e.clientY - rect.top - centerY) / centerY;
    
    mousePos.current = { x: deltaX, y: deltaY };

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
  }, []);

  // Generate shatter fragments
  const generateShatterFragments = () => {
    const fragments = [];
    const cols = 8;
    const rows = 6;
    const fragWidth = 100 / cols;
    const fragHeight = 100 / rows;

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

  // Master entrance animation
  useGSAP(() => {
    if (!mounted || !containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    masterTimelineRef.current = tl;

    // Phase 1: Reality Shatter (fragments fly away)
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

    // Phase 2: Nebula fade in
    tl.to(nebulaRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
    }, "-=0.8");

    // Phase 3: Orbs entrance with elastic bounce
    tl.from(orbsRef.current.filter(Boolean), {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
    }, "-=1");

    // Phase 4: Title with scramble effect
    if (titleRef.current) {
      const titleSpan = titleRef.current.querySelector(".title-main");
      const hqSpan = titleRef.current.querySelector(".title-hq");
      
      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5");

      if (titleSpan instanceof HTMLElement) {
        tl.add(() => { scrambleText(titleSpan, "OpenSyntax", 1.2); }, "-=0.3");
      }
      if (hqSpan instanceof HTMLElement) {
        tl.add(() => { scrambleText(hqSpan, "HQ", 0.8); }, "-=1");
      }
    }

    // Phase 5: Badge entrance
    tl.from(".hero-badge", {
      y: 30,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.8");

    // Phase 6: Subtitle word-by-word reveal
    if (subtitleRef.current) {
      const words = subtitleRef.current.querySelectorAll(".subtitle-word");
      tl.from(words, {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      }, "-=0.4");
    }

    // Phase 7: CTA buttons
    tl.from(".hero-cta-container", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3");
    tl.from(".cta-btn", { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)" }, "-=0.4");

    // Cleanup shatter container after animation
    tl.set(shatterRef.current, { display: "none" }, "+=0.2");

    // Start mouse tracking after entrance
    tl.add(() => window.addEventListener("mousemove", handleMouseMove));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      tl.kill();
    };
  }, { scope: containerRef, dependencies: [mounted] });

  // Subtitle words for animation
  const subtitleWords = "Building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain.".split(" ");

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
            Building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain.
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

        {/* Title */}
        <h1
          ref={titleRef}
          className="md:text-7xl text-4xl lg:text-8xl font-bold text-center text-foreground relative z-20 tracking-tight glitch-text"
          data-text="OpenSyntaxHQ"
        >
          <span className="title-main">OpenSyntax</span>
          <span className="title-hq text-primary">HQ</span>
        </h1>

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
