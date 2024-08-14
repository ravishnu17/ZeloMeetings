import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Image } from 'react-native'
import { BackgroundImage } from 'react-native-elements/dist/config';
import { Icon } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { ToastColor } from '../utils/ToastColors';

import { context } from '../../navigation/Appnav';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FloorBasedFilter, findAllResourceByBuildingId, findBuildingListBasedonLocationId, findCateringListBasedonCustomerLocationId, findCustomerMobileEquipmentListBasedonCustomerLocationId, findCustomerSpecialSettingListBasedonCustomerLocationId, findDesksbyFilters, findEquipmentByBuildingId, findEquipmentsListBasedonCustomerLocationId, findITSupporttBasedonCustomerLocationId, findMeetingRoomsbyFilters, findParkingSeatbyFilters, floorListbyBuildingId, getChargingCarList, getChargingCarListWithFilter, getDesksByLocationId, getLocationlist,getMeetingRoomsByLocationId, getParkingSeatByLocationId, loginHomeAccess } from '../../apiservices/Apiservices';
import AsyncStorage from '@react-native-async-storage/async-storage';

import meetingRoomImg from '../../assets/meetingRoom.jpg';
import deskImg from '../../assets/desk.jpg';
import parkingSeatImg from '../../assets/parking-seats.jpg';
import chargingCarImg from '../../assets/charging_car.jpeg';
import LoadingIndicator from '../LoadingIndicator';

