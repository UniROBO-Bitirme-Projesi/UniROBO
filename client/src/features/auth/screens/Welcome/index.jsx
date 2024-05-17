import React from 'react';
import { Text, View } from 'react-native';
import * as NavigationPaths from '../../../../navigation/routes';
import { useTranslation } from 'react-i18next';

const Welcome = ({ navigation }) => {
  const { t } = useTranslation('welcome');
  return (
    <>
      <View>
        <Text style={{ color: 'red' }}>Welcome</Text>
      </View>
    </>
  );
};

export default Welcome;
