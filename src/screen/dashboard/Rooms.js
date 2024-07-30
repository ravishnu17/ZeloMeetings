import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Icon } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { ToastColor } from '../utils/ToastColors';

import room1 from '../../assets/room.jpg';
import room2 from '../../assets/room1.jpg';
import { context } from '../../navigation/Appnav';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

const Rooms = () => {
  const props = useContext(context);
  const [showModel, setShowModel] = useState(false);
  const roomList = [
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
  const [location, setLocation] = useState();
  const [rooms, setRooms] = useState();
  return (
    <View style={styles.container}>
      <ScrollView>
        {
          roomList.map((item, index) => (
            <View key={index} style={styles.card}>
              <BackgroundImage source={item.img} style={styles.backgroundImage} >
                <View style={styles.row}>
                  <View style={[styles.labelcard, { borderEndColor: '#fff', borderEndWidth: 1 }]}>
                    <Text style={styles.label}>{item.name}</Text>
                  </View>
                  <View style={styles.labelcard}>
                    <Icon
                      source="map-marker"
                      size={25}
                      color="#fff"
                    />
                    <Text style={styles.label}>{item.location}</Text>
                  </View>
                </View>
              </BackgroundImage>
              <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => setShowModel(true)}>
                  <Text style={styles.menuText}>Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={viewPlant}>
                  <Text style={styles.menuText}>View Plant</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} >
                  <Text style={styles.menuText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={showModel} onDismiss={() => setShowModel(false)}
        onRequestClose={() => setShowModel(false)} >
        <View style={styles.modal} >
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 8, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Services</Text>
            </View>
            {/* Body content */}
            <View style={{ padding: 10 }}>
              <Text style={styles.modelTitle}>Equipment</Text>
              <View style={styles.modelitem}>
                <Icon
                  source="wifi-alert"
                  size={20}
                  color="#000000"
                />
                <Text style={{ marginLeft: 5 }}>Equipment</Text>
              </View>
              <View style={styles.modelitem}>
                <Icon
                  source="calendar"
                  size={20}
                  color="#000000"
                />
                <Text style={{ marginLeft: 5 }}>System</Text>
              </View>
              <Text style={styles.modelTitle}>catering</Text>
              <Text style={styles.modelTitle}>IT Support</Text>
              <Text style={styles.modelTitle}>mobile Equipments</Text>
              <Text style={styles.modelTitle}>Special Services</Text>

            </View>
            <TouchableOpacity style={styles.button} onPress={() => setShowModel(false)}>
              <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >

      <Modal animationType="fade" transparent={true} visible={props?.headerProps?.showFilter || false}
        onDismiss={() => props?.setHeaderProps()} onRequestClose={() => props?.setHeaderProps()}
      >
        <TouchableWithoutFeedback onPress={() => props?.setHeaderProps()}>
          <View style={styles.filterModal} >
            <TouchableWithoutFeedback>
              <View style={styles.filterModalContainer}>
                <View style={{ padding: 10 }}>
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>Location *</Text>
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
                      <Text style={styles.headText}>Resources *</Text>
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
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>Equipments</Text>
                    <MultiSelect
                      data={data}
                      mode='modal'
                      value={[]}
                      onChange={({ value }) => setLocation(value)}
                      labelField="label"
                      valueField="value"
                      placeholder='Select Equipments'
                      style={styles.dropdown}
                      placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                      selectedTextStyle={styles.dropItem}
                    />
                  </View>
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>Start Date *</Text>
                      <TouchableOpacity style={styles.datetime} >
                        <Text style={{ color: '#8a8a8a'}}>YYYY-MM-DD</Text>
                        <Text style={styles.icon} > <Icon source='calendar' size={25} color="#000000" /> </Text>
                        {/* <DateTimePicker mode='date' value={new Date()} /> */}
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>Start Time *</Text>
                      <TouchableOpacity style={styles.datetime} >
                        <Text style={{ color: '#8a8a8a'}}>HH:MM</Text>
                        <Text style={styles.icon} > <Icon source='clock-outline' size={25} color="#000000" /> </Text>
                        {/* <DateTimePicker mode='time' value={new Date()} is /> */}
                      </TouchableOpacity>
                    </View>

                  </View>
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>End Date *</Text>
                      <TouchableOpacity style={styles.datetime} >
                        <Text style={{ color: '#8a8a8a'}}>YYYY-MM-DD</Text>
                        <Text style={styles.icon} > <Icon source='calendar' size={25} color="#000000" /> </Text>
                        {/* <DateTimePicker mode='date' value={new Date()} /> */}
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>End Time *</Text>
                      <TouchableOpacity style={styles.datetime} >
                        <Text style={{ color: '#8a8a8a'}}>HH:MM</Text>
                        <Text style={styles.icon} > <Icon source='clock-outline' size={25} color="#000000" /> </Text>
                        {/* <DateTimePicker mode='time' value={new Date()} is /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>Time Duration</Text>
                    <Dropdown
                      data={data}
                      mode='modal'
                      value={[]}
                      onChange={({ value }) => setLocation(value)}
                      labelField="label"
                      valueField="value"
                      placeholder='Select Duration'
                      style={styles.dropdown}
                      placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                      selectedTextStyle={styles.dropItem}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => props?.setHeaderProps()}>
                  <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>DONE</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View >
  )
};

const styles = StyleSheet.create({
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
  modelTitle: {
    backgroundColor: '#ccc',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 18
  },
  modelitem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15
  },
  button: {
    padding: 8,
    margin: 10,
    width: 100,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#035676',
    textAlign: 'center',
  },
  filterModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000060',
  },
  filterModalContainer: {
    backgroundColor: '#ffffff',
  },
  filterView: {
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 15
  },
  headText: {
    fontSize: 15
  },
  dropdown: {
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  dropItem: {
    padding: 2,
    color: '#000',

  },
  datetime: {
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    paddingHorizontal: 0
  }
})



export default Rooms
