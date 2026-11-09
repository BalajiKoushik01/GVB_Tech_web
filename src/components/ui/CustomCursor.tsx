"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "idle" | "text" | "action" | "press";
const ZOOM = 1.85;
const TARGETS = "h1,h2,h3,h4,p,small,strong,em,span,li,img,[data-magnify]";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("idle");
  const [speed, setSpeed] = useState(0);
  const x = useMotionValue(-90);
  const y = useMotionValue(-90);
  const followerX = useSpring(x, { stiffness: 250, damping: 22, mass: 0.22 });
  const followerY = useSpring(y, { stiffness: 250, damping: 22, mass: 0.22 });
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("gvb-pointer-enabled");
    const lens = lensRef.current;
    let subject: Element | null = null;
    let copy: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let frame = 0;
    let previous = { x: 0, y: 0, t: 0 };
    let position = { x: 0, y: 0 };

    const clearMagnet = () => {
      if (magnet) {
        magnet.style.removeProperty("--gvb-mx");
        magnet.style.removeProperty("--gvb-my");
      }
      magnet = null;
    };
    const clearLens = () => {
      subject = null;
      copy = null;
      lens?.replaceChildren();
    };
    const refreshLens = (element: Element | null) => {
      if (subject === element) return;
      clearLens();
      if (!element || !lens) return;
      const rect = element.getBoundingClientRect();
      if (rect.width < 3 || rect.height < 3 || rect.width > 650 || rect.height > 280) return;
      if (!(element instanceof HTMLElement)) return;
      subject = element;
      const cs = getComputedStyle(element);
      const clone = element.cloneNode(true);
      if (!(clone instanceof HTMLElement)) return;
      clone.removeAttribute("id");
      clone.removeAttribute("aria-label");
      clone.removeAttribute("title");
      clone.setAttribute("aria-hidden", "true");
      clone.style.margin = "0";
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.boxSizing = "border-box";
      clone.style.font = cs.font;
      clone.style.fontFamily = cs.fontFamily;
      clone.style.fontWeight = cs.fontWeight;
      clone.style.letterSpacing = cs.letterSpacing;
      clone.style.lineHeight = cs.lineHeight;
      clone.style.textAlign = cs.textAlign;
      clone.style.color = cs.color;
      clone.style.background = cs.background;
      clone.style.padding = cs.padding;
      clone.style.borderRadius = cs.borderRadius;
      clone.style.pointerEvents = "none";
      clone.style.transform = `scale(${ZOOM})`;
      clone.style.transformOrigin = "0 0";
      clone.classList.add("gvb-optical-copy");
      lens.appendChild(clone);
      copy = clone;
    };

    const tick = () => {
      frame = 0;
      if (!copy || !subject) return;
      const rect = subject.getBoundingClientRect();
      // Center the magnified pixel under the exact mouse coordinates.
      copy.style.left = `${28 - (position.x - rect.left) * ZOOM}px`;
      copy.style.top = `${28 - (position.y - rect.top) * ZOOM}px`;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const px = event.clientX, py = event.clientY;
      x.set(px); y.set(py);
      position = { x: px, y: py };
      setVisible(true);

      const now = performance.now(), dt = Math.max(8, now - previous.t);
      const velocity = Math.hypot(px - previous.x, py - previous.y) / dt;
      if (previous.t) setSpeed(Math.min(1, velocity / 2.2));
      previous = { x: px, y: py, t: now };

      const target = event.target;
      if (!(target instanceof Element)) return;
      const actionable = target.closest<HTMLElement>("a,button,[role='button'],summary,[data-cursor='action']");
      const blocked = target.closest("input,textarea,select,iframe,[contenteditable='true'],[data-no-magnify]");
      const candidate = actionable || blocked ? null : target.closest(TARGETS);
      const good = candidate && candidate instanceof HTMLElement && candidate.getBoundingClientRect().width < 650;
      refreshLens(good ? candidate : null);
      setMode(actionable ? "action" : good ? "text" : "idle");

      if (actionable !== magnet) clearMagnet();
      if (actionable && !actionable.hasAttribute("data-no-magnetic")) {
        magnet = actionable;
        const rect = actionable.getBoundingClientRect();
        if (rect.width < 380 && rect.height < 130) {
          const dx = (px - rect.left - rect.width / 2) / Math.max(rect.width, 1);
          const dy = (py - rect.top - rect.height / 2) / Math.max(rect.height, 1);
          actionable.style.setProperty("--gvb-mx", `${Math.max(-6, Math.min(6, dx * 10))}px`);
          actionable.style.setProperty("--gvb-my", `${Math.max(-5, Math.min(5, dy * 8))}px`);
        }
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const down = () => setMode("press");
    const up = (event: PointerEvent) => onMove(event);
    const hide = () => { setVisible(false); clearMagnet(); clearLens(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("blur", hide);
    document.addEventListener("mouseleave", hide);
    return () => {
      document.documentElement.classList.remove("gvb-pointer-enabled");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseleave", hide);
      if (frame) cancelAnimationFrame(frame);
      clearMagnet();
      clearLens();
    };
  }, [x, y]);

  return <div className={`gvb-cursor-v3 ${enabled && visible ? "is-visible" : ""} mode-${mode}`} aria-hidden="true">
    <motion.span className="gvb-cursor-satellite" style={{ x: followerX, y: followerY }}
      animate={{ scale: mode === "action" ? 1.25 : speed > .4 ? 1.3 : 1, opacity: visible ? .8 : 0 }} />
    <motion.div className="gvb-cursor-core" style={{ x, y }}
      animate={{ width: mode === "text" ? 56 : mode === "action" ? 43 : mode === "press" ? 19 : 13,
        height: mode === "text" ? 56 : mode === "action" ? 43 : mode === "press" ? 19 : 13,
        borderRadius: "50%",
        scaleX: speed > .32 && mode === "idle" ? 1.4 : 1,
        rotate: mode === "action" ? 12 : 0 }}
      transition={{ type: "spring", stiffness: 550, damping: 28, mass: .4 }}>
      <div className="gvb-cursor-optic" ref={lensRef} />
      <span className="gvb-cursor-glint" />
      {mode === "action" && <span className="gvb-cursor-action-label">↗</span>}
    </motion.div>
    <motion.span className="gvb-cursor-center" style={{ x, y }} animate={{ opacity: mode === "idle" ? 0 : .8 }} />
  </div>;
}
