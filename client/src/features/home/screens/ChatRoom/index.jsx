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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../assets/icon';
import auth from '@react-native-firebase/auth';
import io from 'socket.io-client';
import { styles } from './styles';

const ChatRoom = ({ route, navigation }) => {
  const { roomId } = route?.params || '';
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.dashboard);
  const { data: chatData, loading, error } = chat;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(chatData || []); // Local state to handle messages if not using Redux for it
  const socket = useRef(null);

  useEffect(() => {
    if (roomId && !socket.current) {
      socket.current = io(`https://unirobo-production.up.railway.app/ws/${roomId}`);

      socket.current.on('connect', () => {
        console.log('Socket.IO connected');
      });

      socket.current.on('message', (newMessage) => {
        console.log('Received message:', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.current.on('error', (error) => {
        console.error('Socket.IO Error:', error);
      });

      socket.current.on('disconnect', () => {
        console.log('Socket.IO disconnected');
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [roomId]);

  const handleSend = () => {
    const currentUser = auth().currentUser.uid;
    if (socket.current && text.trim().length > 0) {
      const message = { roomId, sender_id: currentUser, content: text };
      socket.current.emit('message', message);
      setText('');
    }
  };

  const renderItem = ({ item }) => {
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
          <Icon.ArrowLeft />
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
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.message_id.toString()}
          contentContainerStyle={styles.chatList}
        />
        <View style={styles.inputArea}>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder="Type your message..."
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
