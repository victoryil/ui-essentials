// src/color/generateTheme.ts

import {
    hexToLch,
    lchToHex,
    adjustLightness,
    rotateHue,
    adjustChroma
} from '../utils/colorLCHUtils';
import { getReadableTextColor } from '../color/getReadableTextColor';

/**
 * Generador de tema visual moderno basado en espacio LCH
 * Produce colores consistentes y armónicos perceptualmente
 */
export function generateTheme(baseHex: string) {
    const base = hexToLch(baseHex);
    if (!base) return null;

    // Primary
    const primary = lchToHex(base);
    const primaryLight = lchToHex(adjustLightness(base, +20));
    const primaryDark = lchToHex(adjustLightness(base, -20));

    // Secondary (hue +180)
    const secondaryLch = rotateHue(base, 180);
    const secondary = lchToHex(secondaryLch);
    const secondaryLight = lchToHex(adjustLightness(secondaryLch, +20));
    const secondaryDark = lchToHex(adjustLightness(secondaryLch, -20));

    // Accent (hue +120, +chroma)
    const accentLch = adjustChroma(rotateHue(base, 120), +20);
    const accent = lchToHex(accentLch);
    const accentLight = lchToHex(adjustLightness(accentLch, +20));
    const accentDark = lchToHex(adjustLightness(accentLch, -20));

    // Fondo neutro (modo dark) y texto asociado
    const neutralBg = lchToHex({ l: 12, c: 5, h: base.h });
    const neutralText = getReadableTextColor(neutralBg);

    // Contrastes
    const onPrimary = getReadableTextColor(primary);
    const onSecondary = getReadableTextColor(secondary);
    const onAccent = getReadableTextColor(accent);

    // Estados fijos (podrías hacerlos también LCH si deseas)
    const success = '#16a34a';
    const warning = '#fbbf24';
    const error = '#dc2626';

    return {
        primary,
        primaryLight,
        primaryDark,
        onPrimary,

        secondary,
        secondaryLight,
        secondaryDark,
        onSecondary,

        accent,
        accentLight,
        accentDark,
        onAccent,

        neutralBg,
        neutralText,

        success,
        warning,
        error
    };
}