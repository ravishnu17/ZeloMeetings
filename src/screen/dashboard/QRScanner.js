import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getResourceDataById } from '../../apiservices/Apiservices';

function QRScanner() {
    const [qrData, setQrData] = useState(null);
    const recapture= useRef();
    
    const QRData =( data) => {
        setQrData(data.data);
        getResourceDataById(data.data).then((res) => {
            
        })
    }
    return (
        <QRCodeScanner
            ref={recapture}
            onRead={(data) => console.log(data)}
            flashMode={RNCamera.Constants.FlashMode.auto}
            permissionDialogMessage='App needs access to your camera'
            showMarker={true}
            cameraStyle={{ height: 400 }}
            bottomContent={
                <View style={{flex:1}}>
                    <Text>{qrData}</Text>
                    {qrData && <Button title="Reset" onPress={() => {
                        setQrData(null);
                        recapture.current.reactivate();
                    }} />}
                </View>
            }
        />
    )
}

export default QRScanner