import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class", '[data-theme="dark"]'],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1200px'
			}
		},
		extend: {
			colors: {
				background: 'var(--color-background)',
				surface: 'var(--color-surface)',
				'surface-raised': 'var(--color-surface-raised)',
				border: 'var(--color-border)',
				primary: 'var(--color-text-primary)',
				secondary: 'var(--color-text-secondary)',
				'accent-dot': 'var(--color-accent-dot)',
				'black-solid': 'var(--color-black-solid)',
				'white-translucent': 'var(--color-white-translucent)',
				'nav-pill-bg': 'var(--nav-pill-bg)',
				'nav-pill-border': 'var(--nav-pill-border)',
				'nav-pill-text': 'var(--nav-pill-text)',
			},
			spacing: {
				xs: 'var(--space-xs)',
				sm: 'var(--space-sm)',
				md: 'var(--space-md)',
				lg: 'var(--space-lg)',
				xl: 'var(--space-xl)',
				xxl: 'var(--space-xxl)',
			},
			borderRadius: {
				sm: 'var(--radius-sm)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				avatar: 'var(--radius-avatar)',
				pill: 'var(--radius-pill)',
			},
			boxShadow: {
				card: 'var(--shadow-card)',
				inset: 'var(--shadow-inset)',
			},
			fontSize: {
				'h1': ['var(--type-h1-size)', { lineHeight: 'var(--type-h1-line-height)', letterSpacing: 'var(--type-h1-letter-spacing)', fontWeight: 'var(--type-h1-weight)' }],
				'h2': ['var(--type-h2-size)', { lineHeight: 'var(--type-h2-line-height)', letterSpacing: 'var(--type-h2-letter-spacing)', fontWeight: 'var(--type-h2-weight)' }],
				'body': ['var(--type-body-size)', { lineHeight: 'var(--type-body-line-height)', letterSpacing: 'var(--type-body-letter-spacing)', fontWeight: 'var(--type-body-weight)' }],
				'caption': ['var(--type-caption-size)', { lineHeight: 'var(--type-caption-line-height)', fontWeight: 'var(--type-caption-weight)' }],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindAnimate],
} satisfies Config;
