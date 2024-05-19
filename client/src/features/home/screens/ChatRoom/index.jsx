import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../assets/icon';
import { getChat } from '../../store/dashboard';
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import { WebSocket } from 'ws';

const ChatRoom = ({ route, navigation }) => {
  const { roomId } = route?.params || '';
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.dashboard);
  const { data: chatData, loading, error } = chat;
  const [text, setText] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    if (roomId) {
      dispatch(getChat({ roomId }));
      ws.current = new WebSocket(`wss://unirobo-production.up.railway.app/ws/${roomId}`);
      ws.current.onmessage = (e) => {
        const newMessage = JSON.parse(e.data);
        dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
      };
      ws.current.onerror = (e) => {
        console.error('WebSocket Error: ', e.message);
      };
      ws.current.onclose = (e) => {
        console.log('WebSocket closed: ', e.reason);
      };
      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [roomId]);

  const handleSend = () => {
    const currentUser = auth().currentUser.uid;
    if (ws.current && text.trim().length > 0) {
      const message = { roomId, sender_id: currentUser, content: text };
      ws.current.send(JSON.stringify(message));
      setText('');
    }
  };

  const renderItem = ({ item, index }) => {
    const currentUser = auth().currentUser.uid;
    const isMyMessage = item.sender_id === currentUser;

    return (
      <View style={[styles.chatItem, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.chatMessage}>{item.content}</Text>
      </View>
    );
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft color="#292D32" />
        </TouchableOpacity>
        <View>
          <Icon.Chat />
        </View>
        <View>
          <Icon.Export />
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
      >
        <FlatList
          inverted
          data={chatData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
        />
        <View style={styles.inputArea}>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder="Yazınız..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend}>
            <Icon.Send />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;
