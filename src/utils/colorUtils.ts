// src/utils/colorUtils.ts
// --------------------------------------------------
// Utilidades de color compartidas por toda la librería
// --------------------------------------------------

/** Representación RGB simple (0-255) */
export type RGB = { r: number; g: number; b: number };

/* ---------- Conversión y parsing ---------- */

/** Convierte #hex (3 o 6 dígitos) a RGB */
export function hexToRgb(hex: string): RGB | null {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
    const m = full.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

/** Convierte RGB a #hex de 6 dígitos */
export function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
    const toHex = (v: number) =>
        Math.round(Math.max(0, Math.min(255, v)))    // ← redondeo seguro
            .toString(16)
            .padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Convierte HSL (0-360, 0-1, 0-1) a RGB */
export function hslToRgb(h: number, s: number, l: number): RGB {
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
}

/**
 * Parseo flexible de color CSS (#hex, rgb(), hsl()) → RGB
 * Devuelve null si el formato no es reconocible.
 */
export function parseCSSColor(input: string): RGB | null {
    if (input.startsWith("#")) return hexToRgb(input);

    if (input.startsWith("rgb")) {
        const m = input.match(/\d+/g);
        return m ? { r: +m[0], g: +m[1], b: +m[2] } : null;
    }

    if (input.startsWith("hsl")) {
        const m = input.match(/\d+/g);
        if (!m) return null;
        const [h, s, l] = m.map(Number);
        return hslToRgb(h, s / 100, l / 100);
    }

    return null;
}

/* ---------- Operaciones ---------- */

/** Luminancia relativa (0-1) según fórmula ITU-R BT.601 */
export function getLuminance({ r, g, b }: RGB): number {
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/** Mezcla lineal de dos colores RGB con `weight` (0-1) hacia `c2` */
export function mixColors(c1: RGB, c2: RGB, weight: number): RGB {
    return {
        r: Math.round(c1.r * (1 - weight) + c2.r * weight),
        g: Math.round(c1.g * (1 - weight) + c2.g * weight),
        b: Math.round(c1.b * (1 - weight) + c2.b * weight)
    };
}

/* ---------- Helpers adicionales para temas ---------- */

/** Rota el tono `h` (0-360) en grados positivos/negativos */
export function rotateHue(h: number, deg: number): number {
    const r = (h + deg) % 360;
    return r < 0 ? r + 360 : r;
}

/** Ajusta saturación y luminosidad de un HSL */
export function tweakHsl(
    [h, s, l]: [number, number, number],
    ds = 0,
    dl = 0
): [number, number, number] {
    return [h, Math.max(0, Math.min(1, s + ds)), Math.max(0, Math.min(1, l + dl))];
}