"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ZOOM = 1.7;
const magnifiable = "h1,h2,h3,h4,p,span,strong,small,a,button,img,svg,li,[data-magnify]";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [hasSubject, setHasSubject] = useState(false);
  const [pressing, setPressing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastSubject = useRef<Element | null>(null);
  const position = useRef({ x: 0, y: 0 });
  const pointX = useMotionValue(-100);
  const pointY = useMotionValue(-100);
  const trailX = useSpring(pointX, { stiffness: 290, damping: 27, mass: 0.35 });
  const trailY = useSpring(pointY, { stiffness: 290, damping: 27, mass: 0.35 });

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointer.matches || reduced.matches) return;

    document.documentElement.classList.add("gvb-pointer-enabled");

    const lensContent = contentRef.current;
    let lastInteractive = false;
    let lastHasSubject = false;
    let frame = 0;
    let clone: HTMLElement | null = null;
    let current: Element | null = null;

    const update = () => {
      frame = 0;
      if (!lensContent || !current) return;
      const rect = current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = position.current.x;
      const y = position.current.y;
      // The lens is centered on the actual pointer. Matching the target
      // element's rect preserves the magnified position beneath the lens.
      if (clone) {
        clone.style.left = `${36 - (x - rect.left) * ZOOM}px`;
        clone.style.top = `${36 - (y - rect.top) * ZOOM}px`;
      }
    };

    const renderSubject = (subject: Element | null) => {
      if (!lensContent) return;
      lensContent.replaceChildren();
      clone = null;
      current = subject;
      lastSubject.current = subject;
      if (!subject) return;

      const rect = subject.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.width > 1300) return;
      const source = subject instanceof HTMLImageElement ? subject : subject;
      const copy = source.cloneNode(true);
      if (!(copy instanceof HTMLElement || copy instanceof SVGElement)) return;
      // A visual clone is inert, excluded from accessibility, and never inserted
      // into the interactive document flow.
      const wrapper = document.createElement("div");
      wrapper.setAttribute("aria-hidden", "true");
      wrapper.className = "gvb-lens-duplicate";
      wrapper.style.width = `${rect.width}px`;
      wrapper.style.height = `${rect.height}px`;
      const computed = getComputedStyle(subject);
      wrapper.style.color = computed.color;
      wrapper.style.font = computed.font;
      wrapper.style.lineHeight = computed.lineHeight;
      wrapper.style.letterSpacing = computed.letterSpacing;
      wrapper.style.textAlign = computed.textAlign;
      wrapper.style.whiteSpace = computed.whiteSpace;
      wrapper.style.backgroundColor = computed.backgroundColor;
      wrapper.style.borderRadius = computed.borderRadius;
      wrapper.style.padding = computed.padding;
      wrapper.style.boxSizing = "border-box";
      wrapper.style.transform = `scale(${ZOOM})`;
      wrapper.style.transformOrigin = "top left";
      if (copy instanceof HTMLElement) {
        copy.removeAttribute("id");
        copy.style.pointerEvents = "none";
        copy.style.margin = "0";
        copy.style.width = "100%";
        copy.style.height = "100%";
        if (copy instanceof HTMLImageElement) {
          copy.style.objectFit = computed.objectFit;
        }
      } else {
        copy.removeAttribute("id");
        copy.style.pointerEvents = "none";
        copy.style.width = "100%";
        copy.style.height = "100%";
      }
      wrapper.appendChild(copy);
      lensContent.appendChild(wrapper);
      clone = wrapper;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointX.set(event.clientX);
      pointY.set(event.clientY);
      position.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      const target = event.target;
      if (!(target instanceof Element)) return;
      const clickable = Boolean(target.closest("a,button,[role='button'],input,select,textarea,summary,[data-cursor]"));
      if (clickable !== lastInteractive) {
        lastInteractive = clickable;
        setInteractive(clickable);
      }
      // Avoid cloning controls, giant containers, or embedded documents.
      const excluded = target.closest("input,textarea,select,iframe,[contenteditable='true'],[data-no-magnify]");
      const subject = excluded ? null : target.closest(magnifiable);
      const valid = Boolean(subject && subject.getBoundingClientRect().width < 750);
      const next = valid ? subject : null;
      if (next !== lastSubject.current) renderSubject(next);
      if (valid !== lastHasSubject) {
        lastHasSubject = valid;
        setHasSubject(valid);
      }
      if (!frame) frame = requestAnimationFrame(update);
    };

    const down = () => setPressing(true);
    const up = () => setPressing(false);
    const hide = () => setVisible(false);
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
      if (lensContent) lensContent.replaceChildren();
    };
  }, [pointX, pointY]);

  return <div className={`gvb-cursor-layer ${visible ? "is-visible" : ""}`} aria-hidden="true">
    <motion.div className="gvb-cursor-aura" style={{ x: trailX, y: trailY }}
      animate={{ scale: pressing ? .7 : interactive ? 1.15 : 1, opacity: visible ? .65 : 0 }} />
    <motion.div className={`gvb-cursor-glass ${hasSubject ? "has-subject" : ""}`}
      style={{ x: pointX, y: pointY }}
      animate={{ scale: pressing ? .86 : interactive ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 430, damping: 24 }}>
      <div className="gvb-cursor-magnified" ref={contentRef} />
      <span className="gvb-cursor-reflection" />
    </motion.div>
    <motion.span className="gvb-cursor-pin" style={{ x: pointX, y: pointY }} />
  </div>;
}
