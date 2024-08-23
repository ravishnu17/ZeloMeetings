import React, { createContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screen/dashboard/Dashboard';
import CalendarView from '../screen/dashboard/CalendarView';
import Rooms from '../screen/dashboard/Rooms';
import Report from '../screen/dashboard/Report';
import Menu from '../screen/dashboard/Menu';
import HeadBar from '../screen/HeadBar';
import Footer from '../screen/Footer';
import { StyleSheet, View } from 'react-native';
import AddBooking from '../screen/dashboard/AddBooking';
import Profile from '../screen/dashboard/Profile';
import PrivacyPolicy from '../screen/dashboard/PrivacyPolicy';
import ContactUs from '../screen/dashboard/ContactUs';
import Feedback from '../screen/dashboard/Feedback';
import LoadingIndicator from '../screen/LoadingIndicator';
import EditBooking from '../screen/dashboard/EditBooking';
import { translation } from '../Languages/translate';
import QRScanner from '../screen/dashboard/QRScanner';
import Pincheckin from '../screen/dashboard/Pincheckin';

const Stack = createNativeStackNavigator();
export const context = createContext();
// create a component
const Appnav = () => {
  const [active, setActive] = useState(1);
  const [pre, setPre] = useState();
  const [headerProps, setHeaderProps] = useState(); // used for room filters & update language 
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState();
  
  const getTranslation = async () => {
    setLanguage((await translation()).data);
  }

  useEffect(() => {
    getTranslation();
  }, [headerProps?.language])

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator />}
      <context.Provider value={{ active, setActive, pre, setPre, headerProps, setHeaderProps, loading, setLoading, language}}>
        <HeadBar />
        <View style={styles.content}>
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="DashboardScreen" component={Dashboard} />
            <Stack.Screen name="QrCodeScanner" component={QRScanner} />
            <Stack.Screen name="PinCheckIn" component={Pincheckin} />
            <Stack.Screen name="CalendarScreen" component={CalendarView} />
            <Stack.Screen name="RoomScreen" component={Rooms} />
            <Stack.Screen name="ReportScreen" component={Report} />
            <Stack.Screen name="MenuScreen" component={Menu} />
            <Stack.Screen name="AddBooking" component={AddBooking} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="EditBooking" component={EditBooking} />
          </Stack.Navigator>
        </View>
        <Footer />
      </context.Provider>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Appnav;
