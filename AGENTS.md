# Project Rules: cartTotal

## Tech Stack
- Runtime: Node.js (>=20, ES Modules)
- Tests: native `node:test` + `node:assert/strict`
- Lint: native `node --check` (zero-dependency gate)

## Scope
- Task code: edit only `src/cart.js` and `test/cart.test.js`.
- Harness setup only: may edit the `scripts` block of `package.json` and files under `.github/workflows/`. Never touch dependencies.
- Do not edit `AGENTS.md` or `BRIEF.md` unless explicitly asked.
- Contract: `cartTotal(items, options)` returns a whole-number `number`.
  items = `{ name, price, qty }`, options = `{ vatRate, freeShipFrom, shipFee }`.
  Details and worked example (467400) are in `BRIEF.md`.

## Commands
- `npm test`: run unit tests
- `npm run lint`: syntax-check source and tests
- `npm run gate`: lint + test; must be green before any task is called done

## Testing
- One test = one reason to fail (one assertion focus per test).

## NEVER
- NEVER add any npm dependency (neither `dependencies` nor `devDependencies`).
- NEVER return a string from `cartTotal` (no `toFixed`); return a whole `number`.
- NEVER swallow or convert `RangeError` into a default value.
- NEVER edit or delete a test just to make it pass.
- NEVER declare a task done or push source/test changes while `npm run gate` fails.
- NEVER commit tokens or secrets.
- NEVER force-push, rebase, or squash; keep the real commit history.
