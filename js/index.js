const KiemTraGiaKMDauTien = (loaiXe) => {
  switch (loaiXe) {
    case "grabCar":
      return 8000;
      break;
    case "grabSUV":
      return 9000;
      break;
    case "grabBlack":
      return 10000;
      break;
    default:
      "khong tim thay";
      break;
  }
};

const KiemTraGiaKMTu1Den19 = (loaiXe) => {
  switch (loaiXe) {
    case "grabCar":
      return 7500;
      break;
    case "grabSUV":
      return 8500;
      break;
    case "grabBlack":
      return 9500;
      break;
    default:
      "khong tim thay";
      break;
  }
};

const kiemTraGiaKMTu19TroLen = (loaiXe) => {
  switch (loaiXe) {
    case "grabCar":
      return 7000;
      break;
    case "grabSUV":
      return 8000;
      break;
    case "grabBlack":
      return 9000;
      break;
    default:
      "khong tim thay";
      break;
  }
};

const kiemTraGiaPhaiTraKhiCho = (loaiXe) => {
  switch (loaiXe) {
    case "grabCar":
      return 2000;
      break;
    case "grabSUV":
      return 3000;
      break;

    case "grabBlack":
      return 3500;
      break;
    default:
      "khong tim thay";
      break;
  }
};

let arrHoaDon = ["None", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const tinhTienXe = () => {
  let getDivThanhTien = document.querySelector("#divThanhTien");
  getDivThanhTien.style.display = "block";
  //validate loai xe
  let domLoaiXe = document.querySelector("input[name='selector']:checked");
  if (!domLoaiXe) {
    alert("Vui lòng chọn loại xe");
    return;
  }

  let getLoaiXe = document.querySelector(
    "input[name='selector']:checked"
  ).value;

  //lay id xe
  let getIdXe = document.querySelector("input[name='selector']:checked").id;
  console.log(getIdXe);
  let getLableXe = document.querySelector(`label[for='${getIdXe}']`).innerHTML;
  console.log(getLableXe);

  //validate so km
  let getSoKM = document.getElementById("txt-km").value * 1;
  if (!getSoKM) {
    alert("Vui lòng nhập số km");
    return;
  }
  //validate thoi gian cho
  let getThoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  if (getThoiGianCho !== "" && getThoiGianCho < 0) {
    alert("Vui lòng nhập thời gian chờ");
    return;
  }
  let tongTien = 0;

  let tienKMDauTien = KiemTraGiaKMDauTien(getLoaiXe);
  let tien1Den19KM = KiemTraGiaKMTu1Den19(getLoaiXe);
  let tienTu19KMTroLen = kiemTraGiaKMTu19TroLen(getLoaiXe);
  let tienPhatKhiCho = kiemTraGiaPhaiTraKhiCho(getLoaiXe);

  let get1KmTo18km = 0;
  let get19km = 0;
  let tien1kmDen19km = 0;
  let tien19km = 0;
  if (getSoKM <= 19) {
    get1KmTo18km = getSoKM - 1;
    get19km = 0;
    tien1kmDen19km = 0;
    tien19km = (getSoKM - 1) * tien1Den19KM;
    // tinh tien
    tongTien = tienKMDauTien * 1 + (getSoKM - 1) * tien1Den19KM;
    console.log("tongTien", tongTien);
  } else {
    get1KmTo18km = 18;
    get19km = getSoKM - 19;
    tien1kmDen19km = (getSoKM - 19) * tienTu19KMTroLen;
    tien19km = 18 * tien1Den19KM;
    // tinh tien
    tongTien =
      1 * tienKMDauTien + 18 * tien1Den19KM + (getSoKM - 19) * tienTu19KMTroLen;
    console.log("tongTien", tongTien);
  }

  tongTien += Math.ceil(getThoiGianCho / 3) * tienPhatKhiCho - tienPhatKhiCho;

  document.querySelector("#xuatTien").innerHTML =
    tongTien.toLocaleString() + " VND";

  arrHoaDon = [
    getLableXe, //0
    getSoKM, //1
    getThoiGianCho, //2
    tongTien, //3
    tienKMDauTien, //4
    tien1Den19KM, //5
    tienTu19KMTroLen, //6
    tienPhatKhiCho, //7
    get1KmTo18km, //8
    get19km, //9
    tien1kmDen19km, //10
    tien19km, //11
  ];
};

document.querySelector(".btnInHoaDon").onclick = () => {
  $("#exampleModal").modal("toggle");
  let divtable = document.querySelector(".main-table");

  let noiDung = {
    1: `    <!-- table hoa don -->
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" colspan="2">Loại xe</th>
                    <th scope="col">${arrHoaDon[0]}</th>
                    <th scope="col">Số Km: ${arrHoaDon[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="">
                    <td scope="row" class="w-25">Chi tiết</td>
                    <td class="w-25">SỬ DỤNG</td>
                    <td>
                      ĐƠN GIÁ <br />
                      (1000đ)
                    </td>
                    <td>
                      THÀNH TIỀN <br />
                      (1000đ)
                    </td>
                  </tr>
                  <tr class="">
                    <td scope="row">KM đầu tiên</td>
                    <td>1km</td>
                    <td>${arrHoaDon[4]}</td>
                    <td>${arrHoaDon[4]}</td>
                  </tr>
                  <tr class="">
                    <td scope="row">Từ 1km đến 19km</td>
                    <td>${arrHoaDon[8]}km</td>
                    <td>${arrHoaDon[5]}</td>
                    <td>${arrHoaDon[11]}</td>
                  </tr>
                  <tr class="tr-19km">
                    <td scope="row">Từ 19km trở lên</td>
                    <td>${arrHoaDon[9]}km</td>
                    <td>${arrHoaDon[6]}</td>
                    <td>${arrHoaDon[10]}</td>
                  </tr>
                  <tr class="">
                    <td scope="row">Thời gian chờ 3 phút đầu free</td>
                    <td>Thời gian chờ: ${arrHoaDon[2]} phút. </td>
                      <td>${arrHoaDon[7]}</td>
                    <td>${
                      Math.ceil(arrHoaDon[2] / 3) * arrHoaDon[7] -
                        arrHoaDon[7] >=
                      0
                        ? Math.ceil(arrHoaDon[2] / 3) * arrHoaDon[7] -
                          arrHoaDon[7]
                        : 0
                    }</td>
                  </tr>
                  <tr class="">

                    <td scope="row">Tổng tiền:</td>
                     <td scope="row" colspan = "3" class ="text-center">${arrHoaDon[3].toLocaleString()} VND. </td>
                  </tr>
                </tbody>
              </table>
            </div>`,
  };

  divtable.innerHTML = noiDung[1];
};
