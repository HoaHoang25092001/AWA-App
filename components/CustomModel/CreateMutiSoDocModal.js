import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Center,
  Checkbox,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { View } from "react-native";
import { useService } from "../../ServiceContext";
import AccordionCreateMuti from "../AcordionCustom/AcordionCreateMuti";
import TableCreateMuti from "../TableList/TableCreateMuti";
const CreateMutiSoDocModal = ({
  modalCreateMuti,
  setModalCreatedMuti,
  data,
  loading,
  canBoDocData,
  service,
  kyGCSData,
}) => {
  const canBoDocs = canBoDocData ? canBoDocData.GetUsers.nodes : [];
  const [selectedKyGhi, setSelectedKyGhi] = useState("");
  const [dataHopDong, setDataHopDong] = useState();
  return (
    <View>
      <Modal
        isOpen={modalCreateMuti}
        onClose={() => setModalCreatedMuti(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Tạo sổ đồng loạt</Modal.Header>

          <Modal.Body>
            <VStack space={3}>
              <AccordionCreateMuti
                dataHopDong={dataHopDong}
                setDataHopDong={setDataHopDong}
                canBoDocs={canBoDocs}
                service={service}
                kyGCSData={kyGCSData}
                setSelectedKyGhi={setSelectedKyGhi}
                selectedKyGhi={selectedKyGhi}
              />
              <TableCreateMuti data={dataHopDong} loading={loading} />
            </VStack>
            <Center>
              <FormControl w="90%" maxW="300px">
                <FormControl.Label>Cán bộ đọc</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl w="90%" maxW="300px">
                <FormControl.Label>Tên sổ</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl w="90%" maxW="300px">
                <FormControl.Label>Kỳ ghi chỉ số</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl w="90%" maxW="300px">
                <FormControl.Label>Ngày hóa đơn</FormControl.Label>
                <Button
                  variant="outline"
                  size="md"
                  colorScheme={"gray"}
                  onPress={() => setShowDateModalMuti(true)}
                ></Button>
              </FormControl>
              <FormControl w="90%" maxW="300px">
                <FormControl.Label>Ngày đầu kỳ</FormControl.Label>
                <Button
                  variant="outline"
                  size="md"
                  colorScheme={"gray"}
                  onPress={() => setShowDateModalMuti(true)}
                ></Button>
              </FormControl>
              <FormControl w="90%" maxW="300px">
                <FormControl.Label>Ngày cuối kỳ</FormControl.Label>
                <Button
                  variant="outline"
                  size="md"
                  colorScheme={"gray"}
                  onPress={() => setShowDateModalMuti(true)}
                ></Button>
              </FormControl>
              <HStack space={2} mt={10}>
                <Checkbox value="one">Tạo biểu mẫu</Checkbox>
                <Checkbox value="two">Ghi chỉ số online</Checkbox>
              </HStack>
              <Checkbox mt={3} mb={2} value="three">
                Không SD kỳ
              </Checkbox>
            </Center>
            <VStack space={2} alignItems="center">
              <Button
                variant={"solid"}
                w={"90%"}
                style={{ backgroundColor: "#0ce3bc" }}
                leftIcon={
                  <Icon as={MaterialIcons} name="picture-as-pdf" size="sm" />
                }
              >
                Xuất bảng kê
              </Button>
              <Button
                variant={"solid"}
                w={"90%"}
                style={{ backgroundColor: "#5d87ff" }}
                leftIcon={
                  <Icon as={MaterialIcons} name="add-circle" size="sm" />
                }
              >
                Tạo sổ và tạo tiếp
              </Button>
              <Button
                variant={"solid"}
                w={"90%"}
                style={{ backgroundColor: "#5d87ff" }}
                leftIcon={
                  <Icon as={MaterialIcons} name="add-circle" size="sm" />
                }
              >
                Tạo sổ và đóng
              </Button>
              <Button
                colorScheme={"solid"}
                w={"90%"}
                style={{ backgroundColor: "#fa896b" }}
                leftIcon={<Icon as={MaterialIcons} name="close" size="sm" />}
                onPress={() => {
                  setModalCreatedMuti(false);
                }}
              >
                Đóng
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default CreateMutiSoDocModal;
