import React from 'react';
import { getColorFromString, getReadableTextColor, kpiFormat } from '../../src';

/* --- avatar compacto --- */
const Avatar = ({ name }: { name: string }) => {
    const bg = getColorFromString(name);
    const color = getReadableTextColor(bg);
    const initials = name
        .split(/\s+/)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            style={{
                background: bg,
                color,
                width: 64,
                height: 64,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 24,
                marginBottom: 4
            }}
        >
            {initials}
        </div>
    );
};

export default function AvatarsDemo() {
    const names = [
        'Alice Johnson',
        'Bob',
        'Carlos del Río',
        'Daria',
        'Eleanor',
        'Fátima',
        'Gonzalo'
    ];

    return (
        <>
            <h2>Avatares</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(80px,1fr))',
                    gap: 16
                }}
            >
                {names.map((n) => (
                    <div key={n} style={{ textAlign: 'center' }}>
                        <Avatar name={n} />
                        <div style={{ fontSize: 12 }}>{n.split(' ')[0]}</div>
                    </div>
                ))}
            </div>

            <h2 style={{ marginTop: 32 }}>kpiFormat</h2>
            <ul style={{ lineHeight: 1.8 }}>
                <li>1 234 → <strong>{kpiFormat(1234)}</strong></li>
                <li>2 300 000 → <strong>{kpiFormat(2_3e6)}</strong></li>
                <li>0.876 (percent) → <strong>{kpiFormat(0.876, { percent: true })}</strong></li>
            </ul>
        </>
    );
}