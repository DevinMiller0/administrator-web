import Vue from 'vue'
import Router from 'vue-router'
import index from "../components/Index";
import login from "../components/Login";
import dataStatistic from "../components/DataStatistic";
import articleManager from "../components/ArticleManager";
import home from "../components/Home";
import articlePublish from "../components/ArticlePublish";
import categoryManager from "../components/CategoryManager";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {path: '/home', component: home, name: 'home'},
        {path: '/articleManager', component: articleManager, name: 'articleManager'},
        {path: '/articlePublish', component: articlePublish, name: 'articlePublish'},
        {path: '/dataStatistic', component: dataStatistic, name: 'dataStatistic'},
        {path: '/categoryManager', component: categoryManager, name: 'categoryManager'},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
