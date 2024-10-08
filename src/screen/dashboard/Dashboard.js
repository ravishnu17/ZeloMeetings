import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Table from '../Table';
import { getDashboardData, updateBookingRequest } from '../../apiservices/Apiservices';
import { Alert } from 'react-native';
import { context } from '../../navigation/Appnav';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
    const [dashboard, setDashboard] = useState();
    const [menuIndex, setMenuIndex] = useState(-1);

    const props = useContext(context);
    const setLoading = props?.setLoading;
    const translate = props?.language;
    const tableDisplayResource = ['meetingRoom', 'desk', 'parkingSeat', 'chargingCar'];
    const isFocus = useIsFocused();
    const navigate = useNavigation();

    const dashBoardDetails = async () => {
        setLoading(true);
        let temp={};
        try {
            temp = await getDashboardData();
        } catch (error) {
            setLoading(false);
            if (error?.response?.status === 403) {
                AsyncStorage.clear();
                navigate.navigate('LoginScreen');
                return
            } else {
                console.error('API Error:', error);
            }
        }
        setLoading(false);
        if (temp?.status) {
            setDashboard(temp?.dashboardEndUserDTO);
        }
    }

    const getDetails = (item) => {
        const curr_date = new Date();
        let data = { id: item?.id, type: null, name: null, requester: null, startTime: null, endTime: null, isEnded: null };
        let from = new Date(item?.fromTime);
        let to = new Date(item?.toTime);

        data.isEnded = curr_date > to;
        data.requester = item?.requesterName;
        data.startTime = from.getFullYear() + '-' + ('0' + (from.getMonth() + 1)).slice(-2) + '-' + ('0' + from.getDate()).slice(-2) + ' ' + ('0' + from.getHours()).slice(-2) + ':' + ('0' + from.getMinutes()).slice(-2);
        data.endTime = to.getFullYear() + '-' + ('0' + (to.getMonth() + 1)).slice(-2) + '-' + ('0' + to.getDate()).slice(-2) + ' ' + ('0' + to.getHours()).slice(-2) + ':' + ('0' + to.getMinutes()).slice(-2);

        if (item?.bookingType === 'meetingRoom') {
            data.type = 'Meeting Room';
            data.name = item?.meetingRoom?.name;
        } else if (item?.bookingType === 'desk') {
            data.type = 'Desk';
            data.name = item?.desk?.name;
        } else if (item?.bookingType === 'parkingSeat') {
            data.type = 'Parking Seat';
            data.name = 'Parking Seat'//item?.parkingSeats?.map(item => item?.name).join(', ');
        } else if (item?.bookingType === 'chargingCar') {
            data.type = 'Charging Car';
            data.name = 'Charging Car' // item?.chargingCars?.map(item => item?.name).join(', ');
        }
        return data
    }

    const updateRequest = (id, status) => {
        Alert.alert(
            "Alert",
            status ? translate?.ROOMBOOKING?.ALLOWBOOKING : translate?.ROOMBOOKING?.DENYBOOKING,
            [
                {
                    text: translate?.ROOMBOOKING?.CANCEL,
                    onPress: () => console.log("Cancel Pressed in update request"),
                    style: "cancel"
                },
                {
                    text: translate?.REPORT?.CONFIRM,
                    onPress: () => {
                        setLoading(true);
                        updateBookingRequest(id, status).then((res) => {
                            if (res.status) {
                                Toast.showWithGravity(
                                    res?.information?.description,
                                    Toast.SHORT,
                                    Toast.BOTTOM,
                                    ToastColor.SUCCESS
                                );
                            } else {
                                Toast.showWithGravity(
                                    res?.information?.description,
                                    Toast.SHORT,
                                    Toast.BOTTOM,
                                    ToastColor.ERROR
                                );
                            }
                        }).catch((error) => console.log('error while updating request', error)
                        ).finally(() => {
                            setLoading(false);
                            dashBoardDetails();
                        });
                    }
                }
            ],
            { cancelable: false }
        )
    }

    const handleEdit = (id) => {
        navigate.navigate('EditBooking', { id: id, from: 'DashboardScreen' });
    }

    useEffect(() => {
        if (isFocus) {
            props?.setActive(1);
            dashBoardDetails();
            props?.setPre();
            setMenuIndex(-1);
        }
    }, [isFocus]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                {/* Room */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{translate?.ENDUSERDASHBOARD?.ROOMS}</Text>
                    <View style={styles?.progressText} >
                        <Text style={styles.itemText}>{dashboard?.percentageOfRoomsBooked}%</Text>
                        <Text style={styles.itemText}>{dashboard?.availableRooms}/{dashboard?.engagedRooms}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfRoomsBooked ? dashboard?.percentageOfRoomsBooked : 0}%` }]} />
                    </View>
                </View>

                {/* Desk */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{translate?.ENDUSERDASHBOARD?.DESKS}</Text>
                    <View style={styles?.progressText} >
                        <Text style={styles.itemText}>{dashboard?.percentageOfDesksBooked}%</Text>
                        <Text style={styles.itemText}>{dashboard?.availableDesks}/{dashboard?.engagedDesks}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfDesksBooked ? dashboard?.percentageOfDesksBooked : 0}%` }]} />
                    </View>
                </View>
                {/* Parking */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{translate?.ENDUSERDASHBOARD?.PARKINGSEATS}</Text>
                    <View style={styles?.progressText} >
                        <Text style={styles.itemText}>{dashboard?.percentageOfParkingSeatsBooked}%</Text>
                        <Text style={styles.itemText}>{dashboard?.availableParkingSeats}/{dashboard?.engagedParkingSeats}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfParkingSeatsBooked ? dashboard?.percentageOfParkingSeatsBooked : 0}%` }]} />
                    </View>
                </View>
                {/* Charging car */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{translate?.ROOMBOOKING?.CHARGINGCARS}</Text>
                    <View style={styles?.progressText} >
                        <Text style={styles.itemText}>{dashboard?.percentageOfChargingCarsBooked}%</Text>
                        <Text style={styles.itemText}>{dashboard?.availableChargingCars}/{dashboard?.engagedChargingCars}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfChargingCarsBooked ? dashboard?.percentageOfChargingCarsBooked : 0}%` }]} />
                    </View>
                </View>
                {/*car */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{translate?.ROOMBOOKING?.CARS}</Text>
                    <View style={styles?.progressText} >
                        <Text style={styles.itemText}>{dashboard?.percentageOfCarsBooked}%</Text>
                        <Text style={styles.itemText}>{dashboard?.availableCars}/{dashboard?.engagedCars}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfCarsBooked ? dashboard?.percentageOfCarsBooked : 0}%` }]} />
                    </View>
                </View>
            </View>

            <View style={{ ...styles.row, marginTop: 15, alignItems: 'center' }}>
                <View style={{ width: 25, height: 25, backgroundColor: 'green' }} />
                <Text style={{ color: '#757575'}}>{translate?.ROOMS?.AVILABLE}</Text>

                <View style={{ width: 25, height: 25, backgroundColor: '#c40404' }} />
                <Text style={{ color: '#757575'}}>{translate?.ROOMS?.FULL}</Text>
            </View>

            <View style={{ marginTop: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#757575' }}>{translate?.ENDUSERDASHBOARD?.ROOMDESKBOOKINGREQUESTS}</Text>
                {/* {translate?.ENDUSERDASHBOARD?.ROOMS} / {translate?.ENDUSERDASHBOARD?.DESKS} {translate?.ENDUSERDASHBOARD?.ROOMDESKBOOKINGREQUESTS} */}
                <Table
                    cols={[translate?.ENDUSERDASHBOARD?.TYPE,
                    translate?.ENDUSERDASHBOARD?.RESOURCE,
                    translate?.ENDUSERDASHBOARD?.REQUESTERNAME,
                    translate?.ENDUSERDASHBOARD?.STARTTIME,
                    translate?.ENDUSERDASHBOARD?.ENDTIME
                    ]}
                    rows={dashboard?.bookingList ? dashboard?.bookingList?.filter(item => tableDisplayResource.includes(item?.bookingType)).map((item) => getDetails(item)).filter((item) => item.isEnded === false) : []}
                    handleCancelAcceptClick={updateRequest}
                    handleEdit={handleEdit}
                    menuIndex={menuIndex}
                    setMenuIndex={setMenuIndex}
                    loading={props?.loading}
                    noDataText={translate?.USERSETTINGS?.NODATAFOUND}
                    editText={translate?.USERSETTINGS?.EDIT}
                    cancelText={translate?.ROOMS?.CANCEL}
                    acceptText={translate?.ENDUSERDASHBOARD?.ACCEPT}

                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        columnGap: 15,
        marginTop: 15,
        alignItems: 'flex-end',
        padding: 5,
        zIndex: 1
    },
    progressContainer: {
        height: 50,
        width: '100%',
        backgroundColor: 'green',
        borderRadius: 5,
        overflow: 'hidden',
    },
    itemText: {
        fontSize: 11, 
        fontWeight: 'bold',
        color:'#757575'
    },
    progressText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'flex-end',
    },
    filler: {
        height: '100%',
        backgroundColor: '#c40404',
        alignSelf: 'flex-end',
    }
})

export default Dashboard
