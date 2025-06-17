// src/utils/iconDictionary.ts
// --------------------------------------------------
// Compact keyword → emoji dictionary
// Agrupado por categorías para que sea sencillo de ampliar
// --------------------------------------------------
export const ICON_DICTIONARY: Record<string, string> = {
    // ----- UI / navegación -----
    home: '🏠',
    dashboard: '📊',
    settings: '⚙️',
    user: '👤',
    folder: '📁',
    file: '📄',

    // ----- estados / feedback -----
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',

    // ----- acciones / objetos -----
    rocket: '🚀',
    fire: '🔥',
    spark: '✨',
    star: '🌟',
    target: '🎯',
    flag: '🚩',
    lock: '🔒',
    unlock: '🔓',
    mail: '✉️',
    chat: '💬',
    bookmark: '📌',

    // ----- negocio / finanzas -----
    money: '💰',
    wallet: '👛',
    chart: '📈',
    package: '📦',

    // ----- diversión / varios -----
    party: '🥳',
    idea: '💡',
    puzzle: '🧩',
    coffee: '☕',
    rocketship: '🚀', // alias
};