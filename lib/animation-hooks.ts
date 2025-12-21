"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-config";

/**
 * Custom hook for scroll-triggered reveal animations
 * Returns a ref to attach to the container element
 */
export function useScrollReveal(options: {
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const {
      stagger = 0.1,
      y = 60,
      duration = 0.8,
      delay = 0,
      ease = "power3.out",
      start = "top 85%",
    } = options;

    const children = containerRef.current.querySelectorAll("[data-animate]");
    
    if (children.length === 0) return;

    // Set initial state
    gsap.set(children, { y, opacity: 0 });

    // Create scroll trigger animation
    const ctx = gsap.context(() => {
      gsap.to(children, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [options]);

  return containerRef;
}

/**
 * Hook for entrance animations (no scroll trigger)
 */
export function useEntranceAnimation(options: {
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const {
      stagger = 0.1,
      y = 40,
      duration = 0.8,
      delay = 0.2,
      ease = "power3.out",
    } = options;

    const children = containerRef.current.querySelectorAll("[data-animate]");
    
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration, delay, stagger, ease }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [options]);

  return containerRef;
}

/**
 * Hook for text reveal animation (character by character)
 */
export function useTextReveal(text: string, options: {
  duration?: number;
  stagger?: number;
  delay?: number;
} = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const { duration = 0.6, stagger = 0.02, delay = 0 } = options;
    const chars = text.split("");
    
    elementRef.current.innerHTML = chars
      .map((char) => `<span class="inline-block" style="opacity: 0">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const spans = elementRef.current.querySelectorAll("span");
    
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power2.out",
    });
  }, [text, options]);

  return elementRef;
}

/**
 * Hook for counter/number animation
 */
export function useCountUp(endValue: number, options: {
  duration?: number;
  delay?: number;
} = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const { duration = 2, delay = 0 } = options;
    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        if (elementRef.current) {
          elementRef.current.textContent = Math.round(obj.value).toString();
        }
      },
    });
  }, [endValue, options]);

  return elementRef;
}
