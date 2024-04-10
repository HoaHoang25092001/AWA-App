import { View } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';



const ScanQRCodeScreen = () => {
    const [barcode, setBarcode] = useState(null);

    useEffect(() => {
        const camera = new Camera({
            fps: 30,
            barcodeFinder: {
                type: 'qr',
            },
        });

        camera.on('barcodeScanned', (barcode) => {
            setBarcode(barcode.data);
        });

        return () => {
            camera.stop();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
            />
            {barcode && (
                <View style={styles.barcode}>
                    <Text>{barcode}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    barcode: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScanQRCodeScreen