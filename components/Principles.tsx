"use client";
import React from "react";
import { Hammer, Blocks, BookOpen, Heart, Leaf, Zap } from "lucide-react";

const content = [
  {
    title: "Pragmatic",
    description:
      "We prefer solutions that solve real problems over theoretical purity. Our tools are designed for the trenches, helping engineers ship value faster without unnecessary complexity.",
    icon: <Hammer className="w-10 h-10 text-cyan-500" />,
  },
  {
    title: "Composable",
    description:
      "Small, well-scoped modules that work together. We avoid monoliths in favor of flexible, independent components that can be combined to fit your specific needs.",
    icon: <Blocks className="w-10 h-10 text-violet-500" />,
  },
  {
    title: "Documented",
    description:
      "Every project ships a short README and usage examples. We believe that if it isn't documented, it doesn't exist. Clarity is our priority.",
    icon: <BookOpen className="w-10 h-10 text-orange-500" />,
  },
  {
    title: "Respectful",
    description:
      "Critique code, not people. We foster a community where feedback is constructive and kindness is the norm. Everyone is welcome to contribute.",
    icon: <Heart className="w-10 h-10 text-pink-500" />,
  },
  {
    title: "Sustainable",
    description:
      "Avoid long-lived one-off designs; prefer maintainability. We build software that lasts, with a focus on long-term health and ease of maintenance.",
    icon: <Leaf className="w-10 h-10 text-emerald-500" />,
  },
  {
    title: "Performant",
    description:
      "Speed is a feature. We optimize for low overhead and fast execution, ensuring our tools never become the bottleneck in your workflow.",
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
  },
];

export function Principles() {
  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Principles</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            These core values guide every line of code we write and every tool we build.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => (
            <div 
              key={index} 
              className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className="mb-6 p-4 rounded-full bg-zinc-950/50 w-fit border border-zinc-800/50 group-hover:border-zinc-700/50 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
