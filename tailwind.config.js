  // **tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        afrox: {
          gold: '#EAB308',
          orange: '#F59E0B',
          purple: '#8B5CF6',
          blue: '#3B82F6',
          green: '#10B981',
        },
      },
      animation: {
        'spin-wheel': 'spin-wheel 15s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-wheel': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(3600deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(234, 179, 8, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
```
