import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Menu, useDisclose, VStack } from "native-base";
import CustomButton from "../CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const MenuButton = ({
  setModalVisible,
  setModalCreated,
  setModalCreatedMuti,
  setOverlayVisible,
  navigation,
}) => {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const { isOpen, onToggle } = useDisclose();
  const handleNavigation = () => {
    navigation.navigate("WriteIndex");
    onToggle();
  };

  return (
    <Menu
      isOpen={isOpen}
      w="200"
      shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
      placement="top right"
      borderRadius={25}
      onPress={() => {
        onToggle();
      }}
      trigger={(triggerProps) => {
        return (
          <Button
            alignSelf="flex-end"
            position={"absolute"}
            style={{
              flexDirection: "column",
              alignSelf: "flex-end",
              top: 500,
            }}
            variant="solid"
            h="50"
            w="50"
            {...triggerProps}
            right={2}
            borderRadius={50}
            onPress={() => {
              onToggle();
            }}
          >
            <Ionicons
              name={"add-outline"}
              size={24}
              style={{ textAlign: "center" }}
              color={"white"}
            />
          </Button>
        );
      }}
    >
      <CustomButton
        text={"Tạo sổ"}
        color={colors.blue_700}
        icon="add-circle-outline"
        onPress={() => {
          setModalCreated(true);
          onToggle();
        }}
      />

      <CustomButton
        text={"Tạo sổ đồng loạt"}
        color={colors.emerald_300}
        icon="add-circle-sharp"
        onPress={() => {
          setModalCreatedMuti(true);
          onToggle();
        }}
      />

      <CustomButton
        text={"Ghi chỉ số"}
        color={colors.danger_500}
        icon="close-circle-outline"
        onPress={handleNavigation}
      />

      <CustomButton
        text={"Bỏ khóa"}
        color={colors.indigo_400}
        icon="key-outline"
      />

      <CustomButton
        text={"Xóa biểu mẫu"}
        color={colors.blue_400}
        icon="trash"
      />

      <CustomButton
        text={"Chốt sổ"}
        color={colors.lightBlue_300}
        icon="checkmark-circle-outline"
      />

      <CustomButton
        text={"Ngừng ghi chỉ số"}
        color={colors.amber_500}
        icon="settings-outline"
      />

      <CustomButton
        text={"Đồng bộ lại"}
        color={colors.indigo_400}
        icon="pencil-outline"
      />

      <CustomButton
        text={"Tiện ích"}
        color={colors.blue_400}
        icon="ellipsis-vertical-outline"
      />

      <CustomButton
        text={"Chỉ số"}
        color={colors.blue_700}
        icon="bar-chart-outline"
        onPress={() => {
          setModalVisible(true);
          onToggle();
        }}
      />
    </Menu>
  );
};

export default MenuButton;
