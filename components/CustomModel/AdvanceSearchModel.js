import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, CheckIcon, Select, Modal, FormControl,} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants';

const AdvanceSearchModel = ({ visible, onClose }) => {
    const [service, setService] = useState("");
    const [scope, setScope] = useState("");
    const [region, setRegion] = useState("");
    const [area, setArea] = useState("");

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
                    <Modal.Header>Tìm kiếm nâng cao</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Loại khách hàng</FormControl.Label>
                            <Box maxW="280">
                                <Select selectedValue={service} minWidth="280" height="37" accessibilityLabel="Choose Service" bg="white" placeholder="Loại khách hàng" _selectedItem={{
                                    bg: "white",
                                    endIcon: <CheckIcon size="5" />
                                }} _light={{
                                    bg: "white",
                                    _hover: {
                                        bg: "coolGray.200"
                                    },
                                    _focus: {
                                        bg: "coolGray.200:alpha.70"
                                    }
                                }} _dark={{
                                    bg: "coolGray.800",
                                    _hover: {
                                        bg: "coolGray.900"
                                    },
                                    _focus: {
                                        bg: "coolGray.900:alpha.70"
                                    }
                                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                    <Select.Item label="UX Research" value="ux" color="blue.500" />
                                    <Select.Item label="Web Development" value="web" color="green.500" />
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Phạm vi</FormControl.Label>
                            <Box maxW="280">
                                <Select selectedValue={scope} minWidth="280" height="37" accessibilityLabel="Choose Service" bg="white" placeholder="Phạm vi" _selectedItem={{
                                    bg: "white",
                                    endIcon: <CheckIcon size="5" />
                                }} _light={{
                                    bg: "white",
                                    _hover: {
                                        bg: "coolGray.200"
                                    },
                                    _focus: {
                                        bg: "coolGray.200:alpha.70"
                                    }
                                }} _dark={{
                                    bg: "coolGray.800",
                                    _hover: {
                                        bg: "coolGray.900"
                                    },
                                    _focus: {
                                        bg: "coolGray.900:alpha.70"
                                    }
                                }} mt={1} onValueChange={itemValue => setScope(itemValue)}>
                                    <Select.Item label="UX Research" value="ux" color="blue.500" />
                                    <Select.Item label="Web Development" value="web" color="green.500" />
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Vùng</FormControl.Label>
                            <Box maxW="280">
                                <Select selectedValue={region} minWidth="280" height="37" accessibilityLabel="Choose Service" bg="white" placeholder="Vùng" _selectedItem={{
                                    bg: "white",
                                    endIcon: <CheckIcon size="5" />
                                }} _light={{
                                    bg: "white",
                                    _hover: {
                                        bg: "coolGray.200"
                                    },
                                    _focus: {
                                        bg: "coolGray.200:alpha.70"
                                    }
                                }} _dark={{
                                    bg: "coolGray.800",
                                    _hover: {
                                        bg: "coolGray.900"
                                    },
                                    _focus: {
                                        bg: "coolGray.900:alpha.70"
                                    }
                                }} mt={1} onValueChange={itemValue => setRegion(itemValue)}>
                                    <Select.Item label="UX Research" value="ux" color="blue.500" />
                                    <Select.Item label="Web Development" value="web" color="green.500" />
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Khu vực</FormControl.Label>
                            <Box maxW="280">
                                <Select selectedValue={area} minWidth="280" height="37" accessibilityLabel="Choose Service" bg="white" placeholder="Vùng" _selectedItem={{
                                    bg: "white",
                                    endIcon: <CheckIcon size="5" />
                                }} _light={{
                                    bg: "white",
                                    _hover: {
                                        bg: "coolGray.200"
                                    },
                                    _focus: {
                                        bg: "coolGray.200:alpha.70"
                                    }
                                }} _dark={{
                                    bg: "coolGray.800",
                                    _hover: {
                                        bg: "coolGray.900"
                                    },
                                    _focus: {
                                        bg: "coolGray.900:alpha.70"
                                    }
                                }} mt={1} onValueChange={itemValue => setRegion(itemValue)}>
                                    <Select.Item label="UX Research" value="ux" color="blue.500" />
                                    <Select.Item label="Web Development" value="web" color="green.500" />
                                </Select>
                            </Box>
                        </FormControl>
                        <Text style={styles.modelTitleField}>Ngày đọc từ</Text>
                        <TouchableOpacity
                            style={styles.dateReadStart}
                            onPress={handleOnPressStartDate}
                        >
                            <Text style={{ marginLeft: 15 }}>{selectedStartDate}</Text>
                        </TouchableOpacity>
                        <Text style={styles.modelTitleField}>Đến</Text>
                        <TouchableOpacity
                            style={styles.dateReadStart}
                            onPress={handleOnPressEndDate}
                        >
                            <Text style={{ marginLeft: 15 }}>{selectedEndDate}</Text>
                        </TouchableOpacity>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.searchButtonModel}>
                                <Ionicons name="search-outline" size={16} color="#1677FF" style={styles.icon} />
                                <Text style={styles.searchButtonModelText}>Tìm kiếm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.clearButtonModel}>
                                <Ionicons name="reload-outline" size={16} color={colors.white} style={styles.icon} />
                                <Text style={styles.closeButtonModelText}>Xóa  điều kiện TK</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.closeButtonModel}>
                                <Ionicons name="close" size={16} color={colors.white} style={styles.icon} />
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
            </Modal>
        </View>
    );
};

export default AdvanceSearchModel;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
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
        fontSize: 24
    },
    modelTitleField: {
        marginTop: 20,
        marginBottom: 5,
        color: "#000000E0",
        textAlign: "left"
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
    clearButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#5D87FF",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonModel: {
        width: 280,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#FA896B",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20
    },
    closeButtonModelText: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        padding: 7
    },
    searchButtonModelText: {
        color: "#1677FF",
        textAlign: "center",
        fontSize: 14,
        padding: 7
    },
    dateReadStart: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        height: 35,
        fontSize: 18,
        justifyContent: "center",
        width: 280
    },
})