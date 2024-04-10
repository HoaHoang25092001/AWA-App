import React from 'react'
import { Text, View } from 'react-native'
import { useCameraPermission } from 'react-native-vision-camera'

function ScanQRCodeScreen() {
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

  return (
    <View>
      <Text>ScanQRCodeScreen</Text>
    </View>
  )
}

export default ScanQRCodeScreen
