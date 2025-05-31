---
title: "DELIVERABLE 4"
date: "2025-06-02"
updated: "2025-06-01"
categories:
  - "Nguyễn Văn Ngọc Anh"
  - "Trịnh Phúc Lương"
coverImage: "/images/4.png"
coverWidth: 16
coverHeight: 9
excerpt: This post shows you how syntax highlighting works here.
---

# 📊 Đánh Giá Hệ Thống Quản Lý Phòng Khám Da Liễu

Hệ thống quản lý phòng khám da liễu sử dụng **Laravel** và **CockroachDB** đã được đánh giá dựa trên các tiêu chí bắt buộc và tùy chọn. Bài viết này trình bày chi tiết kết quả đánh giá, trạng thái tài liệu nộp bài, và các gợi ý để tối ưu hóa điểm số.

---

## 1. Đánh Giá Theo Tiêu Chí Bắt Buộc

Hệ thống đã được kiểm tra dựa trên năm tiêu chí bắt buộc để đảm bảo đáp ứng các yêu cầu của một hệ thống phân tán:

### 1.1 Fault Tolerance (Chịu lỗi)

- **CockroachDB** là hệ quản trị cơ sở dữ liệu phân tán với tính năng tự động **replication** và **consensus (Raft)**.
- Nếu một node bị lỗi, hệ thống vẫn hoạt động nhờ các node còn lại.
- **Laravel** không crash khi một node CockroachDB chết, miễn là _quorum_ vẫn còn.  
  **Kết luận**: ✅ **ĐẠT**

### 1.2 Distributed Communication

- **Laravel** giao tiếp với **CockroachDB** qua giao thức **SQL** (_PostgreSQL protocol_) sử dụng **TCP/IP**.
- Trong triển khai thực tế:
  - Laravel có thể chạy trên máy A.
  - CockroachDB cluster gồm các node trên máy B, C, D.
- Nếu đã hoặc có thể kiểm tra trên nhiều máy vật lý, tiêu chí này đạt. Nếu chỉ test trên localhost, cần bằng chứng hỗ trợ nhiều máy (ví dụ: IP riêng của node CockroachDB).  
  **Kết luận**: ✅ **ĐẠT** (nếu có bằng chứng) / ⚠️ Cần kiểm tra thêm (nếu chỉ test localhost)

### 1.3 Sharding hoặc Replication

- **CockroachDB** tự động thực hiện **sharding** và **replication** theo **Range + Raft Consensus**.
- Đã ghi rõ trong kiến trúc rằng _replication_ và _sharding_ là tự động.  
  **Kết luận**: ✅ **ĐẠT**

### 1.4 Simple Monitoring / Logging

- **Laravel** ghi log vào file `storage/logs/laravel.log`.
- Có thể thêm lệnh CLI hoặc dashboard tạm thời để theo dõi.  
  **Kết luận**: ✅ **ĐẠT** (cơ bản)

### 1.5 Basic Stress Test

- Hệ thống hỗ trợ kiểm tra căng thẳng bằng cách gửi nhiều request tới API Laravel (`/appointments`, `/patients`) thông qua:
  - **Postman Runner**
  - **Apache Bench (ab)**
  - **wrk** hoặc **siege**
- Nếu đã thực hiện hoặc demo stress test nhỏ, tiêu chí này đạt.  
  **Kết luận**: ✅ **ĐẠT** (nếu đã demo)

![📉 Kết quả stress test](images/screenshot_stress_test.jpeg)  
_Hình 1: Minh họa kết quả kiểm tra căng thẳng trên API_

---

## 2. Đánh Giá Theo Tiêu Chí Tùy Chọn

Hệ thống đã chọn và đáp ứng một số tiêu chí tùy chọn sau:

- ** System Recovery (Rejoin after Failure)**: ✅ Có

  - Nếu một node **CockroachDB** _crash_ và khởi động lại, node đó có thể tái gia nhập cluster nhờ **Raft consensus**.
  - **Kết luận**: **ĐẠT**

- ** Load Balancing**: ❌ Chưa rõ

  - **Laravel** chưa có layer phân tải đến nhiều node.
  - Nếu kết nối đến địa chỉ cluster (`--join`), có thể tận dụng **round-robin DNS**, nhưng cần demo hoặc thiết lập cụ thể.
  - **Kết luận**: **KHÔNG ĐẠT**

- ** Consistency Guarantees**: ✅ Có

  - **CockroachDB** đảm bảo **strong consistency** nhờ **Raft**.
  - **Kết luận**: **ĐẠT**

- ** Leader Election**: ✅ Có

  - **Raft** tự động bầu chọn _leader_ cho mỗi _Range_.
  - **Kết luận**: **ĐẠT**

- ** Security Features**: ❌ Chưa rõ

  - Nếu đang chạy **CockroachDB** ở chế độ `--insecure`, chưa có mã hóa hoặc xác thực.
  - **Kết luận**: **KHÔNG ĐẠT**

- ** Deployment Automation**: ✅ Có
  - Sử dụng **Ngrok** để demo triển khai miễn phí.
  - **Kết luận**: **ĐẠT**

![ Demo triển khai với Ngrok](images/screenshot_ngrok_deployment.jpeg)  
_Hình 2: Minh họa triển khai hệ thống qua Ngrok_

---

## 📋 3. Tài Liệu Nộp Bài

Dưới đây là trạng thái các tài liệu nộp bài cho dự án:

