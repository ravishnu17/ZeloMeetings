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

  // use states
  const [locations, setLocations] = useState([{ value: null, label: "Select Location" }]);
  const [selectedLocation, setSelectedLocation] = useState();

  const [building, setBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState();

  const [floor, setFloor] = useState([]);
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
        setBuilding(res.buildings?.map(item => ({ label: item.name, value: item.id })));
      } else {
        setBuilding([]);
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
        setRooms(res.meetingRoomDTOs?.map(item => ({ label: item.name, value: item.id })));
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
        setFloor(res?.floors?.map(item => ({ label: item.name, value: item.id })));
      } else {
        setFloor([]);
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
    setEquipments([]);
  }
  // Handle building change event
  const handleChangeBuilding = ({ value }) => {
    setSelectedBuilding(value);
    getFloorByBuilding(value);
    getMeetingRoomByBuilding(value);

    // clear previous data
    setSelectedFloor();
    setSelectedRoom();
    setEquipments([]);
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
      Alert.alert('Alert', 'Are you sure the equipment is damaged? ', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
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
      Alert.alert('Alert', 'Do you want to fix this equipment? ', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
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

  // const renderDropdownRightIcon = (item) => {
  //   return (
  //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //       {selectedBuilding &&
  //         <Text onPress={() => { setSelectedBuilding() }} style={{ marginRight: 6 }}>
  //           <Icon
  //             name='close'
  //             type='material-community'
  //             color='#979797'
  //             size={18}
  //           />
  //         </Text>}
  //       <Text onPress={() => { console.log("clickdown", item)}} style={{ zIndex: -11 }}>
  //         <Icon
  //           name='chevron-down'
  //           type='material-community'
  //           color='#979797'
  //         />
  //       </Text>
  //     </View>
  //   )
  // }

  const renderEquipment = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardItems} onPress={() => handleEquipmentclick(item?.customerEquipment?.id, item?.status)}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: item?.customerEquipment?.equipmentIcon?.equipmentIconPath }}
            style={{ ...styles.cardImg, backgroundColor: item?.status ? 'green' : 'red' }}
          />
        </View>
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
      <View style={{ flexDirection: 'row', columnGap: 10, marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>Location</Text>
          <Dropdown
            data={locations}
            value={selectedLocation}
            onChange={handleChangeLocation}
            labelField="label"
            valueField="value"
            placeholder='Select location'
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>Building</Text>
          <Dropdown
            data={building}
            value={selectedBuilding}
            onChange={handleChangeBuilding}
            labelField="label"
            valueField="value"
            placeholder='Select building'
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
            // renderRightIcon={ renderDropdownRightIcon }
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', columnGap: 10, marginTop: 15, marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>Floor</Text>
          <Dropdown
            data={floor}
            value={selectedFloor}
            onChange={handleChangeFloor}
            labelField="label"
            valueField="value"
            placeholder='Select floor'
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headText}>Rooms <Text style={{ color: 'red' }}>*</Text></Text>
          <Dropdown
            data={rooms}
            value={selectedRoom}
            onChange={handleChangeRoom}
            labelField="label"
            valueField="value"
            placeholder='Select room'
            style={styles.dropdown}
            placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
            selectedTextStyle={styles.dropItem}
            autoScroll={false}
          />
        </View>
      </View>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}> Equipments</Text>
        {
          equipments?.length > 0 ?
            <FlatList
              data={equipments}
              numColumns={2}
              renderItem={renderEquipment}
            />
            :
            <Text style={styles.noData}>No data found</Text>
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
    margin: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#8a8a8a',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    backgroundColor: '#fff'
  },
  imgContainer: {
    padding: 5,
    borderRadius: 100,
    borderWidth: 3.5,
    borderColor: '#575757'
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
