import * as NavigationPaths from './routes';

/* HOME */
import Login from '../features/auth/screens/Login';
import Welcome from '../features/auth/screens/Welcome';

const authRoutes = [
  {
    path: NavigationPaths.WELCOME,
    component: Welcome,
  },
  {
    path: NavigationPaths.LOGIN,
    component: Login,
  },
];

export { authRoutes };
