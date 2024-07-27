import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Icon } from 'react-native-paper';
import room1 from '../../assets/room.jpg';
import room2 from '../../assets/room1.jpg';

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      name: 'Room 1',
      location: 'Location 1',
      status: 'Available',
      img: room1
    },
    {
      id: 2,
      name: 'Room 2',
      location: 'Location 2',
      status: 'Full',
      img: room2
    },
    {
      id: 3,
      name: 'Room 3',
      location: 'Location 3',
      status: 'Available',
      img: room1
    }
  ]
  return (
    <ScrollView style={style.container}>
      {
        rooms.map((item, index) => (
          <View key={index} style={style.card}>
            <BackgroundImage source={item.img} style={style.backgroundImage} >
              <View style={style.row}>
                <View style={style.labelcard}>
                  <Text style={style.label}>{item.name}</Text>
                </View>
                <View style={style.labelcard}>
                  <Icon
                    source="map-marker"
                    size={25}
                    color="#fff"
                  />
                  <Text style={style.label}>{item.location}</Text>
                </View>
              </View>
            </BackgroundImage>
            <View style={style.menu}>
              <TouchableOpacity style={style.menuItem}>
                <Text style={style.menuText}>Service</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.menuItem}>
                <Text style={style.menuText}>View Plant</Text>
              </TouchableOpacity>

              <TouchableOpacity style={style.menuItem}>
                <Text style={style.menuText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      }

      <View style={{...style.card, width: '10%', height: 20}} />
    </ScrollView>
  )
};

const style = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    marginBottom: 18,
    overflow: 'hidden',
    borderColor:'#e4e4e4b0',
    borderWidth:1,
    borderBottomWidth: 0,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
    borderTopWidth: 0,
    shadowColor: "#303030",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    borderRadius: 2
  },
  row: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    columnGap: 2
  },
  labelcard: {
    flex: 1,
    backgroundColor: '#00000060',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 15,
  },
  menu: {
    flexDirection: 'row',
    columnGap: 10,
    paddingVertical: 7,
    paddingHorizontal: 3
  },
  menuItem: {
    flex: 1,
    padding: 10,
    backgroundColor: '#035676',
    borderRadius: 5
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center'
  }
})

export default Rooms
