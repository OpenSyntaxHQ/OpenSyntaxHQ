"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface BlueprintContextType {
  isBlueprintMode: boolean;
  toggleBlueprintMode: () => void;
  logs: string[];
  addLog: (message: string) => void;
  clearLogs: () => void;
  entropy: number;
  fixEntropy: () => void;
}

const BlueprintContext = createContext<BlueprintContextType | undefined>(
  undefined
);

export function BlueprintProvider({ children }: { children: React.ReactNode }) {
  const [isBlueprintMode, setIsBlueprintMode] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [entropy, setEntropy] = useState(0);

  const addLog = useCallback((log: string) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLogs((prev) => [...prev.slice(-49), `[${timestamp}] ${log}`]);
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);

  const toggleBlueprintMode = useCallback(() => {
    setIsBlueprintMode((prev) => !prev);
  }, []);

  const fixEntropy = useCallback(() => {
    setEntropy(0);
    addLog("System entropy reset. Codebase refactored.");
    document.documentElement.style.setProperty("--entropy-rot", "0deg");
    document.documentElement.style.setProperty("--entropy-x", "0px");
    document.documentElement.style.setProperty("--entropy-y", "0px");
    document.documentElement.style.setProperty("--entropy-blur", "0px");
  }, [addLog]);

  useEffect(() => {
    if (entropy > 0) {
      const rot = (Math.random() - 0.5) * (entropy / 20); 
      const x = (Math.random() - 0.5) * (entropy / 2);   
      const y = (Math.random() - 0.5) * (entropy / 2);
      const blur = entropy > 50 ? (entropy - 50) / 35 : 0; 

      document.documentElement.style.setProperty("--entropy-rot", `${rot}deg`);
      document.documentElement.style.setProperty("--entropy-x", `${x}px`);
      document.documentElement.style.setProperty("--entropy-y", `${y}px`);
      document.documentElement.style.setProperty("--entropy-blur", `${blur}px`);
    } else {
      document.documentElement.style.setProperty("--entropy-rot", "0deg");
      document.documentElement.style.setProperty("--entropy-x", "0px");
      document.documentElement.style.setProperty("--entropy-y", "0px");
      document.documentElement.style.setProperty("--entropy-blur", "0px");
    }
  }, [entropy]);



  useEffect(() => {
    const interval = setInterval(() => {
      setEntropy((prev) => {
        const next = Math.min(prev + 1, 100);
        return next;
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    if (entropy > 0 && entropy % 10 === 0) {
      const timer = setTimeout(() => {
        addLog(`[SYSTEM] Entropy Critical: ${entropy}% visual degradation imminent.`);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [entropy, addLog]);



  useEffect(() => {
    setTimeout(() => {
      addLog("OpenSyntaxHQ System Initialized...");
      addLog("Loading modules... [OK]");
    }, 500);
  }, []); 

  useEffect(() => {
    if (isBlueprintMode) {
      document.body.classList.add("blueprint-mode");
      setTimeout(() => addLog("System state changed: Blueprint Mode ENABLED"), 0);
    } else {
      document.body.classList.remove("blueprint-mode");
      setTimeout(() => addLog("System state changed: Blueprint Mode DISABLED"), 0);
    }
  }, [isBlueprintMode, addLog]);

  return (
    <BlueprintContext.Provider
      value={{
        isBlueprintMode,
        toggleBlueprintMode,
        logs,
        addLog,
        clearLogs,
        entropy,
        fixEntropy,
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
}

export function useBlueprint() {
  const context = useContext(BlueprintContext);
  if (context === undefined) {
    throw new Error("useBlueprint must be used within a BlueprintProvider");
  }
  return context;
}
