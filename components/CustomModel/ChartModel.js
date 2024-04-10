import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'native-base'
import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants';

const ChartModel = ({ visible, onClose }) => {
    const fill = 'rgb(0, 204, 102)'
    const data = [20, 10, 40, 45, 4, 24, 25, 35, 53, 53, 24, 50, 20, 30]
    return (
        <View style={styles.centeredView}>
            <Modal isOpen={visible} >
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Xem biểu đồ</Modal.Header>
                    <Modal.Body>
                        <Text style={styles.chartHeader}>Biểu đồ sử dụng nước </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 50, height: 20, backgroundColor: 'rgb(0, 204, 102)', marginTop: 10, marginRight: 10 }}></View>
                            <Text> Sản lượng m3</Text>
                        </View>
                        <View style={{ height: 350, width: 280 }}>
                            <BarChart style={{ height: 300, width: 280 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                                <Grid />
                            </BarChart>
                            <XAxis
                                data={data}
                                formatLabel={(value, index) => index}
                                contentInset={{ left: 10, right: 10 }}
                                svg={{ fontSize: 10, fill: 'black' }}
                            />
                        </View>
                        <Text style={styles.modelHeader}>Tháng năm</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.closeButtonModel}>
                                <Ionicons name="close" size={20} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Đóng</Text>
                            </View>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default ChartModel;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "100%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    modelHeader: {
        fontWeight: "500",
        fontSize: 24,
        marginBottom: 40
    },
    chartHeader: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 20
    },
    closeButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#FA896B",
        alignItems: "center",
        borderRadius: 7,
        marginTop: 20
    },
    closeButtonModelText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        padding: 7
    },
})