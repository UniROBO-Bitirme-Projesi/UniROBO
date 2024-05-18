import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontFamily: 'Nunito',
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 31.37,
    textAlign: 'center',
    color: '#262E58',
  },
  subtitle: {
    fontFamily: 'Nunito',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20.46,
    textAlign: 'center',
    color: '#757575',
  },
  button: {
    backgroundColor: '#262E58',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 21,
    marginBottom: 34,
    borderRadius: 30,
  },
  buttonTxt: {
    fontFamily: 'Nunito',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 25.92,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default styles;
