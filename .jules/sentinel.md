## 2025-05-22 - Information Disclosure via Cross-Origin postMessage
**Vulnerability:** Application error stack traces were being broadcast to the parent window via `window.parent.postMessage` using a wildcard `*` target origin.
**Learning:** In projects designed for cross-origin embedding (like this one using the Orchids/Visual Edits messenger), using `*` is often necessary but extremely dangerous if the payload contains sensitive internal data like stack traces.
**Prevention:** Always use `import.meta.env.DEV` to conditionally mask stack traces and other sensitive internal state in any data sent via `postMessage`, especially when a restricted `targetOrigin` cannot be used.