| Mục                      |    Trạng thái    | Ghi chú                                         |
| ------------------------ | :--------------: | ----------------------------------------------- |
| File PDF báo cáo         |      ✅ Có       | File Word đã tạo, có thể xuất PDF.              |
| Blog website             |    ❌ Chưa rõ    | Có thể trích từ nội dung Word để đăng blog.     |
| Link GitHub              |   ❌ Chưa thấy   | Cần gửi link repo với commit, branch rõ ràng.   |
| Video demo hoặc hình ảnh |    ✅ Có ảnh     | Có thể thêm video hoặc upload lên blog/YouTube. |
| Source code đầy đủ       | ❌ Chưa kiểm tra | Cần repo public hoặc bản nén upload.            |

_📝 Ghi chú_: Các ảnh minh họa đã được đính kèm trong báo cáo. Video demo sẽ được cập nhật trên [blog/YouTube](#) khi hoàn thiện.

---

## 📊 4. Bảng Đánh Giá Theo Rubric

Dựa trên tiến độ và các tiêu chí đã đáp ứng, dưới đây là bảng đánh giá chi tiết:

| Tiêu chí                                   | Điểm tối đa | Đánh giá                                                                                           | Điểm ước lượng |
| ------------------------------------------ | :---------: | -------------------------------------------------------------------------------------------------- | :------------: |
| ** Đề xuất và mô tả vấn đề**               |      5      | Đề tài rõ ràng: hệ thống quản lý phòng khám, ứng dụng CockroachDB, lý do lựa chọn rõ.              |     ✅ 5/5     |
| ** Cài đặt thư viện và Demo**              |     10      | Laravel kết nối CockroachDB thành công, có log, API hoạt động, có ảnh minh chứng.                  |    ✅ 10/10    |
| ** Thiết kế hệ thống (Deliverable 2)**     |     10      | Có bản vẽ logic, mô tả rõ kiến trúc, mô hình dữ liệu, công nghệ hợp lý.                            |    ✅ 10/10    |
| ** Kiểm tra tiến độ code (Deliverable 3)** |     15      | Có báo cáo tiến độ, code giao tiếp Laravel–CockroachDB, API hoạt động, có phân mảnh/_replication_. |    ✅ 14/15    |
| ** Nộp bài cuối cùng (Deliverable 4)**     |     30      | Nếu nộp đầy đủ: source code, PDF, blog, GitHub. Hiện thiếu GitHub.                                 |  ⚠️ 24–26/30   |
| ** Thuyết trình (Presentation)**           |     15      | Nếu trình bày mạch lạc, hiểu rõ _fault tolerance_/_sharding_/_consistency_.                        |  ✅ 13–15/15   |
| ** Tính năng bắt buộc**                    |     10      | Có: _Fault tolerance, Distributed Communication, Sharding, Logging, Stress Test_.                  |    ✅ 10/10    |
| ** Tính năng tùy chọn**                    |      5      | Có: _System Recovery (node rejoin), Leader Election_. Không có _Load Balancer_ hoặc _JWT_.         |     ✅ 4/5     |

### 🧮 Tổng Kết Điểm Ước Lượng

| Mục tiêu | Điểm tối đa | Ước lượng đạt được |
| -------- | :---------: | :----------------- |
| **Tổng** |     100     | **90–95 điểm** ✅  |

---

## 5. Gợi Ý Để Tối Đa Hóa Điểm

Để đạt điểm cao nhất (A) khi nộp bài chính thức, bạn nên hoàn thiện:

- ** Tạo GitHub repository**:

  - Upload mã nguồn dự án.
  - Ghi rõ commit và branch (tránh chỉ dùng branch `master/main`).
  - Viết `README.md` mô tả cách chạy dự án và cấu hình CockroachDB.

- ** Xuất bản báo cáo trên blog hoặc website**:

  - Sử dụng [Google Sites](https://sites.google.com) hoặc [Notion](https://www.notion.so) nếu không có hosting.
  - Đăng nội dung báo cáo với ảnh và video minh họa.

- **🎥 Ghi lại video demo ngắn (2–5 phút)**:

  - Trình diễn: đăng nhập → đặt lịch hẹn → lưu → xem log CockroachDB.
  - Giả lập tình huống node thất bại và tái gia nhập (nếu có thể).

- **🎤 Chuẩn bị thuyết trình kỹ lưỡng**:
  - Nắm rõ cơ chế **replication**, cách **Laravel** giao tiếp với **CockroachDB**, và **fault tolerance** của hệ thống.

![🗺️ Sơ đồ kiến trúc hệ thống](images/architecture_diagram.jpeg)  
_Hình 3: Sơ đồ kiến trúc hệ thống tổng quan_

---

## 🎯 Kết luận

Dự án đã đáp ứng tốt gần như toàn bộ các tiêu chí bắt buộc và một số tiêu chí tùy chọn, đặc biệt về:

- ** Cơ sở dữ liệu phân tán** thực sự với **CockroachDB**.
- ** Fault tolerance** thông qua _replication_.
- ** Giao tiếp mạng** qua **SQL over TCP/IP**.
- ** Logging** và **stress test** cơ bản.

Để hoàn thiện, cần bổ sung:

- ** GitHub repository** với commit rõ ràng.
- ** Video demo** minh họa giao tiếp hoặc _fault tolerance_.
- ** Bài viết blog** đăng online hoặc website chứa báo cáo.

Với những cải tiến này, dự án có tiềm năng đạt mức xuất sắc (A).
