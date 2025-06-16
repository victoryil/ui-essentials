import React from 'react';
import { useAdaptiveLayout } from '../../src/react';

const breakpoints = [
    { width: 600, columns: 1, sidebar: false },
    { width: 1200, columns: 2, sidebar: true },
    { width: Infinity, columns: 3, sidebar: true }
];

export default function LayoutDemo() {
    const { columns, showSidebar } = useAdaptiveLayout(breakpoints);

    return (
        <div style={{ border: '1px solid #d1d5db', borderRadius: 12, overflow: 'hidden' }}>
            {showSidebar && (
                <aside style={{ background: '#1e3a8a', color: '#fff', padding: 16 }}>Sidebar</aside>
            )}

            <main
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: 12,
                    padding: 16
                }}
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            background: '#f1f5f9',
                            height: 80,
                            borderRadius: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,.08)'
                        }}
                    >
                        Card {i + 1}
                    </div>
                ))}
            </main>
        </div>
    );
}