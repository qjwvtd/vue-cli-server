import { Loading } from 'element-ui'
const loading = {
  instancs: null,
  start: function (text) {
    const options = {
      text: text,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
    }
    //开始loading
    this.instancs = Loading.service(options)
  },
  end: function () {
    //关闭loading
    this.instancs.close()
  }
}
export default loading
