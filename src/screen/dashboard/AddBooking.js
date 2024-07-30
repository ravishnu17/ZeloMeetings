import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, LayoutAnimation, TouchableOpacity, ScrollView, Platform ,TextInput} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findBuildingListBasedonLocationId, findEquipmentsListBasedonCustomerLocationId, getLocationlist, loginHomeAccess } from '../../apiservices/Apiservices';

const AddBooking = () => {

   

    const [itemsLocations, setItemsLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [itemsBuildings, setItemsBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    const [itemsResources, setItemsResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);

    const [equipmentData, setEquipmentData] = useState([]);
    const [checkedEquipments, setCheckedEquipments] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const [meetingRoom, setMeetingRoom] = useState([]);
    const [selectedMeetingRoom, setSelectedMeetingRoom] = useState(null);

    const [desk, setDesk] = useState([]);
    const [selectedDesk, setSelectedDesk] = useState(null);

    const [parkingseat, setParkingseat] = useState([]);
    const [selectedParkingSeat, setSelectedParkingSeat] = useState(null);

    const [requesterName,setRequesterName]=useState('');
    const [requesterEmail,setRequesterEmail]=useState('');
    const [subject,setSubject]=useState('');
    const [description,setDescription]=useState('');
    const [visitor,setVisitor]=useState();

    const [user, setUser] = useState([]);
    const [checkUser, setCheckUser] = useState({});
    const [userisOpen, setUserisOpen] = useState(false);

   

    // Start Date and Time
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);

    // End Date and Time
    const [endDate, setEndDate] = useState(new Date());
    const [endMode, setEndMode] = useState('date');
    const [endShow, setEndShow] = useState(false);
    const [endShowTime, setEndShowTime] = useState(false);

    const [durationValue, setDurationValue] = useState(null);
    const [duration, setDuration] = useState([
        { label: 'Select Duration', value: null, disabled: true },
        { label: '15 min', value: '15' },
        { label: '30 min', value: '30' },
        { label: '45 min', value: '45' },
        { label: '60 min', value: '60' },
        { label: '75 min', value: '75' },
        { label: '90 min', value: '90' },
        { label: '105 min', value: '105' },
        { label: '120 min', value: '120' },
        { label: 'All Day', value: '1440' }
    ]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        if (mode === 'date') {
            setDate(new Date(currentDate.setHours(date.getHours(), date.getMinutes())));
        } else {
            setDate(new Date(date.setHours(currentDate.getHours(), currentDate.getMinutes())));
        }

        setShow(Platform.OS === 'ios');
        setShowTime(Platform.OS === 'ios');
    };

    const showMode = (currentMode) => {
        if (currentMode === 'date') {
            setShow(true);
            setShowTime(false);
        } else {
            setShow(false);
            setShowTime(true);
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
         
        if(selectedResource === 'meetingRoom' || selectedResource === 'parkingSeat'){
          setDurationValue(duration.find((d) => d.value === '30').value);

        }else if(selectedResource === 'desk'){
            setDurationValue(duration.find((d) => d.value === '120').value);
        }
        
    },[selectedResource])

    useEffect(() => {
        if (durationValue !== null) {
            const endDateTime = new Date(date.getTime() + durationValue * 60000);
            setEndDate(endDateTime);
        }
    }, [durationValue, date]);

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndShow(Platform.OS === 'ios');
        setEndShowTime(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

    const endShowMode = (currentMode) => {
        if (currentMode === 'date') {
            setEndShow(true);
            setEndShowTime(false);
        } else {
            setEndShow(false);
            setEndShowTime(true);
        }
        setEndMode(currentMode);
    };

    const endshowDatepicker = () => {
        endShowMode('date');
    };

    const endShowTimepicker = () => {
        endShowMode('time');
    };

    useEffect(() => {
       
        getlocationApi();
    }, []);

    const getlocationApi =async () => {
        const userId =await AsyncStorage.getItem('userId');
    // console.log("Retrieved userId: ", userId);
     const userDetails=null; 
     if(userId){
         
        loginHomeAccess(userId).then((res) => {
            // console.log("User Details ", res);
            userDetails = res.customerDetails.location.id
        })
     } 

        getLocationlist().then((res) => {
            // console.log("location ", res);
            const locationOptions = res.customerLocations.map(item => ({
                label: item.location,
                value: item.id
            }))
            setItemsLocations(locationOptions);
        })

      if(userDetails === null){
          itemsLocations.map((item)=>{
              if(item.value===userDetails){
                  setSelectedLocation(item.value);
              }
          })
      }
    }

    useEffect(() => {
        // console.log("selectedLocation ",selectedLocation);
        if(selectedLocation){
            getBulidingListApi(selectedLocation);
            getEqupmentListApi(selectedLocation);
        }
        
    },[selectedLocation])

    const getBulidingListApi =(id) =>{
        findBuildingListBasedonLocationId(id).then((res) => {
            // console.log("building ", res.buildings);
            const buildingOptions = res.buildings.map(item => ({
                label: item.name,
                value: item.id
            }))
            setItemsBuildings(buildingOptions);
        })
    }

    const getEqupmentListApi =(id) =>{
        findEquipmentsListBasedonCustomerLocationId(id).then((res) => {
            // console.log("equipment ", res.customerEquipments);
            setEquipmentData(res.customerEquipments);
            const initialCheckedState = backendResponse.reduce((acc, equipment) => {
                acc[equipment.id] = false;
                return acc;
            }, {});
            setCheckedEquipments(initialCheckedState);
        })
    }
    const handleToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedEquipments, [id]: !checkedEquipments[id] };
        setCheckedEquipments(newSelectedItems);
    };

    const selectedNames = Object.entries(checkedEquipments)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => equipmentData.find(item => item.id === Number(id)).name);

    useEffect(() => {
        const backendResponse = [
            { id: "meetingRoom", resource: "Meeting Room" },
            { id: "desk", resource: "Desk" },
            { id: "parkingSeat", resource: "Parking seat" },
        ];

        const resourceOptions = backendResponse.map(item => ({
            label: item.resource,
            value: item.id
        }));

        setItemsResources(resourceOptions);
        if(selectedResource === null){
            setSelectedResource(resourceOptions[0].value);
        }
       
    }, []);
    useEffect(() => {
        // Example backend response
        const response = [
            {
                id: 2850,
                name: "Meeting Room 4",
                capacity: 23,
                status: true,
                type: "Premium"
            },
            {
                id: 2851,
                name: "Meeting Room 5",
                capacity: 15,
                status: false,
                type: "Standard"
            },
           
        ];

        // Map backend response to dropdown items
        const mappedItems = response.map(resource => ({
            label: resource.name,
            value: resource.id,
        }));

        setMeetingRoom(mappedItems);
    }, []);

    useEffect(() => {
        // Example backend response
        const response = [
            {
                id: 1,
                name: "Parking Seat 1",
                capacity: 23,
                status: true,
                type: "Premium"
            },
            {
                id: 2851,
                name: "Parking Seat 2",
                capacity: 15,
                status: false,
                type: "Standard"
            },
           
        ];

        // Map backend response to dropdown items
        const mappedItems = response.map(resource => ({
            label: resource.name,
            value: resource.id,
        }));

        setParkingseat(mappedItems);
    }, []);

    useEffect(() => {
        // Example backend response
        const response = [
            {
                id: 1,
                name: "Desk 1",
                capacity: 23,
                status: true,
                type: "Premium"
            },
            {
                id: 2851,
                name: "Desk 2",
                capacity: 15,
                status: false,
                type: "Standard"
            },
           
        ];

        // Map backend response to dropdown items
        const mappedItems = response.map(resource => ({
            label: resource.name,
            value: resource.id,
        }));

        setDesk(mappedItems);
    }, []);


   

        // console.log("selectedResource ",selectedResource);

        const meetingroomChange =(item) =>{
            // console.log("item ",item);
            setSelectedDesk(null);
            setSelectedParkingSeat(null);
           setSelectedMeetingRoom(item.value)
        }
        const deskChange =(item) =>{
            setSelectedMeetingRoom(null);
            setSelectedParkingSeat(null);
            setSelectedDesk(item.value)
        }
        const parkingseatChange =(item) =>{
            setSelectedMeetingRoom(null);
            setSelectedDesk(null);
            setSelectedParkingSeat(item.value)
        }

        useEffect(() => {
            const users = [
                { id: 4011, username: "ajith@gmail.com", email: "ajith@gmail.com" },
                { id: 4312, username: "ajith@dbcyelagiri.edu.in", email: "ajith@dbcyelagiri.edu.in" },
                { id: 5241, username: "b@gmail.com", email: "b@gmail.com" },
                { id: 5140, username: "jeni@gmail.com", email: "jeni@gmail.com" }
            ];
            setUser(users);
            const initialCheckedState = users.reduce((acc, user) => {
                acc[user.id] = false;
                return acc;
            }, {});
            setCheckUser(initialCheckedState);
        }, []);
    





        const handleuserToggle = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setUserisOpen(!userisOpen);
        };
    
        const userCheckboxChange = (id) => {
            const newSelectedItems = { ...checkUser, [id]: !checkUser[id] };
            setCheckUser(newSelectedItems);
        };
    
        const selectedUerNames = Object.entries(checkUser)
            .filter(([id, isChecked]) => isChecked)
            .map(([id]) => user.find(item => item.id === Number(id))?.username || '');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add Booking</Text>
            <ScrollView>
                <View style={styles.pickerContainer}>
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

                <View style={styles.pickerContainer}>
                    <Text>Resource</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={itemsResources}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Resource"
                        value={selectedResource}
                        onChange={item => setSelectedResource(item.value)}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <Text>Equipments</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity onPress={handleToggle} style={styles.dropdownHeader}>
                            {selectedNames.length > 0 ? (
                                <Text style={styles.dropdownHeaderText}>
                                    {selectedNames.join(', ')}
                                </Text>
                            ) : (
                                <Text style={styles.dropdownHeaderText}>Select Equipments</Text>
                            )}
                        </TouchableOpacity>
                        {isOpen && (
                            <View style={styles.dropdownContent}>
                                {equipmentData.map((item) => (
                                    <View key={item.id} style={styles.dropdownItem}>
                                        <Checkbox
                                            status={checkedEquipments[item.id] ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(item.id)}
                                        />
                                        <Text>{item.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

              <View style={styles.pickerContainer}>
            <View style={styles.dateLabeles} >
            <Text >Start Date</Text>
            <Text >Start Time</Text>
            </View>
                <View style={styles.dateTimeContainer}>
                   
                    <TouchableOpacity onPress={showDatepicker} style={styles.dateTimePicker}>
                        <Text style={styles.selectedText}>{date.toLocaleDateString()}</Text>
                        <Icon name="calendar" size={20} color="#000" style={styles.icon} />
                    </TouchableOpacity>

                   
                    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimePicker}>
                        <Text style={styles.selectedText}>{date.toLocaleTimeString()}</Text>
                        <Icon name="clock-o" size={20} color="#000" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}

                {showTime && (
                    <DateTimePicker
                        testID="timePicker"
                        value={date}
                        mode="time"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            <View style={styles.pickerContainer}>
            <View style={styles.dateLabeles}>
                <Text>End Date</Text>
                <Text>End Time</Text>
            </View>
            <View style={styles.dateTimeContainer}>
                <TouchableOpacity onPress={endshowDatepicker} style={styles.dateTimePicker}>
                    <Text style={styles.selectedText}>
                        {endDate ? endDate.toLocaleDateString() : 'Select End Date'}
                    </Text>
                    <Icon name="calendar" size={20} color="#000" style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={endShowTimepicker} style={styles.dateTimePicker}>
                    <Text style={styles.selectedText}>
                        {endDate ? endDate.toLocaleTimeString() : 'Select End Time'}
                    </Text>
                    <Icon name="clock-o" size={20} color="#000" style={styles.icon} />
                </TouchableOpacity>
            </View>

            {endShow && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={endMode}
                    display="default"
                    onChange={onChangeEnd}
                />
            )}

            {endShowTime && (
                <DateTimePicker
                    testID="timePicker"
                    value={date}
                    mode="time"
                    display="default"
                    onChange={onChangeEnd}
                />
            )}
        </View>
                <View style={styles.pickerContainer}>
                    <Text>Duration</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={duration}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Duration"
                        value={durationValue}
                        onChange={item => setDurationValue(item.value)}
                    />
                </View>
                {
                    selectedResource === 'meetingRoom'  &&
                    <View style={styles.pickerContainer}>
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
                        onChange={ item => meetingroomChange(item)}
                    />
                </View>

                }
             
             {
                selectedResource === 'desk' && 
                <View style={styles.pickerContainer}>
                <Text>Desk</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={desk}
                    labelField="label"
                    valueField="value"
                    placeholder="Select desk"
                    value={selectedDesk}
                    onChange={item => deskChange(item)}
                />
            </View>
             }

              {
                selectedResource === 'parkingSeat' &&
                <View style={styles.pickerContainer}>
                <Text>Parking Seat</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={parkingseat}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Parking Seat"
                    value={selectedParkingSeat}
                    onChange={item => parkingseatChange(item)}
                />
            </View>
              }

              <View style={styles.pickerContainer}>
                <Text>Requester Name</Text>
                <TextInput  style={styles.textInput}  placeholder="Requester Name" className="input" value={requesterName} onChangeText={text => setRequesterName(text)} />

            </View>
            <View style={styles.pickerContainer}>
                <Text>Requester Email</Text>
                <TextInput  style={styles.textInput}  placeholder="Requester Email" className="input" value={requesterEmail} onChangeText={text => setRequesterEmail(text)} />

            </View>
            <View style={styles.pickerContainer}>
                <Text>Subject</Text>
                <TextInput style={styles.textInput} placeholder="Requester Email" className="input" value={subject} onChangeText={text => setSubject(text)} />

            </View>
            <View style={styles.pickerContainer}>
                <Text>Description</Text>
                <TextInput
                    style={styles.textInputPragraph}
                    placeholder="Enter description here..."
                    multiline={true} // Allows multiple lines of text
                    numberOfLines={4} // Specifies the number of lines visible at once
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

            </View>

            <View style={styles.pickerContainer}>
                    <Text>Add User</Text>
                    <View style={styles.dropdownContainer}>      
                <TouchableOpacity onPress={handleuserToggle} style={styles.dropdownHeader}>
                    {selectedUerNames.length > 0 ? (
                        <Text>{selectedUerNames.join(', ')}</Text>
                    ) : (
                        <Text  style={styles.dropdownHeaderText}>Select User</Text>
                    )}
                </TouchableOpacity>
                {userisOpen && (
                    <View style={styles.dropdownContent}>
                        {user.map((item) => (
                            <View key={item.id} style={styles.dropdownItem}>
                                <Checkbox
                                    status={checkUser[item.id] ? 'checked' : 'unchecked'}
                                    onPress={() => userCheckboxChange(item.id)}
                                />
                                <Text>{item.username}</Text>
                            </View>
                        ))}
                    </View>
                )}

                    </View>
                </View>

                <View style={styles.pickerContainer}>
                <Text>Add Visitor</Text>
                <TextInput style={styles.textInput} placeholder="" className="input" value={visitor} onChangeText={text => setVisitor(text)} />

            </View>

               
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
      pickerContainer: {
        width: '100%',
        marginBottom: 20,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    dateText: {
        fontSize: 16,
        marginLeft: 8,
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
    dropdownContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownHeaderText: {
        fontSize: 16,
    },
    dropdownContent: {
        marginTop: 12,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
        dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
  
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateTimePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        width: '48%',
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
    marginLeft:40,
    size: 25,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateLabeles:{
        flexDirection: 'row',
        // marginTop: 10,
        marginBottom:10,
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight:110,
        marginLeft:2,

    },

    textInput: {
       
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        
        textAlignVertical: 'top', // Ensures text starts at the top of the input
    },
    textInputPragraph: {
        height: 100, // Adjust the height as needed
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top', // Ensures text starts at the top of the input
    },
});

export default AddBooking;
