//import liraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/Appnav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screen/authentication/Login';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="LoginScreen"  component={Login} />
        <Stack.Screen name="HomeScreen"  component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
};

export default App;
