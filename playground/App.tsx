import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import LayoutDemo from './demos/LayoutDemo';
import AvatarsDemo from './demos/AvatarsDemo';
import ThemeSiteDemo from './demos/ThemeSiteDemo';

type Tab = 'layout' | 'avatars' | 'theme';

const TabButton = ({ id, active, onClick, children }: any) => (
    <button
        onClick={() => onClick(id)}
        style={{
            padding: '8px 16px',
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            background: active ? '#2563eb' : '#e5e7eb',
            color: active ? '#fff' : '#111',
            transition: 'all .2s'
        }}
    >
        {children}
    </button>
);

function App() {
    const [tab, setTab] = useState<Tab>('layout');

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', padding: 24 }}>
            <header style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <TabButton id="layout" active={tab === 'layout'} onClick={setTab}>
                    Layout
                </TabButton>
                <TabButton id="avatars" active={tab === 'avatars'} onClick={setTab}>
                    Avatares + KPI
                </TabButton>
                <TabButton id="theme" active={tab === 'theme'} onClick={setTab}>
                    Theme Creator
                </TabButton>
            </header>

            {tab === 'layout' && <LayoutDemo />}
            {tab === 'avatars' && <AvatarsDemo />}
            {tab === 'theme' && <ThemeSiteDemo />}
        </div>
    );
}

createRoot(document.getElementById('root')!).render(<App />);