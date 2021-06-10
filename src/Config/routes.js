import AboutPage from '../pages/About'
import ContactPage from '../pages/Contact'
import HomePage from '../pages/Home'
import PrivatePage from '../pages/Private'
// import Login from '../components/session/Login';

const routes = [
  {
    path: '/home',
    component: HomePage,
    isPrivate: false,
  },
  {
    path: '/about',
    component: AboutPage,
    isPrivate: false,
  },
  {
    path: '/contact',
    component: ContactPage,
    isPrivate: false,
  },
  {
    path: '/private',
    component: PrivatePage,
    isPrivate: false,
  },
//   {
//     path: '/login',
//     component: Login,
//     isPrivate: false,
//   }
];

export default routes;
