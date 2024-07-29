import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config'
import { Icon } from 'react-native-paper'

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{...styles.card, marginBottom: 20, paddingVertical:7}}>
        <Image style={styles.img} source={require('../../assets/user.png')} />

        <View style={{ rowGap: 6 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Joe Nishanth</Text>
          <Text style={{ fontSize: 14 }}>CUSTOMER ADMIN</Text>
          <Text style={{ fontWeight: '400' }}>joe.shc@gmail.com</Text>
        </View>

        <View style={{flex:1, alignItems:'flex-end', alignSelf:'flex-end'}}>
          <Icon
            source="email-outline"
            size={25}
            color="#000"
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Contact Us</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Feedback</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Logout</Text>
      </View>
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
    marginBottom:7,
    padding: 7,
    paddingVertical:18,
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
  img:{
    width: '18%',
    height: 65,
    borderRadius: 60,
    marginLeft:5
  },
  title:{
    // fontSize:15,
    // color:'#a7a7a7'
  }
})

export default Profile
