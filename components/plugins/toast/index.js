import Toast from './index.vue'
export default {
  install(Vue, options) {
    const CONSTRUCTOR = Vue.extend(Toast)

    const CACHE = {}
    function toast(
      type,
      content,
      time = 2,
      options = {},
      callback = undefined
    ) {
      let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR())
      let bol = false
      if (!document.querySelector('#toast')) {
        let vm = toast.$mount()
        document.querySelector('body').appendChild(vm.$el)
        bol = options.bol = options.hasOwnProperty('bol') ? options.bol : true
        options.content = content
        options.type = type
        toast.queue = options
        if (time) {
          let setTime = setTimeout(() => {
            bol = options.bol = false
            toast.queue.bol = bol
            if (callback) {
              callback()
            }
            toast = ''
            document.querySelector('#toast').remove()
            clearTimeout(setTime)
          }, time * 1000)
        }
      }
    }
    Vue.Toast = Vue.prototype.$toast = toast
  }
}
