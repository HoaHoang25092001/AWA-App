import {
  useFonts,
  Quicksand_700Bold,
  Quicksand_500Medium,
} from "@expo-google-fonts/quicksand";
import {
  Box,
  FlatList,
  HStack,
  Spacer,
  Text,
  VStack,
  Popover,
  Button
} from "native-base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { colors } from "../../constants";
import AdvanceSearchModel from "../../components/CustomModel/AdvanceSearchModel";
import { PriceListModel, StateModel } from "../../components/CustomModel";
import ChartModel from "../../components/CustomModel/ChartModel";
import ImportFileModel from "../../components/CustomModel/ImportFileModel";
import WaterUseSituation from "../../components/CustomModel/WaterUseSituationModel";
import { Ionicons } from '@expo/vector-icons';
import Pagination from "../../components/Pagination/Pagination";
import AccordionCustom from "../../components/AcordionCustom/AcordionCustom"

export default function InputIndexScreen() {
  const [showAdvanceSearchModel, setShowAdvanceSearchModel] = useState(false);
  const [showPriceListModel, setShowPriceListModel] = useState(false);
  const [showStateModel, setShowStateModel] = useState(false);
  const [showChartModel, setShowChartModel] = useState(false);
  const [showImportFileModel, setShowImportFileModel] = useState(false);
  const [showWaterUseSituationModel, setShowWaterUseSituationModel] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [service, setService] = useState("");
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("MM-YYYY");



  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      tuyen: "Tuyến 0",
      canbo: "Cán bộ 0000000000000000000000000000000",
      tenso: "Tên sổ 0",
      chuaghi: "Chưa ghi 0",
      chotso: "Chốt sổ 0",
      trangthai: "Trạng thái 0",
      ngaychot: "Ngày chốt 0",
      hoadon: "Hóa đơn 0",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb21238112",
      tuyen: "Tuyến 2",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb23128112",
      tuyen: "Tuyến 3",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53ab3123b28112",
      tuyen: "Tuyến 4",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-11321",
      tuyen: "Tuyến 5",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-123",
      tuyen: "Tuyến 6",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53ab123b28112",
      tuyen: "Tuyến 7",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28123112",
      tuyen: "Tuyến 8",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb21328112",
      tuyen: "Tuyến 9",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2811232",
      tuyen: "Tuyến 10",
      canbo: "Cán bộ 1",
      tenso: "Tên sổ 1",
      chuaghi: "Chưa ghi 1",
      chotso: "Chốt sổ 1",
      trangthai: "Trạng thái 1",
      ngaychot: "Ngày chốt 1",
      hoadon: "Hóa đơn 1",
    },
  ];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // Hàm xử lý khi người dùng chuyển đổi trang
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const title = [
    {
      id: "1",
      name: "#",
    },
    {
      id: "2",
      name: "",
    },
    {
      id: "3",
      name: "Tuyến đọc",
    },
    {
      id: "4",
      name: "Số hợp đồng",
    },
    {
      id: "5",
      name: "Sen đồng hồ",
    },
    {
      id: "6",
      name: "Tên khách hàng",
    },
    {
      id: "7",
      name: "Địa chỉ",
    },
    {
      id: "8",
      name: "Tiền thu",
    },
    {
      id: "9",
      name: "Chỉ số cũ",
    },
    {
      id: "10",
      name: "Chỉ só mới",
    },
    {
      id: "11",
      name: "Tiêu thụ",
    },
    {
      id: "12",
      name: "Ngày đọc",
    },
    {
      id: "13",
      name: "Ngày đồng bộ",
    },
    {
      id: "14",
      name: "Trạng thái đọc",
    },
    {
      id: "15",
      name: "Ngày đầu kỳ",
    },
    {
      id: "16",
      name: "Ngày cuối kỳ",
    },
    {
      id: "17",
      name: "Chỉ số cũ",
    },
    {
      id: "18",
      name: "Chỉ số mới",
    },
    {
      id: "19",
      name: "Trạng thái ĐH",
    },
    {
      id: "20",
      name: "Ghi chú",
    },
  ];
  const renderItem = ({ item, index }) => (
    <HStack h={10}>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{index + 1}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Ionicons name='image-outline' size={24} color={colors.dark} style={styles.icon} />
          <Ionicons name='lock-closed-outline' size={24} color={colors.dark} style={styles.icon} />
          <Ionicons name="caret-down-sharp" size={24} color="red" />
        </View>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.tuyen}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.canbo}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.tenso}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.chuaghi}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.chotso}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.trangthai}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.ngaychot}</Text>
      </Box>
      <Box
        borderRightWidth={1}
        style={styles.boxContent}
        borderColor="muted.200"
        pl={["5", "4"]}
        pr={["5", "5"]}
        py="2"
      >
        <Text style={styles.textContent}>{item.hoadon}</Text>
      </Box>
    </HStack>
  );

  // Advanced search handle
  const advanceSearchHandleModel = () => {

  }

  const closePopover = () => {
    setPopoverOpen(false);
  };

  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_500Medium,
  });
  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <AccordionCustom
          setShowDatePickerModal={setShowDatePickerModal}
          selectedDate={selectedDate}
        />
        {/* Tiêu đề của bảng */}
        <ScrollView horizontal>
          <Box>
            <HStack
              style={{
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              {title.map((item) => (
                <Box
                  key={item.id}
                  borderRightWidth={1}
                  borderBottomWidth={1}
                  borderColor="muted.200"
                  style={[styles.boxTitle]}
                  pl={["5", "4"]}
                  pr={["5", "5"]}
                  py="2"
                >
                  <Text style={styles.textTitle}>{item.name}</Text>
                </Box>
              ))}
            </HStack>
            {/* Nội dung của bảng */}
            <ScrollView style={{ height: 400 }}>
              <FlatList
                data={paginatedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>
          </Box>
        </ScrollView>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          service={service}
          setService={setService}
          setItemsPerPage={setItemsPerPage}
        />
        <View style={styles.touchableOpacityContainer}>
          <Popover
            isOpen={popoverOpen}
            onOpen={() => setPopoverOpen(true)}
            onClose={() => setPopoverOpen(false)}
            trigger={triggerProps => {
              return (
                <View style={styles.buttonPopover}>
                  <Text {...triggerProps} style={{ fontSize: 20, color: "white" }}>+</Text>
                </View>
              );
            }}>
            <Popover.Content accessibilityLabel="Delete Customerd" w="48" pb={8} pr={4} borderBottomColor={colors.white} borderBottomWidth="0">
              <Popover.Body>
                <View style={styles.buttonContainer}>
                  <CustomButton text={"Tìm kiếm"} color={colors.blue_700} icon="search" onPress={() => { setShowAdvanceSearchModel(true); closePopover(); }} />
                  <CustomButton text={"Nhập excel"} color={colors.orange_400} icon="document-text-outline" />
                  <CustomButton text={"Nhập tệp"} color={colors.emerald_300} icon="share-outline" onPress={() => { setShowImportFileModel(true); closePopover(); }} />
                  <CustomButton text={"Tiện ích"} color={colors.danger_500} icon="ellipsis-vertical" />
                  <CustomButton text={"Bảng giá"} color={colors.indigo_400} icon="calendar-outline" onPress={() => { setShowPriceListModel(true); closePopover(); }} />
                  <CustomButton text={"Xem TH SD"} color={colors.blue_400} icon="time-outline" onPress={() => { setShowWaterUseSituationModel(true); closePopover(); }} />
                  <CustomButton text={"Xem biểu đồ"} color={colors.lightBlue_300} icon="trending-up" onPress={() => { setShowChartModel(true); closePopover(); }} />
                  <CustomButton text={"Xem hình ảnh"} color={colors.amber_500} icon="images" />
                  <CustomButton text={"Trạng thái"} color={colors.orange_300} icon="bar-chart-sharp" onPress={() => { setShowStateModel(true); closePopover(); }} />
                </View>
              </Popover.Body>
            </Popover.Content>
          </Popover>
          {/* Models */}
          <AdvanceSearchModel visible={showAdvanceSearchModel} onClose={() => setShowAdvanceSearchModel(false)} />
          <PriceListModel visible={showPriceListModel} onClose={() => setShowPriceListModel(false)} />
          <StateModel visible={showStateModel} onClose={() => setShowStateModel(false)} />
          <ChartModel visible={showChartModel} onClose={() => setShowChartModel(false)} />
          <ImportFileModel visible={showImportFileModel} onClose={() => setShowImportFileModel(false)} />
          <WaterUseSituation visible={showWaterUseSituationModel} onClose={() => setShowWaterUseSituationModel(false)} />
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContent: {
    textAlign: "center",
    fontFamily: "Quicksand_500Medium",
  },
  textTitle: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 14,
    fontFamily: "Quicksand_700Bold",
  },
  boxContent: {
    width: 150,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  boxTitle: {
    width: 150,
    borderBottomWidth: 1,
    backgroundColor: "rgb(250,250,250)",
  },
  touchableOpacityContainer: {
    position: 'absolute',
    bottom: 20, // Y position from the bottom
    right: 40, // X position from the right
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  buttonPopover: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: colors.info_500,
    alignItems: "center",
    justifyContent: "center",
  }
});
