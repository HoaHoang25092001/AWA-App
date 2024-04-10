import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View } from 'react-native';
import { useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';

const ScanQRCodeScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [availableDevices, setAvailableDevices] = useState([]);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        if (!hasPermission) {
          await requestPermission();
        }

        const devices = await Camera.getAvailableCameraDevices();
        setAvailableDevices(devices);
      } catch (error) {
        console.error('Error setting up camera:', error);
      }
    };

    setupCamera();
  }, [hasPermission]);

  const selectCameraDevice = (position) => {
    return availableDevices.find((device) => device.position === position);
  };

  for (const device of availableDevices) {
    try {
      useCameraDevice(device);
      console.log(`Device ${device.position} works.`);
    } catch (error) {
      console.log(`Device ${device.position} failed. Error: ${error}`);
    }
  }

  const device = selectCameraDevice('back');

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Device not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        codeScanner={{
          codeTypes: ['qr', 'ean-13'],
          onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`);
            // Xử lý mã vạch đã quét ở đây
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ScanQRCodeScreen;