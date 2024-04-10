import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Select,
  Text,
  View,
} from "native-base";
import {
  useFonts,
  Quicksand_700Bold,
  Quicksand_500Medium,
} from "@expo-google-fonts/quicksand";
import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { DefaultTheme, List } from "react-native-paper";
import { colors } from "../../constants";
import {
  createNewSoDocApi,
  filterHopDongApi,
  filterSoDocApi,
  khuVucAllApi,
  kyGhiChiSoAllApi,
  soDocChiSoApi,
  tuyenDocAllApi,
} from "../../api/user";
import { useState } from "react";
import { useEffect } from "react";
import MonthPicker from "react-native-month-picker";
import moment from "moment";
import App from "../../screens/user/TestTable";
import YearMonthPicker from "../PickYearMonth/PickYearMonth";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const AccordionCreateSoDoc = ({
  dataHopDong,
  setDataHopDong,
  canBoDocs,
  service,
  setTotalCount,
  setTotalPages,
  currentPage,
  setSelectedThangTaoSo,
  selectedThangTaoSo,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [selectedDate, changeDate] = useState(null);
  const [responseData, setResponseData] = useState(null); // State to store the response data
  const [selectedCanBo, setSelectedCanBo] = useState(null);
  const [selectedTuyenDoc, setSelectedTuyenDoc] = useState(null);
  const [selectedTrangThai, setSelectedTrangThai] = useState(null);
  const [selectedKhuVuc, setSelectedKhuVuc] = useState(null);
  const [selectedKyGhi, setSelectedKyGhi] = useState(null);
  const [selectedTenSo, setSelectedTenSo] = useState(null);
  const [selectedLoaiKH, setSelectedLoaiKH] = useState(null);
  const [keyIdHopDong, setKeyIdHopDong] = useState(null);
  const [selectedSDTKH, setSDTKH] = useState(null);
  const [loaiDH, setLoaiDH] = useState(null);
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFilterSoDoc = async () => {
    setLoading(true);
    const filterParams = {
      tuyenDocId: selectedTuyenDoc,
      loaiKH: selectedLoaiKH,
      keyIdHopDong: keyIdHopDong,
      loaiDH: loaiDH,
      sdtKH: selectedSDTKH,
      pageNumber: currentPage,
    };

    try {
      const filterData = await filterHopDongApi(filterParams);

      setDataHopDong(filterData.items);
      setTotalCount(filterData.totalCount);
      setTotalPages(filterData.totalPages);
    } catch (error) {
      console.error("Error1:", error);
     
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   handleFilterSoDoc();
  // },[currentPage]);

  useEffect(() => {
    async function fetchTuyenDocData() {
      try {
        const response = await tuyenDocAllApi();
        console.log("Tuyen doc API:", response.data);
        const data = response.data;
        setAllData(data);
      } catch (error) {
        console.error("Lỗi tuyen doc API:", error);
        // Xử lý lỗi ở đây nếu cần
      }
    }
    fetchTuyenDocData();
  }, []);
  const handleTimMoi = () => {
    setSelectedLoaiKH(null);
    setKeyIdHopDong(null);
    setSelectedTuyenDoc(null);
    setLoaiDH(null);
  };
  // useEffect(() => {
  //   setData(responseData);
  //   console.log("data123123", responseData);
  // }, [handleFilterSoDoc]);
  return (
    <List.Accordion
      style={styles.accordionTitle}
      titleStyle={{
        color: colors.text,
        fontWeight: 600,
        fontFamily: "Quicksand_700Bold",
      }}
      title="Tìm kiếm"
    >
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Tháng</FormControl.Label>
          <Button
            variant="outline"
            size="md"
            colorScheme={"gray"}
            onPress={() => setShowDatePickerModal(true)}
          >
            <Text style={{ fontFamily: "Quicksand_500Medium" }}>
              {moment(selectedThangTaoSo).format("MM/YYYY")}
            </Text>
          </Button>
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Cán bộ</FormControl.Label>
          <Select
            selectedValue={selectedCanBo}
            minWidth="200"
            accessibilityLabel="Chọn cán bộ"
            placeholder="Chọn cán bộ"
            style={{ fontFamily: "Quicksand_500Medium" }}
            fontSize={12}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setSelectedCanBo(itemValue)}
          >
            {canBoDocs?.map((item) => (
              <Select.Item
                key={item.id}
                label={item.userName}
                value={item.id}
              />
            ))}
          </Select>
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Tuyến đọc</FormControl.Label>

          <Select
            selectedValue={selectedTuyenDoc}
            minWidth="200"
            accessibilityLabel="Chọn tuyến đọc"
            style={{ fontFamily: "Quicksand_500Medium" }}
            fontSize={12}
            placeholder="Chọn tuyến đọc"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setSelectedTuyenDoc(itemValue)}
          >
            {allData?.map((item) => (
              <Select.Item
                key={item.id}
                label={item.tenTuyen}
                value={item.id}
              />
            ))}
          </Select>
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Loại KH</FormControl.Label>

          <Select
            selectedValue={selectedLoaiKH}
            style={{ fontFamily: "Quicksand_500Medium" }}
            minWidth="200"
            accessibilityLabel="Chọn loại khách hàng"
            placeholder="Chọn loại khách hàng"
            fontSize={12}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setSelectedLoaiKH(itemValue)}
          >
            <Select.Item key={"Cá nhân"} label="Cá nhân" value="Cá nhân" />
            <Select.Item
              key={"Đơn vị, tổ chức"}
              label="Tổ chức"
              value="Đơn vị, tổ chức"
            />
          </Select>
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Số hợp đồng</FormControl.Label>
          <Input
            size="md"
            style={{ fontFamily: "Quicksand_500Medium" }}
            placeholder="Nhập số hợp đồng"
            value={keyIdHopDong}
            onChangeText={(text) => setKeyIdHopDong(text)}
            fontSize={12}
          />
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Số điện thoại KH</FormControl.Label>
          <Input
            size="md"
            style={{ fontFamily: "Quicksand_500Medium" }}
            placeholder="Nhập số điện thoại KH"
            value={selectedSDTKH}
            onChangeText={(text) => setSDTKH(text)}
            fontSize={12}
          />
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Loại ĐH</FormControl.Label>

          <Select
            selectedValue={loaiDH}
            minWidth="200"
            accessibilityLabel="Chọn loại đồng hồ"
            style={{ fontFamily: "Quicksand_500Medium" }}
            fontSize={12}
            placeholder="Chọn loại đồng hồ"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setLoaiDH(itemValue)}
          >
            <Select.Item key={"1"} label="Tất cả" value="1" />
            <Select.Item key={"2"} label="Đồng hồ dịch vụ" value="2" />
            <Select.Item key={"3"} label="Đồng hồ block" value="3" />
          </Select>
        </FormControl>
        <Center>
          <HStack mt="3" mb="3" style={{ alignContent: "space-between" }}>
            <Button.Group space={2}>
              <Button
                onPress={handleFilterSoDoc}
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name="search"
                    size="sm"
                    color={"black"}
                  />
                }
                isLoading={loading}
                spinnerPlacement="end"
                isLoadingText="Đang tìm kiếm"
              >
                <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                  Tìm kiếm
                </Text>
              </Button>
              <Button
                variant="subtle"
                onPress={handleTimMoi}
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name="search"
                    size="sm"
                    color={"black"}
                  />
                }
              >
                <Text style={{ fontFamily: "Quicksand_700Bold" }}>Tìm mới</Text>
              </Button>
            </Button.Group>
          </HStack>
        </Center>
        <Modal
          isOpen={showDatePickerModal}
          onClose={() => setShowDatePickerModal(false)}
          size="lg"
        >
          <Modal.Content width={"90%"} maxH="600">
            <Modal.CloseButton />
            <Modal.Header>Chọn tháng</Modal.Header>
            <Modal.Body>
              <YearMonthPicker
                selectedThangTaoSo={selectedThangTaoSo}
                setSelectedThangTaoSo={setSelectedThangTaoSo}
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
      </ScrollView>
    </List.Accordion>
  );
};

export default AccordionCreateSoDoc;
const styles = StyleSheet.create({
  accordionTitle: {
    backgroundColor: "#cccc",
    height: 55,
    borderRadius: 15,
    padding: 3,
  },
  formControl: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
