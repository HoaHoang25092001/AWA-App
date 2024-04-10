import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { TextArea, Modal, FormControl, } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants';

const ImportFileModel = ({ visible, onClose }) => {
    const [openStartMonthPicker, setOpenStartMonthPicker] = useState(false);
    const [photo, setPhoto] = useState(null);

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'DD/MM/YYYY');
    const [selectedStartDate, setSelectedStartDate] = useState("")
    const [startedDate, setStartedDate] = useState("06/08/2023")

    const handleChangeStartDate = (propDate) => {
        setStartedDate(propDate)
    }
    const handleOnPressStartMonth = () => {
        setOpenStartMonthPicker(!openStartMonthPicker)
    }
    const handleChoosePhoto = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            console.log(result);
            setPhoto(result.assets[0].uri);
            upload();
        }
    };
    return (
        <View style={styles.centeredView}>
            <Modal isOpen={visible} closeOnOverlayClick={true}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Nhập tệp</Modal.Header>
                    <Modal.Body>
                        <Text style={styles.label}>Chọn tệp</Text>
                        <Button title="Chọn tệp từ máy" color="#FFAE1F" onPress={handleChoosePhoto} />
                        {photo && (
                            <TouchableOpacity style={styles.imageHolder} onPress={handleChoosePhoto}>
                                <Image
                                    source={{ uri: photo }}
                                    style={{ width: 200, height: 200 }}
                                />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.label}>Chọn tháng</Text>
                        <TouchableOpacity
                            style={styles.monthReadStart}
                            onPress={handleOnPressStartMonth}
                        >
                            <Text style={{ marginLeft: 15 }}>07/2023</Text>
                        </TouchableOpacity>
                        <Text style={styles.label}>Dữ liệu chỉ số trong tệp</Text>
                        <TextArea h={20} placeholder="Dữ liệu chỉ số trong tệp" w="280" maxW="300" mt={2} />\
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.updateButtonModel}>
                                <Ionicons name="reload-outline" size={16} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Cập nhật</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.closeButtonModel}>
                                <Ionicons name="close" size={20} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Đóng</Text>
                            </View>
                        </TouchableOpacity>
                    </Modal.Footer>

                    {/*Create model for start date */}
                    <Modal
                        transparent={true}
                        isOpen={openStartMonthPicker}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode='monthYear'
                                    minimumDate={startDate}
                                    selected={startedDate}
                                    onDateChange={handleChangeStartDate}
                                    onSelectedChange={date => setSelectedStartDate(date)}
                                    options={{
                                        backgroundColor: "#080516",
                                        textHeaderColor: "#469ab6",
                                        textDefaultColor: "#FFFFFF",
                                        selectedTextColor: "#FFF",
                                        mainColor: "#469ab6",
                                        textSecondaryColor: "#FFFFFF",
                                        borderColor: 'rgba(122, 146, 165, 0.1)'
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={handleOnPressStartMonth}
                                >
                                    <View style={styles.closeButtonModel}>
                                        <Text style={styles.closeButtonModelText}>Đóng</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default ImportFileModel;

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
        padding: 20,
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
    modelContent: {
        width: 280,

    },
    closeButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#FE896B",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    updateButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#71D1F8",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    closeButtonModelText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        padding: 7
    },
    tableHeader: {
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 30
    },
    tableContent: {
        fontSize: 16,
        marginBottom: 30
    },
    monthReadStart: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        height: 40,
        fontSize: 18,
        justifyContent: "center",
        width: 280,
        marginBottom: 10
    },
    label: {
        marginBottom: 10,
        marginTop: 20,
        fontSize: 16,
    }
})