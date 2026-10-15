export const COLOR_PALETTE = [
    { name: 'Black', code: 'BLK' },
    { name: 'White', code: 'WHT' },
    { name: 'Ivory', code: 'IVR' },
    { name: 'Beige', code: 'BEG' },
    { name: 'Tan', code: 'TAN' },
    { name: 'Brown', code: 'BRN' },
    { name: 'Grey', code: 'GRY' },
    { name: 'Navy', code: 'NAV' },
    { name: 'Blue', code: 'BLU' },
    { name: 'Olive', code: 'OLV' },
    { name: 'Green', code: 'GRN' },
    { name: 'Red', code: 'RED' },
    { name: 'Pink', code: 'PNK' },
] as const;

export const SIZE_MAP = {
    shirt: ['XS', 'S', 'M', 'L', 'XL'],
    jacket: ['XS', 'S', 'M', 'L', 'XL'],
    shoes: {
        men: ['40', '41', '42', '43', '44', '45'],
        women: ['36', '37', '38', '39', '40', '41'],
        kids: ['28', '30', '32', '34'],
    },
    cap: ['Única'],
    bag: ['Única'],
    watch: ['Única'],
} as const;
