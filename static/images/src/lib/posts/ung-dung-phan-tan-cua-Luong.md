---
title: 'Giới thiệu về Hệ Thống Phân Tán'
date: '2025-04-28'
coverImage: 'meo.jpg'
description: 'Khái niệm nền tảng, ứng dụng thực tế, các mô hình kiến trúc và các thuật ngữ cơ bản trong hệ thống phân tán.'
published: true
excerpt: Lương đẹp chai.
---

**Tác giả**: Trịnh Phúc Lương  
**MSSV**: 22010064  
**Ngày sáng tác**: 28/04/2025

---

# Hệ thống phân tán là gì?

Hệ thống phân tán (_Distributed System_) là một tập hợp các máy tính độc lập, hoạt động đồng bộ để thực hiện một mục tiêu chung. Các hệ thống này được kết nối với nhau thông qua mạng lưới truyền thông, phối hợp và chia sẻ tài nguyên nhằm tăng hiệu suất, độ tin cậy, và khả năng mở rộng.

Điểm đặc trưng của hệ thống phân tán là đối với người dùng cuối, toàn bộ hệ thống hoạt động như một thể thống nhất, ẩn đi sự phức tạp của các thành phần bên dưới.

![Hệ thống phân tán là gì](/hinh1.jpg)

---

# Các ứng dụng của hệ thống phân tán

Hệ thống phân tán đã và đang được ứng dụng rất rộng rãi trong hầu hết các lĩnh vực công nghệ hiện đại:

- **Mạng xã hội**: Các nền tảng như Facebook, Instagram sử dụng hệ thống phân tán để lưu trữ và phân phối dữ liệu người dùng khổng lồ.
- **Dịch vụ lưu trữ đám mây**: Google Drive, Dropbox cung cấp dịch vụ lưu trữ dữ liệu an toàn, truy cập từ mọi nơi, dựa trên hệ thống phân tán.
- **Dịch vụ streaming**: Netflix, YouTube vận hành hệ thống phân phối nội dung quy mô lớn, đảm bảo trải nghiệm người dùng mượt mà.
- **Thương mại điện tử**: Amazon, Shopee cần hệ thống phân tán để xử lý hàng triệu giao dịch cùng lúc.
- **Thanh toán trực tuyến**: Các hệ thống như PayPal, Stripe sử dụng kiến trúc phân tán để đảm bảo giao dịch nhanh chóng và an toàn.
- **Internet of Things (IoT)**: Các thiết bị IoT như cảm biến thông minh, xe tự lái cũng dựa vào các nền tảng phân tán để xử lý dữ liệu thời gian thực.

---

# Các khái niệm chính của hệ thống phân tán

Để xây dựng và vận hành hệ thống phân tán hiệu quả, cần nắm rõ các khái niệm cơ bản sau:

## Scalability

**Scalability** (Khả năng mở rộng) cho phép hệ thống gia tăng hiệu suất và quy mô bằng cách bổ sung tài nguyên như phần cứng, phần mềm hoặc nhân lực, mà không ảnh hưởng tiêu cực đến hiệu năng.

## Fault Tolerance

**Fault Tolerance** (Khả năng chịu lỗi) là năng lực của hệ thống tiếp tục vận hành ngay cả khi một hoặc nhiều thành phần xảy ra sự cố.

## Availability

**Availability** (Độ sẵn sàng) đảm bảo hệ thống luôn trong trạng thái sẵn sàng phục vụ người dùng bất kỳ lúc nào.

## Transparency

**Transparency** (Tính trong suốt) giúp che giấu sự phức tạp của hệ thống phân tán, làm cho người dùng có cảm giác như đang làm việc với một hệ thống duy nhất.

## Concurrency

**Concurrency** (Tính đồng thời) cho phép nhiều tiến trình, giao dịch diễn ra cùng lúc mà không ảnh hưởng tới nhau.

## Parallelism

**Parallelism** (Tính song song) liên quan đến việc chia nhỏ các tác vụ để thực thi đồng thời, giúp tăng tốc xử lý tổng thể.

