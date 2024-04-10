import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BluetoothManager } from "react-native-bluetooth-escpos-printer";
import {
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import ItemList from "./ItemList";
import SamplePrint from "./SamplePrint";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider, FormattedNumber } from "react-intl";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

const CustomPrinter = ({ route, navigation }) => {
  const { invoice } = useSelector((state) => state.invoice);
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [boundAddress, setBoundAddress] = useState("");

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      (err) => {
        err;
      }
    );

    if (Platform.OS === "android") {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadPaired(rsp);
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundEvent(rsp);
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          console.log("Bluetooth connection lost");
          setName("");
          setBoundAddress("");
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show(
            "Device Not Support Bluetooth !",
            ToastAndroid.LONG
          );
        }
      );
    }

    console.log(pairedDevices.length);
    if (pairedDevices.length < 1) {
      scan();
      console.log("scanning...");
    } else {
      const firstDevice = pairedDevices[0];
      console.log("length  :" + pairedDevices.length);
      console.log(firstDevice);
      connect(firstDevice);

      // connect(firstDevice);
      // console.log(pairedDevices.length + "hello");
    }
  }, [pairedDevices]);
  // deviceFoundEvent,pairedDevices,scan,boundAddress
  // boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan

  const deviceAlreadPaired = useCallback(
    (rsp) => {
      var ds = null;
      if (typeof rsp.devices === "object") {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices]
  );
  // const deviceAlreadPaired = useCallback(
  //   async rsp => {
  //     try {
  //       var ds = null;
  //       if (typeof rsp.devices === 'object') {
  //         ds = rsp.devices;
  //       } else {
  //         try {
  //           ds = JSON.parse(rsp.devices);
  //         } catch (e) {}
  //       }
  //       if (ds && ds.length) {
  //         let pared = pairedDevices;
  //         if (pared.length < 1) {
  //           pared = pared.concat(ds || []);
  //         }
  //         setPairedDevices(pared);
  //       }
  //     } catch (error) {
  //       // Handle any errors that occurred during the asynchronous operations
  //       console.error(error);
  //     }
  //   },
  //   [pairedDevices],
  // );

  const deviceFoundEvent = useCallback(
    (rsp) => {
      var r = null;
      try {
        if (typeof rsp.device === "object") {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs]
  );

  // const connect = (row) => {
  //   setLoading(true);
  //   BluetoothManager.connect(row.address).then(
  //     (s) => {
  //       setLoading(false);
  //       setBoundAddress(row.address);
  //       setName(row.name || "UNKNOWN");
  //       console.log("Connected to device:", row.name);
  //     },
  //     (e) => {
  //       setLoading(false);
  //       alert(e);
  //     }
  //   );
  // };
  const connect = async (row) => {
    try {
      setLoading(true);
      await BluetoothManager.connect(row.address);
      setLoading(false);
      setBoundAddress(row.address);
      setName(row.name || "UNKNOWN");
      console.log("Đã kết nối với thiết bị:", row);
    } catch (e) {
      setLoading(false);
      console.error("Lỗi kết nối:", e);
      // Ghi nhật ký thông tin lỗi cụ thể
      console.log("Mã Lỗi:", e.code);
      console.log("Thông Báo Lỗi:", e.message);
    }
  };

  const unPair = (address) => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      (s) => {
        setLoading(false);
        setBoundAddress("");
        setName("");
      },
      (e) => {
        setLoading(false);
        alert(e);
      }
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      (s) => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      (er) => {
        setLoading(false);
        // ignore
      }
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: "HSD bluetooth meminta izin untuk mengakses bluetooth",
          message:
            "HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer",
          buttonNeutral: "Lain Waktu",
          buttonNegative: "Tidak",
          buttonPositive: "Boleh",
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const scanBluetoothDevice = async () => {
    setLoading(true);
    try {
      const request = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (
        request["android.permission.ACCESS_FINE_LOCATION"] === RESULTS.GRANTED
      ) {
        scanDevices();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <IntlProvider locale="vi-VN">
      <ScrollView style={styles.container}>
        {!bleOpend && (
          <Text style={styles.bluetoothInfo}>Hãy bật bluetooth của bạn</Text>
        )}
        <Text style={styles.sectionTitle}>
          Máy in được kết nối tới ứng dụng:
        </Text>
        {boundAddress.length > 0 && (
          <ItemList
            label={name}
            value={boundAddress}
            onPress={() => unPair(boundAddress)}
            actionText="Disconnect"
            color="#E9493F"
          />
        )}
        {boundAddress.length < 1 && (
          <Text style={styles.printerInfo}>
            Chưa có máy in nào được kết nối.
          </Text>
        )}
        <Text style={styles.sectionTitle}>
          Bluetooth được kết nối đến điện thoại này:
        </Text>
        {loading && <ActivityIndicator animating={true} />}
        <View style={styles.containerList}>
          {pairedDevices.map((item, index) => {
            return (
              <ItemList
                key={index}
                onPress={() => connect(item)}
                label={item.name}
                value={item.address}
                connected={item.address === boundAddress}
                actionText="Connect"
                color="#00BCD4"
              />
            );
          })}
        </View>
        <SamplePrint data={invoice} />
        <Button onPress={() => scanBluetoothDevice()} title="Scan Bluetooth" />
      </ScrollView>
    </IntlProvider>
  );
};

export default CustomPrinter;
