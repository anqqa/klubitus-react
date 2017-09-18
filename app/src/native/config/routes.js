import EventsScreen from '../components/events';
import ForumScreen from '../components/forum';


const Routes = {
  Events: {
    path:   'events',
    screen: EventsScreen,
  },
  Forum: {
    path:   'forum',
    screen: ForumScreen,
  },
/*
  Galleries: {
    path: 'galleries',
    screen: ForumScreen
  },
  Profile: {
    path: 'profile',
    screen: ForumScreen
  },
  More: {
    path: 'more',
    screen: ForumScreen
  },
  */
};


export default Routes;
