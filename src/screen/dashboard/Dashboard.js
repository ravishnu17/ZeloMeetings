import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Table from '../Table';
import { getDashboardData, updateBookingRequest } from '../../apiservices/Apiservices';
import { Alert } from 'react-native';
import { context } from '../../navigation/Appnav';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';
import { useIsFocused } from '@react-navigation/native';

const Dashboard = () => {
    const [dashboard, setDashboard] = useState();
    const [menuIndex, setMenuIndex] = useState(-1);

    const props = useContext(context);
    const setLoading = props?.setLoading;
    const cols = ['Type', 'Room / Desk', 'Requester', 'Start Time', 'End Time'];
    const isFocus = useIsFocused();

    const dashBoardDetails = async () => {
        setLoading(true);
        let temp = await getDashboardData();
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
        }

        return data
    }

    const updateRequest = (id, status) => {
        Alert.alert(
            "Alert",
            `Are you sure you want to ${status ? 'accept' : 'cancel'}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed in update request"),
                    style: "cancel"
                },
                {
                    text: "Confirm",
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

    useEffect(() => {
        if (isFocus) {
            props?.setActive(1);
            dashBoardDetails();
            props?.setPre();
        }
    }, [isFocus]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                {/* Room */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} >
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Rooms ({dashboard?.percentageOfRoomsBooked}%)</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{dashboard?.availableRooms}/{dashboard?.engagedRooms}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfRoomsBooked ? dashboard?.percentageOfRoomsBooked : 0}%` }]} />
                    </View>
                    {/* <View style={{ position: 'absolute', top: '50%', alignSelf: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{dashboard?.noOfRooms}</Text>
                    </View> */}
                </View>

                {/* Desk */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} >
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Desks ({dashboard?.percentageOfDesksBooked}%)</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{dashboard?.availableDesks}/{dashboard?.engagedDesks}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfDesksBooked ? dashboard?.percentageOfDesksBooked : 0}%` }]} />
                    </View>
                </View>

                {/* Parking */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} >
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Parking ({dashboard?.percentageOfParkingSeatsBooked}%)</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{dashboard?.availableParkingSeats}/{dashboard?.engagedParkingSeats}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.filler, { width: `${dashboard?.percentageOfParkingSeatsBooked ? dashboard?.percentageOfParkingSeatsBooked : 0}%` }]} />
                    </View>
                </View>
            </View>

            <View style={{ ...styles.row, marginTop: 15, alignItems: 'center' }}>
                <View style={{ width: 25, height: 25, backgroundColor: 'green' }} />
                <Text>Available</Text>

                <View style={{ width: 25, height: 25, backgroundColor: '#c40404' }} />
                <Text>Full</Text>
            </View>

            <View style={{ marginTop: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Room / Desk booking requests</Text>
                <Table
                    cols={cols}
                    rows={dashboard?.bookingList ? dashboard?.bookingList?.map((item) => getDetails(item)).filter((item) => item.isEnded === false) : []}
                    onClick={updateRequest}
                    menuIndex={menuIndex}
                    setMenuIndex={setMenuIndex}
                    loading={props?.loading}
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
    },
    progressContainer: {
        height: 50,
        width: '100%',
        backgroundColor: 'green',
        borderRadius: 5,
        overflow: 'hidden',
    },
    filler: {
        height: '100%',
        backgroundColor: '#c40404',
        alignSelf: 'flex-end',
    }
})

export default Dashboard
