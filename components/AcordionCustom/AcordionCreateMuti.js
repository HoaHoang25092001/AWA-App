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
  filterCreateMutiSoDoc,
  filterHopDongApi,
  filterSoDocApi,
  khuVucAllApi,
  kyGhiChiSoAllApi,
  soDocChiSoApi,
  tuyenDocAllApi,
} from "../../api/user";
import { useState } from "react";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";
import { parseISO, format } from "date-fns";
import { useEffect } from "react";
import MonthPicker from "react-native-month-picker";
import moment from "moment";
import App from "../../screens/user/TestTable";
import YearMonthPicker from "../PickYearMonth/PickYearMonth";
import { useDispatch, useSelector } from "react-redux";

const AccordionCreateMuti = ({
  dataHopDong,
  setDataHopDong,
  canBoDocs,
  service,
  kyGCSData,
  setSelectedKyGhi,
  selectedKyGhi,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [showDatePickerModal, setShowDatePickerModal] = useState(false); // State to store the response data
  const [selectedCanBo, setSelectedCanBo] = useState(null);
  const [selectedTuyenDoc, setSelectedTuyenDoc] = useState(null);
  const [selectedLoaiKH, setSelectedLoaiKH] = useState(null);
  const [keyIdHopDong, setKeyIdHopDong] = useState(null);
  const [loaiDH, setLoaiDH] = useState(null);
  const [allData, setAllData] = useState();
  const [dateSelected, setDateSelected] = useState(moment());

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading); // Redux loading state
  const error = useSelector((state) => state.error);
  const handleFilterSoDoc = async () => {
    const filterParams = {
      nhaMayId: service,
      time: moment(dateSelected).format("MM/YYYY"),
    };

    try {
      const filterData = await filterCreateMutiSoDoc(filterParams);
      console.log("Nha may id:", service);
      setDataHopDong(filterData.data);
    } catch (error) {
      console.error("Error roi:", error);
    }
  };

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
    setSelectedLoaiKH();
    setKeyIdHopDong();
    setSelectedTuyenDoc();
    setLoaiDH();
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
              {moment(dateSelected).format("MM/YYYY")}
            </Text>
          </Button>
        </FormControl>
        <FormControl mt="3" style={styles.formControl}>
          <FormControl.Label>Kỳ ghi chỉ số</FormControl.Label>
          <Select
            selectedValue={selectedKyGhi}
            minWidth="200"
            accessibilityLabel="Chọn kỳ GCS"
            placeholder="Chọn kỳ GCS"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setSelectedKyGhi(itemValue)}
          >
            {kyGCSData?.map((item) => (
              <Select.Item key={item.id} label={item.moTa} value={item.id} />
            ))}
          </Select>
        </FormControl>
        <Center>
          <HStack mt="3" mb="3" style={{ alignContent: "space-between" }}>
            <Button.Group space={2}>
              <Button
                variant={"outline"}
                onPress={handleFilterSoDoc}
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name="search"
                    size="sm"
                    color={"black"}
                  />
                }
              >
                <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                  Tìm kiếm
                </Text>
              </Button>
              <Button
                variant={"outline"}
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
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
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

export default AccordionCreateMuti;
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
