import Config from 'react-native-config';

const AppConfig = {
  app_env: Config.ENV,
  apiUrl: `${Config.API_URL}/api/v1/`,
};

export default AppConfig;
