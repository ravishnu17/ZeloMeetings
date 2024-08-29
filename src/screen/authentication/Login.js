import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Image, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

import { loginUser, mslogin } from '../../apiservices/Apiservices';
import LaiaLogo from '../../assets/zelo_logo.png';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';
import m_logo from '../../assets/M_logo.png';
import g_logo from '../../assets/google_logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translation } from '../../Languages/translate';

import { authorize } from 'react-native-app-auth';
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI, MICROSOFT_CLIENT_ID, MICROSOFT_REDIRECT_URI, SCOPE } from '../utils/Utils';
import axios from 'axios';
import LoadingIndicator from '../LoadingIndicator';
import HeadBar from '../HeadBar';

const Login = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [translate, setTranslate] = useState();
    const [language, setLanguage] = useState();
    const isFocus = useIsFocused();

    const { control, clearErrors, reset, handleSubmit, formState: { errors } } = useForm();

    const getTranslate = async () => {
        setLanguage(await AsyncStorage.getItem('language') || 'en');
        setTranslate((await translation()).data);
    }

    const onPressMicrosoftLogin = async () => {
        setLoading(true);
        const config = {
            issuer: 'https://login.microsoftonline.com/common',
            clientId: MICROSOFT_CLIENT_ID,
            redirectUrl: MICROSOFT_REDIRECT_URI,
            scopes: SCOPE,
            serviceConfiguration: {
                authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
                tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                revocationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
            },
            useNonce: true,
            usePKCE: true, //For iOS, we have added the useNonce and usePKCE parameters, which are recommended for security reasons.
            additionalParameters: {
                prompt: 'consent',
            },
        };

        try {
            // Log in to get an authentication token
            const result = await authorize(config);

            //   Get the user's profile
            const userData = await axios({
                method: 'get',
                url: 'https://graph.microsoft.com//oidc/userinfo',
                headers: {
                    Authorization: `Bearer ${result.accessToken}`,
                },
            });
            // Check Email with zelo
            if (userData.data?.email) {
                checkEmail(userData.data?.email);
            } else {
                setLoading(false);
                Toast.showWithGravity(
                    'Microsoft Login Failed',
                    Toast.SHORT,
                    Toast.BOTTOM,
                    ToastColor.ERROR
                )
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
            Toast.showWithGravity(
                'Microsoft Login Failed',
                Toast.SHORT,
                Toast.BOTTOM,
                ToastColor.ERROR                
            )
        }
    };

    const onPressGoogleLogin = async () => {
        setLoading(true);
        const config = {
            issuer: 'https://accounts.google.com',
            clientId: GOOGLE_CLIENT_ID,
            redirectUrl: GOOGLE_REDIRECT_URI,
            scopes: SCOPE,
        };

        try {
            // Log in to get an authentication token
            const authState = await authorize(config);
            // Get the user's profile
            const userData = await axios({
                method: 'get',
                url: 'https://www.googleapis.com/oauth2/v3/userinfo',
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                },
            });
            // Check Email with zelo
            if (userData.data?.email) {
                checkEmail(userData.data?.email);
            } else {
                setLoading(false);
                Toast.showWithGravity(
                    'Google Login Failed',
                    Toast.SHORT,
                    Toast.BOTTOM,
                    ToastColor.ERROR
                )
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
            Toast.showWithGravity(
                'Google Login Failed',
                Toast.SHORT,
                Toast.BOTTOM,
                ToastColor.ERROR
            )
        }
    };

    const checkEmail = (email) => {
        setLoading(true);
        mslogin(email).then((result) => {
            if (result?.status) {
                let rights = result?.response?.rights.toUpperCase()
                AsyncStorage.setItem('user_token', result?.response?.Authorization);
                AsyncStorage.setItem('language', language);
                AsyncStorage.setItem('rights', rights);
                AsyncStorage.setItem('userId', result?.response?.id);
                navigation?.navigate('HomeScreen');
            } else {
                Toast.showWithGravity(
                    translate?.LOGINGPAGE?.THELOGINDETAILSAREINCORRECT,
                    Toast.LONG,
                    Toast.BOTTOM,
                    ToastColor.ERROR
                )
            }
        }).catch(error => {
            console.log("Error user data", error);
            Toast.showWithGravity(
                translate?.LOGINGPAGE?.THELOGINDETAILSAREINCORRECT,
                Toast.LONG,
                Toast.BOTTOM,
                ToastColor.ERROR
            )
        }).finally(() => {
            setLoading(false);
        })
    }

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
                let rights = result?.response?.rights.toUpperCase()
                AsyncStorage.setItem('user_token', result?.response?.Authorization);
                AsyncStorage.setItem('language', language);
                AsyncStorage.setItem('rights', rights);
                AsyncStorage.setItem('userId', result?.response?.id);
                navigation?.navigate('HomeScreen');
            } else {
                Toast.showWithGravity(
                    translate?.LOGINGPAGE?.THELOGINDETAILSAREINCORRECT,
                    Toast.LONG,
                    Toast.BOTTOM,
                    ToastColor.ERROR

                );
                navigation?.navigate('LoginScreen');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        setLoading(false);
    };

    const ChangeLanguage = (language) => {
        setLanguage(language);
        AsyncStorage.setItem('language', language);
        getTranslate();
    }

    useEffect(() => {
        clearErrors();
        reset();
    }, [clearErrors, reset]);

    useEffect(() => {
        if (isFocus)
            getTranslate();
    }, [isFocus]);

    // // check async storage for user token if exist move to home screen
    // useEffect(() => {
    //     AsyncStorage.getItem('user_token').then((value) => {
    //         if (value) {
    //             navigation?.navigate('HomeScreen');
    //         }
    //     });
    // }, []);

    return (
        <View style={styles.container}>
            {loading && <LoadingIndicator />}
            <HeadBar route='login' handleLanguage={ChangeLanguage} />
            <ScrollView>
                {/* Top Container with 50% border-radius */}
                <View style={styles.topContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image source={LaiaLogo} style={styles.welcomeImage} />
                    </View>
                </View>

                {/* Login Page */}
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Sign In</Text>

                    <Controller
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label={translate?.LOGINGPAGE?.EMAIL}
                                mode="outlined"
                                style={styles.input}
                                onChangeText={field.onChange}
                                value={field.value}
                                error={errors.username && errors.username.message}
                                theme={{ roundness: 20 }} // Set roundness for rounded corners
                            />
                        )}
                        name="username"
                        rules={{
                            required: translate?.LOGINGPAGE?.EMAILIDISREQUIRED,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\s*$/i,
                                message: translate?.LOGINGPAGE?.INVALIDEMAILID,
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
                                    label={translate?.LOGINGPAGE?.PASSWORD}
                                    mode="outlined"
                                    secureTextEntry={!isPasswordVisible}
                                    style={styles.input}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    error={errors.password && errors.password.message}
                                    theme={{ roundness: 20 }} // Set roundness for rounded corners
                                />

                            )}
                            name="password"
                            rules={{
                                required: translate?.LOGINGPAGE?.PASSWORDISREQUIRED,
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
                    <Button mode="contained" buttonColor='#64b15d' onPress={handleSubmit(onSignInPress)} style={styles.button}>
                        {translate?.LOGINGPAGE?.SIGNIN}
                    </Button>

                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            style={[styles.imageWrapper,{backgroundColor: '#3B5998'}]}
                            onPress={onPressMicrosoftLogin}>
                            <Image source={m_logo} style={styles.authIcon} />
                            <Text style={styles.text}>Microsoft</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.imageWrapper,{backgroundColor: '#4285F4'}]}
                            onPress={onPressGoogleLogin}>
                            <Image source={g_logo} style={styles.authIcon} />
                            <Text style={styles.text}>Google</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#fff'
    },
    topContainer: {
        flex: 1,
        backgroundColor: '#3498db',
        borderBottomLeftRadius: Dimensions.get('window').width / 2,
        borderBottomRightRadius: Dimensions.get('window').width / 2,
    },
    loginContainer: {
        flex: 1,
        marginTop: '15%',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 8,
        position: 'relative',
        fontSize: 18,
        backgroundColor: '#fff',
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
    welcomeImage: {
        width: 200, // Adjust the width as needed
        height: 280, // Adjust the height as needed
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        marginTop: 20,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 3,
        padding: 2,
        shadowColor: '#000000',  // Shadow color
        shadowOffset: { width: 0, height: 2 },  // Shadow offset
        shadowOpacity: 0.2,  // Shadow opacity
        shadowRadius: 5,  // Shadow radius
        elevation: 3,  // Elevation for Android
    },
    authIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',  // Text color
        fontWeight: 'bold',
        marginRight: 10,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#00000060',
    },
    modalContainer: {
        // height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 3,
        padding: 30
    },
    modelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        padding: 10,
        marginBottom: 10,
    },
    modelImg: {
        width: 70,
        height: 40
    }

});

export default Login;
