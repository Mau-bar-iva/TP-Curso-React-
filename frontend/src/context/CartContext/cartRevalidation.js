export const reconcileCartItems = (cart = [], catalog = []) => {
  const catalogMap = new Map(
    catalog
      .filter((product) => product && product.id !== undefined && product.id !== null)
      .map((product) => [Number(product.id), product])
  );

  return cart.reduce((acc, item) => {
    if (!item || item.id == null) return acc;

    const product = catalogMap.get(Number(item.id));
    if (!product) return acc;

    const stock = Number(product.stock ?? item.stock ?? 0);
    if (!Number.isFinite(stock) || stock <= 0) return acc;

    const quantity = Math.min(Math.max(1, Number(item.quantity) || 1), stock);

    acc.push({
      ...item,
      id: Number(item.id),
      name: item.name || product.title || product.name || 'Producto',
      price: Number(product.price ?? item.price ?? 0),
      oldPrice: Number(product.oldPrice ?? item.oldPrice ?? product.price ?? item.price ?? 0),
      imageUrl: product.imageUrl || item.imageUrl || '/assets/logo.png',
      stock,
      quantity,
      category: item.category || product.category || [],
    });

    return acc;
  }, []);
};
