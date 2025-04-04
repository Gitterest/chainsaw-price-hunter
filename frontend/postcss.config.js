module.exports = {
  plugins: {
    'tailwindcss/postcss': {}, // <--- fix this line
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    },
  },
};
