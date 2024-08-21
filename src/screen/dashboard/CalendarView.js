import React, { useState, useEffect, useContext, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { findBuildingListBasedonLocationId, findFloorsListBasedonBuildingId, getCalenderData, getCalenderResourceData, getCarByBuildingFloor, getCarListByLocation, getChargingCarByBuildingFloor, getChargingCarList, getDeskListBuildingAndFloor, getDesksByLocationId, getLocationlist, getMeetingRoomListBuildingAndFloor, getParkingSeatByLocationId, getParkingSeatListBuildingAndFloor, locationBasedCalenderMeetingRoom, loginHomeAccess } from '../../apiservices/Apiservices';
import { context } from '../../navigation/Appnav';

const CalendarView = ({ route }) => {
  const params = route.params;
  const props = useContext(context);
  const translate = props?.language;
  const setLoading = props?.setLoading;
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const [events, setEvents] = useState({});

  const [selectedDate, setSelectedDate] = useState(); // Default selected date
  const [monthStartDate, setMonthStartDate] = useState();
  const [monthEndDate, setMonthEndDate] = useState();

  const [itemsLocations, setItemsLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const defaultBuilding = { value: null, label: translate?.ROOMBOOKING?.SELECTBUILDING };
  const [itemsBuildings, setItemsBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const defaultFloor = { value: null, label: translate?.ROOMBOOKING?.SELECTFLOOR };
  const [itemsFloors, setItemsFloors] = useState([defaultFloor]);
  const [selectFloors, setSelectFloors] = useState(null);
  const [loginUser, setLoginUser] = useState({});

  const defaultRoom = { value: null, label: translate?.DISPLAYMODALFORM?.SELECTMEETINGROOM };
  const [meetingRoom, setMeetingRoom] = useState([]);
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);

  const defaultDesk = { value: null, label: translate?.DISPLAYMODALFORM?.SELECTDESK };
  const [desk, setDesk] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState(null);

  const defaultParkingSeat = { value: null, label: translate?.DISPLAYMODALFORM?.SELECTPARKINGSEAT };
  const [parkingSeat, setParkingSeat] = useState([]);
  const [selectedParkingSeat, setSelectedParkingSeat] = useState(null);

  const defaultChargingCar = { value: null, label: translate?.DISPLAYMODALFORM?.SELECTCHARGINGCAR };
  const [chargingCar, setChargingCars] = useState([]);
  const [selectedChargingCar, setSelectedChargingCar] = useState(null);

  const defaultCar = { value: null, label: translate?.ROOMBOOKING?.SELECTCAR };
  const [car, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const [selectResource, setSelectResource] = useState("meetingRoom");

  const onMonthChange = (month) => {
    // Update the start and end dates for the new month
    const year = month.year;
    const newMonth = month.month; // month.month is already 1-based (1 for January, 2 for February, etc.)

    const padZero = (num) => (num < 10 ? `0${num}` : num);

    // Start date of the selected month
    const startDate = `${year}-${padZero(newMonth)}-01`;

    // End date of the selected month
    const nextMonthFirstDay = new Date(year, newMonth, 1);
    // console.log("nextMonthFirstDay  intial ",nextMonthFirstDay);

    nextMonthFirstDay.setDate(nextMonthFirstDay.getDate());

    // console.log("nextMonthFirstDay  asas",nextMonthFirstDay.getDate());



    const endDate = nextMonthFirstDay.toISOString().split('T')[0];

    // console.log(' month Start Date:', startDate);
    // console.log(' month End Date:', endDate);

    setMonthStartDate(startDate);
    setMonthEndDate(endDate);

  };

  const checkBookingStatus = (startDate, startTime, endDate, endTime) => {
    const currDate = new Date();
    let startDateTime = new Date(startDate + ' ' + startTime);
    let endDateTime = new Date(endDate + ' ' + endTime);
    if (currDate > startDateTime && currDate < endDateTime) {
      return 'ongoing';
    }
    else if (currDate < startDateTime) {
      return 'upcoming';
    }
    else {
      return 'completed';
    }
  }

  const calenderApi = (locationId, buildingId, floorId, resource, startDate, endDate) => {
    setLoading(true);
    getCalenderData(resource, locationId, startDate, endDate, buildingId, floorId).then((res) => {
      setEvents({});
      if (res?.status) {
        const eventMarks = res?.bookings?.sort((a, b) => new Date(a.startDate + ' ' + a.startTime) - new Date(b.startDate + ' ' + b.startTime))?.reduce((acc, event) => {
          const date = event.startDate;
          if (date && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            if (!acc[date]) {
              acc[date] = { marked: true, dotColor: 'blue', events: [] };
            }
            acc[date].events.push({ ...event, status: checkBookingStatus(event.startDate, event.startTime, event.endDate, event.endTime) });
          }
          return acc;
        }, {});
        eventMarks[selectedDate] ? eventMarks[selectedDate]['selected'] = true : eventMarks[selectedDate]= {'selected': true}
        setEvents(eventMarks);
      }
    }).finally(() => setLoading(false));
  };

  const resourcedateBasedBooking = (locationId, resource, meetingRoom, desk, parkingSeat, chargingCarId, carId, monthStartDate, monthEndDate) => {
    datas = {
      carId: carId,
      chargingCarId: chargingCarId,
      customerLocationId: locationId,
      deskId: desk,
      endDate: monthEndDate,
      meetingRoomId: meetingRoom,
      parkingSeatId: parkingSeat,
      sourceType: resource,
      startDate: monthStartDate,
    }
    setLoading(true);
    getCalenderResourceData(datas).then((res) => {
      setEvents({});
      if (res?.status) {
        const eventMarks = res?.bookings?.reduce((acc, event) => {
          const date = event.startDate;
          if (date && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            if (!acc[date]) {
              acc[date] = { marked: true, dotColor: 'blue', events: [] };
            }
            acc[date].events.push({ ...event, status: checkBookingStatus(event.startDate, event.startTime, event.endDate, event.endTime) });
          }
          return acc;
        }, {});
        eventMarks[selectedDate] ? eventMarks[selectedDate]['selected'] = true : eventMarks[selectedDate]= {'selected': true}
        setEvents(eventMarks);
      }
    }).finally(() => setLoading(false));
  };

  const getLoginUser = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      loginHomeAccess(userId).then((res) => {
        if (res.status) {
          setLoginUser(res);
          getlocationApi(res?.customerDetails?.location?.id || res?.user?.location?.id);
        }
      });
    }
  };

  const getlocationApi = (userLocation) => {
    getLocationlist().then((res) => {
      setItemsLocations([]);
      if (res.status) {
        const locationOptions = res.customerLocations.map((item) => ({
          label: item.location,
          value: item.id,
        }));
        setItemsLocations(locationOptions);
        locationOptions.forEach((item) => {
          if (item.value === userLocation) {
            handleChangeLocation({ value: item.value }, params?.type || "meetingRoom");
          }
        });
      }
    }).finally(() => {
      // setLoading(false);
    });
  };

  const getBulidingListApi = (id) => {
    findBuildingListBasedonLocationId(id).then((res) => {
      setItemsBuildings([defaultBuilding]);
      setSelectedBuilding(null);
      if (res.status) {
        const buildingOptions = res?.buildings?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setItemsBuildings([defaultBuilding, ...buildingOptions]);
      }
    });
  };

  const getFloorListApi = (id) => {
    findFloorsListBasedonBuildingId(id).then((res) => {
      setItemsFloors([]);
      setSelectFloors(null);
      if (res.status) {
        const floorOption = res?.floors?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setItemsFloors([defaultFloor, ...floorOption]);
      }
    });
  };

  //location based meeting room
  const getMeetingRoomListByLocationId = (id) => {
    locationBasedCalenderMeetingRoom(id).then((res) => {
      setMeetingRoom([]);
      setSelectedMeetingRoom(null);
      if (res.status) {
        const meetingOption = res?.meetingRoomDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setMeetingRoom([defaultRoom, ...meetingOption]);
      }
    });
  };

  //building And Floor Based Meeting Room
  const getMeetingRoomListByBuildingAndFloorId = (selectedBuilding, selectFloors) => {
    getMeetingRoomListBuildingAndFloor(selectedBuilding, selectFloors).then((res) => {
      setMeetingRoom([]);
      setSelectedMeetingRoom(null);
      if (res.status) {
        const meetingOption = res?.meetingRoomDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setMeetingRoom([defaultRoom, ...meetingOption]);
      }
    });
  };

  //location based desk
  const getDeskListByLocationId = (id) => {
    getDesksByLocationId(id).then((res) => {
      setDesk([]);
      setSelectedDesk(null);
      if (res.status) {
        const deskOption = res?.deskDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setDesk([defaultDesk, ...deskOption]);
      }
    });
  };

  //building And Floor Based Desk
  const getDeskListByBuildingAndFloorId = (selectedBuilding, selectFloors) => {
    getDeskListBuildingAndFloor(selectedBuilding, selectFloors).then((res) => {
      setDesk([]);
      setSelectedDesk(null);
      if (res.status) {
        const deskOption = res?.deskDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setDesk([defaultDesk, ...deskOption]);
      }
    });
  };

  //location based parkingSeats
  const getParkinseatsListByLocationId = (id) => {
    getParkingSeatByLocationId(id).then((res) => {
      setParkingSeat([]);
      setSelectedParkingSeat(null);
      // console.log("parking seats", res);
      if (res.status) {
        const parkingseatOption = res?.parkingSeatDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setParkingSeat([defaultParkingSeat, ...parkingseatOption]);
      }
    });
  };

  //building And Floor Based ParkingSeats
  const getParkingSeatListByBuildingAndFloorId = (selectedBuilding, selectFloors) => {
    getParkingSeatListBuildingAndFloor(selectedBuilding, selectFloors).then((res) => {
      setParkingSeat([]);
      setSelectedParkingSeat(null);
      if (res.status) {
        const parkingseatOption = res?.parkingSeatDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setParkingSeat([defaultParkingSeat, ...parkingseatOption]);
      }
    });
  };

  // location based chargingCar
  const getChargingCarListByLocationId = (id) => {
    setLoading(true);
    getChargingCarList(id).then((res) => {
      setSelectedChargingCar(null);
      if (res.status) {
        const chargingCarOption = res?.chargingCarDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setChargingCars([defaultChargingCar, ...chargingCarOption]);
      } else {
        setChargingCars([]);
      }
    }).catch((err) => {
      console.log("charging car location", err);
      setChargingCars([]);
    }).finally(() => setLoading(false));
  };

  // charging car by building & floor
  const getChargingCarListByBuildingAndFloorId = (selectedBuilding, selectFloors) => {
    setLoading(true);
    getChargingCarByBuildingFloor(selectedBuilding, selectFloors).then((res) => {
      setSelectedChargingCar(null);
      if (res.status) {
        const chargingCarOption = res?.chargingCarDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setChargingCars([defaultChargingCar, ...chargingCarOption]);
      } else {
        setChargingCars([]);
      }
    }).catch((err) => {
      console.log("charging car building floor", err);
      setChargingCars([]);
    }).finally(() => setLoading(false));
  };

  // location based car
  const getCarListByLocationId = (id) => {
    getCarListByLocation(id).then((res) => {
      setSelectedCar(null);
      console.log("car location", res);
      if (res.status) {
        const carOption = res?.carDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setCars([defaultChargingCar, ...carOption]);
      } else {
        setCars([]);
      }
    }).catch((err) => {
      console.log(" car location", err);
      setCars([]);
    }).finally(() => setLoading(false));
  }
  // car by building & floor
  const getCarListByBuildingAndFloorId = (selectedBuilding, selectFloors) => {
    getCarByBuildingFloor(selectedBuilding, selectFloors).then((res) => {
      setSelectedCar(null);
      if (res.status) {
        const carOption = res?.carDTOs?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setCars([defaultChargingCar, ...carOption]);
      } else {
        setCars([]);
      }
    }).catch((err) => {
      console.log(" car building floor", err);
      setCars([]);
    }).finally(() => setLoading(false));
  }

  const renderEventDetails = (dateString) => {
    const eventDetails = events[dateString]?.events || [];
    if (eventDetails.length > 0) {
      return eventDetails.map((event, index) => {
        let color = event?.status === 'ongoing' ? '#bb3f34' : event?.status === 'upcoming' ? '#03397E' : '#6d7486';
        return (
          <View key={index} style={styles.eventContainer}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, borderRadius: 5, padding: 8 }} onPress={() => handleEventClick(event.id)}>
              <View style={{ flex: 6 }}>
                {selectResource === "meetingRoom" && (
                  <Text style={styles.eventText}>{event?.meetingRoom?.name || 'N/A'}</Text>
                )}
                {selectResource === "desk" && (
                  <Text style={styles.eventText}>{event?.desk?.name || 'N/A'}</Text>
                )}
                {selectResource === "parkingSeat" && (
                  <Text style={styles.eventText}>{event?.parkingSeat?.name || 'N/A'}</Text>
                )}
                {selectResource === "chargingCar" && (
                  <Text style={styles.eventText}>{event?.chargingCar?.name || 'N/A'}</Text>
                )}
                {selectResource === "car" && (
                  <Text style={styles.eventText}>{event?.car?.name || 'N/A'}</Text>
                )}
                <Text style={[styles.eventText, { fontSize: 13, marginTop: 3 }]}>{event?.subject}</Text>
              </View>
              <View style={{ flex: 4, alignItems: 'center', paddingRight: 10 }}>
                <Text style={{ color: '#fff', fontSize: 12, marginTop: 5 }}>{`${event?.startDate}, ${event?.startTime}`}</Text>
                <Text style={{ color: '#fff', fontSize: 12, marginTop: 5 }}>{`${event?.endDate}, ${event?.endTime}`}</Text>
              </View>

            </TouchableOpacity>
          </View>
        );
      });
    }
    return (
      <View style={styles.eventContainer}>
        <Text style={[styles.eventText, { color: "red" }]}>No events for this date</Text>
      </View>
    );
  };

  // Location based data API call
  const getDataByLocation = (locationID, resourceType) => {
    if (resourceType === "meetingRoom") {
      getMeetingRoomListByLocationId(locationID);
    } else if (resourceType === "desk") {
      getDeskListByLocationId(locationID);
    } else if (resourceType === "parkingSeat") {
      getParkinseatsListByLocationId(locationID);
    } else if (resourceType === "chargingCar") {
      getChargingCarListByLocationId(locationID);
    } else if (resourceType === "car") {
      getCarListByLocationId(locationID);
    }
  }

  // Building and Floor based data API call
  const getDataByBuildingAndFloor = (buildingID, floorID, resourceType) => {
    if (resourceType === "meetingRoom") {
      getMeetingRoomListByBuildingAndFloorId(buildingID, floorID);
    } else if (resourceType === "desk") {
      getDeskListByBuildingAndFloorId(buildingID, floorID);
    } else if (resourceType === "parkingSeat") {
      getParkingSeatListByBuildingAndFloorId(buildingID, floorID);
    } else if (resourceType === "chargingCar") {
      getChargingCarListByBuildingAndFloorId(buildingID, floorID);
    } else if (resourceType === "car") {
      getCarListByBuildingAndFloorId(buildingID, floorID);
    }
  }

  const clearSelection = () => {
    setSelectedMeetingRoom(null);
    setSelectedDesk(null);
    setSelectedParkingSeat(null);
    setSelectedChargingCar(null);
    setSelectedBuilding(null);
    setSelectFloors(null);

    setItemsFloors([]);
  }

  const handleChangeLocation = (item, resourceType) => {
    getBulidingListApi(item.value)
    setSelectedLocation(item.value);
    clearSelection();
    getDataByLocation(item.value, resourceType);
  }

  const handleBuildingChange = (item) => {
    if (item.value) {
      getFloorListApi(item.value);
      getDataByBuildingAndFloor(item.value, selectFloors, selectResource);
    } else {
      setItemsFloors([]);
      setSelectFloors(null);
      getDataByLocation(selectedLocation, selectResource);
    }
    setSelectedBuilding(item.value);
  }

  const handleFloorChange = (item) => {
    getDataByBuildingAndFloor(selectedBuilding, item.value, selectResource);
    setSelectFloors(item.value);
  }

  // Handle Change resource 
  const handleChangeResource = (value) => {
    if (selectResource !== value) {
      setSelectResource(value);
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
      setEvents({});

      // Set empty
      clearSelection();
      handleChangeLocation({ value: selectedLocation }, value);
    }
  };

  // Handle event click
  const handleEventClick = (event) => {
    navigation.navigate('EditBooking', { id: event });
  };

  // Get calendar event data based on specific resource or location, building and floor
  useEffect(() => {
    if (selectedMeetingRoom !== null || selectedDesk !== null || selectedParkingSeat !== null || selectedChargingCar !== null || selectedCar !== null) {
      resourcedateBasedBooking(selectedLocation, selectResource, selectedMeetingRoom, selectedDesk, selectedParkingSeat, selectedChargingCar, selectedCar, monthStartDate, monthEndDate);
    } else {
      selectedLocation && calenderApi(selectedLocation, selectedBuilding, selectFloors, selectResource, monthStartDate, monthEndDate);
    }
  }, [selectedLocation, selectedBuilding, selectFloors, selectResource, monthStartDate, monthEndDate, selectedMeetingRoom, selectedDesk, selectedParkingSeat, selectedChargingCar, selectedCar]);

  // Initial useEffect call
  useEffect(() => {
    if (isFocus) {
      setSelectResource(params?.type || "meetingRoom");
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      props?.setPre();
      props?.setActive(2);
      getLoginUser();

      // Set date
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);

      const today1 = new Date();
      const year = today1.getFullYear();
      const month = today1.getMonth() + 1; // Months are zero-based in JavaScript

      // Function to pad single digit month and day with leading zero
      const padZero = (num) => (num < 10 ? `0${num}` : num);

      // Start date of the current month
      const startDate = `${year}-${padZero(month)}-01`;

      // End date of the selected month
      const nextMonthFirstDay = new Date(year, month, 1);

      nextMonthFirstDay.setDate(nextMonthFirstDay.getDate());
      const endDate = nextMonthFirstDay.toISOString().split('T')[0];
      setMonthStartDate(startDate);
      setMonthEndDate(endDate);
    } else {
      setSelectedLocation(null);
    }
  }, [isFocus]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 6 }} ref={scrollRef}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => {
            let tempEvents= {...events, 
              [day.dateString]: {...events[day.dateString], selected: true}, 
              [selectedDate]: {...events[selectedDate], selected: false }
            };
            setEvents(tempEvents);
            setSelectedDate(day.dateString);
          }}
          onMonthChange={onMonthChange}
          markedDates={events}
        />
        <View style={styles.pickerContainer}>
          <View style={styles.locationview}>
            <Text>{translate?.ROOMBOOKING?.LOCATIONS}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={itemsLocations}
              labelField="label"
              valueField="value"
              placeholder={translate?.ROOMBOOKING?.SELECTLOCATION}
              value={selectedLocation}
              onChange={(item) => handleChangeLocation(item, selectResource)}
            />
          </View>
          <View style={styles.locationview}>
            <Text>{translate?.ROOMBOOKING?.BUILDING}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={itemsBuildings}
              labelField="label"
              valueField="value"
              placeholder={translate?.ROOMBOOKING?.SELECTBUILDING}
              value={selectedBuilding}
              onChange={handleBuildingChange}
            />
          </View>

        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.locationview}>
            <Text>{translate?.ROOMBOOKING?.FLOOR}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={itemsFloors}
              labelField="label"
              valueField="value"
              placeholder={translate?.ROOMBOOKING?.SELECTFLOOR}
              value={selectFloors}
              onChange={handleFloorChange}
            />
          </View>
          {
            selectResource === 'meetingRoom' &&
            <View style={styles.locationview}>
              <Text>{translate?.ROOMS?.MEETINGROOM}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={meetingRoom}
                labelField="label"
                valueField="value"
                placeholder={translate?.DISPLAYMODALFORM?.SELECTMEETINGROOM}
                value={selectedMeetingRoom}
                onChange={(item) => setSelectedMeetingRoom(item.value)}
              />
            </View>
          }

          {
            selectResource === 'desk' &&
            <View style={styles.locationview}>
              <Text>{translate?.ROOMS?.DESK}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={desk}
                labelField="label"
                valueField="value"
                placeholder={translate?.DISPLAYMODALFORM?.SELECTDESK}
                value={selectedDesk}
                onChange={(item) => setSelectedDesk(item.value)}
              />
            </View>
          }
          {
            selectResource === 'parkingSeat' &&
            <View style={styles.locationview}>
              <Text>{translate?.ROOMS?.PARKINGSEATS}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={parkingSeat}
                labelField="label"
                valueField="value"
                placeholder={translate?.DISPLAYMODALFORM?.SELECTPARKINGSEAT}
                value={selectedParkingSeat}
                onChange={(item) => setSelectedParkingSeat(item.value)}
              />
            </View>
          }
          {
            selectResource === 'chargingCar' &&
            <View style={styles.locationview}>
              <Text>{translate?.DISPLAYMODALFORM?.CHARGINGCAR}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={chargingCar}
                labelField="label"
                valueField="value"
                placeholder={translate?.DISPLAYMODALFORM?.SELECTCHARGINGCAR}
                value={selectedChargingCar}
                onChange={(item) => setSelectedChargingCar(item.value)}
              />
            </View>
          }
          {
            selectResource === 'car' &&
            <View style={styles.locationview}>
              <Text>{translate?.ROOMS?.CAR}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={car}
                labelField="label"
                valueField="value"
                placeholder={translate?.ROOMBOOKING?.SELECTCAR}
                value={selectedCar}
                onChange={(item) => setSelectedCar(item.value)}
              />
            </View>
          }
        </View>

        <View style={styles.resourceContainer}>
          <TouchableOpacity style={[styles.resourceButton, selectResource === 'meetingRoom' ? styles?.selectedResource : {}, { backgroundColor: '#007bff' }]} onPress={() => handleChangeResource('meetingRoom')}>
            <Text style={styles.resourceButtonText} >{translate?.DISPLAYMODALFORM?.MEETINGROOM}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resourceButton, selectResource === 'desk' ? styles?.selectedResource : {}, { backgroundColor: '#28a745' }]} onPress={() => handleChangeResource('desk')}>
            <Text style={styles.resourceButtonText} >{translate?.DISPLAYMODALFORM?.DESK}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resourceButton, selectResource === 'parkingSeat' ? styles?.selectedResource : {}, { backgroundColor: '#F17E44' }]} onPress={() => handleChangeResource('parkingSeat')}>
            <Text style={styles.resourceButtonText} >{translate?.DISPLAYMODALFORM?.PARKINGSEAT}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resourceButton, selectResource === 'chargingCar' ? styles?.selectedResource : {}, { backgroundColor: '#3c4355' }]} onPress={() => handleChangeResource('chargingCar')}>
            <Text style={styles.resourceButtonText} >{translate?.DISPLAYMODALFORM?.CHARGINGCAR}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resourceButton, selectResource === 'car' ? styles?.selectedResource : {}, { backgroundColor: '#f15e44' }]} onPress={() => handleChangeResource('car')}>
            <Text style={styles.resourceButtonText} >{translate?.ROOMS?.CAR}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>{translate?.MENU?.BOOKING}</Text>
        {!props?.loading && <ScrollView>{renderEventDetails(selectedDate)}</ScrollView>}
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 50, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('AddBooking', { resource: selectResource })}>
          <Icon name="plus-circle" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  pickerContainer: {
    flexDirection: 'column',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationview: {
    // marginBottom: 20,
    width: '48%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  eventContainer: {
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  eventText: {
    fontSize: 16,
    color: '#fff'
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#007bff',
  },
  // Resource buttons
  resourceContainer: {
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 20
  },
  resourceButton: {
    flex: 1,
    // marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 3
  },
  resourceButtonText: {
    color: '#FFFFFF',
    // fontSize: 13,
    textAlign: 'center',
    flexWrap: 'wrap', // Allow text to wrap inside the button
  },
  selectedResource: {
    borderRadius: 5,
    borderColor: '#F70ACC',
    borderWidth: 3,
  }
});

export default CalendarView;
