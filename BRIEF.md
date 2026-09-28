# Brief: Implement cartTotal

## Task
Implement `cartTotal(items, options)` in `src/cart.js` as plain JavaScript (ES Modules) and cover the specification below with tests in `test/cart.test.js`.

## Files
- May edit: `src/cart.js`, `test/cart.test.js`
- Must not touch: `package.json`, `AGENTS.md`, `BRIEF.md`, `.github/`
- Keep the existing test in `test/cart.test.js` and extend the file; do not delete or rewrite it.

## Function Contract
`export function cartTotal(items, options)`

### Input
- `items`: `[{ name: string, price: number, qty: number }]`
- `options`: `{ vatRate: number, freeShipFrom: number, shipFee: number }`

### Calculation and return
- `subtotal` = sum of `price * qty`
- `vat` = `subtotal * vatRate`
- `shipping` = `0` when `subtotal >= freeShipFrom` (decided on the subtotal, before VAT), otherwise `shipFee`
- Return `Math.round(subtotal + vat + shipping)`. Round once, at the end only.
- The result is a `number`, never a string (no `toFixed`).

### Worked example (from the slides): must return exactly `467400`
```js
cartTotal(
  [{ name: 'Áo thun', price: 180000, qty: 2 },
   { name: 'Sổ tay',  price:  45000, qty: 1 }],
  { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
) // => 467400
```
Subtotal 405000 + VAT 32400 + shipping 30000 (405000 < 500000, so shipping is charged).

## Error and edge cases
- Empty cart (`items.length === 0`): return `0` (no VAT, no shipping), even if `options` is incomplete. Check this before reading any other option.
- Negative `price`: throw `RangeError`. A `price` of `0` is valid.
- `qty` not a positive integer (`0`, negative, or `1.5`): throw `RangeError`.
- Validate every item before computing anything. Never swallow a `RangeError` or turn it into a default value.

## Constraints
- Zero dependencies: no npm packages, not even devDependencies. Tests use `node:test` and `node:assert/strict` only.
- Do not invent behaviour that is not listed here: no extra validation beyond the cases listed above, no extra options, no rounding of intermediate values.
- Tests must assert the specification, not the implementation. One test = one reason to fail.
- Do not run any git command (no add, commit, push). Leave the changes uncommitted so the human reviewer can inspect the diff before committing.

## Done when
- `npm run gate` is green (this includes `npm test`), without installing any npm package.
- Tests exist for: the worked example (strict equality with `467400`), empty cart, free shipping below / exactly at / above the threshold, negative price, `qty` 1.5, `qty` 0, negative `qty`.
- Only the two allowed files were changed.

## Freedom
- Implementation approach, helper functions, error messages, and test organization are up to you. Choose the simplest readable design and state your plan in a few lines before writing code.
- After finishing, list any assumption you made that this brief does not cover.