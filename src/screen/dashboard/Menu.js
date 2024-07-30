import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-paper'
import { context } from '../../navigation/Appnav'

const Menu = () => {
  const navigation = useNavigation();
  const props = useContext(context);

  const handleClick = (to) => {
    props.setActive(to.id);
    navigation.navigate(to.name);
  }
  useEffect(() => {
    props.setPre({ id: 5, name: 'MenuScreen' });
  }, [])
  return (
    <ScrollView style={styles.container}>
      <View style={{ ...styles.card, marginBottom: 20, paddingVertical: 7 }}>
        <Image style={styles.img} source={require('../../assets/user.png')} />

        <View style={{ rowGap: 6 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Joe Nishanth</Text>
          <Text style={{ fontSize: 14 }}>CUSTOMER ADMIN</Text>
          <Text style={{ fontWeight: '400' }}>joe.shc@gmail.com</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end', alignSelf: 'flex-end' }}>
          <Icon
            source="email-outline"
            size={25}
            color="#000"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.card} onPress={() => handleClick({ id: 6, name: 'Profile' })}>
        <Text style={styles.title}>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
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
    marginBottom: 7,
    padding: 7,
    paddingVertical: 18,
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
  img: {
    width: '18%',
    height: 65,
    borderRadius: 60,
    marginLeft: 5
  },
  title: {
    // fontSize:15,
    // color:'#a7a7a7'
  }
})

export default Menu
