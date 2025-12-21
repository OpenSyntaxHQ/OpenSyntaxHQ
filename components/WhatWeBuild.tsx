"use client";
import React, { useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Button } from "@/components/ui/moving-border";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Wrench, Server, LayoutTemplate, FlaskConical, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function WhatWeBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      title: "Libraries & Tooling",
      description: "CLI, SDKs, Linters for developer workflows.",
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
      gradient: "from-blue-500/20 to-cyan-500/10",
    },
    {
      title: "Infrastructure Utilities",
      description: "Small, focused deploy and monitoring helpers.",
      icon: <Server className="w-8 h-8 text-green-500" />,
      gradient: "from-green-500/20 to-emerald-500/10",
    },
    {
      title: "Reference Architectures",
      description: "Patterns, templates, and starter repos.",
      icon: <LayoutTemplate className="w-8 h-8 text-purple-500" />,
      gradient: "from-purple-500/20 to-violet-500/10",
    },
    {
      title: "Experiment Repositories",
      description: "New ideas that can graduate to maintained projects.",
      icon: <FlaskConical className="w-8 h-8 text-orange-500" />,
      gradient: "from-orange-500/20 to-amber-500/10",
    },
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    // Get elements
    const h2 = headerRef.current?.querySelector("h2");
    const headerP = headerRef.current?.querySelector("p");
    const cards = cardsRef.current?.querySelectorAll(".build-card");
    const icons = cardsRef.current?.querySelectorAll(".card-icon-wrapper");

    // Set initial states immediately to prevent flash
    gsap.set([h2, headerP].filter(Boolean), { y: 40, opacity: 0 });
    if (headerP) gsap.set(headerP, { filter: "blur(10px)" });
    if (cards && cards.length > 0) gsap.set(cards, { y: 60, opacity: 0 });
    if (icons && icons.length > 0) gsap.set(icons, { scale: 0, rotation: -45 });
    gsap.set(".cta-wrapper", { y: 40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header entrance with typewriter feel
    if (h2) {
      tl.to(h2, {
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
        filter: "blur(0px)",
        duration: 0.8,
      }, "-=0.5");
    }

    // Cards entrance with stagger from different directions
    if (cards && cards.length > 0) {
      tl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: {
          amount: 0.4,
          from: "edges",
        },
        ease: "power3.out",
      }, "-=0.4");

      // Icon pop-in
      if (icons && icons.length > 0) {
        tl.to(icons, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2)",
        }, "-=0.6");
      }
    }

    // CTA button
    tl.to(".cta-wrapper", {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.7)",
    }, "-=0.3");

  }, { scope: containerRef });

  // Card hover animation with 3D tilt
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".card-icon-wrapper");
    const arrow = card.querySelector(".hover-arrow");
    
    if (isEnter) {
      gsap.to(card, { 
        y: -10, 
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.2)",
        duration: 0.4, 
        ease: "power2.out" 
      });
      gsap.to(icon, { 
        scale: 1.1, 
        y: -5,
        duration: 0.4, 
        ease: "back.out(2)" 
      });
      gsap.to(arrow, {
        x: 5,
        y: -5,
        opacity: 1,
        duration: 0.3,
      });
    } else {
      gsap.to(card, { 
        y: 0, 
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(icon, { 
        scale: 1, 
        y: 0,
        duration: 0.3 
      });
      gsap.to(arrow, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.2,
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 glitch-text" data-text="What We Build">
            What We Build
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Practical tools and references for real teams.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {items.map((item, index) => (
            <Card 
              key={index} 
              className={`build-card relative bg-background/50 backdrop-blur-xs border-zinc-200 dark:border-zinc-800 hover:border-primary/50 transition-colors duration-300 cursor-pointer overflow-hidden group`}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardHeader className="relative z-10">
                <div className="card-icon-wrapper mb-4 p-3 rounded-xl bg-muted/50 w-fit border border-border/50 group-hover:border-primary/30 transition-colors">
                  {item.icon}
                </div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {item.title}
                  <ArrowUpRight className="hover-arrow w-4 h-4 opacity-0 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardContent>

              {/* Decorative glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Card>
          ))}
        </div>
        
        <div className="cta-wrapper mt-8 flex justify-center">
          <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer">
            <Button
              borderRadius="1.75rem"
              containerClassName="h-12 w-auto cursor-pointer"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-semibold px-8"
            >
              Explore Repositories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
