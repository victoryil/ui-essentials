// src/color/generateTheme.ts
import {
    argbFromHex,
    themeFromSourceColor,
    hexFromArgb
} from '@material/material-color-utilities';

/**
 * Tema ligero inspirado en Material 3.
 * Devuelve los tokens esenciales ya en HEX.
 *
 * ▸ baseHex  – color fuente (#rrggbb)
 */
export async function generateTheme(baseHex: string) {
    const source = argbFromHex(baseHex);
    const { schemes } = await themeFromSourceColor(source);

    const light = schemes.light;
    const dark  = schemes.dark;

    const pick = (scheme: any) => ({
        primary:       hexFromArgb(scheme.primary),
        onPrimary:     hexFromArgb(scheme.onPrimary),
        secondary:     hexFromArgb(scheme.secondary),
        onSecondary:   hexFromArgb(scheme.onSecondary),
        accent:        hexFromArgb(scheme.tertiary),
        onAccent:      hexFromArgb(scheme.onTertiary),
        background:    hexFromArgb(scheme.background),
        onBackground:  hexFromArgb(scheme.onBackground),
        surface:       hexFromArgb(scheme.surface),
        onSurface:     hexFromArgb(scheme.onSurface)
    });

    return {
        light: pick(light),
        dark:  pick(dark)
    };
}