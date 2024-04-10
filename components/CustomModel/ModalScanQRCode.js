import { View, Text, StyleSheet, Alert, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Center, FormControl, Input, Modal } from "native-base";

import { useDispatch } from "react-redux";
import { updateTheDienLuc } from "../../store/AddIdDienLuc/action";

const ModalScanQRCode = ({
  modalVisible,
  setModalVisible,
  selectedIdKhachHang,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);
  console.log("Id Khach Hang: ", selectedIdKhachHang);
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      // Dispatch the action to update the backend
      const result = await dispatch(
        updateTheDienLuc({
          khachHangId: selectedIdKhachHang,
          idTheDienLuc: data,
        })
      );
      if (updateTheDienLuc.fulfilled.match(result)) {
        const { payload } = result;
        if (payload.statusCode === 400) {
          ToastAndroid.show(
            "Id thẻ điện lực này đã tồn tại!",
            ToastAndroid.LONG
          );
          setModalVisible(false);
          setScanned(false);
        } else if (payload.statusCode === 202) {
          ToastAndroid.show(
            "Cập nhật thẻ điện lực thành công!",
            ToastAndroid.LONG
          );

          setModalVisible(false);
          setScanned(false);
        }
      } else {
        ToastAndroid.show("Cập nhật thất bại!", ToastAndroid.LONG);
        setModalVisible(false);
        setScanned(false);
      }
    } catch (error) {
      console.error("Error updating the backend:", error.message);
    }
  };

  if (hasPermission === null) {
    return (
      <Center>
        <View>
          <Text style={{ fontSize: 20, fontFamily: "Quicksand_500Medium" }}>
            Requesting for camera permission
          </Text>
        </View>
      </Center>
    );
  }
  if (hasPermission === false) {
    return (
      <Center>
        <View>
          <Text style={{ fontSize: 20, fontFamily: "Quicksand_500Medium" }}>
            No access to camera
          </Text>
        </View>
      </Center>
    );
  }
  return (
    <View>
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setScanned(false);
        }}
        avoidKeyboard
        bottom="4"
        size="lg"
      >
        <Modal.Content width="100%" height="100%">
          <Modal.CloseButton />
          {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          > */}
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
          {/* </BarCodeScanner> */}
        </Modal.Content>
      </Modal>
    </View>
  );
};
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
    backgroundColor: "black",
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 2,
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
    flex: 2,
    backgroundColor: opacity,
  },
});

export default ModalScanQRCode;
