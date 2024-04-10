const handleModalPicker = () => {
  setModalVisible(true);
  onToggle();
};
export default IconButtonCustom = [
  {
    id: "1",
    label: "Tạo sổ",
    name: "plus-circle",
    bg: "blue.600",
    type: "MaterialCommunityIcons",
    handle: handleModalPicker,
  },
  {
    id: "2",
    label: "Tạo sổ đồng loạt",
    name: "plus-circle-multiple",
    bg: "blue.500",
    type: "MaterialCommunityIcons",
  },
  {
    id: "3",
    label: "Xóa sổ",
    name: "delete",
    type: "MaterialCommunityIcons",
    bg: "red.500",
  },
  {
    id: "4",
    label: "Bỏ khóa",
    name: "vpn-key",
    type: "MaterialIcons",
    bg: "red.500",
  },
  {
    id: "5",
    label: "Xóa biểu mẫu",
    name: "close-circle",
    type: "MaterialCommunityIcons",
    bg: "red.500",
  },
  {
    id: "6",
    label: "Chốt sổ",
    name: "check-circle-outline",
    type: "MaterialCommunityIcons",
    bg: "teal.400",
  },
  {
    id: "7",
    label: "Ngừng ghi chỉ số",
    name: "settings",
    type: "MaterialIcons",
    bg: "indigo.500",
  },
  {
    id: "8",
    label: "Đồng bộ lại",
    name: "edit",
    type: "MaterialIcons",
    bg: "yellow.400",
  },
  {
    id: "9",
    label: "Tiện ích",
    name: "more",
    type: "MaterialCommunityIcons",
    bg: "teal.400",
  },
  {
    id: "10",
    label: "Chỉ số",
    name: "bar-chart",
    type: "MaterialIcons",
    bg: "coolGray.600",
  },
];
