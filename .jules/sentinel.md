# SENTINEL'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-05-14 - Information Disclosure via cross-origin postMessage
**Vulnerability:** Error stack traces were being sent to the parent window via `window.parent.postMessage(data, "*")` in `ErrorReporter.tsx`.
**Learning:** When an application is designed to be embedded in an iframe (e.g., for visual editing or previewing), using a wildcard `*` as the target origin for `postMessage` allows any embedding origin to capture sensitive data like stack traces.
**Prevention:** Always mask sensitive data (like stack traces) in production environments using `import.meta.env.DEV` or `process.env.NODE_ENV` before sending messages to external origins, and prefer specific target origins over `*` when possible.
