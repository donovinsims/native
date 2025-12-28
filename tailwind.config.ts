import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: "class",
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
        page: 'var(--color-page)',
        text: 'var(--color-text)',
        grey: 'var(--color-grey)',
        'ui-1': 'var(--color-ui-1)',
        'ui-2': 'var(--color-ui-2)',
        'ui-3': 'var(--color-ui-3)',
        'ui-4': 'var(--color-ui-4)',
        'border-1': 'var(--color-border-1)',
        'border-2': 'var(--color-border-2)',
        'border-3': 'var(--color-border-3)',
        'border-4': 'var(--color-border-4)',
			},
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
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