const Rooms = () => {
  const navigate= useNavigation();
  // useStates
  const [showModel, setShowModel] = useState(false);
  const [rights, setRights] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedResource, setSelectedResource] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState();
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [building, setBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState();
  const [floor, setFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState();
  const [desks, setDesks] = useState([]);
  const [parkingSeats, setParkingSeats] = useState([]);
  const [chargingCars, setChargingCars] = useState([]);

  // services
  const serviceItems = { equipment: [], catering: [], IT_support: [], mobileEquip: [], Special: [] };
  const [services, setServices] = useState(serviceItems);

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
  const [endDateTime, setEndDateTime] = useState();

  const props = useContext(context);
  const loading = props?.loading;
  const setLoading = props?.setLoading;
  const translate= props?.language;

  const isFocus = useIsFocused();
  const resources = [
    { label: translate?.ROOMS?.ALL, value: 'All' },
    { label: translate?.ROOMS?.MEETINGROOM, value: 'meetingRoom' },
    { label: translate?.ROOMS?.DESK, value: 'desk' },
    { label: translate?.DISPLAYMODALFORM?.PARKINGSEAT, value: 'parkingSeat' },
    { label: translate?.DISPLAYMODALFORM?.CHARGINGCAR, value: 'chargingCar' }
  ]

  const viewPlant = () => {
    Toast.showWithGravity(
      'Coming Soon!',
      Toast.SHORT,
      Toast.BOTTOM,
      ToastColor.ERROR
    );
  }

  const timeDuration = [
    { label: '00 min', value: 0 },
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '60 min', value: 60 },
    { label: '75 min', value: 75 },
    { label: '100 min', value: 100 },
    { label: '115 min', value: 115 },
  ];

  // get user location
  const getUserLocation = async () => {
    setLoading(true);
    let Userrights= await AsyncStorage.getItem('rights');
    setRights(Userrights);
    let userId = await AsyncStorage.getItem('userId');
    let userData = await loginHomeAccess(userId);
    // get Location List
    locationList(userData?.user?.location?.id || userData?.customerDetails?.location?.id);
  }

  // Get all locations
  const locationList = async (locationData) => {
    let location = await getLocationlist();
    let locationOptions = location.customerLocations.map(item => ({
      label: item.location,
      value: item.id
    }));
    let selectedLoc = locationData || locationOptions[0].value;

    getRoomsDeskSeat(selectedLoc, selectedResource);
    // set values
    setSelectedLocation(selectedLoc);
    setLocations(locationOptions);

    // get Equipment List
    getEquipmentList(selectedLoc);
    getBuildingList(selectedLoc);
  }

  const getEquipmentList = async (location) => {
    let equipment = await findEquipmentsListBasedonCustomerLocationId(location);
    if (equipment.status) {
      setEquipmentList(equipment.customerEquipments?.map(item => ({ label: item.name, value: item.id })));
    }
  }

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

  const getFloorEquipmentbyBuilding = (buildingId) => {
    setLoading(true);
    floorListbyBuildingId(buildingId).then((res) => {
      if (res.status) {
        setFloor(res?.floors?.map(item => ({ label: item.name, value: item.id })));
      } else {
        setFloor([]);
      }
    }).catch((error) => {
      console.log("floor list", error);
    });

    findEquipmentByBuildingId(buildingId).then((res) =>
      setEquipmentList(res?.customerEquipments?.map(item => ({ label: item.name, value: item.id })))
    ).catch((error) =>
      console.log("equipment by building",error)
    ).finally(() => {
      setLoading(false);
    });

  }

  // Get Service data
  const getServiceData = async (equipments) => {
    setLoading(true);
    let service = { equipment: [], catering: [], IT_support: [], mobileEquip: [], Special: [] };
    service.equipment= equipments || [];
    let catering = await findCateringListBasedonCustomerLocationId(selectedLocation);
    if (catering.status) {
      service.catering = catering.customerCaterings || [];
    }

    let itSupp = await findITSupporttBasedonCustomerLocationId(selectedLocation);
    if (itSupp.status) {
      service.IT_support = itSupp.customerITSupports || [];
    }

    let mobileEquip = await findCustomerMobileEquipmentListBasedonCustomerLocationId(selectedLocation);
    if (mobileEquip.status) {
      service.mobileEquip = mobileEquip.customerMobileEquipments || [];
    }

    let special = await findCustomerSpecialSettingListBasedonCustomerLocationId(selectedLocation);
    if (special.status) {
      service.Special = special.customerSpecialServices || [];
    }
    setServices(service);
    setLoading(false);
  }

  // Get all resources
  const getRoomsDeskSeat = async (location, resource) => {
    setLoading(true);
    if (resource === 'All' || resource === 'meetingRoom') {
      getMeetingRoomsByLocationId(location).then((res) => {
        if (res.status) {
          setMeetingRooms(res.meetingRoomDTOs);
        } else {
          setMeetingRooms([]);
        }
      }).catch((err) => {
        console.log("meetingsroom-location", err);
        setMeetingRooms([]);
      }).finally(() => resource !== 'all' && setLoading(false));
    }

    if (resource === 'All' || resource === 'desk') {
      getDesksByLocationId(location).then((res) => {
        if (res.status) {
          setDesks(res.deskDTOs);
        } else {
          setDesks([]);
        }
      }).catch((err) => {
        console.log("desk list location", err);
        setDesks([]);
      }).finally(() => resource !== 'all' && setLoading(false));
    }

    if (resource === 'All' || resource === 'parkingSeat') {
      getParkingSeatByLocationId(location).then((res) => {
        if (res.status) {
          setParkingSeats(res.parkingSeatDTOs);
        } else {
          setParkingSeats([]);
        }
      }).catch((err) => {
        console.log("parking seat location", err);
        setParkingSeats([]);
      }).finally(() => resource !== 'all' && setLoading(false));
    }

    if (resource === 'All' || resource === 'chargingCar') {
      getChargingCarList(location).then((res) => {
        if (res.status) {
          setChargingCars(res.chargingCarDTOs);
        } else {
          setChargingCars([]);
        }
      }).catch((err) => {
        console.log("charging car location", err);
        setChargingCars([]);
      }).finally(() => setLoading(false));
    }
  }

  // Book resource
  const BookResource =(resourceType, resourceId) =>{
    props?.setPre({ id: 3, name: 'RoomScreen' });
    navigate.navigate('AddBooking', { 
      from:'RoomScreen',
      locationID: selectedLocation, 
      buildingID: selectedBuilding, 
      floorID: selectedFloor, 
      resource: resourceType,
      [resourceType]: resourceId ,
    });
  }

  // List resource view
  const renderResourceView = (index, item, type) => {
    let resourceImg = null;
    let enableBooking = false;

    if (item?.imagePath) {
      resourceImg = item?.imagePath
    } else if (type === 'meetingRoom') {
      resourceImg = meetingRoomImg
      enableBooking= rights?.includes('BOOK A ROOM');
    } else if (type === 'desk') {
      resourceImg = deskImg
      enableBooking= rights?.includes('BOOK A DESK');
    } else if (type === 'parkingSeat') {
      resourceImg = parkingSeatImg
      enableBooking= rights?.includes('BOOK A PARKING SEAT');
    }else if (type === 'chargingCar') {
      resourceImg = chargingCarImg
      enableBooking= rights?.includes('BOOK A CHARGING CAR');
    }

    if (rights?.includes('ALL'))
      enableBooking= true

    return (
      <View key={index} style={styles.card}>
        <View style={{ width: '100%', height: 200 }}>
          <BackgroundImage source={item?.imagePath ? { uri: item?.imagePath } : resourceImg} style={styles.backgroundImage} >
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
          {type === 'meetingRoom' &&
            <TouchableOpacity style={styles.menuItem} onPress={() => {

              getServiceData(item?.equipments?.map(ele => (
                { id: ele?.id, name: ele.name, iconPath: ele?.equipmentIcon?.equipmentIconPath }
              )));
              setShowModel(true);
            }}>
              <Text style={styles.menuText}>{translate?.ROOMS?.SERVICE}</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={styles.menuItem} onPress={viewPlant}>
            <Text style={styles.menuText}>View {translate?.ROOMS?.PLANT}</Text>
          </TouchableOpacity>

          {enableBooking && <TouchableOpacity style={styles.menuItem} onPress={()=>BookResource(type, item?.id)} >
            <Text style={styles.menuText}>{translate?.ROOMS?.BOOK}</Text>
          </TouchableOpacity>}
        </View>
      </View>
    )
  }

  // change location
  const changeLocation = ({ value }) => {
    setSelectedLocation(value);
    setSelectedResource('All');
    setCheckedEquipment([]);
    getEquipmentList(value);
    setSelectedBuilding();
    getBuildingList(value);
    setSelectedFloor();
    setStartDateTime(new Date());
    setEndDateTime();
    setSelectedDuration();
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

  const onChangeStartDateTime = (event, selectedDate, type) => {
    if (event.type === 'dismissed')
      return;

    setShowStartDate(false);
    setShowStartTime(false);

    const currentDate = selectedDate || date;
    if (type === 'date') {
      setStartDateTime(currentDate);
    } else {
      setStartDateTime(new Date(startDateTime.setHours(currentDate.getHours(), currentDate.getMinutes())));
    }
  };

  const onChangeEndDateTime = (event, selectedDate, type, e) => {
    if (event.type === 'dismissed')
      return
    
    setShowEndDate(false);
    setShowEndTime(false);

    const currentDate = selectedDate || date;
    if (type === 'date') {
      setEndDateTime(currentDate);
    } else {
      if (endDateTime)
        setEndDateTime(new Date(endDateTime.setHours(currentDate.getHours(), currentDate.getMinutes())));
      else
        setEndDateTime(currentDate);
    }
  };

  const dateFormat = (date) => {
    // Format YYYY-MM-DD
    if (date) {
      return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    } else {
      return null
    }
  }

  const timeFormat = (date) => {
    if (date) {
      // Format HH:MM
      return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    } else {
      return null
    }
  }

  // display dropdown of equipment
  const renderEquipment = item => {
    return (
      <View style={styles.renderItem}>
        <Text style={styles.renderItemText}>{item.label}</Text>
        {checkedEquipment.includes(item.value) && (
          <Icon
            source='check-circle'
            color="black"
            name="Safety"
            size={18}
          />
        )}
      </View>
    );
  };

  //  change duration
  const changeDuration = ({ value }) => {
    setSelectedDuration(value);
    let tempstartDate = new Date(startDateTime);
    let enddatetime = new Date(tempstartDate.setMilliseconds(tempstartDate.getMilliseconds() + (value * 60 * 1000)));
    setEndDateTime(enddatetime);
  }

  // Handle Filter click
  const handleFilterClick = () => {
    setLoading(true);
    props?.setHeaderProps({});
    // For location resource change
    if (!selectedDuration && !endDateTime) {
      if (!selectedBuilding) {
        getRoomsDeskSeat(selectedLocation, selectedResource);
      }else{
        if(!selectedFloor){
          findAllResourceByBuildingId(selectedBuilding).then((res) => {
            if (res.status) {
              setMeetingRooms(res?.resourceDTO?.meetingRooms);
              setDesks(res?.resourceDTO?.desks);
              setParkingSeats(res?.resourceDTO?.parkingSeats);
              setChargingCars(res?.resourceDTO?.chargingCars);
            }
          }).catch((error) => {
            console.log("filter-room", error);
          }).finally(() => {
            setLoading(false);
          });
        }else{
          FloorBasedFilter(selectedFloor).then((res) => {
            if (res.status) {
              setMeetingRooms(res?.floorBasedFilterDto?.meetingRoomDTOs);
              setDesks(res?.floorBasedFilterDto?.deskDTOs);
              setParkingSeats(res?.floorBasedFilterDto?.parkingSeatDTOs);
              setChargingCars(res?.floorBasedFilterDto?.chargingCarDTOs);
            }
          }).catch((error) => {
            console.log("floor-based-filter", error);
          }).finally(() => {
            setLoading(false);
          });
        }
      }
    } else {
      // Filter with date time and building & floor
      if (selectedResource === 'All' || selectedResource === 'meetingRoom') {
        // get meeting room list by filters
        findMeetingRoomsbyFilters(selectedLocation, checkedEquipment.join(','), dateFormat(startDateTime), timeFormat(startDateTime), dateFormat(endDateTime), timeFormat(endDateTime), selectedBuilding, selectedFloor).then((res) => {
          if (res.status) {
            setMeetingRooms(res?.meetingRoomDTOs);
          } else {
            setMeetingRooms([]);
          }
        }).catch((error) => {
          console.log("filter-room", error);
        }).finally(() => {
          setLoading(false);
        });
      }

      if (selectedResource === 'All' || selectedResource === 'desk') {
        // get desk list by filters
        findDesksbyFilters(selectedLocation, dateFormat(startDateTime), timeFormat(startDateTime), dateFormat(endDateTime), timeFormat(endDateTime), selectedBuilding, selectedFloor).then((res) => {
          if (res.status) {
            setDesks(res?.deskDTOs);
          } else {
            setDesks([]);
          }
        }).catch((error) => {
          console.log("filter-desk", error);
        }).finally(() => {
          setLoading(false);
        });
      }

      if (selectedResource === 'All' || selectedResource === 'parkingSeat') {
        // get parking seat
        findParkingSeatbyFilters(selectedLocation, dateFormat(startDateTime), timeFormat(startDateTime), dateFormat(endDateTime), timeFormat(endDateTime), selectedBuilding, selectedFloor).then((res) => {
          if (res.status) {
            setParkingSeats(res?.parkingSeatDTOs||[]);
          } else {
            setParkingSeats([]);
          }
        }).catch((error) => {
          console.log("filter-parking seat", error);
        }).finally(() => {
          setLoading(false);
        });
      }

      if (selectedResource === 'All' || selectedResource === 'chargingCar') {
        // get parking seat
        getChargingCarListWithFilter(selectedLocation, dateFormat(startDateTime), timeFormat(startDateTime), dateFormat(endDateTime), timeFormat(endDateTime), selectedBuilding, selectedFloor).then((res) => {
         console.log("charging car", res);
          if (res.status) {
            setChargingCars(res?.chargingCarDTOs ||[]);
          } else {
            setChargingCars([]);
          }
        }).catch((error) => {
          console.log("filter-charging car", error);
        }).finally(() => {
          setLoading(false);
        });
      }
    }
  }

  // Clear filters
  const clearFilter = (isReset) => {
    setStartDateTime(new Date());
    setEndDateTime();
    setCheckedEquipment([]);
    setSelectedResource('All');
    setSelectedBuilding();
    setSelectedFloor();
    setSelectedDuration();
    props?.setHeaderProps({});
    isReset && getUserLocation();
  }

  // Set DateTime on filterclick
  useEffect(() => {
    if (props?.headerProps?.showFilter === true) {
      setStartDateTime(new Date());
      if (selectedDuration) {
        changeDuration({ value: selectedDuration });
      }
    }
  }, [props?.headerProps?.showFilter === true])

  useEffect(() => {
    if (isFocus) {
      props?.setPre();
      props?.setActive(3);
      setLoading(true);
      getUserLocation();

      // Datetime data update
      closeAllDateTimeView();
      clearFilter();
    }
  }, [isFocus])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {
          (meetingRooms?.length > 0 || desks?.length > 0 || parkingSeats?.length > 0) ? <>
            {
              (selectedResource === 'All' || selectedResource === 'meetingRoom') && meetingRooms?.map((item, index) => renderResourceView(index, item, 'meetingRoom'))
            }
            {
              (selectedResource === 'All' || selectedResource === 'desk') && desks?.map((item, index) => renderResourceView(index, item, 'desk'))
            }
            {
              (selectedResource === 'All' || selectedResource === 'parkingSeat') && parkingSeats?.map((item, index) => renderResourceView(index, item, 'parkingSeat'))
            }
             {
              (selectedResource === 'All' || selectedResource === 'chargingCar') && chargingCars?.map((item, index) => renderResourceView(index, item, 'chargingCar'))
            }
            {/* Empty msg */}
            {
              selectedResource === 'meetingRoom' && meetingRooms?.length === 0 && <Text style={styles.noData}>{translate?.USERSETTINGS?.NODATAFOUND}!</Text>
            }
            {
              selectedResource === 'desk' && desks?.length === 0 && <Text style={styles.noData}>{translate?.USERSETTINGS?.NODATAFOUND}!</Text>
            }
            {
              selectedResource === 'parkingSeat' && parkingSeats?.length === 0 && <Text style={styles.noData}>{translate?.USERSETTINGS?.NODATAFOUND}!</Text>
            }
            {
              selectedResource === 'chargingCar' && chargingCars?.length === 0 && <Text style={styles.noData}>{translate?.USERSETTINGS?.NODATAFOUND}!</Text>
            }
          </>
            :
            <Text style={styles.noData}>{loading ? '' : translate?.USERSETTINGS?.NODATAFOUND}</Text>
        }

      </ScrollView>

      {/* Service Modal */}
      <Modal animationType="slide" transparent={true} visible={showModel} onDismiss={() => setShowModel(false)}
        onRequestClose={() => setShowModel(false)} >
        <View style={styles.modal} >
          <View style={styles.modalContainer}>
            {loading && <LoadingIndicator />}
            {/* Header */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 8, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{translate?.ROOMS?.SERVICE}</Text>
            </View>
            {/* Body content */}
            <ScrollView style={{ padding: 10, marginBottom: 15 }}>
              {/* Equipment list */}
              {
                services?.equipment?.length > 0 &&
                <>
                  <Text style={styles.modelTitle}>{translate?.ROOMS?.EQUIPMENTS}</Text>
                  {
                    services?.equipment?.map((item, index) => (
                      <View style={styles.modelitem} key={index}>
                        <Image
                          source={{ uri: item.iconPath }}
                          style={{ ...styles?.serviceImg, backgroundColor: '#009e00' }}
                          color="#000000"
                        />
                        <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                      </View>
                    ))
                  }
                </>
              }
              {
                services?.catering?.length > 0 &&
                <>
                  <Text style={styles.modelTitle}>{translate?.ROOMS?.CATERING}</Text>
                  {
                    services?.catering?.map((item, index) => (
                      <View style={styles.modelitem} key={index}>
                        <Image
                          source={require('../../assets/catering.png')}
                          style={{ ...styles?.serviceImg, width: 30, height: 30 }}
                          color="#000000"
                        />
                        <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                      </View>
                    ))
                  }
                </>

              }
              {
                services?.IT_support?.length > 0 &&
                <>
                  <Text style={styles.modelTitle}>{translate?.ROOMS?.ITSUPPORT}</Text>
                  {
                    services?.IT_support?.map((item, index) => (
                      <View style={styles.modelitem} key={index}>
                        <Image
                          source={require('../../assets/ITsupport.png')}
                          style={styles?.serviceImg}
                          color="#000000"
                        />
                        <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                      </View>
                    ))
                  }
                </>

              }
              {
                services?.mobileEquip?.length > 0 &&
                <>
                  <Text style={styles.modelTitle}>{translate?.ROOMS?.MOBILEEQUIPMENT}</Text>
                  {
                    services?.mobileEquip?.map((item, index) => (
                      <View style={styles.modelitem} key={index}>
                        <Image
                          source={require('../../assets/mobile_service.png')}
                          style={styles?.serviceImg}
                          color="#000000"
                        />
                        <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                      </View>
                    ))
                  }
                </>
              }
              {
                services?.Special?.length > 0 &&
                <>

                  <Text style={styles.modelTitle}>{translate?.ROOMS?.SPECIAL}</Text>
                  {
                    services?.Special?.map((item, index) => (
                      <View style={styles.modelitem} key={index}>
                        <Image
                          source={require('../../assets/service.png')}
                          style={styles?.serviceImg}
                          color="#000000"
                        />
                        <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                      </View>
                    ))
                  }
                </>
              }
              {
                (loading===false && services?.equipment?.length === 0 && services?.catering?.length === 0 && services?.IT_support?.length === 0 && services?.mobileEquip?.length === 0 && services?.Special?.length === 0) &&
                <Text style={styles.noData}>{translate?.REPORT?.NOSERVICEDATAAVAILABLE}!</Text>
              }
            </ScrollView>

            <TouchableOpacity style={{ ...styles.button, justifyContent: 'flex-end', bottom: 10 }} onPress={() => {
              setShowModel(false);
              setServices(serviceItems);
            }}>
              <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>{translate?.ROOMBOOKING?.CLOSE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >

      {/* Filter Modal */}
      <Modal animationType="fade" transparent={true} visible={props?.headerProps?.showFilter || false}
        onDismiss={() => props?.setHeaderProps()} onRequestClose={() => props?.setHeaderProps({})}
      >
        <TouchableWithoutFeedback onPress={() => props?.setHeaderProps({})}>
          <View style={styles.filterModal} >
            <TouchableWithoutFeedback>
              <View style={styles.filterModalContainer}>
                {loading && <LoadingIndicator />}
                <View style={{ padding: 10 }}>
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.LOCATION} </Text>
                      <Dropdown
                        data={locations}
                        value={selectedLocation}
                        onChange={changeLocation}
                        labelField="label"
                        valueField="value"
                        placeholder={translate?.ROOMBOOKING?.SELECTLOCATION}
                        style={styles.dropdown}
                        placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                        selectedTextStyle={styles.dropItem}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.RESOURCES} </Text>
                      <Dropdown
                        data={resources}
                        value={selectedResource}
                        onChange={({ value }) => setSelectedResource(value)}
                        labelField="label"
                        valueField="value"
                        placeholder={translate?.ROOMBOOKING?.SELCETRESOURCE}
                        style={styles.dropdown}
                        placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                        selectedTextStyle={styles.dropItem}
                      />
                    </View>
                  </View>
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.BUILDING} </Text>
                      <Dropdown
                        data={building}
                        value={selectedBuilding}
                        onChange={({ value }) => {
                          setSelectedBuilding(value);
                          getFloorEquipmentbyBuilding(value);
                        }}
                        labelField="label"
                        valueField="value"
                        placeholder={translate?.ROOMBOOKING?.SELECTBUILDING}
                        style={styles.dropdown}
                        placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                        selectedTextStyle={styles.dropItem}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.FLOOR} </Text>
                      <Dropdown
                        data={floor}
                        value={selectedFloor}
                        onChange={({ value }) => setSelectedFloor(value)}
                        labelField="label"
                        valueField="value"
                        placeholder={translate?.ROOMBOOKING?.SELECTFLOOR}
                        style={styles.dropdown}
                        placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                        selectedTextStyle={styles.dropItem}
                      />
                    </View>
                  </View>
                  {['All','meetingRoom'].includes(selectedResource) && <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>{translate?.ROOMS?.EQUIPMENTS}</Text>
                    <MultiSelect
                      data={equipmentList}
                      renderItem={renderEquipment}
                      mode='auto'
                      value={checkedEquipment}
                      onChange={(value) => setCheckedEquipment(value)}
                      labelField="label"
                      valueField="value"
                      placeholder='Select Equipments'
                      style={styles.dropdown}
                      placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                      selectedTextStyle={styles.dropItem}
                      selectedStyle={styles.selectedItem}
                    />
                  </View>}
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.STARTDATE} </Text>
                      <TouchableOpacity style={styles.datetime} onPress={() => showDatePicker('start')} >
                        <Text style={{ color: '#000000' }}>{dateFormat(startDateTime)}</Text>
                        <Text style={styles.icon}> <Icon source='calendar' size={25} color="#000000" /> </Text>
                      </TouchableOpacity>
                      {showStartDate && (
                      <DateTimePicker
                        testID="datePicker1"
                        value={startDateTime}
                        mode='date'
                        display="default"
                        onChange={(event, selectedDate) => onChangeStartDateTime(event, selectedDate, 'date')}
                        minimumDate={new Date()}
                      />
                    )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.STARTTIME} </Text>
                      <TouchableOpacity style={styles.datetime} onPress={() => showTimepicker('start')} >
                        <Text style={{ color: '#000000' }}>{timeFormat(startDateTime)}</Text>
                        <Text style={styles.icon} > <Icon source='clock-outline' size={25} color="#000000" /> </Text>
                      </TouchableOpacity>
                      {showStartTime && (
                      <DateTimePicker
                        testID="timePicker1"
                        value={startDateTime}
                        mode="time"
                        display="default"
                        onChange={(event, selectedDate) => onChangeStartDateTime(event, selectedDate, 'time')}
                        minimumDate={new Date()}
                        onTouchCancel={() => setShowStartTime(false)}
                      />
                    )}
                    </View>
                  </View>
                  <View style={styles.filterView}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.ENDDATE} </Text>
                      <TouchableOpacity style={styles.datetime} onPress={() => showDatePicker('end')} >
                        <Text style={{ color: endDateTime ? '#000000' : '#8a8a8a' }}>{endDateTime ? dateFormat(endDateTime) : 'YYYY-MM-DD'}</Text>
                        <Text style={styles.icon} > <Icon source='calendar' size={25} color="#000000" /> </Text>
                      </TouchableOpacity>
                      {showEndDate && (
                        <DateTimePicker
                          testID='dateTimePicker2'
                          value={endDateTime || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => onChangeEndDateTime(event, selectedDate, 'date')}
                          minimumDate={startDateTime}
                          onTouchCancel={() => setShowEndDate(false)}
                        />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.headText}>{translate?.ROOMS?.ENDTIME} </Text>
                      <TouchableOpacity style={styles.datetime} onPress={() => showTimepicker('end')} >
                        <Text style={{ color: endDateTime ? '#000000' : '#8a8a8a' }}>{endDateTime ? timeFormat(endDateTime) : 'HH:MM'}</Text>
                        <Text style={styles.icon} > <Icon source='clock-outline' size={25} color="#000000" /> </Text>
                      </TouchableOpacity>
                      {
                        showEndTime && (
                          <DateTimePicker
                            testID='timePicker2'
                            value={endDateTime || new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, selectedDate) => onChangeEndDateTime(event, selectedDate, 'time', event)}
                            minimumDate={startDateTime}
                            onTouchCancel={() => setShowEndTime(false)}
                          />
                        )
                      }
                    </View>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.headText}>{translate?.ROOMS?.TIMEDURATION}</Text>
                    <Dropdown
                      data={timeDuration}
                      mode='modal'
                      value={selectedDuration}
                      onChange={changeDuration}
                      labelField="label"
                      valueField="value"
                      placeholder={translate?.ROOMBOOKING?.SELECTTIMEDURATION}
                      style={styles.dropdown}
                      placeholderStyle={{ ...styles.dropItem, color: '#a8a8a8' }}
                      selectedTextStyle={styles.dropItem}
                      closeModalWhenSelectedItem={true}
                    />
                  </View>
                </View>
                <View style={{ ...styles.filterView, justifyContent: 'center' }}>
                  <TouchableOpacity style={styles.button} onPress={handleFilterClick}>
                    <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }} >DONE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.button, backgroundColor: '#ec3434' }} onPress={() => clearFilter(true)}>
                    <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }} >CLEAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingTop: 30,
    color: '#9b2929'
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
    // fontSize: 15,
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
  serviceImg: {
    width: 28,
    height: 28,
    borderRadius: 100
  },
  modalContainer: {
    marginTop: 45,
    height: '90%',
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
    backgroundColor: '#fcfcfc',
  },
  filterView: {
    flexDirection: 'row',
    columnGap: 7,
    marginTop: 15
  },
  headText: {
    fontSize: 15
  },
  dropdown: {
    padding: 8,
    marginTop: 10,

    backgroundColor: 'white',
    borderRadius: 12,
    borderTopWidth: 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectedItem: {
    borderColor: '#a1a1a1',
    backgroundColor: 'white',
    borderRadius: 12,
    borderTopWidth: 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 3
  },
  dropItem: {
    padding: 2,
    color: '#000',

  },
  datetime: {
    padding: 10,
    marginTop: 10,

    // borderColor: '#a1a1a1',
    backgroundColor: 'white',
    borderRadius: 12,
    // borderTopWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    paddingHorizontal: 0
  },
  renderItem: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  renderItemText: {
    flex: 1,
    fontSize: 16,
  },
})



export default Rooms
