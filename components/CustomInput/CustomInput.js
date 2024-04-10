import React from "react";
import { StyleSheet, TextInput, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  onFocus,
  radius,
  width = "90%",
  keyboardType,
  maxLength,
  icon,
  onChangeText,
}) => {
  return (
    <View style={{ width: width }}>
      <View style={styles.inputContainer}>
        <Ionicons
          name={icon}
          size={24}
          color={placeholderTextColor}
          style={styles.icon}
        />
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          style={styles.CustomInput}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          borderRadius={radius}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  CustomInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: colors.dark,
  },
});
