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

const DebtInvoice = ({ navigation }) => {
    const navigator = useNavigation();
    const { invoiceChuaTTByMaKH } = useSelector((state) => state.invoice);

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
                                        onPress={() => navigation.navigate('Trang chủ')}>
                                        <Ionicons name="arrow-back-sharp" size={28} color="black" />
                                    </TouchableOpacity>
                                    <View>
                                    </View>
                                    <View>
                                    </View>
                                </View>
                                {invoiceChuaTTByMaKH ? invoiceChuaTTByMaKH?.map((data) => (
                                    <View
                                        key={data.id}
                                        style={{
                                            width: "100%",
                                            borderRadius: 5,
                                            padding: 10,
                                            backgroundColor: "#ffe4c4",
                                            marginBottom: 10
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
                                                        onPress={() => {}}
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
                                            1
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
                                            1
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
                                            1
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
                                            1
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
                                            1
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
                                            1
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
                                            1
                                        </Text>
                                    </View>
                                </View>
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