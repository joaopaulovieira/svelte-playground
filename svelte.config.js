const sveltePreprocess = require('svelte-preprocess')
const production = !process.env.ROLLUP_WATCH

module.exports = {
  preprocess: sveltePreprocess({
    sourceMap: !production,
    defaults: { style: 'scss' },
    scss: { prependData: `@import 'src/styles/variables.scss';` },
    postcss: { plugins: [require('autoprefixer')()] },
  }),
  dev: !production,
  css: css => css.write('bundle.css'),
}