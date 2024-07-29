import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Card } from 'react-native-elements';

const Report = () => {
  const [location, setLocation] = useState();
  const [rooms, setRooms] = useState();
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const handleClick = () => {
    Alert.alert('Alert', 'Do you want to fix this equipment?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };
  return (
    <View style={styles.container} >
      <View style={{ flexDirection: 'row', columnGap: 10, marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>Location</Text>
          <Dropdown
            data={data}
            value={location}
            onChange={({ value }) => setLocation(value)}
            labelField="label"
            valueField="value"
            placeholder='Select location'
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>Rooms</Text>
          <Dropdown
            data={data}
            value={rooms}
            onChange={({ value }) => setRooms(value)}
            labelField="label"
            valueField="value"
            placeholder='Select location'
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
          />
        </View>
      </View>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}> Equipments</Text>
        <View style={{ flexDirection: 'row', columnGap: 8 }}>
          <TouchableOpacity style={styles.cardItems} onPress={handleClick}>
            <View style={styles.imgContainer}>
              <Image source={require('../../assets/tv.png')} style={styles.cardImg} />
            </View>
            <Text style={styles.cardText}>Tv</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardItems} onPress={handleClick}>
            <View style={styles.imgContainer}>
              <Image source={require('../../assets/wifi.png')} style={styles.cardImg} />
            </View>
            <Text style={styles.cardText}>Wifi</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  headText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  dropdown: {
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
    marginTop: 10
  },
  dropItem: {
    padding: 2,
    color: '#000',

  },
  card: {
    borderRadius: 5,
    borderWidth: 0.2,
    shadowColor: '#8a8a8a',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  cardItems: {
    flex: 1,
    width: 150,
    height: 150,
    // borderRadius: 3,
    margin: 0,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#8a8a8a',
    elevation:5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    backgroundColor:'#fff'
  },
  imgContainer: {
    padding: 10,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#575757'
  },
  cardImg: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  cardText: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16
  }
});


export default Report
