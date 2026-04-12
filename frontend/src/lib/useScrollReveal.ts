"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type RevealOptions = {
  threshold?: number;
  once?: boolean;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}

// For staggered children animations
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: RevealOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 80, ...revealOptions } = options;
  const { ref, isVisible } = useScrollReveal<T>(revealOptions);

  const getStaggerStyle = useCallback(
    (index: number): React.CSSProperties => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 500ms ease-out ${index * staggerDelay}ms, transform 500ms ease-out ${index * staggerDelay}ms`,
    }),
    [isVisible, staggerDelay]
  );

  return { ref, isVisible, getStaggerStyle };
}
