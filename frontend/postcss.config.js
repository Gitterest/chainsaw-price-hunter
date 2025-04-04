module.exports = {
  plugins: {
    tailwindcss: {}, // ✅ Correct usage
    autoprefixer: {}, // ✅ Optional, but recommended
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    },
  },
};
