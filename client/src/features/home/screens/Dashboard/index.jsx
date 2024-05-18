import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{ color: 'red' }}>Dashboard</Text>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
