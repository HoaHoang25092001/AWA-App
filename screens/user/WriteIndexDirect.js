import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Divider,
  HStack,
  Image,
  Input,
  Modal,
  ScrollView,
  Select,
  Skeleton,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { fetchChiSoDongHoByChip } from "../../store/ChiSoDongHoByChip/action";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Pressable } from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import CameraCustom from "../../components/CameraCustom/CameraCustom";
import { fetchTrangThaiGhi } from "../../store/TrangThaiGhi/action";
import { fecthUpdateGhiChiSo } from "../../store/UpdateGhiChiSo/action";

const WriteIndexDirect = () => {
  const route = useRoute();
  const { idChipDongHo } = route.params;
  const dispatch = useDispatch();
  const { data: chiSoDongHoByChip, loading } = useSelector(
    (state) => state.chiSoDongHoByChip
  );
  const [dataCSDHByChip, setDataCSDHByChip] = useState();
  const navigation = useNavigation();
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModalCamera, setShowModalCamera] = useState(false);
  const [trangThaiGhiId, setTrangThaiGhiId] = useState();
  const [rfIdDongHo, setRFIdDongHo] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [trangThaiGhi, setTrangThaiGhi] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState();
  const { data: dataUpDateGCS, loading: loadingUpdateGCS } = useSelector(
    (state) => state.updateGhiChiSo
  );
  const { data: dataCSDongHo, loading: loadingCSDongHo } = useSelector(
    (state) => state.chiSoDongHo
  );
  useEffect(() => {
    const thangTaoSoDoc = moment().format("MM/YYYY");
    console.log("Tháng tạo sổ:", thangTaoSoDoc);
    console.log("Chip ID:", idChipDongHo);
    dispatch(fetchChiSoDongHoByChip({ idChipDongHo, thangTaoSoDoc }))
      .then((responseData) => {
        // Xử lý dữ liệu sau khi nhận được từ fetchChiSoDongHoByChip
        console.log("Data:", responseData.payload);
        console.log("Data2:", chiSoDongHoByChip);
        if (responseData.payload) {
          setDataCSDHByChip(responseData.payload);
          setUpdateSuccess(responseData.payload);
        } else {
          console.log("Không có dữ liệu");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error1:", error);
      });
  }, [idChipDongHo]);
  useEffect(() => {
    const selectedItem = dataCSDongHo?.find(
      (item) => item.id === chiSoDongHoByChip.id
    );
    const selectedResponseId = selectedItem?.responseTrangThaiGhiModel.id;

    console.log("Trang Thai", selectedResponseId);
    setTrangThaiGhiId(selectedResponseId);
  }, [chiSoDongHoByChip]);
  const handleTrangThaiID = (itemValue) => {
    console.log("Trang Thai ID:", itemValue);
    setTrangThaiGhiId(itemValue);
  };
  useEffect(() => {
    dispatch(fetchTrangThaiGhi()).then((result) => {
      if (result.payload) {
        console.log("Data Trang Thai ghi returned:", result.payload);
        const data = result.payload;
        setTrangThaiGhi(data);
      } else {
        console.log("No Trang Thai ghi returned");
      }
    });
  }, []);

  const handlechiSoDongHoByChip = async () => {
    const formData = new FormData();
    const imageSource =
      capturedImage || (chiSoDongHoByChip && chiSoDongHoByChip.imageUrl);

    formData.append("ChiSoDongHoId", chiSoDongHoByChip.id);
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
      console.error("Error in fecthUpdateGhiChiSo Direct:", error);
    }
  };

  if (loading === "pending") {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (chiSoDongHoByChip?.error) {
    return (
      <View>
        <Text>Error: {chiSoDongHoByChip?.error}</Text>
      </View>
    );
  }

  if (chiSoDongHoByChip === null) {
    return (
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginVertical: 15,
          }}
        >
          <View
            style={{
              paddingLeft: 15,
            }}
          >
            <HStack>
              <TouchableOpacity
                onPress={() => navigation.goBack("ScanNFCScreen")}
              >
                <Ionicons name="chevron-back-outline" size={26} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  fontFamily: "Quicksand_700Bold",
                  paddingLeft: 16,
                  paddingTop: 5,
                  textAlign: "center",
                }}
              >
                Sổ đọc chỉ số
              </Text>
            </HStack>
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            justifyContent: "center",
            fontFamily: "Quicksand_700Bold",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          RFID không tồn tại
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginVertical: 15,
        }}
      >
        <View
          style={{
            paddingLeft: 15,
          }}
        >
          <HStack>
            <TouchableOpacity
              onPress={() => navigation.goBack("ScanNFCScreen")}
            >
              <Ionicons name="chevron-back-outline" size={26} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                fontFamily: "Quicksand_700Bold",
                paddingLeft: 16,
                paddingTop: 5,
                textAlign: "center",
              }}
            >
              Sổ đọc chỉ số
            </Text>
          </HStack>
        </View>
      </View>
      <ScrollView>
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
        <>
          <Skeleton.Text px="4" my="4" rounded="md" isLoaded={loading}>
            {chiSoDongHoByChip && (
              <View mb="20">
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
                    onPress={handlechiSoDongHoByChip}
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

                  {chiSoDongHoByChip?.responseDongHoNuocModel
                    ?.chipDongHoNuocId === null ? (
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
                <Center>
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
                          chiSoDongHoByChip?.thangTaoSoDoc?.split("/")[0],
                          10
                        ) -
                          2 ===
                        -1
                          ? 11
                          : parseInt(
                              chiSoDongHoByChip?.thangTaoSoDoc?.split("/")[0],
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
                        {chiSoDongHoByChip?.chiSoMoi2ThangTruoc}
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
                        {chiSoDongHoByChip?.tthu2ThangTruoc}
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
                          chiSoDongHoByChip?.thangTaoSoDoc?.split("/")[0],
                          10
                        ) -
                          1 ===
                        0
                          ? 12
                          : parseInt(
                              chiSoDongHoByChip?.thangTaoSoDoc?.split("/")[0],
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
                        {chiSoDongHoByChip?.chiSoMoiThangTruoc}
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
                        {chiSoDongHoByChip?.tthuThangTruoc}
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
                          chiSoDongHoByChip.thangTaoSoDoc?.split("/")[0],
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
                          : chiSoDongHoByChip
                          ? chiSoDongHoByChip.chiSoMoi
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
                          : chiSoDongHoByChip && chiSoDongHoByChip?.chiSoMoi > 0
                          ? chiSoDongHoByChip?.tthu
                          : "..."}
                      </Text>
                    </Box>
                    <Box
                      borderColor="muted.200"
                      w={100}
                      pl={["5", "4"]}
                      pr={["5", "5"]}
                      py="1"
                    >
                      <View></View>
                    </Box>
                  </HStack>
                </Center>
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
                  value={chiSoDongHoByChip?.mucDichSuDung}
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
                  chiSoDongHoByChip={chiSoDongHoByChip}
                  showModalCamera={showModalCamera}
                  setShowModalCamera={setShowModalCamera}
                  capturedImage={capturedImage}
                  setCapturedImage={setCapturedImage}
                />
                {/*} <ImagePickerCustom />*/}
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
                  {chiSoDongHoByChip?.hoaDonChuaThanhToan?.length})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowInvoiceDetailsModal(true);
                    getInvoiceInformationById(
                      chiSoDongHoByChip?.hoaDonChuaThanhToan.id
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
                    chiSoDongHoByChip?.responseDongHoNuocModel?.chipDongHoNuocId
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
                  value={chiSoDongHoByChip?.keyId}
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
                    chiSoDongHoByChip?.responseDongHoNuocModel?.loaiDongHo === 3
                      ? "Đồng Hồ Hộ Dân"
                      : chiSoDongHoByChip?.responseDongHoNuocModel
                          ?.loaiDongHo === 2
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
                  value={chiSoDongHoByChip?.responseHopDongModel?.maVach}
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
              </View>
            )}
          </Skeleton.Text>
        </>

        {chiSoDongHoByChip?.image1ThangTruoc !== null && (
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
                    uri: chiSoDongHoByChip?.image1ThangTruoc,
                  }}
                  alt="image"
                />
              </Box>
            </Modal.Content>
          </Modal>
        )}
        {chiSoDongHoByChip?.image2ThangTruoc !== null && (
          <Modal
            isOpen={showImage}
            onClose={() => setShowImage(false)}
            size="lg"
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Box flex={1} justifyContent="center" alignItems="center">
                <Image
                  w="150"
                  h="150"
                  source={{
                    uri: chiSoDongHoByChip?.image2ThangTruoc,
                  }}
                  alt="image"
                />
              </Box>
            </Modal.Content>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
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
export default WriteIndexDirect;
