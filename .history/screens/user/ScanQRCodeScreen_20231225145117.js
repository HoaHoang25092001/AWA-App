import { View } from 'native-base';
import React from 'react';

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