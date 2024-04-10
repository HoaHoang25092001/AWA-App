import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Input, Button, Icon } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

function InvoiceInformationScreen({ navigation }) {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 12,
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack('PaymentRecordListScreen')}>
                    <Ionicons name="chevron-back-outline" size={26} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Thông tin hóa đơn</Text>
                <Text></Text>
            </View>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        width: '100%',
                        backgroundColor: '#f8f6e0',
                        paddingVertical: 5
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                marginTop: 10,
                            }}
                        >
                            <Text style={{
                                marginLeft: 10
                            }}>Tên KH:</Text>
                            <Text style={{
                                marginLeft: 5,
                                fontWeight: 'bold'
                            }}>Huỳnh Ngọc Hòa - Phạm Thị Dự</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{
                                    marginLeft: 10
                                }}>Mã KH:</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold'
                                }}>NM_HH_so1003991</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{
                                    marginLeft: 10
                                }}>SĐT:</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold',
                                    color: 'blue',
                                    textDecorationLine: 'underline',
                                    textDecorationStyle: 'solid',
                                    textDecorationColor: 'blue'
                                }}>0834683338</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                marginTop: 10,
                            }}
                        >
                            <Text style={{
                                marginLeft: 10
                            }}>Địa chỉ:</Text>
                            <Text style={{
                                marginLeft: 5,
                                fontWeight: 'bold',
                            }}>Đồng Đanh - Nghĩa Tiến - Đông Lỗ - Hiệp Hòa - Bắc Giangggg.</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{
                                    marginLeft: 10
                                }}>Kỳ hóa đơn:</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold'
                                }}>7/2023</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{
                                    marginLeft: 70
                                }}>Tiêu thụ:</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold',
                                }}>13</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{
                                    marginLeft: 10
                                }}>Chỉ số cũ:</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold'
                                }}>40</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{
                                    marginLeft: 110
                                }}>Chỉ số mới:</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold',
                                }}>53</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                    }}>
                        <DataTable style={{
                            padding: 15
                        }}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title style={styles.tableHeaderTitle}>Số lượng</DataTable.Title>
                                <DataTable.Title>Đơn giá</DataTable.Title>
                                <DataTable.Title>Thành tiền</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>10</DataTable.Cell>
                                <DataTable.Cell>6.571,42857</DataTable.Cell>
                                <DataTable.Cell>65.714</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>3</DataTable.Cell>
                                <DataTable.Cell>8.214,28571</DataTable.Cell>
                                <DataTable.Cell>24.643</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Thành tiền</DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell>90.357</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Thuế GTGT</DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell>4.518</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Tổng tiền</DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell>94.875</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                        <View style={{
                            paddingHorizontal: 30
                        }}>
                            <Text style={{
                                color: 'red',
                                fontStyle: 'italic',
                                fontWeight: 'bold'
                            }}>Tổng tiền bằng chữ: Chín mươi tư nghìn tám trăm bảy mươi lăm đồng.</Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 30
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginTop: 15
                                }}>Ghi chú</Text>
                            <Input size="md" placeholder="Nhập ghi chú" defaultValue='Hoa' />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 30
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginTop: 15
                                }}>Số điện thoại</Text>
                            <Input size="md" placeholder="Nhập ghi chú" defaultValue='0834683338' />
                        </View>
                    </View>
                    <View 
                    style={{
                        paddingHorizontal: 35,
                        marginTop: 15
                    }}>
                        <Button leftIcon={<Icon as={FontAwesome} name="dollar" size="sm" />} colorScheme='amber'>
                            THANH TOÁN
                        </Button>
                    </View>
                    <View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default InvoiceInformationScreen

const styles = StyleSheet.create({
});