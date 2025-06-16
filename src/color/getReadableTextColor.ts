import { parseCSSColor, getLuminance } from "../utils/colorUtils";

export function getReadableTextColor(color: string): "#000" | "#fff" {
    const rgb = parseCSSColor(color);
    if (!rgb) return "#000";
    return getLuminance(rgb) > 0.55 ? "#000" : "#fff"; // umbral 0 · 55 ≈ AA
}