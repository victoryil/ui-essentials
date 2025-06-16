import type { Breakpoint, Layout } from "../utils/types";

export function getAdaptiveLayout(
    breakpoints: Breakpoint[],
    width = window?.innerWidth ?? 0
): Layout {
    const bp =
        breakpoints.find((b) => width <= b.width) ??
        breakpoints[breakpoints.length - 1];
    return { columns: bp.columns, showSidebar: bp.sidebar ?? true };
}

export function onAdaptiveLayoutChange(
    breakpoints: Breakpoint[],
    cb: (layout: Layout) => void
): () => void {
    const update = () => cb(getAdaptiveLayout(breakpoints));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
}