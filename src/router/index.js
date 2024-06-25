import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MostReadPage from '../views/MostReadPage.vue';
import DestinationPage from '../views/DestinationPage.vue';
import ArticlePage from '../views/ArticlePage.vue';
import LoginPage from '../views/LoginPage.vue';
import AdminPage from '../views/AdminPage.vue';
import ManageArticlesPage from '../views/ManageArticlesPage.vue';
import ManageDestinationsPage from '../views/ManageDestinationPage.vue';
import ManageUsersPage from '../views/ManageUsersPage.vue';
import DestinationList from '../components/DestinationList.vue';
import ArticleListDestination from "@/components/ArticleListDestination.vue";

// Use VueRouter plugin
Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/most-read', component: MostReadPage },
  { path: '/destination/:id', component: DestinationPage },
  { path: '/clanak/:id', component: ArticlePage },
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminPage },
  { path: '/admin/articles', component: ManageArticlesPage },
  { path: '/admin/destinations', component: ManageDestinationsPage },
  { path: '/admin/users', component: ManageUsersPage },
  { path: '/destinations', component: DestinationList},
  { path: '/destination/clanci/:id', component: ArticleListDestination},
];

// Create router instance
const router = new VueRouter({
  routes
});

export default router;
