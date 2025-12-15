"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, ChevronUp, ChevronDown } from "lucide-react";
import { useBlueprint } from "@/components/blueprint-context";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function NeuralTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { logs, addLog, clearLogs, toggleBlueprintMode, isBlueprintMode } =
    useBlueprint();
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme } = useTheme();

  // Scroll to bottom of logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  // Scroll listener for "System Logs"
  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 500) {
        addLog(`User scrolled to Y:${Math.round(currentScrollY)}`);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [addLog]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    addLog(`$ ${cmd}`);
    setInput("");

    switch (cmd) {
      case "help":
        addLog("Available commands:");
        addLog("  blueprint - Toggle site blueprint mode");
        addLog("  clear     - Clear terminal logs");
        addLog("  theme     - Toggle light/dark theme");
        addLog("  repo      - Open GitHub repository");
        break;
      case "blueprint":
        toggleBlueprintMode();
        break;
      case "clear":
        clearLogs();
        break;
      case "theme":
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        addLog(`Theme toggled to ${resolvedTheme === "dark" ? "light" : "dark"}.`);
        break;
      case "repo":
        window.open("https://github.com/OpenSyntaxHQ", "_blank");
        addLog("Opening GitHub...");
        break;
      default:
        addLog(`Unknown command: ${cmd}. Type 'help' for options.`);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full z-50 font-mono text-sm transition-all duration-300",
        isOpen ? "h-64" : "h-10"
      )}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md border-t border-white/10 shadow-2xl flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 h-10 bg-black/40 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal size={14} />
            <span className="text-xs font-semibold tracking-wider">
              {isBlueprintMode ? "BLUEPRINT_MODE_ACTIVE" : "NEURAL_TERMINAL"}
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-2" />
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-4 overflow-hidden"
            >
              {/* Logs Area */}
              <div 
                ref={logsContainerRef}
                className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pr-2"
              >
                {logs.map((log, i) => (
                  <div key={i} className="text-zinc-300 break-all font-mono text-xs">
                     <span className="text-zinc-600 mr-2">{">"}</span>
                     {log}
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-white/5 pt-2">
                <span className="text-green-500 animate-pulse">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type 'help' for commands..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-600 font-mono text-sm"
                  autoFocus
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
