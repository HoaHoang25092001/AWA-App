import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Divider,
  FormControl,
  HStack,
  Input,
  Modal,
  Select,
  Skeleton,
  VStack,
  useToast,
  Pressable,
  Image,
  Actionsheet,
} from "native-base";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAddChipDongHo } from "../../store/AddChipDongHo/action";
import { fecthUpdateGhiChiSo } from "../../store/UpdateGhiChiSo/action";
import CameraCustom from "../CameraCustom/CameraCustom";
import { useDispatch, useSelector } from "react-redux";

import NfcProxy from "../../screens/user/NfcProxy";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { useRef } from "react";
import { getInvoiceChuaThanhToanByIdKH } from "../../store/HoaDon/asyncAction";
import { useNavigation } from "@react-navigation/native";

const WriteIndexDetailModal = ({
  showModal,
  setUpdateGhiChiSo,
  setUpdateSuccess,
  updateGhiChiSo,
  loadingSoDocDetail,
  trangThaiGhi,
  inputValue,
  idDongHo,
  selectedItemId,
  updateSuccess,
  setInputValue,
  setShowModal,
  setItemId,
  itemId
}) => {
  const navigator = useNavigation();
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [capturedImage, setCapturedImage] = useState(null);
  const [modalChip, setModalChip] = useState(false);
  const [showModalCamera, setShowModalCamera] = useState(false);
  const [trangThaiGhiId, setTrangThaiGhiId] = useState();
  const [rfIdDongHo, setRFIdDongHo] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const { data: dataUpDateGCS, loading: loadingUpdateGCS } = useSelector(
    (state) => state.updateGhiChiSo
  );
  const { data: dataCSDongHo, loading: loadingCSDongHo } = useSelector(
    (state) => state.chiSoDongHo
  );

  const { error: errorAddChip } = useSelector((state) => state.addChipDongHo);
  const dispatch = useDispatch();

  const toast = useToast();
  const handleUpdateGhiChiSo = async () => {
    const formData = new FormData();
    const imageSource =
      capturedImage || (updateGhiChiSo && updateGhiChiSo.imageUrl);

    formData.append("ChiSoDongHoId", selectedItemId);
    formData.append("RequestBody.ChiSoMoi", inputValue);
    formData.append("RequestBody.GhiChu", "");
    formData.append("RequestBody.ImageUrl", imageSource || "");
    formData.append("RequestBody.TrangThaiGhiId", trangThaiGhiId);

    try {
      if (!imageSource) {
        ToastAndroid.show("Bạn phải chọn ảnh!", ToastAndroid.LONG);
        return;
      }

      console.log("Formdata:", formData);
      const result = await dispatch(fecthUpdateGhiChiSo({ formData }));

      if (fecthUpdateGhiChiSo.fulfilled.match(result)) {
        const { payload } = result;
        if (payload.statusCode === 500) {
          ToastAndroid.show(
            "Sổ đọc đã bị khoá, không thể ghi chỉ số!",
            ToastAndroid.LONG
          );
        } else if (payload.statusCode === 200) {
          ToastAndroid.show("Cập nhật thành công!", ToastAndroid.LONG);
          setUpdateSuccess(payload.data);
        }
      } else {
        ToastAndroid.show("Cập nhật thất bại!", ToastAndroid.LONG);
      }
    } catch (error) {
      console.error("Error in fecthUpdateGhiChiSo1:", error);
    }
  };
  useEffect(() => {
    const selectedItem = dataCSDongHo?.find(
      (item) => item.id === selectedItemId
    );
    const selectedResponseId = selectedItem?.responseTrangThaiGhiModel.id;

    console.log("Trang Thai", selectedResponseId);
    setTrangThaiGhiId(selectedResponseId);
  }, [selectedItemId]);

  const handleTrangThaiID = (itemValue) => {
    console.log("Trang Thai ID:", itemValue);
    setTrangThaiGhiId(itemValue);
  };

  const getInvoiceChuaTTByMaKH = (maKhachHang) => {
    dispatch(getInvoiceChuaThanhToanByIdKH(maKhachHang))
    navigator.navigate('DebtInvoice', { itemId: itemId, trangThaiGhi: trangThaiGhi })
  };

  const handleOpenAddChip = async () => {
    const userId = await getTokenFromStorage();
    console.log("User id", userId);
    setSelectedUserId(userId);
    setModalChip(true);
  };
  const handleNfcScan = async () => {
    try {
      const tag = await NfcProxy.readTag();
      if (tag) {
        setRFIdDongHo(tag.id);
        console.log("RFID: ", tag.id);
        handleAddChipDongHo(tag.id);
      } else {
        console.log("Thẻ không hợp lệ");
      }
    } catch (error) {
      console.error("Error while scanning RFID:", error);
    }
  };

  // useEffect to trigger RFID scan when the modal is opened

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (modalChip === true && !isFirstRender.current) {
      console.log("Render Check Detail Modal");
      handleNfcScan();
    } else {
      isFirstRender.current = false;
    }
  }, [modalChip]);
  const handleAddChipDongHo = async (rfID) => {
    const filterParam = {
      dongHoId: idDongHo,
      chipDongHoId: rfID,
      userId: selectedUserId,
    };
    try {
      console.log("filterparam:", filterParam);
      const result = await dispatch(fetchAddChipDongHo({ filterParam }));
      if (fetchAddChipDongHo.fulfilled.match(result)) {
        if (result.payload.statusCode === 403) {
          ToastAndroid.show(
            "RFID này đã tồn tại! Vui lòng thử lại.",
            ToastAndroid.LONG
          );
          handleNfcScan();
        } else if (result.payload.statusCode === 200) {
          ToastAndroid.show("Thêm RFID thành công!", ToastAndroid.LONG);
          setModalChip(false);
        }
      } else {
        ToastAndroid.show("Thêm RFID không thành công!", ToastAndroid.LONG);
        handleNfcScan();
      }
    } catch (error) {
      console.error("Error in handleAddChipDongHo:", error);
    }
  };

  const getTokenFromStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId;
    } catch (error) {
      console.error("Error UserID:", error);
      throw error;
    }
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false),
          setUpdateGhiChiSo(),
          setItemId(""),
          setUpdateSuccess(null);
      }}
      size={"xl"}
    >
      <Modal.Content minWidth="350" minH="500">
        <Modal.CloseButton />
        <Center w="350">
          <VStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          ></VStack>
        </Center>
        <Modal.Header>{updateGhiChiSo?.tenKhachHang}</Modal.Header>
        <>
          <Skeleton.Text
            px="4"
            my="4"
            rounded="md"
            isLoaded={loadingSoDocDetail}
          >
            {updateGhiChiSo && (
              <Modal.Body>
                <HStack>
                  <Select
                    fontFamily="Quicksand_700Bold"
                    defaultValue={trangThaiGhiId}
                    selectedValue={trangThaiGhiId}
                    minHeight={30}
                    minWidth="50%"
                    bg="steal.600"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    _light={{
                      bg: "coolGray.100",
                      _hover: {
                        bg: "coolGray.200",
                      },
                      _focus: {
                        bg: "coolGray.200:alpha.70",
                      },
                    }}
                    _dark={{
                      bg: "coolGray.800",
                      _hover: {
                        bg: "coolGray.900",
                      },
                      _focus: {
                        bg: "coolGray.900:alpha.70",
                      },
                    }}
                    mt={1}
                    onValueChange={handleTrangThaiID}
                  >
                    {trangThaiGhi?.map((item) => (
                      <Select.Item
                        key={item.id}
                        label={item.tenTrangThai}
                        value={item.id}
                        color="green.500"
                        fontFamily={"Quicksand_700Bold"}
                      />
                    ))}
                  </Select>
                  <Button
                    marginLeft={8}
                    minHeight={5}
                    minWidth={8}
                    padding={0}
                    onPress={handleUpdateGhiChiSo}
                    isLoading={loadingUpdateGCS === "pending"}
                    backgroundColor={"#4B94E3"}
                  >
                    <Ionicons
                      color={"white"}
                      name={"save-outline"}
                      size={18}
                      style={styles.icon}
                    />
                  </Button>
                  {updateGhiChiSo?.responseDongHoNuocModel?.chipDongHoNuocId ===
                    null ? (
                    <Button
                      marginLeft={8}
                      minHeight={5}
                      minWidth={8}
                      padding={0}
                      onPress={handleOpenAddChip}
                      backgroundColor={"#4B94E3"}
                    >
                      <Ionicons
                        color={"white"}
                        name={"add-circle"}
                        size={18}
                        style={styles.icon}
                      />
                    </Button>
                  ) : null}
                </HStack>
                <HStack h={10} mt={10}>
                  <Box
                    borderTopWidth={1}
                    borderBottomWidth={1}
                    backgroundColor={"gray.400"}
                    borderColor="muted.200"
                    w={100}
                    py="1"
                  >
                    <Text
                      textAlign={"center"}
                      color={"gray.500"}
                      fontSize={20}
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      Tháng{" "}
                      {parseInt(
                        updateGhiChiSo.thangTaoSoDoc?.split("/")[0],
                        10
                      ) -
                        2 ===
                        -1
                        ? 11
                        : parseInt(
                          updateGhiChiSo.thangTaoSoDoc?.split("/")[0],
                          10
                        ) - 2}
                    </Text>
                  </Box>
                  <Box
                    borderTopWidth={1}
                    borderBottomWidth={1}
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Text
                      textAlign={"center"}
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {updateGhiChiSo.chiSoMoi2ThangTruoc}
                    </Text>
                  </Box>

                  <Box
                    borderTopWidth={1}
                    borderBottomWidth={1}
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Text
                      textAlign={"center"}
                      fontSize={20}
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {updateGhiChiSo.tthu2ThangTruoc}
                    </Text>
                  </Box>
                  <Box
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Pressable onPress={() => setShowImage(true)}>
                      <Box>
                        <Feather name="eye" size={20} color="black" />
                      </Box>
                    </Pressable>
                  </Box>
                </HStack>
                <HStack h={10}>
                  <Box
                    borderBottomWidth={1}
                    backgroundColor={"gray.400"}
                    borderColor="muted.200"
                    w={100}
                    py="1"
                  >
                    <Text
                      textAlign={"center"}
                      color={"gray.500"}
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      Tháng{" "}
                      {parseInt(
                        updateGhiChiSo.thangTaoSoDoc?.split("/")[0],
                        10
                      ) -
                        1 ===
                        0
                        ? 12
                        : parseInt(
                          updateGhiChiSo.thangTaoSoDoc?.split("/")[0],
                          10
                        ) - 1}
                    </Text>
                  </Box>
                  <Box
                    borderTopWitdth={1}
                    borderBottomWidth={1}
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {updateGhiChiSo.chiSoMoiThangTruoc}
                    </Text>
                  </Box>
                  <Box
                    borderTopWitdth={1}
                    borderBottomWidth={1}
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {updateGhiChiSo.tthuThangTruoc}
                    </Text>
                  </Box>
                  <Box
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Pressable onPress={() => setShowImage2(true)}>
                      <Box>
                        <Feather name="eye" size={20} color="black" />
                      </Box>
                    </Pressable>
                  </Box>
                </HStack>
                <HStack h={10}>
                  <Box
                    borderBottomWidth={1}
                    backgroundColor={"gray.400"}
                    borderColor="muted.200"
                    w={100}
                    py="1"
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      Tháng{" "}
                      {parseInt(
                        updateGhiChiSo.thangTaoSoDoc?.split("/")[0],
                        10
                      )}
                    </Text>
                  </Box>
                  <Box
                    borderTopWitdth={1}
                    borderBottomWidth={1}
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {updateSuccess
                        ? updateSuccess.chiSoMoi
                        : updateGhiChiSo
                          ? updateGhiChiSo.chiSoMoi
                          : "..."}
                    </Text>
                  </Box>
                  <Box
                    borderTopWitdth={1}
                    borderBottomWidth={1}
                    borderColor="muted.200"
                    w={100}
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="1"
                  >
                    <Text
                      style={{
                        fontFamily: "Quicksand_500Medium",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "700",
                      }}
                    >
                      {updateSuccess
                        ? updateSuccess.tthu
                        : updateGhiChiSo && updateGhiChiSo?.chiSoMoi > 0
                          ? updateGhiChiSo?.tthu
                          : "..."}
                    </Text>
                  </Box>
                </HStack>
                <Center width={"100%"} marginTop={5}>
                  <Box
                    borderWidth={1}
                    width="90%"
                    padding={5}
                    borderRadius={10}
                    borderColor={"#f0f0f0"}
                  >
                    <VStack space={4}>
                      <HStack space={2}>
                        <Input
                          flex={1}
                          onChangeText={(v) => setInputValue(v)}
                          value={inputValue}
                          placeholder="Thêm chỉ số"
                          fontWeight={700}
                          fontSize={25}
                          textAlign={"center"}
                          keyboardType="numeric"
                          style={{ fontFamily: "Quicksand_500Medium" }}
                        />
                      </HStack>
                    </VStack>
                  </Box>
                </Center>
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Mục đích sử dụng
                </Text>
                <Input
                  ml={3}
                  mt={5}
                  variant="outline"
                  isDisabled
                  value={updateGhiChiSo.mucDichSuDung}
                  style={{ fontFamily: "Quicksand_500Medium" }}
                />
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Hình ảnh
                </Text>
                <CameraCustom
                  updateGhiChiSo={updateGhiChiSo}
                  showModalCamera={showModalCamera}
                  setShowModalCamera={setShowModalCamera}
                  capturedImage={capturedImage}
                  setCapturedImage={setCapturedImage}
                />
                {/*<ImagePickerCustom />*/}
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Hóa đơn chưa thanh toán (
                  {updateGhiChiSo.hoaDonChuaThanhToan?.length})
                </Text>
                {updateGhiChiSo?.hoaDonChuaThanhToan?.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                      getInvoiceChuaTTByMaKH(
                        updateGhiChiSo.maKhachHang
                      );
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      backgroundColor: "lightcyan",
                      paddingVertical: 10,
                      borderRadius: 5,
                    }}
                  >
                    <FontAwesome5 name="file-invoice" size={18} color="#1677ff" />
                    <Text
                      style={{
                        color: "#1677ff",
                        fontFamily: "Quicksand_700Bold",
                        marginLeft: 8,
                      }}
                    >
                      Xem hóa đơn
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  RFID
                </Text>
                <Input
                  ml={3}
                  mt={5}
                  variant="outline"
                  value={
                    updateGhiChiSo?.responseDongHoNuocModel?.chipDongHoNuocId
                  }
                  isDisabled
                  style={{ fontFamily: "Quicksand_500Medium" }}
                />
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Số hiệu đồng hồ
                </Text>
                <Input
                  ml={3}
                  mt={5}
                  variant="outline"
                  isDisabled
                  style={{ fontFamily: "Quicksand_500Medium" }}
                />
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Số điện thoại
                </Text>
                <Input
                  ml={3}
                  mt={5}
                  variant="outline"
                  value={updateGhiChiSo.dienThoai}
                  style={{ fontFamily: "Quicksand_500Medium" }}
                  isDisabled
                />
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Loại đồng hồ
                </Text>
                <Input
                  ml={3}
                  mt={5}
                  variant="outline"
                  style={{ fontFamily: "Quicksand_500Medium" }}
                  value={
                    updateGhiChiSo.responseDongHoNuocModel?.loaiDongHo === 3
                      ? "Đồng Hồ Hộ Dân"
                      : updateGhiChiSo.responseDongHoNuocModel?.loaiDongHo === 2
                        ? "Đồng hồ Block"
                        : "Đồng hồ Tổng"
                  }
                  isDisabled
                />
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Mã vạch
                </Text>
                <Input
                  ml={3}
                  mt={5}
                  variant="outline"
                  value={updateGhiChiSo.responseHopDongModel.maVach}
                  isDisabled
                />
                <Divider mt={5} mb={5} />
                <Text
                  ml={3}
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Ghi chú
                </Text>
                <Input ml={3} mt={5} variant="outline" />
              </Modal.Body>
            )}
          </Skeleton.Text>
        </>
      </Modal.Content>
      {modalChip === true ? (
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
      ) : null}

      {updateGhiChiSo?.image1ThangTruoc !== null && (
        <Modal
          isOpen={showImage2}
          onClose={() => setShowImage2(false)}
          size="lg"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Box flex={1} justifyContent="center" alignItems="center">
              <Image
                w="150"
                h="150"
                source={{
                  uri: updateGhiChiSo?.image1ThangTruoc,
                }}
                alt="image"
              />
            </Box>
          </Modal.Content>
        </Modal>
      )}
      {updateGhiChiSo?.image2ThangTruoc !== null && (
        <Modal isOpen={showImage} onClose={() => setShowImage(false)} size="lg">
          <Modal.Content>
            <Modal.CloseButton />
            <Box flex={1} justifyContent="center" alignItems="center">
              <Image
                w="150"
                h="150"
                source={{
                  uri: updateGhiChiSo?.image2ThangTruoc,
                }}
                alt="image"
              />
            </Box>
          </Modal.Content>
        </Modal>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.danger,
  },
  buttonTextContainer: {
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 16,
  },
});
export default WriteIndexDetailModal;
