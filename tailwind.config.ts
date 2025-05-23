
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", '[class="dark"]'],
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
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				talkmatch: {
					purple: "#9b87f5",
					"purple-dark": "#7E69AB",
					"purple-light": "#E5DEFF",
					pink: "#FFDEE2",
					peach: "#FDE1D3",
					gray: "#8E9196",
					"dark-bg": "#1A1F2C",
					"blue": "#33C3F0",
					"blue-light": "#8EC5FC",
					"blue-dark": "#0FA0CE",
					"black": "#111111",
					"black-light": "#222222",
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"pulse-gentle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"wave": {
					"0%": { transform: "translateY(0)" },
					"25%": { transform: "translateY(-5px)" },
					"50%": { transform: "translateY(0)" },
					"75%": { transform: "translateY(5px)" },
					"100%": { transform: "translateY(0)" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"glow": {
					"0%, 100%": { boxShadow: "0 0 5px rgba(51, 195, 240, 0.3)" },
					"50%": { boxShadow: "0 0 20px rgba(51, 195, 240, 0.8)" }
				},
				"background-pan": {
					"0%": { backgroundPosition: "0% center" },
					"100%": { backgroundPosition: "200% center" }
				},
				"rotate-slow": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" }
				},
				"breathe": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.1)" }
				},
				"ripple": {
					"0%": { transform: "scale(0)", opacity: "1" },
					"100%": { transform: "scale(4)", opacity: "0" }
				},
				"pulse-ring": {
					"0%": { transform: "scale(0.8)", opacity: "0.8" },
					"50%": { transform: "scale(1)", opacity: "0.4" },
					"100%": { transform: "scale(0.8)", opacity: "0.8" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse-gentle": "pulse-gentle 1.5s ease-in-out infinite",
				"fade-in": "fade-in 0.3s ease-out forwards",
				"fade-out": "fade-out 0.3s ease-out forwards",
				"scale-in": "scale-in 0.2s ease-out forwards",
				"wave": "wave 1.5s ease-in-out infinite",
				"float": "float 3s ease-in-out infinite",
				"glow": "glow 2s ease-in-out infinite",
				"background-pan": "background-pan 3s linear infinite",
				"rotate-slow": "rotate-slow 12s linear infinite",
				"breathe": "breathe 4s ease-in-out infinite",
				"ripple": "ripple 1.5s ease-out infinite",
				"pulse-ring": "pulse-ring 3s ease-out infinite",
			},
			backgroundImage: {
				"gradient-purple": "linear-gradient(135deg, #9b87f5, #7E69AB)",
				"gradient-warm": "linear-gradient(135deg, #FFDEE2, #FDE1D3)",
				"gradient-calm": "linear-gradient(135deg, #E5DEFF, #D6BCFA)",
				"gradient-blue": "linear-gradient(135deg, #33C3F0, #0FA0CE)",
				"gradient-tech": "linear-gradient(90deg, #111111, #1A1F2C)",
				"gradient-glow": "linear-gradient(45deg, #111111, #222222, #33C3F0, #222222, #111111)",
				"gradient-cyber": "linear-gradient(135deg, #111111, #1A1F2C, #33C3F0, #1A1F2C, #111111)",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
