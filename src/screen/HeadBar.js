import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-paper';


const HeadBar = ({ index }) => {

  return (
    <View>
      <Header backgroundColor='#035676' statusBarProps={{ barStyle: 'light-content', backgroundColor: '#034a66' }}
        centerComponent={
          <View style={styles.logoView}>
            <Image source={require('../assets/zelo_logo.png')} style={styles.logo} />
          </View>
        }
        rightComponent={
          <View style={styles.header_container}>
            {
              index === 1 &&
              <>
                <TouchableOpacity>
                  <Image source={require('../assets/passcode.png')} style={styles.passcode} />
                </TouchableOpacity>
                <TouchableOpacity >
                  <Icon
                    source="qrcode"
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </>
            }
            {
              index === 3 &&
              <TouchableOpacity>
                <Icon
                  source="filter"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            }
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // header
  header_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    backgroundColor: '#fff',
    padding: 3
  },
  logo: {
    width: 130,
    height: 30,
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

export default HeadBar;
