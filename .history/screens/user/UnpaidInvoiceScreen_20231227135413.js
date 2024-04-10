import React, { useState, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform,
    ActivityIndicator,
} from "react-native";
import {
    Box,
    CheckIcon,
    Select,
    Modal,
    FormControl,
    VStack,
    HStack,
    Button,
    Icon,
    Text,
    Input,
    TextArea,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { IntlProvider, FormattedNumber } from "react-intl";
import { useNavigation } from "@react-navigation/native";
import * as apis from "../../api";

const UnpaidInvoiceScreen = ({ navigation, route }) => {
    const { idTheDienLuc } = route.params;

    const [hoaDonChuaTT, setHoaDonChuaTT] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apis.apiGetHoaDonChuaThanhToanByIDTheDienLuc(idTheDienLuc);
                console.log("hoaDonChuaTT", response.data);

                if (response?.statusCode == 201 || response?.statusCode == 200) {
                    console.log("Thành công");
                    setHoaDonChuaTT(response.data)
                }
            } catch (error) {
                // Handle errors here
                console.log("Thát bại");
                console.error("Error:", error);
            }
        };

        // Gọi hàm fetchData ngay lập tức
        fetchData();
    }, [])

    return (
        <Box alignItems="center" w="100%">
            <Box w="90%" maxW="400">
                <VStack space="md">
                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <IntlProvider locale="vi-VN">
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    marginVertical: 10
                                }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Trang chủ')}>
                                        <Ionicons name="arrow-back-sharp" size={28} color="black" />
                                    </TouchableOpacity>
                                    <View>
                                    </View>
                                    <View>
                                    </View>
                                </View>
                                {hoaDonChuaTT?.items?.length > 0 ? hoaDonChuaTT?.items?.map((invoice) => (
                                    <View
                                        style={{
                                            width: "100%",
                                            borderRadius: 5,
                                            padding: 10,
                                            backgroundColor: "#f5fffa",
                                            marginVertical: 20,
                                            // For iOS
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 2,
                                            // For Android
                                            elevation: 6,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 10,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                    fontSize: 16
                                                }}
                                            >
                                                Công ty Cổ phần Xây dựng và CN môi trường Việt Nam
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                                Tên khách hàng :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                            {invoice.tenKhachHang}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                                Địa chỉ :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                            {invoice.diaChiKhachHang}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                                SĐT :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                            {invoice.dienThoaiKhachHang}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                                Số hóa đơn :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                            {invoice.soHoaDon}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                                Tiêu thụ :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                            {invoice.soTieuThu}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                            {invoice.chiSoCu}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                                10
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            >
                                                Chỉ số mới :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                            {invoice.chiSoMoi}
                                            </Text>
                                        </View>
                                    </View>
                                )) : (
                                    <View style={styles.emptyContainer}>
                                        <Ionicons
                                            name="md-information-circle"
                                            size={60}
                                            color="black"
                                        />
                                        <Text
                                            style={{ fontFamily: "Quicksand_700Bold" }}
                                        >
                                            Không tìm thấy dữ liệu
                                        </Text>
                                    </View>
                                )}

                            </IntlProvider>
                        </ScrollView>
                    </SafeAreaView>
                </VStack>
            </Box>
        </Box>
    )
}

export default UnpaidInvoiceScreen

const styles = StyleSheet.create({
    titleItem: {
      fontWeight: "600",
      fontSize: 17,
      fontFamily: "Quicksand_700Bold",
      paddingBottom: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 150,
    },
  });