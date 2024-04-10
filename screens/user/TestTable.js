import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useDispatch, useSelector } from "react-redux";
import { hopDong } from "../../store/asyncAction";
import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Modal,
  Spacer,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MenuButtonV2 from "../../components/MenuButton/MenuButtonV2";

const GET_HOP_DONGS = gql`
  query {
    GetHopDongs(first: 100) {
      nodes {
        keyId
        id
        camKetSuDungNuoc
        chungTu
        createdBy
        diachi
        khachHang {
          tenKhachHang
        }
        dongHoNuocs {
          maDHThay
          tenDongHo
        }
      }
    }
  }
`;

function TestTable() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.soDocChiSo);

  useEffect(() => {
    console.log("Data test:", data);
  }, []);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigator = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Box
        style={{
          borderRadius: 5,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 5,
            height: 5,
          },
        }}
        backgroundColor="white"
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
  return (
    <SafeAreaView>
      <VStack space={5} justifyContent="space-between">
        <View>
          <FlatList
            data={data.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <View
                style={styles.emptyContainer}
                space={5}
                justifyContent="space-between"
              >
                <Ionicons
                  name="md-information-circle"
                  size={60}
                  color="black"
                />
                <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                  Không tìm thấy dữ liệu
                </Text>
              </View>
            )}
          />
        </View>
        <View>
          <MenuButtonV2 />
        </View>
      </VStack>
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
    </SafeAreaView>
  );
}
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
export default TestTable;
