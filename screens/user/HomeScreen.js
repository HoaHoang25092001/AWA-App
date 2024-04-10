import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {
  AlertDialog,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  CheckIcon,
  FlatList,
  Heading,
  HStack,
  Icon,
  Modal,
  Select,
  Spacer,
  Stack,
  StatusBar,
  VStack,
} from "native-base";
import { StyleSheet, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { logoutUser } from "../../store/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { useService } from "../../ServiceContext";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();
  const name = useSelector((state) => state.auth.name);
  const nhaMays = useSelector((state) => state.auth.nhaMays);
  const route = useRoute();
  const receivedData = route.params?.dataService;
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  const { service, setService } = useService();
  console.log("name here", name);
  console.log("tenNhaMay here", nhaMays);
  console.log("Value", service);
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Tìm nhanh",
      imageUrl: require("../../assets/NFC.png"),
      navigateLink: "ScanNFCScreen",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Ghi chỉ số",
      imageUrl: require("../../assets/write.png"),
      navigateLink: "Ghi chỉ số",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Hóa đơn",
      imageUrl: require("../../assets/bill.png"),
      navigateLink: "Hóa đơn",
    },
    {
      id: "58694a0f-3da1-471f-bd96-14557fdfdf",
      name: "Sự cố",
      imageUrl: require("../../assets/warning.png"),
      navigateLink: "Sự cố",
    },
  ];
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.auth.noti);
  const handleLogout = () => {
    // Gọi action logout để đăng xuất

    console.log("notification here", notification);
    dispatch(logoutUser());
    navigation.navigate("login");
  };
  const handleServiceChange = (itemValue) => {
    if (itemValue === "all") {
      const allNhaMayIds = nhaMays.map((item) => item.nhaMayId);
      console.log("All nha may id:", allNhaMayIds);
      setService(allNhaMayIds);
    } else {
      setService(itemValue);
    }
  };
  const selectDefaultValue = Array.isArray(service) ? "all" : service;
  const handleModal = () => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Đăng xuất</AlertDialog.Header>
          <AlertDialog.Body>Bạn có chắc muốn đăng xuất không?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Hủy
              </Button>
              <Button colorScheme="danger" onPress={handleLogout}>
                Đăng xuất
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <StatusBar translucent={false} backgroundColor={"red"} />
      <View style={style.header}>
        <TouchableOpacity onPress={() => handleModal()}>
          <Ionicons name="sync" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsOpen(true);
          }}
        >
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          <Text style={{ fontFamily: "Quicksand_700Bold" }}>Chức năng</Text>
        </Heading>

        <HStack space={3} justifyContent="center" flexWrap="wrap">
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate(item.navigateLink);
              }}
            >
              <Box
                style={{
                  borderRadius: 5,
                  shadowOpacity: 0.2,
                  marginBottom: 50,
                  marginTop: 25,
                }}
                backgroundColor="white"
              >
                <Center>
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={item.imageUrl}
                    alt="image base"
                  />

                  <VStack space="3" px="4" pb="4">
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      {item.name}
                    </Text>
                  </VStack>
                </Center>
              </Box>
            </TouchableOpacity>
          ))}
        </HStack>
      </Box>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="lg">
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Chuyển nhà máy</Modal.Header>
          <Modal.Body>
            <Select
              mb={5}
              fontFamily="Quicksand_700Bold"
              defaultValue={service}
              selectedValue={selectDefaultValue}
              minWidth="200"
              minHeight="45"
              bg="steal.600"
              placeholder={receivedData}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              _light={{
                bg: "coolGray.100",
                _hover: {
                  bg: "coolGray.200",
                },
                _focus: {
                  bg: "coolGray.200:alpha.70",
                },
              }}
              _dark={{
                bg: "coolGray.800",
                _hover: {
                  bg: "coolGray.900",
                },
                _focus: {
                  bg: "coolGray.900:alpha.70",
                },
              }}
              mt={1}
              onValueChange={handleServiceChange}
            >
              {nhaMays?.map((item) => (
                <Select.Item
                  key={item.nhaMayId}
                  label={item.tenNhaMay}
                  value={item.nhaMayId}
                  color="green.500"
                />
              ))}
              <Select.Item
                key="Tất cả"
                label="Tất cả"
                value="all"
                color="green.500"
              />
            </Select>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#4B94E3",
  },
});
export default HomeScreen;
