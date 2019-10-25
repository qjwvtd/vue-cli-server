// 防抖函数
function debounce (func, delay, context, event) {
  clearTimeout(func.timer)
  func.timer = setTimeout(function () {
    func.call(context, event)
  }, delay)
}
export default {
  name: 'DhButton',
  methods: {
    handeleClick (e) {
      // debugger
      // console.log(this)
      // 执行防抖函数(劫持)
      debounce(this.$listeners.click, 300, this, e)
    }
  },
  render (h) {
    // 将插槽内容转化为模板数组
    const slots = Object.keys(this.$slots).reduce(
      (arr, key) => arr.concat(this.$slots[key]), []
    ).map(vnode => {
      vnode.context = this._self
      return vnode
    })
    return h('el-button', {
      on: {
        click: this.handeleClick
      },
      props: this.$props,
      scopedSlots: this.$scopedSlots,
      attrs: this.$attrs
    }, slots)
  }
}
