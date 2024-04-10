import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SelectFactoryScreen from "../screens/auth/SelectFactoryScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import PaymentRecordScreen from "../screens/user/PaymentRecordScreen";
import PaymentRecordListScreen from "../screens/user/PaymentRecordListScreen";
import InvoiceInformationScreen from "../screens/user/InvoiceInformationScreen";
import WriteIndex from "../screens/user/WriteIndex";
import WriteIndexDetail from "../screens/user/WriteIndexDetail";
import TestTable from "../screens/user/TestTable";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import plus from "../assets/favicon.png";

import {
  Button,
  Center,
  CheckIcon,
  Image,
  Select,
  Text,
  ToastProvider,
  View,
} from "native-base";
import { logoutUser } from "../store/asyncAction";
import Toast from "react-native-toast-message";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { List } from "react-native-paper";
import * as React from "react";
import { ServiceProvider, useService } from "../ServiceContext";
import {
  useFonts,
  Quicksand_700Bold,
  Quicksand_500Medium,
} from "@expo-google-fonts/quicksand";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import client from "../config/apolloClient";
import store from "../store/store";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanNFCScreen from "../screens/user/ScanNFCScreen";
import HomeScreen from "../screens/user/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import SplashScreen from "react-native-splash-screen";
import WriteIndexDirect from "../screens/user/WriteIndexDirect";
import CustomPrinter from "../components/CustomPrinter/CustomPrinter";
import UnpaidInvoiceScreen from "../screens/user/UnpaidInvoiceScreen";
import ScanQRCodeScreen from "../screens/user/ScanQRCodeScreen";
import DebtInvoice from "../screens/user/DebtInvoice";
import CustomPrinterUnpaidInvoice from "../components/CustomPrinter/CustomPrinterUnpaidInvoice";
import CustomPrinterUnpaidInvoiceByMDL from "../components/CustomPrinter/CustomPrinterUnpaidInvoiceByMDL";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  const name = useSelector((state) => state.auth.name);
  const notification = useSelector((state) => state.auth.noti);
  const nhaMays = useSelector((state) => state.auth.nhaMays);
  const token = useSelector((state) => state.auth.token);
  const route = useRoute();
  const receivedData = route.params?.dataService;
  const { service, setService } = useService();
  console.log("name here", name);
  console.log("tenNhaMay here", nhaMays);
  console.log("Value", service);
  const saveDataToAsyncStorage = async () => {
    try {
      const dataToSave = {
        token: token,
        service: nhaMays,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(dataToSave));
      console.log("Token and Service saved to AsyncStorage");
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };
  useEffect(() => {
    saveDataToAsyncStorage();
  }, []);
  const tabOffsetValue = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          showLabel: false,
          // Floating Tab Bar...
          style: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 40,
            marginHorizontal: 20,
            // Max Height...
            height: 60,
            borderRadius: 10,
            // Shadow...
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name={"Home"}
          component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? "#4B94E3" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Ghi chỉ số"}
          component={WriteIndex}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <Foundation
                  name="clipboard-pencil"
                  size={20}
                  color={focused ? "#4B94E3" : "gray"}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"ScanNFCScreen"}
          component={ScanNFCScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused, navigation }) => (
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: focused ? "#4B94E3" : "#0CE3BC",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="credit-card-scan-outline"
                  size={24}
                  color={focused ? "black" : "gray"}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Hóa đơn"}
          component={PaymentRecordScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <Ionicons
                  name="receipt"
                  size={20}
                  color={focused ? "#4B94E3" : "gray"}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Sự cố"}
          component={SettingsScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  top: 20,
                }}
              >
                <Ionicons
                  name="warning"
                  size={24}
                  color={focused ? "#4B94E3" : "gray"}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Báo cáo sự cố</Text>
    </View>
  );
}
const RootNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="selectfactory" component={SelectFactoryScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen
            name="Trang chủ"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="mydrawer"
            component={MyDrawer}
            options={{ headerShown: false }}
  />*/}
          <Stack.Screen
            name="Danh sách hóa đơn"
            component={PaymentRecordListScreen}
          />
          <Stack.Screen
            name="PaymentRecordScreen"
            component={PaymentRecordScreen}
          />
          <Stack.Screen 
          name="WriteIndex" 
          component={WriteIndex} 
          />
          <Stack.Screen 
          name="WriteIndexDetail" 
          component={WriteIndexDetail} 
          />
          <Stack.Screen 
          name="WriteIndexDirect" 
          component={WriteIndexDirect} 
          />
          <Stack.Screen 
          name="CustomPrinter" 
          component={CustomPrinter} 
          />
          <Stack.Screen
            name="CustomPrinterUnpaidInvoice"
            component={CustomPrinterUnpaidInvoice}
          />
          <Stack.Screen
            name="CustomPrinterUnpaidInvoiceByMDL"
            component={CustomPrinterUnpaidInvoiceByMDL}
          />
          <Stack.Screen
            name="InvoiceInformationScreen"
            component={InvoiceInformationScreen}
          />
          <Stack.Screen 
          name="ScanNFCScreen" 
          component={ScanNFCScreen} 
          />
          <Stack.Screen
            name="Hoa don chua thanh toan"
            component={UnpaidInvoiceScreen}
          />
          <Stack.Screen 
          name="ScanQRCodeScreen" 
          component={ScanQRCodeScreen} 
          />
          <Stack.Screen 
          name="DebtInvoice" 
          component={DebtInvoice} 
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
};

const Routes = () => {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_500Medium,
  });
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });
  if (fontsLoaded) {
    return (
      <ServiceProvider>
        <ApolloProvider client={client}>
          <RootNavigation />
        </ApolloProvider>
      </ServiceProvider>
    );
  }
};
export default Routes;
