import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../constants";

import CustomInput from "../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../store/asyncAction";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = {
  uri: require("../../assets/NFC.png"),
};

const windowWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const overlayHeight = height / 3;

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [errorSystem, setErrorSystem] = useState("");
  const [tokenSystem, setTokenSystem] = useState("");
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);
  const noti = useSelector((state) => state.auth.noti);
  console.log("Now token:", token);
  console.log("Now noti:", noti);
  useEffect(() => {
    // const checkLoginStatus = async () => {
    //   try {
    //     // Kiểm tra xem có thông tin đăng nhập lưu trữ hay không
    //     const storedData = await AsyncStorage.getItem("userData");
    //     if (storedData) {
    //       const parsedData = JSON.parse(storedData);
    //       const savedToken = parsedData.token;
    //       if (savedToken) {
    //         navigation.navigate("selectfactory");
    //         Toast.show({
    //           type: "success",
    //           text1: "Đăng nhập thành công",
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error checking login status:", error);
    //   }
    // };
    // checkLoginStatus();
    if (token) {
      navigation.navigate("selectfactory");
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
      });
    }
    if (noti) {
      Toast.show({
        type: "success",
        text1: "Đăng xuất thành công",
      });
    }
    console.log("Token System:", token);
  }, [token]);
  const handleSystem = () => {
    setErrorSystem(error);
    console.log("Error Now:", errorSystem);
  };
  const handleToken = () => {
    setTokenSystem(token);

    console.log("System token:", tokenSystem);
  };

  const validateUsername = (username) => {
    if (!username) {
      return "Vui lòng nhập username";
    }
    // Additional validation logic can be added here
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Vui lòng nhập mật khẩu";
    }
    // Additional validation logic can be added here
    return "";
  };

  const loadError = (usernameError, passwordError) => {
    setErrors({
      username: usernameError,
      password: passwordError,
    });
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(credentials));
      const usernameError = validateUsername(credentials.username);
      const passwordError = validatePassword(credentials.password);
      loadError(usernameError, passwordError);
      // If there are validation errors, return without attempting to log in
    } catch (error) {
      // Handle any login errors here
      console.error("Login error:", error);
    }
  };
  useEffect(() => {
    handleSystem();
  }, [error]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg3.png")}
        resizeMode="cover"
        style={{
          width: windowWidth,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Đăng nhập</Text>

          <View style={styles.formContainer}>
            <CustomInput
              placeholder={"Username"}
              placeholderTextColor={colors.muted}
              radius={5}
              icon="person"
              onChangeText={(text) => {
                setCredentials({ ...credentials, username: text });
                setErrors({ ...errors, username: "" }); // Clear the error message
              }}
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
            <CustomInput
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={colors.muted}
              radius={5}
              icon="lock-closed"
              onChangeText={(text) => {
                setCredentials({ ...credentials, password: text });
                setErrors({ ...errors, password: "" }); // Clear the error message
              }}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            {errorSystem ? (
              <Text style={styles.errorText}>{errorSystem}</Text>
            ) : null}
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText} onPress={handleLogin}>
                Đăng nhập
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: { color: "red", marginBottom: 10 },
  overlay: {
    width: "90%",
    height: overlayHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000001A",
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },
  loginButton: {
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1677ff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
});
