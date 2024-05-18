import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Icon } from '../../../../assets/icon';
import { useAuth } from '../../../../../AuthContext';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import style from './styles';


const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const [_, setAuth] = useAuth();

  const handleSubmit = () => {
    const schema = Yup.object().shape({
      email: Yup.string().email('Geçersiz email adresi').required('Email adresi boş olamaz'),
      password: Yup.string().required('Şifre boş olamaz'),
    });

    schema
      .validate({ email, password }, { abortEarly: false })
      .then(() => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: name,
            });
            setAuth(true);
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('Bu email adresi kullanımda!');
            } else if (error.code === 'auth/weak-password') {
              Alert.alert('Şifren çok kısa!');
            } else if (error.code === 'auth/invalid-email') {
              Alert.alert('E-posta adresin geçersiz!');
            } else {
              console.error(error);
            }
          });
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      await auth().signInWithCredential(googleCredential);
      setAuth(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          flex: 1,
          paddingVertical: 50,
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={style.hero}>Hoşgeldiniz!</Text>
          <Text style={style.hero_description}>Lütfen kayıt bilgilerinizi giriniz</Text>
        </View>
        <View style={style.form}>
          <TextInput
            value={name}
            placeholder="İsim"
            onChangeText={setName}
            placeholderTextColor="#302D4C"
            style={style.input}
          />
          {errors.name && <Text style={style.error}>{errors.name}</Text>}
          <TextInput
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholderTextColor="#302D4C"
            style={style.input}
          />
          {errors.email && <Text style={style.error}>{errors.email}</Text>}
          <View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Şifre"
              placeholderTextColor="#302D4C"
              secureTextEntry={hidePassword}
              style={style.input}
            />
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={{ position: 'absolute', right: 15, top: 15 }}
            ></TouchableOpacity>
            {errors.password && <Text style={style.error}>{errors.password}</Text>}
          </View>
          <View style={style.checkbox_area}>
            <TouchableOpacity onPress={() => setCheckbox(!checkbox)} style={style.checkbox}>
              {checkbox && <Text style={{ fontSize: 25 }}>✓</Text>}
            </TouchableOpacity>
            <View style={{ marginLeft: 10, flex: 1, flexWrap: 'nowrap' }}>
              <Text style={style.checkbox_text}>
                Bu hesabı oluşturarak bilgilerimin KVKK kapsamında işlenmesini kabul ediyorum
              </Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={!email || !password}
            onPress={handleSubmit}
            style={style.button}
          >
            <Text style={style.button_text}>Hesabımı Oluştur</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoogleSignIn} style={[style.button, style.googleButton]}>
            <Icon.Google />
            <Text style={style.googleButtonText}>Google ile Kayıt Ol</Text>
          </TouchableOpacity>

          <View style={style.bottom}>
            <Text style={{ fontSize: 17, color: '#302D4C' }}>Zaten hesabın var mı? - </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#302D4C' }}>Oturum Aç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
