import Pagination from "@cherry-soft/react-native-basic-pagination";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  Avatar,
  Box,
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Input,
  Modal,
  Select,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants";
import { useService } from "../../ServiceContext";
import { fetchSoDocChiSoByNhaMayId } from "../../store/SoDocChiSoTheoNM/action";
import { fetchTrangThaiGhi } from "../../store/TrangThaiGhi/action";

const WriteIndex = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigator = useNavigation();
  const { service, setService } = useService([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { loading } = useSelector((state) => state.soDocChiSo);
  const [trangThaiGhi, setTrangThaiGhi] = useState([]);
  const [showSearchModel, setShowSearchModel] = useState(false);
  const [inputTenSoDoc, setInputTenSoDoc] = useState("");
  const [trangThaiSoDoc, setTrangThaiSoDoc] = useState("");
  const dispatch = useDispatch();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleChangeTenSoDoc = (text) => {
    setInputTenSoDoc(text);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      console.log("userId", userId);

      const result = await dispatch(
        fetchSoDocChiSoByNhaMayId({
          service,
          currentPage,
          userId,
        })
      );

      if (result.payload) {
        console.log("Data returned:", result.payload);
        const data = result.payload;
        setData(data);
      } else {
        console.log("No data returned");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [service, currentPage]);
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
  const onRefresh = React.useCallback(() => {
    dispatch(
      fetchSoDocChiSoByNhaMayId({
        service,
        currentPage,
      })
    ).then((result) => {
      if (result.payload) {
        console.log("Data returned:", result.payload);
        const data = result.payload;
        setData(data);
      } else {
        console.log("No data returned");
      }
    });
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigator.navigate("WriteIndexDetail", {
          itemId: item.id,
          trangThaiGhi: trangThaiGhi,
        })
      }
    >
      <Box
        style={{ borderRadius: 5, shadowOpacity: 0.1, elevation: 5 }}
        backgroundColor="white"
        mt={2}
        mb={2}
        mr={4}
        ml={4}
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <HStack space={[3, 4]} justifyContent="space-between">
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
            >
              Tên sổ:{" "}
              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                {item.tenSo}
              </Text>
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Tên tuyến:{" "}
              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                {item.tenTuyenDoc}
              </Text>
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Cán bộ:{" "}
              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                {item.nguoiQuanLyId}
              </Text>
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Trạng thái sổ:{" "}
              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                {item.trangThai == 1 ? "Đang ghi" : "Chưa ghi"}
              </Text>
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Trạng thái khóa sổ:{" "}
              <Text
                style={{
                  color: item.trangThaiKhoaSo == 1 ? "blue" : "red",
                  fontFamily: "Quicksand_700Bold",
                }}
              >
                {item.trangThaiKhoaSo == 1 ? "Chưa khóa" : "Đã khóa"}
              </Text>
            </Text>
            <Text color="green.600">Đồng hồ: {item.tongSoChiSoDongHo}</Text>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
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

  return (
    <SafeAreaView style={{ marginBottom: "35%" }}>
      <View
        style={{
          width: "100%",

          marginVertical: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 25,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              fontFamily: "Quicksand_700Bold",
            }}
          >
            Ghi chỉ số
          </Text>
        </View>
        <Center>
          <TouchableOpacity
            style={{
              width: "55%",
              borderRadius: 50,
              flexDirection: "row",
              backgroundColor: "white",
              alignItems: "center",
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
        </Center>
      </View>
      <FlatList
        data={data.items}
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
      <Pagination
        style={{ marginBottom: 50 }}
        totalItems={data.totalCount}
        pageSize={10}
        currentPage={data.pageNumber}
        onPageChange={setCurrentPage}
        showLastPageButtons={true}
        btnStyle={{
          backgroundColor: "white",
          borderRadius: 8,
          borderColor: "#1677ff",
        }}
        textStyle={{ fontFamily: "Quicksand_700Bold", color: "gray" }}
        activeBtnStyle={{
          backgroundColor: "white",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#1677ff",
        }}
      />
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
                  <Text fontFamily="Quicksand_500Medium">Trạng thái sổ đọc:</Text>
                  <Box maxW="100%">
                    <Select
                      fontFamily="Quicksand_500Medium"
                      selectedValue={trangThaiSoDoc}
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
                      onValueChange={(itemValue) => setTrangThaiSoDoc(itemValue)}
                    >
                      <Select.Item
                        fontFamily="Quicksand_500Medium"
                        label="Chưa ghi"
                        value="2"
                      />
                      <Select.Item
                        fontFamily="Quicksand_500Medium"
                        label="Đang ghi"
                        value="1"
                      />
                    </Select>
                  </Box>
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
                // dispatch(
                //   getAllSoThanhToanBySoDoc({
                //     paymentRecordID,
                //     currentPage,
                //     service,
                //   })
                // );
                // setTenSo("");
                // setNgayTaoSo("");
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
                // searchHoaDon();
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
});

export default WriteIndex;
