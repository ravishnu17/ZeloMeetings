import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View ,ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { findBuildingListBasedonLocationId, findFloorsListBasedonBuildingId, getLocationlist, locationBasedCalenderMeetingRoom, loginHomeAccess } from '../../apiservices/Apiservices';

const CalendarView = () => {
  const navigation=useNavigation();
  const [events, setEvents] = useState({});

  const [selectedDate, setSelectedDate] = useState(); // Default selected date

  const [itemsLocations, setItemsLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [itemsBuildings, setItemsBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [itemsFloors, setItemsFloors] = useState([]);
  const [selectFloors, setSelectFloors] = useState(null);
  const [loginUser, setLoginUser] = useState({});

  const [meetingRoom, setMeetingRoom] = useState([]);
  const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);

  const [selectResource, setSelectResource] = useState(null);
  

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Simulate fetching data from backend
    const backendResponse = [
      {
        id: 273982,
        bookingId: 'MRR404476',
        requesterName: 'Joe Nishanth',
        startDate: today,
        startTime: '08:30',
        endDate: today,
        endTime: '08:30',
        subject: 'new office to zelo',
        meetingRoom: { name: 'Meeting Room 1', status: true },
      },
      {
        id: 273989,
        bookingId: 'MRR988811',
        requesterName: 'Joe Nishanth',
        startDate: today,
        startTime: '12:00',
        endDate:today,
        endTime: '12:29',
        subject: 'Test Meeting 101',
        meetingRoom: { name: 'Meeting Room 2', status: true },
      },
      {
        id: 273986,
        bookingId: 'MRR404476',
        requesterName: 'Joe Nishanth',
        startDate: '2024-07-25',
        startTime: '08:30',
        endDate: '2024-07-26',
        endTime: '08:30',
        subject: 'Test office to zelo',
        meetingRoom: { name: 'TestRoomForLocal', status: true },
      },
      {
        id: 273985,
        bookingId: 'MRR988811',
        requesterName: 'Joe Nishanth',
        startDate: '2024-07-26',
        startTime: '12:00',
        endDate: '2024-07-26',
        endTime: '12:29',
        subject: 'Test Meeting 101',
        meetingRoom: { name: 'Meeting Room 101', status: true },
      },
      {
        id: 273984,
        bookingId: 'MRR769472',
        requesterName: 'Joe Nishanth',
        startDate: '2024-07-26',
        startTime: '07:30',
        endDate: '2024-07-26',
        endTime: '07:29',
        subject: 'Test',
        meetingRoom: { name: 'TestRoomForLocal', status: true },
      },
      {
        id: 274063,
        bookingId: 'MRR732287',
        requesterName: 'Joe Nishanth',
        startDate: '2024-07-27',
        startTime: '16:40',
        endDate: '2024-07-27',
        endTime: '16:54',
        subject: 'mobile',
        meetingRoom: { name: 'Meeting Room 101', status: true },
      },
    ];

    // Transform the backend response into a format suitable for markedDates
    const eventMarks = backendResponse.reduce((acc, event) => {
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
     // Set today's date as the default selected date
     setSelectedDate(today);
  }, []);

   useEffect(() => {
        getLoginUser();
       
    }, []);

    useEffect(() => {
        Object.keys(loginUser).length > 0 && getlocationApi();
    },[loginUser])

    const getLoginUser = async () => {
        const userId =await AsyncStorage.getItem('userId');
         if(userId){
            loginHomeAccess(userId).then((res) => {
                if(res.status){
                setLoginUser(res.user);
                }
            })
         } 
    }

    // console.log("loginUser ",loginUser.id);
    const getlocationApi = () => {
        getLocationlist().then((res) => {
            // console.log("location ", res);
            setItemsLocations([]);
            if(res.status){
            const locationOptions = res.customerLocations.map(item => ({
                label: item.location,
                value: item.id
            }));
            setItemsLocations(locationOptions);
            const itemsLocationsId=loginUser?.location?.id;
            // console.log("itemsLocationsId ",itemsLocationsId);
            locationOptions.map((item)=>{
                if(item.value === itemsLocationsId){
                    setSelectedLocation(item.value);
                }
            })
        }
        })

    }

    useEffect(() => {
     getBulidingListApi(selectedLocation);
     getMeetingRoomListByLocationId(selectedLocation);
    },[selectedLocation])

    const getBulidingListApi =(id) =>{
      findBuildingListBasedonLocationId(id).then((res) => {
          // console.log("building ", res.buildings);
          setItemsBuildings([]);
          if(res.status){
          
          const buildingOptions = res.buildings.map(item => ({
              label: item.name,
              value: item.id
          }))
          setItemsBuildings(buildingOptions);
      }
      })
  }

  useEffect(() => {
     getFloorListApi(selectedBuilding);
    },[selectedBuilding])

  const getFloorListApi =(id) =>{
      // console.log("id ",id);
      findFloorsListBasedonBuildingId(id).then((res) => {
          // console.log("floor ", res.floors);
          // console.log("floor List Building Baesd ",res.floors);
          setItemsFloors([]);
          if(res.status){

            const floorOption = res.floors.map(item => ({
              label: item.name,
              value: item.id 
                  }))
          setItemsFloors(floorOption);
          
      }
      })
  }

  const getMeetingRoomListByLocationId = (id) => {
    locationBasedCalenderMeetingRoom(id).then((res) => {
      setMeetingRoom([]);
      // console.log("meetingRoom ", res);
      if(res.status){

      const meetingOption = res.meetingRoomDTOs.map(item => ({
        label: item.name,
        value: item.id 
            }))
      setMeetingRoom(meetingOption);

          }
    });
  };

  const renderEventDetails = (dateString) => {
    const eventDetails = events[dateString]?.events || [];
    if (eventDetails.length > 0) {
      return eventDetails.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventText}>{event?.subject}</Text>
          <Text style={styles.eventText}>{event?.meetingRoom?.name || 'N/A'}</Text>
        </View>
      ));
    }
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.eventText}>No events for this date</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={events}
      />
      <View style={styles.pickerContainer}>
      <View style={styles.locationview} >
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
          onChange={item => setSelectedLocation(item.value)}
        />
      </View>
      <View style={styles.locationview} >
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
          onChange={item => setSelectedBuilding(item.value)}
        />
      </View>

      </View>
      
      <View style={styles.pickerContainer}>
      <View  style={styles.locationview}>
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
          onChange={item => setSelectFloors(item.value)}
        />
      </View>

      <View  style={styles.locationview}>
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
          onChange={item => setSelectedMeetingRoom(item.value)}
        />
      </View>

      </View>
      
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.roombutton}>
          <Text style={styles.buttonText}>Meeting Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deskbutton}>
          <Text style={styles.buttonText}>Desks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.parkingseatbutton}>
          <Text style={styles.buttonText}>Parking Seats</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Event Details</Text>
        <ScrollView>
          {selectedDate ? renderEventDetails(selectedDate) : <Text>Select a date to see details</Text>}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addIcon} onPress={() => { navigation.navigate('AddBooking'); }}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
  },
  eventText: {
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 3,
  },
  roombutton: {
    padding: 10,
    backgroundColor: '#779FF5',
    borderRadius: 5,
  },
  deskbutton: {
    padding: 10,
    backgroundColor: '#F76D07',
    borderRadius: 5,
  },
  parkingseatbutton: {
    padding: 10,
    backgroundColor: '#2B6703',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  addIcon: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: '#1D7DB7',
    borderRadius: 55,
    padding: 10,
    elevation: 5,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  locationview: {
    width: '48%',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
});


