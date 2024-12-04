/* eslint-disable */

class RSA {
  constructor() {
    this.TaoKhoa();
  }

  //hàm kiểm tra số nguyên tố
  KiemTraNguyenTo(i) {
    if (i < 2) return false;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) return false;
    }
    return true;
  }

  //hàm tạo khóa
  TaoKhoa() {
    // hàm random số có 2 chữ số
    const rd = () => Math.floor(Math.random() * (101 - 11) + 11);
    do {
      //random số p có 2 chữ số và kiểm tra xem có phải là số nguyên tố không
      //tiếp tục random cho đến khi nào p là số nguyên tố thì dừng
      this.p = rd();
    } while (!this.KiemTraNguyenTo(this.p));

    do {
      //random số q có 2 chữ số và kiểm tra xem có phải là số nguyên tố không
      //tiếp tục random cho đến khi nào q là số nguyên tố thì dừng
      this.q = rd();
    } while (!this.KiemTraNguyenTo(this.q));

    //tính n = p * q
    this.n = this.p * this.q;

    do {
      //random số e có 2 chữ số và kiểm tra xem có phải là số nguyên tố không, và e phải nguyên tố cùng nhau với (p-1)*(q-1)
      //tiếp tục random cho đến khi nào e là số nguyên tố và nguyên tố cùng nhau với (p-1)*(q-1) thì dừng
      this.e = Math.floor(Math.random() * (100 - 2) + 2);
    } while (
      !this.KiemTraNguyenTo(this.e) ||
      !this.NguyenToCungNhau(this.e, (this.p - 1) * (this.q - 1))
    );

    let k = 1;
    while (true) {
      //tìm d sao cho (k*(p-1)*(q-1)+1) chia hết cho e
      if ((k * (this.p - 1) * (this.q - 1) + 1) % this.e === 0) {
        this.d = (k * (this.p - 1) * (this.q - 1) + 1) / this.e; //d là khoá bí mật
        break;
      }
      k++;
    }
  }

  //hàm kiểm tra 2 số có phải là nguyên tố cùng nhau không
  NguyenToCungNhau(a, b) {
    //hàm tìm ước chung lớn nhất
    const GCD = (x, y) => {
      while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
      }
      return x;
    };
    //nếu ước chung lớn nhất của 2 số là 1 thì 2 số đó là nguyên tố cùng nhau, return true, ngược lại return false
    return GCD(a, b) === 1;
  }

  //hàm tính m^e mod n
  Mod(m, e, n) {
    let kq = 1;
    m = m % n;
    while (e > 0) {
      if (e % 2 === 1) {
        kq = (kq * m) % n;
      }
      e = e >> 1;
      m = (m * m) % n;
    }
    return kq;
  }

  //hàm mã hoá
  MaHoa(s) {
    //chuyển từng ký tự sang mã ASCII
    const nguyen = Array.from(s).map((c) => c.charCodeAt(0));
    // mã hoá từng ký tự trong nguyen theo công thức m^e mod n
    const a = nguyen.map((n) => this.Mod(n, this.e, this.n));
    //chuyển mã ASCII sang chuỗi
    const str = String.fromCharCode(...a);
    //chuyển chuỗi sang mã base64
    return btoa(unescape(encodeURIComponent(str)));
  }

  //hàm giải mã
  GiaiMa(s) {
    //giải mã base64
    const giaima = decodeURIComponent(escape(atob(s)));
    //chuyển từng ký tự sang mã ASCII
    const b = Array.from(giaima).map((c) => c.charCodeAt(0));
    //giải mã từng ký tự trong b theo công thức m^d mod n
    const c = b.map((n) => this.Mod(n, this.d, this.n));
    //chuyển mã ASCII sang chuỗi
    return String.fromCharCode(...c);
  }
}

import CryptoJs from "crypto-js";
//hàm băm md5
function ComputeMd5Hash(input) {
  return CryptoJs.MD5(input).toString(CryptoJs.enc.Hex);
}

export { RSA, ComputeMd5Hash };
