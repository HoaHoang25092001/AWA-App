import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native"; // Import useRoute
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckIcon,
  Divider,
  FlatList,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ScrollView,
  Select,
  Skeleton,
  Spacer,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CameraCustom from "../../components/CameraCustom/CameraCustom";
import { fetchChiSoDongHoByIdSoDoc } from "../../store/ChiSoDongHo/action";
import moment from "moment";
import { RefreshControl } from "react-native";
import { fetchTrangThaiGhi } from "../../store/TrangThaiGhi/action";
import { fecthUpdateGhiChiSo } from "../../store/UpdateGhiChiSo/action";
import { fetchChiSoDongHoById } from "../../store/ChiSoDongHoById/action";
import { getInvoiceById } from "../../store/HoaDon/asyncAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAddChipDongHo } from "../../store/AddChipDongHo/action";
import WriteIndexDetailModal from "../../components/CustomModel/WriteIndexDetailModal";
import YearMonthPicker from "../../components/PickYearMonth/PickYearMonth";
import * as apis from "../../api";

const WriteIndexDetail = ({ navigation }) => {
  const route = useRoute();
  const { itemId, trangThaiGhi } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [showSearchModel, setShowSearchModel] = useState(false);
  const [inputTenSoDoc, setInputTenSoDoc] = useState("");
  const [inputSDT, setInputSDT] = useState("");
  const [inputTT, setInputTT] = useState("");
  const [inputThang, setInputThang] = useState("");
  const [inputSoDocId, setInputSoDocId] = useState("");
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [trangThaiGhiSoDoc, setTrangThaiGhiSoDoc] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("MM-YYYY");

  const [dataChiSoDongHo, setDataChiSoDongHo] = useState(false);

  const [updateGhiChiSo, setUpdateGhiChiSo] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState();
  const [loadingSoDocDetail, setLoadingSoDocDetail] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [statusTT, setStatusTT] = useState(false);

  const [idDongHo, setIdDongHo] = useState();

  const { data: dataCSDongHo, loading: loadingCSDongHo } = useSelector(
    (state) => state.chiSoDongHo
  );
  const { data: dataUpDateGCS, loading: loadingUpdateGCS } = useSelector(
    (state) => state.updateGhiChiSo
  );

  const [inputValue, setInputValue] = React.useState("");
  const [selectedItemId, setItemId] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toast = useToast();

  const handleCamera = () => {
    setShowModalCamera(true);
  };

  const handleChangeTenSoDoc = (text) => {
    setInputTenSoDoc(text);
  };

  const handleChangeSDT = (text) => {
    setInputSDT(text);
  };

  const handleChangeSoDocId = (text) => {
    setInputSoDocId(text);
  };

  const searchSoDoc = async () => {
    try {
      const response = await apis.apiFilterSoDocChiSoChiTiet(
        inputTenSoDoc,
        inputSDT,
        inputTT,
        moment(selectedMonth).format("MM/YYYY"),
        inputSoDocId,
        currentPage
      );
      console.log("Filterd", response?.data);

      if (response?.statusCode == 201 || response?.statusCode == 200) {
        console.log("Thành công");
        setDataChiSoDongHo(response.data.items);
      }
    } catch (error) {
      // Handle errors here
      console.log("Thát bại");
      console.error("Error:", error);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Id Item", itemId);
    dispatch(
      fetchChiSoDongHoByIdSoDoc({
        itemId,
      })
    ).then((result) => {
      if (result.payload) {
        const data = result.payload;
        setDataChiSoDongHo(data);
      } else {
        console.log("No data returned");
      }
    });
    // dispatch(fetchTrangThaiGhi()).then((result) => {
    //   if (result.payload) {
    //     console.log("Data Trang Thai ghi returned:", result.payload);
    //     const data = result.payload;
    //     setTrangThaiGhi(data);
    //   } else {
    //     console.log("No Trang Thai ghi returned");
    //   }
    // });
  }, [itemId, trangThaiGhiSoDoc]);
  useEffect(() => {
    console.log("Id selectedItemId", selectedItemId);
    setLoadingSoDocDetail(false);
    dispatch(
      fetchChiSoDongHoById({
        selectedItemId,
      })
    ).then((result) => {
      if (result.payload) {
        const data = result.payload;
        console.log("Update data:", data);
        setUpdateGhiChiSo(data);
        setLoadingSoDocDetail(true);
      } else {
        console.log("No data returned1");
      }
    });
  }, [selectedItemId]);

  const onRefresh = React.useCallback(() => {
    console.log("Id Item", itemId);
    dispatch(
      fetchChiSoDongHoByIdSoDoc({
        itemId,
      })
    ).then((result) => {
      if (result.payload) {
        const data = result.payload;
        setDataChiSoDongHo(data);
      } else {
        console.log("No data returned");
      }
    });
  });

  const renderItem = ({ item }) => (
    <Box
      key={item.id}
      style={{ borderRadius: 5, shadowOpacity: 0.1, elevation: 5 }}
      backgroundColor="white"
      mt={2}
      mb={2}
      mr={4}
      ml={4}
      pl={["5", "4"]}
      pr={["5", "4"]}
      py="2"
    >
      <TouchableOpacity
        onPress={() => {
          setItemId(item.id);
          setIdDongHo(item.dongHoNuocId);
          setShowModal(true);
          setInputValue("");
        }}
      >
        <VStack space={3}>
          <Skeleton h="20" isLoaded={loadingCSDongHo === "fulfilled"} />
          <Skeleton.Text
            lines={5}
            px="4"
            isLoaded={loadingCSDongHo === "fulfilled"}
          >
            <Text color="coolGray.800" bold>
              Tên: {item.tenKhachHang} - {item.maKhachHang} - {item.diaChi}
            </Text>

            <HStack justifyContent="space-between">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                CS Đầu Cũ:{item.chiSoDauCu}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                CS Cuối Cũ: {item.chiSoCuoiCu}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                CS Cũ:{item.chiSoCu}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                CS Mới: {item.chiSoMoi}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Tiêu thụ: {item.tthu}
              </Text>

              {item.responseTrangThaiGhiModel.tenTrangThai === "Đã ghi" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"green"}
                  size={30}
                  style={styles.icon}
                />
              ) : item.responseTrangThaiGhiModel.tenTrangThai === "Chưa ghi" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"red"}
                  size={30}
                  style={styles.icon}
                />
              ) : item.responseTrangThaiGhiModel.tenTrangThai === "Vắng chủ" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"#704B10"}
                  size={30}
                  style={styles.icon}
                />
              ) : item.responseTrangThaiGhiModel.tenTrangThai === "Tạm thu" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"#1891C9"}
                  size={30}
                  style={styles.icon}
                />
              ) : item.responseTrangThaiGhiModel.tenTrangThai === "ĐH cắt" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"#DA0796"}
                  size={30}
                  style={styles.icon}
                />
              ) : item.responseTrangThaiGhiModel.tenTrangThai ===
                "ĐH không sử dụng" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"#B3B3B3"}
                  size={30}
                  style={styles.icon}
                />
              ) : item.responseTrangThaiGhiModel.tenTrangThai ===
                "Tạm ngừng" ? (
                <Ionicons
                  name={"checkmark-circle"}
                  color={"#242424"}
                  size={30}
                  style={styles.icon}
                />
              ) : null}
            </HStack>
            <HStack justifyContent="space-between">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Cập nhật ngày: {moment(item.ngayDoc).format("DD/MM/YYYY")}
              </Text>
              <TouchableOpacity onPress={() => console.log(item.id)}>
                <Ionicons
                  name={"location-sharp"}
                  color={"orange"}
                  size={30}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </HStack>
          </Skeleton.Text>
        </VStack>
      </TouchableOpacity>
    </Box>
  );

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginVertical: 15,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            paddingLeft: 15,
          }}
        >
          <HStack>
            <TouchableOpacity onPress={() => navigation.goBack("WriteIndex")}>
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
              Chi tiết
            </Text>
          </HStack>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            style={{
              width: "65%",
              borderRadius: 50,
              flexDirection: "row",
              backgroundColor: "white",
              alignItems: "center",
              borderWidth: 1,
              borderColor: '#1677ff',
              justifyContent: "space-between",
              // For iOS
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              // For Android
              elevation: 5,
            }}
            onPress={() => {
              setShowSearchModel(true);
            }}
          >
            <Text
              style={{
                color: "#c0c0c0",
                fontFamily: "Quicksand_500Medium",
                paddingLeft: 12,
              }}
            >
              Tìm kiếm
            </Text>
            <Ionicons name="search-circle-sharp" size={32} color="#1677ff" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          h={"90%"}
          data={dataChiSoDongHo}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9Bd35A", "#689F38"]}
            />
          }
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="md-information-circle" size={60} color="black" />
              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                Không tìm thấy dữ liệu
              </Text>
            </View>
          )}
        />
        {/* <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />*/}
      </View>
      {showModal === true ? (
        <WriteIndexDetailModal
          showModal={showModal}
          trangThaiGhi={trangThaiGhi}
          loadingSoDocDetail={loadingSoDocDetail}
          updateGhiChiSo={updateGhiChiSo}
          setUpdateSuccess={setUpdateSuccess}
          setUpdateGhiChiSo={setUpdateGhiChiSo}
          idDongHo={idDongHo}
          inputValue={inputValue}
          selectedItemId={selectedItemId}
          updateSuccess={updateSuccess}
          setInputValue={setInputValue}
          setShowModal={setShowModal}
          setItemId={setItemId}
          itemId={itemId}
          setTrangThaiGhiSoDoc={setTrangThaiGhiSoDoc}
          trangThaiGhiSoDoc={trangThaiGhiSoDoc}
        />
      ) : null}
      {/*---------------Search Modal--------------------*/}
      <Modal
        isOpen={showSearchModel}
        onClose={() => setShowSearchModel(false)}
        size="xl"
      >
        <Modal.Content maxWidth="100%" maxH="600">
          <Modal.CloseButton />
          <Modal.Header>
            <Text
              style={{
                fontFamily: "Quicksand_700Bold",
                color: "black",
                fontSize: 14,
              }}
            >
              Tìm kiếm
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Box alignItems="center" w="100%">
              <Box w="90%" maxW="400">
                <VStack space="md">
                  <Text
                    style={{
                      fontFamily: "Quicksand_500Medium",
                    }}
                  >
                    Tên sổ:
                  </Text>
                  <Box maxW="100%" alignItems="center">
                    <Input
                      variant="outline"
                      size="md"
                      color="blue.500"
                      focusOutlineColor={"blue.200"}
                      onChangeText={handleChangeTenSoDoc}
                      value={inputTenSoDoc}
                      placeholder="Nhập tên sổ đọc"
                      style={{ fontFamily: "Quicksand_500Medium" }}
                      _light={{
                        bg: "light.50",
                        _hover: {
                          bg: "muted.100",
                        },
                        _focus: {
                          bg: "muted.100",
                        },
                      }}
                    />
                  </Box>
                  <Text
                    style={{
                      fontFamily: "Quicksand_500Medium",
                    }}
                  >
                    SĐT khách hàng:
                  </Text>
                  <Box maxW="100%" alignItems="center">
                    <Input
                      variant="outline"
                      size="md"
                      color="blue.500"
                      focusOutlineColor={"blue.200"}
                      onChangeText={handleChangeSDT}
                      value={inputSDT}
                      placeholder="Nhập tên sổ đọc"
                      style={{ fontFamily: "Quicksand_500Medium" }}
                      _light={{
                        bg: "light.50",
                        _hover: {
                          bg: "muted.100",
                        },
                        _focus: {
                          bg: "muted.100",
                        },
                      }}
                    />
                  </Box>

                  <Text fontFamily="Quicksand_500Medium">Trạng thái sổ đọc:</Text>
                  <Box maxW="100%">
                    <Select
                      fontFamily="Quicksand_500Medium"
                      selectedValue={inputTT}
                      minWidth="150"
                      accessibilityLabel="--Chọn trạng thái sổ đọc--"
                      placeholder="--Chọn trạng thái sổ đọc--"
                      fontSize={14}
                      _selectedItem={{
                        bg: "darkBlue.50",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={0}
                      pt={0}
                      onValueChange={(itemValue) => setInputTT(itemValue)}
                    >
                      <Select.Item
                        fontFamily="Quicksand_500Medium"
                        label="2"
                        value="2"
                      />
                      <Select.Item
                        fontFamily="Quicksand_500Medium"
                        label="1"
                        value="1"
                      />
                    </Select>
                  </Box>

                  <Text
                    style={{
                      fontFamily: "Quicksand_500Medium",
                    }}
                  >
                    Sổ đọc chỉ số ID:
                  </Text>
                  <Box maxW="100%" alignItems="center">
                    <Input
                      variant="outline"
                      size="md"
                      color="blue.500"
                      focusOutlineColor={"blue.200"}
                      onChangeText={handleChangeSoDocId}
                      value={inputSoDocId}
                      placeholder="Nhập ID sổ đọc"
                      style={{ fontFamily: "Quicksand_500Medium" }}
                      _light={{
                        bg: "light.50",
                        _hover: {
                          bg: "muted.100",
                        },
                        _focus: {
                          bg: "muted.100",
                        },
                      }}
                    />
                  </Box>

                  <Text fontFamily="Quicksand_500Medium">Tháng:</Text>
                  <Button
                    variant="outline"
                    size="md"
                    colorScheme={"gray"}
                    onPress={() => setShowDatePickerModal(true)}
                  >
                    {moment(selectedMonth).format("MM/YYYY")}
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: "#1677ff",
                borderRadius: 8,
                alignItems: "center",
                marginRight: 5,
              }}
            onPress={() => {
              setInputSDT('');
              setInputTenSoDoc('');
              setInputTT('');
              setInputSoDocId('');
              onRefresh();
              setShowSearchModel(false);
            }}
            >
              <AntDesign name="reload1" size={16} color="white" />
              <Text
                style={{
                  fontFamily: "Quicksand_500Medium",
                  color: "white",
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                Làm mới
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: "#1677ff",
                borderRadius: 5,
                alignItems: "center",
                marginRight: 5,
              }}
              onPress={() => {
                searchSoDoc();
                setShowSearchModel(false);
              }}
            >
              <AntDesign name="search1" size={16} color="white" />
              <Text
                style={{
                  fontFamily: "Quicksand_500Medium",
                  color: "white",
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                Tìm kiếm
              </Text>
            </TouchableOpacity>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/**MonthPicker */}
      <Modal
        isOpen={showDatePickerModal}
        onClose={() => setShowDatePickerModal(false)}
        size="xl"
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="100%" maxH="600">
          <Modal.CloseButton />
          <Modal.Header>Chọn tháng</Modal.Header>
          <Modal.Body>
            <YearMonthPicker
              selectedThangTaoSo={selectedMonth}
              setSelectedThangTaoSo={setSelectedMonth}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowDatePickerModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowDatePickerModal(false);
                  // Set the selectedDate value to the input when Save is pressed
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
});

export default WriteIndexDetail;
