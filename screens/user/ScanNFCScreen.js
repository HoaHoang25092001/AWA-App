import { useNavigation } from "@react-navigation/native";
import { Actionsheet, Box, Center, Heading, VStack } from "native-base";
import * as React from "react";
import { useEffect, useRef } from "react";
import {
  Image,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import NfcProxy from "./NfcProxy";

function ScanNFCScreen() {
  const [modalChip, setModalChip] = React.useState(false);
  const navigation = useNavigation();

  const handleNfcScan = async () => {
    console.log("Render Check");
    try {
      const tag = await NfcProxy.readTag();

      if (tag) {
        console.log("RFID: ", tag.id);
        setModalChip(false);
        navigation.navigate("WriteIndexDirect", { idChipDongHo: tag.id });
      } else {
        console.log("Thẻ không hợp lệ");
      }
    } catch (error) {
      console.error("Error while scanning RFID:", error);
    }
  };
  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn("tag", tag);
      NfcManager.setAlertMessageIOS("I got your tag!");
      NfcManager.unregisterTagEvent().catch(() => 0);
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  }, []);

  const handleIOSNfcScan = async () => {
    console.log("Render Check");
    try {
      const tag = await NfcProxy.readTag();

      if (tag) {
        console.log("RFID: ", tag.id);
        setModalChip(false);
        navigation.navigate("WriteIndexDirect", { idChipDongHo: tag.id });
      } else {
        console.log("Thẻ không hợp lệ");
      }
    } catch (error) {
      console.error("Error while scanning RFID:", error);
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (modalChip === true && !isFirstRender.current) {
      if (Platform.OS === "ios") {
        handleIOSNfcScan();
      } else if (Platform.OS === "android") {
        handleNfcScan();
      }
    } else {
      isFirstRender.current = false;
    }
  }, [modalChip]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          <Text style={{ fontFamily: "Quicksand_700Bold" }}>Chức năng</Text>
        </Heading>
        <Center>
          <VStack space={3} justifyContent="center" flexWrap="wrap">
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === "ios") {
                  handleIOSNfcScan();
                } else if (Platform.OS === "android") {
                  setModalChip(true);
                }
              }}
            >
              <Box
                style={{
                  borderRadius: 5,
                  shadowOpacity: 0.2,
                  marginBottom: 50,
                  marginTop: 25,
                }}
                backgroundColor="white"
              >
                <Center>
                  <Image
                    style={{ width: 250, height: 250 }}
                    source={require("../../assets/NFCScan.png")}
                    alt="image base"
                  />

                  <VStack space="3" px="4" pb="4">
                    <Text
                      style={{
                        fontFamily: "Quicksand_700Bold",
                        fontSize: 18,
                      }}
                    >
                      Tìm sổ đọc
                    </Text>
                  </VStack>
                </Center>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ScanQRCodeScreen")}
            >
              <Box
                style={{
                  borderRadius: 5,
                  shadowOpacity: 0.2,
                  marginBottom: 50,
                  marginTop: 25,
                }}
                backgroundColor="white"
              >
                <Center>
                  <Image
                    style={{ width: 250, height: 250 }}
                    source={require("../../assets/QRCode.png")}
                    alt="image base"
                  />

                  <VStack space="3" px="4" pb="4">
                    <Text
                      style={{
                        fontFamily: "Quicksand_700Bold",
                        fontSize: 18,
                      }}
                    >
                      Tìm hóa đơn chưa thanh toán
                    </Text>
                  </VStack>
                </Center>
              </Box>
            </TouchableOpacity>
          </VStack>
        </Center>
      </Box>
      <Actionsheet isOpen={modalChip} onClose={() => setModalChip(false)}>
        <Actionsheet.Content>
          <Box w="100%" h={200} px={4} justifyContent="center">
            <Image
              source={require("../../assets/logonfc.png")}
              alt="Image Scan"
              style={{ width: "100%", height: 150, alignContent: "center" }}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Quicksand_500Medium",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Đang chờ quét thẻ ...
            </Text>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    position: "absolute",
    top: Platform.OS === "android" ? 20 : 0,
    right: 20,
  },
});

export default ScanNFCScreen;