## Openness

**Openness** (Tính mở) mô tả khả năng tương thích và mở rộng của hệ thống thông qua chuẩn hóa giao thức và APIs.

## Vertical Scaling

**Vertical Scaling** (Mở rộng theo chiều dọc) nâng cấp phần cứng (RAM, CPU) cho một node duy nhất để tăng hiệu suất.

## Horizontal Scaling

**Horizontal Scaling** (Mở rộng theo chiều ngang) bổ sung nhiều máy chủ (nodes) để phân chia tải và tăng năng lực xử lý.

## Load Balancer

**Load Balancer** (Cân bằng tải) là thành phần phân phối lưu lượng truy cập tới nhiều máy chủ để tối ưu hóa tài nguyên và ngăn chặn quá tải.

## Replication

**Replication** (Sao chép dữ liệu) là việc duy trì nhiều bản sao dữ liệu tại các vị trí khác nhau nhằm tăng độ tin cậy và khả năng phục hồi.

---

# Ví dụ thực tế: Netflix

Netflix là minh họa tiêu biểu về một hệ thống phân tán quy mô toàn cầu:

- **Scalability**: Netflix có thể tự động mở rộng máy chủ khi lượng người xem tăng đột biến.
- **Fault Tolerance**: Khi một server gặp lỗi, lưu lượng người dùng được chuyển hướng ngay lập tức đến server khác.
- **Availability**: Netflix đảm bảo dịch vụ hoạt động liên tục, với tỷ lệ uptime gần như tuyệt đối.
- **Transparency**: Người dùng Netflix không nhận thấy sự phức tạp của hàng nghìn máy chủ phân tán phía sau.
- **Concurrency** và **Parallelism**: Hàng triệu lượt xem video diễn ra đồng thời mà không ảnh hưởng đến chất lượng trải nghiệm.
- **Load Balancer**: Giúp phân phối yêu cầu phát video đến server gần người dùng nhất.
- **Replication**: Nội dung được sao lưu tại nhiều trung tâm dữ liệu toàn cầu.

![Mô hình hoạt động của Netflix](/hinh2.webp)

---

# Kiến trúc của hệ thống phân tán

Các mô hình kiến trúc phổ biến trong thiết kế hệ thống phân tán:

- **Client-Server Architecture**: Mô hình phổ biến với một máy chủ trung tâm phục vụ nhiều máy khách.
- **Peer-to-Peer (P2P) Architecture**: Các nút (nodes) vừa là client vừa là server, chia sẻ tài nguyên lẫn nhau (ví dụ: BitTorrent).
- **Microservices Architecture**: Chia ứng dụng thành nhiều dịch vụ nhỏ, mỗi dịch vụ quản lý một chức năng riêng biệt.
- **Event-Driven Architecture (EDA)**: Hệ thống phản ứng theo các sự kiện bất đồng bộ, rất phù hợp với môi trường phức tạp và phân tán.
- **Serverless Computing**: Ứng dụng hoạt động mà không cần quản lý máy chủ vật lý, sử dụng dịch vụ như AWS Lambda.

![Kiến trúc hệ thống phân tán](/hinh3.webp)

---

# Ví dụ về các mô hình kiến trúc

## Microservices Architecture - Netflix

Netflix sử dụng microservices: mỗi bộ phận (đăng nhập, phát video, đề xuất phim, thanh toán) là một dịch vụ riêng biệt. Điều này giúp họ dễ dàng mở rộng và cập nhật các thành phần độc lập.

## Event-Driven Architecture - Amazon

Amazon sử dụng kiến trúc hướng sự kiện:

- Khi người dùng đặt hàng → sự kiện "OrderPlaced" được kích hoạt.
- Hệ thống lưu trữ, hệ thống thanh toán, và hệ thống kho vận sẽ đồng bộ hoá và phản hồi sự kiện này một cách tự động, nhanh chóng.

---

**Tác giả**: Trịnh Phúc Lương  
**MSSV**: 22010064  
**Ngày viết**: 28/04/2025
