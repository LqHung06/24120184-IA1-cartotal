// Implement cartTotal here. See README.md and BRIEF.md for the specification.
export function cartTotal(items, options) {
  if (items.length === 0) {
    return 0;
  }

  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError('Price must not be negative');
    }
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('Quantity must be a positive integer');
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * options.vatRate;
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee;

  return Math.round(subtotal + vat + shipping);
}