const pkg = require('./package')

module.exports = {
  mode: 'universal',

  serverMiddleware: [
    // Will register redirect-ssl npm package
    '~/middleware/serverInit.js'
  ],
  /*
     ** Headers of the page
     */
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_975454_k8rtsll8m9.css'
      }
    ]
  },

  /*
     ** Customize the progress-bar color
     */
  loading: { color: '#fff' },

  /*
     ** Global CSS
     */
  // middleware all pages of the application
  css: ['@/assets/css/reset.css', '@/assets/css/public.css'],
  loader: [
    {
      test: /\.less$/,
      loaders: 'style-loader!css-loader!less-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
      // options: vueLoaderConfig
    }
  ],
  router: {
    middleware: 'routerConfig'
  },
  /*
     ** Plugins to load before mounting the App
     */

  plugins: [
    '~/plugins/i18n',
    '~/plugins/global',
    {
      src: '~/plugins/noSsr',
      ssr: false
    }
  ],

  /*
     ** Nuxt.js modules
     */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
     ** Axios module configuration
     */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
     ** Build configuration
     */
  build: {
    /*
         ** You can extend webpack config here
         */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
