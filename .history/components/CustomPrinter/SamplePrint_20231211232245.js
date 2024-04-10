import React, { useRef, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";
import { hsdLogo } from "./dummy-logo";
import ImageToBase64 from "react-native-image-base64";
import ViewShot from "react-native-view-shot";
import WebView from "react-native-webview";

const SamplePrint = () => {
  const viewShotRef = useRef();
  const webViewRef = useRef();
  const [webViewHeight, setWebViewHeight] = useState(1);
  const html_2 = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <style>
   
      ::selection {
       
        color: #FFF;
      }
  
      ::moz-selection {
        
        color: #FFF;
      }
  
      h1 {
        font-size: 1.5em;
        color: #222;
      }
  
      h2 {
        font-size: 1.5em;
      }
  
      h3 {
        font-size: 1.2em;
        font-weight: 300;
        line-height: 2em;
      }
  
      p {
        font-size: 1.2em;
        line-height: 2em;
      }
  
      #top, #mid, #bot {
        border-bottom: 1px solid #EEE;
      }
  
      #top {
        min-height: 100px;
      }
  
      #mid {
        min-height: 80px;
      }
  
      #bot {
        min-height: 50px;
      }
  
  
      .clientlogo {
        float: left;
        height: 60px;
        width: 60px;
        background-size: 60px 60px;
        border-radius: 50px;
      }
  
      .info {
        display: block;
        margin-left: 0;
      }
  
      .title {
        float: right;
      }
  
      .title p {
        text-align: right;
      }
  
      table {
        width: 100%;
        border-collapse: collapse;
      }
  
      td {
        /*padding: 5px 0 5px 15px;*/
        /*border: 1px solid #EEE*/
      }
  
      .tabletitle {
        /*padding: 5px;*/
        font-size: .7em;
      }
  
  
      .service {
        border-bottom: 1px solid #EEE;
      }
  
      .item {
        font-size: 1.2em;
        width: 24mm;
      }
      .itemTable {
        font-size: 1.2em;
        width: 24mm;
      }
      .itemTax {
        font-size: 1.2em;
        text-align: center;
      }
      .itemTotal {
        font-size: 1.2em;
        text-align: center;
      }
      .Tax {
        font-size: 1.2em;
        width: 24mm;
      }
  
      .itemtext {
        font-size: 1.2em;
        text-align: center;
      }
  
      #legalcopy {
        margin-top: 5mm;
      }
    </style>
  </head>
  <body>
    <div id="invoice-POS">
      <center id="top">
        <div class="info"> 
          <h2>Công ty Cổ phần xây dựng và CN môi trường Việt Nam</h2>
          <h2>BIÊN NHẬN ĐÃ THANH TOÁN TIỀN NƯỚC</h2>
        </div><!-- End Info -->
      </center><!-- End InvoiceTop -->
  
      <div id="mid">
        <div class="info">
          <p> 
            Khách hàng: Trần Thiên Phúc</br>
            Mã KH: KH122</br>
            Địa chỉ: Long An</br>
            Điện thoại: 555-555-5555</br>
            Số hóa đơn: 555_VN_NM</br>
            Chỉ số cũ: 100</br>
            Chỉ số mới: 200</br>
          </p>
        </div>
      </div><!-- End Invoice Mid -->
  
      <div id="bot">
        <div id="table">
          <table>
            <tr class="tabletitle">
              <td class="itemTable"><h2>Số lượng</h2></td>
              <td class="itemTable"><h2>Đơn giá</h2></td>
              <td class="itemTable"><h2>Thành tiền</h2></td>
            </tr>
  
            <tr class="service">
              <td class="tableitem"><p class="itemtext">10</p></td>
              <td class="tableitem"><p class="itemtext">6,515</p></td>
              <td class="tableitem"><p class="itemtext">65,150</p></td>
            </tr>
  
            <!-- Add more rows as needed -->
  
            <tr class="tabletitle">
              <td></td>
              <td class="Tax"><h2>Thuế GTGT (5%):</h2></td>
              <td class="itemTax"><h2>3,286</h2></td>
            </tr>
  
            <tr class="tabletitle">
              <td></td>
              <td class="item"><h2>Tổng tiền</h2></td>
              <td class="itemTotal"><h2>69,000</h2></td>
            </tr>
          </table>
        </div><!-- End Table -->
  
        <div id="legalcopy">
          <p class="legal">
          </p>
        </div>
      </div><!-- End InvoiceBot -->
    </div><!-- End Invoice -->
  </body>
  </html>
      `;

  const printBill = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
      const base64Image = await ImageToBase64.getBase64String(uri);
      await BluetoothEscposPrinter.printPic(base64Image, {
        width: 800,
      });
    } catch (e) {
      alert(e.message || "ERROR");
    }
  };

  const onWebViewLoad = (event) => {
    // Update the height of the WebView once it is loaded
    setWebViewHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <>
      <Button title="Capture and Print" onPress={printBill} />
      <ScrollView>
        <View style={{ height: "100%" }}>
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
            <WebView
              ref={webViewRef} // Pass the ref to the inner WebView
              originWhitelist={["*"]}
              source={{ html: html_2 }}
              style={{ width: "100%", height: 800 }}
            />
          </ViewShot>
        </View>
      </ScrollView>
    </>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
