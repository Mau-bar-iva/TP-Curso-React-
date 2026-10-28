import test from 'node:test';
import assert from 'node:assert/strict';

import { reconcileCartItems } from './cartRevalidation.js';

test('reconcileCartItems keeps valid products, refreshes prices and caps quantities to stock', () => {
  const cart = [
    { id: 1, name: 'Camiseta', quantity: 4, price: 80, oldPrice: 100, imageUrl: '/old.png' },
    { id: 2, name: 'Pantalón', quantity: 1, price: 75, oldPrice: 90, imageUrl: '/old-2.png' },
    { id: 3, name: 'Chaqueta', quantity: 2, price: 120, oldPrice: 140, imageUrl: '/old-3.png' },
  ];

  const catalog = [
    { id: 1, title: 'Camiseta', price: 90, oldPrice: 120, stock: 2, imageUrl: '/new.png' },
    { id: 2, title: 'Pantalón', price: 80, oldPrice: 100, stock: 0, imageUrl: '/new-2.png' },
    { id: 3, title: 'Chaqueta', price: 135, oldPrice: 150, stock: 5, imageUrl: '/new-3.png' },
  ];

  const reconciled = reconcileCartItems(cart, catalog);

  assert.equal(reconciled.length, 2);
  assert.equal(reconciled[0].id, 1);
  assert.equal(reconciled[0].price, 90);
  assert.equal(reconciled[0].oldPrice, 120);
  assert.equal(reconciled[0].quantity, 2);
  assert.equal(reconciled[0].imageUrl, '/new.png');
  assert.equal(reconciled[1].id, 3);
  assert.equal(reconciled[1].price, 135);
});
