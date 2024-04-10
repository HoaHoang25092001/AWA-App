import { View, Text } from "react-native";
import React from "react";
import { Button, Modal } from "native-base";
import DatePicker, { getToday } from "react-native-modern-datepicker";

const DateTimeCustom = ({
  showDateModal,
  setShowDateModal,
  valueDate,
  setValueDate,
}) => {
  return (
    <View>
      <Modal
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        size="lg"
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="100%" maxH="600">
          <Modal.CloseButton />
          <Modal.Header>Chọn tháng</Modal.Header>
          <Modal.Body>
            <DatePicker
              options={{
                backgroundColor: "#090C08",
                textHeaderColor: "#FFA25B",
                textDefaultColor: "#F6E7C1",
                selectedTextColor: "#fff",
                mainColor: "#F4722B",
                textSecondaryColor: "#D6C7A1",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              current={getToday("dd-MM-yyyy")}
              selected={getToday("dd-MM-yyyy")}
              onDateChange={(valueDate) => setValueDate(valueDate)}
              mode="calendar"
              minuteInterval={30}
              style={{ borderRadius: 10 }}
              locale="vi_VN"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowDateModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowDateModal(false);
                  // Set the selectedDate value to the input when Save is pressed
                  setValueDate(valueDate);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default DateTimeCustom;
