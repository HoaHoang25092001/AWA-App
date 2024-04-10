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
    const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const unsubscribe = Camera.observeScannedData(cameraRef.current).subscribe({
      next: ({data, bounds}) => {
        // Xử lý dữ liệu khi quét được QR code
        console.log(`Scanned data: ${data}`);
        setScanned(true);

        // Tạm thời dừng camera để tránh quét liên tục
        Camera.resumePreview(cameraRef.current);

        // Xử lý logic sau khi quét thành công
        // Ví dụ: chuyển hướng, hiển thị thông báo, vv.
      },
    });

    return () => unsubscribe.unsubscribe();
  }, []);

  const handleRetry = () => {
    // Khôi phục trạng thái quét để có thể quét lại
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        ratio={'16:9'}
      />

      {scanned && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>QR Code Scanned!</Text>
          <Text style={styles.overlayText} onPress={handleRetry}>
            Tap to Scan Again
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    camera: {
      flex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 20,
    },
  });
  
  export default ScanQRCodeScreen