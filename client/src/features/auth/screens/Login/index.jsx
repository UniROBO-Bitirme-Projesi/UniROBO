import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as NavigationPaths from '../../../../navigation/routes';
import { Icon } from '../../../../assets/icon';
import { useAuth } from '../../../../../AuthContext';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import style from './styles';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

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
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setAuth(true);
          })
          .catch((error) => {
            if (error.code === 'auth/wrong-password') {
              alert('Wrong Password');
              return;
            }
            if (error.code === 'auth/user-not-found') {
              alert('User Not Found');
              return;
            }
            console.error(error);
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
          flexDirection: 'column',
          paddingVertical: 50,
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={style.hero}>Tekrar Hoşgeldin!</Text>
          <Text style={style.hero_description}>Devam etmek için oturum açın</Text>
        </View>
        <View style={style.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
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
              style={{ position: 'absolute', right: 15, top: 20 }}
            >
              {hidePassword ? <Icon.EyeOn color="black" /> : <Icon.EyeOff color="black" />}
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={style.error}>{errors.password}</Text>}
          <TouchableOpacity style={style.forgot}>
            <Text>Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={style.button}>
            <Text style={style.button_text}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoogleSignIn} style={[style.button, style.googleButton]}>
            <Icon.Google />
            <Text style={style.googleButtonText}>Google ile Oturum Aç</Text>
          </TouchableOpacity>

          <View style={style.bottom}>
            <Text style={{ fontSize: 17, color: '#302D4C' }}>Hesabınız yok mu? - </Text>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationPaths.REGISTER)}>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#302D4C' }}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
