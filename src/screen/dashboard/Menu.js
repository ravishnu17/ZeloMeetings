import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-paper'
import { context } from '../../navigation/Appnav'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginHomeAccess } from '../../apiservices/Apiservices';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';

const Menu = () => {
  const navigation = useNavigation();
  const props = useContext(context);
  const isFocus = useIsFocused();

  // Use states
  const [userData, setUserData]= useState();

  const handleClick = (to) => {
    props?.setPre({ id: 5, name: 'MenuScreen' });
    props?.setActive(to.id);
    navigation.navigate(to.name);
  };
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            props?.setActive(1);
            props?.setHeaderProps({});
            AsyncStorage.clear();
            navigation.navigate('LoginScreen');
          }
        }
      ],
      { cancelable: false }
    );
  }

  // get user 
  const getUserData = async () => {
    props?.setLoading(true);
    let userId = await AsyncStorage.getItem('userId');
    loginHomeAccess(userId).then(res =>{
      if (res?.status){
        setUserData(res);
      }else{
        console.log("Error user data", res);
        Toast.showWithGravity(
          res?.information?.description,
          Toast.SHORT,
          ToastColor.ERROR
        )
      }
    }).finally(() => {
      props?.setLoading(false);
    })
  }

  useEffect(() => {
    if (isFocus) {
      props?.setPre();
      getUserData();
    }
  }, [isFocus, props?.headerProps?.language]);
  return (
    <ScrollView style={styles.container}>
      <View style={{ ...styles.card, marginBottom: 20, paddingVertical: 7 }}>
        <Image style={styles.img} source={userData?.user?.profileImg ? { uri: userData?.user?.profileImg } : require('../../assets/user.png')} />

        <View style={{ rowGap: 6 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{userData?.user?.firstName}</Text>
          <Text style={{ fontSize: 14 }}>{userData?.user?.role?.role}</Text>
          <Text style={{ fontWeight: '400' }}>{userData?.user?.email}</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end', alignSelf: 'flex-end' }}>
          <Icon
            source="email-outline"
            size={25}
            color="#000"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.card} onPress={() => handleClick({ id: 6, name: 'Profile' })}>
        <Text style={styles.title}>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleClick({ id: 7, name: 'PrivacyPolicy' })}>
        <Text style={styles.title}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleClick({ id: 8, name: 'ContactUs' })}>
        <Text style={styles.title}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleClick({ id: 9, name: 'Feedback' })}>
        <Text style={styles.title}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={logout}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  card: {
    flexDirection: 'row',
    columnGap: 20,
    marginBottom: 7,
    padding: 7,
    paddingVertical: 18,
    alignItems: 'center',

    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#e4e4e4b0',
    borderWidth: 0.4,
    shadowColor: "#303030",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,

  },
  img: {
    width: '18%',
    height: 65,
    borderRadius: 60,
    marginLeft: 5
  },
  title: {
    // fontSize:15,
    // color:'#a7a7a7'
  }
})

export default Menu
