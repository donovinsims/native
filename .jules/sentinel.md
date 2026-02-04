## 2025-05-14 - Information Leakage via Error Reporting
**Vulnerability:** Application error listeners and `ErrorReporter` components were sending full stack traces to the parent window via `postMessage` in all environments, including production.
**Learning:** In Vite-based applications, `import.meta.env.DEV` is an effective way to mask sensitive information like stack traces in production builds. Additionally, using `window.location.origin` as the `targetOrigin` for `postMessage` is a critical defense against data leakage to untrusted parent frames, although it must be used carefully if cross-origin embedding is intended.
**Prevention:** Always mask stack traces in production error handlers and prefer strict origin checks for cross-window communication.
