import { View } from 'native-base';
import React, { useState, useEffect } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';



const ScanQRCodeScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

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
        />
    )
}

export default ScanQRCodeScreen