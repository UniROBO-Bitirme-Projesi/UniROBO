import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider, { useAuth } from '../../AuthContext';
import * as NavigationPaths from './routes';
import { appRoutes } from './app-navigation';
import { authRoutes } from './auth-navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const RouteWithSubRoutes = (route, key) => {
  return (
    <Stack.Screen
      key={`${key}-nav`}
      name={route.path}
      component={route.component}
      options={route.options}
    />
  );
};

const Navigator = () => {
  const [auth, setAuth] = useAuth();
  const isLoggedIn = auth === null ? false : true;

  if (!isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={NavigationPaths.WELCOME}
      >
        {authRoutes.map((route, i) => RouteWithSubRoutes(route, i))}
      </Stack.Navigator>
    );
  }

  return <AppStackNavigator />;
};

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {appRoutes.map((route, i) => RouteWithSubRoutes(route, i))}
    </Stack.Navigator>
  );
};

const Navigation = (props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <Navigator {...props} />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Navigation;
