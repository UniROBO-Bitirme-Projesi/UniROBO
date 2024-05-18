import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  hero: { color: '#1C1939', fontWeight: '600', fontSize: 40 },
  hero_description: {
    textAlign: 'center',
    paddingHorizontal: 40,
    color: 'rgba(26,25,57,0.8)',
    fontSize: 17,
    marginTop: 15,
    fontWeight: '500',
  },
  form: { flex: 1, marginTop: 80 },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    width: 300,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  forgot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    color: '#706E83',
  },
  button: {
    backgroundColor: '#7165E3',
    padding: 20,
    marginTop: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkbox_area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  checkbox: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(113,101,227,0.2)',
    borderWidth: 1,
    borderColor: '#7165E3',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox_text: {
    color: '#656379',
  },
  error: {
    color: 'red',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 20,
  },
  googleButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default style;
