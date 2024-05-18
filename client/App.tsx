import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { store, persistor } from './src/store';
import Navigation from './src/navigation';
import './src/localization/lang';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import AppConfig from './src/helpers/app-config';


GoogleSignin.configure({
  webClientId: AppConfig.GOOGLE_WEB_CLIENT_ID,
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
