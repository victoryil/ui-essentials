export function getColorFromString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash) % 360;
    const sat = 70;           // 70 % → más chispa
    const light = 45;         // 45 % → evita pasteles apagados
    return `hsl(${hue}, ${sat}%, ${light}%)`;
}