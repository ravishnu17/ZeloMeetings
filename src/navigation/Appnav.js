import React, { createContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screen/dashboard/Dashboard';
import CalendarView from '../screen/dashboard/CalendarVIew';
import Rooms from '../screen/dashboard/Rooms';
import Report from '../screen/dashboard/Report';
import Menu from '../screen/dashboard/Menu';
import HeadBar from '../screen/HeadBar';
import Footer from '../screen/Footer';
import { StyleSheet, View } from 'react-native';
import AddBooking from '../screen/dashboard/AddBooking';
import Profile from '../screen/dashboard/Profile';

const Stack = createNativeStackNavigator();
export const context = createContext();
// create a component
const Appnav = () => {
  const [active, setActive] = useState(1);
  const [pre, setPre]= useState({id: 1, name: 'Dashboard'});
  return (
    <View style={styles.container}>
      <HeadBar index={active} setActive={setActive} preState={pre} />
      <View style={styles.content}>
        <context.Provider value={{ active, setActive, pre, setPre }}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='DashboardScreen' >
            <Stack.Screen name="DashboardScreen" component={Dashboard} />
            <Stack.Screen name="CalendarScreen" component={CalendarView} />
            <Stack.Screen name="RoomScreen" component={Rooms} />
            <Stack.Screen name="ReportScreen" component={Report} />
            <Stack.Screen name="MenuScreen" component={Menu} />
            <Stack.Screen name="AddBooking" component={AddBooking} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </context.Provider>
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
