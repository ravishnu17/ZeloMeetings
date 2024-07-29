//import liraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Appnav from './src/navigation/Appnav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screen/authentication/Login';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginScreen' >
        <Stack.Screen name="LoginScreen"  component={Login} />
        <Stack.Screen name="HomeScreen"  component={Appnav} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
};

export default App;
