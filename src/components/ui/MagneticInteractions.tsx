"use client";

import { useEffect } from "react";

/**
 * Pointer-driven feedback for interactive elements. The user's system pointer
 * is never replaced or hidden. Motion only runs with a fine pointer and when
 * reduced motion is not requested.
 */
export function MagneticInteractions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const selector = "a, button, [role='button'], [data-magnetic]";
    let active: HTMLElement | null = null;
    const reset = () => {
      if (active) {
        active.style.removeProperty("--gvb-mx");
        active.style.removeProperty("--gvb-my");
        active.style.removeProperty("--gvb-light-x");
        active.style.removeProperty("--gvb-light-y");
      }
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const candidate = target.closest<HTMLElement>(selector);
      if (candidate !== active) reset();
      if (!candidate || candidate.matches("[disabled],[aria-disabled='true'],[data-no-magnetic]")) return;
      active = candidate;
      const rect = candidate.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      candidate.style.setProperty("--gvb-light-x", `${px * 100}%`);
      candidate.style.setProperty("--gvb-light-y", `${py * 100}%`);
      if (rect.width > 410 || rect.height > 190) return;
      candidate.style.setProperty("--gvb-mx", `${Math.max(-6, Math.min(6, (px - .5) * 12))}px`);
      candidate.style.setProperty("--gvb-my", `${Math.max(-5, Math.min(5, (py - .5) * 10))}px`);
    };
    const press = (event: PointerEvent) => {
      const target = event.target;
      const element = target instanceof Element ? target.closest<HTMLElement>(selector) : null;
      if (!element) return;
      element.classList.add("gvb-tactile-pressed");
      const release = () => element.classList.remove("gvb-tactile-pressed");
      window.addEventListener("pointerup", release, { once: true });
      window.addEventListener("pointercancel", release, { once: true });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("blur", reset);
    document.addEventListener("mouseleave", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("blur", reset);
      document.removeEventListener("mouseleave", reset);
    };
  }, []);

  return null;
}
