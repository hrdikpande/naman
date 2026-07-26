/** Design tokens sourced verbatim from neo.skill (.claude/skills/neo/SKILL.md). */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFEF0',
        ink: '#0A0A0A',
        yellow: '#FFE600',
        magenta: '#FF3EA5',
        cyan: '#00C2CB',
        purple: '#7B2FBE',
        green: '#00C853',
        orange: '#FF6B35',
        'pastel-yellow': '#FFDB58',
        'pastel-cyan': '#87CEEB',
        'pastel-pink': '#FFC0CB',
        'pastel-green': '#BAFCA2',
        'pastel-purple': '#C4A1FF',
        'pastel-orange': '#FFA07A',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        brutal: '4px',
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0 #0A0A0A',
        brutal: '5px 5px 0 #0A0A0A',
        'brutal-lg': '8px 8px 0 #0A0A0A',
        'brutal-none': '0 0 0 #0A0A0A',
        'brutal-error': '4px 4px 0 #FF3EA5',
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        wideish: '0.08em',
        widest: '0.12em',
      },
    },
  },
  plugins: [],
};
