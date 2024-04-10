import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { getAllSoThanhToan } from '../../store/HoaDon/asyncAction'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useService } from "../../ServiceContext";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";


function PaymentRecordScreen({ navigation }) {
    const navigator = useNavigation();
    const [currentPage, setCurrentPage] = useState(1);


    const dispatch = useDispatch()
    const { soThanhToan, status } = useSelector(state => state.invoice)
    const { service, setService } = useService([]);
    const [soThanhToanTheoSoDoc, setSoThanhToanTheoSoDoc] = useState(soThanhToan)

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
    const PaymentRecordCard = ({ data }) => {
        const createdTimee = moment(data?.createdTime, 'MM/DD/YYYY h:mm:ss A Z').format('MM/DD/YYYY')
        return (
            <TouchableOpacity
                onPress={() => navigator.navigate('Danh sách hóa đơn', { paymentRecordID: data.id })}
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
                        }}>{data.tongSoTienDaThu}/{data.tongSoTienHoaDon} (VNĐ)</Text>
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
                        }}>{createdTimee}</Text>
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
    }
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
                                width: '50%',
                                borderRadius: 50,
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                borderWidth: 1,
                                alignItems: 'center',
                                borderColor: '#1677ff',
                                justifyContent: 'space-between'
                            }}>
                            <Text style={{
                                color: '#5a6a85',
                                fontFamily: "Quicksand_700Bold",
                                paddingLeft: 15
                            }}>Tìm kiếm</Text>
                            <Ionicons name="search-circle-sharp" size={30} color="#1677ff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        {/**<FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                            data={soThanhToan}
                            renderItem={PaymentRecordCard}
                            keyExtractor={(item) => item.id}
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
                            />**/}
                        {soThanhToanTheoSoDoc.items ? soThanhToanTheoSoDoc.items?.map(item => (
                            <PaymentRecordCard data={item} key={item.id} />
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
})