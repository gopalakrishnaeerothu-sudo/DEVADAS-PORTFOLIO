"use client";

import { useEffect } from "react";

// Loaded in this exact order, once, after React has hydrated the static markup.
const SCRIPTS = [
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
  "/js/data.js",
  "/js/main.js",
  "/js/hero.js",
];

export default function SiteScripts() {
  useEffect(() => {
    const w = window as unknown as { __mdBooted?: boolean };
    if (w.__mdBooted) return;
    w.__mdBooted = true;

    const load = (i: number) => {
      if (i >= SCRIPTS.length) return;
      const s = document.createElement("script");
      s.src = SCRIPTS[i];
      s.async = false;
      // the 3D background is optional: if the CDN fails the site still works
      s.onload = s.onerror = () => load(i + 1);
      document.body.appendChild(s);
    };
    load(0);
  }, []);

  return null;
}
