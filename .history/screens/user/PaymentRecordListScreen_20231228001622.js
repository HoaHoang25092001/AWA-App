import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, RefreshControl } from 'react-native'
import { Center, Skeleton, Modal, Box, VStack, Input, Select, CheckIcon, FlatList } from 'native-base'
import { useDispatch, useSelector } from "react-redux";
import { getAllSoThanhToanBySoDoc, getInvoiceById, getInvoiceChuaThanhToanByIdKH } from "../../store/HoaDon/asyncAction";
import { useService } from "../../ServiceContext";
import moment from 'moment';
import { Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native-paper";
import InvoiceDetailsModal from '../../components/CustomModel/InvoiceDetailsModal';
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { LinearGradient } from "expo-linear-gradient";
import { IntlProvider, FormattedNumber } from 'react-intl';
import * as apis from "../../api";

const { width, height } = Dimensions.get("window")

function PaymentRecordListScreen({ route, navigation }) {
    const { paymentRecordID } = route.params;

    const [paymentRecord, setPaymentRecord] = useState({});
    const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
    const [statusTT, setStatusTT] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [trangThaiTT, setTrangThaiTT] = useState('');
    const [loading, setLoading] = useState(true);
    const [showSearchModel, setShowSearchModel] = useState(false)
    const [inputSoTieuThu, setInputSoTieuThu] = useState('')
    const [inputTenKH, setInputTenKH] = useState('')
    const [inputSDT, setInputSDT] = useState('')
    const [hoaDonTheoSoDoc, setHoaDonTheoSoDoc] = useState('')

    const dispatch = useDispatch()
    const { soThanhToanBySoDoc, statusSTT } = useSelector(state => state.invoice)
    const { invoice } = useSelector(state => state.invoice)
    const { invoiceChuaTTByMaKH } = useSelector(state => state.invoice)
    const { service, setService } = useService([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const onRefresh = React.useCallback(() => {
        dispatch(getAllSoThanhToanBySoDoc({ paymentRecordID, currentPage, service }))
    });

    useEffect(() => {
        dispatch(getAllSoThanhToanBySoDoc({ paymentRecordID, currentPage, service }))
        // dispatch(getAllReadingRoutes())
    }, [navigation, paymentRecordID, currentPage, service, dispatch, statusTT])

    useEffect(() => {
        setHoaDonTheoSoDoc(soThanhToanBySoDoc)
        // dispatch(getAllReadingRoutes())
        console.log("Hoa don theo so doc", soThanhToanBySoDoc)
    }, [soThanhToanBySoDoc])

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <Center w={width}>
                    <VStack w="90%" mt={10} maxW="400" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200'
                    }}>
                        <Skeleton h="10" />
                        <Skeleton.Text px="1" />
                    </VStack>
                    <VStack w="90%" mt={5} maxW="400" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200'
                    }}>
                        <Skeleton h="10" />
                        <Skeleton.Text px="1" />
                    </VStack>
                    <VStack w="90%" mt={5} maxW="400" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200'
                    }}>
                        <Skeleton h="10" />
                        <Skeleton.Text px="1" />
                    </VStack>
                    <VStack w="90%" mt={5} maxW="400" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200'
                    }}>
                        <Skeleton h="10" />
                        <Skeleton.Text px="1" />
                    </VStack>
                    <VStack w="90%" mt={5} maxW="400" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: 'coolGray.500'
                    }} _light={{
                        borderColor: 'coolGray.200'
                    }}>
                        <Skeleton h="10" />
                        <Skeleton.Text px="1" />
                    </VStack>
                </Center>
            </SafeAreaView>
        );
    }
    // const getDataFromDB = async () => {
    //     for (let index = 0; index < Items.length; index++) {
    //         if (Items[index].id == paymentRecordID) {
    //             await setPaymentRecord(Items[index]);
    //             return;
    //         }
    //     }
    // };

    const getInvoiceInformationById = (id) => {
        dispatch(getInvoiceById(id))
        console.log("Hoa don chi tiet", invoice)
    }

    const getHoaDonChuaThanhToanByIdKH = (maKhachHang) => {
        dispatch(getInvoiceChuaThanhToanByIdKH(maKhachHang))
    }

    const handleChangeTieuThu = (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
        setInputSoTieuThu(numericInput);
    };

    const handleChangeSoDienThoai = (text) => {
        const sdtNumber = text.replace(/[^0-9]/g, '');
        setInputSDT(sdtNumber);
    };

    const handleChangeTenKH = (text) => {
        setInputTenKH(text);
    };

    const searchHoaDon = async () => {
        try {
            const response = await apis.apiFilterHoaDon(inputTenKH, trangThaiTT, inputSoTieuThu, inputSDT, service, paymentRecordID, currentPage);
            console.log("Filterd", response.data);
            setHoaDonTheoSoDoc(response.data)
            if (response?.statusCode == 201 || response?.statusCode == 200) {
                console.log("Thành công");
            }
        } catch (error) {
            // Handle errors here
            console.log("Thát bại");
            console.error("Error:", error);
        }
    }


    const PaymentRecordListCard = ({ data }) => {
        const collectedTime = moment(data.ngayThu, 'MM/DD/YYYY h:mm:ss A Z').format('DD/MM/YYYY')
        const paymentStatus = data?.trangThaiThanhToan === 2 ? (<Text style={{
            color: '#5a6a85',
            fontFamily: "Quicksand_700Bold",
            color: 'green',
            marginLeft: 5
        }}>Đã thanh toán</Text>) : (<Text style={{
            color: '#5a6a85',
            fontFamily: "Quicksand_700Bold",
            color: 'red',
            marginLeft: 5
        }}>Chưa thanh toán</Text>)
        return (
            <View
                style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginVertical: 5,
                    borderRadius: 9,
                    backgroundColor: 'white',
                    // For iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    // For Android
                    elevation: 5,
                }}
            >
                <Text style={styles.titleItem}>{data.tenKhachHang}, {data.diaChi}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: '#5a6a85',
                        fontFamily: "Quicksand_500Medium",
                    }}>Sản lượng: </Text>
                    <Text style={{
                        marginLeft: 5,
                        color: '#5a6a85',
                        fontFamily: "Quicksand_700Bold",
                    }}>{data.tieuThu}</Text>
                </View>
                <IntlProvider locale="vi-VN">
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: '#5a6a85',
                            fontFamily: "Quicksand_500Medium",
                        }}>Tổng tiền: </Text>
                        <Text style={{
                            marginLeft: 5,
                            color: '#5a6a85',
                            fontFamily: "Quicksand_700Bold",
                        }}>
                            <FormattedNumber
                                value={data.tongTienHoaDon}
                                style="currency"
                                currency="VND" // Đơn vị tiền tệ của Việt Nam
                                minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                            />
                        </Text>
                    </View>
                </IntlProvider>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    {data?.trangThaiThanhToan === 2
                        ? (<Text style={{
                            color: 'green',
                            fontFamily: "Quicksand_500Medium",
                        }}>Người thu: </Text>)
                        : (<Text style={{
                            color: 'red',
                            fontFamily: "Quicksand_500Medium",
                        }}>Người thu: </Text>)}

                    {data?.trangThaiThanhToan === 2
                        ? (<Text style={{
                            marginLeft: 5,
                            color: 'green',
                            fontFamily: "Quicksand_700Bold",
                        }}>{data.tenNguoiThuTien}</Text>)
                        : (<Text style={{
                            marginLeft: 5,
                            color: 'red',
                            fontFamily: "Quicksand_700Bold",
                        }}>{data.tenNguoiThuTien}</Text>)}

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    {data?.trangThaiThanhToan === 2
                        ? (<Text style={{
                            color: 'green',
                            fontFamily: "Quicksand_500Medium",
                        }}>Ngày thu: </Text>)
                        : (<Text style={{
                            color: 'red',
                            fontFamily: "Quicksand_500Medium",
                        }}>Ngày thu:</Text>)}

                    {data?.trangThaiThanhToan === 2
                        ? (<Text style={{
                            marginLeft: 5,
                            color: 'green',
                            fontFamily: "Quicksand_700Bold",
                        }}>{collectedTime}</Text>)
                        : (<Text style={{
                            marginLeft: 5,
                            color: 'red',
                            fontFamily: "Quicksand_700Bold",
                        }}> chưa có</Text>)}
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    {data?.trangThaiThanhToan === 2
                        ? (<Ionicons name="checkbox-outline" size={18} color="green" />)
                        : (<AntDesign name="closecircleo" size={18} color="red" />)}
                    {paymentStatus}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setShowInvoiceDetailsModal(true)
                        getInvoiceInformationById(data.id)
                        getHoaDonChuaThanhToanByIdKH(data.maKhachHang)
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        backgroundColor: 'lightcyan',
                        paddingVertical: 10,
                        borderRadius: 5
                    }}>
                    <FontAwesome5 name="file-invoice" size={18} color="#1677ff" />
                    <Text style={{
                        color: '#1677ff',
                        fontFamily: "Quicksand_700Bold",
                        marginLeft: 8
                    }}>Xem hóa đơn</Text>
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        marginVertical: 10
                    }}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Hóa đơn")} style={{
                                    alignItems: 'center',
                                    paddingLeft: 20
                                }}>
                            <Ionicons name="arrow-back-sharp" size={28} color="black" />
                        </TouchableOpacity>
                        <View>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: "Quicksand_700Bold",
                                paddingRight: 30
                            }}>Danh sách</Text>
                        </View>
                        <View>
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
                                alignItems: 'center',
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
                        {hoaDonTheoSoDoc?.items?.length > 0 ? (
                            <FlatList
                                data={hoaDonTheoSoDoc.items}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <PaymentRecordListCard data={item} />}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={["#9Bd35A", "#689F38"]}
                                    />
                                }
                            />
                        ) : (<View style={styles.emptyContainer}>
                            <Ionicons
                                name="md-information-circle"
                                size={60}
                                color="black"
                            />
                            <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                                Không tìm thấy dữ liệu
                            </Text>
                        </View>)}
                    </View>
                    <Pagination
                        totalItems={hoaDonTheoSoDoc.totalCount}
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
                    {/* Models */}
                    <InvoiceDetailsModal id={paymentRecordID} visible={showInvoiceDetailsModal} onClose={() => setShowInvoiceDetailsModal(false)} setStatusTT={setStatusTT} />
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
                                    }}>Tên khách hàng:</Text>
                                    <Box maxW="100%" alignItems="center">
                                        <Input variant="outline" size="md" color="blue.500" focusOutlineColor={"blue.200"} onChangeText={handleChangeTenKH} value={inputTenKH} placeholder="Nhập tên khách hàng" style={{ fontFamily: "Quicksand_500Medium", }} _light={{
                                            bg: "light.50",
                                            _hover: {
                                                bg: "muted.100"
                                            },
                                            _focus: {
                                                bg: "muted.100"
                                            }
                                        }} />
                                    </Box>
                                    <Text fontFamily="Quicksand_500Medium">Trạng thái TT:</Text>
                                    <Box maxW="100%">
                                        <Select
                                            fontFamily="Quicksand_500Medium"
                                            selectedValue={trangThaiTT}
                                            minWidth="150"
                                            accessibilityLabel="--Chọn trạng thái thanh toán--"
                                            placeholder="--Chọn trạng thái thanh toán--"
                                            fontSize={14}
                                            _selectedItem={{
                                                bg: "darkBlue.50",
                                                endIcon: <CheckIcon size="5" />,
                                            }}
                                            mt={0}
                                            pt={0}
                                            onValueChange={(itemValue) => setTrangThaiTT(itemValue)}
                                        >
                                            <Select.Item
                                                fontFamily="Quicksand_500Medium"
                                                label="Đã Thanh Toán"
                                                value="2"
                                            />
                                            <Select.Item
                                                fontFamily="Quicksand_500Medium"
                                                label="Chưa Thanh Toán"
                                                value="1"
                                            />
                                        </Select>
                                    </Box>
                                    <Text style={{
                                        fontFamily: "Quicksand_500Medium"
                                    }}>Tiêu thụ:</Text>
                                    <Box maxW="100%" alignItems="center">
                                        <Input keyboardType="numeric" variant="outline" size="md" color="blue.500" onChangeText={handleChangeTieuThu} focusOutlineColor={"blue.200"} placeholder="Nhập số tiêu thụ" value={inputSoTieuThu} style={{ fontFamily: "Quicksand_500Medium", }} _light={{
                                            bg: "light.50",
                                            _hover: {
                                                bg: "muted.100"
                                            },
                                            _focus: {
                                                bg: "muted.100"
                                            }
                                        }} />
                                    </Box>
                                    <Text style={{
                                        fontFamily: "Quicksand_500Medium"
                                    }}>Số điện thoại:</Text>
                                    <Box maxW="100%" alignItems="center">
                                        <Input keyboardType="numeric" variant="outline" size="md" color="blue.500" onChangeText={handleChangeSoDienThoai} focusOutlineColor={"blue.200"} placeholder="Nhập số điện thoại" value={inputSDT} style={{ fontFamily: "Quicksand_500Medium", }} _light={{
                                            bg: "light.50",
                                            _hover: {
                                                bg: "muted.100"
                                            },
                                            _focus: {
                                                bg: "muted.100"
                                            }
                                        }} />
                                    </Box>
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
                                dispatch(getAllSoThanhToanBySoDoc({ paymentRecordID, currentPage, service }))
                                setInputSoTieuThu('');
                                setInputTenKH('');
                                setInputSDT('');
                                setTrangThaiTT('');
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
                                borderRadius: 5,
                                alignItems: "center",
                                marginRight: 5,
                            }}

                            onPress={() => {
                                searchHoaDon();
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
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default PaymentRecordListScreen

const styles = StyleSheet.create({
    titleItem: {
        fontWeight: '600',
        fontSize: 17,
        fontFamily: "Quicksand_700Bold",
        paddingBottom: 8
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
    },
})