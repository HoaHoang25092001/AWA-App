import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    Modal,
    Box,
    VStack,
    Input,
    Button,
    FlatList
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { getAllSoThanhToan } from '../../store/HoaDon/asyncAction'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useService } from "../../ServiceContext";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { IntlProvider, FormattedNumber } from 'react-intl';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import * as apis from "../../api";


function PaymentRecordScreen({ navigation }) {
    const navigator = useNavigation();
    const [currentPage, setCurrentPage] = useState(1);


    const dispatch = useDispatch()
    const { soThanhToan, status } = useSelector(state => state.invoice)
    const { service, setService } = useService([]);
    const [soThanhToanTheoSoDoc, setSoThanhToanTheoSoDoc] = useState(soThanhToan)
    const [showSearchModel, setShowSearchModel] = useState(false)
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("MM-YYYY");
    const [createdDate, setCreateDate] = useState(dayjs());
    const [tenSoDoc, setTenSoDoc] = useState('');

    //get called on screen loads
    // useEffect(() => {
    //     getData()
    // }, []);

    useEffect(() => {
        dispatch(getAllSoThanhToan({ currentPage, service }))
        // dispatch(getAllReadingRoutes())
    }, [navigation, currentPage, service, dispatch])

    useEffect(() => {
        setSoThanhToanTheoSoDoc(soThanhToan)
        // dispatch(getAllReadingRoutes())
        console.log("So thanh toan", soThanhToan)
    }, [soThanhToan])

    if (status === 'loading') {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        )
    }

    const handleChange = text => setTenSoDoc(text);

    const searchSoThanhToan = async () => {
        const ngayTaoSoDoc = moment(createdDate).format("DD/MM/YYYY")
        try {
            const response = await apis.apiFilterSoThanhToan(tenSoDoc, ngayTaoSoDoc, service, currentPage);
            console.log("Invoice", response.data);
            setSoThanhToanTheoSoDoc(response.data)
            if (response?.statusCode == 201 || response?.statusCode == 200) {
                console.log("Thành công");
            }
        } catch (error) {
            // Handle errors here
            console.log("Thát bại");
            console.error("Error:", error);
        }
    }

    function formatCurrencyVND(number) {
        // Kiểm tra xem đầu vào có phải là một số không
        if (isNaN(number)) {
            return "Invalid input. Please provide a valid number.";
        }

        // Chuyển đổi số thành chuỗi và thêm dấu chấm phẩy
        const formattedNumber = number
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");


        // Trả về chuỗi định dạng tiền tệ VND
        return `${formattedNumber}`;
    }

    //get data from DB
    // const getData = () => {
    //     let paymentRecordList = [];
    //     for (let index = 0; index < Items.length; index++) {
    //         // if (Items[index].category == 'product') {
    //         //     productList.push(Items[index]);
    //         // } else if (Items[index].category == 'accessory') {
    //         //     accessoryList.push(Items[index]);
    //         // }
    //         paymentRecordList.push(Items[index]);
    //     }
    //     setPaymentRecords(paymentRecordList);
    // };
    const PaymentRecordCard = ({ data }) => (
        <TouchableOpacity
            onPress={() => navigator.navigate('Danh sách hóa đơn', { paymentRecordID: data?.id })}
            style={{
                width: '90%',
                backgroundColor: 'white',
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 9,
                // For iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                // For Android
                elevation: 5,
            }}
        >
            <View
                style={{
                    width: '80%',
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8
                }}>
                    <FontAwesome5 name="file-invoice-dollar" size={20} color="#1677ff" />
                    <Text style={styles.titleItem}>{data?.tenSo}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        marginLeft: 25,
                        color: '#5a6a85',
                        fontFamily: "Quicksand_500Medium",
                    }}>Đã thanh toán:</Text>
                    <Text style={{
                        marginLeft: 5,
                        fontWeight: 'bold',
                        color: '#5a6a85',
                        fontFamily: "Quicksand_700Bold",
                    }}>{data?.soLuongHoaDonDaTT}/{data?.tongSoLuongHoaDon} (khách)</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        marginLeft: 25,
                        color: '#5a6a85',
                        fontFamily: "Quicksand_500Medium",
                    }}>Số tiền đã thu: </Text>
                    <Text style={{
                        marginLeft: 5,
                        color: '#5a6a85',
                        fontFamily: "Quicksand_700Bold",
                    }}>
                        {formatCurrencyVND(data?.tongSoTienDaThu)}
                        /{formatCurrencyVND(data?.tongSoTienDaThu)} (VNĐ)
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        marginLeft: 25,
                        color: '#5a6a85',
                        fontFamily: "Quicksand_500Medium",
                    }}>Ngày tạo sổ: </Text>
                    <Text style={{
                        marginLeft: 5,
                        fontWeight: 'bold',
                        color: '#5a6a85',
                        fontFamily: "Quicksand_700Bold",
                    }}>{moment(data?.createdTime, 'MM/DD/YYYY').format('DD/MM/YYYY')}</Text>
                </View>
            </View>
            <View style={{
                marginTop: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <Text style={{
                        marginLeft: 5,
                        color: '#1677ff',
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 16
                    }}>Xem danh sách <Ionicons name="arrow-forward-outline" size={15} color="#1677ff" /></Text>
                </View>
            </View>
            {/**<View
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: 'mintcream',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome name="dashboard" size={28} color="limegreen" />
                    </View>
                    </View>*/}
        </TouchableOpacity>
    )
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: "flex-start",
                        marginVertical: 10
                    }}>
                        {/** <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Hóa đơn")} style={{
                                    width: '30%',
                                    borderRadius: 5,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    padding: 5,
                                    marginVertical: 15,
                                    alignItems: 'center',
                                    borderColor: 'blue'
                                }}>
                            <Ionicons name="return-down-back-sharp" size={20} color="black" />
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '300',
                                fontFamily: "Quicksand_700Bold",
                                marginLeft: 8,
                            }}>Trở lại</Text>
                        </TouchableOpacity>*/}
                        <View style={{
                            paddingLeft: 25
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '400',
                                fontFamily: "Quicksand_700Bold",
                            }}>Hóa đơn</Text>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        padding: 8,
                        alignItems: 'center',
                        borderRadius: 8,
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '55%',
                                borderRadius: 50,
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                borderWidth: 1,
                                alignItems: 'center',
                                borderColor: '#1677ff',
                                justifyContent: 'space-between',
                                // For iOS
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                // For Android
                                elevation: 5,
                            }}
                            onPress={() => {
                                setShowSearchModel(true)
                            }}>
                            <Text
                                style={{
                                    color: '#c0c0c0',
                                    fontFamily: "Quicksand_500Medium",
                                    paddingLeft: 12
                                }}>Tìm kiếm</Text>
                            <Ionicons name="search-circle-sharp" size={32} color="#1677ff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '15%',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    borderRadius: 50,
                                    backgroundColor: 'white',
                                    padding: 8
                                }}>
                                <MaterialCommunityIcons name="qrcode-scan" size={22} color="#1677ff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <FlatList
                            data={soThanhToanTheoSoDoc?.items}
                            renderItem={PaymentRecordCard}
                            keyExtractor={(data) => data.id}
                            ListEmptyComponent={() => (
                                <View style={styles.emptyContainer}>
                                    <Ionicons
                                        name="md-information-circle"
                                        size={60}
                                        color="black"
                                    />
                                    <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                                        Không tìm thấy dữ liệu
                                    </Text>
                                </View>
                            )}
                        />

                    </View>
                    <Pagination
                        totalItems={soThanhToanTheoSoDoc.totalCount}
                        pageSize={10}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        showLastPageButtons={true}
                        btnStyle={{
                            backgroundColor: "white",
                            borderRadius: 8,
                            borderColor: '#1677ff',
                        }}
                        textStyle={{ fontFamily: "Quicksand_700Bold", color: 'gray' }}
                        activeBtnStyle={{
                            backgroundColor: "white",
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#1677ff',
                        }}
                    />
                </ScrollView>
            </SafeAreaView>
            {/*---------------Search Modal--------------------*/}
            <Modal
                isOpen={showSearchModel}
                onClose={() => setShowSearchModel(false)}
                size="xl"
            >
                <Modal.Content maxWidth="100%" maxH="600">
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Text
                            style={{
                                fontFamily: "Quicksand_700Bold",
                                color: "black",
                                fontSize: 14,
                            }}
                        >
                            Tìm kiếm
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Box alignItems="center" w="100%">
                            <Box w="90%" maxW="400">
                                <VStack space="md">
                                    <Text style={{
                                        fontFamily: "Quicksand_500Medium"
                                    }}>Tên sổ:</Text>
                                    <Box maxW="100%" alignItems="center">
                                        <Input variant="outline" size="md" color="blue.500" onChangeText={handleChange} focusOutlineColor={"blue.600"} value={tenSoDoc} placeholder="Nhập tên sổ" style={{ fontFamily: "Quicksand_500Medium", }} _light={{
                                            bg: "coolGray.100",
                                            _hover: {
                                                bg: "muted.100"
                                            },
                                            _focus: {
                                                bg: "muted.100"
                                            }
                                        }} />
                                    </Box>
                                    <Text fontFamily="Quicksand_500Medium">Ngày tạo sổ:</Text>
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            borderRadius: 5,
                                            flexDirection: 'row',
                                            backgroundColor: '#f5f5f5',
                                            borderWidth: 1,
                                            alignItems: 'center',
                                            borderColor: '#1677ff',
                                            justifyContent: 'flex-start',
                                            paddingVertical: 5,
                                            paddingHorizontal: 8
                                        }}
                                        onPress={() => setShowDatePickerModal(true)}
                                    >
                                        <Ionicons name="calendar-sharp" size={22} color="#1677ff" />
                                        <Text
                                            style={{
                                                color: '#1677ff',
                                                fontFamily: "Quicksand_500Medium",
                                                paddingLeft: 15,
                                                alignItems: 'center'
                                            }}>{moment(createdDate).format("DD/MM/YYYY")}</Text>
                                    </TouchableOpacity>
                                </VStack>
                            </Box>
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 8,
                                paddingVertical: 10,
                                backgroundColor: "#1677ff",
                                borderRadius: 8,
                                alignItems: "center",
                                marginRight: 5,
                            }}
                            onPress={() => {
                                dispatch(getAllSoThanhToan({ currentPage, service }));
                                setTenSoDoc('');
                                setCreateDate(dayjs());
                                setShowSearchModel(false)
                            }}
                        >
                            <AntDesign name="reload1" size={16} color="white" />
                            <Text
                                style={{
                                    fontFamily: "Quicksand_500Medium",
                                    color: "white",
                                    fontSize: 13,
                                    marginLeft: 5
                                }}
                            >
                                Làm mới
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 8,
                                paddingVertical: 10,
                                backgroundColor: "#1677ff",
                                borderRadius: 8,
                                alignItems: "center",
                                marginRight: 5,
                            }}
                            onPress={() => {
                                searchSoThanhToan();
                                setShowSearchModel(false)
                            }}
                        >
                            <AntDesign name="search1" size={16} color="white" />
                            <Text
                                style={{
                                    fontFamily: "Quicksand_500Medium",
                                    color: "white",
                                    fontSize: 13,
                                    marginLeft: 5
                                }}
                            >
                                Tìm kiếm
                            </Text>
                        </TouchableOpacity>
                    </Modal.Footer>

                    {/*---------------Select date Modal--------------------*/}
                    <Modal
                        isOpen={showDatePickerModal}
                        onClose={() => setShowDatePickerModal(false)}
                        size="xl">
                        <Modal.Content maxWidth="100%" maxH="600">
                            <Modal.CloseButton />
                            <Modal.Header>
                                <Text
                                    style={{
                                        fontFamily: "Quicksand_700Bold",
                                        color: "black",
                                        fontSize: 14,
                                    }}
                                >
                                    Chọn ngày tạo sổ
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <Box alignItems="center" w="100%">
                                    <Box w="90%" maxW="400">
                                        <VStack space="md">
                                            <DateTimePicker
                                                value={createdDate}
                                                onValueChange={(date) => {
                                                    setCreateDate(date);
                                                    setShowDatePickerModal(false)
                                                }}
                                                locale='vi-VN'
                                                mode="date"
                                                calendarTextStyle={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                                headerContainerStyle={{
                                                    fontFamily: "Quicksand_500Medium",
                                                }}
                                            />
                                        </VStack>
                                    </Box>
                                </Box>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default PaymentRecordScreen

const styles = StyleSheet.create({
    titleItem: {
        fontWeight: '600',
        fontSize: 17,
        fontFamily: "Quicksand_700Bold",
        marginLeft: 9
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
    },
    pickDateContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderRadius: 5,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})