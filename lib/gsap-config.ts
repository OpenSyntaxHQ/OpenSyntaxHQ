"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Register plugins client-side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Create custom eases for cosmic effects
  CustomEase.create("cosmicIn", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1");
  CustomEase.create("cosmicOut", "M0,0 C0.175,0.885 0.32,1 1,1");
  CustomEase.create("elasticSmooth", "M0,0 C0.25,0.1 0.25,1 1,1");
  CustomEase.create("magneticPull", "M0,0 C0.65,0 0.35,1 1,1");

  // Performance defaults
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  // Configure for maximum performance
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
}

// Export configured gsap instance
export { gsap };
export { ScrollTrigger };
export { CustomEase };

// Utility functions for animations
export const animationUtils = {
  // Kill all animations on element
  killAll: (target: gsap.TweenTarget) => {
    gsap.killTweensOf(target);
  },

  // Create smooth parallax effect
  createParallax: (element: HTMLElement, strength: number = 0.1) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.6,
        ease: "magneticPull",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  },

  // Magnetic hover effect
  createMagnetic: (element: HTMLElement, strength: number = 0.3) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  },
};
