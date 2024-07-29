import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screen/dashboard/Dashboard';
import CalendarView from '../screen/dashboard/CalendarVIew';
import Rooms from '../screen/dashboard/Rooms';
import Report from '../screen/dashboard/Report';
import Profile from '../screen/dashboard/Profile';
import HeadBar from '../screen/HeadBar';
import Footer from '../screen/Footer';
import { StyleSheet, View } from 'react-native';
import AddBooking from '../screen/dashboard/AddBooking';

const Stack = createNativeStackNavigator();

// create a component
const Appnav = () => {
  const [active, setActive] = useState(1);
  return (
    <View style={styles.container}>
      <HeadBar index={active} />
      <View style={styles.content}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='DashboardScreen' >
          <Stack.Screen name="DashboardScreen" component={Dashboard} />
          <Stack.Screen name="CalendarScreen" component={CalendarView} />
          <Stack.Screen name="RoomScreen" component={Rooms} />
          <Stack.Screen name="ReportScreen" component={Report} />
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="AddBooking"  component={AddBooking} />
        </Stack.Navigator>
      </View>
      <Footer active={active} setActive={setActive} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  }
});

export default Appnav;
