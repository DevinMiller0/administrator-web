// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from 'qs'
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

axios.defaults.baseURL = 'http://localhost:8099/';
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = window.localStorage.getItem('token');
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
      if (config.url === 'publish/saveArticle') {
        config.headers["Content-Type"] = "application/json";
      } else {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      console.log(config);
    }
    return config;
  });

axios.interceptors.response.use(
  response => {
    console.log('interceptors: ' + response);
    let code = response.data.code;
    if (code === 4001) {
      router.push("/login");
    }
    return response;
  },
  error => {
    console.log('interceptors: ' + error);
  }
);


Vue.use(mavonEditor);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
