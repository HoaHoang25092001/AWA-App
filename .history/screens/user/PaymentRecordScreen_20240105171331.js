import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import {
    Modal,
    Box,
    VStack,
    Input,
    FlatList,
    HStack
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { IntlProvider, FormattedNumber } from 'react-intl';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import * as apis from "../../api";


function PaymentRecordScreen({ navigation }) {
    const navigator = useNavigation();
    const isFocused = useIsFocused();
    const [currentPage, setCurrentPage] = useState(1);


    const dispatch = useDispatch()

    const { status } = useSelector(state => state.invoice)
    const { service, setService } = useService([]);
    const [soThanhToanTheoSoDoc, setSoThanhToanTheoSoDoc] = useState([])
    const [showSearchModel, setShowSearchModel] = useState(false)
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("MM-YYYY");
    const [createdDate, setCreateDate] = useState(dayjs());
    const [tenSoDoc, setTenSoDoc] = useState('');
    const [refreshing, setRefreshing] = useState(false);


    //get called on screen loads
    // useEffect(() => {
    //     getData()
    // }, []);
    const onRefresh = React.useCallback(async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log("userId", userId);
            dispatch(getAllSoThanhToan({ currentPage, service, userId })).then((result) => {
                if (result.payload) {
                    console.log("Data hoa don returned:", result.payload);
                    const data = result.payload;
                    setSoThanhToanTheoSoDoc(data);
                } else {
                    console.log("No hoa don returned");
                }
            });
        } catch (error) {
            console.error('Error retrieving user ID:', error);
        }
    });

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const result = await dispatch(getAllSoThanhToan({ currentPage, service, userId }));

            if (result.payload) {
                console.log("Data returned:", result.payload);
                const data = result.payload;
                setSoThanhToanTheoSoDoc(data);
            } else {
                console.log("No data returned");
            }
        } catch (error) {
            console.error('Error retrieving user ID:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isFocused, currentPage, service]);

    const handleRefresh = async () => {
        setTenSoDoc('');
        setCreateDate(dayjs());
        setShowSearchModel(false);

        // Now, fetch the data again after resetting your local state
        await fetchData();
    };

    if (status === 'loading') {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        )
    }

    const handleChange = text => setTenSoDoc(text);

    const searchSoThanhToan = async () => {
        const ngayTaoSoDoc = moment(createdDate).format("DD/MM/YYYY");
        try {
            const nhaMayIdParams = Array.isArray(service)
                ? service.map((nhaMayId) => `nhaMayIds=${nhaMayId}`).join("&")
                : `nhaMayIds=${service}`;
            const response = await apis.apiFilterSoThanhToan(tenSoDoc, ngayTaoSoDoc, nhaMayIdParams, currentPage);
            console.log("Invoice", response.data);
            setSoThanhToanTheoSoDoc(response.data);
            if (response?.statusCode == 201 || response?.statusCode == 200) {
                console.log("Thành công");
            }
        } catch (error) {
            // Handle errors here
            console.log("Thát bại");
            console.error("Error:", error);
        }
    };

    function formatCurrencyVND(number) {
        // Kiểm tra xem đầu vào có phải là một số không
        if (isNaN(number)) {
            return "Invalid input. Please provide a valid number.";
        }

        // Chuyển đổi số thành chuỗi và thêm dấu chấm phẩy
        const formattedNumber = number
            ?.toString()
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
            onPress={() => navigator.navigate('Danh sách hóa đơn', { paymentRecordID: data.id })}
        >
            <Box
                style={{
                    borderRadius: 9,
                    // For iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    // For Android
                    elevation: 5,
                }}
                backgroundColor="white"
                mt={2}
                mb={2}
                mr={4}
                ml={4}
                pl={["5", "4"]}
                pr={["5", "5"]}
                py="2"
            >
                <HStack space={[3, 4]} justifyContent="space-between">
                    <VStack>
                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 8
                            }}>
                                <FontAwesome5 name="file-invoice-dollar" size={20} color="#1677ff" />
                                <Text style={styles.titleItem}>{data.tenSo}</Text>
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
                                }}>{data.soLuongHoaDonDaTT}/{data.tongSoLuongHoaDon} (khách)</Text>
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
                                    {formatCurrencyVND(data.tongSoTienDaThu)}
                                    /{formatCurrencyVND(data.tongSoTienHoaDon)} (VNĐ)
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
                    </VStack>
                </HStack>
            </Box>
        </TouchableOpacity>
    );
    
    return (
        <SafeAreaView style={{ marginBottom: "35%" }}>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: "flex-start",
                alignItems: 'center'
            }}>
                <View style={{
                    paddingLeft: 25
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '400',
                        fontFamily: "Quicksand_700Bold",
                    }}>Hóa đơn</Text>
                </View>
                <View style={{
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
                        <Ionicons name="search-circle-sharp" size={30} color="#1677ff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '15%',
                            alignItems: 'center',
                            marginLeft: 8
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
            </View>
            <FlatList
                data={soThanhToanTheoSoDoc?.items}
                keyExtractor={(data) => data.id.toString()}
                renderItem={PaymentRecordCard}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#9Bd35A", "#689F38"]}
                    />
                }
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="md-information-circle"
                            size={60}
                            color="black"
                        />
                        <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                            Không tìm thấy dữ liệu.
                        </Text>
                    </View>
                )}
            />
            <Pagination
                style={{ marginBottom: 70 }}
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
                            onPress={handleRefresh}
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
        </SafeAreaView>

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