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

const DebtInvoice = ({ navigation, route }) => {
    const { itemId, trangThaiGhi } = route.params;
    const navigator = useNavigation();
    const { invoiceChuaTTByMaKH } = useSelector((state) => state.invoice);

    const chuSo = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín",
    ];
    const hang = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];

    function docSoBaChuSo(baSo) {
        let tram, chuc, donVi;
        let ketQua = "";
        tram = parseInt(baSo / 100);
        chuc = parseInt((baSo % 100) / 10);
        donVi = baSo % 10;
        if (tram === 0 && chuc === 0 && donVi === 0) return "";
        if (tram !== 0) {
            ketQua += chuSo[tram] + " trăm ";
            if (chuc === 0 && donVi !== 0) ketQua += "linh ";
        }
        if (chuc !== 0 && chuc !== 1) {
            ketQua += chuSo[chuc] + " mươi";
            if (chuc === 0 && donVi !== 0)
                ketQua = ketQua.slice(0, ketQua.length - 1) + "linh ";
        }
        if (chuc === 1) ketQua += "mười ";
        switch (donVi) {
            case 1:
                if (chuc !== 0 && chuc !== 1) {
                    ketQua += " mốt";
                } else {
                    ketQua += chuSo[donVi];
                }
                break;
            case 5:
                if (chuc === 0) {
                    ketQua += chuSo[donVi];
                } else {
                    ketQua += " lăm";
                }
                break;
            default:
                if (donVi !== 0) {
                    ketQua += " " + chuSo[donVi];
                }
                break;
        }
        return ketQua;
    }
    function chuyenSoSangChu(so) {
        if (so === 0) return chuSo[0];
        let viTri = 0;
        let ketQua = "";
        let soDu;
        while (so > 0) {
            soDu = so % 1000;
            if (soDu !== 0) {
                const baChuSo = docSoBaChuSo(soDu);
                ketQua = baChuSo + " " + hang[viTri] + " " + ketQua;
            }
            so = parseInt(so / 1000);
            viTri++;
        }
        return ketQua.trim().replace(/\s+/g, " ");
    }

    const PriceTable = ({ data }) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    borderTopWidth: 1,
                    backgroundColor: "#f0f8ff",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Quicksand_500Medium",
                    }}
                >
                    {data.soTieuThu}
                </Text>
                <Text
                    style={{
                        fontFamily: "Quicksand_500Medium",
                    }}
                >
                    <FormattedNumber
                        value={data.donGia}
                        style="currency"
                        currency="VND" // Đơn vị tiền tệ của Việt Nam
                        minimumFractionDigits={1} // Số lượng chữ số phần thập phân tối thiểu
                        maximumFractionDigits={1} // Số lượng chữ số phần thập phân tối đa
                    />
                </Text>
                <Text
                    style={{
                        fontFamily: "Quicksand_500Medium",
                    }}
                >
                    <FormattedNumber
                        value={data.thanhTien}
                        style="currency"
                        currency="VND" // Đơn vị tiền tệ của Việt Nam
                        minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                        maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                    />
                </Text>
            </View>
        );
    };

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
                                        onPress={() => navigator.navigate('WriteIndexDetail', { itemId: itemId, trangThaiGhi: trangThaiGhi })}>
                                        <Ionicons name="arrow-back-sharp" size={28} color="black" />
                                    </TouchableOpacity>
                                    <View>
                                    </View>
                                    <View>
                                    </View>
                                </View>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginVertical: 10
                                }}>
                                    <Text 
                                    style={{
                                        fontFamily: "Quicksand_700Bold",
                                        fontSize: 25
                                    }}>Hóa đơn chưa thanh toán</Text>
                                </View>
                                {invoiceChuaTTByMaKH?.length > 0 ? invoiceChuaTTByMaKH?.map((data) => (
                                    <View
                                        key={data.id}
                                        style={{
                                            width: "100%",
                                            borderRadius: 5,
                                            padding: 10,
                                            backgroundColor: "#ffe4c4",
                                            marginBottom: 10,
                                            marginTop: 20
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
                                                {data.tenKhachHang}
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
                                                {data.diaChi}
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
                                                {data.dienThoai}
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
                                                {data.keyId}
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
                                                {data.tieuThu}
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
                                                Chỉ số cũ :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                                {data.chiSoDongHo.chiSoCu}
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
                                                {data.chiSoDongHo.chiSoMoi}
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
                                                Tháng tạo :{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: "Quicksand_700Bold",
                                                }}
                                            >
                                                {data.chiSoDongHo.thangTaoSoDoc}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-start",
                                                marginTop: 5,
                                            }}
                                        >
                                            {data?.trangThaiThanhToan === 2 ? (
                                                <Ionicons
                                                    name="checkbox-outline"
                                                    size={18}
                                                    color="green"
                                                />
                                            ) : (
                                                <AntDesign
                                                    name="closecircleo"
                                                    size={18}
                                                    color="red"
                                                />
                                            )}
                                            {data?.trangThaiThanhToan === 2 ? (
                                                <Text
                                                    style={{
                                                        color: "#5a6a85",
                                                        fontFamily: "Quicksand_700Bold",
                                                        color: "green",
                                                        marginLeft: 5,
                                                    }}
                                                >
                                                    Đã thanh toán
                                                </Text>
                                            ) : (
                                                <Text
                                                    style={{
                                                        color: "#5a6a85",
                                                        fontFamily: "Quicksand_700Bold",
                                                        color: "red",
                                                        marginLeft: 5,
                                                    }}
                                                >
                                                    Chưa thanh toán
                                                </Text>
                                            )}
                                        </View>
                                        <View
                                            style={{
                                                width: "100%",
                                                borderWidth: 1,
                                                borderRadius: 5,
                                                marginTop: 10,
                                                padding: 5,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    marginTop: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_700Bold",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Số lượng{" "}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_700Bold",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Đơn giá
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_700Bold",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Thành tiền
                                                </Text>
                                            </View>
                                            {data?.chiTietHoaDonRespondModels ? (
                                                data?.chiTietHoaDonRespondModels?.map((item) => (
                                                    <PriceTable data={item} key={item.id} />
                                                ))
                                            ) : (
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
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    marginTop: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_500Medium",
                                                    }}
                                                >
                                                    Thành tiền{" "}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_500Medium",
                                                    }}
                                                >
                                                    <FormattedNumber
                                                        value={data.tongTienTruocVat}
                                                        style="currency"
                                                        currency="VND" // Đơn vị tiền tệ của Việt Nam
                                                        minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                                        maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                                                    />
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    marginTop: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_500Medium",
                                                    }}
                                                >
                                                    Thuế GTGT{" "}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_500Medium",
                                                    }}
                                                >
                                                    <FormattedNumber
                                                        value={data.vat}
                                                        style="currency"
                                                        currency="VND" // Đơn vị tiền tệ của Việt Nam
                                                        minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                                        maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                                                    />
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    marginTop: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_500Medium",
                                                    }}
                                                >
                                                    Tổng tiền
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: "Quicksand_500Medium",
                                                    }}
                                                >
                                                    <FormattedNumber
                                                        value={data.tongTienHoaDon}
                                                        style="currency"
                                                        currency="VND" // Đơn vị tiền tệ của Việt Nam
                                                        minimumFractionDigits={1} // Số lượng chữ số phần thập phân tối thiểu
                                                        maximumFractionDigits={1} // Số lượng chữ số phần thập phân tối đa
                                                    />
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    marginTop: 5,
                                                }}
                                            >
                                                {data?.trangThaiThanhToan === 2 ? (
                                                    <Text
                                                        style={{
                                                            fontFamily: "Quicksand_700Bold",
                                                            color: "green",
                                                        }}
                                                    >
                                                        Tổng tiền bằng chữ:{" "}
                                                        {chuyenSoSangChu(data.tongTienHoaDon)}{" "}
                                                        đồng.
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={{
                                                            fontFamily: "Quicksand_700Bold",
                                                            color: "red",
                                                        }}
                                                    >
                                                        Tổng tiền bằng chữ:{" "}
                                                        {chuyenSoSangChu(data.tongTienHoaDon)} đồng
                                                    </Text>
                                                )}
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    marginVertical: 20,
                                                }}
                                            >
                                                {data.trangThaiThanhToan === 2 ? (
                                                    <View></View>
                                                ) : (
                                                    <TouchableOpacity
                                                        style={{
                                                            flexDirection: "row",
                                                            padding: 5,
                                                            backgroundColor: "lightcyan",
                                                            borderRadius: 9,
                                                            alignItems: "center",
                                                            borderWidth: 1,
                                                            marginRight: 5,
                                                            borderColor: "#1677ff",
                                                        }}
                                                        onPress={() => { }}
                                                    >
                                                        <AntDesign
                                                            name="printer"
                                                            size={16}
                                                            color="#1677ff"
                                                        />
                                                        <Text
                                                            style={{
                                                                fontFamily: "Quicksand_500Medium",
                                                                color: "#1677ff",
                                                                marginLeft: 5,
                                                            }}
                                                        >
                                                            In hóa đơn
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    marginVertical: 10,
                                                }}
                                            >
                                            </View>
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

export default DebtInvoice

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