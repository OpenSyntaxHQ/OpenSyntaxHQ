"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MessageSquare, GitPullRequest, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

gsap.registerPlugin(useGSAP);

export default function MissionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial states immediately to prevent flash
    const h1 = headerRef.current?.querySelector("h1");
    const headerP = headerRef.current?.querySelector("p");
    const valueItems = valuesRef.current?.querySelectorAll("li");
    const contribBox = valuesRef.current?.querySelector(".contrib-box");
    const sectionH2 = cardsRef.current?.querySelector("h2");
    const cards = cardsRef.current?.querySelectorAll(".step-card");

    // Set all elements invisible initially
    gsap.set([h1, headerP].filter(Boolean), { y: 40, opacity: 0 });
    if (valueItems && valueItems.length > 0) gsap.set(valueItems, { x: -40, opacity: 0 });
    if (contribBox) gsap.set(contribBox, { scale: 0.9, opacity: 0 });
    if (sectionH2) gsap.set(sectionH2, { y: 40, opacity: 0 });
    if (cards && cards.length > 0) gsap.set(cards, { y: 60, opacity: 0 });
    gsap.set(".cta-container", { y: 30, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header entrance with reveal effect
    if (h1) {
      tl.to(h1, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      });
    }
    if (headerP) {
      tl.to(headerP, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, "-=0.5");
    }

    // Values list stagger
    if (valueItems && valueItems.length > 0) {
      tl.to(valueItems, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      }, "-=0.4");
    }

    // Contribution box entrance
    if (contribBox) {
      tl.to(contribBox, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.6");
    }

    // Section header
    if (sectionH2) {
      tl.to(sectionH2, {
        y: 0,
        opacity: 1,
        duration: 0.6,
      }, "-=0.3");
    }

    // Cards entrance
    if (cards && cards.length > 0) {
      tl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      }, "-=0.4");
    }

    // CTA button
    tl.to(".cta-container", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(2)",
    }, "-=0.3");

  }, { scope: containerRef });

  // Hover animations for cards
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".card-icon");
    
    if (isEnter) {
      gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
      gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.4, ease: "back.out(2)" });
    } else {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="pt-24 pb-40 px-6 max-w-5xl mx-auto min-h-dvh">
      <div ref={headerRef}>
        <h1 className="text-4xl md:text-6xl font-bold mb-8 glitch-text" data-text="Our Mission">
          Our Mission
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
          OpenSyntaxHQ is an engineer-first open-source organization focused on building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain.
        </p>
      </div>
      
      <div ref={valuesRef} className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            We Value
          </h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</span>
              Clarity over cleverness
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</span>
              Composability over monoliths
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</span>
              Pragmatic engineering
            </li>
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</span>
              Respectful collaboration
            </li>
          </ul>
        </div>
        
        <div className="contrib-box bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
          <h3 className="font-mono text-sm text-primary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            CONTRIBUTION_WORKFLOW.md
          </h3>
          <p className="text-foreground/80 leading-relaxed">
            Contributors are welcome from everywhere. We build together, review together, and keep the project usable for real teams.
          </p>
        </div>
      </div>
      
      <div ref={cardsRef}>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          How to get started
          <ArrowRight className="w-6 h-6 text-primary" />
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card 
            className="step-card hover:shadow-xl transition-shadow duration-300"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <CardHeader>
              <div className="card-icon w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>1. Read Docs</CardTitle>
            </CardHeader>
            <CardContent>
              Read <code className="px-1.5 py-0.5 rounded bg-muted text-sm">CONTRIBUTING.md</code> and <code className="px-1.5 py-0.5 rounded bg-muted text-sm">CODE_OF_CONDUCT.md</code> to understand our workflow.
            </CardContent>
          </Card>
          
          <Card 
            className="step-card hover:shadow-xl transition-shadow duration-300"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <CardHeader>
              <div className="card-icon w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle>2. Discuss</CardTitle>
            </CardHeader>
            <CardContent>
              Look through Issues to find tasks. Start a Discussion for proposals.
            </CardContent>
          </Card>
          
          <Card 
            className="step-card hover:shadow-xl transition-shadow duration-300"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <CardHeader>
              <div className="card-icon w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                <GitPullRequest className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle>3. Contribute</CardTitle>
            </CardHeader>
            <CardContent>
              Fork to a branch, implement with tests, and open a PR for review.
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="cta-container flex justify-center gap-4">
        <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="magnetic-btn cosmic-glow rounded-full px-8">
            Go to GitHub <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
