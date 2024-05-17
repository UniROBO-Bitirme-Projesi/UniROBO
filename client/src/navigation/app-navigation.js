import * as NavigationPaths from './routes';

/* HOME */
import Dashboard from '../features/home/screens/Dashboard';
import ChatRoom from '../features/home/screens/ChatRoom';

const appRoutes = [
  {
    path: NavigationPaths.DASHBOARD,
    component: Dashboard,
  },
  {
    path: NavigationPaths.CHATROOM,
    component: ChatRoom,
  },
];

export { appRoutes };
