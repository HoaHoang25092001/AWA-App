// Import necessary modules and components
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  formatWifiData,
  getCountryOfOriginFromBarcode,
  openExternalLink,
} from "../../assets/utils";

import { useNavigation } from "@react-navigation/native";

import { fetchHoaDonByIdDienLuc } from "../../store/QRCodeHoaDon/action";
import { useDispatch } from "react-redux";
import InvoiceDetailsModalQRcode from "../../components/CustomModel/InvoiceDetailQRCode";
import { Ionicons } from "@expo/vector-icons";
import { HStack } from "native-base";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";

function ScanQRCodeScreen({ navigation }) {
  const [torchOn, setTorchOn] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
  const dispatch = useDispatch();

  const {
    hasPermission: cameraHasPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  useEffect(() => {
    handleCameraPermission();
  }, []);
  const device = useCameraDevice("back");
  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: async (codes) => {
      // Check if code scanning is enabled
      if (enableOnCodeScanned) {
        let value = codes[0]?.value;
        let type = codes[0]?.type;

        try {
          // Dispatch the action to update the backend
          const result = await dispatch(
            fetchHoaDonByIdDienLuc({
              idTheDienLuc: value,
            })
          );
          console.log(value);
          console.log(result.payload);
          console.log(fetchHoaDonByIdDienLuc.fulfilled);
          if (fetchHoaDonByIdDienLuc.fulfilled.match(result)) {
            console.log("Data the dien luc", result.payload);
            setShowInvoiceDetailsModal(true);
            setEnableOnCodeScanned(false);
          } else {
            // setModalVisible(false);
            setEnableOnCodeScanned(false);
          }
        } catch (error) {
          console.error("Error updating the backend:", error.message);
        }
      }
    },
  });
  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();

    if (!granted) {
      alert(
        "Camera permission is required to use the camera. Please grant permission in your device settings."
      );

      // Optionally, open device settings using Linking API
      Linking.openSettings();
    }
  };

  if (showInvoiceDetailsModal === true) {
    return (
      <SafeAreaView>
        <InvoiceDetailsModalQRcode
          visible={showInvoiceDetailsModal}
          onClose={() => setShowInvoiceDetailsModal(false)}
        />
      </SafeAreaView>
    );
  }
  const RoundButtonWithImage = () => {
    return (
      <TouchableOpacity
        onPress={() => setTorchOn((prev) => !prev)}
        style={styles.buttonContainer}
      >
        <View style={styles.button}>
          <Image
            source={
              torchOn
                ? require("../../assets/awa-logo.png")
                : require("../../assets/NFC.png")
            }
            style={styles.buttonImage}
          />
        </View>
      </TouchableOpacity>
    );
  };
  if (device == null)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ margin: 10 }}>Camera Not Found</Text>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack("ScanNFCScreen")}>
        <HStack style={{ paddingTop: 5 }}>
          <Ionicons name="chevron-back-outline" size={26} color="black" />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              fontFamily: "Quicksand_700Bold",
              textAlign: "center",
            }}
          >
            Trở về
          </Text>
        </HStack>
      </TouchableOpacity>
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <RoundButtonWithImage />
        <Camera
          codeScanner={codeScanner}
          style={styles.layerCenter}
          device={device}
          isActive={true}
          torch={torchOn ? "on" : "off"}
          onTouchEnd={() => setEnableOnCodeScanned(true)}
        />
      </View>
      <View style={styles.layerBottom} />
    </SafeAreaView>
  );
}

export default ScanQRCodeScreen;

// Styles for the component
const opacity = "rgba(0, 0, 0, 0)";
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    right: 20,
    top: 20,
  },
  button: {
    backgroundColor: "#FFF", // Button background color
    borderRadius: 50, // Make it round (half of the width and height)
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 25, // Adjust the width and height of the image as needed
    height: 25,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "white",
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 4,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 2,
    backgroundColor: opacity,
  },
  focused: {
    flex: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  layerRight: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
});
