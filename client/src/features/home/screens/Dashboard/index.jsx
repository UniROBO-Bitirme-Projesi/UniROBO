import React from 'react';
import { Text, View } from 'react-native';
import Layout from '../../../../components/layout-auth';

const Dashboard = ({ navigation }) => {
  return (
    <Layout>
      <View>
      <Text style={{ color: 'red' }}>Dashboard</Text>
      </View>
    </Layout>
  );
};

export default Dashboard;
