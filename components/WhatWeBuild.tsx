"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/moving-border";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Wrench, Server, LayoutTemplate, FlaskConical } from "lucide-react";

export function WhatWeBuild() {
  const items = [
    {
      title: "Libraries & Tooling",
      description: "CLI, SDKs, Linters for developer workflows.",
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Infrastructure Utilities",
      description: "Small, focused deploy and monitoring helpers.",
      icon: <Server className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Reference Architectures",
      description: "Patterns, templates, and starter repos.",
      icon: <LayoutTemplate className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Experiment Repositories",
      description: "New ideas that can graduate to maintained projects.",
      icon: <FlaskConical className="w-8 h-8 text-orange-500" />,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Build</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Practical tools and references for real teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {items.map((item, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-xs border-zinc-200 dark:border-zinc-800 hover:border-primary/50 transition-colors duration-300 cursor-pointer">
              <CardHeader>
                <div className="mb-4">{item.icon}</div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-0 flex justify-center">
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
