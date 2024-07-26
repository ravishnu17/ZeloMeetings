import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { BottomNavigation, Icon } from 'react-native-paper';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import Rooms from './Rooms';
import Report from './Report';
import Profile from './Profile';

const HomeScreen = () => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Dashboard', focusedIcon: 'home' },
    { key: 'calendar', title: 'Calendar', focusedIcon: 'calendar' },
    { key: 'rooms', title: 'Rooms', focusedIcon: 'door' },
    { key: 'report', title: 'Report', focusedIcon: 'alert' },
    { key: 'profile', title: '...', focusedIcon: 'dots-horizontal' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: Dashboard,
    calendar: Calendar,
    rooms: Rooms,
    report: Report,
    profile: Profile
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header backgroundColor='#035676' statusBarProps={{ barStyle: 'light-content', backgroundColor: '#034a66' }}
        centerComponent={
          <View style={styles.logoView}>
            <Image source={require('../../assets/zelo_logo.png')} style={styles.logo} />
          </View>
        }
        rightComponent={
          <View style={styles.header_container}>
            <TouchableOpacity>
              <Image source={require('../../assets/passcode.png')} style={styles.passcode} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Icon
                source="qrcode"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Bottom Navigation */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}

        barStyle={{ backgroundColor: '#035676', padding: 0, zIndex: 1 }}
        activeIndicatorStyle={{ backgroundColor: 'transparent' }}
        activeColor='#fff'
        inactiveColor='#1586b3'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
  },
  // header
  header_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  title: {
    fontSize: 20,
  },
  logoView: {
    backgroundColor: '#fff',
    padding: 3
  },
  logo: {
    width: 140,
    height: 40,
  },
  passcode: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  qr: {
    width: 25,
    height: 25
  }
});

export default HomeScreen;
