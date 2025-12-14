"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <Terminal className="w-3 h-3" />
           <span>Engineer-first Open Source</span>
        </div>
        
        <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20 tracking-tight">
          OpenSyntaxHQ
        </h1>
        
        <div className="text-zinc-400 md:text-xl text-base max-w-2xl mx-auto relative z-20">
             <TextGenerateEffect 
                words="Building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain."
                className="text-zinc-400 font-normal"
             />
        </div>

        <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards opacity-0" style={{ animationDelay: "1.5s" }}>
          <Link href="/build">
            <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium">
              See what we build
            </Button>
          </Link>
          <Link href="/mission">
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-medium bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white">
              How to start <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
