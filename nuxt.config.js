module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'loan',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [{ src: '~assets/css/rest.less', lang: 'less' }, { src: '~assets/css/common.less', lang: 'less' }],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['vue-i18n'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {              // customize nuxt.js router (vue-router).
    middleware: 'i18n'   // middleware all pages of the application
  },
  plugins: ['~/plugins/i18n.js',{
      src: '~/plugins/main',
      ssr: true
    }],
  // ... 其他配置
  // plugins: [
  //   {
  //     src: '~/plugins/api',
  //     ssr: true
  //   }, {
  //     src: "~/plugins/axios",
  //     ssr: false
  //   },
  //   {
  //     src: '~/plugins/i18n.js',
  //     ssr: false
  //   }
  // ],
  modules: ['@nuxtjs/axios'], // 不需要加入@nuxtjs/proxy
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:2001', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    },
  }
  // ... 

}

