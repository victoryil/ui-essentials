// playground/UiUtilsPlayground.tsx – plain CSS-in-JS (no Tailwind)
import React, { useState, useRef, useEffect } from 'react';
import { stringToIcon, generateSkeletonLines, groupArray, truncateMiddle, detectOverflow } from '../../src';

/* ---------- helpers ---------- */
const h2 = { fontSize: 18, fontWeight: 700, marginBottom: 12 };
const card = {
    background: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 2px 4px rgba(0,0,0,.06)'
};
const labelStyle = { fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' };

/* 1️⃣ Icon grid -------------------------------------------------- */
const sampleWords = ['dashboard', 'user', 'settings', 'email', 'chat', 'folder', 'tasks', 'team', 'rocket'];
function IconGrid() {
    const grid: React.CSSProperties = {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16
    };
    return (
        <div style={grid}>
            {sampleWords.map(word => (
                <div key={word} style={{ ...card, textAlign: 'center' }}>
                    <div style={{ fontSize: 32 }}>{stringToIcon(word)}</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>{word}</div>
                </div>
            ))}
        </div>
    );
}

/* 2️⃣ Skeleton Demo --------------------------------------------- */
function SkeletonDemo() {
    const [loading, setLoading] = useState(true);
    const lines = generateSkeletonLines(5);
    return (
        <div>
            <button
                onClick={() => setLoading(!loading)}
                style={{ marginBottom: 12, padding: '6px 12px', border: 'none', borderRadius: 6, background: '#2563eb', color: '#fff', cursor: 'pointer' }}
            >
                {loading ? 'Mostrar contenido' : 'Mostrar skeleton'}
            </button>
            {loading ? (
                lines.map(l => (
                    <div key={l} style={{ height: 16, background: '#d1d5db', borderRadius: 6, marginBottom: 6, animation: 'pulse 1.2s infinite' }} />
                ))
            ) : (
                <div style={{ fontSize: 14 }}>
                    {lines.map(l => <p key={l}>Línea de contenido {l + 1}</p>)}
                </div>
            )}
        </div>
    );
}

/* 3️⃣ Group Array Demo ------------------------------------------ */
const fruit = ['🍎', '🍌', '🍓', '🍇', '🍑', '🥝', '🍍'];
function GroupArrayDemo() {
    const [size, setSize] = useState(3);
    const groups = groupArray(fruit, size);
    return (
        <div>
            <label style={labelStyle}>Tamaño de grupo: {size}</label>
            <input type="range" min={1} max={5} value={size} onChange={e => setSize(+e.target.value)} />
            <div style={{ ...card, marginTop: 12 }}>
                <p style={{ fontSize: 11, marginBottom: 4 }}>Antes:</p>
                <div style={{ display: 'flex', gap: 4, fontSize: 24 }}>{fruit.map(f => <span key={f}>{f}</span>)}</div>
            </div>
            <div style={{ ...card, marginTop: 12 }}>
                <p style={{ fontSize: 11, marginBottom: 4 }}>Después:</p>
                {groups.map((g, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 4, fontSize: 24 }}>{g.map(f => <span key={f}>{f}</span>)}</div>
                ))}
            </div>
        </div>
    );
}

/* 4️⃣ Truncate Demo --------------------------------------------- */
const paths = [
    'victoryil@victoryil.com',
    'src/components/common/Button/index.tsx',
    'https://github.com/victoryil/super-long-repository-name'
];
function TruncateDemo() {
    return (
        <div style={{ fontSize: 13 }}>
            {paths.map(p => (
                <div key={p} style={{ background: '#e5e7eb', borderRadius: 8, padding: 8, marginBottom: 6 }}>
                    {truncateMiddle(p, 28)}
                </div>
            ))}
        </div>
    );
}

/* 5️⃣ Overflow Demo --------------------------------------------- */
function OverflowDemo() {
    const [width, setWidth] = useState(160);
    const ref = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(false);
    useEffect(() => {
        if (ref.current) setOverflow(detectOverflow(ref.current));
    }, [width]);
    return (
        <div>
            <label style={labelStyle}>Width: {width}px</label>
            <input type="range" min={80} max={512} value={width} onChange={e => setWidth(+e.target.value)} />
            <div
                ref={ref}
                style={{
                    width,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: 8,
                    marginTop: 8,
                    background: '#f3f4f6',
                    borderRadius: 8
                }}
            >
                Esto es un texto demasiado largo que puede desbordar su contenedor.
            </div>
            <p style={{ fontSize: 11, color: '#555', marginTop: 4 }}>Overflow: {overflow ? 'Sí' : 'No'}</p>
        </div>
    );
}

/* Main playground component ------------------------------------- */
export default function UiUtilsPlayground() {
    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <section style={{ marginBottom: 40 }}>
                <h2 style={h2}>🔤 Iconos deterministas</h2>
                <IconGrid />
            </section>
            <section style={{ marginBottom: 40 }}>
                <h2 style={h2}>🦴 Skeleton con toggle</h2>
                <SkeletonDemo />
            </section>
            <section style={{ marginBottom: 40 }}>
                <h2 style={h2}>📦 Agrupar Array (antes / después)</h2>
                <GroupArrayDemo />
            </section>
            <section style={{ marginBottom: 40 }}>
                <h2 style={h2}>✂️ Truncar texto</h2>
                <TruncateDemo />
            </section>
            <section>
                <h2 style={h2}>📏 Detectar Overflow</h2>
                <OverflowDemo />
            </section>
        </div>
    );
}

/* Simple @keyframes for skeleton pulse (global style injection) */
const style = document.createElement('style');
style.innerHTML = `@keyframes pulse { 0% { opacity: .6 } 50% { opacity: .3 } 100% { opacity: .6 } }`;
document.head.appendChild(style);
