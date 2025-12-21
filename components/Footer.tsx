"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Heart } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !footerRef.current) return;

    const items = footerRef.current.querySelectorAll(".footer-item");
    
    // Simple fade in without scroll trigger for reliability
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
    );

    gsap.fromTo(
      items,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.4 }
    );
  }, { scope: footerRef, dependencies: [mounted] });

  // Link hover animation
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    if (isEnter) {
      gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: "power2.out" });
    } else {
      gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }
  };

  return (
    <footer ref={footerRef} className="w-full pt-20 pb-10" id="contact" style={{ opacity: mounted ? undefined : 1 }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="footer-item text-center md:text-left">
          <span className="font-bold text-lg flex items-center gap-2 justify-center md:justify-start">
            OpenSyntaxHQ
            <span className="text-primary">
              <Heart className="w-4 h-4 fill-current animate-pulse" />
            </span>
          </span>
          <p className="text-sm text-muted-foreground mt-2">
            Engineer-first open-source tools.
          </p>
        </div>
        
        <div className="footer-item flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
          <Link 
            href="https://github.com/OpenSyntaxHQ" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            License
          </Link>
          <Link 
            href="https://github.com/OpenSyntaxHQ/.github/blob/main/CODE_OF_CONDUCT.md" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            Code of Conduct
          </Link>
          <Link 
            href="https://github.com/OpenSyntaxHQ" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors group"
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>
        
        <div className="footer-item text-sm text-muted-foreground">
          © {new Date().getFullYear()} OpenSyntaxHQ
        </div>
      </div>
    </footer>
  );
}
