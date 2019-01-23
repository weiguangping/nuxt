export default function({ isHMR, app, store, route, params, error, redirect }) {
  console.log(params.lang)
  if (isHMR) {
    // ignore if called from hot module replacement
    return
  } // if url does not have language, redirect to english
  else if (!params.lang) {
    return redirect('/zh' + route.fullPath)
  }
  // based on directory structure _lang/xxxx, en/about has params.lang as "en"
  const locale = params.lang || 'zh'
  store.commit('SET_LANG', locale) // set store
  app.i18n.locale = store.state.locale
}
