import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, Linking } from 'react-native';
import { useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';

const ScanQRCodeScreen = () => {
  const device = useCameraDevice('back')

  React.useEffect(() => {
    requestCameraPermission();
  }, [])

  const requestCameraPermission = React.useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission == 'denied') {
      console.log("Permission not granted");
      await Linking.openSettings();
    }
  }, [])

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