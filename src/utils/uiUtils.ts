/**
 * Creates a numeric array of a given length.
 * Commonly used to render placeholder elements (e.g., skeleton lines).
 *
 * @param count - Number of items to generate.
 * @returns An array with numbers from 0 to count - 1.
 */
export function generateSkeletonLines(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
}

/**
 * Splits an array into smaller chunks of a given size.
 *
 * @param array - The input array to split.
 * @param size - Maximum number of elements per group.
 * @returns A new array containing grouped subarrays.
 */
export function groupArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

/**
 * Truncates the middle of a string, preserving the start and end.
 * Ideal for displaying long identifiers like emails, hashes, or paths.
 *
 * @param text - The input string to truncate.
 * @param maxLength - Maximum length allowed (should be at least 5).
 * @returns A shortened string with ellipsis in the middle.
 */
export function truncateMiddle(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    const partLength = Math.floor((maxLength - 3) / 2);
    return `${text.slice(0, partLength)}...${text.slice(-partLength)}`;
}

/**
 * Checks if an HTML element's content is overflowing its bounds.
 *
 * @param el - The target HTMLElement to inspect.
 * @returns `true` if the element has overflow in width or height.
 */
export function detectOverflow(el: HTMLElement): boolean {
    return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
}