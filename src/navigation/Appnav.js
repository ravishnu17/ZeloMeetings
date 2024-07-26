/* eslint-disable prettier/prettier */
//import liraries
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/authentication/Login';
import HomeScreen from '../screen/dashboard/HomeScreen';


const Stack = createNativeStackNavigator();


// create a component
const Appnav = () => {

//   const [viewStatus, setViewStatus] = useState();
//   useEffect(() => {
//     AsyncStorage.getItem('home').then(item => {
//       setViewStatus(item ? item: false);
//     });
//   }, []);

//   const handlestate = value => {
//     // return 'HomeScreen';
//     console.log("token based",value);
//     if (value) {
//       return 'HomeScreen';
//     } else {
//       return 'LoginScreen';
//     }
//   };

// initialRouteName='HomeScreen'
  return (
    <Stack.Navigator   screenOptions={{headerShown:false}} >
    <Stack.Screen name="LoginScreen"  component={Login} />
    <Stack.Screen name="HomeScreen"  component={HomeScreen} />
    </Stack.Navigator>
    
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Appnav;
