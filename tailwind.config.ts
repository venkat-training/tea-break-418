import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1209',
        tea: '#7c3b0c',
        'tea-warm': '#a35218',
        'tea-amber': '#d97706',
        pitch: '#0d3d1e',
        'pitch-light': '#1a5c31',
        cream: '#fdf6ec',
        'cream-deep': '#f5e9d0',
        willow: '#8b9b6e',
        muted: '#6b6053'
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'Menlo', 'monospace']
      },
      backgroundImage: {
        'pitch-gradient': 'linear-gradient(135deg, #0d3d1e 0%, #0a4a24 50%, #1a5c31 100%)',
        'tea-gradient': 'linear-gradient(135deg, #7c3b0c 0%, #a35218 60%, #d97706 100%)',
        'cream-gradient': 'linear-gradient(135deg, #fdf6ec 0%, #f5e9d0 100%)'
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
        shimmer: 'shimmer 3s linear infinite',
        steam: 'steam 2.1s ease-in-out infinite',
        'teapot-pulse': 'teapot-pulse 2s ease-in-out infinite'
      },
      boxShadow: {
        card: '0 1px 3px rgba(26,18,9,0.06), 0 4px 16px rgba(26,18,9,0.04)',
        'card-hover': '0 4px 12px rgba(26,18,9,0.12), 0 16px 40px rgba(26,18,9,0.08)',
        'pitch-glow': '0 0 24px rgba(13,61,30,0.3)',
        'tea-glow': '0 0 24px rgba(124,59,12,0.3)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};

export default config;