import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { Center, Skeleton, VStack } from 'native-base'
import { useDispatch, useSelector } from "react-redux";
import { getAllSoThanhToanBySoDoc, getInvoiceById } from "../../store/HoaDon/asyncAction";
import { useService } from "../../ServiceContext";
import moment from 'moment';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native-paper";
import InvoiceDetailsModal from '../../components/CustomModel/InvoiceDetailsModal';
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { LinearGradient } from "expo-linear-gradient";
import { IntlProvider, FormattedNumber } from 'react-intl';

const { width, height } = Dimensions.get("window")

function PaymentRecordListScreen({ route, navigation }) {
    const { paymentRecordID } = route.params;

    const [paymentRecord, setPaymentRecord] = useState({});
    const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
    const [statusTT, setStatusTT] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()
    const { soThanhToanBySoDoc, statusSTT } = useSelector(state => state.invoice)
    const { invoice } = useSelector(state => state.invoice)
    const { service, setService } = useService([]);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        dispatch(getAllSoThanhToanBySoDoc({ paymentRecordID, currentPage, service }))
        // dispatch(getAllReadingRoutes())
        console.log("Hoa don chi tiet", invoice)
    }, [paymentRecordID, currentPage, service, statusTT])

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
    }
    const PaymentRecordListCard = ({ data }) => {
        const collectedTime = moment(data.ngayThu, 'MM/DD/YYYY h:mm:ss A Z').format('MM/DD/YYYY')
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
                    width: '90%',
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
                <View
                    style={{
                        width: '100%',
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
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        {soThanhToanBySoDoc.items ? soThanhToanBySoDoc.items?.map(item => (
                            <PaymentRecordListCard data={item} key={item.id} />
                        )) : (<View style={styles.emptyContainer}>
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
                        totalItems={soThanhToanBySoDoc.totalCount}
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