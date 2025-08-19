## 2.0.0 (August 19, 2025) - Breaking Changes

This release updates React (and peer dependencies) to version 19.
All dependencies was updated.

## 1.0.0 (September 27, 2024) - Breaking Changes

This release modifies how to use `useHash` hook.

### useHash

- **GLOBAL PREFIX**: now all keys has a `ed` globalPrefix that can be configured with a different value.
- **INDEX**: useHash saves all encrypted keys into an array.
- **RESERVED KEYS**: useHash does not allow you to use `security` and `index` keys.
- **OBJECT CONFIGURATION**: useHash now uses an object configuration `useHash({ globalPrefix, prefix, Generator, notAllowedKeyCallback })`.
- **NEW METHODS**: useHash now returns `{enc, dec, remove, renew, clear, index}`.