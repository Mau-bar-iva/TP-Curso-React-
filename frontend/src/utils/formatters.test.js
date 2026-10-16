import test from 'node:test';
import assert from 'node:assert/strict';

import { formatCurrency } from './formatters.js';
import { getSwatchColor } from './colors.js';

test('formatCurrency formats values in USD consistently', () => {
    assert.equal(formatCurrency(1250.5), '$1,250.50');
    assert.equal(formatCurrency(0), '$0.00');
});

test('getSwatchColor maps common color names and keeps valid hex values', () => {
    assert.equal(getSwatchColor('ivory'), '#F4EFE8');
    assert.equal(getSwatchColor('navy'), '#2D4266');
    assert.equal(getSwatchColor('#A63D34'), '#A63D34');
    assert.equal(getSwatchColor('unknown tone'), '#D8C7B2');
});
