import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { useNavigation } from "@react-navigation/native";

function ScanQRCodeScreen({navigation }) {
  const navigator = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission()

  const device = useCameraDevice('back')

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`)
      navigator.navigate('Hoa don chua thanh toan', { idTheDienLuc: codes.value })
    }
  })

  useEffect(() => {
    requestPermission()
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
