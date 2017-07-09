import { createRouter } from '@expo/ex-navigation';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import MapScreen from '../screens/MapScreen';
import PlaceScreen from '../screens/PlaceScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  login: () => LoginScreen,
  home: () => HomeScreen,
  search: () => SearchScreen,
  chat: () => ChatScreen,
  map: () => MapScreen,
  place: () => PlaceScreen,
  rootNavigation: () => RootNavigation,
}));
