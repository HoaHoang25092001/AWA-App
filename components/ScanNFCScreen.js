import * as React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import { Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import qs from "query-string";
import NfcProxy from "./NfcProxy";

function ScanNFCScreen(props) {
  const { navigation } = props;
  const [enabled, setEnabled] = React.useState(null);
  const padding = 40;
  const width = Dimensions.get("window").width - 2 * padding;

  React.useEffect(() => {
    async function initNfc() {
      try {
        setEnabled(await NfcProxy.isEnabled());
        console.log("NFC is enabled");
        function onBackgroundTag(bgTag) {
          console.log("Tag detail: ", bgTag);
        }

        function onDeepLink(url, launch) {
          try {
            const customScheme = [
              "com.washow.nfcopenrewriter://", // android
              "com.revteltech.nfcopenrewriter://", // ios
            ].find((scheme) => {
              return scheme === url.slice(0, scheme.length);
            });

            if (!customScheme) {
              return;
            }

            url = url.slice(customScheme.length);

            // issue #23: we might have '?' in our payload, so we cannot simply "split" it
            let action = url;
            let query = "";
            let splitIdx = url.indexOf("?");

            if (splitIdx > -1) {
              action = url.slice(0, splitIdx);
              query = url.slice(splitIdx);
            }

            const params = qs.parse(query);
            if (action === "share") {
              const sharedRecord = JSON.parse(params.data);
              if (sharedRecord.payload?.tech === NfcTech.Ndef) {
                navigation.navigate("Main", {
                  screen: "NdefWrite",
                  params: { savedRecord: sharedRecord },
                });
              } else if (
                sharedRecord.payload?.tech === NfcTech.NfcA ||
                sharedRecord.payload?.tech === NfcTech.NfcV ||
                sharedRecord.payload?.tech === NfcTech.IsoDep
              ) {
                navigation.navigate("Main", {
                  screen: "CustomTransceive",
                  params: {
                    savedRecord: sharedRecord,
                  },
                });
              } else {
                console.warn("unrecognized share payload tech");
              }
            }
          } catch (ex) {
            console.warn("fail to parse deep link", ex);
          }
        }

        // get the initial launching tag
        const bgTag = await NfcManager.getBackgroundTag();
        if (bgTag) {
          onBackgroundTag(bgTag);
        } else {
          const link = await Linking.getInitialURL();
          console.warn("DEEP LINK", link);
          if (link) {
            onDeepLink(link, true);
          }
        }

        // listen to other background tags after the app launched
        NfcManager.setEventListener(
          NfcEvents.DiscoverBackgroundTag,
          onBackgroundTag
        );

        // listen to the NFC on/off state
        NfcManager.setEventListener(
          NfcEvents.StateChanged,
          ({ state } = {}) => {
            NfcManager.cancelTechnologyRequest().catch(() => 0);
            if (state === "off") {
              setEnabled(false);
            } else if (state === "on") {
              setEnabled(true);
            }
          }
        );

        Linking.addEventListener("url", (event) => {
          if (event.url) {
            onDeepLink(event.url, false);
          }
        });
      } catch (ex) {
        console.warn(ex);
        Alert.alert("ERROR", "fail to init NFC", [{ text: "OK" }]);
      }
    }

    initNfc();
  }, [navigation]);

  function renderNfcButtons() {
    return (
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Button
          mode="contained"
          onPress={async () => {
            const tag = await NfcProxy.readTag();
            if (tag) {
              Alert.alert("Test oke", "Tag Here:" + tag.id, [{ text: "Oke" }]);
            }
          }}
          style={{ width }}
        >
          SCAN NFC TAG
        </Button>
      </View>
    );
  }

  function renderNfcNotEnabled() {
    return (
      <View
        style={{
          alignItems: "stretch",
          alignSelf: "center",
          width,
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          Your NFC is not enabled. Please first enable it and hit CHECK AGAIN
          button
        </Text>

        <Button
          mode="contained"
          onPress={() => NfcManager.goToNfcSetting()}
          style={{ marginBottom: 10 }}
        >
          GO TO NFC SETTINGS
        </Button>

        <Button
          mode="outlined"
          onPress={async () => {
            //WritePayload("uniqueId");
            //writeNdef('Hello');
            let result = false;

            try {
              // Step 1
              console.log("**********************************************");
              /*await NfcManager.requestTechnology(NfcTech.Ndef, {
            alertMessage: 'Ready to write some NDEF',
          });*/
              await NfcManager.requestTechnology(NfcTech.Ndef);
              console.log("--------------------------------------------");
              let bytes = Ndef.encodeMessage([Ndef.textRecord("Hello NFC")]);
              await NfcManager.ndefHandler.writeNdefMessage(bytes);
              /*if (bytes) {
            await NfcManager.ndefHandler // Step2
              .writeNdefMessage(bytes); // Step3
      
            if (Platform.OS === 'ios') {
              await NfcManager.setAlertMessageIOS('Successfully write NDEF');
            }
          }*/

              result = true;
            } catch (ex) {
              console.warn(ex);
            } finally {
              NfcManager.cancelTechnologyRequest();
            }

            // Step 4
            NfcManager.cancelTechnologyRequest().catch(() => 0);
            return result;
          }}
        >
          CHECK AGAIN
        </Button>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={{ flex: 1, padding }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              padding: 20,
              fontSize: 18,
              textAlign: "center",
              color: "#666",
            }}
          >
            Open Source NFC Reader/Writer App Built On Top Of React Native
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:nfctogo@gmail.com")}
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="email" size={18} color={"#888"} />
            <Text style={{ marginLeft: 6, color: "#888" }}>
              Contact us for any feedback or idea!
            </Text>
          </TouchableOpacity>
        </View>

        <IconButton
          icon={() => <Icon name="cog" size={32} />}
          style={styles.settingIcon}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />

        {enabled ? renderNfcButtons() : renderNfcNotEnabled()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    position: "absolute",
    top: Platform.OS === "android" ? 20 : 0,
    right: 20,
  },
});

export default ScanNFCScreen;
