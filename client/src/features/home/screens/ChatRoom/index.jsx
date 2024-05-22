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
  const [messages, setMessages] = useState(chatData || []);
  const socket = useRef(null);

  console.log(socket);
  useEffect(() => {
    if (!socket.current) {
      socket.current = io('https://unirobo-production.up.railway.app', {
        transports: ['websocket'],
        query: { roomId },
      });

      socket.current.on('connect', () => {
        console.log('Connected to socket server');
      });

      socket.current.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [roomId]);

  const handleSend = () => {
    if (socket.current && text) {
      socket.current.emit('message', { roomId, text });
      setText('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
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
