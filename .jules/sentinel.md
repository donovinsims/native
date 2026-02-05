## 2025-02-05 - CSS Injection in ChartStyle
**Vulnerability:** The `ChartStyle` component used `dangerouslySetInnerHTML` to inject dynamic CSS without sanitizing the `id`, `key`, or `color` variables. This allowed for potential CSS injection where a malicious configuration could break out of the intended rule (e.g., using `}`) and inject arbitrary styles.
**Learning:** Even when using `dangerouslySetInnerHTML` for CSS, sanitization is crucial. Standard string replacement of characters like `}`, `{`, and `;` can prevent most rule-breaking injections.
**Prevention:** Always sanitize any dynamic values being injected into a `<style>` block. Use strict whitelists for CSS identifiers and strip rule-breaking characters from CSS values.
