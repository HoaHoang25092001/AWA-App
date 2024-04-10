import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants';

const PriceListModel = ({ visible, onClose }) => {
    return (
        <View style={styles.centeredView}>
            <Modal isOpen={visible} >
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Bảng giá</Modal.Header>
                    <Modal.Body>
                        <View style={styles.modelContent}>
                            <View>
                                <Text style={styles.tableHeader}>Mức</Text>
                                <Text style={styles.tableContent}>Mức 1</Text>
                                <Text style={styles.tableContent}>Mức 2</Text>
                            </View>
                            <View>
                                <Text style={styles.tableHeader}>Giá(Đồng/m3)</Text>
                                <Text style={styles.tableContent}>5000</Text>
                                <Text style={styles.tableContent}>7000</Text>
                            </View>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.updateButtonModel}>
                                <Ionicons name="reload-outline" size={18} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Cập Nhật</Text>
                            </View>
                        </TouchableOpacity>
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

export default PriceListModel;

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
        fontWeight: "600",
        fontSize: 23,
        marginBottom: 20
    },
    modelContent: {
        width: 280,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "rgba(0,0,0,0.02)",
        padding: 30,
        borderRadius: 10
    },
    closeButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#FA896B",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 15
    },
    updateButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#71D1F8",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 15
    },
    closeButtonModelText: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        padding: 8,
    },
    tableHeader: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 25
    },
    tableContent: {
        fontSize: 15,
        marginBottom: 15,
        backgroundColor: colors.white,
        paddingVertical: 10,
        color: "#5A6A85",
        fontWeight: "500",
    }
})