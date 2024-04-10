import React, { useState } from 'react';
import { FormControl, Modal } from 'native-base'
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants';


const WaterUseSituation = ({ visible, onClose }) => {
    const [numberContract, onChangeNumberContract] = useState('');
    const [customerCode, onChangeCustomerCode] = useState('');
    const [customerName, onChangeCustomerName] = useState('');
    const [route, onChangeRoute] = useState('');
    const [address, onChangeAddress] = useState('');
    const [recordEmployee, onChangeRecordEmployee] = useState('');

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'DD/MM/YYYY');
    const endDate = getFormatedDate(today.setDate(today.getDate() + 1), 'DD/MM/YYYY');
    const [selectedStartDate, setSelectedStartDate] = useState("")
    const [selectedEndDate, setSelectedEndDate] = useState("")
    const [startedDate, setStartedDate] = useState("06/08/2023")
    const [endedDate, setEndedDate] = useState("06/08/2023")

    const handleChangeStartDate = (propDate) => {
        setStartedDate(propDate)
    }
    const handleChangeEndDate = (propDate) => {
        setEndedDate(propDate)
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker)
    }
    const handleOnPressEndDate = () => {
        setOpenEndDatePicker(!openEndDatePicker)
    }
    return (

        <View style={styles.centeredView}>
            <Modal isOpen={visible} closeOnOverlayClick={true}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Xem tình hình sử dụng nước</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Số HĐ</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeNumberContract}
                                value={numberContract}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Mã Kh</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeCustomerCode}
                                value={customerCode}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Từ ngày</FormControl.Label>
                            <TouchableOpacity
                                style={styles.dateReadStart}
                                onPress={handleOnPressStartDate}
                            >
                                <Text style={{ marginLeft: 15 }}>{selectedStartDate}</Text>
                            </TouchableOpacity>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Đến ngày</FormControl.Label>
                            <TouchableOpacity
                                style={styles.dateReadStart}
                                onPress={handleOnPressEndDate}
                            >
                                <Text style={{ marginLeft: 15 }}>{selectedEndDate}</Text>
                            </TouchableOpacity>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Tên khách hàng</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeCustomerName}
                                value={customerName}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Tuyến đọc</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeRoute}
                                value={route}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Địa chỉ</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeAddress}
                                value={address}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Nhân viên ghi</FormControl.Label>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeRecordEmployee}
                                value={recordEmployee}
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.searchButtonModel}>
                                <Ionicons name="search-outline" size={18} color="#1677FF" style={styles.icon} />
                                <Text style={styles.searchButtonModelText}>Tìm kiếm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.exportButtonModel}>
                                <Ionicons name="bar-chart-outline" size={18} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Xuất biểu đồ nước</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.saveButtonModel}>
                                <Ionicons name="save-outline" size={18} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Lưu biểu đồ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.closeButtonModel}>
                                <Ionicons name="close" size={18} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Đóng</Text>
                            </View>
                        </TouchableOpacity>
                    </Modal.Footer>

                    {/*Create model for start date */}
                    <Modal
                        transparent={true}
                        isOpen={openStartDatePicker}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode='calender'
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
                                    onPress={handleOnPressStartDate}
                                >
                                    <View style={styles.closeButtonModel}>
                                        <Text style={styles.closeButtonModelText}>Đóng</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/*Create model for end date */}
                    <Modal
                        transparent={true}
                        isOpen={openEndDatePicker}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode='calender'
                                    minimumDate={endDate}
                                    selected={endedDate}
                                    onDateChange={handleChangeEndDate}
                                    onSelectedChange={date => setSelectedEndDate(date)}
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
                                    onPress={handleOnPressEndDate}
                                >
                                    <View style={styles.closeButtonModel}>
                                        <Text style={styles.closeButtonModelText}>Đóng</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Modal.Content>
            </Modal >
        </View >
    )
}

export default WaterUseSituation;

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
    modelTitleField: {
        marginTop: 20,
        marginBottom: 5
    },
    input: {
        height: 35,
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 4,
        width: 280
    },
    closeButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.warning_500,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    closeButtonModelText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        padding: 8
    },
    dateReadStart: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        height: 40,
        fontSize: 18,
        justifyContent: "center",
        width: 280
    },
    closeButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.warning_500,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    saveButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#7D94FF",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    exportButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#0CE3BC",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    searchButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.white,
        alignItems: "center",
        borderRadius: 6,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#1677FF"
    },
    closeButtonModelText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        padding: 7
    },
    searchButtonModelText: {
        color: "#1677FF",
        textAlign: "center",
        fontSize: 16,
        padding: 7
    },
})