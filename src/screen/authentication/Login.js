import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Image, ScrollView} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginUser } from '../../apiservices/Apiservices';
import LaiaLogo from '../../assets/image031.png';
import Toast from 'react-native-simple-toast';
import {TostColor} from '../utils/ToastColors';
import googleAccount from '../../assets/btn_google_signin_dark_normal_web.png';
import microsoft from '../../assets/microsoft.jpg';


// import { ToastColor } from '../utils/ToastColor';
const Login = ( ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation=useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); 

  const {
    control,
    clearErrors,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    clearErrors();
    reset();
  }, [clearErrors, reset]);



  const onSignInPress = async (logindata) => {
    // AsyncStorage.removeItem('user_token');
    try {
      setLoading(true);
      var username = logindata?.username;
      var password = logindata?.password;
      const userData = { username, password };
      const result = await loginUser(userData);
      console.log("login result", result?.response.role );
      if (result?.response?.code === 200 && result?.response.role !== 'BACK OFFICE ADMIN') {
        // let rights = result?.response?.rights.toUpperCase()
        // AsyncStorage.setItem('user_token', result?.response?.Authorization);
        // AsyncStorage.setItem('rights', rights);
        // AsyncStorage.setItem('userId', result?.response?.id);
        navigation?.navigate('HomeScreen');
      } else {
        Toast.showWithGravity(
          'Check username and password',//result?.response?.error,
          Toast.LONG,
          Toast.BOTTOM,
          TostColor.ERROR
    
        );
        navigation?.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    setLoading(false);
  };

//   const handleLogin = () => {
//     // Implement your authentication logic here
//     // if (username === 'user' && password === 'pass') {
//     //   navigation.navigate('HomeScreen');
//     // } else {
//     //   Alert.alert('Invalid credentials', 'Please check your username and password');
//     // }
//     navigation.navigate('HomeScreen');
//   };

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Laia Meetings</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
    //   <Button title="Login" onPress={handleLogin} />
    // </View>
    <ScrollView style={styles.container}>
    {/* Top Container with 50% border-radius */}
    <View style={styles.topContainer}>
      <View style={styles.welcomeContainer}>
        {/* <Text style={styles.welcomeText}>Welcome to Zelo Visits</Text> */}
        {/* You can replace the image source with your actual welcome image */}
     <Image source={LaiaLogo} style={styles.welcomeImage} /> 
      </View>
    </View>

    {/* Login Page */}
    <View style={styles.loginContainer}>
      {/* <Text style={styles.title}>Sign In</Text> */}

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            label="Username"
            mode="outlined"
            style={styles.input}
            onChangeText={field.onChange}
            value={field.value}
            error={errors.username && errors.username.message}
            theme={{ roundness: 10 }} // Set roundness for rounded corners
          />
        )}
        name="username"
        rules={{
          required: 'Username is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\s*$/i,
            message: 'Invalid username',
          },
        }}
        defaultValue=""
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

      <View>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              onChangeText={field.onChange}
              value={field.value}
              error={errors.password && errors.password.message}
              theme={{ roundness: 10 }} // Set roundness for rounded corners
            />

          )}
          name="password"
          rules={{
            required: 'Password is required',
          }}
          defaultValue=""
        />
        <Icon
          name={isPasswordVisible ? 'eye' : 'eye-slash'}
          size={22}
          style={styles.iconStyleList}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      </View>
      {/* <Text style={styles.forgotPasswordText} onPress={onForgotPasswordPress}>
        Forgot Password?
      </Text> */}
      <Button mode="contained" onPress={handleSubmit(onSignInPress)} style={styles.button}>
        SIGN-IN
      </Button>
  {/* <View >
  <Svg width="50" height="50" viewBox="0 0 20 20">
      <Path
        d="M 9.503906 9.503906 L 0 9.503906 L 0 0 L 9.503906 0 Z M 9.503906 9.503906"
        fill="rgb(94.509804%,31.764706%,10.588235%)"
      />
      <Path
        d="M 20 9.503906 L 10.496094 9.503906 L 10.496094 0 L 19.996094 0 L 19.996094 9.503906 Z M 20 9.503906"
        fill="rgb(50.196078%,80%,15.686275%)"
      />
      <Path
        d="M 9.503906 20 L 0 20 L 0 10.496094 L 9.503906 10.496094 Z M 9.503906 20"
        fill="rgb(0%,67.843137%,93.72549%)"
      />
      <Path
        d="M 20 20 L 10.496094 20 L 10.496094 10.496094 L 19.996094 10.496094 L 19.996094 20 Z M 20 20"
        fill="rgb(98.431373%,73.72549%,3.529412%)"
      />
    </Svg>
    <Text style={styles.text}>Microsoft</Text>

  </View> */}
{/* <Image source={microsoft}  />
  <Image source={googleAccount} />  */}

<View style={styles.imageContainer}>
      <Image source={microsoft} style={styles.image} />
      <Image source={googleAccount} style={styles.image} />
    </View>
    
      {loading && <ActivityIndicator size="large" color="#3498db" />}
    </View>
  </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 10,
//   },
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topContainer: {
      flex: 1,
      backgroundColor: '#3498db',
      borderBottomLeftRadius: Dimensions.get('window').width / 2,
      borderBottomRightRadius: Dimensions.get('window').width / 2,
    },
    loginContainer: {
      flex: 1,
      marginTop: '10%',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      height: '100%',
      maxHeight: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      marginBottom: 8,
      position: 'relative',
      fontSize:18
    },
    errorText: {
      color: 'red',
      marginBottom: 8,
      marginLeft: 4,
    },
    button: {
      marginTop: 16,
      borderRadius: 10,
    },
    iconStyleList: {
      position: 'absolute',
      alignSelf: 'flex-end',
      color:'black',
      paddingRight:10,
      top:10,
      padding:10,
      zIndex: 1,
      // top: 10, // Adjust the top property based on your design
      // right: 10
    },
    forgotPasswordText: {
      marginTop: 5,
      textAlign: 'right',
      color: '#3498db',
      // textDecorationLine: 'underline',
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    welcomeText: {
      fontSize: 30,
      fontWeight: 'bold',
      // marginBottom: 8,
      position: 'absolute',
      // top: 5,
    },
    welcomeImage: {
      width: 200, // Adjust the width as needed
      height: 280, // Adjust the height as needed
      resizeMode: 'contain',
    },
    image: {
      width: 200, // Adjust the width as needed
      height: 200, // Adjust the height as needed
      resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'row', // Align children horizontally
        justifyContent: 'center', // Center images horizontally
        alignItems: 'center', // Center images vertically
        padding: 10,
      },
});

export default Login;
