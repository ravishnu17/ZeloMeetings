import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Button } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Icon } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { ToastColor } from '../utils/ToastColors';

import { context } from '../../navigation/Appnav';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';
import { findCateringListBasedonCustomerLocationId, findCustomerMobileEquipmentListBasedonCustomerLocationId, findCustomerSpecialSettingBasedonCustomerLocationId, findEquipmentsListBasedonCustomerLocationId, findITSupporttBasedonCustomerLocationId, getDesksByLocationId, getLocationlist, getMeetingRoomsByLocationId, getParkingSeatByLocationId, loginHomeAccess } from '../../apiservices/Apiservices';
import AsyncStorage from '@react-native-async-storage/async-storage';


import meetingRoomImg from '../../assets/meetingRoom.jpg';
import deskImg from '../../assets/desk.jpg';
import parkingSeatImg from '../../assets/parking-seats.jpg';
import LoadingIndicator from '../LoadingIndicator';

const Rooms = () => {
  // useStates
  const [showModel, setShowModel] = useState(false);
  const [locations, setLocations] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedResource, setSelectedResource] = useState('All');
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [desks, setDesks] = useState([]);
  const [parkingSeats, setParkingSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // services
  const [services, setServices] = useState({});
  
  // State for filters
  // Equipments
  const [equipmentList, setEquipmentList] = useState([]);
  const [checkedEquipment, setCheckedEquipment] = useState([]);

  // StartDate
  const [showStartDate, setShowStartDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [startDateTime, setStartDateTime] = useState(new Date());
  // EndDate
  const [showEndTime, setShowEndTime] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [endDateTime, setEndDateTime] = useState(new Date());

  const props = useContext(context);
  const isFocus = useIsFocused();
  const resources = [
    { label: 'All', value: 'All' },
    { label: 'Meeting Room', value: 'Meeting Room' },
    { label: 'Desk', value: 'Desk' },
    { label: 'Parking Seat', value: 'Parking Seat' }
  ]

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

  // get user location
  const getUserLocation = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let userData = await loginHomeAccess(userId);
    setSelectedLocation(userData?.user.location?.id);
  }
  // Get all locations
  const locationList = async () => {
    let location = await getLocationlist();
    let locationOptions = location.customerLocations.map(item => ({
      label: item.location,
      value: item.id
    }));
    setLocations(locationOptions);
  }

  // Get Service data
  const getServiceData = async () => {
    let service = {equipment:[], catering:[], IT_support:[], mobileEquip:[], Special:[]};
    let catering= await findCateringListBasedonCustomerLocationId(selectedLocation);
    if(catering.status){
      service.catering=catering.customerCaterings;
    }

    let itSupp= await findITSupporttBasedonCustomerLocationId(selectedLocation);
    if(itSupp.status){
      service.IT_support=itSupp.customerITSupports;
    }

    let mobileEquip= await findCustomerMobileEquipmentListBasedonCustomerLocationId(selectedLocation);
    if(mobileEquip.status){
      service.mobileEquip=mobileEquip.customerMobileEquipments;
    }

    let special= await findCustomerSpecialSettingBasedonCustomerLocationId(selectedLocation);
    if(special.status){
      service.Special=special.customerSpecialSettings;
    }

  }
  const getEquipmentList = async () => {
    let equipment = await findEquipmentsListBasedonCustomerLocationId(selectedLocation);
    if (equipment.status) {
      setEquipmentList(equipment.customerEquipments?.map(item=>({label:item.name,value:item.id})));
    }
  }
  // Get all resources
  const getRoomsDeskSeat = async () => {
    setLoading(true);

    if (selectedResource === 'All' || selectedResource === 'Meeting Room') {
      let rooms = await getMeetingRoomsByLocationId(selectedLocation);
      setMeetingRooms(rooms?.meetingRoomDTOs);
    }

    if (selectedResource === 'All' || selectedResource === 'Desk') {
      let desk = await getDesksByLocationId(selectedLocation);
      setDesks(desk?.deskDTOs);
    }

    if (selectedResource === 'All' || selectedResource === 'Parking Seat') {
      let seat = await getParkingSeatByLocationId(selectedLocation);
      setParkingSeats(seat?.parkingSeatDTOs);
    }
    setLoading(false);
  }
  // Handle Filter click
  const handleFilterClick = () => {
    props?.setHeaderProps();
    // getRoomsDeskSeat();
  }
  // List resource view
  const listResourceView = (index, item, type) => {
    let resourceImg = null;

    if (item?.imagePath) {
      resourceImg = item?.imagePath
    } else if (type === 'Meeting Room') {
      resourceImg = meetingRoomImg
    } else if (type === 'Desk') {
      resourceImg = deskImg
    } else if (type === 'Parking Seat') {
      resourceImg = parkingSeatImg
    }

    return (
      <View key={index} style={styles.card}>
        <View style={{ width: '100%', height: 200 }}>
          <BackgroundImage source={resourceImg} style={styles.backgroundImage} >
          </BackgroundImage>

          <View style={styles.row}>
            <View style={[styles.labelcard, { borderEndColor: '#fff', borderEndWidth: 1 }]}>
              <Text style={styles.label}>{item?.name}</Text>
            </View>
            <View style={styles.labelcard}>
              <Icon
                source="map-marker"
                size={25}
                color="#fff"
              />
              <Text style={styles.label}>{item?.customerLocation?.location}, {item?.customerLocation?.country?.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.menu}>
          {type === 'Meeting Room' &&
            <TouchableOpacity style={styles.menuItem} onPress={() => setShowModel(true)}>
              <Text style={styles.menuText}>Service</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={styles.menuItem} onPress={viewPlant}>
            <Text style={styles.menuText}>View Plant</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} >
            <Text style={styles.menuText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Set false for all datetime view state
  const closeAllDateTimeView = () => {
    setShowStartDate(false);
    setShowStartTime(false);
    setShowEndDate(false);
    setShowEndTime(false);
  }

  const showDatePicker = (type) => {
    if (type === 'start') {
      setShowStartDate(true);
      setShowEndDate(false);
    } else {
      setShowStartDate(false);
      setShowEndDate(true);
    }
  }

  const showTimepicker = (type) => {
    if (type === 'start') {
      setShowStartTime(true);
      setShowEndTime(false);
    } else {
      setShowStartTime(false);
      setShowEndTime(true);
    }
  }
  const onChangeStartDateTime = (selectedDate, type) => {
    const currentDate = selectedDate || date;
    console.log("in func currentDate", currentDate, startDateTime);
    if (type === 'date') {
      setStartDateTime(currentDate);
    } else {
      setStartDateTime(new Date(startDateTime.setHours(currentDate.getHours(), currentDate.getMinutes())));
    }
    setTimeout(() => {
      setShowStartDate(false);
      setShowStartTime(false);
    }, 50);

  };

  useEffect(() => {
    if (isFocus) {
      getUserLocation();
      closeAllDateTimeView();
    }
  }, [isFocus])

  useEffect(() => {
    if (isFocus) {
      setLoading(true);
      locationList();
      if (selectedLocation){
        getRoomsDeskSeat();
        getEquipmentList();
      }
    }
  }, [selectedLocation, selectedResource, isFocus])

  return (
    <View style={{ flex: 1 }}>
      {loading && <LoadingIndicator />}
      <ScrollView style={styles.container}>
        {
          (meetingRooms?.length > 0 || desks?.length > 0 || parkingSeats?.length > 0) ? <>
            {
              (selectedResource === 'All' || selectedResource === 'Meeting Room') && meetingRooms?.map((item, index) => listResourceView(index, item, 'Meeting Room'))
            }
            {
              (selectedResource === 'All' || selectedResource === 'Desk') && desks?.map((item, index) => listResourceView(index, item, 'Desk'))
            }
            {
              (selectedResource === 'All' || selectedResource === 'Parking Seat') && parkingSeats?.map((item, index) => listResourceView(index, item, 'Parking Seat'))
            }
          </>
            :
            <Text style={styles.noData}>{loading ? '' : 'No Data found!'}</Text>
        }

        {/* Service Modal */}
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
              <TouchableOpacity style={{ ...styles.button, position: 'absolute', justifyContent: 'center', bottom: 10 }} onPress={() => setShowModel(false)}>
                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal >

        {/* Filter Modal */}
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
                          data={locations}
                          value={selectedLocation}
                          onChange={({ value }) => setSelectedLocation(value)}
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
                          data={resources}
                          value={selectedResource}
                          onChange={({ value }) => setSelectedResource(value)}
                          labelField="label"
                          valueField="value"
                          placeholder='Select Resource'
                          style={styles.dropdown}
                          placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                          selectedTextStyle={styles.dropItem}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Text style={styles.headText}>Equipments</Text>
                      <MultiSelect
                        data={equipmentList}
                        mode='modal'
                        value={checkedEquipment}
                        onChange={(value ) => setCheckedEquipment(value)}
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
                        <TouchableOpacity style={styles.datetime} onPress={() => showDatePicker('start')} >
                          <Text style={{ color: '#8a8a8a' }}>{startDateTime.toLocaleDateString()}</Text>
                          <Text style={styles.icon}> <Icon source='calendar' size={25} color="#000000" /> </Text>
                        </TouchableOpacity>
                      </View>
                      {showStartDate && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={startDateTime}
                          mode='date'
                          display="default"
                          onChange={(event, selectedDate) => onChangeStartDateTime(selectedDate, 'date')}
                          minimumDate={new Date()}
                        />
                      )}

                      <View style={{ flex: 1 }}>
                        <Text style={styles.headText}>Start Time *</Text>
                        <TouchableOpacity style={styles.datetime} onPress={() => showTimepicker('start')} >
                          <Text style={{ color: '#8a8a8a' }}>{startDateTime.toLocaleTimeString()}</Text>
                          <Text style={styles.icon} > <Icon source='clock-outline' size={25} color="#000000" /> </Text>
                        </TouchableOpacity>
                      </View>
                      {showStartTime && (
                        <DateTimePicker
                          testID="timePicker"
                          value={startDateTime}
                          mode="time"
                          display="default"
                          onChange={(event, selectedDate) => onChangeStartDateTime(selectedDate, 'time')}
                          minimumDate={new Date().getTime()}
                          onTouchCancel={() => setShowStartTime(false)}
                        />
                      )}
                    </View>

                    <View style={styles.filterView}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.headText}>End Date *</Text>
                        <TouchableOpacity style={styles.datetime} >
                          <Text style={{ color: '#8a8a8a' }}>YYYY-MM-DD</Text>
                          <Text style={styles.icon} > <Icon source='calendar' size={25} color="#000000" /> </Text>
                          {/* <DateTimePicker mode='date' value={new Date()} /> */}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.headText}>End Time *</Text>
                        <TouchableOpacity style={styles.datetime} >
                          <Text style={{ color: '#8a8a8a' }}>HH:MM</Text>
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
                    <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }} onPress={handleFilterClick}>DONE</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </View>

  );
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
    height: '100%',
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
  noData: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 20
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
    marginTop: 10,
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
