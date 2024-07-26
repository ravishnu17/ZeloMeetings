import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Image, ScrollView, Linking } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

import { loginUser } from '../../apiservices/Apiservices';
import LaiaLogo from '../../assets/image031.png';
import Toast from 'react-native-simple-toast';
import { TostColor } from '../utils/ToastColors';
import m_logo from '../../assets/M_logo.png';
import g_logo from '../../assets/google_logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const microsoftLoginUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=service%3A%3Aaccount.microsoft.com%3A%3AMBI_SSL+openid+profile+offline_access&response_type=code&client_id=81feaced-5ddd-41e7-8bef-3e20a2689bb7&redirect_uri=https%3A%2F%2Faccount.microsoft.com%2Fauth%2Fcomplete-signin-oauth&client-request-id=2a6c9fa8-ca32-4061-a5c3-d28ec17177d3&x-client-SKU=MSAL.Desktop&x-client-Ver=4.61.3.0&x-client-OS=Windows+Server+2019+Datacenter&prompt=login&client_info=1&state=H4sIAAAAAAAEAAXBy6JCQAAA0H9pa4FkmEULlAnJzSvsyMxg8iiv8vX3nJ2F1PmnVFmwgHvOJ_Xh2UUc_4l7ODgLo4sFC4GWZEOqX8xrPAme8s0_LAaUYWexfsMMZDKQBOBX0bAQf-cB5NLhMXYxT2UAfBFXqjkKlKHlnHmjkOp9deVgZD_sv7RMulif_RRS6MzCVqZSPxRYD4zX5JBa23Tea5s6SiqOJ_RlIjH_Jf5ACOspuRjrxuZEbmpDy0au23CvFoul8Gi19p4pRZ4JBXVfgxs60xTXT1scDYYyk7Sl2FSoKnCbCHrO8Yhjxkl-XgO3zG9UnJTbtFlhSqThLbYs1C58GqubroWnzcQItu4yQrcmH_1h3x0gL1CurPeK7MAmZV6Urbsej7t_B3E1NVoBAAA&msaoauth2=true&lc=2057';


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


    const onPressMicrosoftLogin = () => {
        console.log("microsoft login url");
        Linking.openURL(microsoftLoginUrl);
    };

    const onPressGoogleLogin = () => {
        console.log("google login url");
    };


    const onSignInPress = async (logindata) => {
        // AsyncStorage.removeItem('user_token');
        try {
            setLoading(true);
            var username = logindata?.username;
            var password = logindata?.password;
            const userData = { username, password };
            const result = await loginUser(userData);
            console.log("login result", result?.response.role);
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



    return (

        <ScrollView style={styles.container}>
            {/* Top Container with 50% border-radius */}
            <View style={styles.topContainer}>
                <View style={styles.welcomeContainer}>

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


                <View style={styles.imageContainer}>
                   
                  {/* <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={onPressMicrosoftLogin}>
                    <Image source={m_logo} style={styles.image} />
                    <Text style={styles.text}>Microsoft</Text>
                    </TouchableOpacity> */}

<TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={onPressMicrosoftLogin}>
                    <Image source={m_logo} style={styles.image} />
                    <Text style={styles.text}>Microsoft</Text>
                    </TouchableOpacity>


                    {/* <View style={styles.imageWrapper}>
                        <Image source={g_logo} style={styles.image} />
                        <Text style={styles.text}>Google</Text>
                    </View> */}
                 <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={onPressGoogleLogin}>
                    <Image source={g_logo} style={styles.image} />
                    <Text style={styles.text}>Google</Text>
                    </TouchableOpacity>

                </View>

                {loading && <ActivityIndicator size="large" color="#3498db" />}
            </View>
        </ScrollView>
    );
};

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
        fontSize: 18
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
        marginLeft: 4,
    },
    button: {
        marginTop: 16,
        borderRadius: 20,
        // padding:20,
    },
    iconStyleList: {
        position: 'absolute',
        alignSelf: 'flex-end',
        color: 'black',
        paddingRight: 10,
        top: 10,
        padding: 10,
        zIndex: 1,
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
    // imageContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     width: '100%',
    //     // padding: 20,
    // },
    // imageWrapper: {
    //     marginTop: 10,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginHorizontal: 10,
    // },
    // image: {
    //     width: 50,
    //     height: 50,
    //     marginRight: 10,
    // },
    // text: {
    //     fontSize: 16,
    // },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding:5,  // Optional: Add padding to the container
        marginTop: 10,
    },
    imageWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: '#f8f8f8',  // Background color for the card
        // borderRadius: 10,  // Rounded corners
        // padding: 10,  // Space inside the card
        shadowColor: '#000',  // Shadow color
        shadowOffset: { width: 0, height: 2 },  // Shadow offset
        shadowOpacity: 0.2,  // Shadow opacity
        shadowRadius: 5,  // Shadow radius
        elevation: 3,  // Elevation for Android
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize:18,
        color: '#333',  // Text color
        fontWeight: 'bold',
        marginRight:10,
    },


});

export default Login;
