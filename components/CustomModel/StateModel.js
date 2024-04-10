import React, { useState } from 'react';
import { Modal } from 'native-base'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Progress, VStack, Center, NativeBaseProvider } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants';

const StateModel = ({ visible, onClose }) => {
    return (
        <View style={styles.centeredView}>
            <Modal isOpen={visible}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Tình hình trạng thái</Modal.Header>
                    <Modal.Body>
                        <View style={{ minHeight: 200, width: 280 }}>
                            <Box w="100%" maxW="400">
                                <VStack space="md">
                                    <VStack space="md">
                                        <Progress colorScheme="lime" value={10} height={2.5} mb={2} />
                                        <Progress colorScheme="secondary" value={20} height={2.5} mb={2} />
                                        <Progress colorScheme="tertiary" value={30} height={2.5} mb={2} />
                                        <Progress colorScheme="warning" value={40} height={2.5} mb={2} />
                                        <Progress colorScheme="green" value={50} height={2.5} mb={2} />
                                        <Progress colorScheme="rose" value={60} height={2.5} mb={2} />
                                        <Progress colorScheme="fuchsia" value={70} height={2.5} mb={2} />
                                        <Progress colorScheme="indigo" value={80} height={2.5} mb={2} />
                                        <Progress colorScheme="lightBlue" value={90} height={2.5} mb={2} />
                                    </VStack>
                                </VStack>
                            </Box>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.closeButtonModel}>
                                <Ionicons name="close" size={18} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Đóng</Text>
                            </View>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default StateModel;

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
        padding: 9
    },
})