import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  roomList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  roomItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  roomOwner: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  roomList: {
    paddingBottom: 100,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '75%',
    marginHorizontal: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export { styles };
