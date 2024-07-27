import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View ,ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const CalendarView = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('2024-07-26'); // Default selected date
  const [itemsLocations, setItemsLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openLocation, setOpenLocation] = useState(false);

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

  useEffect(()=>{
    const backendResponse = [
      { id: 184277, location: "Bangalore", timeZone: { id: 315, timezone: "Asia/Kolkata" }, visitStatus: false },
      { id: 6984, location: "Chennai", timeZone: { id: 315, timezone: "Asia/Kolkata" }, address: "Bosco Illam, Kellys", visitStatus: true },
      { id: 187570, location: "Kilpauk", timeZone: { id: 315, timezone: "Asia/Kolkata" }, address: "test", visitStatus: true },
      { id: 1316, location: "Lisboa", timeZone: { id: 481, timezone: "Europe/Lisbon" }, address: "Lisboa", visitStatus: true },
      { id: 1820, location: "Lisbon", timeZone: { id: 34, timezone: "Africa/Accra" }, visitStatus: false },
      { id: 3185, location: "Porto", timeZone: { id: 481, timezone: "Europe/Lisbon" }, address: "Address 2", visitStatus: true }
    ];

    // Transform the backend response into a format suitable for DropDownPicker
    const locationOptions = backendResponse.map(item => ({
      label: item.location,
      value: item.id
    }));

    setItemsLocations(locationOptions);



  },[])

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

<DropDownPicker
        placeholder="Select Location"
        searchPlaceholder="Search  Location..."
        searchable={true}
        open={openLocation}
        value={selectedLocation}
        items={itemsLocations}
        setOpen={setOpenLocation}
        setValue={setSelectedLocation}
        containerStyle={{ height: 40 }}
        style={{
          backgroundColor: '#fafafa',
          borderColor: '#ccc',
          marginBottom: 20,
          borderRadius: 5,
          marginTop:5,
          borderWidth: 1,
        }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
      />


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
        <ScrollView >
        {selectedDate ? renderEventDetails(selectedDate) : <Text>Select a date to see details</Text>}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addIcon} onPress={() => {/* Handle add action */}}>
        <Icon name="plus" size={30} color="blue" />
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
    marginTop:30,
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
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },

});

export default CalendarView;
