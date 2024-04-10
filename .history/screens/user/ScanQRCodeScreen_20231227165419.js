// Import necessary modules and components
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

// Import utility functions from 'utils'
import {
  formatWifiData,
  getCountryOfOriginFromBarcode,
  openExternalLink,
} from '../../assets/utils';

function ScanQRCodeScreen({ navigation }) {
  const navigator = useNavigation();
  // State variables
  const [torchOn, setTorchOn] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);

  // Camera permission hooks
  const {
    hasPermission: cameraHasPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  // Get the camera device (back camera)
  const device = useCameraDevice('back');

  // Handle camera permission on component mount
  useEffect(() => {
    handleCameraPermission();
  }, []);

  // Use the code scanner hook to configure barcode scanning
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      // Check if code scanning is enabled
      if (enableOnCodeScanned) {
        let value = codes[0]?.value;
        let type = codes[0]?.type;

        console.log(codes[0]);

        // Handle QR code
        if (type === 'qr') {
          openExternalLink(value).catch((error) => {
            showAlert('Detail', formatWifiData(value), false);
          });
        } else {
          // Handle other barcode types
          const countryOfOrigin = getCountryOfOriginFromBarcode(value);

          console.log(`Country of Origin for ${value}: ${countryOfOrigin}`);
          showAlert(value, countryOfOrigin);
        }

        // Disable code scanning to prevent rapid scans
        setEnableOnCodeScanned(false);
      }
    },
  });

  // Handle camera permission
  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();

    if (!granted) {
      alert(
        'Camera permission is required to use the camera. Please grant permission in your device settings.'
      );

      // Optionally, open device settings using Linking API
      Linking.openSettings();
    }
  };

  // Show alert with customizable content
  const showAlert = (
    value = '',
    countryOfOrigin = '',
    showMoreBtn = true
  ) => {
    Alert.alert(
      value,
      countryOfOrigin,
      showMoreBtn
        ? [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'More',
            onPress: () => {
              setTorchOn(false);
              setEnableOnCodeScanned(true);
              openExternalLink(
                'https://www.barcodelookup.com/' + value
              );
            },
          },
        ]
        : [
          {
            text: 'Cancel',
            onPress: () => setEnableOnCodeScanned(true),
            style: 'cancel',
          },
        ],
      { cancelable: false }
    );
  };

  // Round button component with image
  const RoundButtonWithImage = () => {
    return (
      <TouchableOpacity
        onPress={() => setTorchOn((prev) => !prev)}
        style={styles.buttonContainer}>
        <View style={styles.button}>
          <Image
            source={
              torchOn
                ? require('../../assets/awa-logo.png')
                : require('../../assets/NFC.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Render content based on camera device availability
  if (device == null)
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ margin: 10 }}>Camera Not Found</Text>
      </View>
    );

  // Return the main component structure
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RoundButtonWithImage />
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={torchOn ? 'on' : 'off'}
        onTouchEnd={() => setEnableOnCodeScanned(true)}
      />
    </SafeAreaView>
  );
}

export default ScanQRCodeScreen

// Styles for the component
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 20,
  },
  button: {
    backgroundColor: '#FFF', // Button background color
    borderRadius: 50, // Make it round (half of the width and height)
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 25, // Adjust the width and height of the image as needed
    height: 25,
  },
});