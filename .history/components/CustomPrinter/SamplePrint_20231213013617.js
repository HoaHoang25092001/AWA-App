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
import { TouchableOpacity } from "react-native";

const SamplePrint = ({ data }) => {
  const viewShotRef = useRef();
  const webViewRef = useRef();
  const [webViewHeight, setWebViewHeight] = useState(1);

  const chuSo = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const hang = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];

  function docSoBaChuSo(baSo) {
    let tram, chuc, donVi;
    let ketQua = "";
    tram = parseInt(baSo / 100);
    chuc = parseInt((baSo % 100) / 10);
    donVi = baSo % 10;
    if (tram === 0 && chuc === 0 && donVi === 0) return "";
    if (tram !== 0) {
      ketQua += chuSo[tram] + " trăm ";
      if (chuc === 0 && donVi !== 0) ketQua += "linh ";
    }
    if (chuc !== 0 && chuc !== 1) {
      ketQua += chuSo[chuc] + " mươi";
      if (chuc === 0 && donVi !== 0)
        ketQua = ketQua.slice(0, ketQua.length - 1) + "linh ";
    }
    if (chuc === 1) ketQua += "mười ";
    switch (donVi) {
      case 1:
        if (chuc !== 0 && chuc !== 1) {
          ketQua += " mốt";
        } else {
          ketQua += chuSo[donVi];
        }
        break;
      case 5:
        if (chuc === 0) {
          ketQua += chuSo[donVi];
        } else {
          ketQua += " lăm";
        }
        break;
      default:
        if (donVi !== 0) {
          ketQua += " " + chuSo[donVi];
        }
        break;
    }
    return ketQua;
  }
  function chuyenSoSangChu(so) {
    if (so === 0) return chuSo[0];
    let viTri = 0;
    let ketQua = "";
    let soDu;
    while (so > 0) {
      soDu = so % 1000;
      if (soDu !== 0) {
        const baChuSo = docSoBaChuSo(soDu);
        ketQua = baChuSo + " " + hang[viTri] + " " + ketQua;
      }
      so = parseInt(so / 1000);
      viTri++;
    }
    return ketQua.trim().replace(/\s+/g, " ");
  }

  function formatCurrencyVND(number) {
    // Kiểm tra xem đầu vào có phải là một số không
    if (isNaN(number)) {
      return "Invalid input. Please provide a valid number.";
    }

    // Chuyển đổi số thành chuỗi và thêm dấu chấm phẩy
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Trả về chuỗi định dạng tiền tệ VND
    return `${formattedNumber} ₫`;
  }

  const html_2 = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand&display=swap">
    <style>
   
      ::selection {
       
        color: #FFF;
      }
  
      ::moz-selection {
        
        color: #FFF;
      }

      body {
        font-family: 'Quicksand', sans-serif;
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
        font-weight: 500;
        line-height: 2em;
      }
  
      p {
        font-size: 12px;
        line-height: 1.5em;
      }
  
      #top, #mid, #bot {
        border-bottom: 1px solid #EEE;
      }
  
      #top {
        min-height: 100px;
      }
  
      #mid {
        min-height: 50px;
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

      .textBold {
        font-weight: 600;
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
        font-size: 14px;
        width: 24mm;
      }
      .itemTable {
        font-size: 14px;
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
        font-size: 12px;
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
          <h4>Công ty Cổ phần xây dựng và CN môi trường Việt Nam</h4>
          <h5>
          ${data.trangThaiThanhToan === 2 ? 'BIÊN NHẬN ĐÃ THANH TOÁN TIỀN NƯỚC' : 'BIÊN NHẬN CHƯA THANH TOÁN TIỀN NƯỚC'}
          </h5>
        </div><!-- End Info -->
      </center><!-- End InvoiceTop -->
  
      <div id="mid">
        <div class="info">
          <p> 
            Khách hàng: ${data.tenKhachHang}</br>
            Mã KH: ${data.maKhachHang}</br>
            Địa chỉ: ${data.diaChiKhachHang}</br>
            Điện thoại: ${data.dienThoaiKhachHang}</br>
            Số hóa đơn: ${data.soHoaDon}</br>
            Tiêu thụ: ${data.soTieuThu}</br>
            Chỉ số cũ: ${data.chiSoCu}</br>
            Chỉ số mới: ${data.chiSoMoi}</br>
          </p>
        </div>
      </div><!-- End Invoice Mid -->
  
      <div id="bot">
        <div id="table">
          <table>
            <tr class="tabletitle">
              <td class="itemTable"><h4>Số lượng</h4></td>
              <td class="itemTable"><h4>Đơn giá</h4></td>
              <td class="itemTable"><h4>Thành tiền</h4></td>
            </tr>
            ${data.chiTietHoaDons?.map((value) => `<tr class="service">
            <td class="tableitem"><p class="itemtext">${value.soTieuThu}</p></td>
            <td class="tableitem"><p class="itemtext">${formatCurrencyVND(value.donGia)}</p></td>
            <td class="tableitem"><p class="itemtext">${formatCurrencyVND(value.thanhTien)}</p></td>
          </tr>`).join('')}

            <!-- Add more rows as needed -->
            <tr class="tabletitle">
              <td class="item"><h4>Thành tiền</h4></td>
              <td></td>
              <td class="itemTotal"><h4>${formatCurrencyVND(data.tongTienTruocVat)}</h4></td>
            </tr>
  
            <tr class="tabletitle">
              <td class="Tax"><h4>Thuế GTGT:</h4></td>
              <td></td>
              <td class="itemTax"><h4>${data.phiVAT}</h4></td>
            </tr>
  
            <tr class="tabletitle">
              <td class="item"><h4>Tổng tiền</h4></td>
              <td></td>
              <td class="itemTotal"><h4>${formatCurrencyVND(data.tongTienHoaDon)}</h4></td>
            </tr>
          </table>
          <p class="textBold">Tổng tiền bằng chữ: ${chuyenSoSangChu(data.tongTienHoaDon)}.</p>
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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          padding: 5,
          backgroundColor: "#ffefd5",
          borderRadius: 9,
          alignItems: "center",
          borderWidth: 1,
          marginLeft: 5,
          borderColor: "#fa8072",
          justifyContent: 'center'
        }}
        onPress={printBill}
      >
        <Text
          style={{
            fontFamily: "Quicksand_500Medium",
            color: "#fa8072",
            textAlign: 'center'
          }}
        >
          Chụp và in hóa đơn
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={{ height: "100%" }}>
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
            <WebView
              ref={webViewRef} // Pass the ref to the inner WebView
              originWhitelist={["*"]}
              source={{ html: html_2 }}
              style={{ width: "100%", height: 900 }}
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
