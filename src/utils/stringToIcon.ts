// src/utils/stringToIcon.ts
import { ICON_DICTIONARY } from './iconDictionary';

/**
 * Returns an emoji related to the input string.
 *
 * 1) Semantic lookup in ICON_DICTIONARY (fast O(k) with lowercase search).
 * 2) If no keyword matches, fall back to deterministic HSL-hash method.
 */
export function stringToIcon(str: string): string {
    const lower = str.toLowerCase();

    // 1️⃣ Keyword lookup
    for (const [keyword, emoji] of Object.entries(ICON_DICTIONARY)) {
        if (lower.includes(keyword)) return emoji;
    }

    // 2️⃣ Deterministic hash-based fallback (same output for same input)
    const fallbackIcons = Object.values(ICON_DICTIONARY);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return fallbackIcons[Math.abs(hash) % fallbackIcons.length];
}