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