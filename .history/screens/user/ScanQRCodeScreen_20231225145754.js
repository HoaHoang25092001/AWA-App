import { View } from 'native-base';
import React, { useState, useEffect } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';



const ScanQRCodeScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`)
        }
    })

    useEffect(() => {
        requestPermission();
    }, [])

    if (device == null) {
        return (
            <View>
                <Text>Device not found</Text>
            </View>
        )
    }
    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
        />
    )
}

export default ScanQRCodeScreen