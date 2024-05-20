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

const ChatRoom = ({ route, navigation }) => {
  const { roomId } = route?.params || '';
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.dashboard);
  const { data: chatData, loading, error } = chat;
  const [text, setText] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    if (roomId) {
      socket.current = io(`https://unirobo-production.up.railway.app/ws/${roomId}`);

      socket.current.on('connect', () => {
        console.log('Socket.IO connected');
      });

      socket.current.on('message', (newMessage) => {
        console.log('Received message:', newMessage);
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
      <View style={styles.header}>
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
