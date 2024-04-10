import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
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
import * as apis from "../../api";
import { useNavigation } from "@react-navigation/native";
// import { apiTinhTienHoaDon } from '../../api/user';
import Toast from "react-native-toast-message";

const InvoiceDetailsModal = ({ id, visible, onClose, setStatusTT }) => {
  const navigator = useNavigation();
  const { invoice } = useSelector((state) => state.invoice);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewPrintInvoiceModal, setShowPreviewPrintInvoiceModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  console.log("du lieu", invoice);
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
      }
      // if(response.data.StatusCode == 500 || response.StatusCode == 400) {
      //     setSuccessMessage('Thanh toán hóa đơn thất bại')
      //     console.log("Mess", successMessage)
      // }
      setStatusTT(true);
    } catch (error) {
      // Handle errors here
      setSuccessMessage("Thanh toán hóa đơn thất bại");
      console.log("mess", successMessage);
      console.error("Error:", error);
    }
  };


  const print_1 = () => {
    console.log("hello");
  };
  const print_2 = () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    console.log("hello");
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
                      <View
                        style={{
                          width: "100%",
                          borderRadius: 5,
                          padding: 10,
                          backgroundColor: "#f5fffa",
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
                              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
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
                              {invoice.vat}
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
                                {chuyenSoSangChu(invoice.tongTienHoaDon)} đồng.
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
                              flexDirection: "row",
                              justifyContent: "center",
                              marginVertical: 20,
                            }}
                          >
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
                                  navigator.navigate('CustomPrinter', { invoiceID: id });
                                  if (onClose && typeof onClose === "function") {
                                    onClose(); // Gọi hàm onClose từ props
                                  }
                                }}
                              >
                                <AntDesign
                                  name="printer"
                                  size={16}
                                  color="white"
                                />
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                    color: "white",
                                    marginLeft: 5,
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
                                  backgroundColor: "#fa8072",
                                  borderRadius: 9,
                                  alignItems: "center",
                                  marginRight: 5,
                                }}
                                onPress={() => {
                                  setShowPreviewPrintInvoiceModal(true)
                                }}
                              >
                                <AntDesign
                                  name="printer"
                                  size={16}
                                  color="white"
                                />
                                <Text
                                  style={{
                                    fontFamily: "Quicksand_500Medium",
                                    color: "white",
                                    marginLeft: 5,
                                  }}
                                >
                                  In hóa đơn
                                </Text>
                              </TouchableOpacity>
                            )}

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
                              onPress={() => setShowConfirmModal(true)}
                            >
                              <MaterialIcons
                                name="payment"
                                size={16}
                                color="#1677ff"
                              />
                              <Text
                                style={{
                                  fontFamily: "Quicksand_500Medium",
                                  color: "#1677ff",
                                }}
                              >
                                Thanh toán
                              </Text>
                            </TouchableOpacity>
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
                                      borderWidth: 1,
                                      marginLeft: 5,
                                      borderColor: "#1677ff",
                                    }}
                                    onPress={print_1}
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
                                      borderWidth: 1,
                                      marginLeft: 5,
                                      borderColor: "#1677ff",
                                    }}
                                    onPress={print_2}
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
                    </IntlProvider>
                  </ScrollView>
                </SafeAreaView>
              </VStack>
            </Box>
          </Box>
        </Modal.Body>
      </Modal.Content>

      {/**---------------Confirm-TT-Modal-------------------------*/}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        size="md"
      >
        <Modal.Content maxWidth="90%" maxH="600">
          <Modal.CloseButton />
          <Modal.Header>
            <Text
              style={{
                fontFamily: "Quicksand_700Bold",
                color: "black",
                fontSize: 14,
              }}
            >
              Thanh toán hóa đơn
            </Text>
          </Modal.Header>
          <Modal.Body>
            <View>
              <Text
                style={{
                  fontFamily: "Quicksand_500Medium",
                  color: "#1677ff",
                  fontSize: 13,
                }}
              >
                Bạn muốn thanh toán hóa đơn này chứ ?
              </Text>
              <Text
                style={{
                  fontFamily: "Quicksand_500Medium",
                  color: "#1677ff",
                  fontSize: 13,
                }}
              >
                Đồng ý, Hãy nhấn xác nhận.
              </Text>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  padding: 5,
                  backgroundColor: "#ff6347",
                  borderRadius: 5,
                  alignItems: "center",
                  marginRight: 5,
                }}
                onPress={() => {
                  setShowConfirmModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    color: "white",
                    fontSize: 13,
                  }}
                >
                  Hủy thanh toán
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  padding: 5,
                  backgroundColor: "lightcyan",
                  borderRadius: 5,
                  alignItems: "center",
                  borderWidth: 1,
                  marginLeft: 5,
                  borderColor: "#1677ff",
                }}
                onPress={() => {
                  setShowConfirmModal(false);
                  calculateInvoice();
                  if (onClose && typeof onClose === "function") {
                    onClose(); // Gọi hàm onClose từ props
                  }
                }}
              >
                <Text
                  style={{
                    fontFamily: "Quicksand_500Medium",
                    color: "#1677ff",
                    fontSize: 13,
                  }}
                >
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/*---------------PreviewPrintInvoiceModal--------------------*/}
      <Modal
        isOpen={showPreviewPrintInvoiceModal}
        onClose={() => setShowPreviewPrintInvoiceModal(false)}
        size="md"
        >
        <Modal.Content maxWidth="90%" maxH="600">
          <Modal.CloseButton />
          <Modal.Header>
            <Text
              style={{
                fontFamily: "Quicksand_700Bold",
                color: "black",
                fontSize: 14,
              }}
            >
              Xem hóa đơn trước khi in
            </Text>
          </Modal.Header>
        </Modal.Content>
      </Modal>
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
