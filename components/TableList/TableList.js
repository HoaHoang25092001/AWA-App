import {
  RefreshControl,
  SafeAreaView,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Modal,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoDocChiSoByNhaMayId } from "../../store/SoDocChiSoTheoNM/action";
import { useService } from "../../ServiceContext";

const TableList = ({
  checked,
  setChecked,
  setCurrentPage,
  currentPage,
  setData,
  data,
  checkedChotSo,
  setCheckedChotSo,
  checkedKhoaSo,
  setCheckedKhoaSo,
}) => {
  const { loading, error } = useSelector((state) => state.soDocChiSo);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [boxTitleWidth, setBoxTitleWidth] = useState(300);
  const [refreshing, setRefreshing] = useState(false);
  const { service, setService } = useService([]);
  const [selectedItems, setSelectedItems] = useState(null);
  const successMessage = useSelector((state) => state.huyChotSo.successMessage);
  const successMessageMoKhoa = useSelector(
    (state) => state.moKhoa.successMessage
  );
  const successMessageKhoaSo = useSelector(
    (state) => state.khoaSo.successMessage
  );
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setChecked(null);
    setCheckedChotSo(null);
    setCheckedKhoaSo(null);
  });
  useEffect(() => {
    dispatch(
      fetchSoDocChiSoByNhaMayId({
        service,
        currentPage,
      })
    ).then((result) => {
      if (result.payload) {
        console.log("Data returned Table List:", result.payload);
        const data = result.payload;
        setData(data);
      } else {
        console.log("No data returned");
      }
    });
  }, [successMessage, successMessageMoKhoa, successMessageKhoaSo]);

  // useEffect(
  //   () => console.log("Item checked:", checked),
  //   console.log("Item Chot So:", checkedChotSo),
  //   console.log("Item Khoa So:", checkedKhoaSo),
  //   [checked]
  // );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setChecked(item.id);
        setCheckedKhoaSo(item.trangThaiKhoaSo);
        setCheckedChotSo(item.chotSo);
      }}
    >
      <Box
        style={{
          borderRadius: 5,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          backgroundColor: checked === item.id ? "lightblue" : "white",
        }}
        mt={2}
        mb={2}
        mr={4}
        ml={4}
        pl={["3", "3"]}
        pr={["2", "3"]}
        py="2"
      >
        <VStack>
          <Text style={styles.textTitle}>
            Tên sổ: <Text style={styles.textTitle}>{item.tenSo}</Text>
          </Text>
          <Text style={styles.textTitle}>
            Tuyến đọc:{" "}
            <Text style={styles.textContent}>{item.tenTuyenDoc}</Text>
          </Text>
          <Text style={styles.textTitle}>
            Cán bộ đọc:{" "}
            <Text style={styles.textContent}>{item.nguoiQuanLyId}</Text>
          </Text>
          <HStack space={3} justifyContent="space-between">
            <Text style={styles.textTitle}>
              Hóa đơn:{" "}
              <Text style={styles.textContent}>
                {item.soChiSoDongHoChuaGhi}
              </Text>
            </Text>
            <Text style={styles.textTitle}>
              Chưa ghi:{" "}
              <Text style={styles.textContent}>
                {item.soChiSoDongHoChuaGhi}
              </Text>
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text style={styles.textTitle}>
              Chốt sổ:{" "}
              <Text style={styles.textContent}>
                {item.chotSo ? (
                  <Text style={{ color: "red" }}>Đã chốt</Text>
                ) : (
                  <Text style={{ color: "blue" }}>Chưa chốt</Text>
                )}
              </Text>
            </Text>
            <Text style={styles.textTitle}>
              Trạng thái:{" "}
              <Text style={styles.textContent}>
                {item.trangThai === 1
                  ? "Đang ghi"
                  : item.trangThai === 2
                  ? "Đã ngừng"
                  : ""}
              </Text>
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text style={styles.textTitle}>
              Ngày chốt:{" "}
              <Text style={styles.textContent}>
                {item.ngayChot
                  ? `${item.ngayChot.substring(
                      8,
                      10
                    )}/${item.ngayChot.substring(
                      5,
                      7
                    )}/${item.ngayChot.substring(0, 4)}`
                  : ""}
              </Text>
            </Text>
            {item.trangThaiKhoaSo == 1 ? (
              <Ionicons name="md-lock-open-outline" size={20} color="blue" />
            ) : (
              <Ionicons name="md-lock-closed-outline" size={20} color="red" />
            )}
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
  const handleRowPress = (itemId) => {
    // Check if the item is already selected
    if (selectedItems.includes(itemId)) {
      // If selected, remove it from the selectedItems array
      setSelectedItems((prevSelectedItems) => {
        prevSelectedItems.filter((id) => id !== itemId);
        console.log("Id ne:", selectedItems);
      });
    } else {
      // If not selected, add it to the selectedItems array
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
    }
  };
  return (
    <View>
      <FlatList
        h={"70%"}
        data={data.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
        ListEmptyComponent={() => (
          <View
            style={styles.emptyContainer}
            space={5}
            justifyContent="space-between"
          >
            <Ionicons name="md-information-circle" size={60} color="black" />
            <Text style={{ fontFamily: "Quicksand_700Bold" }}>
              Không tìm thấy dữ liệu
            </Text>
          </View>
        )}
      />
      <Pagination
        totalItems={data.totalCount}
        pageSize={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        btnStyle={{
          backgroundColor: "#ccc",
          borderRadius: 5,
          borderWidth: "0px",
        }}
        textStyle={{ fontFamily: "Quicksand_700Bold" }}
        activeBtnStyle={{ backgroundColor: "gray" }}
      />
      {loading === "pending" && (
        <Modal
          isOpen={true}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="xs"
        >
          <Modal.Content>
            <Modal.Body>
              <ActivityIndicator size="large" animating={true} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  textContent: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 17,
    color: "gray",
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
    marginBottom: 8,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
});

export default TableList;
