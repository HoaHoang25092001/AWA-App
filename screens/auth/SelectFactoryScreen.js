import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  Select,
  Box,
  CheckIcon,
  Center,
  NativeBaseProvider,
  FormControl,
  WarningOutlineIcon,
  HStack,
  Skeleton,
  VStack,
} from "native-base";
import { useSelector } from "react-redux";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useService } from "../../ServiceContext";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const overlayHeight = height / 5;

const image = {
  uri: "https://nmn-dev.amazingtech.vn/static/media/bi.gif",
};

const SelectFactoryScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const nhaMays = useSelector((state) => state.auth.nhaMays);
  const { service, setService } = useService([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleService = (itemValue) => {
    setService(itemValue);
    console.log("Service:", service);
  };
  console.log("Nha may nuoc:", nhaMays);
  const handleNavigate = () => {
    if (service == "") {
      setError("Vui lòng chọn nhà máy");
      console.log("Error", error);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Trang chủ");
      }, 100);
    }
  };

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       // Kiểm tra xem có thông tin đăng nhập lưu trữ hay không
  //       const storedData = await AsyncStorage.getItem("userData");
  //       if (storedData) {
  //         const parsedData = JSON.parse(storedData);
  //         const savedService = parsedData.service;
  //         if (savedService) {
  //           setService(savedService);
  //           navigation.navigate("Trang chủ");
  //           console.log("Service2:", savedService);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking login status:", error);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);
  return (
    <ImageBackground
      source={require("../../assets/bg3.png")}
      resizeMode="cover"
      style={{
        width: windowWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Hãy chọn nhà máy</Text>
        <View style={styles.selectFactoryContainer}>
          <Box maxW="300">
            <Select
              fontFamily={"Quicksand_700Bold"}
              selectedValue={service}
              minWidth="200"
              minHeight="45"
              bg="steal.600"
              placeholder="Vui lòng chọn nhà máy"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              _light={{
                bg: "#0000001A",
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
              onValueChange={handleService}
            >
              {nhaMays?.map((item) => (
                <Select.Item
                  key={item.nhaMayId}
                  label={item.tenNhaMay}
                  value={item.nhaMayId}
                  color="green.500"
                  fontFamily={"Quicksand_700Bold"}
                />
              ))}
            </Select>
          </Box>
          <View style={styles.selectFactoryButton}>
            <Text
              onPress={handleNavigate}
              style={styles.selectFactoryButtonText}
            >
              Tiếp tục
            </Text>
          </View>
        </View>
        {error && (
          <HStack space={2}>
            <WarningOutlineIcon size="xs" style={{ color: "red" }} />
            <Text style={{ color: "red", paddingBottom: 5 }}>{error}</Text>
          </HStack>
        )}
        {loading && (
          <VStack space={2}>
            <ActivityIndicator size="large" color="white" />
            <Text
              style={{
                color: "white",
                paddingBottom: 5,
                fontFamily: "Quicksand_700Bold",
              }}
            >
              Vui lòng chờ trong giấy lát
            </Text>
          </VStack>
        )}
      </View>
    </ImageBackground>
  );
};

export default SelectFactoryScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "90%",
    height: overlayHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000001A",
    borderRadius: 5,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontFamily: "Quicksand_700Bold",
  },
  selectFactoryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectFactoryButton: {
    height: 47,
    backgroundColor: "#0071B1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 5,
    marginTop: 4,
  },
  selectFactoryButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
});
