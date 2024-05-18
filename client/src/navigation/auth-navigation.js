import * as NavigationPaths from './routes';

/* HOME */
import Login from '../features/auth/screens/Login';
import Welcome from '../features/auth/screens/Welcome';
import Register from '../features/auth/screens/Register';

const authRoutes = [
  {
    path: NavigationPaths.WELCOME,
    component: Welcome,
  },
  {
    path: NavigationPaths.LOGIN,
    component: Login,
  },
  {
    path: NavigationPaths.REGISTER,
    component: Register,
  },
];

export { authRoutes };
