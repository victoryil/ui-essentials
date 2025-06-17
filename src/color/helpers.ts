// PUBLIC COLOR HELPERS
import {
    hexToRgb,
    rgbToHex,
    getLuminance,
    rotateHue as _rotateHue,
    mixColors as _mixColors
} from '../utils/colorUtils';

/**
 * Darkens or lightens a color by a given percentage.
 * Positive values lighten, negative values darken.
 */
export function shadeColor(hex: string, percent: number): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const factor = percent / 100;
    const newRgb = {
        r: rgb.r + (255 - rgb.r) * factor,
        g: rgb.g + (255 - rgb.g) * factor,
        b: rgb.b + (255 - rgb.b) * factor
    };
    return rgbToHex(newRgb);
}

/** True if the colour is perceived as dark (WCAG threshold ≈ 0.5) */
export function isDarkColor(hex: string): boolean {
    const rgb = hexToRgb(hex);
    return rgb ? getLuminance(rgb) < 0.5 : false;
}

/** Linear mix of two HEX colours (weight 0–1 toward second) */
export function mixColorsHex(c1: string, c2: string, weight = 0.5): string {
    const rgb1 = hexToRgb(c1);
    const rgb2 = hexToRgb(c2);
    if (!rgb1 || !rgb2) return c1;
    return rgbToHex(_mixColors(rgb1, rgb2, weight));
}

/** Rotates only the HUE component of an HSL colour string (#hex not supported) */
export const rotateHue = _rotateHue;