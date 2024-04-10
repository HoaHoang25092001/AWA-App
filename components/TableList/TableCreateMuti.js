import { Box, Center, Checkbox, HStack, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { createNewSoDocApi } from "../../api/user";
import Pagination from "../Pagination";
function TableCreateMuti({ data, loading }) {
  const [boxTitleWidth, setBoxTitleWidth] = useState(300);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [service, setService] = React.useState("");
  const [groupValues, setGroupValues] = React.useState([]);
  const [groupValue, setGroupValue] = React.useState([]);
  // const hopDongs = data ? data.GetHopDongs.nodes : [];
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const styles = StyleSheet.create({
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    paginationButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    paginationButtonActive: {
      backgroundColor: "#ccc",
    },
    paginationText: {
      color: "#333",
      fontWeight: "bold",
    },
    paginationTextActive: {
      color: "white",
    },
    textContent: {
      textAlign: "center",
      fontFamily: "Quicksand_700Bold",
      fontSize: 14,
      color: colors.text,
      fontWeight: 600,
      maxWidth: 300,
    },
    textTitle: {
      textAlign: "center",
      fontWeight: 600,
      fontSize: 16,
      fontFamily: "Quicksand_700Bold",
    },
    boxContent: {
      width: boxTitleWidth,
      borderBottomWidth: 1,
      backgroundColor: "white",
      minWidth: 60,
    },
    boxContent2: {
      width: 300, // Set width to boxTitleWidth
      borderBottomWidth: 1,
      backgroundColor: "white",
    },
    boxIndex: {
      minWidth: 60, // Set width to boxTitleWidth
      borderBottomWidth: 1,
      backgroundColor: "rgb(250,250,250)",
    },
    boxTitle: {
      minWidth: boxTitleWidth,
      borderBottomWidth: 1,
      backgroundColor: "rgb(250,250,250)",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 150,
    },
    emptyText: {
      marginTop: 8,
    },
  });
  const title = [
    {
      id: "2",
      name: "Nhân viên",
    },
    {
      id: "3",
      name: "	Mã tuyến đọc",
    },
    {
      id: "4",
      name: "Tên tuyến đọc",
    },
    {
      id: "5",
      name: "Kỳ ghi chỉ số",
    },
    {
      id: "6",
      name: "Đã tạo",
    },
  ];

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleSelectAll = () => {
    const allCheckboxValues = paginatedData?.map((hopDong) => hopDong.id);
    setGroupValue(allCheckboxValues);
  };
  useEffect(() => {
    console.log("Group Item Selected", groupValue);
  }, [groupValue]);

  return (
    <View>
      <ScrollView horizontal nestedScrollEnabled={true}>
        <Box>
          <HStack
            style={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Box
              borderTopWidth={1}
              borderLeftWidth={1}
              borderRightWidth={1}
              borderBottomWidth={1}
              borderColor="muted.200"
              style={[styles.boxIndex]}
              pl={["5", "4"]}
              pr={["5", "5"]}
              py="2"
            >
              <Center>
                <Checkbox
                  value={1}
                  onChange={handleSelectAll}
                  accessibilityLabel="1"
                  my={1}
                />
              </Center>
            </Box>
            {title?.map((item, index) => (
              <Box
                key={index}
                borderTopWidth={1}
                borderRightWidth={1}
                borderBottomWidth={1}
                borderColor="muted.200"
                style={[styles.boxContent]}
                pl={["5", "4"]}
                pr={["5", "5"]}
                py="2"
              >
                <Text style={styles.textTitle}>{item.name}</Text>
              </Box>
            ))}
          </HStack>
          {/* Nội dung của bảng */}
          <ScrollView
            h={"400"}
            style={{ backgroundColor: "white" }}
            nestedScrollEnabled={true}
          >
            <Checkbox.Group
              colorScheme="green"
              defaultValue={groupValue}
              accessibilityLabel="pick an item"
              onChange={(values) => {
                setGroupValue(values || []);
              }}
            >
              {paginatedData?.map((hopDong, index) => (
                <HStack minH={5} key={hopDong.id}>
                  <Box
                    borderLeftWidth={1}
                    style={styles.boxIndex}
                    borderColor="muted.200"
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="2"
                  >
                    <Checkbox
                      value={hopDong.id}
                      accessibilityLabel="1"
                      my={1}
                    />
                  </Box>

                  <Box
                    borderLeftWidth={1}
                    style={styles.boxContent2}
                    borderColor="muted.200"
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="2"
                  >
                    <Text style={styles.textContent}>
                      {hopDong.nguoiThuTienId}
                    </Text>
                  </Box>
                  <Box
                    borderLeftWidth={1}
                    style={styles.boxContent2}
                    borderColor="muted.200"
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="2"
                  >
                    <Text style={styles.textContent}>{hopDong.keyId}</Text>
                  </Box>
                  <Box
                    borderLeftWidth={1}
                    style={styles.boxContent2}
                    borderColor="muted.200"
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="2"
                  >
                    <Text style={styles.textContent}>{hopDong.tenTuyen}</Text>
                  </Box>
                  <Box
                    borderLeftWidth={1}
                    style={styles.boxContent2}
                    borderColor="muted.200"
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="2"
                  >
                    <Text style={styles.textContent}>
                      {hopDong.kyGhiChiSoId}
                    </Text>
                  </Box>
                  <Box
                    borderRightWidth={1}
                    borderLeftWidth={1}
                    style={styles.boxContent2}
                    borderColor="muted.200"
                    pl={["5", "4"]}
                    pr={["5", "5"]}
                    py="2"
                  >
                    <Text style={styles.textContent}>{hopDong.diachi}</Text>
                  </Box>
                </HStack>
              ))}
            </Checkbox.Group>
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
    </View>
  );
}

export default TableCreateMuti;
