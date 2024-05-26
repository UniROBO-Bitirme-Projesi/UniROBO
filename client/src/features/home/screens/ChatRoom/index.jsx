import React, { useState, useEffect, useRef, memo } from 'react';
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
import { createRoom, getChat, sendMessage, setChat } from '../../store/dashboard';
import { styles } from './styles';

const categories = [
  {
    id: '1',
    title: 'Açıkla',
    icon: <Icon.Desc />,
    questions: ['Kuantum Fiziğini Açıkla', 'Solucan delikleri nedir?'],
  },
  {
    id: '2',
    title: 'Üret & Düzenle',
    icon: <Icon.Edit />,
    questions: [
      'Küresel ısınma hakkında makale yaz',
      'Çiçekler ve aşk hakkında bir şiir yaz',
      'Programlama hakkında bir rap şarkısı yaz',
    ],
  },
  {
    id: '3',
    title: 'Çeviri',
    icon: <Icon.Translate />,
    questions: ['Korece ´bugün nasılsın´ nasıl söylenir?'],
  },
];

const ChatRoom = ({ route, navigation }) => {
  const roomId = route?.params?.roomId;
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom

  const { chat } = useSelector((state) => state.dashboard);
  const { data: chatData, loading, error } = chat;
  const [newRoom, setNewRoom] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(setChat());
    if (roomId) {
      dispatch(getChat({ roomId }));
    }
  }, [roomId]);

  useEffect(() => {
    if (chatData && chatData.length > 0 && isAtBottom) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (roomId || newRoom) {
        dispatch(getChat({ roomId: roomId || newRoom }));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [roomId, newRoom]);

  const handleSend = () => {
    if (roomId || newRoom) {
      if (text.length > 3) {
        dispatch(sendMessage({ roomId: roomId || newRoom, content: text, sender_id: '12' }));
        setText('');
        setTimeout(() => {
          dispatch(getChat({ roomId: roomId || newRoom }));
        }, 500);
      }
    } else {
      dispatch(
        createRoom({
          roomName: text,
          callback: (res) => {
            setNewRoom(res?.room_id);
            dispatch(sendMessage({ roomId: res?.room_id, content: text, sender_id: '12' }));
            setText('');
            setTimeout(() => {
              dispatch(getChat({ roomId: res?.room_id }));
            }, 500);
          },
        }),
      );
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
    setIsAtBottom(isBottom);
  };

  const ChatMessage = memo(({ item }) => {
    const isMyMessage = item.sender_id !== 'ChatGPT';
    return (
      <View style={[styles.chatItem, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.chatMessage}>{item.content}</Text>
      </View>
    );
  });

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
        {chatData && chatData.length === 0 ? (
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <View style={styles.categoryContainer}>
                <View style={styles.categoryHeader}>
                  {item.icon}
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </View>
                <FlatList
                  data={item.questions}
                  renderItem={({ item: question, index }) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setText(question)}
                      style={styles.exampleMessageItem}
                    >
                      <Text style={styles.exampleMessageText}>{question}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.exampleMessageList}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatEmpty}
          />
        ) : (
          <FlatList
            ref={flatListRef}
            data={chatData}
            renderItem={({ item }) => <ChatMessage item={item} />}
            keyExtractor={(item) => item.message_id.toString()}
            contentContainerStyle={styles.chatList}
            onScroll={handleScroll}
            onContentSizeChange={() =>
              isAtBottom && flatListRef.current.scrollToEnd({ animated: true })
            }
            onLayout={() => isAtBottom && flatListRef.current.scrollToEnd({ animated: true })}
          />
        )}
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
