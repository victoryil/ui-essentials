// src/utils/colorLCHUtils.ts
// --------------------------------------------------
// Utilities for working with the perceptual LCH colour space **without** duplicating
// helpers that already exist in src/utils/colorUtils.ts.
// We only add the conversions that do not exist yet and reuse shared helpers such
// as hexToRgb, rgbToHex and rotateHue (hue-only) from colourUtils.
// --------------------------------------------------

import { hexToRgb, rgbToHex, rotateHue as rotateHueHue } from './colorUtils';

export type LCH = { l: number; c: number; h: number };

/* ---------- RGB ↔︎ XYZ ---------- */
function rgbToXyz({ r, g, b }: { r: number; g: number; b: number }) {
    const lin = (v: number) => {
        v = v / 255;
        return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
    };
    r = lin(r);
    g = lin(g);
    b = lin(b);
    return {
        x: r * 0.4124 + g * 0.3576 + b * 0.1805,
        y: r * 0.2126 + g * 0.7152 + b * 0.0722,
        z: r * 0.0193 + g * 0.1192 + b * 0.9505
    };
}

function xyzToRgb({ x, y, z }: { x: number; y: number; z: number }) {
    let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let b = x * 0.0557 + y * -0.2040 + z * 1.0570;
    const gam = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
    return { r: gam(r) * 255, g: gam(g) * 255, b: gam(b) * 255 };
}

/* ---------- XYZ ↔︎ LAB ---------- */
function xyzToLab({ x, y, z }: { x: number; y: number; z: number }) {
    const refX = 0.95047, refY = 1.0, refZ = 1.08883;
    const f = (v: number) => (v > 0.008856 ? Math.cbrt(v) : (7.787 * v) + 16 / 116);
    const fx = f(x / refX);
    const fy = f(y / refY);
    const fz = f(z / refZ);
    return {
        l: 116 * fy - 16,
        a: 500 * (fx - fy),
        b: 200 * (fy - fz)
    };
}

function labToXyz({ l, a, b }: { l: number; a: number; b: number }) {
    const refX = 0.95047, refY = 1.0, refZ = 1.08883;
    const fy = (l + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;
    const finv = (v: number) => {
        const v3 = v ** 3;
        return v3 > 0.008856 ? v3 : (v - 16 / 116) / 7.787;
    };
    return {
        x: refX * finv(fx),
        y: refY * finv(fy),
        z: refZ * finv(fz)
    };
}

/* ---------- LAB ↔︎ LCH ---------- */
function labToLch({ l, a, b }: { l: number; a: number; b: number }): LCH {
    const c = Math.sqrt(a * a + b * b);
    const h = Math.atan2(b, a) * 180 / Math.PI;
    return { l, c, h: h < 0 ? h + 360 : h };
}

function lchToLab({ l, c, h }: LCH) {
    const hr = h * Math.PI / 180;
    return {
        l,
        a: c * Math.cos(hr),
        b: c * Math.sin(hr)
    };
}

/* ---------- Public helpers ---------- */
export function hexToLch(hex: string): LCH | null {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const xyz = rgbToXyz(rgb);
    const lab = xyzToLab(xyz);
    return labToLch(lab);
}

export function lchToHex(lch: LCH): string {
    const lab = lchToLab(lch);
    const xyz = labToXyz(lab);
    const rgb = xyzToRgb(xyz);
    return rgbToHex(rgb);
}

export function adjustLightness(lch: LCH, delta: number): LCH {
    return { ...lch, l: Math.max(0, Math.min(100, lch.l + delta)) };
}

export function adjustChroma(lch: LCH, delta: number): LCH {
    return { ...lch, c: Math.max(0, lch.c + delta) };
}

export function rotateHue(lch: LCH, deg: number): LCH {
    return { ...lch, h: rotateHueHue(lch.h, deg) };
}
