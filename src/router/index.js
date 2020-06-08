import Vue from 'vue'
import Router from 'vue-router'
import index from "../components/index";
import login from "../components/login";
import dataStatistic from "../components/dataStatistic";
import articleManager from "../components/articleManager";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/articleManager',
          name: articleManager,
          component: articleManager
        }
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
