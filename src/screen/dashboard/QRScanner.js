import React, { useContext, useRef } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { AddCheckIn, resourceCheckIn } from '../../apiservices/Apiservices';
import { useNavigation } from '@react-navigation/native';
import { context } from '../../navigation/Appnav';
import Toast from 'react-native-simple-toast';
import { ToastColor } from '../utils/ToastColors';


function QRScanner() {
    const recapture = useRef();
    const navigation = useNavigation();

    const props = useContext(context);
    const translate = props?.language;
    const setLoading = props?.setLoading;

    const doCheckIn = (bookingId, resourceId) => {
        setLoading(true);
        AddCheckIn(bookingId, resourceId).then((res) => {
            console.log(res);
            if (res?.status) {
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
            navigation.navigate('DashboardScreen');
        }).finally(() => setLoading(false));
    }

    const QRData = (data) => {
        setLoading(true);
        resourceCheckIn(data.data).then((res) => {
            if (res?.status) {
                Alert.alert(
                    "Alert", res?.information?.description, [
                    {
                        text: translate?.ROOMBOOKING?.CANCEL,
                        onPress: () => navigation.navigate('DashboardScreen'),
                        style: "cancel"
                    },
                    {
                        text: 'Check-In',
                        onPress: () => doCheckIn(res?.booking?.id, data?.data)
                    }
                ])
            } else {
                Alert.alert(
                    "Alert", res?.information?.description, [
                    {
                        text: translate?.ROOMBOOKING?.CANCEL,
                        onPress: () => navigation.navigate('DashboardScreen'),
                        style: "cancel"
                    },
                    {
                        text: translate?.ROOMBOOKING?.NEWBOOKING,
                        onPress: () => navigation.navigate('AddBooking')
                    }
                ])
            }
        }).finally(() => setLoading(false));
    }

    return (
        <View style={styles.container}>
            <QRCodeScanner
                ref={recapture}
                onRead={QRData}
                flashMode={RNCamera.Constants.FlashMode.off}
                permissionDialogMessage='App needs access to your camera'
                showMarker={true}
                topContent={
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 18,
                        padding: 25,
                    }}>
                        Please move your camera {"\n"} over the QR Code
                    </Text>
                }
            // bottomContent={
            //     <View style={{ flex: 1,justifyContent: 'flex-end', marginBottom: 20 }} onPress={recapture.current.reactivate()}>
            //         <TouchableOpacity style={{
            //             backgroundColor: '#0c881d',
            //             borderRadius: 5,
            //             paddingHorizontal: 10,
            //             paddingVertical: 5,
            //         }}>
            //             <Text style={{ color: '#fff', fontSize: 18, alignSelf: 'center' }}>Reset</Text>
            //         </TouchableOpacity>
            //     </View>
            // }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
})

export default QRScanner