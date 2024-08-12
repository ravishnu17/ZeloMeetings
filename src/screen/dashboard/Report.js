import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Card, Icon } from 'react-native-elements';
import { context } from '../../navigation/Appnav';
import { EquipmentByRoomId, ResolveEquipmentReport, findBuildingListBasedonLocationId, findFloorsListBasedonBuildingId, getLocationlist, getMeetingRoomListBuildingAndFloor, getMeetingRoomsByLocationId, loginHomeAccess, reportEquipment } from '../../apiservices/Apiservices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';

const Report = () => {
  const isFocus = useIsFocused();
  const props = useContext(context);
  const setLoading = props?.setLoading;
  const translate= props?.language;

  // use states
  const [locations, setLocations] = useState([{ value: null, label: "Select Location" }]);
  const [selectedLocation, setSelectedLocation] = useState();

  const defaultBuilding= { value: null, label: "Select Bulding" };
  const [building, setBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState();

  const defaultFloor= { value: null, label: "Select Bulding" };
  const [floor, setFloor] = useState([defaultFloor]);
  const [selectedFloor, setSelectedFloor] = useState();

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();

  const [equipments, setEquipments] = useState([]);

  // get user location
  const getUserData = async () => {
    setLoading(true);
    let userId = await AsyncStorage.getItem('userId');
    let userData = await loginHomeAccess(userId);
    // get Location List
    locationList(userData?.customerDetails?.location?.id || userData?.user?.location?.id);
  }
  // Get data from API

  // Get all locations
  const locationList = async (locationData) => {
    let location = await getLocationlist();
    let locationOptions = location.customerLocations.map(item => ({
      label: item.location,
      value: item.id
    }));
    let selectedLoc = locationData || locationOptions[0].value;

    // get Building List
    getBuildingList(selectedLoc);
    getMeetingRooms(selectedLoc);

    // set values
    setLocations(locationOptions);
    setSelectedLocation(selectedLoc);
  }
  // get Building List
  const getBuildingList = (location) => {
    setLoading(true);
    findBuildingListBasedonLocationId(location).then((res) => {
      if (res.status) {
        setBuilding([defaultBuilding,...res.buildings?.map(item => ({ label: item.name, value: item.id }))]);
      } else {
        setBuilding([defaultBuilding]);
      }
    }).catch((error) => {
      console.log("getBuildingList", error);
    }).finally(() => {
      setLoading(false);
    })
  }
  // get Meeting Rooms
  const getMeetingRooms = (location) => {
    setLoading(true);
    getMeetingRoomsByLocationId(location).then((res) => {
      if (res.status) {
        res.meetingRoomDTOs?.length > 0 ? setRooms(res.meetingRoomDTOs?.map(item => ({ label: item.name, value: item.id }))) : setRooms([]); ;
      } else {
        setRooms([]);
      }
    }).catch((error) => {
      console.log("getMeetingRooms", error);
    }).finally(() => {
      setLoading(false);
    })
  }
  // Get meeting rooms by building and floor
  const getMeetingRoomByBuilding = (buildingID, floorID) => {
    setLoading(true);
    getMeetingRoomListBuildingAndFloor(buildingID, floorID || 0).then((res) => {
      if (res.status) {
        setRooms(res.meetingRoomDTOs?.map(item => ({ label: item.name, value: item.id })));
      } else {
        setRooms([]);
      }
    }).catch((error) => {
      console.log("getMeetingRooms", error);
    }).finally(() => setLoading(false))
  }
  // get Floor List by building ID
  const getFloorByBuilding = (buildingID) => {
    setLoading(true);
    findFloorsListBasedonBuildingId(buildingID).then((res) => {
      if (res.status) {
        setFloor([defaultFloor,...res?.floors?.map(item => ({ label: item.name, value: item.id }))]);
      } else {
        setFloor([defaultFloor]);
      }
    }).catch((error) => {
      console.log("floor list", error);
    }).finally(() => setLoading(false));
  }
  // get Equipment List by Room ID
  const getEquipmentList = async (roomId) => {
    setLoading(true);
    EquipmentByRoomId(roomId).then((res) => {
      if (res.status) {
        setEquipments(res?.meetingRoomEquipments);
      } else {
        setEquipments([]);
      }
    }).catch((error) => {
      console.log("floor list", error);
    }).finally(() => setLoading(false));
  }

  // Handle events

  // Handle location change event
  const handleChangeLocation = ({ value }) => {
    setSelectedLocation(value);
    // get Building List
    getBuildingList(value);
    getMeetingRooms(value);

    // clear previous data
    setSelectedBuilding();
    setSelectedFloor();
    setSelectedRoom();
    setFloor([defaultFloor]);
    setEquipments([]);
  }
  // Handle building change event
  const handleChangeBuilding = ({ value }) => {
    setSelectedBuilding(value);
    if(value){
      getFloorByBuilding(value);
      getMeetingRoomByBuilding(value);
    }else{
      getBuildingList(selectedLocation);
      getMeetingRooms(selectedLocation);
    }
    // clear previous data
    setSelectedFloor();
    setSelectedRoom();
    setEquipments([]);
    setFloor([defaultFloor]);
  }
  // Handle floor change event
  const handleChangeFloor = ({ value }) => {
    setSelectedFloor(value);
    getMeetingRoomByBuilding(selectedBuilding, value);
    // clear previous data
    setSelectedRoom();
    setEquipments([]);
  }
  // Handle room change event
  const handleChangeRoom = ({ value }) => {
    setSelectedRoom(value);
    getEquipmentList(value);
  }

  const handleEquipmentclick = (id, status) => {
    let data = {
      buildingId: selectedBuilding || null,
      customerEquipmentId: id,
      customerLocationId: selectedLocation,
      floorId: selectedFloor || null,
      meetingRoomId: selectedRoom
    }

    if (status) {
      Alert.alert('Alert', translate?.REPORT?.DAMAGED, [
        {
          text: translate?.ROOMS?.CANCEL,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: translate?.REPORT?.CONFIRM, onPress: () => {
            reportEquipment(data).then(res => {
              if (res.status) {
                getEquipmentList(selectedRoom);
                Toast.showWithGravity(
                  res?.information?.description,
                  Toast.SHORT,
                  Toast.BOTTOM,
                  ToastColor.SUCCESS
                )
              } else {
                Toast.showWithGravity(
                  res?.information?.description,
                  Toast.SHORT,
                  Toast.BOTTOM,
                  ToastColor.ERROR
                )
              }
            })
          }
        },
      ]);
    } else {
      Alert.alert('Alert', translate?.REPORT?.FIX, [
        {
          text: translate?.ROOMS?.CANCEL,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: translate?.REPORT?.CONFIRM, onPress: () => {
            ResolveEquipmentReport(data).then(res => {
              if (res.status) {
                getEquipmentList(selectedRoom);
                Toast.showWithGravity(
                  res?.information?.description,
                  Toast.SHORT,
                  Toast.BOTTOM,
                  ToastColor.SUCCESS
                )
              } else {
                Toast.showWithGravity(
                  res?.information?.description,
                  Toast.SHORT,
                  Toast.BOTTOM,
                  ToastColor.ERROR
                )
              }
            })
          }
        },
      ]);
    }

  };

  const renderEquipment = ({ item }) => {
    return (
      <TouchableOpacity style={{...styles.cardItems, ...styles.card}} onPress={() => handleEquipmentclick(item?.customerEquipment?.id, item?.status)}>
          <Image
            source={{ uri: item?.customerEquipment?.equipmentIcon?.equipmentIconPath }}
            style={{ ...styles.cardImg, backgroundColor: item?.status ? 'green' : 'red' }}
          />
        <Text style={styles.cardText}>{item?.customerEquipment?.name}</Text>
      </TouchableOpacity>
    )
  }

  const clearFilter = () => {
    setSelectedLocation();
    setSelectedBuilding();
    setSelectedFloor();
    setSelectedRoom();
    setEquipments([]);
  }

  useEffect(() => {
    if (isFocus) {
      props?.setPre();
      getUserData();

      return () => {
        clearFilter();
      }
    }
  }, [isFocus]);
  return (
    <View style={styles.container} >
      <View style={styles?.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>{translate?.REPORT?.LOCATION} <Text style={{ color: 'red' }}>*</Text></Text>
          <Dropdown
            data={locations}
            value={selectedLocation}
            onChange={handleChangeLocation}
            labelField="label"
            valueField="value"
            placeholder={translate?.VISITSETTING?.VISIT?.PLACEHOLDER?.SELECTLOCATION}
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>{translate?.REPORT?.BUILDING}</Text>
          <Dropdown
            data={building}
            value={selectedBuilding}
            onChange={handleChangeBuilding}
            labelField="label"
            valueField="value"
            placeholder={translate?.REPORT?.SELECTBUILDING}
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
            // renderRightIcon={ renderDropdownRightIcon }
          />
        </View>
      </View>

      <View style={styles?.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>{translate?.REPORT?.FLOOR}</Text>
          <Dropdown
            data={floor}
            value={selectedFloor}
            onChange={handleChangeFloor}
            labelField="label"
            valueField="value"
            placeholder={translate?.REPORT?.SELECTFLOOR}
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>{translate?.REPORT?.ROOMS} <Text style={{ color: 'red' }}>*</Text></Text>
          <Dropdown
            data={rooms}
            value={selectedRoom}
            onChange={handleChangeRoom}
            labelField="label"
            valueField="value"
            placeholder={translate?.DISPLAYMODALFORM?.SELECTMEETINGROOM}
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
          />
        </View>
      </View>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}> {translate?.ROOMS?.EQUIPMENTS}</Text>
        {
          equipments?.length > 0 ?
            <FlatList
              data={equipments}
              numColumns={2}
              renderItem={renderEquipment}
            />
            :
            <Text style={styles.noData}>{translate?.REPORT?.NOSERVICEDATAAVAILABLE}!</Text>
        }
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
  row:{ 
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems:'flex-end' },
  dropdown: {
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
    marginTop: 8
  },
  dropItem: {
    padding: 2,
    color: '#000',

  },
  card: {
    borderRadius: 5,
    shadowColor: '#8a8a8a',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 3,
    marginTop: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginVertical: 10
  },
  cardItems: {
    flex: 1,
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    margin: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    },
  cardImg: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  cardText: {
    // textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16
  },
  noData: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
  }
});


export default Report