//   return (
   
//     <SafeAreaView style={styles.container}>
//       <Calendar
//         current={selectedDate}
//         onDayPress={(day) => {
//           setSelectedDate(day.dateString);
//         }}
//         markedDates={events}
//       />

// <View style={styles.pickerContainer}>
//                     <Text>Location</Text>
//                     <Dropdown
//                         style={styles.dropdown}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         data={itemsLocations}
//                         labelField="label"
//                         valueField="value"
//                         placeholder="Select Location"
//                         value={selectedLocation}
//                         onChange={item => setSelectedLocation(item.value)}
//                     />
//                 </View>

//                 <View style={styles.pickerContainer}>
//                     <Text>Building</Text>
//                     <Dropdown
//                         style={styles.dropdown}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         data={itemsBuildings}
//                         labelField="label"
//                         valueField="value"
//                         placeholder="Select Building"
//                         value={selectedBuilding}
//                         onChange={item => setSelectedBuilding(item.value)}
//                     />
//                 </View>

//                 <View style={styles.pickerContainer}>
//                     <Text>Floor</Text>
//                     <Dropdown
//                         style={styles.dropdown}
//                         placeholderStyle={styles.placeholderStyle}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         data={itemsFloors}
//                         labelField="label"
//                         valueField="value"
//                         placeholder="Select Floor"
//                         value={selectFloors}
//                         onChange={item => setSelectFloors(item.value)}
//                     />
//                 </View>


//    <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.roombutton}>
//           <Text style={styles.buttonText}>Meeting Rooms</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.deskbutton}>
//           <Text style={styles.buttonText}>Desks</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.parkingseatbutton}>
//           <Text style={styles.buttonText}>Parking Seats</Text>
//         </TouchableOpacity>
//       </View>
     
//       <View style={styles.detailsContainer}>
//         <Text style={styles.detailsTitle}>Event Details</Text>
//         <ScrollView >
//         {selectedDate ? renderEventDetails(selectedDate) : <Text>Select a date to see details</Text>}
//         </ScrollView>
//       </View>
//       <TouchableOpacity style={styles.addIcon} onPress={() => { navigation?.navigate('AddBooking');}}>
//         <Icon name="plus" size={30} color="white" />
//       </TouchableOpacity>
//     </SafeAreaView>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   eventContainer: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     marginVertical: 5,
//   },
//   eventText: {
//     fontSize: 16,
//   },
//   detailsContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   detailsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },

//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//     marginTop:30,
//   },
//   roombutton: {
//     padding: 10,
//     backgroundColor: '#779FF5',
//     borderRadius: 5,
//   },
//   deskbutton: {
//     padding: 10,
//     backgroundColor: '#F76D07',
//     borderRadius: 5,
//   },
//   parkingseatbutton: {
//     padding: 10,
//     backgroundColor: '#2B6703',
//     borderRadius: 5,
//   },

//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   addIcon: {
//     position: 'absolute',
//     bottom: 10,
//     right: 20,
//     backgroundColor: '#1D7DB7',
//     borderRadius:55,
//     padding: 10,
//     elevation: 5,
//   },
//   pickerContainer: {
//     width: '100%',
//     marginBottom: 20,
// },
// dropdown: {
//   height: 50,
//   backgroundColor: 'white',
//   borderRadius: 12,
//   padding: 12,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 1 },
//   shadowOpacity: 0.2,
//   shadowRadius: 1.41,
//   elevation: 2,
// },
// placeholderStyle: {
//   fontSize: 16,
// },
// selectedTextStyle: {
//   fontSize: 16,
// },
// inputSearchStyle: {
//   height: 40,
//   fontSize: 16,
// },
  
// });

export default CalendarView;
