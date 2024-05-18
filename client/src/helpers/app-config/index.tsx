import Config from 'react-native-config';

const AppConfig = {
  app_env: Config.ENV,
  apiUrl: `${Config.API_URL}/api/v1/`,
  GOOGLE_WEB_CLIENT_ID: Config.GOOGLE_WEB_CLIENT_ID,
};

export default AppConfig;
