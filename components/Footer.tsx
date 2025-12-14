import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";

export function Footer() {
  return (
    <footer className="py-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-bold text-lg">OpenSyntaxHQ</span>
          <p className="text-sm text-muted-foreground mt-2">
            Engineer-first open-source tools.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
           <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">License</Link>
           <Link href="https://github.com/OpenSyntaxHQ/.github/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Code of Conduct</Link>
           <Link href="https://github.com/OpenSyntaxHQ" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
             <GithubIcon className="w-5 h-5" />
           </Link>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} OpenSyntaxHQ
        </div>
      </div>
    </footer>
  );
}
