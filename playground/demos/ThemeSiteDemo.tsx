import React, {useEffect, useState} from 'react';
import { HexColorPicker } from 'react-colorful';
import {
    generateTheme,
    getReadableTextColor,
} from '../../src';

const Label = ({ children }: { children: React.ReactNode }) => (
    <span
        style={{
            background: '#0003',
            color: '#fff',
            padding: '2px 6px',
            borderRadius: 4,
            fontSize: 10,
            marginLeft: 6
        }}
    >
    {children}
  </span>
);

/* ----------------------------------------------------------------------------------- */
export default function ThemeSiteDemo() {
    const [base, setBase] = useState('#3b82f6');      // color picker state
    const theme = generateTheme(base)!;               // paleta completa

    useEffect(() => {
        console.table(theme);
    }, [base]);
    /* Helpers para texto sobre chips en la grid */
    const chipText = (bg: string) => getReadableTextColor(bg);

    /* ---------- Paleta visual (chips) ---------- */
    const paletteGrid = (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))',
                gap: 12
            }}
        >
            {Object.entries(theme).map(([k, v]) => (
                <div
                    key={k}
                    style={{
                        background: v,
                        color: chipText(v),
                        padding: 12,
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        textAlign: 'center'
                    }}
                >
                    {k}
                </div>
            ))}
        </div>
    );

    /* ---------- Mini página “light” ---------- */
    const LightCard = (
        <div
            style={{
                flex: 1,
                minWidth: 280,
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,.08)',
                background: '#fff'
            }}
        >
            {/* barra primaria */}
            <header
                style={{
                    background: theme.primary,
                    color: theme.onPrimary,
                    padding: 14,
                    fontWeight: 600
                }}
            >
                Demo Site
                <Label>primary + onPrimary</Label>
            </header>

            {/* sección secundaria */}
            <section style={{ padding: 20 }}>
                <h3 style={{ color: theme.secondary }}>
                    Título
                    <Label>secondary</Label>
                </h3>

                <p style={{ lineHeight: 1.6 }}>
                    Este bloque (white bg) ilustra el modo <strong>light</strong>. Cambia el color base con el
                    picker y todo se actualiza.
                </p>

                <button
                    style={{
                        background: theme.accent,
                        color: theme.onAccent,
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600,
                        boxShadow: '0 2px 5px rgba(0,0,0,.15)'
                    }}
                >
                    Botón
                    <Label>accent + onAccent</Label>
                </button>
            </section>
        </div>
    );

    /* ---------- Mini página “dark” ---------- */
    const DarkCard = (
        <div
            style={{
                flex: 1,
                minWidth: 280,
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,.08)',
                background: theme.neutralBg,
                color: theme.neutralText
            }}
        >
            <header
                style={{
                    background: theme.primaryDark,
                    color: theme.onPrimary,
                    padding: 14,
                    fontWeight: 600
                }}
            >
                Demo Site Dark
                <Label>primaryDark + onPrimary</Label>
            </header>

            <section style={{ padding: 20 }}>
                <h3 style={{ color: theme.secondaryLight }}>
                    Encabezado
                    <Label>secondaryLight</Label>
                </h3>

                <p style={{ lineHeight: 1.6 }}>
                    Este bloque usa <code>neutralBg</code> + <code>neutralText</code>. Funciona como modo
                    <strong> dark</strong>.
                </p>

                <button
                    style={{
                        background: theme.accentDark,
                        color: theme.onAccent,
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600,
                        boxShadow: '0 2px 5px rgba(0,0,0,.25)'
                    }}
                >
                    Botón
                    <Label>accentDark + onAccent</Label>
                </button>
            </section>
        </div>
    );

    return (
        <div>
            {/* ------------ Picker + Paleta ------------ */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div>
                    <HexColorPicker color={base} onChange={setBase} />
                    <div
                        style={{
                            fontFamily: 'monospace',
                            textAlign: 'center',
                            marginTop: 8,
                            fontSize: 14
                        }}
                    >
                        {base.toUpperCase()}
                    </div>
                </div>
                {paletteGrid}
            </div>

            {/* ------------ Webcards ------------ */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {LightCard}
                {DarkCard}
            </div>
        </div>
    );
}