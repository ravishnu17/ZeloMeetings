import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { findBuildingListBasedonLocationId, findFloorsListBasedonBuildingId, getCalenderData, getCalenderResourceData, getDeskListBuildingAndFloor, getDesksByLocationId, getLocationlist, getMeetingRoomListBuildingAndFloor, getParkingSeatByLocationId, getParkingSeatListBuildingAndFloor, locationBasedCalenderMeetingRoom, loginHomeAccess } from '../../apiservices/Apiservices';
import { context } from '../../navigation/Appnav';

const CalendarView = () => {
  const props = useContext(context);
  const setLoading = props?.setLoading;
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const [events, setEvents] = useState({});

  const [selectedDate, setSelectedDate] = useState(); // Default selected date
  const [monthStartDate, setMonthStartDate] = useState();
  const [monthEndDate, setMonthEndDate] = useState();

  const [itemsLocations, setItemsLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [itemsBuildings, setItemsBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [itemsFloors, setItemsFloors] = useState([]);
  const [selectFloors, setSelectFloors] = useState(null);
  const [loginUser, setLoginUser] = useState({});

  const [meetingRoom, setMeetingRoom] = useState([]);
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);

  const [desk, setDesk] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState(null);

  const [parkingSeat, setParkingSeat] = useState([]);
  const [selectedParkingSeat, setSelectedParkingSeat] = useState(null);

  const [selectResource, setSelectResource] = useState("meetingRoom");


  useEffect(() => {
    if (isFocus) {
      props?.setPre();
      getLoginUser();
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
      // console.log("nextMonthFirstDay  intial ",nextMonthFirstDay);

      nextMonthFirstDay.setDate(nextMonthFirstDay.getDate());

      // console.log("nextMonthFirstDay  asas",nextMonthFirstDay.getDate());



      const endDate = nextMonthFirstDay.toISOString().split('T')[0];
      // console.log('Start Date:', startDate);
      // console.log('End Date:', endDate);

      setMonthStartDate(startDate);
      setMonthEndDate(endDate);
    }
  }, [isFocus]);


  const onMonthChange = (month) => {
    // console.log("month ", month);
    // // Update the start and end dates for the new month
    // const newMonthDate = new Date(month.year, month.month - 1, 1);
    // const year = newMonthDate.getFullYear();
    // const newMonth = newMonthDate.getMonth() + 1;

    // const padZero = (num) => (num < 10 ? `0${num}` : num);

    // const startDate = `${year}-${padZero(newMonth)}-01`;
    // const endDate = new Date(year, newMonth, 0).toISOString().split('T')[0];

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

  useEffect(() => {
    if (Object.keys(loginUser).length > 0) {
      getlocationApi();
    }
  }, [loginUser]);

  useEffect(() => {
    if (selectedLocation) {
      getBulidingListApi(selectedLocation);

    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedBuilding) {
      getFloorListApi(selectedBuilding);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedBuilding) {
      getMeetingRoomListByBuildingAndFloorId(selectedBuilding, selectFloors);
      getDeskListByBuildingAndFloorId(selectedBuilding, selectFloors);
      getParkingSeatListByBuildingAndFloorId(selectedBuilding, selectFloors);

    } else if (selectedLocation) {
      getMeetingRoomListByLocationId(selectedLocation);
      getDeskListByLocationId(selectedLocation);
      getParkinseatsListByLocationId(selectedLocation);
    }

  }, [selectedLocation, selectedBuilding, selectFloors]);

  useEffect(() => {
    // console.log("selectedDate",selectedDate);

    // console.log("selectedMeetingRoom",selectedMeetingRoom);
    // console.log("selectedDesk",selectedDesk);
    // console.log("selectedParkingSeat",selectedParkingSeat);




    if (selectedMeetingRoom !== null || selectedDesk !== null || selectedParkingSeat !== null) {

      resourcedateBasedBooking(selectedLocation, selectResource, selectedMeetingRoom, selectedDesk, selectedParkingSeat, monthStartDate, monthEndDate);
      // console.log("resource based");

    } else {
      calenderApi(selectedLocation, selectedBuilding, selectFloors, selectResource, monthStartDate, monthEndDate);
    }


  }, [selectedLocation, selectedBuilding, selectFloors, selectResource, monthStartDate, monthEndDate, selectedMeetingRoom, selectedDesk, selectedParkingSeat]);

  const calenderApi = (locationId, buildingId, floorId, resource, startDate, endDate) => {
    setLoading(true);
    getCalenderData(resource, locationId, startDate, endDate, buildingId, floorId).then((res) => {
      setEvents({});
      if (res?.status) {
        const eventMarks = res?.bookings?.reduce((acc, event) => {
          const date = event.startDate;
          if (date && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            if (!acc[date]) {
              acc[date] = { marked: true, dotColor: 'blue', events: [] };
            }
            acc[date].events.push(event);
          }
          return acc;
        }, {});
        setEvents(eventMarks);}
    }).finally(() =>setLoading(false));
  };

  const resourcedateBasedBooking = (locationId, resource, meetingRoom, desk, parkingSeat, monthStartDate, monthEndDate) => {

    datas = {
      carId: null,
      chargingCarId: null,
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
            acc[date].events.push(event);
          }
          return acc;
        }, {});
        setEvents(eventMarks);
      }
    }).finally(() =>setLoading(false));
  };

  const getLoginUser = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      loginHomeAccess(userId).then((res) => {
        if (res.status) {
          setLoginUser(res);
        }
      });
    }
  };

  const getlocationApi = () => {
    getLocationlist().then((res) => {
      setItemsLocations([]);
      if (res.status) {
        const locationOptions = res.customerLocations.map((item) => ({
          label: item.location,
          value: item.id,
        }));
        setItemsLocations(locationOptions);
        const itemsLocationsId = loginUser?.customerDetails?.location?.id || loginUser?.user?.location?.id;
        locationOptions.forEach((item) => {
          if (item.value === itemsLocationsId) {
            setSelectedLocation(item.value);
          }
        });
      }
    });
  };

  const getBulidingListApi = (id) => {
    findBuildingListBasedonLocationId(id).then((res) => {
      setItemsBuildings([]);
      setSelectedBuilding(null);
      if (res.status) {


        // let updatedList =  res?.buildings;
        // const newdata = {
        //   id: null,
        //   name: "Select Building",
        // };

        // if (!updatedList.includes(newdata)) {
        //   updatedList = [newdata, ...updatedList];
        // }

        // const transformedData = updatedList.map(capacity => ({
        //   label: item.name,
        //   value: item.id,
        // }));
        // console.log("buildingOptions",transformedData);
        // setItemsBuildings(transformedData);

        const buildingOptions = res?.buildings?.map((item) => ({
          label: item.name,
          value: item.id,
        }));

        setItemsBuildings(buildingOptions);


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
        setItemsFloors(floorOption);
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
        setMeetingRoom(meetingOption);
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
        setMeetingRoom(meetingOption);
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
        setDesk(deskOption);
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
        setDesk(deskOption);
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
        setParkingSeat(parkingseatOption);
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
        setParkingSeat(parkingseatOption);
      }
    });
  };


  const formatDate = (date1) => {
    const day = date1.getDate().toString().padStart(2, '0');
    const month = (date1.getMonth() + 1).toString().padStart(2, '0');
    const year = date1.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleEventClick = (event) => {
    navigation.navigate('EditBooking', { id: event });

  };


  const renderEventDetails = (dateString) => {
    const eventDetails = events[dateString]?.events || [];
    if (eventDetails.length > 0) {
      return eventDetails.map((event, index) => (

        <View key={index} style={styles.eventContainer}>
          <TouchableOpacity onPress={() => handleEventClick(event.id)}>
            {selectResource === "meetingRoom" && (
              <Text style={styles.eventText}>{event?.meetingRoom?.name || 'N/A'}</Text>
            )}
            {selectResource === "desk" && (
              <Text style={styles.eventText}>{event?.desk?.name || 'N/A'}</Text>
            )}
            {selectResource === "parkingSeat" && (
              <Text style={styles.eventText}>{event?.parkingSeat?.name || 'N/A'}</Text>
            )}
            <Text style={styles.eventText}>{event?.subject}</Text>
          </TouchableOpacity>
        </View>



      ));
    }
    return (
      <View style={styles.eventContainer}>
        <Text style={[styles.eventText, { color: "red" }]}>No events for this date</Text>
      </View>
    );
  };

  // console.log("selectResource",selectResource);




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          onMonthChange={onMonthChange}
          markedDates={events}
        />
        <View style={styles.pickerContainer}>
          <View style={styles.locationview}>
            <Text>Location</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={itemsLocations}
              labelField="label"
              valueField="value"
              placeholder="Select Location"
              value={selectedLocation}
              onChange={(item) => setSelectedLocation(item.value)}
            />
          </View>
          <View style={styles.locationview}>
            <Text>Building</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={itemsBuildings}
              labelField="label"
              valueField="value"
              placeholder="Select Building"
              value={selectedBuilding}
              onChange={(item) => setSelectedBuilding(item.value)}
            />
          </View>

        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.locationview}>
            <Text>Floor</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={itemsFloors}
              labelField="label"
              valueField="value"
              placeholder="Select Floor"
              value={selectFloors}
              onChange={(item) => setSelectFloors(item.value)}
            />
          </View>
          {
            selectResource === 'meetingRoom' &&
            <View style={styles.locationview}>
              <Text>Meeting Room</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={meetingRoom}
                labelField="label"
                valueField="value"
                placeholder="Select Meeting Room"
                value={selectedMeetingRoom}
                onChange={(item) => setSelectedMeetingRoom(item.value)}
              />
            </View>
          }

          {
            selectResource === 'desk' &&
            <View style={styles.locationview}>
              <Text>Desk</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={desk}
                labelField="label"
                valueField="value"
                placeholder="Select Desk"
                value={selectedDesk}
                onChange={(item) => setSelectedDesk(item.value)}
              />
            </View>
          }
          {
            selectResource === 'parkingSeat' &&
            <View style={styles.locationview}>
              <Text>Parking Seat</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={parkingSeat}
                labelField="label"
                valueField="value"
                placeholder="Select Parking Seat"
                value={selectedParkingSeat}
                onChange={(item) => setSelectedParkingSeat(item.value)}
              />
            </View>
          }


        </View>

        <View style={styles.buttonsContainer}>
          {
            selectResource === 'meetingRoom' ? (

              <TouchableOpacity style={styles.selectRoomButton} onPress={() => setSelectResource('meetingRoom')}>
                <Text style={styles.buttonText} >Meeting Rooms</Text>
              </TouchableOpacity>


            ) : (
              <TouchableOpacity style={styles.roombutton} onPress={() => setSelectResource('meetingRoom')}>
                <Text style={styles.buttonText} >Meeting Rooms</Text>
              </TouchableOpacity>
            )
          }

          {
            selectResource === 'desk' ? (

              <TouchableOpacity style={styles.selectDeskButton} onPress={() => setSelectResource('desk')}>
                <Text style={styles.buttonText} >Desks</Text>
              </TouchableOpacity>


            ) : (
              <TouchableOpacity style={styles.deskbutton} onPress={() => setSelectResource('desk')}>
                <Text style={styles.buttonText} >Desks</Text>
              </TouchableOpacity>
            )
          }
          {
            selectResource === 'parkingSeat' ? (

              <TouchableOpacity style={styles.selectParkingseatButton} onPress={() => setSelectResource('parkingSeat')}>
                <Text style={styles.buttonText} >Parking Seats</Text>
              </TouchableOpacity>


            ) : (
              <TouchableOpacity style={styles.parkingseatbutton} onPress={() => setSelectResource('parkingSeat')}>
                <Text style={styles.buttonText} >Parking Seats</Text>
              </TouchableOpacity>
            )
          }


        </View>

        <Text style={styles.heading}>Bookings</Text>
        <ScrollView>{renderEventDetails(selectedDate)}</ScrollView>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AddBooking')}>
            <Icon name="plus-circle" size={30} color="#007bff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'column',
    marginVertical: 20,
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
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  eventText: {
    fontSize: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  roombutton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  selectRoomButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    borderColor: '#F70ACC',
    borderWidth: 3,
  },
  deskbutton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  selectDeskButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    borderColor: '#F70ACC',
    borderWidth: 3,
  },
  parkingseatbutton: {
    padding: 10,
    backgroundColor: '#F17E44',
    borderRadius: 5,
  },
  selectParkingseatButton: {
    padding: 10,
    backgroundColor: '#F17E44',
    borderRadius: 5,
    borderColor: '#F70ACC',
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  resourceContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
  },

});

export default CalendarView;
