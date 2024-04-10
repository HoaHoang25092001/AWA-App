import Routes from "./routes/Routes";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
      "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.",
      "Overriding previous layout animation with new one before the first began: <ABI48_0_0RCTLayoutAnimationGroup: 0x282356220; creatingLayoutAnimation: (null); updatingLayoutAnimation: <ABI48_0_0RCTLayoutAnimation: 0x283631400; duration: 0.350000; delay: 0.000000; property: (null); springDamping: 0.000000; initialVelocity: 0.000000; animationType: 5;>; deletingLayoutAnimation: (null)> -> <ABI48_0_0RCTLayoutAnimationGroup: 0x28234e850; creatingLayoutAnimation: (null); updatingLayoutAnimation: <ABI48_0_0RCTLayoutAnimation: 0x2839b8c00; duration: 0.250000; delay: 0.000000; property: (null); springDamping: 0.000000; initialVelocity: 0.000000; animationType: 5;>; deletingLayoutAnimation: (null)>.",
      ,
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
      "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
    ]);
  }, []);

  return (
    <Provider store={store}>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
    </Provider>
  );
}
