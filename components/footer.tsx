"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);

      return () => clearTimeout(timer);
    }, 2800);
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="border-t border-dashed py-6">
      <div className="container mx-auto text-sm text-muted-foreground text-center">
        @ {new Date().getFullYear()} Your Company. All rights reserverd.
      </div>
    </footer>
  );
}
