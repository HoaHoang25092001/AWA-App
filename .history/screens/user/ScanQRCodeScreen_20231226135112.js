import React, { useState, useEffect } from 'react'

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';

const ScanQRCodeScreen = () => {
  const devices = useCameraDevice();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState('');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const onFrameProcessor = ({ barcodes }) => {
    if (barcodes.length > 0) {
      setScannedCode(barcodes[0].data);
    }
  };

  if (hasPermission === false) {
    return <Text>No camera permission granted</Text>;
  }

  if (device == null) {
    return <Text>No back camera found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        device={device}
        style={StyleSheet.absoluteFillObject}
        frameProcessor={onFrameProcessor}
      >
        {/* No need for CodeScanner component in v3 */}
      </Camera>
      {scannedCode && (
        <View style={styles.overlay}>
          <Text style={styles.scannedText}>Scanned QR Code: {scannedCode}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scannedText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
  },
});

export default ScanQRCodeScreen;