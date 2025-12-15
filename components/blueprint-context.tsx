"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface BlueprintContextType {
  isBlueprintMode: boolean;
  toggleBlueprintMode: () => void;
  logs: string[];
  addLog: (log: string) => void;
  clearLogs: () => void;
}

const BlueprintContext = createContext<BlueprintContextType | undefined>(
  undefined
);

export function BlueprintProvider({ children }: { children: React.ReactNode }) {
  const [isBlueprintMode, setIsBlueprintMode] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

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
    setIsBlueprintMode((prev) => {
      const newVal = !prev;
      return newVal;
    });
  }, []);

  // Effect to log mode changes
  useEffect(() => {
    // Timeout prevents set-state-in-effect warning
    const timer = setTimeout(() => {
        addLog(`System state changed: Blueprint Mode ${isBlueprintMode ? "ENABLED" : "DISABLED"}`);
    }, 0);
    return () => clearTimeout(timer);
  }, [isBlueprintMode, addLog]);

  // Log initialization
  useEffect(() => {
     const timer = setTimeout(() => {
        addLog("OpenSyntaxHQ System Initialized...");
        addLog("Loading modules... [OK]");
     }, 100);
     return () => clearTimeout(timer);
  }, [addLog]);

  // Toggle body class
  useEffect(() => {
    if (isBlueprintMode) {
      document.body.classList.add("blueprint-mode");
    } else {
      document.body.classList.remove("blueprint-mode");
    }
  }, [isBlueprintMode]);

  return (
    <BlueprintContext.Provider
      value={{
        isBlueprintMode,
        toggleBlueprintMode,
        logs,
        addLog,
        clearLogs,
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
