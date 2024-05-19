import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as NavigationPaths from '../../../../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../assets/icon';
import { getRoom } from '../../store/dashboard';
import { styles } from './styles';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.dashboard);
  const { data: roomsData, loading } = rooms;

  useEffect(() => {
    dispatch(getRoom());
  }, []);

  const handleRoomPress = (roomId) => {
    navigation.navigate(NavigationPaths.CHATROOM, { roomId });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View
        style={{
          height: 52,
          marginBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#ECECEC',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity style={{}}>
          <Icon.ArrowLeft color="white" />
        </TouchableOpacity>
        <View>
          <Icon.Chat />
        </View>
        <View>
          <Icon.Export />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={roomsData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRoomPress(item.room_id)} style={styles.roomItem}>
              <Text style={styles.roomName}>{item.room_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.roomList}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate(NavigationPaths.CHATROOM)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
