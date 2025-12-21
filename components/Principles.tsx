"use client";
import React, { useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { Hammer, Blocks, BookOpen, Heart, Leaf, Zap } from "lucide-react";

gsap.registerPlugin(useGSAP);

const content = [
  {
    title: "Pragmatic",
    description:
      "We prefer solutions that solve real problems over theoretical purity. Our tools are designed for the trenches, helping engineers ship value faster without unnecessary complexity.",
    icon: <Hammer className="w-10 h-10 text-cyan-500" />,
    color: "cyan",
  },
  {
    title: "Composable",
    description:
      "Small, well-scoped modules that work together. We avoid monoliths in favor of flexible, independent components that can be combined to fit your specific needs.",
    icon: <Blocks className="w-10 h-10 text-violet-500" />,
    color: "violet",
  },
  {
    title: "Documented",
    description:
      "Every project ships a short README and usage examples. We believe that if it isn't documented, it doesn't exist. Clarity is our priority.",
    icon: <BookOpen className="w-10 h-10 text-orange-500" />,
    color: "orange",
  },
  {
    title: "Respectful",
    description:
      "Critique code, not people. We foster a community where feedback is constructive and kindness is the norm. Everyone is welcome to contribute.",
    icon: <Heart className="w-10 h-10 text-pink-500" />,
    color: "pink",
  },
  {
    title: "Sustainable",
    description:
      "Avoid long-lived one-off designs; prefer maintainability. We build software that lasts, with a focus on long-term health and ease of maintenance.",
    icon: <Leaf className="w-10 h-10 text-emerald-500" />,
    color: "emerald",
  },
  {
    title: "Performant",
    description:
      "Speed is a feature. We optimize for low overhead and fast execution, ensuring our tools never become the bottleneck in your workflow.",
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    color: "yellow",
  },
];

export function Principles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Get elements
    const h2 = headerRef.current?.querySelector("h2");
    const headerP = headerRef.current?.querySelector("p");
    const cards = cardsRef.current?.querySelectorAll(".principle-card");
    const icons = cardsRef.current?.querySelectorAll(".principle-icon");

    // Set initial states immediately to prevent flash
    gsap.set([h2, headerP].filter(Boolean), { y: 40, opacity: 0 });
    if (cards && cards.length > 0) gsap.set(cards, { y: 60, opacity: 0, scale: 0.9 });
    if (icons && icons.length > 0) gsap.set(icons, { scale: 0, rotation: -180 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header with split effect
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
        duration: 0.7,
      }, "-=0.5");
    }

    // Cards with wave stagger effect
    if (cards && cards.length > 0) {
      tl.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
          grid: [2, 3],
          ease: "power2.out",
        },
        ease: "back.out(1.4)",
      }, "-=0.3");

      // Animate icons separately with bounce
      if (icons && icons.length > 0) {
        tl.to(icons, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(2)",
        }, "-=0.8");
      }
    }

  }, { scope: containerRef });

  // Card hover animation
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".principle-icon");
    const iconBg = card.querySelector(".icon-bg");
    
    if (isEnter) {
      gsap.to(card, { 
        y: -12, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.4, 
        ease: "power2.out" 
      });
      gsap.to(icon, { 
        scale: 1.15, 
        rotation: 15, 
        duration: 0.4, 
        ease: "back.out(2)" 
      });
      gsap.to(iconBg, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(card, { 
        y: 0, 
        scale: 1,
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(icon, { 
        scale: 1, 
        rotation: 0, 
        duration: 0.3 
      });
      gsap.to(iconBg, {
        scale: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 glitch-text" data-text="Our Principles">
            Our Principles
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            These core values guide every line of code we write and every tool we build.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => (
            <div 
              key={index}
              className="principle-card group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors duration-300 cursor-pointer overflow-hidden"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-linear-to-br from-${item.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="icon-bg mb-6 p-4 rounded-full bg-muted w-fit border border-border group-hover:border-primary/50 transition-colors">
                  <div className="principle-icon">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-${item.color}-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
