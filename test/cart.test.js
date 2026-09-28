import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

const defaultOptions = {
  vatRate: 0.08,
  freeShipFrom: 500000,
  shipFee: 30000,
}

test('empty cart returns 0', () => {
  assert.equal(cartTotal([], defaultOptions), 0)
})

test('empty cart returns 0 even if options is incomplete or empty', () => {
  assert.equal(cartTotal([], {}), 0)
})

test('shipping fee applied when subtotal is strictly below threshold', () => {
  const items = [{ name: 'Sách', price: 400000, qty: 1 }]
  assert.equal(cartTotal(items, defaultOptions), 462000)
})

test('free shipping applied when subtotal is exactly at threshold', () => {
  const items = [{ name: 'Balo', price: 500000, qty: 1 }]
  assert.equal(cartTotal(items, defaultOptions), 540000)
})

test('free shipping applied when subtotal is strictly above threshold', () => {
  const items = [{ name: 'Điện thoại', price: 600000, qty: 1 }]
  assert.equal(cartTotal(items, defaultOptions), 648000)
})

test('throws RangeError for negative price', () => {
  const items = [{ name: 'Hàng lỗi giá', price: -1, qty: 1 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('allows a price of 0 without error', () => {
  const items = [{ name: 'Quà tặng', price: 0, qty: 1 }]
  assert.equal(cartTotal(items, defaultOptions), 30000)
})

test('throws RangeError for non-integer quantity (1.5)', () => {
  const items = [{ name: 'Gạo', price: 20000, qty: 1.5 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('throws RangeError for zero quantity', () => {
  const items = [{ name: 'Bút', price: 10000, qty: 0 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('throws RangeError for negative quantity', () => {
  const items = [{ name: 'Vở', price: 15000, qty: -1 }]
  assert.throws(
    () => cartTotal(items, defaultOptions),
    (err) => err instanceof RangeError
  )
})

test('rounds total to nearest whole integer đồng once at the end', () => {
  const items = [{ name: 'Sản phẩm lẻ', price: 33333, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 66666)
})

test('result is strictly a number, never a string', () => {
  const items = [{ name: 'Áo', price: 100000, qty: 1 }]
  const result = cartTotal(items, defaultOptions)
  assert.equal(typeof result, 'number')
})
