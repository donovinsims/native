## 2025-05-20 - [Information Disclosure / postMessage]
**Vulnerability:** wildcard "*" as targetOrigin in window.postMessage.
**Learning:** While using `window.location.origin` is more secure, it can break cross-origin iframe communication (e.g. in development previews or multi-domain editors). When wildcards are required for cross-origin functionality, the payload must be strictly sanitized.
**Prevention:** Mask sensitive data like stack traces in production (`import.meta.env.DEV`) before sending via postMessage, and only use specific target origins when the parent domain is known.
