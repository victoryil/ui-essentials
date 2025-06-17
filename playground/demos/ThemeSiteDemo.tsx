// playground/demos/ThemeSiteDemo.tsx — Material-based demo
import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { generateTheme } from '../../src';

export default function ThemeSiteDemo() {
    const [base, setBase] = useState('#ff7a00');
    const [theme, setTheme] = useState<{ light: any; dark: any } | null>(null);

    useEffect(() => {
        generateTheme(base).then(setTheme);
    }, [base]);

    if (!theme) return null;

    const Card = ({ mode }: { mode: 'light' | 'dark' }) => {
        const t = theme[mode];
        return (
            <div
                style={{
                    flex: 1,
                    minWidth: 280,
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,.08)',
                    background: t.background,
                    color: t.onBackground,
                }}
            >
                <header style={{ background: t.primary, color: t.onPrimary, padding: 14, fontWeight: 600 }}>
                    {mode.toUpperCase()} HEADER
                </header>

                <section style={{ padding: 20 }}>
                    <h3 style={{ color: t.secondary }}>Título Sección</h3>
                    <p style={{ lineHeight: 1.6 }}>Vista previa del esquema {mode} generado con Material 3.</p>

                    <button
                        style={{
                            background: t.accent,
                            color: t.onAccent,
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 600,
                        }}
                    >
                        Botón Accent
                    </button>
                </section>
            </div>
        );
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', padding: 24 }}>
            <h2>Material Theme Demo Site</h2>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 24 }}>
                <div>
                    <HexColorPicker color={base} onChange={setBase} />
                    <div style={{ fontFamily: 'monospace', textAlign: 'center', marginTop: 8 }}>
                        {base.toUpperCase()}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <Card mode="light" />
                <Card mode="dark" />
            </div>
        </div>
    );
}
