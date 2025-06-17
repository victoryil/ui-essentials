/**
 * Restricts a number between a minimum and a maximum.
 */
export function clampNumber(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Returns the overflow direction of an element.
 */
export function getOverflowDirection(
    el: HTMLElement
): 'none' | 'horizontal' | 'vertical' | 'both' {
    const h = el.scrollWidth > el.clientWidth;
    const v = el.scrollHeight > el.clientHeight;
    if (h && v) return 'both';
    if (h) return 'horizontal';
    if (v) return 'vertical';
    return 'none';
}

/**
 * Copies text to the clipboard.
 * @returns true on success, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

/**
 * Generates a short, readable unique ID.
 */
export function generateUID(prefix = ''): string {
    return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}