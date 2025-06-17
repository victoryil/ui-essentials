import {getLuminance, parseCSSColor} from "../utils/colorUtils";


/** Returns '#000' or '#fff' for best contrast (WCAG AA ~ 4.5:1) */
export function getReadableTextColor(bg: string): '#000' | '#fff' {
    const rgb = parseCSSColor(bg);
    if (!rgb) return '#000';
    return getLuminance(rgb) > 0.5 ? '#000' : '#fff';
}