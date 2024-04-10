import { View, Text } from "react-native";
import React from "react";
import { Box, Modal, Progress, VStack } from "native-base";

const ChiSoModal = ({ modalVisible, setModalVisible }) => {
  return (
    <View>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Chỉ số</Modal.Header>

          <Modal.Body>
            <Box alignItems="center" w="100%">
              <Box w="90%" maxW="400">
                <VStack space="md">
                  <Progress size={"md"} colorScheme="primary" value={10} />
                  <Text>10%</Text>

                  <Progress size={"md"} colorScheme="warning" value={20} />
                  <Text>20%</Text>
                </VStack>
              </Box>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default ChiSoModal;
