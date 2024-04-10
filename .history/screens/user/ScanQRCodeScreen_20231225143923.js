import React from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';



const ScanQRCodeScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()
    return (
        <View></View>
    )
}

export default ScanQRCodeScreen