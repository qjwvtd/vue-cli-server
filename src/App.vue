<template>
  <div>
    <div>
      <router-link to="/">
        <el-button>首页</el-button>
      </router-link>

      <router-link to="/main">
        <el-button>主界面</el-button>
      </router-link>

      <router-link to="/user">
        <el-button>用户页</el-button>
      </router-link>

      <router-link to="/system">
        <el-button>系统管理</el-button>
      </router-link>

      <router-link to="/login">
        <el-button>登录</el-button>
      </router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less">
</style>
