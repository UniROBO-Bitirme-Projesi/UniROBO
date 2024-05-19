import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  roomList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
    alignItems: 'flex-start',
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomOwner: {
    fontSize: 12,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#7165E3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  chatList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  chatEmpty: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    width: '80%',
  },
  chatItem: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 22,
    borderRadius: 25,
    marginVertical: 18,
    marginHorizontal: 10,
    width: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    backgroundColor: '#ECECEC',
  },
  chatMessage: {
    fontSize: 16,
    color: '#333',
  },
  chatSender: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 30,
    padding: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    height: 20,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    color: 'black',
    borderRadius: 5,
  },
  exampleMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exampleMessageList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exampleMessageItem: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 30,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  exampleMessageText: {
    fontSize: 16,
    color: '#333',
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export { styles };
