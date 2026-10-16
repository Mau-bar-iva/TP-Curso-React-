const SWATCH_MAP = [
    ['black', '#1B1B1B'],
    ['white', '#F4EFE8'],
    ['ivory', '#F4EFE8'],
    ['beige', '#C7A98B'],
    ['sand', '#C7A98B'],
    ['tan', '#C7A98B'],
    ['brown', '#8D6B4F'],
    ['camel', '#8D6B4F'],
    ['navy', '#2D4266'],
    ['blue', '#2D4266'],
    ['olive', '#6A715A'],
    ['green', '#6A715A'],
    ['red', '#C86759'],
    ['coral', '#C86759'],
    ['gray', '#9EA3A1'],
    ['grey', '#9EA3A1'],
    ['pink', '#D9A4A0'],
    ['gold', '#C6A15B'],
];

const normalizeHex = (value) => {
    const hex = value.startsWith('#') ? value.slice(1) : value;

    if (hex.length === 3) {
        return `#${hex
            .split('')
            .map((char) => char + char)
            .join('')
            .toUpperCase()}`;
    }

    if (hex.length === 6) {
        return `#${hex.toUpperCase()}`;
    }

    return value;
};

export const getSwatchColor = (colorName, fallback = '#D8C7B2') => {
    const value = String(colorName ?? '').trim();

    if (!value) return fallback;

    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
        return normalizeHex(value);
    }

    const normalizedValue = value.toLowerCase();
    const match = SWATCH_MAP.find(([token]) => normalizedValue.includes(token));

    return match ? match[1] : fallback;
};
