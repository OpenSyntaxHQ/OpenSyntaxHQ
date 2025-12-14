"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { OpenSyntaxLogo } from "@/components/icons/OpenSyntaxLogo";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
     { name: "Mission", href: "/mission" },
     { name: "What we build", href: "/build" },
     { name: "Principles", href: "/principles" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled || isOpen
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <OpenSyntaxLogo className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl tracking-tight text-foreground">
            OpenSyntax<span className="text-primary">HQ</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors relative",
                pathname === link.href ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary animate-in fade-in zoom-in duration-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer">
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="/mission">
             <Button variant="default" size="sm" className="hidden sm:inline-flex cursor-pointer">
              Contribute
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-background border-b border-border overflow-hidden"
            >
                <div className="px-6 py-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-base font-medium transition-colors p-2 rounded-md hover:bg-muted",
                                pathname === link.href ? "text-foreground bg-muted" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-4 pt-2">
                        <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                            <GithubIcon className="h-5 w-5" />
                            <span>GitHub</span>
                        </Link>
                    </div>
                     <Link href="/mission" onClick={() => setIsOpen(false)}>
                        <Button variant="default" className="w-full mt-4 cursor-pointer">
                            Contribute
                        </Button>
                    </Link>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
