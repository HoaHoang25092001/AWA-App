import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Box,
  CheckIcon,
  Select,
  Modal,
  FormControl,
  VStack,
  HStack,
  Button,
  Icon,
  Text,
  Input,
  TextArea,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { IntlProvider, FormattedNumber } from "react-intl";
import { useNavigation } from "@react-navigation/native";
import * as apis from "../../api";
import RNPrint from "react-native-print";


const InvoiceDetailsModal = ({ visible, onClose, setStatusTT, paymentRecordID, statusTT }) => {
  const navigator = useNavigation();
  const { invoice, statusIF, statusCTT, invoiceChuaTTByMaKH } = useSelector((state) => state.invoice);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  // Tìm ngày muộn nhất
  const latestDate = invoiceChuaTTByMaKH?.reduce((latest, item) => {
    return new Date(item?.chiSoDongHo.thangTaoSoDoc.split('/')[1], item?.chiSoDongHo.thangTaoSoDoc.split('/')[0]) < new Date(latest.split('/')[1], latest.split('/')[0]) ? item?.chiSoDongHo.thangTaoSoDoc : latest;
  }, invoiceChuaTTByMaKH[0]?.chiSoDongHo.thangTaoSoDoc);


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

  const calculateInvoice = async () => {
    const payload = {
      tenKhachHang: invoice.tenKhachHang,
      thangTaoHoaDon: invoice.chiSoDongHo.thangTaoSoDoc,
      tuyenDocId: invoice.tenTuyen,
    };
    try {
      const response = await apis.apiTinhTienHoaDon(payload);
      console.log("Invoice", response);
      if (response?.statusCode == 201 || response?.statusCode == 200) {
        setSuccessMessage("Thanh toán hóa đơn thành công");
        setStatusTT(!statusTT);
      }
      // if(response.data.StatusCode == 500 || response.StatusCode == 400) {
      //     setSuccessMessage('Thanh toán hóa đơn thất bại')
      //     console.log("Mess", successMessage)
      // }
    } catch (error) {
      // Handle errors here
      setSuccessMessage("Thanh toán hóa đơn thất bại");
      console.log("mess", successMessage);
      console.error("Error:", error);
    }
  };
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
    const formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    // Trả về chuỗi định dạng tiền tệ VND
    return `${formattedNumber}`;
  }

  const html_1 = `
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
        font-size: 14px;
        line-height: 1.5em;
      }
  
      #top, #mid, #bot {
        border-bottom: 2px solid #EEE;
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
        margin-left: 10;
        margin-right: 10;
        margin-top: 50;
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
        font-size: 14px;
        text-align: center;
      }
  
      #legalcopy {
        margin-top: 5mm;
      }
      #invoice-POS{
        padding:20;
      }
    </style>
  </head>
  <body>
    <div id="invoice-POS">
      <center id="top">
        <div class="info"> 
          <h4>Công ty Cổ phần xây dựng và CN môi trường Việt Nam</h4>
          <h5>
          GIẤY BÁO CHƯA THANH TOÁN TIỀN NƯỚC
    }
          </h5>
        </div>
      </center>
  
      <div id="mid">
        <div class="info">
          <p> 
            Khách hàng: ${invoice.tenKhachHang}</br>
            Mã KH: ${invoice.maKhachHang}</br>
            Địa chỉ: ${invoice.diaChiKhachHang}</br>
            Điện thoại: ${invoice.dienThoaiKhachHang}</br>
            Số hóa đơn: ${invoice.soHoaDon}</br>
            Tiêu thụ: ${invoice.soTieuThu}</br>
            Chỉ số cũ: ${invoice.chiSoCu}</br>
            Chỉ số mới: ${invoice.chiSoMoi}</br>
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
            ${invoice.chiTietHoaDons
      ?.map(
        (value) => `<tr class="service">
            <td class="tableitem"><p class="itemtext">${value.soTieuThu
          }</p></td>
            <td class="tableitem"><p class="itemtext">${formatCurrencyVND(
            value.donGia
          )}</p></td>
            <td class="tableitem"><p class="itemtext">${formatCurrencyVND(
            value.thanhTien
          )}</p></td>
          </tr>`
      )
      .join("")}

            <!-- Add more rows as needed -->
            <tr class="tabletitle">
              <td class="item"><h4>Thành tiền</h4></td>
              <td></td>
              <td class="itemTotal"><h4>${formatCurrencyVND(
        invoice.tongTienTruocVat
      )}</h4></td>
            </tr>
  
            <tr class="tabletitle">
              <td class="Tax"><h4>Thuế GTGT (5%):</h4></td>
              <td></td>
              <td class="itemTax"><h4>${formatCurrencyVND(
        invoice.vat
      )}</h4></td>
            </tr>
  
            <tr class="tabletitle">
              <td class="item"><h4>Tổng tiền</h4></td>
              <td></td>
              <td class="itemTotal"><h4>${formatCurrencyVND(
        invoice.tongTienHoaDon
      )}</h4></td>
            </tr>
          </table>
          <p class="textBold">Tổng tiền bằng chữ: ${chuyenSoSangChu(
        invoice.tongTienHoaDon
      )} đồng</p>
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


  const print_1 = () => {
    return new Promise((resolve) => {
      RNPrint.print({
        html: html_1,
        onPrinted: () => {
          // Hàm này sẽ được gọi khi người dùng nhấn nút in trong thư viện RNPrint
          resolve();
        },
      });
    });
  };

  const selectPrinter = async () => {
    const printer = await selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const handlePrintAndCalculate = async () => {
    await print_1();
    calculateInvoice();

    if (onClose && typeof onClose === "function") {
      onClose(); // Gọi hàm onClose từ props
    }
  };

  const PriceTable = ({ data }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
          borderTopWidth: 1,
          backgroundColor: "#f0f8ff",
        }}
      >
        <Text
          style={{
            fontFamily: "Quicksand_500Medium",
          }}
        >
          {data.soTieuThu}
        </Text>
        <Text
          style={{
            fontFamily: "Quicksand_500Medium",
          }}
        >
          <FormattedNumber
            value={data.donGia}
            style="currency"
            currency="VND" // Đơn vị tiền tệ của Việt Nam
            minimumFractionDigits={1} // Số lượng chữ số phần thập phân tối thiểu
            maximumFractionDigits={1} // Số lượng chữ số phần thập phân tối đa
          />
        </Text>
        <Text
          style={{
            fontFamily: "Quicksand_500Medium",
          }}
        >
          <FormattedNumber
            value={data.thanhTien}
            style="currency"
            currency="VND" // Đơn vị tiền tệ của Việt Nam
            minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
            maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
          />
        </Text>
      </View>
    );
  };
  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      avoidKeyboard
      justifyContent="center"
      bottom="4"
      size="xl"
      closeOnOverlayClick={true}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Thông tin hóa đơn</Modal.Header>
        <Modal.Body>
          <Box alignItems="center" w="100%">
            <Box w="95%" maxW="400">
              <VStack space="md">
                <SafeAreaView>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <IntlProvider locale="vi-VN">
                      {statusIF === "loading" ? (
                        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
                          <ActivityIndicator size="large" color="#0000ff" />
                        </SafeAreaView>
                      ) : (
                        invoice.trangThaiThanhToan == 2 ? (
                          <View
                            style={{
                              width: "100%",
                              borderRadius: 5,
                              padding: 10,
                              backgroundColor: "#f5fffa",
                              marginBottom: 10
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 10,
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                Công ty Cổ phần Xây dựng và CN môi trường Việt Nam
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                Tên khách hàng :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.tenKhachHang}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                Địa chỉ :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.diaChiKhachHang}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                SĐT :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.dienThoaiKhachHang}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                Số hóa đơn :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.soHoaDon}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                Tiêu thụ :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.soTieuThu}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                Chỉ số cũ :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.chiSoCu}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                }}
                              >
                                Chỉ số mới :{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Quicksand_700Bold",
                                }}
                              >
                                {invoice.chiSoMoi}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                marginTop: 5,
                              }}
                            >
                              {invoice?.trangThaiThanhToan === 2 ? (
                                <Ionicons
                                  name="checkbox-outline"
                                  size={18}
                                  color="green"
                                />
                              ) : (
                                <AntDesign
                                  name="closecircleo"
                                  size={18}
                                  color="red"
                                />
                              )}
                              {invoice?.trangThaiThanhToan === 2 ? (
                                <Text
                                  style={{
                                    color: "#5a6a85",
                                    fontFamily: "Quicksand_700Bold",
                                    color: "green",
                                    marginLeft: 5,
                                  }}
                                >
                                  Đã thanh toán
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    color: "#5a6a85",
                                    fontFamily: "Quicksand_700Bold",
                                    color: "red",
                                    marginLeft: 5,
                                  }}
                                >
                                  Chưa thanh toán
                                </Text>
                              )}
                            </View>
                            <View
                              style={{
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 10,
                                padding: 5,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                    fontSize: 13,
                                  }}
                                >
                                  Số lượng{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                    fontSize: 13,
                                  }}
                                >
                                  Đơn giá
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                    fontSize: 13,
                                  }}
                                >
                                  Thành tiền
                                </Text>
                              </View>
                              {invoice.chiTietHoaDons ? (
                                invoice.chiTietHoaDons?.map((item) => (
                                  <PriceTable data={item} key={item.id} />
                                ))
                              ) : (
                                <View style={styles.emptyContainer}>
                                  <Ionicons
                                    name="md-information-circle"
                                    size={60}
                                    color="black"
                                  />
                                  <Text
                                    style={{ fontFamily: "Quicksand_700Bold" }}
                                  >
                                    Không tìm thấy dữ liệu
                                  </Text>
                                </View>
                              )}
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Thành tiền{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  <FormattedNumber
                                    value={invoice.tongTienTruocVat}
                                    style="currency"
                                    currency="VND" // Đơn vị tiền tệ của Việt Nam
                                    minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                    maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                                  />
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Thuế GTGT{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  <FormattedNumber
                                    value={invoice.vat}
                                    style="currency"
                                    currency="VND" // Đơn vị tiền tệ của Việt Nam
                                    minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                    maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                                  />
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Tổng tiền
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  <FormattedNumber
                                    value={invoice.tongTienHoaDon}
                                    style="currency"
                                    currency="VND" // Đơn vị tiền tệ của Việt Nam
                                    minimumFractionDigits={1} // Số lượng chữ số phần thập phân tối thiểu
                                    maximumFractionDigits={1} // Số lượng chữ số phần thập phân tối đa
                                  />
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                {invoice?.trangThaiThanhToan === 2 ? (
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_700Bold",
                                      color: "green",
                                    }}
                                  >
                                    Tổng tiền bằng chữ:{" "}
                                    {chuyenSoSangChu(invoice.tongTienHoaDon)}{" "}
                                    đồng.
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_700Bold",
                                      color: "red",
                                    }}
                                  >
                                    Tổng tiền bằng chữ:{" "}
                                    {chuyenSoSangChu(invoice.tongTienHoaDon)} đồng
                                  </Text>
                                )}
                              </View>

                              <View
                                style={{
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  marginVertical: 20,
                                  alignItems: 'center'
                                }}
                              >
                                {invoice.trangThaiThanhToan === 2 ? (
                                  <View></View>
                                ) : (
                                  <TouchableOpacity
                                    style={{
                                      flexDirection: "row",
                                      padding: 5,
                                      backgroundColor: "lightcyan",
                                      borderRadius: 9,
                                      alignItems: "center",
                                      borderWidth: 1,
                                      marginRight: 5,
                                      borderColor: "#1677ff",
                                      marginBottom: 10
                                    }}
                                    onPress={handlePrintAndCalculate}
                                  >
                                    <AntDesign
                                      name="printer"
                                      size={16}
                                      color="#1677ff"
                                    />
                                    <Text
                                      style={{
                                        fontFamily: "Quicksand_500Medium",
                                        color: "#1677ff",
                                        marginLeft: 5,
                                      }}
                                    >
                                      In hóa đơn
                                    </Text>
                                  </TouchableOpacity>
                                )}
                                {invoice.trangThaiThanhToan === 2 ? (
                                  <View></View>
                                ) : (
                                  <TouchableOpacity
                                    style={{
                                      flexDirection: "row",
                                      padding: 5,
                                      backgroundColor: "lightcyan",
                                      borderRadius: 9,
                                      alignItems: "center",
                                      borderWidth: 1,
                                      marginRight: 5,
                                      borderColor: "#1677ff",
                                    }}
                                    onPress={() => {
                                      navigator.navigate('CustomPrinterUnpaidInvoice', { paymentRecordID: paymentRecordID });
                                      if (onClose && typeof onClose === "function") {
                                        onClose(); // Gọi hàm onClose từ props
                                      }
                                    }}
                                  >
                                    <AntDesign
                                      name="printer"
                                      size={16}
                                      color="#1677ff"
                                    />
                                    <Text
                                      style={{
                                        fontFamily: "Quicksand_500Medium",
                                        color: "#1677ff",
                                        marginLeft: 5,
                                      }}
                                    >
                                      In bluetooh
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  marginVertical: 10,
                                }}
                              >
                                {Platform.OS === "ios" && (
                                  <>
                                    <View />
                                    <TouchableOpacity
                                      style={{
                                        flexDirection: "row",
                                        padding: 5,
                                        backgroundColor: "lightcyan",
                                        borderRadius: 9,
                                        alignItems: "center",
                                        borderWidth: 1,
                                        marginLeft: 5,
                                        borderColor: "#1677ff",
                                      }}
                                      onPress={selectPrinter}
                                    >
                                      <Text
                                        style={{
                                          fontFamily: "Quicksand_500Medium",
                                          color: "#1677ff",
                                        }}
                                      >
                                        Chọn máy in
                                      </Text>
                                    </TouchableOpacity>
                                    <View />
                                    {selectedPrinter ? (
                                      <Text
                                        style={styles.printer}
                                      >{`Selected printer: ${selectedPrinter.name}`}</Text>
                                    ) : undefined}

                                    {invoice.trangThaiThanhToan === 2 ? (
                                      <TouchableOpacity
                                        style={{
                                          flexDirection: "row",
                                          padding: 5,
                                          backgroundColor: "black",
                                          borderRadius: 9,
                                          alignItems: "center",
                                          marginRight: 5,
                                        }}
                                        onPress={() => {
                                          setShowPreviewPrintInvoiceModal(true);
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontFamily: "Quicksand_500Medium",
                                            color: "white",
                                          }}
                                        >
                                          In hóa đơn
                                        </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <TouchableOpacity
                                        style={{
                                          flexDirection: "row",
                                          padding: 5,
                                          backgroundColor: "black",
                                          borderRadius: 9,
                                          alignItems: "center",
                                          marginRight: 5,
                                        }}
                                        onPress={() => {
                                          setShowPreviewPrintInvoiceModal(true);
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontFamily: "Quicksand_500Medium",
                                            color: "white",
                                          }}
                                        >
                                          In hóa đơn
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  </>
                                )}
                              </View>
                            </View>
                          </View>
                        ) : (
                          <View></View>
                        )
                      )}
                      {/** Hoa don chua TT */}
                      {invoiceChuaTTByMaKH?.length > 0 ? (
                        statusCTT === "loading" ? (
                          <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                          </SafeAreaView>
                        ) : (
                          invoiceChuaTTByMaKH?.map((data) => (
                            <View
                              key={data.id}
                              style={{
                                width: "100%",
                                borderRadius: 5,
                                padding: 10,
                                backgroundColor: "#ffe4c4",
                                marginBottom: 10
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 10,
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  Công ty Cổ phần Xây dựng và CN môi trường Việt Nam
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Tên khách hàng :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.tenKhachHang}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Địa chỉ :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.diaChi}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  SĐT :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.dienThoai}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Số hóa đơn :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.keyId}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Tiêu thụ :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.tieuThu}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Chỉ số cũ :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.chiSoDongHo.chiSoCu}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Chỉ số mới :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.chiSoDongHo.chiSoMoi}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                  }}
                                >
                                  Tháng tạo :{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_700Bold",
                                  }}
                                >
                                  {data.chiSoDongHo.thangTaoSoDoc}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  marginTop: 5,
                                }}
                              >
                                {data?.trangThaiThanhToan === 2 ? (
                                  <Ionicons
                                    name="checkbox-outline"
                                    size={18}
                                    color="green"
                                  />
                                ) : (
                                  <AntDesign
                                    name="closecircleo"
                                    size={18}
                                    color="red"
                                  />
                                )}
                                {data?.trangThaiThanhToan === 2 ? (
                                  <Text
                                    style={{
                                      color: "#5a6a85",
                                      fontFamily: "Quicksand_700Bold",
                                      color: "green",
                                      marginLeft: 5,
                                    }}
                                  >
                                    Đã thanh toán
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      color: "#5a6a85",
                                      fontFamily: "Quicksand_700Bold",
                                      color: "red",
                                      marginLeft: 5,
                                    }}
                                  >
                                    Chưa thanh toán
                                  </Text>
                                )}
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  borderWidth: 1,
                                  borderRadius: 5,
                                  marginTop: 10,
                                  padding: 5,
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_700Bold",
                                      fontSize: 13,
                                    }}
                                  >
                                    Số lượng{" "}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_700Bold",
                                      fontSize: 13,
                                    }}
                                  >
                                    Đơn giá
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_700Bold",
                                      fontSize: 13,
                                    }}
                                  >
                                    Thành tiền
                                  </Text>
                                </View>
                                {data.chiTietHoaDonRespondModels ? (
                                  data.chiTietHoaDonRespondModels?.map((item) => (
                                    <PriceTable data={item} key={item.id} />
                                  ))
                                ) : (
                                  <View style={styles.emptyContainer}>
                                    <Ionicons
                                      name="md-information-circle"
                                      size={60}
                                      color="black"
                                    />
                                    <Text
                                      style={{ fontFamily: "Quicksand_700Bold" }}
                                    >
                                      Không tìm thấy dữ liệu
                                    </Text>
                                  </View>
                                )}
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_500Medium",
                                    }}
                                  >
                                    Thành tiền{" "}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_500Medium",
                                    }}
                                  >
                                    <FormattedNumber
                                      value={data.tongTienTruocVat}
                                      style="currency"
                                      currency="VND" // Đơn vị tiền tệ của Việt Nam
                                      minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                      maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                                    />
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_500Medium",
                                    }}
                                  >
                                    Thuế GTGT{" "}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_500Medium",
                                    }}
                                  >
                                    <FormattedNumber
                                      value={data.vat}
                                      style="currency"
                                      currency="VND" // Đơn vị tiền tệ của Việt Nam
                                      minimumFractionDigits={0} // Số lượng chữ số phần thập phân tối thiểu
                                      maximumFractionDigits={0} // Số lượng chữ số phần thập phân tối đa
                                    />
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_500Medium",
                                    }}
                                  >
                                    Tổng tiền
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Quicksand_500Medium",
                                    }}
                                  >
                                    <FormattedNumber
                                      value={data.tongTienHoaDon}
                                      style="currency"
                                      currency="VND" // Đơn vị tiền tệ của Việt Nam
                                      minimumFractionDigits={1} // Số lượng chữ số phần thập phân tối thiểu
                                      maximumFractionDigits={1} // Số lượng chữ số phần thập phân tối đa
                                    />
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    marginTop: 5,
                                  }}
                                >
                                  {data?.trangThaiThanhToan === 2 ? (
                                    <Text
                                      style={{
                                        fontFamily: "Quicksand_700Bold",
                                        color: "green",
                                      }}
                                    >
                                      Tổng tiền bằng chữ:{" "}
                                      {chuyenSoSangChu(data.tongTienHoaDon)}{" "}
                                      đồng.
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{
                                        fontFamily: "Quicksand_700Bold",
                                        color: "red",
                                      }}
                                    >
                                      Tổng tiền bằng chữ:{" "}
                                      {chuyenSoSangChu(data.tongTienHoaDon)} đồng
                                    </Text>
                                  )}
                                </View>

                                {data.chiSoDongHo.thangTaoSoDoc === latestDate && (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      marginVertical: 20,
                                    }}
                                  >
                                    {data.trangThaiThanhToan === 2 ? (
                                      <View></View>
                                    ) : (
                                      <TouchableOpacity
                                        style={{
                                          flexDirection: "row",
                                          padding: 5,
                                          backgroundColor: "lightcyan",
                                          borderRadius: 9,
                                          alignItems: "center",
                                          borderWidth: 1,
                                          marginRight: 5,
                                          borderColor: "#1677ff",
                                        }}
                                        onPress={handlePrintAndCalculate}
                                      >
                                        <AntDesign
                                          name="printer"
                                          size={16}
                                          color="#1677ff"
                                        />
                                        <Text
                                          style={{
                                            fontFamily: "Quicksand_500Medium",
                                            color: "#1677ff",
                                            marginLeft: 5,
                                          }}
                                        >
                                          In hóa đơn
                                        </Text>
                                      </TouchableOpacity>
                                    )}

                                    {data.trangThaiThanhToan === 2 ? (
                                      <View></View>
                                    ) : (
                                      <TouchableOpacity
                                        style={{
                                          flexDirection: "row",
                                          padding: 5,
                                          backgroundColor: "lightcyan",
                                          borderRadius: 9,
                                          alignItems: "center",
                                          borderWidth: 1,
                                          marginRight: 5,
                                          borderColor: "#1677ff",
                                        }}
                                        onPress={() => {
                                          navigator.navigate('CustomPrinterUnpaidInvoice', { paymentRecordID: paymentRecordID });
                                          if (onClose && typeof onClose === "function") {
                                            onClose(); // Gọi hàm onClose từ props
                                          }
                                        }}
                                      >
                                        <AntDesign
                                          name="printer"
                                          size={16}
                                          color="#1677ff"
                                        />
                                        <Text
                                          style={{
                                            fontFamily: "Quicksand_500Medium",
                                            color: "#1677ff",
                                            marginLeft: 5,
                                          }}
                                        >
                                          In bluetooh
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                )}


                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginVertical: 10,
                                  }}
                                >
                                </View>
                              </View>
                            </View>
                          ))
                        )
                      ) : (
                        <View style={styles.emptyContainer}>
                          <Ionicons
                            name="md-information-circle"
                            size={30}
                            color="black"
                          />
                          <Text
                            style={{ fontFamily: "Quicksand_700Bold" }}
                          >
                            Không tìm thấy hóa đơn chưa TT tháng trước đó.
                          </Text>
                        </View>
                      )}
                    </IntlProvider>
                  </ScrollView>
                </SafeAreaView>
              </VStack>
            </Box>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default InvoiceDetailsModal;

const styles = StyleSheet.create({
  titleItem: {
    fontWeight: "600",
    fontSize: 17,
    fontFamily: "Quicksand_700Bold",
    paddingBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
});
