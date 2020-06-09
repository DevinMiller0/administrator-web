import Vue from 'vue'
import Router from 'vue-router'
import index from "../components/index";
import login from "../components/login";
import dataStatistic from "../components/dataStatistic";
import articleManager from "../components/articleManager";
import home from "../components/home";
import articlePublish from "../components/articlePublish";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {path: '/home', component: home},
        {path: '/articleManager', component: articleManager},
        {path: '/articlePublish', component: articlePublish},
        {path: '/dataStatistic', component: dataStatistic},
        ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/articleManager',
      name: 'articleManager',
      component: articleManager,
    }
  ]
})
