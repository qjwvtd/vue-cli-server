# vue-cli-server exzample

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
grunt
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/)

### 如未安装过yarn 和 grunt
 ```
 请先执行 npm i yarn -g && npm i grunt -g
 ```
### 技术选型
  + 框架：vue全家桶

  + ui： element-ui

  + 工程化工具：webpack4+vuecli3+mock

  + 规范：eslint

    

### 组件API

#####  拖拽排序

+ 项目中引入

  ```javascript
  import DhDraggable from '@/views/components/draggable'
  ```

  

+ 使用

  ```javascript
  <dh-draggable v-model="list"></dh-draggable>
  ```

  

+ 配合VueX 使用

```javascript
computed :{
  list: {
    // 此处 处理Vuex
  }
}
```
