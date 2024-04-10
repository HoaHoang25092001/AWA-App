import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Center, HStack, Menu, Popover } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoDocChiSoByNhaMayId } from "../../store/SoDocChiSoTheoNM/action";
import { fetchHuyChotSo } from "../../store/HandleHuyChotSoPUT/action";
import { clearSuccessMessage } from "../../store/HandleHuyChotSoPUT/slice";
import Toast from "react-native-toast-message";
import { fetchKhoaSo } from "../../store/HandleKhoaSo/action";
import { fetchMoKhoa } from "../../store/HandleMoKhoa/action";
import { clearSuccessMessageMoKhoa } from "../../store/HandleMoKhoa/slice";
import { clearSuccessMessageKhoaSo } from "../../store/HandleKhoaSo/slice";

const MenuButtonV2 = ({
  setModalVisible,
  setModalCreated,
  setModalCreatedMuti,
  setOverlayVisible,
  navigation,
  checked,
  setData,
  checkedChotSo,
  checkedKhoaSo,
}) => {
  const { loading, error, data } = useSelector((state) => state.soDocChiSo);
  const successMessage = useSelector((state) => state.huyChotSo.successMessage);
  const successMessageMoKhoa = useSelector(
    (state) => state.moKhoa.successMessage
  );
  const successMessageKhoaSo = useSelector(
    (state) => state.khoaSo.successMessage
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopoverV2, setOpenPopoverV2] = useState(false);
  const handleNavigation = () => {
    navigation.navigate("WriteIndex");
  };
  useEffect(() => console.log("Data test: ", data.items), []);
  useEffect(() => {
    if (successMessage) {
      Toast.show({
        type: "success",
        position: "top",
        text1: successMessage,
        visibilityTime: 5000, // Adjust the duration as needed
        autoHide: true,
        topOffset: 30, // Adjust the top offset as needed
        onHide: () => {
          dispatch(clearSuccessMessage());
        },
      });
    }
    if (successMessageMoKhoa) {
      Toast.show({
        type: "success",
        position: "top",
        text1: successMessageMoKhoa,
        visibilityTime: 5000, // Adjust the duration as needed
        autoHide: true,
        topOffset: 30, // Adjust the top offset as needed
        onHide: () => {
          dispatch(clearSuccessMessageMoKhoa());
        },
      });
    }
    if (successMessageKhoaSo) {
      Toast.show({
        type: "success",
        position: "top",
        text1: successMessageKhoaSo,
        visibilityTime: 5000, // Adjust the duration as needed
        autoHide: true,
        topOffset: 30, // Adjust the top offset as needed
        onHide: () => {
          dispatch(clearSuccessMessageKhoaSo());
        },
      });
    }
  }, [successMessage, successMessageMoKhoa, successMessageKhoaSo, dispatch]);
  const dispatch = useDispatch();
  const handleChotSo = async () => {
    try {
      const result = await dispatch(
        fetchHuyChotSo({
          soDocChiSoId: checked,
          isStatus: false,
          checkedKhoaSo: checkedKhoaSo,
        })
      );

      if (fetchHuyChotSo.fulfilled.match(result)) {
        const data = result.payload;
        console.log("Data returned Menu:", data);
        setData(data);
        setOpenPopover(false);
        setTimeout(() => {
          dispatch(clearSuccessMessage());
        }, 1000);
      } else {
        console.log("No data returned");
      }
    } catch (error) {
      console.error("Error in handleChotSo:", error.message);
    }
  };
  const handleChotSoV2 = async () => {
    try {
      const result = await dispatch(
        fetchHuyChotSo({
          soDocChiSoId: checked,
          isStatus: true,
          checkedKhoaSo: checkedKhoaSo,
        })
      );

      if (fetchHuyChotSo.fulfilled.match(result)) {
        const data = result.payload;
        console.log("Data returned Menu:", data);
        setData(data);
        setOpenPopover(false);
        setTimeout(() => {
          dispatch(clearSuccessMessage());
        }, 1000);
      } else {
        console.log("No data returned");
      }
    } catch (error) {
      console.error("Error in handleChotSo:", error.message);
      // Handle error as needed (e.g., show an error message to the user)
    }
  };

  const handleKhoaSo = async () => {
    try {
      const result = await dispatch(
        fetchKhoaSo({
          soDocChiSoId: checked,
        })
      );

      if (fetchKhoaSo.fulfilled.match(result)) {
        const data = result.payload;
        console.log("Data returned Khoa So:", data);
        setOpenPopoverV2(false);
        setTimeout(() => {
          dispatch(clearSuccessMessageKhoaSo());
        }, 1000);
      } else {
        console.log("No data Khoa so returned");
      }
    } catch (error) {
      console.error("Error in handleKhoaSo:", error.message);
      // Handle error as needed (e.g., show an error message to the user)
    }
  };
  const handleMoKhoa = async () => {
    try {
      const result = await dispatch(
        fetchMoKhoa({
          soDocChiSoId: checked,
        })
      );

      if (fetchMoKhoa.fulfilled.match(result)) {
        const data = result.payload;
        console.log("Data returned  Mo khoa:", data);
        setOpenPopoverV2(false);
        setTimeout(() => {
          dispatch(clearSuccessMessageMoKhoa());
        }, 1000);
      } else {
        console.log("No data mo khoa returned");
      }
    } catch (error) {
      console.error("Error in handleMoKhoa:", error.message);
      // Handle error as needed (e.g., show an error message to the user)
    }
  };

  return (
    <Box w="98%" alignItems="flex-end">
      <Menu
        w="200"
        placement="top right"
        borderRadius={25}
        trigger={(triggerProps) => {
          return (
            <Button
              alignSelf="flex-end"
              position={"absolute"}
              style={{
                backgroundColor: "#1677ff",
              }}
              variant="solid"
              h="50"
              w="50"
              {...triggerProps}
              borderRadius={50}
            >
              <Ionicons
                name={"add-outline"}
                size={24}
                style={{ textAlign: "center" }}
                color={"white"}
              />
            </Button>
          );
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.emerald_300,
            marginLeft: 10,
          }}
        >
          <Menu.Item
            style={{
              borderRadius: 10,
            }}
            onPress={() => setModalCreated(true)}
          >
            <Ionicons color={"white"} name="add-circle-outline" size={24} />
            <Text style={styles.buttonMenu}>Tạo sổ</Text>
          </Menu.Item>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.amber_500,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Menu.Item
            style={{
              borderRadius: 10,
            }}
            onPress={() => setModalCreatedMuti(true)}
          >
            <Ionicons color={"white"} name="add-circle-sharp" size={24} />
            <Text style={styles.buttonMenu}>Tạo sổ đồng loạt</Text>
          </Menu.Item>
        </TouchableOpacity>
        <Menu.Item
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 8,
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.blue_700,
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={handleNavigation}
        >
          <Ionicons color={"white"} name="create-outline" size={24} />
          <Text style={styles.buttonMenu}>Ghi chỉ số</Text>
        </Menu.Item>

        {checked && (
          <Popover
            isOpen={openPopoverV2}
            trigger={(triggerProps) => {
              return (
                <Button
                  {...triggerProps}
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    marginBottom: 5,
                    borderRadius: 10,
                    backgroundColor:
                      checkedKhoaSo === 2
                        ? colors.danger_500
                        : colors.emerald_300,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  onPress={() => setOpenPopoverV2(true)}
                >
                  <HStack alignContent={"space-between"}>
                    <View alignItems={"self-start"} style={{ marginRight: 15 }}>
                      <Ionicons
                        color={"white"}
                        name={
                          checkedKhoaSo === 2
                            ? "close-circle-outline"
                            : "ios-key-outline"
                        }
                        size={24}
                      />
                    </View>
                    <Center style={{ marginRight: 40 }}>
                      <Text
                        style={{
                          width: "100%",
                          fontFamily: "Quicksand_700Bold",
                          color: "white",
                        }}
                      >
                        {checkedKhoaSo === 2 ? "Hủy khóa" : "Khóa sổ"}
                      </Text>
                    </Center>
                  </HStack>
                </Button>
              );
            }}
          >
            <Popover.Content accessibilityLabel="Khóa sổ" w="40">
              <Popover.Arrow />
              <Popover.Header>
                <Text style={styles.buttonPopover}>
                  {checkedKhoaSo === 2 ? "Hủy khóa sổ" : "Khóa sổ"}
                </Text>
              </Popover.Header>
              <Popover.Body style={styles.buttonPopover}>
                <Text style={styles.buttonPopoverBody}>
                  {checkedKhoaSo === 2
                    ? "Bạn có chắc chắn muốn hủy khóa sổ này không?"
                    : "Bạn có chắc chắn muốn khóa sổ này không?"}
                </Text>
              </Popover.Body>
              <Popover.Footer justifyContent="flex-end">
                <Button.Group space={2}>
                  <Button
                    colorScheme="coolGray"
                    variant="ghost"
                    onPress={() => setOpenPopoverV2(false)}
                  >
                    <Text style={styles.buttonPopoverBody}>Không</Text>
                  </Button>

                  <Button
                    style={styles.buttonPopover}
                    colorScheme="danger"
                    onPress={checkedKhoaSo === 2 ? handleMoKhoa : handleKhoaSo}
                  >
                    <Text
                      style={(styles.buttonPopoverBody, { color: "white" })}
                    >
                      Đồng ý
                    </Text>
                  </Button>
                </Button.Group>
              </Popover.Footer>
            </Popover.Content>
          </Popover>
        )}
        {checked && (
          <Popover
            isOpen={openPopover}
            trigger={(triggerProps) => {
              return (
                <Button
                  {...triggerProps}
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    marginBottom: 5,
                    borderRadius: 10,
                    backgroundColor: checkedChotSo
                      ? colors.danger_500
                      : colors.emerald_300,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  onPress={() => setOpenPopover(true)}
                >
                  <HStack alignContent={"space-between"}>
                    <View alignItems={"self-start"} style={{ marginRight: 15 }}>
                      <Ionicons
                        color={"white"}
                        name={
                          checkedChotSo
                            ? "close-circle-outline"
                            : "checkmark-circle-outline"
                        }
                        size={24}
                      />
                    </View>
                    <Center style={{ marginRight: 40 }}>
                      <Text
                        style={{
                          width: "100%",
                          fontFamily: "Quicksand_700Bold",
                          color: "white",
                        }}
                      >
                        {checkedChotSo ? "Hủy chốt" : "Chốt sổ"}
                      </Text>
                    </Center>
                  </HStack>
                </Button>
              );
            }}
          >
            <Popover.Content accessibilityLabel="Delete Customerd" w="40">
              <Popover.Arrow />
              <Popover.Header>
                <Text style={styles.buttonPopover}>
                  {checkedChotSo ? "Hủy chốt sổ" : "Chốt sổ"}
                </Text>
              </Popover.Header>
              <Popover.Body style={styles.buttonPopover}>
                <Text style={styles.buttonPopoverBody}>
                  {checkedChotSo
                    ? "Bạn có chắc chắn muốn hủy chốt sổ này không?"
                    : "Bạn có chắc chắn muốn chốt sổ này không?"}
                </Text>
              </Popover.Body>
              <Popover.Footer justifyContent="flex-end">
                <Button.Group space={2}>
                  <Button
                    colorScheme="coolGray"
                    variant="ghost"
                    onPress={() => setOpenPopover(false)}
                  >
                    <Text style={styles.buttonPopoverBody}>Không</Text>
                  </Button>

                  <Button
                    style={styles.buttonPopover}
                    colorScheme="danger"
                    onPress={checkedChotSo ? handleChotSo : handleChotSoV2}
                  >
                    <Text
                      style={(styles.buttonPopoverBody, { color: "white" })}
                    >
                      Đồng ý
                    </Text>
                  </Button>
                </Button.Group>
              </Popover.Footer>
            </Popover.Content>
          </Popover>
        )}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.danger_500,
            marginLeft: 10,
          }}
          onPress={() => console.log("Hello")}
        >
          <Menu.Item>
            <Ionicons color={"white"} name="close-circle-outline" size={24} />
            <Text style={styles.buttonMenu}>Xóa biểu mẫu</Text>
          </Menu.Item>
        </TouchableOpacity>
        <Menu.Item
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 8,
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.emerald_300,
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={() => console.log("Hello")}
        >
          <Ionicons color={"white"} name="checkmark-circle-outline" size={24} />
          <Text style={styles.buttonMenu}>Chốt sổ</Text>
        </Menu.Item>
        <Menu.Item
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 8,
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.amber_500,
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={() => console.log("Hello")}
        >
          <Ionicons color={"white"} name="settings-outline" size={24} />
          <Text style={styles.buttonMenu}>Ngừng ghi chỉ số</Text>
        </Menu.Item>
        <Menu.Item
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 8,
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.indigo_400,
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={() => console.log("Hello")}
        >
          <Ionicons color={"white"} name="pencil-outline" size={24} />
          <Text style={styles.buttonMenu}>Đồng bộ lại</Text>
        </Menu.Item>
        <Menu.Item
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 8,
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.info_500,
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={() => console.log("Hello")}
        >
          <Ionicons
            color={"white"}
            name="ellipsis-vertical-outline"
            size={24}
          />
          <Text style={styles.buttonMenu}>Tiện ích</Text>
        </Menu.Item>
        <Menu.Item
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 8,
            width: "90%",
            marginBottom: 5,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.blue_700,
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons color={"white"} name="bar-chart-outline" size={24} />
          <Text style={styles.buttonMenu}>Chỉ số</Text>
        </Menu.Item>
      </Menu>
    </Box>
  );
};

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
  },
  textTitle: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  buttonMenu: {
    width: "75%",
    fontFamily: "Quicksand_700Bold",
    color: "white",
  },
  buttonPopover: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 17,
  },
  buttonPopoverBody: {
    fontFamily: "Quicksand_500Medium",
    width: "100%",
  },
});
export default MenuButtonV2;
