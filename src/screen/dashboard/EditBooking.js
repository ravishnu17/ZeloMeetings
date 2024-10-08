import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, LayoutAnimation, TouchableOpacity, ScrollView, Platform, TextInput, Switch } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addBookingApi, findBookingById, findBuildingListBasedonLocationId, findCapacityBuildingBased, findCapacityLocationBased, findCateringListBasedonBuildingId, findCateringListBasedonCustomerLocationId, findCateringStatusBasedonBasedonBuildingId, findCateringStatusBasedonCustomerLocationId, findCustomerCleaningSattusBasedonBuildingId, findCustomerCleaningStatusBasedonCustomerLocationId, findCustomeritsupportsettingListBasedonBuildingId, findCustomeritsupportsettingListBasedonCustomerLocationId, findCustomerMobileEquipmentListBasedonBuildingId, findCustomerMobileEquipmentListBasedonCustomerLocationId, findCustomerMobileEquipmentStatusBasedonBuildingId, findCustomerMobileEquipmentStatusBasedonCustomerLocationId, findCustomerSpecialSettingBasedonBuildingId, findCustomerSpecialSettingBasedonCustomerLocationId, findCustomerSpecialSettingListBasedonBuildingId, findCustomerSpecialSettingListBasedonCustomerLocationId, findEquipmentsListBasedonBuildingId, findEquipmentsListBasedonCustomerLocationId, findFloorsListBasedonBuildingId, findITSupporttBasedonBuildingId, findITSupporttBasedonCustomerLocationId, findMobileEquipmentsBasedonCustomerLocationId, getChargingCarListGetBuildingBasedEdit, getChargingCarListGetFloorBasedEdit, getChargingCarListGetLocationBasedEdit, getDeskList, getEditBookingBuildingbasedCars, getEditBookingFloorbasedCars, getEditBookingLocationbasedCars, getEditDeskList, getEditMeetingRoomList, getEditMeetingRoomListForEquipmentAndCapacity, getEditParkingSeatList, getEndUserList, getLocationlist, getMeetingRoomList, getMeetingRoomListForEquipmentAndCapacity, getParkingSeatList, getVisitorList, loginHomeAccess, visitorCreateAndUpdate } from '../../apiservices/Apiservices';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { context } from '../../navigation/Appnav';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';
// create a component
const EditBooking = ({ route }) => {
    const params = route.params;
    // console.log("params ",params?.id);
    const navigation = useNavigation();
    const props = useContext(context);
    const translate = props?.language;
    const { colors } = useTheme();
    const isFocus = useIsFocused();
    const [rights, setRights] = useState();
    const [bookingResponse, setBookingResponse] = useState({});
    const [itemsLocations, setItemsLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [filterOptionsEnabled, setFilterOptionsEnabled] = useState(false);

    const [itemsBuildings, setItemsBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    const [itemsFloors, setItemsFloors] = useState([]);
    const [checkedFloors, setCheckedFloors] = useState({});
    const [isOpenFloor, setIsOpenFloor] = useState(false);

    const [cars, setCars] = useState([]);
    const [selecteCars, setSelectedCars] = useState(null);

    const [itemsCapacity, setItemsCapacity] = useState([]);
    const [selectedCapacity, setSelectedCapacity] = useState(null);

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

    const [chargingCar, setChargingCar] = useState([]);
    const [checkedChargingCar, setCheckedChargingCar] = useState({});
    const [isOpenChargingCar, setIsOpenChargingCar] = useState(false);

    const [prakingseatResonse, setPrakingseatResonse] = useState([]);
    const [checkedParkingSeat, setCheckedParkingSeat] = useState({});
    const [isOpenParkingSeat, setIsOpenParkingSeat] = useState(false);

    const [rightsEnableChargingCar, setRightsEnableChargingCar] = useState(false);
    const [rightsEnableParkingSeat, setRightsEnableParkingSeat] = useState(false);



    const [requesterName, setRequesterName] = useState('');
    const [requesterEmail, setRequesterEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    //  Add visitor
    const [visitorCompany, setVisitorCompany] = useState('');
    const [vistorName, setVistorName] = useState('');
    const [vistorEmail, setVistorEmail] = useState('');

    const [visitor, setVisitor] = useState([]);
    const [checkVisitor, setCheckVisitor] = useState({});
    const [visitorisOpen, setVisitorisOpen] = useState(false);

    //Add Visitor form enable status
    const [visitorFormEnable, setVisitorFormEnable] = useState(false);
    const [viewMoreenable, setViewMoreenable] = useState(false);

    //    Catering
    const [catering, setCatering] = useState([]);
    const [checkCatering, setCheckCatering] = useState({});
    const [cateringisOpen, setCateringisOpen] = useState(false);

    //Add Catering form enable status
    const [cateringFormEnable, setCateringFormEnable] = useState(false);


    //cleaning 
    const [cleaningFormEnable, setCleaningFormEnable] = useState(false);

    const [isCleaning, setIsCleaning] = useState(false);
    const [cleaning, setCleaning] = useState();
    // mobile equipment
    const [mobileEquipmentFormEnable, setMobileEquipmentFormEnable] = useState(false);
    const [mobileEquipment, setMobileEquipment] = useState([]);
    const [checkedMobileEquipment, setCheckedMobileEquipment] = useState({});
    const [mobileEquipmentDescription, setMobileEquipmentDescription] = useState('');
    const [mobileEquipmentisOpen, setMobileEquipmentisOpen] = useState(false);

    //IT support
    const [itSupportFormEnable, setItSupportFormEnable] = useState(false);
    const [itSupport, setItSupport] = useState([]);
    const [checkedItSupport, setCheckedItSupport] = useState({});
    const [itSupportDescription, setItSupportDescription] = useState('');
    const [itSupportisOpen, setItSupportisOpen] = useState(false);


    // Special Service
    const [specialServiceFormEnable, setSpecialServiceFormEnable] = useState(false);
    const [specialService, setSpecialService] = useState([]);
    const [checkedSpecialService, setCheckedSpecialService] = useState({});
    const [specialServiceDescription, setSpecialServiceDescription] = useState('');
    const [specialServiceisOpen, setSpecialServiceisOpen] = useState(false);

    const [user, setUser] = useState([]);
    const [checkUser, setCheckUser] = useState({});
    const [userisOpen, setUserisOpen] = useState(false);
    const [loginUser, setLoginUser] = useState({});

    //    startDate && endDate Response Keys
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [endDate1, setEndDate1] = useState(new Date());


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
    const [duration, setDuration] = useState([]);

    const [disableUpdate, setDisableUpdate] = useState(true);

    const addVisitorFormStatus = () => {
        if (visitorFormEnable) {
            setVisitorFormEnable(false);
        } else {
            setVisitorFormEnable(true);
        }

    }
    useEffect(() => {
        getBookingDetails(params?.id);

    }, [params?.id])



    const getBookingDetails = (bookingId) => {
        props?.setLoading(true)
        findBookingById(bookingId).then((res) => {
            // console.log("find by booking id ", res);

            if (res?.status) {
                // console.log("find by booking id ", res);
                setBookingResponse(res?.booking);

                // console.log("booking response ",res?.booking);

                setSelectedResource(res?.booking?.bookingType);

                setDescription(res?.booking?.bookingDescription);

                setSubject(res?.booking?.subject);
                setRequesterName(res?.booking.requesterName);
                setRequesterEmail(res?.booking?.requesterEmail);

                setCleaning(res?.booking?.customerCleaningDescription);
                setIsCleaning(res?.booking?.defaultCleaningStatus);
                setSpecialServiceDescription(res?.booking?.customerSpecialServiceDescription);
                setMobileEquipmentDescription(res?.booking?.customerMobileEquipmentDescription);
                let starttime = res?.booking?.startTime.split(':');
                setDate(new Date(new Date(res?.booking?.startDate).setHours(starttime[0], starttime[1])));
                let endtime = res?.booking?.endTime.split(':');
                let endDateTimeObj = new Date(new Date(res?.booking?.endDate).setHours(endtime[0], endtime[1]))
                setEndDate(endDateTimeObj);

                // disable update if end date time is less than current time
                setDisableUpdate(new Date().toLocaleString() > endDateTimeObj.toLocaleString());


                // if(res?.booking.floorIds !=null){
                //     // Assuming res is your response object
                //     const floorIdsString = res?.booking?.floorIds; // "221,222,223"
                //     const floorIdsArray = floorIdsString ? floorIdsString.split(',') : [];

                //     // Create an object to represent the checked floors
                //     const checkedFloorsObject = floorIdsArray.reduce((acc, floorId) => {
                //     acc[floorId] = true; // or any initial value indicating checked state
                //     return acc;
                //     }, {});

                //     // Update the state
                //     setCheckedFloors(checkedFloorsObject);
                // }



                //     // booking.visitor
                //     if(res?.booking?.visitor !=null){
                //         const initialCheckedVisitor = res?.booking?.visitor.reduce((acc, visitor) => {
                //      acc[visitor.id] = false;
                //      return acc;
                //  }, {});

                //  setCheckVisitor(initialCheckedVisitor);
                //     }


            }

        }).finally(() => {
            props?.setLoading(false)
        })
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setShowTime(false);

        if (mode === 'date') {
            setDate(new Date(currentDate.setHours(date.getHours(), date.getMinutes())));
        } else {
            setDate(new Date(date.setHours(currentDate.getHours(), currentDate.getMinutes())));
        }
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

    //  useEffect(() => {

    //      if(selectedResource === 'meetingRoom' || selectedResource === 'parkingSeat'){
    //        setDurationValue(duration.find((d) => d.value === '30').value);

    //      }else if(selectedResource === 'desk'){
    //          setDurationValue(duration.find((d) => d.value === '120').value);
    //      }

    //  },[selectedResource])

    useEffect(() => {
        //  console.log("Start Date ",date);
        //  console.log("End Date ",endDate);


        // console.log("bookingResponse end Date : ",bookingResponse?.endDate);
        // console.log("bookingResponse start Time : ",bookingResponse?.startTime);
        // console.log("bookingResponse end Time : ",bookingResponse?.endTime);

        const startDate = formatDate(date);
        const startTime = formatTime(date);
        const endDate1 = formatDate(endDate);
        const endTime = formatTime(endDate);

        //  console.log("bookingResponse start Date : ",bookingResponse?.startDate, .toLocaleString());
        //  console.log("startDate",startDate);


        setStartDate(startDate);

        setStartTime(startTime);

        setEndDate1(endDate1);

        setEndTime(endTime);

    }, [date, endDate]);

    useEffect(() => {
        if (durationValue !== null) {
            const endDateTime = new Date(date.getTime() + durationValue * 60000);
            setEndDate(endDateTime);
        }
    }, [durationValue, date]);

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndShow(false);
        setEndShowTime(false);

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
        getLoginUser();
        getEndUsers();
        getVisitors();
    }, []);

    useEffect(() => {
        Object.keys(loginUser).length > 0 && getlocationApi();
    }, [loginUser])

    const getLoginUser = async () => {
        props?.setLoading(true)
        const userId = await AsyncStorage.getItem('userId');
        let Userrights = await AsyncStorage.getItem('rights');
        setRights(Userrights);
        if (userId) {
            loginHomeAccess(userId).then((res) => {
                if (res.status) {
                    setLoginUser(res.user);
                    setRequesterName(res.user.firstName);
                    setRequesterEmail(res.user.email);
                }
                // console.log("locationId ",userDetails);
                // console.log("location ",res.customerDetails.location.location);
            }).finally(() => {
                props?.setLoading(false)
            })
        }
    }

    // console.log("loginUser ",loginUser.id);
    const getlocationApi = () => {
        getLocationlist().then((res) => {
            // console.log("location ", res);
            setItemsLocations([]);
            if (res.status) {
                const locationOptions = res.customerLocations.map(item => ({
                    label: item.location,
                    value: item.id
                }));
                setItemsLocations(locationOptions);
                const itemsLocationsId = loginUser?.location?.id;
                // console.log("itemsLocationsId ",itemsLocationsId);

                //  console.log("loaction Id", bookingResponse?.customerLocation?.id);
                if (selectedLocation === null) {
                    locationOptions.map((item) => {
                        if (item.value === bookingResponse?.customerLocation?.id) {
                            // console.log("contions");
                            setSelectedLocation(item.value);
                        } else if (item.value === itemsLocationsId) {
                            setSelectedLocation(item.value);
                        }

                    })
                }

            }
        })

    }

    useEffect(() => {
        getEndUsers();
    }, [bookingResponse?.attendee])


    const getEndUsers = () => {

        getEndUserList().then((res) => {
            setUser([]);
            setCheckUser({});
            if (res?.status) {

                setUser(res?.users);
                //  console.log("backendResponse",bookingResponse);
                if (bookingResponse?.attendee !== null) {
                    // console.log("user inside call");
                    initializeCheckedEndUser(res?.users, bookingResponse?.attendee);
                }


            }
        })

    }


    //  / Function to initialize checkedEndUsers based on booking response
    const initializeCheckedEndUser = (endusers, attendee) => {
        // console.log("attendee",attendee);
        // console.log("endusers",endusers);
        const userIdsArray = attendee?.map(user => user?.id);
        const checkedState = {};
        // console.log("userid Array",userIdsArray);
        endusers?.forEach(user => {
            checkedState[user?.id] = userIdsArray?.includes(user?.id);
        });

        setCheckUser(checkedState);
    };



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


    useEffect(() => {
        getVisitors();
    }, [bookingResponse?.visitor])

    const getVisitors = () => {
        getVisitorList().then((res) => {
            setVisitor([]);
            setCheckVisitor({});
            if (res.status) {

                // console.log("visitor ", res.visitors);
                setVisitor(res.visitors);


                if (bookingResponse?.visitor) {
                    initializeCheckedVisitor(res?.visitors, bookingResponse?.visitor);
                }

            }


        })
    }

    //  / Function to initialize checkedEndUsers based on booking response
    const initializeCheckedVisitor = (visitors, responseVisitor) => {
        const visitorIdsArray = responseVisitor?.map(visitor => visitor?.id);
        const checkedState = {};

        visitors?.forEach(visitor => {
            checkedState[visitor?.id] = visitorIdsArray?.includes(visitor?.id);
        });

        setCheckVisitor(checkedState);
    };

    const handleVisitorToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisitorisOpen(!visitorisOpen);
    };

    const visitorCheckboxChange = (id) => {
        const newSelectedItems = { ...checkVisitor, [id]: !checkVisitor[id] };
        // setCheckUser(newSelectedItems);
        setCheckVisitor(newSelectedItems);
    };

    const selectedVisitorNames = Object.entries(checkVisitor)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => visitor.find(item => item.id === Number(id))?.name || '');

    useEffect(() => {
        // console.log("selectedLocation ",selectedLocation);
        if (selectedLocation) {
            getBulidingListApi(selectedLocation);
            getEqupmentListApi(selectedLocation);
            getCustomerITSupporting(selectedLocation);
            cateringApi(selectedLocation);
            cleaningApi(selectedLocation);
            MobileEquipmentApi(selectedLocation);
            specialServiceApi(selectedLocation);
            capcityAp(selectedLocation);
        }

    }, [selectedLocation])

    useEffect(() => {
        if (selectedBuilding) {
            getFloorListApi(selectedBuilding);
            getEquipmentListBuilding(selectedBuilding);
            capacityBuildingBased(selectedBuilding);
            cateringApiwithBuilding(selectedBuilding);
            cleaningApiwithBuilding(selectedBuilding);
            MobileEquipmentApiwithBuilding(selectedBuilding);
            specialServiceApiwithBuilding(selectedBuilding);
            getCustomerITSupportingwithBuildingId(selectedBuilding);
        }

    }, [selectedBuilding])

    const getBulidingListApi = (id) => {
        findBuildingListBasedonLocationId(id).then((res) => {
            // console.log("building ", res.buildings);
            setItemsBuildings([]);
            setSelectedBuilding(null);
            if (res.status) {

                const buildingOptions = res.buildings.map(item => ({
                    label: item.name,
                    value: item.id
                }))
                setItemsBuildings(buildingOptions);


                if (selectedBuilding === null) {
                    buildingOptions?.map((item) => {
                        // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                        if (item.value === bookingResponse?.building?.id) {
                            // console.log("contions");
                            setSelectedBuilding(item.value);
                        }

                    })
                }
            }
        })
    }

    const getFloorListApi = (id) => {
        // console.log("id ",id);
        //  console.log("response Floor ",bookingResponse.floorIds);
        findFloorsListBasedonBuildingId(id).then((res) => {
            //  console.log("floor ", res.floors);
            // console.log("floor List Building Baesd ",res.floors);
            setItemsFloors([]);
            setCheckedFloors({});

            if (res.status) {
                setItemsFloors(res.floors);
                initializeCheckedFloors(res.floors, bookingResponse?.floorIds);
            }
        })
    }


    //  Function to parse FloorIds and initialize checkedFloors
    const initializeCheckedFloors = (floors, floorIds) => {
        const floorIdsArray = floorIds.split(',').map(id => parseInt(id, 10));
        const checkedState = {};
        //  console.log("floorIdsArray ", floorIdsArray);

        floors.forEach(floor => {
            checkedState[floor.id] = floorIdsArray.includes(floor.id);
        });
        //  console.log("checkedState ", checkedState);

        setCheckedFloors(checkedState);
    };


    // console.log(" cateringFormEnable ", cateringFormEnable );
    const handleFloorToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // setIsOpen(!isOpen);
        setIsOpenFloor(!isOpenFloor);
    };

    const handleFloorCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedFloors, [id]: !checkedFloors[id] };
        setCheckedFloors(newSelectedItems);
    };

    const selectedFloorNames = Object.entries(checkedFloors)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => itemsFloors.find(item => item.id === Number(id))?.name || '');



    const getEqupmentListApi = (id) => {
        findEquipmentsListBasedonCustomerLocationId(id).then((res) => {
            // console.log("equipment ", res.customerEquipments);
            setEquipmentData([]);
            setCheckedEquipments({});
            if (res.status) {


                setEquipmentData(res.customerEquipments);
                if (bookingResponse?.customerEquipments !== null) {
                    initializeCheckedEquipments(res?.customerEquipments, bookingResponse?.customerEquipments);
                }

                // const initialCheckedState = res.customerEquipments.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedEquipments(initialCheckedState);
            }
        })
    }

    const getEquipmentListBuilding = (id) => {
        findEquipmentsListBasedonBuildingId(id).then((res) => {
            // console.log("equipment List Building Baesd ");
            // console.log("equipment ", res.customerEquipments);
            setEquipmentData([]);
            setCheckedEquipments({});
            if (res.status) {

                setEquipmentData(res.customerEquipments);

                if (bookingResponse?.customerEquipments !== null) {
                    initializeCheckedEquipments(res?.customerEquipments, bookingResponse?.customerEquipments);
                }

                //  console.log("bookingResponse",bookingResponse.customerEquipments);
                // const initialCheckedState = res.customerEquipments.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedEquipments(initialCheckedState);
            }
        })
    }


    //  / Function to initialize checkedEquipments based on booking response
    const initializeCheckedEquipments = (equipments, customerEquipments) => {
        const equipmentIdsArray = customerEquipments.map(equipment => equipment.id);
        const checkedState = {};

        equipments.forEach(equipment => {
            checkedState[equipment.id] = equipmentIdsArray.includes(equipment.id);
        });

        setCheckedEquipments(checkedState);
    };


    const capcityAp = (id) => {
        findCapacityLocationBased(id).then((res) => {
            // console.log("capacity ", res);
            setItemsCapacity([]);
            setSelectedCapacity(null);
            if (res.status) {

                // Transform the data
                if (res?.meetingRoomCapacityDTO?.listcapacity.length > 0) {
                    let updatedCapacityList = res.meetingRoomCapacityDTO.listcapacity;
                    const newCapacity = 0;

                    if (!updatedCapacityList.includes(newCapacity)) {
                        updatedCapacityList = [newCapacity, ...updatedCapacityList];
                    }

                    const transformedData = updatedCapacityList.map(capacity => ({
                        label: capacity.toString(),
                        value: capacity
                    }));

                    setItemsCapacity(transformedData);



                }

            }
        })
    }

    const capacityBuildingBased = (id) => {
        findCapacityBuildingBased(id).then((res) => {
            // console.log("capacity List Building Baesd ");
            // console.log("capacity ", res);
            setItemsCapacity([]);
            setSelectedCapacity(null);
            if (res.status) {

                // Transform the data
                if (res?.meetingRoomCapacityDTO?.listcapacity.length > 0) {
                    // console.log("capacity ", res?.meetingRoomCapacityDTO?.listcapacity);
                    // const transformedData = res?.meetingRoomCapacityDTO?.listcapacity.map(capacity => ({
                    //     label: capacity.toString(),
                    //     value: capacity
                    //   }));

                    //   // Update the state
                    //   setItemsCapacity(transformedData);

                    let updatedCapacityList = res.meetingRoomCapacityDTO.listcapacity;
                    const newCapacity = 0;

                    if (!updatedCapacityList.includes(newCapacity)) {
                        updatedCapacityList = [newCapacity, ...updatedCapacityList];
                    }

                    const transformedData = updatedCapacityList.map(capacity => ({
                        label: capacity.toString(),
                        value: capacity
                    }));

                    setItemsCapacity(transformedData);

                }

            }
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
        .map(([id]) => equipmentData.find(item => item.id === Number(id))?.name || '');



    const cateringApi = (selectedLocation) => {
        // console.log("selectedLocation  Addbooking ",selectedLocation);
        findCateringStatusBasedonCustomerLocationId(selectedLocation).then((res) => {
            setCateringFormEnable(false);
            if (res.status) {
                // console.log("catering status ", res.customerCateringSetting.isAllowedCateringWithinHours);
                setCateringFormEnable(res.customerCateringSetting.isAllowedCateringWithinHours);
            }
        })
        findCateringListBasedonCustomerLocationId(selectedLocation).then((res) => {
            setCatering([]);
            setCheckCatering({});
            if (res?.status) {

                setCatering(res?.customerCaterings);
                if (bookingResponse?.bookingCateringDTOs && bookingResponse?.bookingCateringDTOs.length > 0) {
                    initializeCheckedCatring(res?.customerCaterings, bookingResponse?.bookingCateringDTOs);
                }
                // const initialCheckedState = res.customerCaterings.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckCatering(initialCheckedState);
            }

        })
    }

    const cateringApiwithBuilding = (selectedBuilding) => {
        // console.log("selectedLocation  Addbooking ",selectedLocation);

        findCateringStatusBasedonBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("catering status Building Baesd ");
            setCateringFormEnable(false);
            if (res.status) {
                // console.log("catering status ", res.customerCateringSetting.isAllowedCateringWithinHours);
                setCateringFormEnable(res.customerCateringSetting.isAllowedCateringWithinHours);
            }
        })

        findCateringListBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("catering List Building Baesd ");
            setCatering([]);
            setCheckCatering({});
            if (res.status) {

                setCatering(res?.customerCaterings);

                if (bookingResponse?.bookingCateringDTOs && bookingResponse?.bookingCateringDTOs?.length > 0) {
                    initializeCheckedCatring(res?.customerCaterings, bookingResponse?.bookingCateringDTOs);
                }

                // const initialCheckedState = res.customerCaterings.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckCatering(initialCheckedState);
            }
        })


    }

    // console.log(" cateringFormEnable ", cateringFormEnable );


    //  / Function to initialize Mobile checkedEquipments based on booking response
    const initializeCheckedCatring = (catrings, customerCatrings) => {
        // console.log("customerCatrings ", customerCatrings);
        // console.log("catrings ", catrings);
        const catringIdsArray = customerCatrings.map(catring => catring?.customerCateringId);
        const checkedState = {};
        // console.log("catringIdsArray ", catringIdsArray);

        catrings?.forEach(catring => {
            checkedState[catring?.id] = catringIdsArray?.includes(catring?.id);
        });

        // console.log("checkedState ", checkedState);


        setCheckCatering(checkedState);
    };



    const handleCateringToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // setIsOpen(!isOpen);
        setCateringisOpen(!cateringisOpen);
    };

    const handleCateringCheckboxChange = (id) => {
        const newSelectedItems = { ...checkCatering, [id]: !checkCatering[id] };
        setCheckCatering(newSelectedItems);
    };

    const selectedCateringNames = Object.entries(checkCatering)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => catering.find(item => item.id === Number(id))?.name || '');


    //Cleaning Api
    const cleaningApi = (selectedLocation) => {
        findCustomerCleaningStatusBasedonCustomerLocationId(selectedLocation).then((res) => {
            setCleaningFormEnable(false);
            if (res?.status) {

                // console.log("cleaning status ", res.customerCleaning.cleaningTimeStatus);
                setCleaningFormEnable(res?.customerCleaning?.cleaningTimeStatus);
                // setCleaningFormEnable(res.customerCleaningSetting.isAllowedCleaningWithinHours);
            }
        })
    }

    const cleaningApiwithBuilding = (selectedBuilding) => {
        findCustomerCleaningSattusBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("cleaning status Building Baesd ");
            setCleaningFormEnable(false);
            if (res?.status) {
                setCleaningFormEnable(res?.customerCleaning?.cleaningTimeStatus);
            }
        })
    }

    //Mobile Equpment Api

    const MobileEquipmentApi = (selectedLocation) => {
        // console.log("selectedLocation  Addbooking ",selectedLocation);
        findCustomerMobileEquipmentStatusBasedonCustomerLocationId(selectedLocation).then((res) => {
            setMobileEquipmentFormEnable(false);
            if (res.status) {
                // console.log("mobile equipment status ", res.customerMobileEquipmentSetting.isAllowedWithinHours);
                setMobileEquipmentFormEnable(res.customerMobileEquipmentSetting.isAllowedWithinHours);
            }
        })

        findCustomerMobileEquipmentListBasedonCustomerLocationId(selectedLocation).then((res) => {
            setMobileEquipment([]);
            setCheckedMobileEquipment({});
            if (res?.status) {

                setMobileEquipment(res?.customerMobileEquipments);
                if (bookingResponse?.customerMobileEquipments) {
                    initializeCheckedMobileEquipments(res.customerMobileEquipments, bookingResponse?.customerMobileEquipments);
                }
                // const initialCheckedState = res.customerMobileEquipments.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedMobileEquipment(initialCheckedState);
            }
        })
    }


    const MobileEquipmentApiwithBuilding = (selectedBuilding) => {
        findCustomerMobileEquipmentStatusBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("mobile equipment status Building Baesd ");
            setMobileEquipmentFormEnable(false);
            if (res.status) {
                // console.log("mobile equipment status ", res.customerMobileEquipmentSetting.isAllowedWithinHours);
                setMobileEquipmentFormEnable(res.customerMobileEquipmentSetting.isAllowedWithinHours);
            }
        })

        findCustomerMobileEquipmentListBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("mobile equipment List Building Baesd ");
            setMobileEquipment([]);
            setCheckedMobileEquipment({});
            if (res?.status) {

                setMobileEquipment(res?.customerMobileEquipments);
                if (bookingResponse?.customerMobileEquipments) {
                    initializeCheckedMobileEquipments(res?.customerMobileEquipments, bookingResponse?.customerMobileEquipments);
                }


                // const initialCheckedState = res.customerMobileEquipments.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedMobileEquipment(initialCheckedState);
            }
        })
    }


    //  / Function to initialize Mobile checkedEquipments based on booking response
    const initializeCheckedMobileEquipments = (equipments, customerEquipments) => {
        const equipmentIdsArray = customerEquipments?.map(equipment => equipment?.id);
        const checkedState = {};

        equipments?.forEach(equipment => {
            checkedState[equipment?.id] = equipmentIdsArray.includes(equipment?.id);
        });

        // setCheckedEquipments(checkedState);
        setCheckedMobileEquipment(checkedState);
    };

    const handleMobileEquipmentToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMobileEquipmentisOpen(!mobileEquipmentisOpen);
    };

    const handleMobileEquipmentCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedMobileEquipment, [id]: !checkedMobileEquipment[id] };
        setCheckedMobileEquipment(newSelectedItems);
    };

    const selectedMobileEquipmentNames = Object.entries(checkedMobileEquipment)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => mobileEquipment.find(item => item.id === Number(id))?.name || '');




    const getCustomerITSupporting = (selectedLocation) => {
        findCustomeritsupportsettingListBasedonCustomerLocationId(selectedLocation).then((res) => {
            // console.log("it support Setting ", res);
            setItSupportFormEnable(false);
            if (res.status) {
                // console.log("it support Setting ", res);
                setItSupportFormEnable(res.customerITSupportSetting.isAllowedWithinHours);
            }
        })

        findITSupporttBasedonCustomerLocationId(selectedLocation).then((res) => {
            // console.log("it support ", res);
            setItSupport([]);
            setCheckedItSupport({});
            if (res?.status) {

                setItSupport(res?.customerITSupports);
                if (bookingResponse?.customerITSupports != null) {
                    initializeCheckedItSupport(res.customerITSupports, bookingResponse?.customerITSupports);
                }
                // const initialCheckedState = res.customerITSupports.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedItSupport(initialCheckedState);
            }
        })
    }

    const getCustomerITSupportingwithBuildingId = (selectedBuilding) => {
        findCustomeritsupportsettingListBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("it support Setting status  ", res);
            setItSupportFormEnable(false);
            if (res.status) {
                // console.log("it support Setting ", res);
                setItSupportFormEnable(res.customerITSupportSetting.isAllowedWithinHours);
            }
        })

        findITSupporttBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("it support Setting List ");
            setItSupport([]);
            setCheckedItSupport({});
            if (res?.status) {

                setItSupport(res?.customerITSupports);
                if (bookingResponse?.customerITSupports != null) {
                    initializeCheckedItSupport(res.customerITSupports, bookingResponse?.customerITSupports);
                }

                // const initialCheckedState = res.customerITSupports.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedItSupport(initialCheckedState);
            }
        })

    }
    const initializeCheckedItSupport = (itsupports, customerItsupport) => {
        const itsupportIdsArray = customerItsupport?.map(itsupport => itsupport?.id);
        const checkedState = {};

        itsupports?.forEach(itsupport => {
            checkedState[itsupport?.id] = itsupportIdsArray?.includes(itsupport?.id);
        });

        setCheckedItSupport(checkedState);
    };

    const handleItSupportToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setItSupportisOpen(!itSupportisOpen);
    };

    const handleItSupportCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedItSupport, [id]: !checkedItSupport[id] };
        setCheckedItSupport(newSelectedItems);
    };

    const selectedItSupportNames = Object.entries(checkedItSupport)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => itSupport.find(item => item.id === Number(id))?.name || '');


    //Special Service Api

    const specialServiceApi = (selectedLocation) => {
        // console.log("selectedLocation  Addbooking ",selectedLocation);
        findCustomerSpecialSettingBasedonCustomerLocationId(selectedLocation).then((res) => {
            // console.log("special service status ", res);
            setSpecialServiceFormEnable(false);
            if (res.status) {
                // console.log("special service status ", res.customerSpecialServiceSetting.isAllowedSpecialServiceWithinHours);

                setSpecialServiceFormEnable(res.customerSpecialServiceSetting.isAllowedSpecialServiceWithinHours);
            }
        })

        findCustomerSpecialSettingListBasedonCustomerLocationId(selectedLocation).then((res) => {
            // console.log("special service ", res);
            setSpecialService([]);
            setCheckedSpecialService({});
            if (res.status) {

                setSpecialService(res.customerSpecialServices);
                if (bookingResponse?.customerSpecialServices != null) {
                    initializeCheckedSpecialService(res.customerSpecialServices, bookingResponse?.customerSpecialServices);
                }
                // const initialCheckedState = res.customerSpecialServices.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;
                // }, {});
                // setCheckedSpecialService(initialCheckedState);
            }
        })
    }

    const specialServiceApiwithBuilding = (selectedBuilding) => {
        findCustomerSpecialSettingBasedonBuildingId(selectedBuilding).then((res) => {
            setSpecialServiceFormEnable(false);
            // console.log("building special service status ", res);
            if (res.status) {
                // console.log("special service status ", res.customerSpecialServiceSetting.isAllowedSpecialServiceWithinHours);

                setSpecialServiceFormEnable(res.customerSpecialServiceSetting.isAllowedSpecialServiceWithinHours);
            }
        })

        findCustomerSpecialSettingListBasedonBuildingId(selectedBuilding).then((res) => {
            // console.log("building special service List ", res);
            setSpecialService([]);
            setCheckedSpecialService({});
            if (res.status) {
                setSpecialService(res.customerSpecialServices);
                if (bookingResponse?.customerSpecialServices != null) {
                    initializeCheckedSpecialService(res.customerSpecialServices, bookingResponse?.customerSpecialServices);
                }

                // const initialCheckedState = res.customerSpecialServices.reduce((acc, equipment) => {
                //     acc[equipment.id] = false;
                //     return acc;      
                // }, {});
                // setCheckedSpecialService(initialCheckedState);
            }

        })
    }


    const initializeCheckedSpecialService = (specialServices, customerSpecialServices) => {
        const specialserviceIdsArray = customerSpecialServices?.map(special => special?.id);
        const checkedState = {};

        specialServices?.forEach(special => {
            checkedState[special?.id] = specialserviceIdsArray?.includes(special?.id);
        });

        setCheckedSpecialService(checkedState);
    };

    const handleSpecialServiceToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSpecialServiceisOpen(!specialServiceisOpen);
    };

    const handleItSpecialServiceCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedSpecialService, [id]: !checkedSpecialService[id] };
        setCheckedSpecialService(newSelectedItems);
    };

    const selectedSpecialServiceNames = Object.entries(checkedSpecialService)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => specialService.find(item => item.id === Number(id))?.name || '');


    // console.log("bookingResponse ",bookingResponse);


    useEffect(() => {

        // console.log("selectedLocation ",selectedLocation);
        // console.log("selectedBuilding ",selectedBuilding);
        // console.log("checkedEquipments ",checkedEquipments);
        // console.log("selectedCapacity ",selectedCapacity);
        // console.log("checkedFloors ",checkedFloors);
        console.log("bookingResponse ", bookingResponse);

        const bookingId = bookingResponse?.id;

        // console.log("bookingId ",bookingId);

        if (Object.keys(checkedEquipments).length > 0 && selectedCapacity !== null) {
            // console.log("selectedCapacity ",selectedCapacity," checkedEquipments ",checkedEquipments," selectedLocation ",selectedLocation," selectedBuilding ",selectedBuilding);
            getEditMeetingRoomListForEquipmentAndCapacity(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedEquipments, selectedCapacity, checkedFloors, bookingId).then((res) => {
                // console.log("Equipment And Capacity ",res);
                setMeetingRoom([]);
                if (res?.status) {
                    // console.log("Equipment And Capacity ",res.meetingRoomDTOs);

                    const mappedItems = res?.meetingRoomDTOs?.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));

                    setMeetingRoom(mappedItems);
                    // setSelectedMeetingRoom(null || params?.meetingRoom);
                    if (selectedMeetingRoom === null) {
                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            if (item.value === bookingResponse?.meetingRoom?.id) {
                                setSelectedMeetingRoom(item.value);
                            }

                        })
                    }

                }
            })

        } else if (Object.keys(checkedEquipments).length > 0) {
            getEditMeetingRoomListForEquipmentAndCapacity(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedEquipments, selectedCapacity, checkedFloors, bookingId).then((res) => {
                // console.log("Equipment",res);
                setMeetingRoom([]);
                if (res?.status) {

                    const mappedItems = res?.meetingRoomDTOs?.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));

                    setMeetingRoom(mappedItems);
                    // setSelectedMeetingRoom(null || params?.meetingRoom);
                    if (selectedMeetingRoom === null) {
                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            if (item.value === bookingResponse?.meetingRoom?.id) {
                                setSelectedMeetingRoom(item.value);
                            }

                        })
                    }
                }
            })

        } else if (selectedCapacity !== null) {
            getEditMeetingRoomListForEquipmentAndCapacity(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedEquipments, selectedCapacity, checkedFloors, bookingId).then((res) => {
                // console.log("Capacity ",res);
                setMeetingRoom([]);
                if (res?.status) {

                    const mappedItems = res?.meetingRoomDTOs?.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));

                    setMeetingRoom(mappedItems);
                    // setSelectedMeetingRoom(null || params?.meetingRoom);
                    if (selectedMeetingRoom === null) {
                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            if (item.value === bookingResponse?.meetingRoom?.id) {
                                setSelectedMeetingRoom(item.value);
                            }

                        })
                    }

                }
            })
        } else if (Object.keys(checkedFloors).length > 0) {

            // console.log("selectedCapacity ",selectedCapacity," checkedEquipments ",checkedEquipments," selectedLocation ",selectedLocation," selectedBuilding ",selectedBuilding," checkedFloors ",checkedFloors);
            getEditMeetingRoomListForEquipmentAndCapacity(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedEquipments, selectedCapacity, checkedFloors, bookingId).then((res) => {
                // console.log("mroom ",res);
                setMeetingRoom([]);
                if (res?.status) {

                    const mappedItems = res?.meetingRoomDTOs?.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));

                    setMeetingRoom(mappedItems);
                    // setSelectedMeetingRoom(null || params?.meetingRoom);

                    if (selectedMeetingRoom === null) {
                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            if (item.value === bookingResponse?.meetingRoom?.id) {
                                setSelectedMeetingRoom(item.value);
                            }

                        })
                    }

                }
            })

            // console.log(" call Floor",selectedBuilding,"booking id ",bookingId);

            getDesk(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getParkingSeats(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getChargingcarApis(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);

            getEditBookingFloorbasedCars(selectedLocation, selectedBuilding, checkedFloors, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
                setCars([]);
                if (res?.status) {
                    const mappedItems = res.carDTOs.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));
                    setCars(mappedItems);

                    if (selecteCars === null) {

                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            // console.log("car.id",bookingResponse.car.id);
                            if (item.value === bookingResponse?.car?.id) {
                                setSelectedCars(item.value);
                            }

                        })

                    }
                }
            })
        } else if (selectedBuilding) {
            // console.log(" call selectedBuilding",selectedBuilding,"booking id ",bookingId);
            // console.log("Both ",selectedLocation,selectedBuilding,startDate,startTime,endDate1,endTime);
            // getMettingRooms(selectedLocation,selectedBuilding,startDate,startTime,endDate1,endTime);
            getEditMeetingRoomListForEquipmentAndCapacity(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedEquipments, selectedCapacity, checkedFloors, bookingId).then((res) => {
                // console.log("mroom ",res);
                setMeetingRoom([]);
                if (res?.status) {

                    const mappedItems = res?.meetingRoomDTOs?.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));

                    setMeetingRoom(mappedItems);
                    // setSelectedMeetingRoom(null || params?.[params?.resource]);

                    if (selectedMeetingRoom === null) {
                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            if (item.value === bookingResponse?.meetingRoom?.id) {
                                setSelectedMeetingRoom(item.value);
                            }

                        })
                    }

                }
            })
            // console.log("bookingId ",bookingId);
            getDesk(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getParkingSeats(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getChargingcarApis(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getEditBookingBuildingbasedCars(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
                setCars([]);
                if (res?.status) {
                    const mappedItems = res.carDTOs.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));
                    setCars(mappedItems);

                    if (selecteCars === null) {

                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            // console.log("car.id",bookingResponse.car.id);
                            if (item.value === bookingResponse?.car?.id) {
                                setSelectedCars(item.value);
                            }

                        })

                    }
                }
            })
        } else if (selectedLocation) {

            // console.log("desk call  selectedLocation");
            // console.log("Location ",selectedLocation,selectedBuilding,startDate,startTime,endDate1,endTime);
            getMettingRooms(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, bookingId);
            getDesk(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getParkingSeats(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);
            getChargingcarApis(selectedLocation, selectedBuilding ? selectedBuilding : 0, startDate, startTime, endDate1, endTime, checkedFloors, bookingId);

            getEditBookingLocationbasedCars(selectedLocation, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
                // console.log( " edit location based  cars ",res);
                setCars([]);
                if (res?.status) {
                    const mappedItems = res.carDTOs.map(resource => ({
                        label: resource.name,
                        value: resource.id,
                    }));
                    setCars(mappedItems);

                    if (selecteCars === null) {

                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                            // console.log("car.id",bookingResponse.car.id);
                            if (item.value === bookingResponse?.car?.id) {
                                setSelectedCars(item.value);
                            }

                        })

                    }
                }
            })
        }

    }, [selectedLocation, selectedBuilding, startDate, endDate1, startTime, endTime, checkedEquipments, selectedCapacity, checkedFloors])

    const formatDate = (date1) => {
        const day = date1.getDate().toString().padStart(2, '0');
        const month = (date1.getMonth() + 1).toString().padStart(2, '0');
        const year = date1.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatTime = (date1) => {
        const hours = date1.getHours().toString().padStart(2, '0');
        const minutes = date1.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const getMettingRooms = (selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, bookingId) => {
        // console.log("getMettingRooms ",selectedLocation,selectedBuilding,startDate,startTime,endDate1,endTime);
        getEditMeetingRoomList(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
            // console.log("meeting Room ", res.meetingRoomDTOs);
            setMeetingRoom([]);
            setSelectedMeetingRoom(null);
            if (res?.status) {

                const mappedItems = res?.meetingRoomDTOs?.map(resource => ({
                    label: resource.name,
                    value: resource.id,
                }));

                setMeetingRoom(mappedItems);

                if (selectedMeetingRoom === null) {
                    mappedItems?.map((item) => {
                        // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                        if (item.value === bookingResponse?.meetingRoom?.id) {
                            setSelectedMeetingRoom(item.value);
                        }

                    })
                }
            }
        })
    }



    const getDesk = (selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId) => {
        // console.log("desk call ",selectedLocation,selectedBuilding,startDate,startTime,endDate1,endTime,checkedFloors,"booking Id",bookingId);
        getEditDeskList(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId).then((res) => {
            //  console.log("desk ", res);
            // Map backend response to dropdown items

            setDesk([]);
            setSelectedDesk(null);
            if (res?.status) {

                const mappedItems = res?.deskDTOs?.map(resource => ({
                    label: resource.name,
                    value: resource.id,
                }));

                setDesk(mappedItems);
                //  console.log("booking response ",bookingResponse?.desk?.id);
                if (bookingResponse?.desk?.id) {
                    mappedItems?.map((item) => {
                        // console.log("bookingResponse?.building?.id ",bookingResponse?.building?.id);
                        if (item.value === bookingResponse?.desk?.id) {
                            setSelectedDesk(item.value);
                        }

                    })
                }


            }
        })
    }

    const getParkingSeats = (selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId) => {
        // console.log("parking seat ", res.parkingSeatDTOs);
        getEditParkingSeatList(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId).then((res) => {
            //  console.log("parking seat ", res);
            // console.log("parking seat ", res.parkingSeatDTOs);
            // Map backend response to dropdown items
            setParkingseat([]);
            setSelectedParkingSeat(null);
            if (res?.status) {
                setPrakingseatResonse(res?.parkingSeatDTOs);

                const mappedItems = res?.parkingSeatDTOs?.map(resource => ({
                    label: resource.name,
                    value: resource.id,
                }));

                setParkingseat(mappedItems);

                //  console.log("booking response ",bookingResponse?.parkingSeats);

                if (bookingResponse.bookingType === "parkingSeat") {
                    if (bookingResponse?.parkingSeats[0]?.id) {
                        mappedItems?.map((item) => {
                            // console.log("bookingResponse?.building?.id ",bookingResponse?.parkingSeats[0]?.id);
                            if (item.value === bookingResponse?.parkingSeats[0]?.id) {
                                setSelectedParkingSeat(item.value);
                            }

                        })
                    }

                } else {

                    if (bookingResponse?.parkingSeats?.length > 0) {
                        initializeParkingSeat(res?.parkingSeatDTOs, bookingResponse?.parkingSeats);
                    }


                }


            }

        })
    }



    const initializeParkingSeat = (parkingseats, customerParkingSeat) => {
        const parkinseatIdsArray = customerParkingSeat?.map(parking => parking?.id);
        const checkedState = {};

        parkingseats?.forEach(parking => {
            checkedState[parking?.id] = parkinseatIdsArray?.includes(parking?.id);
        });

        setCheckedParkingSeat(checkedState);

        // setCheckedChargingCar(checkedState);
    };


    const handleParkingSeatToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpenParkingSeat(!isOpenParkingSeat);
    };

    const handleParkingSeatCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedParkingSeat, [id]: !checkedParkingSeat[id] };

        setCheckedParkingSeat(newSelectedItems);
    };

    const selectedParkinSeatNames = Object.entries(checkedParkingSeat)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => prakingseatResonse.find(item => item.id === Number(id))?.name || '');



    const getChargingcarApis = (selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, checkedFloors, bookingId) => {
        //    console.log("checkedFloors",checkedFloors);
        if (Object.keys(checkedFloors).length > 0) {
            getChargingCarListGetFloorBasedEdit(selectedLocation, selectedBuilding, checkedFloors, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
                // console.log("getChargingCarListGetFloorBasedEdit ",res);
                setChargingCar([]);
                if (res?.status) {
                    setChargingCar(res?.chargingCarDTOs);
                    if (bookingResponse.chargingCars) {
                        initializeChargingcar(res?.chargingCarDTOs, bookingResponse.chargingCars);
                    }

                }
            })

        } else if (selectedBuilding > 0) {
            getChargingCarListGetBuildingBasedEdit(selectedLocation, selectedBuilding, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
                // console.log("select building ",selectedBuilding);
                // console.log("getChargingCarListGetBuildingBasedEdit ",res);
                setChargingCar([]);
                if (res?.status) {
                    setChargingCar(res?.chargingCarDTOs);
                    if (bookingResponse.chargingCars) {
                        initializeChargingcar(res?.chargingCarDTOs, bookingResponse.chargingCars);
                    }

                }
            })
        } else {
            getChargingCarListGetLocationBasedEdit(selectedLocation, startDate, startTime, endDate1, endTime, bookingId).then((res) => {
                setChargingCar([]);
                // console.log("getChargingCarListGetLocationBasedEdit ",res);
                if (res?.status) {
                    setChargingCar(res?.chargingCarDTOs);


                    if (bookingResponse.chargingCars) {
                        initializeChargingcar(res?.chargingCarDTOs, bookingResponse.chargingCars);
                    }

                }
            })
        }


    }



    const initializeChargingcar = (chargingcar, customerChargingcar) => {
        const chargingcarIdsArray = customerChargingcar?.map(special => special?.id);
        const checkedState = {};

        chargingcar?.forEach(special => {
            checkedState[special?.id] = chargingcarIdsArray?.includes(special?.id);
        });

        setCheckedChargingCar(checkedState);
    };


    const handleChargingCarToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpenChargingCar(!isOpenChargingCar);
    };

    const handleChargingCarCheckboxChange = (id) => {
        const newSelectedItems = { ...checkedChargingCar, [id]: !checkedChargingCar[id] };

        setCheckedChargingCar(newSelectedItems);
    };

    const selectedChargingCarNames = Object.entries(checkedChargingCar)
        .filter(([id, isChecked]) => isChecked)
        .map(([id]) => chargingCar.find(item => item.id === Number(id))?.name || '');

    useEffect(() => {
        // const backendResponse = [
        //     { id: "meetingRoom", resource: "Meeting Room" },
        //     { id: "desk", resource: "Desk" },
        //     { id: "parkingSeat", resource: "Parking seat" },
        // ];
        // console.log("rights ",rights);
        let enableRooms = false;
        let enableDesks = false;
        let enableParkingSeats = false;
        let enableAll = false;
        let enableChargingCar = false;
        let enableCar = false;

        const backendResponse = [];
        enableRooms = rights?.includes('BOOK A ROOM');
        enableDesks = rights?.includes('BOOK A DESK');
        enableParkingSeats = rights?.includes('BOOK A PARKING SEAT');
        enableChargingCar = rights?.includes('BOOK A CHARGING CAR');
        enableCar = rights?.includes('BOOK A CAR');
        enableAll = rights?.includes('ALL');
        //   console.log("enableRooms ",enableRooms, rights?.includes('BOOK A ROOM')," enableDesks",enableDesks,rights?.includes('BOOK A DESK')," enableParkingSeats",enableParkingSeats ,rights?.includes('BOOK A PARKING SEAT'));
        if (enableRooms || enableAll) {
            backendResponse.push({ id: "meetingRoom", resource: translate?.ROOMS?.MEETINGROOM });
        }
        if (enableDesks || enableAll) {
            backendResponse.push({ id: "desk", resource: translate?.ROOMS?.DESK });
        }
        if (enableParkingSeats || enableAll) {
            backendResponse.push({ id: "parkingSeat", resource: translate?.DISPLAYMODALFORM?.PARKINGSEAT });
            setRightsEnableParkingSeat(true);

        }
        if (enableChargingCar || enableAll) {
            backendResponse.push({ id: "chargingCar", resource: translate?.DISPLAYMODALFORM?.CHARGINGCAR });
            setRightsEnableChargingCar(true);
        }
        if (enableCar || enableAll) {
            backendResponse.push({ id: "car", resource: translate?.ROOMS?.CAR });
        }

        // console.log("backendResponse ",backendResponse);


        const resourceOptions = backendResponse?.map(item => ({
            label: item.resource,
            value: item.id
        }));

        setItemsResources(resourceOptions);
        if (resourceOptions?.length > 0) {
            resourceOptions?.map((item) => {
                if (item.value === bookingResponse.bookingType) {
                    // console.log("contions");
                    setSelectedResource(item.value);
                }
            })

        }


        setDuration([]);

        if (selectedResource !== 'chargingCar') {
            const duration = [{ label: 'Select Duration', value: null, disabled: true },
            { label: '15 min', value: '15' },
            { label: '30 min', value: '30' },
            { label: '45 min', value: '45' },
            { label: '60 min', value: '60' },
            { label: '75 min', value: '75' },
            { label: '90 min', value: '90' },
            { label: '105 min', value: '105' },
            { label: '120 min', value: '120' },
            { label: 'All Day', value: '1440' }]
            setDuration(duration);
        } else {
            const duration = [{ label: 'Select Duration', value: null, disabled: true },
            { label: '15 min', value: '15' },
            { label: '30 min', value: '30' },
            { label: '1 Hour', value: '60' },
            ]
            setDuration(duration);
        }


    }, [rights]);




    // console.log("mobileEquipment ",mobileEquipment);

    const meetingroomChange = (item) => {
        // console.log("item ",item);
        setSelectedDesk(null);
        setSelectedParkingSeat(null);
        setSelectedMeetingRoom(item.value)
    }
    const deskChange = (item) => {
        setSelectedMeetingRoom(null);
        setSelectedParkingSeat(null);
        setSelectedDesk(item.value)
    }
    const parkingseatChange = (item) => {
        setSelectedMeetingRoom(null);
        setSelectedDesk(null);
        setSelectedParkingSeat(item.value)
    }

    const addVisitor = () => {
        if (vistorEmail && vistorName) {
            datas = {
                name: vistorName,
                email: vistorEmail,
                company: visitorCompany,

            }

            visitorCreateAndUpdate(datas).then((res) => {
                if (res.status) {
                    // console.log("create Visitor ", res);
                    setVistorName('');
                    setVistorEmail('');
                    setVisitorCompany('');
                    getVisitors();
                    setVisitorFormEnable(false);
                }
            })



        }

    }

    const resourceSelected = (item) => {
        setSelectedResource(item.value);

        setFilterOptionsEnabled(false);

        setDuration([]);

        if (item.value !== 'chargingCar') {
            const duration = [{ label: 'Select Duration', value: null, disabled: true },
            { label: '15 min', value: '15' },
            { label: '30 min', value: '30' },
            { label: '45 min', value: '45' },
            { label: '60 min', value: '60' },
            { label: '75 min', value: '75' },
            { label: '90 min', value: '90' },
            { label: '105 min', value: '105' },
            { label: '120 min', value: '120' },
            { label: 'All Day', value: '1440' }]
            setDuration(duration);
        } else {
            const duration = [{ label: 'Select Duration', value: null, disabled: true },
            { label: '15 min', value: '15' },
            { label: '30 min', value: '30' },
            { label: '1 Hour', value: '60' },
            ]
            setDuration(duration);
        }

        //caltering
        setCheckCatering({});
        setCateringisOpen(!cateringisOpen);


        //cleaning 
        setIsCleaning(!isCleaning);
        setCleaning();


        setCheckedMobileEquipment({});
        setMobileEquipmentDescription('');
        setMobileEquipmentisOpen(!mobileEquipmentisOpen);

        setCheckedItSupport({});
        setItSupportDescription('');
        setItSupportisOpen(!itSupportisOpen);



        setCheckedSpecialService({});
        setSpecialServiceDescription('');
        setSpecialServiceisOpen(!specialServiceisOpen);

        setCheckedParkingSeat({});
        setIsOpenParkingSeat(!isOpenParkingSeat);

        setCheckedChargingCar({});
        setIsOpenChargingCar(!isOpenChargingCar);
        selectedMeetingRoom(null);
        setSelectedDesk(null);
        setSelectedParkingSeat(null);
        setSelectedCars(null);

        setViewMoreenable(!viewMoreenable);

    }

    const handleClickViewMore = () => {

        if (viewMoreenable) {
            setViewMoreenable(false);
        } else {
            setViewMoreenable(true);
        }

    }
    const toggleCleaningSwitch = () => {
        if (isCleaning) {
            setIsCleaning(false);
        } else {
            setIsCleaning(true);
        }

    }


    const handleClickCancel = () => {
        // navigation.navigate('Dashboard');  
        navigation.navigate('CalendarScreen', { type: selectedResource })
    }

    const handleClickSubmit = () => {
        // Get an array of equipment IDs where the value is true
        props?.setLoading(true);
        const equipmentIds = Object.keys(checkedEquipments).filter(key => checkedEquipments[key] === true);
        const mobileEquipmentIds = Object.keys(checkedMobileEquipment).filter(key => checkedMobileEquipment[key] === true);
        const itSupportIds = Object.keys(checkedItSupport).filter(key => checkedItSupport[key] === true);
        const specialServiceIds = Object.keys(checkedSpecialService).filter(key => checkedSpecialService[key] === true);
        const floorIds = Object.keys(checkedFloors).filter(key => checkedFloors[key] === true).join(',');
        const users = Object.keys(checkUser).filter(key => checkUser[key] === true);
        const visitorId = Object.keys(checkVisitor).filter(key => checkVisitor[key] === true);
        const catringdataId = Object.keys(checkCatering).filter(key => checkCatering[key] === true);
        const bookingCatringdtoresponse = [];
        const chargingCarIds = Object.keys(checkedChargingCar).filter(key => checkedChargingCar[key] === true);
        const parkingSeatIdsList = Object.keys(checkedParkingSeat).filter(key => checkedParkingSeat[key] === true);

        if (catringdataId.length > 0) {
            catringdataId.forEach((item) => {
                bookingCatringdtoresponse.push({
                    customerCateringId: item,
                    debit: null,
                    description: null,
                    endTime: null,
                    quantity: null,
                    startTime: null,
                })
            })
        }

        const parkingSeatIds = selectedParkingSeat ? [selectedParkingSeat] : parkingSeatIdsList;

        // console.log("parking seat ids ", parkingSeatIds);

        //  console.log("parkingSeatIds ",parkingSeatIds);

        //   console.log("users ",users);
        //   console.log("requesterName ",requesterName);
        //   console.log("requesterEmail ",requesterEmail);

        datas = {
            id: bookingResponse?.id,
            locationId: selectedLocation,
            buildingId: selectedBuilding,
            floorId: null,
            bookingType: selectedResource,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate1,
            endTime: endTime,
            timeDuration: durationValue,
            meetingRoomId: selectedMeetingRoom,
            deskId: selectedDesk,
            requesterName: requesterName,
            requesterEmail: requesterEmail,
            bookingDescription: description,
            attendeeIds: users,
            visitorEmails: [],
            parkingSeatsIds: parkingSeatIds,
            chargingCarIds: chargingCarIds,
            cleaningRequired: isCleaning,
            customerCleaningDescription: cleaning,
            customerMobileEquipmentsIds: mobileEquipmentIds,
            customerMobileEquipmentDescription: mobileEquipmentDescription,
            customerITSupportsIds: itSupportIds,
            customerITSupportDescription: itSupportDescription,
            customerSpecialServicesIds: specialServiceIds,
            customerSpecialServiceDescription: specialServiceDescription,
            requesterId: loginUser.id,
            subject: subject,
            test: null,
            capacity1: selectedCapacity,
            customerEquipmentsIds: equipmentIds,
            bookingFrom: "MOBILE",
            bookingCateringDTOs: bookingCatringdtoresponse,
            visitorname: null,
            company: null,
            capacity: null,
            driver: null,
            licensePlate: null,
            usageType: null,
            parkingSeatId: null,
            parkingSeatDetails: [],
            visitorIds: visitorId,
            floorIds: floorIds,
            carId: selecteCars
        }

        // console.log("add booking  Payload datas ", datas);

        addBookingApi(datas).then((res) => {
            //  console.log("add booking  outer", res);

            Toast.showWithGravity(
                res?.information?.description,
                Toast.SHORT,
                Toast.BOTTOM,
                ToastColor.ERROR
            );
            if (res.status) {
                // console.log("add booking  success", res);
                params?.from ? navigation.navigate(params?.from) : navigation.navigate('CalendarScreen', { type: selectedResource })
            }
        }).finally(() => {
            props?.setLoading(false);
        })

        //    } 
    }



    // console.log("cateringFormEnable",cateringFormEnable);

    const handleFilter = () => {
        setFilterOptionsEnabled(!filterOptionsEnabled);
        // console.log("filterOptionsEnabled ", filterOptionsEnabled);
    }





    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{translate?.ROOMBOOKING?.EDITBOOKING}</Text>
            <ScrollView>
                {/* <View style={styles.pickerContainer}>
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
                        onChange={item => setSelectedLocation(item.value)}
                    />
                </View>

                <View style={styles.pickerContainer}>
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
                        onChange={item => setSelectedBuilding(item.value)}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <Text> {translate?.ROOMBOOKING?.FLOOR} </Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity onPress={handleFloorToggle} style={styles.dropdownHeader}>
                            {selectedFloorNames.length > 0 ? (
                                <Text>{selectedFloorNames.join(', ')}</Text>
                            ) : (
                                <Text style={styles.dropdownHeaderText}>{translate?.ROOMBOOKING?.SELECTFLOOR}</Text>
                            )}
                        </TouchableOpacity>
                        {isOpenFloor && (
                            <View style={styles.dropdownContent}>
                                {itemsFloors.map((item) => (
                                    <View key={item.id} style={styles.dropdownItem}>
                                        <Checkbox
                                            status={checkedFloors[item.id] ? 'checked' : 'unchecked'}
                                            onPress={() => handleFloorCheckboxChange(item.id)}
                                        />
                                        <Text>{item.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                    </View>
                </View>

                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMBOOKING?.RESOURCES}</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={itemsResources}
                        labelField="label"
                        valueField="value"
                        placeholder={translate?.ROOMBOOKING?.SELCETRESOURCE}
                        value={selectedResource}
                        onChange={item => resourceSelected(item)}
                    />
                </View>
                {
                    (selectedResource === 'meetingRoom' && equipmentData.length > 0) &&
                    <View style={styles.pickerContainer}>
                        <Text>{translate?.ROOMBOOKING?.EQUIPMENT}</Text>
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
                }



                {
                    (selectedResource === 'meetingRoom' && itemsCapacity.length > 0) &&
                    <View style={styles.pickerContainer}>
                        <Text>{translate?.ROOMBOOKING?.CAPACITY}</Text>

                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={itemsCapacity}
                            labelField="label"
                            valueField="value"
                            placeholder="Select capacity"
                            value={selectedCapacity}
                            onChange={item => setSelectedCapacity(item.value)}
                        />

                    </View>

                } */}


                <View style={styles.pickerContainer}>
                    <View style={styles.row}>
                        <View style={styles.dropdownWrapper} >
                            <Text>{translate?.ROOMBOOKING?.RESOURCES}</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={itemsResources}
                                labelField="label"
                                valueField="value"
                                placeholder={translate?.ROOMBOOKING?.SELCETRESOURCE}
                                value={selectedResource}
                                onChange={item => resourceSelected(item)}
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button mode="contained" style={{}} buttonColor={'#3699ff'} onPress={handleFilter} > Filter</Button>
                        </View>

                    </View>


                </View>


                {
                    filterOptionsEnabled &&
                    <View>
                        <View style={styles.pickerContainer}>
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
                                onChange={item => setSelectedLocation(item.value)}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
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
                                onChange={item => setSelectedBuilding(item.value)}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text> {translate?.ROOMBOOKING?.FLOOR} </Text>
                            <View style={styles.dropdownContainer}>
                                <TouchableOpacity onPress={handleFloorToggle} style={styles.dropdownHeader}>
                                    {selectedFloorNames.length > 0 ? (
                                        <Text>{selectedFloorNames.join(', ')}</Text>
                                    ) : (
                                        <Text style={styles.dropdownHeaderText}>{translate?.ROOMBOOKING?.SELECTFLOOR}</Text>
                                    )}
                                </TouchableOpacity>
                                {isOpenFloor && (
                                    <View style={styles.dropdownContent}>
                                        {itemsFloors.map((item) => (
                                            <View key={item.id} style={styles.dropdownItem}>
                                                <Checkbox
                                                    status={checkedFloors[item.id] ? 'checked' : 'unchecked'}
                                                    onPress={() => handleFloorCheckboxChange(item.id)}
                                                />
                                                <Text>{item.name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                            </View>
                        </View>


                        {
                            (selectedResource === 'meetingRoom' && equipmentData.length > 0) &&
                            <View style={styles.pickerContainer}>
                                <Text>{translate?.ROOMBOOKING?.EQUIPMENT}</Text>
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
                        }



                        {
                            (selectedResource === 'meetingRoom' && itemsCapacity.length > 0) &&
                            <View style={styles.pickerContainer}>
                                <Text>{translate?.ROOMBOOKING?.CAPACITY}</Text>

                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    data={itemsCapacity}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select capacity"
                                    value={selectedCapacity}
                                    onChange={item => setSelectedCapacity(item.value)}
                                />

                            </View>

                        }


                    </View>

                }


                <View style={styles.pickerContainer}>
                    <View style={styles.dateTimeContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 5 }} >{translate?.ROOMBOOKING?.STARTDATE}</Text>
                            <TouchableOpacity onPress={showDatepicker} style={styles.dateTimePicker}>
                                <Text style={styles.selectedText}>{date.toLocaleDateString()}</Text>
                                <Icon name="calendar" size={20} color="#000" style={styles.icon} />
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}

                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 5 }} >{translate?.ROOMBOOKING?.STARTTIME}</Text>
                            <TouchableOpacity onPress={showTimepicker} style={styles.dateTimePicker}>
                                <Text style={styles.selectedText}>{date.toLocaleTimeString()}</Text>
                                <Icon name="clock-o" size={20} color="#000" style={styles.icon} />
                            </TouchableOpacity>
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
                    </View>
                </View>

                <View style={styles.pickerContainer}>
                    <View style={styles.dateTimeContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 5 }} >{translate?.ROOMBOOKING?.ENDDATE}</Text>
                            <TouchableOpacity onPress={endshowDatepicker} style={styles.dateTimePicker}>
                                <Text style={styles.selectedText}>
                                    {endDate ? endDate.toLocaleDateString() : 'Select End Date'}
                                </Text>
                                <Icon name="calendar" size={20} color="#000" style={styles.icon} />
                            </TouchableOpacity>
                            {endShow && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={endDate}
                                    mode={endMode}
                                    display="default"
                                    onChange={onChangeEnd}
                                />
                            )}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginBottom: 5 }}>{translate?.ROOMBOOKING?.ENDTIME}</Text>
                            <TouchableOpacity onPress={endShowTimepicker} style={styles.dateTimePicker}>
                                <Text style={styles.selectedText}>
                                    {endDate ? endDate.toLocaleTimeString() : 'Select End Time'}
                                </Text>
                                <Icon name="clock-o" size={20} color="#000" style={styles.icon} />
                            </TouchableOpacity>
                            {endShowTime && (
                                <DateTimePicker
                                    testID="timePicker"
                                    value={endDate}
                                    mode="time"
                                    display="default"
                                    onChange={onChangeEnd}
                                />
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMBOOKING?.TIMEDURATION}</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={duration}
                        labelField="label"
                        valueField="value"
                        placeholder={translate?.ROOMBOOKING?.SELECTTIMEDURATION}
                        value={durationValue}
                        onChange={item => setDurationValue(item.value)}
                    />
                </View>
                {
                    selectedResource === 'meetingRoom' &&
                    <View style={styles.pickerContainer}>
                        <Text>{translate?.ROOMS?.MEETINGROOM}</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={meetingRoom}
                            labelField="label"
                            valueField="value"
                            placeholder={translate?.ROOMBOOKING?.SELECTYOURROOM}
                            value={selectedMeetingRoom}
                            onChange={item => meetingroomChange(item)}
                        />
                    </View>

                }

                {
                    selectedResource === 'desk' &&
                    <View style={styles.pickerContainer}>
                        <Text>{translate?.ROOMS?.DESKS}</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={desk}
                            labelField="label"
                            valueField="value"
                            placeholder={translate?.ROOMBOOKING?.SELECTYOURDESK}
                            value={selectedDesk}
                            onChange={item => deskChange(item)}
                        />
                    </View>
                }

                {
                    selectedResource === 'parkingSeat' &&
                    <View style={styles.pickerContainer}>
                        <Text>{translate?.ROOMS?.PARKINGSEATS}</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={parkingseat}
                            labelField="label"
                            valueField="value"
                            placeholder={translate.DISPLAYMODALFORM.SELECTPARKINGSEAT}
                            value={selectedParkingSeat}
                            onChange={item => parkingseatChange(item)}
                        />
                    </View>
                }

                {
                    selectedResource === 'chargingCar' &&

                    <View style={styles.pickerContainer}>
                        <Text> {translate?.DISPLAYMODALFORM?.CHARGINGCAR} </Text>
                        <View style={styles.dropdownContainer}>
                            <TouchableOpacity onPress={handleChargingCarToggle} style={styles.dropdownHeader}>
                                {selectedChargingCarNames.length > 0 ? (
                                    <Text>{selectedChargingCarNames.join(', ')}</Text>
                                ) : (
                                    <Text style={styles.dropdownHeaderText}>{translate?.DISPLAYMODALFORM?.SELECTCHARGINGCAR}</Text>
                                )}
                            </TouchableOpacity>
                            {isOpenChargingCar && (
                                <View style={styles.dropdownContent}>
                                    {chargingCar?.map((item) => (
                                        <View key={item.id} style={styles.dropdownItem}>
                                            <Checkbox
                                                status={checkedChargingCar[item.id] ? 'checked' : 'unchecked'}
                                                onPress={() => handleChargingCarCheckboxChange(item.id)}
                                            />
                                            <Text>{item.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                        </View>
                    </View>
                }

                {
                    selectedResource === 'car' &&
                    <View style={styles.pickerContainer}>
                        <Text>{translate?.ROOMS?.CAR}</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={cars}
                            labelField="label"
                            valueField="value"
                            placeholder={translate?.ROOMBOOKING?.SELECTCAR}
                            value={selecteCars}
                            onChange={item => setSelectedCars(item.value)}
                        />
                    </View>
                }

                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMBOOKING?.REQUESTORNAME}</Text>
                    <TextInput style={styles.textInput} placeholder={translate?.ROOMBOOKING?.REQUESTORNAME} className="input" value={requesterName} onChangeText={text => setRequesterName(text)} />

                </View>
                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMBOOKING?.REQUESTOREMAIL}</Text>
                    <TextInput style={styles.textInput} placeholder={translate?.ROOMBOOKING?.REQUESTOREMAIL} className="input" value={requesterEmail} onChangeText={text => setRequesterEmail(text)} />

                </View>
                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMBOOKING?.SUBJECT} *</Text>
                    <TextInput style={styles.textInput} placeholder={translate?.ROOMBOOKING?.SUBJECT} className="input" value={subject} onChangeText={text => setSubject(text)} />

                </View>
                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMBOOKING?.DESCRIPTION}</Text>
                    <TextInput
                        style={styles.textInputPragraph}
                        placeholder={translate?.ROOMSETTINGSMEETINGROOMFORM?.ENTERDESCRIPTION}
                        multiline={true} // Allows multiple lines of text
                        numberOfLines={4} // Specifies the number of lines visible at once
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />

                </View>

                <View style={styles.pickerContainer}>
                    <Text>{translate?.ROOMS?.ADDUSER}</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity onPress={handleuserToggle} style={styles.dropdownHeader}>
                            {selectedUerNames.length > 0 ? (
                                <Text>{selectedUerNames.join(', ')}</Text>
                            ) : (
                                <Text style={styles.dropdownHeaderText}>Select User</Text>
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
                {
                    (selectedResource === 'meetingRoom' || selectedResource === 'desk') &&

                    <View>

                        <View style={{ ...styles.dateTimeContainer, alignItems: 'center', marginLeft: 8 }}>

                            {/* <TextInput style={styles.textInput} placeholder="" className="input" value={visitor} onChangeText={text => setVisitor(text)} /> */}
                            <View style={styles.visitorContainer}>
                                <Text>{translate?.ROOMS?.ADDVISITORS} </Text>
                                <View style={styles.dropdownContainer}>
                                    <TouchableOpacity onPress={handleVisitorToggle} style={styles.dropdownHeader}>
                                        {selectedVisitorNames.length > 0 ? (
                                            <Text>{selectedVisitorNames.join(', ')}</Text>
                                        ) : (
                                            <Text style={styles.dropdownHeaderText}>Select Visitor</Text>
                                        )}
                                    </TouchableOpacity>
                                    {visitorisOpen && (
                                        <View style={styles.dropdownContent}>
                                            {visitor.map((item) => (
                                                <View key={item.id} style={styles.dropdownItem}>
                                                    <Checkbox
                                                        status={checkVisitor[item.id] ? 'checked' : 'unchecked'}
                                                        onPress={() => visitorCheckboxChange(item.id)}
                                                    />
                                                    <Text>{item.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                </View>
                            </View>
                            <View style={styles.vistorbuttonContainer}>
                                <Button mode="contained" buttonColor='#3699ff' onPress={() => addVisitorFormStatus()} style={styles.button}>{translate?.ROOMS?.ADDVISITORS}</Button>
                            </View>


                        </View>
                        {
                            visitorFormEnable &&
                            <View >
                                <View style={styles.pickerContainer}>
                                    <Text>{translate?.ROOMBOOKING?.VISITORNAME} *</Text>
                                    <TextInput style={styles.textInput} placeholder={translate?.ROOMBOOKING?.VISITORNAME} className="input" value={vistorName} onChangeText={text => setVistorName(text)} />
                                </View>
                                <View style={styles.pickerContainer}>
                                    <Text>{translate?.USERSETTINGS?.EMAIL} *</Text>
                                    <TextInput style={styles.textInput} placeholder={translate?.USERSETTINGS?.EMAIL} className="input" value={vistorEmail} onChangeText={text => setVistorEmail(text)} />
                                </View>

                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.COMPANY} *</Text>
                                    <TextInput style={styles.textInput} placeholder={translate?.ROOMBOOKING?.COMPANY} className="input" value={visitorCompany} onChangeText={text => setVisitorCompany(text)} />
                                </View>


                                <Button mode="contained-tonal" onPress={() => addVisitor()} style={styles.button}>{translate?.ROOMS?.ADDVISITORS}</Button>
                            </View>
                        }
                    </View>
                }
                {/* web below option edit not show for web so i resstricetion */}

                {
                    (viewMoreenable && (selectedResource === 'meetingRoom' || selectedResource === 'desk')) &&

                    <View>

                        {
                            rightsEnableParkingSeat && (
                                <View style={styles.pickerContainer}>
                                    <Text>{translate?.DISPLAYMODALFORM?.PARKINGSEAT}</Text>
                                    <View style={styles.dropdownContainer}>
                                        <TouchableOpacity onPress={handleParkingSeatToggle} style={styles.dropdownHeader}>
                                            {selectedParkinSeatNames.length > 0 ? (
                                                <Text>{selectedParkinSeatNames.join(', ')}</Text>
                                            ) : (
                                                <Text style={styles.dropdownHeaderText}>{translate.DISPLAYMODALFORM.SELECTPARKINGSEAT}</Text>
                                            )}
                                        </TouchableOpacity>
                                        {isOpenParkingSeat && (
                                            <View style={styles.dropdownContent}>
                                                {prakingseatResonse?.map((item) => (
                                                    <View key={item?.id} style={styles.dropdownItem}>
                                                        <Checkbox
                                                            status={checkedParkingSeat[item?.id] ? 'checked' : 'unchecked'}
                                                            onPress={() => handleParkingSeatCheckboxChange(item.id)}
                                                        />
                                                        <Text>{item?.name}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            )
                        }

                        {
                            rightsEnableChargingCar &&
                            <View style={styles.pickerContainer}>
                                <Text> {translate?.DISPLAYMODALFORM?.CHARGINGCAR} </Text>
                                <View style={styles.dropdownContainer}>
                                    <TouchableOpacity onPress={handleChargingCarToggle} style={styles.dropdownHeader}>
                                        {selectedChargingCarNames.length > 0 ? (
                                            <Text>{selectedChargingCarNames.join(', ')}</Text>
                                        ) : (
                                            <Text style={styles.dropdownHeaderText}>Select ChargingCar</Text>
                                        )}
                                    </TouchableOpacity>
                                    {isOpenChargingCar && (
                                        <View style={styles.dropdownContent}>
                                            {chargingCar?.map((item) => (
                                                <View key={item.id} style={styles.dropdownItem}>
                                                    <Checkbox
                                                        status={checkedChargingCar[item.id] ? 'checked' : 'unchecked'}
                                                        onPress={() => handleChargingCarCheckboxChange(item.id)}
                                                    />
                                                    <Text>{item.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                </View>
                            </View>
                        }

                        {/* catring Hide For Web  */}
                        {
                            (bookingResponse?.bookingCateringDTOs.length == 0 && cateringFormEnable) &&
                            <View style={styles.pickerContainer}>
                                <Text> {translate?.ROOMS?.CATERING}  </Text>
                                <View style={styles.dropdownContainer}>
                                    <TouchableOpacity onPress={handleCateringToggle} style={styles.dropdownHeader}>
                                        {selectedCateringNames.length > 0 ? (
                                            <Text>{selectedCateringNames.join(', ')}</Text>
                                        ) : (
                                            <Text style={styles.dropdownHeaderText}>Select Catering</Text>
                                        )}
                                    </TouchableOpacity>

                                    {cateringisOpen && (
                                        <View style={styles.dropdownContent}>
                                            {catering.map((item) => (
                                                <View key={item.id} style={styles.dropdownItem}>
                                                    <Checkbox
                                                        status={checkCatering[item.id] ? 'checked' : 'unchecked'}
                                                        onPress={() => handleCateringCheckboxChange(item.id)}
                                                    />
                                                    <Text>{item.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                </View>
                            </View>
                        }

                        {/* Cleaning  Hide For Web  */}


                        {/* {
                         cleaningFormEnable &&
                         <View style={styles.pickerContainer}>
                              <View style={styles.pickerContainer}>
                         <Text>Cleaning</Text>
                         <Switch 
                          onValueChange={toggleCleaningSwitch}
                          value={isCleaning}
                          />
 
                     </View>
                    
 
                  <View style={styles.pickerContainer}>
                 <Text>Cleaning Description</Text>
                 <TextInput
                     style={styles.textInputPragraph}
                     placeholder="Enter description here..."
                     multiline={true} // Allows multiple lines of text
                     numberOfLines={4} // Specifies the number of lines visible at once
                     value={cleaning}
                     onChangeText={text => setCleaning(text)}
                 />
 
             </View>
                         </View>
                     } */}


                        {
                            (bookingResponse?.customerMobileEquipments?.length == 0 && mobileEquipmentFormEnable) &&
                            <View >
                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.MOBILEEQUIPMENT} </Text>
                                    <View style={styles.dropdownContainer}>
                                        <TouchableOpacity onPress={handleMobileEquipmentToggle} style={styles.dropdownHeader}>
                                            {selectedMobileEquipmentNames.length > 0 ? (
                                                <Text>{selectedMobileEquipmentNames.join(', ')}</Text>
                                            ) : (
                                                <Text style={styles.dropdownHeaderText}>Select Mobile Equipments</Text>
                                            )}
                                        </TouchableOpacity>
                                        {mobileEquipmentisOpen && (
                                            <View style={styles.dropdownContent}>
                                                {mobileEquipment.map((item) => (
                                                    <View key={item.id} style={styles.dropdownItem}>
                                                        <Checkbox
                                                            status={checkedMobileEquipment[item.id] ? 'checked' : 'unchecked'}
                                                            onPress={() => handleMobileEquipmentCheckboxChange(item.id)}
                                                        />
                                                        <Text>{item.name}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                    </View>
                                </View>
                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.MOBILEEQUIPMENTDESCRIPTION} </Text>

                                    <TextInput
                                        style={styles.textInputPragraph}
                                        placeholder={translate?.ROOMSETTINGSMEETINGROOMFORM?.ENTERDESCRIPTION}
                                        multiline={true} // Allows multiple lines of text
                                        numberOfLines={4} // Specifies the number of lines visible at once
                                        value={mobileEquipmentDescription}
                                        onChangeText={text => setMobileEquipmentDescription(text)}
                                    />

                                </View>
                            </View>
                        }

                        {
                            (bookingResponse?.customerITSupports?.length == 0 && itSupportFormEnable) &&
                            <View>
                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.ITSUPPORT} </Text>
                                    <View style={styles.dropdownContainer}>
                                        <TouchableOpacity onPress={handleItSupportToggle} style={styles.dropdownHeader}>
                                            {selectedItSupportNames.length > 0 ? (
                                                <Text>{selectedItSupportNames.join(', ')}</Text>
                                            ) : (
                                                <Text style={styles.dropdownHeaderText}>Select IT Support</Text>
                                            )}
                                        </TouchableOpacity>
                                        {itSupportisOpen && (
                                            <View style={styles.dropdownContent}>
                                                {itSupport.map((item) => (
                                                    <View key={item.id} style={styles.dropdownItem}>
                                                        <Checkbox
                                                            status={checkedItSupport[item.id] ? 'checked' : 'unchecked'}
                                                            onPress={() => handleItSupportCheckboxChange(item.id)}
                                                        />
                                                        <Text>{item.name}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                    </View>
                                </View>
                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.ITSUPPORTDESCRIPTION} </Text>
                                    <TextInput
                                        style={styles.textInputPragraph}
                                        placeholder={translate?.ROOMSETTINGSMEETINGROOMFORM?.ENTERDESCRIPTION}
                                        multiline={true} // Allows multiple lines of text
                                        numberOfLines={4} // Specifies the number of lines visible at once
                                        value={itSupportDescription}
                                        onChangeText={text => setItSupportDescription(text)}
                                    />
                                </View>
                            </View>
                        }

                        {
                            (bookingResponse?.customerSpecialServices?.length == 0 && specialServiceFormEnable) &&
                            <View>

                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.SPECIALSERVICE} </Text>
                                    <View style={styles.dropdownContainer}>
                                        <TouchableOpacity onPress={handleSpecialServiceToggle} style={styles.dropdownHeader}>
                                            {selectedSpecialServiceNames.length > 0 ? (
                                                <Text>{selectedSpecialServiceNames.join(', ')}</Text>
                                            ) : (
                                                <Text style={styles.dropdownHeaderText}>Select Special Service</Text>
                                            )}
                                        </TouchableOpacity>
                                        {specialServiceisOpen && (
                                            <View style={styles.dropdownContent}>
                                                {specialService.map((item) => (
                                                    <View key={item.id} style={styles.dropdownItem}>
                                                        <Checkbox
                                                            status={checkedSpecialService[item.id] ? 'checked' : 'unchecked'}
                                                            onPress={() => handleItSpecialServiceCheckboxChange(item.id)}
                                                        />
                                                        <Text>{item.name}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                    </View>
                                </View>

                                <View style={styles.pickerContainer}>
                                    <Text> {translate?.ROOMBOOKING?.SPECIALSERVICEDESCRIPTION} </Text>
                                    <TextInput
                                        style={styles.textInputPragraph}
                                        placeholder={translate?.ROOMSETTINGSMEETINGROOMFORM?.ENTERDESCRIPTION}
                                        multiline={true} // Allows multiple lines of text
                                        numberOfLines={4} // Specifies the number of lines visible at once
                                        value={specialServiceDescription}
                                        onChangeText={text => setSpecialServiceDescription(text)}
                                    />
                                </View>

                            </View>
                        }
                    </View>
                }

                <View style={styles.viewMoreContainer}>
                    {!viewMoreenable ? (
                        <TouchableOpacity onPress={handleClickViewMore} style={styles.iconRowview}>
                            <Icon name="chevron-down" size={20} style={styles.iconview} />
                            <Text style={styles.iconTextview}>View More</Text>

                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleClickViewMore} style={styles.iconRowview}>
                            <Icon name="chevron-up" size={20} style={styles.iconview} />
                            <Text style={styles.iconTextview}>View Less</Text>

                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.submitbuttonContainer}>

                    <Button
                        mode="elevated"
                        onPress={handleClickCancel}
                        style={[styles.button, styles.cancelButton]}
                        buttonColor="red"
                        textColor='#fff'
                    >
                        {translate?.ROOMBOOKING?.CANCEL}
                    </Button>

                    <Button
                        mode="contained"
                        onPress={handleClickSubmit}
                        style={styles.button}
                        buttonColor={'#3699ff'}
                        disabled={disableUpdate}
                    >
                        {translate?.OPENSPACEADDMODAL?.UPDATE}
                    </Button>

                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    pickerContainer: {
        width: '100%',
        padding: 7,
        marginBottom: 20,
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
        fontSize: 14,
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
        columnGap: 8
    },
    dateTimePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        //  width: '48%',
    },
    selectedText: {
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        marginLeft: 40,
        size: 25,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateLabeles: {
        flexDirection: 'row',
        // marginTop: 10,
        marginBottom: 10,
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 110,
        marginLeft: 2,

    },

    textInput: {

        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 11,
        padding: 11,
        textAlignVertical: 'top', // Ensures text starts at the top of the input
    },
    textInputPragraph: {
        height: 100, // Adjust the height as needed
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 11,
        textAlignVertical: 'top', // Ensures text starts at the top of the input
    },

    //visitor
    visitorContainer: {
        width: '55%',
        marginBottom: 20,
    },
    vistorbuttonContainer: {
        width: '45%',
        // marginBottom: 20,
        //  marginTop: 25,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    iconText: {
        marginLeft: 10,
        fontSize: 18,
    },

    viewMoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    iconRowview: {
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center', // Center items horizontally
        marginVertical: 10,
    },
    iconview: {
        marginTop: 10, // Space between text and icon
    },
    iconTextview: {
        fontSize: 16,
    },

    submitbuttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        // flex: 1,
        textDecorationColor: '#fff',
        margin: 8,
    },
    cancelButton: {
        backgroundColor: '#c51616',
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
        justifyContent: 'space-between', // Optional: distribute space between dropdown and button
    },
    dropdownWrapper: {
        flex: 1, // Take up the remaining space
        marginRight: 10, // Add space between dropdown and button
    },
    buttonWrapper: {
        flexShrink: 1, // Ensure the button doesn't stretch
        marginTop: 14
    },


});
//make this component available to the app
export default EditBooking;
