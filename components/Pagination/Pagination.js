import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, CheckIcon, Select } from "native-base";
const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  service,
  setService,
  setItemsPerPage,
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("Page number changed", pageNumber);
  };
  const handleValue = (itemValue) => {
    setService(itemValue), setItemsPerPage(itemValue);
  };

  const maxVisiblePageNumbers = 4; // Số lượng số trang hiển thị tối đa
  const halfVisiblePageNumbers = Math.floor(maxVisiblePageNumbers / 2);

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePageNumbers) {
      // Nếu tổng số trang nhỏ hơn hoặc bằng maxVisiblePageNumbers, hiển thị tất cả các số trang
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= halfVisiblePageNumbers) {
      // Nếu trang hiện tại nằm ở phía đầu, hiển thị các số trang từ 1 đến maxVisiblePageNumbers
      for (let i = 1; i <= maxVisiblePageNumbers; i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - halfVisiblePageNumbers) {
        // Chỉ hiển thị "..." khi currentPage không ở phía cuối danh sách trang
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - halfVisiblePageNumbers) {
      // Nếu trang hiện tại nằm ở phía cuối, hiển thị các số trang cuối cùng
      pageNumbers.push(1);
      if (currentPage > halfVisiblePageNumbers + 1) {
        // Chỉ hiển thị "..." khi currentPage không ở phía đầu danh sách trang
        pageNumbers.push("...");
      }
      for (
        let i = totalPages - maxVisiblePageNumbers + 1;
        i <= totalPages;
        i++
      ) {
        pageNumbers.push(i);
      }
    } else {
      // Nếu trang hiện tại nằm ở giữa, hiển thị các số trang ở giữa
      pageNumbers.push(1);
      if (currentPage > halfVisiblePageNumbers + 1) {
        // Chỉ hiển thị "..." khi currentPage không ở phía đầu danh sách trang
        pageNumbers.push("...");
      }
      for (
        let i = currentPage - halfVisiblePageNumbers;
        i <= currentPage + halfVisiblePageNumbers;
        i++
      ) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - halfVisiblePageNumbers) {
        // Chỉ hiển thị "..." khi currentPage không ở phía cuối danh sách trang
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <View style={styles.paginationBtn}>
      <View style={styles.paginationContainer}>
        {getPageNumbers().map((pageNumber, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationButton,
              currentPage === pageNumber && styles.paginationButtonActive,
              pageNumber === "..." && styles.paginationButtonEllipsis,
            ]}
            onPress={() => {
              if (pageNumber !== "...") {
                handlePageChange(pageNumber);
              }
            }}
          >
            <Text
              style={[
                styles.paginationText,
                currentPage === pageNumber && styles.paginationTextActive,
                pageNumber === "..." && styles.paginationTextEllipsis,
              ]}
            >
              {pageNumber}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View w={20}>
        <Select
          selectedValue={service}
          minWidth="20"
          maxWidth="20"
          accessibilityLabel="Selection"
          placeholder="10"
          _selectedItem={{
            bg: "teal.300",
            endIcon: <CheckIcon size="2" />,
          }}
          mt={1}
          onValueChange={handleValue}
        >
          <Select.Item label="10 / Trang" value="10" />
          <Select.Item label="20 / Trang" value="20" />
          <Select.Item label="50 / Trang" value="50" />
          <Select.Item label="100 / Trang" value="100" />
        </Select>
      </View>
    </View>
  );
};

export default Pagination;
const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
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
  },
  textTitle: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  boxContent: {
    width: 120,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  boxTitle: {
    width: 120,
    borderBottomWidth: 1,
    backgroundColor: "rgb(250,250,250)",
  },
});
