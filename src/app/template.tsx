import { ReactNode } from "react";

// PageTransition in layout.tsx handles all transitions.
// Template intentionally passes through without animation to avoid double-wrapping.
export default function Template({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
