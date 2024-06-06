import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Swipeable, TapGestureHandler, State } from 'react-native-gesture-handler';
import * as NavigationPaths from '../../../../navigation/routes';
import { firebase } from '@react-native-firebase/auth';
import { deleteRoom, getRoom } from '../../store/dashboard';
import { Icon } from '../../../../assets/icon';
import { styles } from './styles';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.dashboard);
  const { data: roomsData, loading } = rooms;
  const swipeableRefs = useRef(new Map());
  const [isSwiping, setIsSwiping] = useState(false);

  const user = firebase?.auth()?.currentUser;

  useEffect(() => {
    dispatch(getRoom({ owner_id: user?.uid }));

    const interval = setInterval(() => {
      dispatch(getRoom({ owner_id: user?.uid }));
    }, 4000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleRoomPress = (roomId) => {
    if (!isSwiping) {
      navigation.navigate(NavigationPaths.CHATROOM, { roomId });
    }
  };

  const handleDeleteRoom = async (room_id) => {
    const swipeable = swipeableRefs.current.get(room_id);
    if (swipeable) {
      swipeable.close();
    }
    dispatch(
      deleteRoom({
        roomId: room_id,
        callback: () => {
          dispatch(getRoom({ owner_id: user?.uid }));
        },
      }),
    );
  };

  const renderRightActions = (room_id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRoom(room_id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      ref={(ref) => {
        if (ref) {
          swipeableRefs.current.set(item.room_id, ref);
        } else {
          swipeableRefs.current.delete(item.room_id);
        }
      }}
      renderRightActions={() => renderRightActions(item.room_id)}
      onSwipeableWillOpen={() => {
        setIsSwiping(true);
        swipeableRefs.current.forEach((ref, key) => {
          if (key !== item.room_id && ref) {
            ref.close();
          }
        });
      }}
      onSwipeableWillClose={() => {
        setIsSwiping(false);
      }}
    >
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleRoomPress(item.room_id);
          }
        }}
      >
        <View style={styles.roomItem}>
          <Text style={styles.roomName}>{item.room_name}</Text>
        </View>
      </TapGestureHandler>
    </Swipeable>
  );

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
        <TouchableOpacity >
          <Icon.ArrowLeft color="" />
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
          renderItem={renderItem}
          keyExtractor={(item) => item.room_id.toString()}
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
