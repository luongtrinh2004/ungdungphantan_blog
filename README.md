# 📌 Deliverable 1:

# Đề xuất đề tài và mô tả vấn đề

## 🔹 Đề tài đề xuất

**Xây dựng hệ thống quản lý phòng khám sử dụng BaikalDB**

---

## 🔹 Mô tả vấn đề

Trong các phòng khám hoặc chuỗi phòng khám, việc quản lý hồ sơ bệnh nhân, lịch hẹn, kết quả chuẩn đoán thường phát sinh nhiều dữ liệu và đòi hỏi khả năng truy xuất nhanh chóng, chính xác. Khi số lượng bệnh nhân tăng, việc mở rộng hệ thống quản lý bằng các cơ sở dữ liệu truyền thống sẽ gặp nhiều hạn chế về hiệu năng và khả năng chịu tải.

Đề tài đề xuất sử dụng **BaikalDB** – hệ quản trị cơ sở dữ liệu phân tán hiệu năng cao – để xây dựng một hệ thống quản lý bệnh nhân có thể hoạt động ổn định ngay cả khi dữ liệu ngày càng lớn và yêu cầu truy cập đồng thời cao.

---

## ✅ Câu hỏi 1

### 1.1 Mục đích của BaikalDB

- Quản lý dữ liệu phân tán với hiệu năng cao, độ trễ thấp.
- Hỗ trợ cú pháp và giao thức MySQL giúp dễ tích hợp hệ thống hiện tại.

### 1.2 Vấn đề giải quyết

- Quản lý hàng chục ngàn hồ sơ bệnh nhân với lịch sử khám bệnh, kê đơn, xét nghiệm.
- Đảm bảo khả năng mở rộng khi số lượng phòng khám tăng.
- Hỗ trợ truy vấn dữ liệu nhanh và nhất quán trong thời gian thực.

### 1.3 Điểm mạnh

- Phân tán tự động, mở rộng ngang dễ dàng.
- Hỗ trợ truy vấn SQL chuẩn, dễ sử dụng với người quen MySQL.
- Duy trì tính nhất quán cao (dựa trên Raft).
- Tính sẵn sàng cao nhờ kiến trúc đa bản sao.

### 1.4 Điểm yếu

- Cần kỹ thuật triển khai và giám sát phức tạp hơn MySQL.
- Tài liệu và cộng đồng hỗ trợ chưa phong phú.

### 1.5 So sánh với thư viện khác

| Tiêu chí                  | BaikalDB           | MySQL                | MongoDB        |
| ------------------------- | ------------------ | -------------------- | -------------- |
| Tính nhất quán            | Mạnh (Raft)        | Trung bình           | Yếu (eventual) |
| Mở rộng                   | Dễ (shard tự động) | Khó (shard thủ công) | Tốt            |
| Truy vấn SQL              | Có                 | Có                   | Không đầy đủ   |
| Phù hợp quản lý bệnh nhân | Tốt                | Tốt                  | Kém hơn        |

### 1.6 Ứng dụng thực tế

- Quản lý hồ sơ bệnh nhân điện tử (EMR)
- Lưu trữ đơn thuốc, kết quả xét nghiệm, lịch sử khám
- Truy vấn dữ liệu theo thời gian, bác sĩ, tình trạng bệnh
- Thống kê số lượng khám, bệnh nhân mới theo ngày/tháng

---

## ✅ Câu hỏi 2: Kế hoạch dự kiến bài giữa kỳ

### 🔸 Tên đề tài

**Hệ thống quản lý bệnh nhân cho phòng khám quy mô lớn sử dụng BaikalDB**

### 🔸 Bài toán ứng dụng

- Quản lý hồ sơ bệnh nhân, thông tin cá nhân, tiền sử bệnh.
- Lưu trữ và truy xuất lịch hẹn, đơn thuốc, kết quả xét nghiệm.
- Hệ thống hỗ trợ phân tán dữ liệu theo chi nhánh phòng khám.
- Truy vấn nhanh dữ liệu theo bệnh nhân, ngày, bác sĩ, bệnh.

### 🔸 Tiến độ dự kiến

| Tuần | Công việc                                              |
| ---- | ------------------------------------------------------ |
| 1–2  | Khảo sát bài toán quản lý y tế và tìm hiểu BaikalDB    |
| 3–4  | Thiết kế lược đồ cơ sở dữ liệu và xây dựng cluster mẫu |
| 5–6  | Nhập dữ liệu bệnh nhân mẫu, xây dựng API cơ bản        |
| 7–8  | Kiểm tra hiệu năng, thống kê truy vấn, viết báo cáo    |

---
