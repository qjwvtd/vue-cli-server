<template>
  <div>登录</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'index',
  components: {},
  created () { },
  mounted () { },
  methods: {
    ...mapActions({
      userLogin: 'login/userLogin'
    })
  }
}
</script>

<style scoped lang="less">
</style>
