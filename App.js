//import liraries
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/Appnav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// create a component
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
 <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </GestureHandlerRootView>
   
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
export default App;
