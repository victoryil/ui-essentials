export function kpiFormat(
    value: number,
    options?: { percent?: boolean }
): string {
    if (options?.percent) return `${(value * 100).toFixed(1)}%`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toString();
}