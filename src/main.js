// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css';
// Vue-cli生成的工程文件的src/main.js
import hljs from 'highlight.js';
import 'highlight.js/styles/atelier-seaside-dark.css' //样式文件

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    if (block) {
      hljs.highlightBlock(block);
    }
  })
});


Vue.use(mavonEditor);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
