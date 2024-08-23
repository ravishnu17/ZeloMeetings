import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { checkInWithPin, getPinCheckinList, resourceCheckIn } from '../../apiservices/Apiservices';
import { context } from '../../navigation/Appnav';
import { View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';

function Pincheckin() {
    const props = useContext(context);
    const isFocus = useIsFocused();
    const translate = props?.language;
    const navigation = useNavigation();
    const [bookingList, setBookingList] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [showModal, setShowModal] = useState(false);
    const [pin, setPin] = useState();
    const inputPIN = useRef(null);

    // Get CheckIn List
    const getCheckInList = () => {
        getPinCheckinList().then((res) => {
            if (res?.status) {
                setBookingList(res?.bookingDTOs);
            } else {
                setBookingList([]);
                Alert.alert('Alert', res?.information?.description, [
                    {
                        text: 'OK',
                        onPress: () => null
                    }
                ]);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            props?.setLoading(false);
        });
    }
    // Check if the check in is valid
    const checkCheckIn = (id) => {
        props?.setLoading(true);
        resourceCheckIn(id).then((res) => {
            props?.setLoading(true);
            if (res?.status) {
                setSelectedItem(res?.booking);
                setShowModal(true);
                setTimeout(() => {
                    inputPIN?.current?.focus();
                }, 100);
            } else {
                Alert.alert('Alert', res?.information?.description, [
                    {
                        text: translate?.ROOMBOOKING?.CANCEL,
                        onPress: () => props?.setLoading(false),
                        style: "cancel"
                    },
                    {
                        text: translate?.ROOMBOOKING?.NEWBOOKING,
                        onPress: () => {
                            props?.setPre({ id: 1, name: 'PinCheckIn' });
                            navigation.navigate('AddBooking', { from: 'PinCheckIn' });
                        }
                    }
                ]);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            props?.setLoading(false);
        });
    }
    // handle Check in 
    const handleCheckIn = () => {
        props?.setLoading(true);
        checkInWithPin(selectedItem?.id, pin).then((res) => {
            if (res?.status) {
                Toast.showWithGravity(
                    res?.information?.description,
                    Toast.SHORT,
                    Toast.BOTTOM,
                    ToastColor.SUCCESS
                );
                setShowModal(false);
                navigation.navigate('DashboardScreen');
            } else {
                Toast.showWithGravity(
                    res?.information?.description,
                    Toast.SHORT,
                    Toast.BOTTOM,
                    ToastColor.ERROR
                );
            }
            setPin();
        }).catch(err => console.log("checkin err", err)).finally(() => props?.setLoading(false));
    }
    const ResourceName = (type) => {
        if (type === 'meetingRoom') {
            return 'Meeting Room'
        } else if (type === 'desk') {
            return 'Desk'
        } else if (type === 'parkingSeat') {
            return 'Parking Seat'
        } else if (type === 'chargingCar') {
            return 'Charging Car'
        }
    }
    useEffect(() => {
        if (isFocus) {
            props?.setPre({ id: 1, name: 'DashboardScreen', checkIn: true });
            props?.setLoading(true);
            getCheckInList();
        }
    }, [isFocus])

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    (bookingList?.length > 0) && bookingList.map((item, index) => <TouchableOpacity key={index}
                        style={styles.bookingContainer}
                        onPress={() => checkCheckIn(item?.[item?.bookingType]?.id)}
                    >
                        {/* <Text>{item?.requesterName}</Text> */}
                        <Text style={styles.title}>{item?.subject}</Text>
                        <Text style={styles.description}>{ResourceName(item?.bookingType)} - {item?.[item?.bookingType]?.name}</Text>
                    </TouchableOpacity>)
                }
            </ScrollView>
            {
                (!props?.loading && bookingList?.length === 0) && <Text style={styles.noData}>{translate?.USERSETTINGS?.NODATAFOUND}!</Text>
            }
            <Modal animationType="fade" transparent={true} visible={showModal}
                onDismiss={() => setShowModal(false)} onRequestClose={() => setShowModal(false)}>
                <View style={styles.modal}>
                    <View style={styles?.modalContainer}>
                        <Text style={[styles.title, { textAlign: 'center', marginBottom: 2 }]}>{selectedItem?.subject}</Text>
                        <Text style={[styles.description, { textAlign: 'center', marginBottom: 20 }]}>{ResourceName(selectedItem?.bookingType)} - {selectedItem?.[selectedItem?.bookingType]?.name}</Text>
                        <TextInput ref={inputPIN} value={pin} style={styles.input} placeholder='Enter PIN' onChangeText={(text) => setPin(text)} />

                        <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#ccc', marginTop: 20 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                setPin();
                                setShowModal(false);
                            }}>
                                <Text style={[styles.butonText, styles.cancelText]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={handleCheckIn}>
                                <Text style={styles.butonText}>Check-In</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    bookingContainer: {
        padding: 10,
        borderWidth: 0.1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,

        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000'
    },
    description: {
        marginTop: 5,
        fontSize: 13,
        color: '#000'
    },
    noData: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color:'#a5a5a5'
    },
    modal: {
        flex: 1,
        backgroundColor: '#00000060',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '70%',
        borderRadius: 10,
        paddingVertical: 20,
        backgroundColor: '#eeeeee'
    },
    input: {
        padding: 5,
        width: '90%',
        alignSelf: 'center',

        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        color: '#000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    butonText: {
        color: '#0763db',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    cancelText: {
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        color: '#333333'
    }
});

export default Pincheckin