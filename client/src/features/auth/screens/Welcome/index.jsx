import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as NavigationPaths from '../../../../navigation/routes';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { Icon } from '../../../../assets/icon';

const Welcome = ({ navigation }) => {
  const { t } = useTranslation('welcome');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>UNIROBO</Text>
          <Text style={styles.subtitle}>Bilgiye Yolculukta Akıllı Yoldaşınız</Text>
        </View>
        <View>
          <Icon.Welcome />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationPaths.LOGIN)}
          style={styles.button}
        >
          <Text style={styles.buttonTxt}>Devam</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
