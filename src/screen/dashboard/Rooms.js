import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Icon } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';

import room1 from '../../assets/room.jpg';
import room2 from '../../assets/room1.jpg';
import { useNavigation } from '@react-navigation/native';

const Rooms = () => {
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);
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
  ];

  const viewPlant = () => {
    Toast.showWithGravity(
      'Coming Soon!',
      Toast.SHORT,
      Toast.BOTTOM,
      ToastColor.ERROR
    );
  }
  return (
    <View style={style.container}>
      <ScrollView>
        {
          rooms.map((item, index) => (
            <View key={index} style={style.card}>
              <BackgroundImage source={item.img} style={style.backgroundImage} >
                <View style={style.row}>
                  <View style={[style.labelcard, { borderEndColor: '#fff', borderEndWidth: 1 }]}>
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
                <TouchableOpacity style={style.menuItem} onPress={() => setShowModel(true)}>
                  <Text style={style.menuText}>Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.menuItem} onPress={viewPlant}>
                  <Text style={style.menuText}>View Plant</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.menuItem} >
                  <Text style={style.menuText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={showModel} onDismiss={() => setShowModel(false)}
        onRequestClose={() => setShowModel(false)} >
        <View style={style.modal} >
          <View style={style.modalContainer}>
            {/* Header */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 8, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Services</Text>
            </View>
            {/* Body content */}
            <View style={{ padding: 10 }}>
              <Text style={style.modelTitle}>Equipment</Text>
              <View style={style.modelitem}>
                <Icon
                  source="wifi-alert"
                  size={20}
                  color="#000000"
                />
                <Text style={{ marginLeft: 5 }}>Equipment</Text>
              </View>
              <View style={style.modelitem}>
                <Icon
                  source="calendar"
                  size={20}
                  color="#000000"
                />
                <Text style={{ marginLeft: 5 }}>System</Text>
              </View>
              <Text style={style.modelTitle}>catering</Text>
              <Text style={style.modelTitle}>IT Support</Text>
              <Text style={style.modelTitle}>mobile Equipments</Text>
              <Text style={style.modelTitle}>Special Services</Text>

            </View>
            <TouchableOpacity style={style.button} onPress={() => setShowModel(false)}>
              <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >
  )
};

const style = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: '#ffffff'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    marginBottom: 18,
    overflow: 'hidden',
    borderColor: '#e4e4e4b0',
    borderWidth: 1,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    borderTopWidth: 0,
    shadowColor: "#303030",
    shadowOffset: {
      width: 1,
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
    flex: 1
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
  },
  modal: {
    flex: 1,
    padding: 15,
    backgroundColor: '#00000060',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  modelTitle:{
    backgroundColor: '#ccc',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 18
  },
  modelitem:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15
  },
  button: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    padding: 8,
    backgroundColor: '#035676',
    borderRadius: 5,
    width: 100,
    textAlign: 'center',
    margin: 10
  }
})


export default Rooms
