"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MessageSquare, GitPullRequest } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MissionPage() {
  return (
    <div className="pt-24 pb-40 px-6 max-w-5xl mx-auto min-h-dvh">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Our Mission</h1>
      
      <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
        OpenSyntaxHQ is an engineer-first open-source organization focused on building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
           <h2 className="text-2xl font-semibold mb-4 text-primary">We Value</h2>
           <ul className="space-y-3 text-lg">
             <li className="flex items-center gap-2">✅ Clarity over cleverness</li>
             <li className="flex items-center gap-2">✅ Composability over monoliths</li>
             <li className="flex items-center gap-2">✅ Pragmatic engineering</li>
             <li className="flex items-center gap-2">✅ Respectful collaboration</li>
           </ul>
        </div>
        
        <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
           <h3 className="font-mono text-sm text-muted-foreground mb-2">CONTRIBUTION_WORKFLOW.md</h3>
           <p className="mb-4">Contributors are welcome from everywhere. We build together, review together, and keep the project usable for real teams.</p>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8">How to get started</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
               <BookOpen className="w-8 h-8 text-blue-500 mb-2"/>
               <CardTitle>1. Read Docs</CardTitle>
            </CardHeader>
            <CardContent>
                Read <code>CONTRIBUTING.md</code> and <code>CODE_OF_CONDUCT.md</code> to understand our workflow.
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
               <MessageSquare className="w-8 h-8 text-green-500 mb-2"/>
               <CardTitle>2. Discuss</CardTitle>
            </CardHeader>
            <CardContent>
               Look through Issues to find tasks. Start a Discussion for proposals.
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
               <GitPullRequest className="w-8 h-8 text-purple-500 mb-2"/>
               <CardTitle>3. Contribute</CardTitle>
            </CardHeader>
            <CardContent>
               Fork to a branch, implement with tests, and open a PR for review.
            </CardContent>
          </Card>
      </div>

      <div className="flex justify-center gap-4">
         <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer">
            <Button size="lg">
                Go to GitHub <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
         </Link>
      </div>
    </div>
  );
}
