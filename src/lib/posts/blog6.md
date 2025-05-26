---
title: "Blog 6: Ôn Luyện Thi Cuối Kỳ - Hệ Phân Tán"
date: "2025-05-26"
categories:
  - "distributed-system"
  - "exam-review"
  - "blog"
coverImage: "/images/blog6.jpg"
excerpt: Ôn thiiii
---

# Ôn Luyện Thi Cuối Kỳ - Hệ Phân Tán

## Câu 1: Hệ thống tập trung, phân tán, phi tập trung khác nhau như thế nào? Ví dụ và cách phân biệt

### Hệ thống tập trung (Centralized)

- Mọi xử lý, lưu trữ và điều phối nằm tại một máy chủ trung tâm.
- Người dùng phải kết nối đến server này để sử dụng dịch vụ.
- **Ví dụ:** Hệ thống ngân hàng truyền thống, website sử dụng một server duy nhất.

### Hệ thống phân tán (Distributed)

- Gồm nhiều máy tính độc lập, kết nối qua mạng, phối hợp xử lý chung.
- Các node có thể cùng chia sẻ dữ liệu và tài nguyên.
- **Ví dụ:** Google Search, Netflix, hệ thống lưu trữ HDFS.

### Hệ thống phi tập trung (Decentralized)

- Không có máy chủ trung tâm; các node đều ngang hàng, tự xử lý và ra quyết định.
- Thường dùng thuật toán đồng thuận để hoạt động đồng bộ.
- **Ví dụ:** Blockchain (Bitcoin, Ethereum), mạng BitTorrent.

### Khác biệt chính

- **Tập trung:** có một điểm điều phối duy nhất.
- **Phân tán:** nhiều node phối hợp nhưng có thể có nút chủ.
- **Phi tập trung:** không có nút điều phối, các node độc lập hoặc đồng thuận.

## Câu 2: Các đặc tính của hệ phân tán và giải thích từng đặc điểm

#### 1. Tính minh bạch (Transparency)

- Che giấu sự phức tạp phân tán với người dùng.
- Gồm nhiều dạng: minh bạch về vị trí, truy cập, di chuyển, lỗi, sao chép, đồng thời, thực thi.
- Ví dụ: Người dùng truy cập tập tin nhưng không biết nó đang nằm ở máy chủ nào.

#### 2. Tính mở rộng (Scalability)

- Hệ thống có thể mở rộng về kích thước (thêm node), địa lý (kết nối xa), và quản lý (số lượng user).
- Giải pháp: dùng cache, sharding, phân mảnh dịch vụ.

#### 3. Tính chịu lỗi (Fault Tolerance)

- Hệ thống tiếp tục hoạt động khi có lỗi ở một số node.
- Cơ chế dự phòng, sao lưu và phát hiện lỗi rất quan trọng.

#### 4. Đồng thời (Concurrency)

- Nhiều tiến trình chạy song song, truy cập tài nguyên cùng lúc.
- Cần quản lý truy cập đồng thời để tránh xung đột.

#### 5. Không có đồng hồ toàn cục (No Global Clock)

- Các node không thể đồng bộ hoàn toàn thời gian.
- Dẫn đến cần đồng hồ logic (Lamport, vector clock) để xác định thứ tự sự kiện.

#### 6. Tính độc lập (Autonomy)

- Mỗi node có thể hoạt động độc lập, quản lý tài nguyên riêng.
- Cho phép linh hoạt khi mở rộng và quản trị.

#### 7. Khó duy trì trạng thái toàn cục

- Do dữ liệu và trạng thái phân tán nên việc thống nhất trạng thái toàn hệ thống rất phức tạp.
- Cần dùng các kỹ thuật đồng bộ hoặc thuật toán đồng thuận.

## Câu 3: Mục đích của nút chủ trong hệ phân tán. Nếu gặp sự cố thì sao?

### Vai trò của nút chủ (Master node)

- Quản lý và điều phối hoạt động các node khác.
- Phân chia công việc, quản lý metadata, tổng hợp kết quả.
- Ví dụ: Trong HDFS, NameNode là nút chủ điều phối DataNode.

### Khi nút chủ gặp sự cố

- Hệ thống có thể dừng hoạt động nếu không có cơ chế dự phòng.
- Cần triển khai dự phòng (secondary master, failover, replication) để tránh Single Point of Failure (SPOF).

---

## Câu 4: Vì sao các máy giao tiếp qua gossip protocol thay vì gửi tới tất cả máy hoặc về nút trung tâm?

- **Hiệu quả:** Gửi từng phần thông tin đến một vài node, giúp giảm tải so với broadcast toàn mạng.
- **Chịu lỗi tốt:** Không phụ thuộc vào nút trung tâm, tránh điểm chết.
- **Tự động lan truyền:** Giống lan tin đồn, thông tin sẽ dần dần đến được toàn mạng.
- **Thích hợp với mạng phân tán lớn:** Tăng tính mở rộng và ổn định.

---

## Câu 5: Các yếu tố cốt lõi của một hệ phân tán

- **Nhiều node độc lập:** Có thể là máy thật hoặc ảo.
- **Giao tiếp qua mạng:** Các node trao đổi dữ liệu bằng giao thức truyền thông.
- **Không có đồng hồ chung:** Các sự kiện phải được đồng bộ bằng logic.
- **Tính đồng thời:** Nhiều tiến trình hoạt động song song.
- **Chia sẻ tài nguyên:** Dữ liệu, tệp, dịch vụ.
- **Xử lý lỗi:** Phải có cơ chế phát hiện, khôi phục và tái phân công.

---

## Câu 6: Lý do sử dụng hệ phân tán

- **Hiệu năng cao:** Chia tải công việc giúp xử lý nhanh hơn.
- **Tăng tính sẵn sàng:** Nếu một node lỗi, hệ thống vẫn hoạt động.
- **Mở rộng linh hoạt:** Dễ thêm tài nguyên khi cần.
- **Tiết kiệm chi phí:** Dùng nhiều máy rẻ thay vì 1 máy cực mạnh.
- **Phân bố địa lý:** Phục vụ người dùng toàn cầu với độ trễ thấp.
- **Tính mô-đun:** Dễ bảo trì, cập nhật từng phần.

## Câu 7: Định nghĩa hệ phân tán

Hệ phân tán là tập hợp các máy tính độc lập kết nối với nhau qua mạng, phối hợp để thực hiện một nhiệm vụ chung. Người dùng cảm nhận như đang sử dụng một hệ thống duy nhất.

- Các node có thể ở xa nhau về mặt địa lý.
- Các thành phần giao tiếp thông qua các giao thức truyền thông.
- Đảm bảo tính trong suốt, đồng thời, chịu lỗi và mở rộng.

---

## Câu 8: Hình ảnh cần đăng lên blog

Bạn cần tìm, chụp lại hoặc vẽ lại các hình minh họa sau:

- **Thuật toán đồng bộ thời gian:**
  - Cristian
  - Berkeley
  - RBS (Reference Broadcast Synchronization)
- **Đồng hồ logic:**
  - Lamport
- **Thuật toán bầu chọn (election):**
  - Bully
  - Ring

> Gợi ý: chụp từ slide bài giảng hoặc vẽ lại bằng công cụ như draw.io.

---

## Câu 9: Kỹ thuật phân tán và mô hình lập trình hỗ trợ

| Kiểu lập trình      | Kỹ thuật hỗ trợ                   |
| ------------------- | --------------------------------- |
| Thủ tục (Procedure) | RPC (Remote Procedure Call), gRPC |
| Hướng đối tượng     | Java RMI, CORBA                   |
| Web (RESTful/SOAP)  | HTTP, REST API, SOAP, GraphQL     |

Mỗi kỹ thuật đều hỗ trợ gọi hàm từ xa, truyền dữ liệu qua mạng, giúp xây dựng ứng dụng phân tán linh hoạt.

---

## Câu 10: So sánh tiến trình, tiến trình nhẹ và luồng

| Thành phần     | Ưu điểm                           | Nhược điểm                                     |
| -------------- | --------------------------------- | ---------------------------------------------- |
| Tiến trình     | Tách biệt, an toàn, độc lập       | Khởi tạo và switching tốn tài nguyên           |
| Luồng (Thread) | Nhẹ, chia sẻ tài nguyên           | Lỗi một luồng có thể ảnh hưởng toàn tiến trình |
| Tiến trình nhẹ | Giữa thread và process, linh hoạt | Phụ thuộc vào hệ điều hành                     |

### Khi system call bị chặn:

- **Tiến trình:** dừng toàn bộ tiến trình.
- **Luồng:** chỉ luồng bị gọi dừng, luồng khác vẫn chạy (nếu hỗ trợ).
- **Tiến trình nhẹ:** có thể hoạt động như luồng hoặc bị chặn toàn bộ tùy OS.

### Mối quan hệ:

- Một tiến trình có thể chứa nhiều luồng.
- Luồng là đơn vị nhỏ hơn, dùng chung tài nguyên với tiến trình mẹ.
- Tiến trình nhẹ có thể là luồng người dùng được quản lý riêng (user-level thread).

---

## Câu 11: Mô hình Client-Server

- **Client:** gửi yêu cầu (request) đến server.
- **Server:** xử lý yêu cầu và gửi lại phản hồi (response).
- **Vai trò:**
  - **Client:** giao diện người dùng, thực hiện tác vụ nhẹ.
  - **Server:** xử lý logic, truy xuất dữ liệu, phục vụ nhiều client đồng thời.

Ví dụ: trình duyệt (client) truy cập web server để lấy dữ liệu HTML.

## Câu 12: Gọi thủ tục từ xa (Remote Procedure Call - RPC) là gì?

RPC là cơ chế cho phép một chương trình gọi một hàm ở máy khác như thể nó là hàm cục bộ.

- Client gửi yêu cầu gọi hàm đến server.
- Server thực thi và trả kết quả về cho client.
- Quá trình bao gồm: marshalling (đóng gói tham số), truyền qua mạng, và unmarshalling (giải mã).

Ưu điểm: đơn giản hóa giao tiếp mạng, ẩn chi tiết truyền thông, dễ dùng như gọi hàm thông thường.

---

## Câu 13: Mô hình phân tầng giao thức và thông điệp bền vững

### Mục đích và lợi ích mô hình phân tầng

- Chia nhỏ hệ thống mạng thành nhiều tầng, mỗi tầng đảm nhiệm 1 chức năng.
- Dễ quản lý, phát triển, bảo trì và thay thế từng phần.
- Mỗi tầng chỉ tương tác với tầng trên và tầng dưới.

Ví dụ: mô hình OSI hoặc TCP/IP gồm các tầng: ứng dụng, giao vận, mạng, liên kết, vật lý.

### Hướng thông điệp bền vững (Reliable Messaging)

- Đảm bảo thông điệp không bị mất, không bị trùng, đến đúng thứ tự.
- Cần thiết trong hệ phân tán vì mạng có thể không ổn định.
- Dùng acknowledgment, retry, queue để duy trì tính bền vững.

---

## Câu 14: Sharding là gì?

Sharding là kỹ thuật chia nhỏ dữ liệu thành nhiều phần (shard), lưu trữ trên nhiều máy chủ khác nhau.

- Mỗi shard chứa một tập con của dữ liệu tổng thể.
- Mục tiêu: tăng hiệu năng, khả năng mở rộng và giảm tải cho mỗi node.
- Thường dùng trong cơ sở dữ liệu lớn hoặc hệ thống lưu trữ phân tán.

---

## Câu 15: Các gói luồng có thể làm gì?

Gói luồng (thread package) là thư viện hoặc môi trường cung cấp chức năng:

- Tạo và quản lý luồng (create, destroy, join).
- Lập lịch và đồng bộ hóa luồng.
- Giao tiếp giữa các luồng (shared memory, mutex, semaphore).
- Ví dụ: Pthreads (C), java.util.concurrent (Java), OpenMP.

---

## Câu 16: Phân biệt luồng kiểu người dùng và luồng kiểu nhân

| Loại luồng           | Đặc điểm chính                                    |
| -------------------- | ------------------------------------------------- |
| **Luồng người dùng** | Quản lý bởi thư viện ở không gian người dùng.     |
|                      | Tạo và chuyển đổi nhanh, không cần gọi OS.        |
|                      | Không tận dụng được đa nhân nếu không hỗ trợ.     |
| **Luồng kiểu nhân**  | Quản lý bởi hệ điều hành, nằm trong kernel space. |
|                      | Hỗ trợ chạy song song trên nhiều CPU.             |
|                      | Tạo và chuyển đổi tốn tài nguyên hơn.             |

- Hệ thống hiện đại thường dùng mô hình kết hợp (hybrid) để tận dụng ưu điểm cả hai loại.

---

## Câu 17: Các hàm chính trong RPC và chức năng

| Hàm / Thành phần  | Vai trò / Giải thích                                                 |
| ----------------- | -------------------------------------------------------------------- |
| **register()**    | Đăng ký hàm từ xa với hệ thống RPC. Cho phép hàm được gọi từ client. |
| **call()**        | Gửi yêu cầu thực hiện hàm từ xa và nhận kết quả.                     |
| **bind()**        | Liên kết tên dịch vụ/hàm với địa chỉ mạng.                           |
| **stub (client)** | Đại diện hàm phía client, đóng gói dữ liệu và gửi qua mạng.          |
| **stub (server)** | Nhận dữ liệu từ client, giải mã và gọi hàm thực.                     |

RPC giúp ẩn sự phức tạp truyền thông, làm cho lập trình phân tán dễ như gọi hàm thông thường.

---

## Câu 18: Định nghĩa tiến trình, thread, multithread client/server

- **Tiến trình (Process):** Chương trình đang thực thi, có bộ nhớ và tài nguyên riêng.
- **Luồng (Thread):** Đơn vị thực thi nhỏ nhất trong tiến trình, chia sẻ bộ nhớ với các luồng khác trong cùng tiến trình.
- **Multithread Client:** Client có thể gửi nhiều yêu cầu đồng thời nhờ nhiều luồng.
- **Multithread Server:** Server dùng nhiều luồng để xử lý nhiều client cùng lúc → tăng hiệu suất.

---

## Câu 19: Kiến thức cơ bản về Map và Reduce trong hệ phân tán

- **Map:** Nhận đầu vào và sinh ra các cặp khóa–giá trị. Thực hiện trên từng phần dữ liệu độc lập.
- **Reduce:** Gom nhóm các khóa giống nhau và xử lý tổng hợp để tạo ra kết quả cuối.

### Mục đích:

- Cho phép xử lý dữ liệu lớn theo kiểu song song và phân tán.
- Giảm thời gian xử lý và tận dụng tài nguyên hệ thống hiệu quả.
- Ví dụ: Hadoop MapReduce dùng để xử lý log, phân tích dữ liệu lớn.

---

## Câu 20: Ảo hóa (Virtualization) là gì? Mục đích trong hệ phân tán

- **Ảo hóa** là công nghệ cho phép chạy nhiều hệ điều hành hoặc máy ảo trên cùng một phần cứng vật lý.

### Mục đích trong hệ phân tán:

- **Tối ưu tài nguyên:** Dùng nhiều máy ảo thay vì nhiều máy thật.
- **Linh hoạt triển khai:** Di chuyển hoặc clone máy ảo dễ dàng.
- **Cô lập lỗi:** Các máy ảo hoạt động tách biệt, giảm rủi ro.
- **Tăng hiệu suất quản lý hệ thống phân tán.**

---

## Câu 21: Các kiến trúc server đa luồng

| Kiến trúc                | Mô tả ngắn                                                                |
| ------------------------ | ------------------------------------------------------------------------- |
| **Thread-per-request**   | Mỗi request tạo một luồng mới. Dễ hiểu, nhưng tốn tài nguyên.             |
| **Thread pool**          | Dùng sẵn một nhóm luồng, tái sử dụng. Cân bằng giữa hiệu năng và chi phí. |
| **Event-driven (async)** | Dùng 1 hoặc vài luồng xử lý nhiều yêu cầu nhờ mô hình bất đồng bộ.        |

Tùy theo khối lượng và tính chất dịch vụ mà lựa chọn kiến trúc phù hợp để đảm bảo hiệu năng và ổn định.

---

## Câu 22: Các hướng tiếp cận cài đặt luồng

| Hướng tiếp cận          | Mô tả                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **User-level thread**   | Luồng được quản lý bởi thư viện trong không gian người dùng. Nhanh nhưng không tận dụng đa lõi nếu OS không hỗ trợ. |
| **Kernel-level thread** | Luồng được hệ điều hành quản lý. Cho phép chạy song song thật sự nhưng chi phí tạo/switch cao.                      |
| **Hybrid model**        | Kết hợp cả user-level và kernel-level. Tận dụng ưu điểm của cả hai.                                                 |

---

## Câu 23: Bảng băm phân tán, Consistent Hashing và Finger Table

### Mục đích bảng băm phân tán (DHT - Distributed Hash Table)

- Phân phối dữ liệu đều giữa các node.
- Cho phép tra cứu dữ liệu nhanh và mở rộng linh hoạt.

### Tại sao sử dụng?

- Giảm tắc nghẽn, cân bằng tải.
- Loại bỏ điểm tập trung (centralized lookup).
- Hệ thống chịu lỗi và dễ mở rộng.

### Consistent Hashing là gì?

- Kỹ thuật ánh xạ key vào không gian vòng tròn (hash ring).
- Khi thêm/xóa node, chỉ một phần nhỏ dữ liệu cần di chuyển.

### Finger Table dùng để làm gì?

- Là bảng tra nhanh trong giao thức Chord.
- Mỗi node chỉ cần biết một số node lân cận → tìm kiếm log(N) bước thay vì quét toàn bộ.
- Giảm độ phức tạp tìm kiếm từ O(N) xuống O(log N).

---

## Câu 24: Không gian phẳng và định danh

### Không gian phẳng (Flat Naming Space)

- Hệ thống đặt tên mà tên không chứa thông tin vị trí hay cấu trúc phân cấp.

### Định danh (Identifier)

- Là tên duy nhất đại diện cho một đối tượng (node, dịch vụ, file).

### Đặc điểm của không gian phẳng

- Không thể suy ra vị trí từ tên.
- Cần hệ thống ánh xạ tên → địa chỉ.
- Quản lý linh hoạt nhưng cần bảng tra cứu (lookup).

---

## Câu 25: Đồng bộ hóa đồng hồ logic và lý do

### Vì sao đồng hồ vật lý không đảm bảo?

- Các máy có tốc độ đồng hồ khác nhau.
- Không thể duy trì độ chính xác tuyệt đối do trễ mạng, drift, v.v.

### Mục đích đồng bộ hóa đồng hồ

- Đảm bảo thứ tự sự kiện giữa các tiến trình trong hệ phân tán.
- Phục vụ các ứng dụng cần sự kiện xảy ra đúng trình tự (ví dụ: giao dịch, ghi log, định thời…).

### Các thuật toán đồng bộ hóa

| Tên thuật toán    | Mô tả                                                                        |
| ----------------- | ---------------------------------------------------------------------------- |
| **Cristian**      | Dựa vào một server đồng hồ chính, client hỏi giờ và hiệu chỉnh.              |
| **Berkeley**      | Trung bình cộng giữa các node. Server không tuyệt đối, mà làm trọng tài.     |
| **RBS**           | Dùng tín hiệu broadcast, các node đo thời gian đến và tự điều chỉnh.         |
| **Lamport Clock** | Logic clock, tăng số đếm theo sự kiện và truyền đi. Không đo thời gian thật. |
| **Vector Clock**  | Giữ danh sách thời gian từ mọi tiến trình để xác định quan hệ nhân quả.      |

---

## Câu 26: Đồng hồ Lamport giải quyết vấn đề gì? Các quy tắc

### Vấn đề cần giải quyết

- Xác định **thứ tự xảy ra của các sự kiện** trong hệ phân tán mà không có đồng hồ vật lý chung.
- Đảm bảo quan hệ **hậu quả (causal order)** giữa các sự kiện.

### Quy tắc của đồng hồ Lamport (Lamport Logical Clock)

Giả sử mỗi tiến trình có một biến `L` là đồng hồ logic (số nguyên):

1. **Rule 1 – Internal Event:**  
   Khi tiến trình thực hiện sự kiện nội bộ → `L = L + 1`.

2. **Rule 2 – Send Message:**  
   Khi gửi thông điệp → tăng `L = L + 1`, gửi kèm giá trị `L` theo thông điệp.

3. **Rule 3 – Receive Message:**  
   Khi nhận thông điệp có giá trị thời gian `L'` →  
   cập nhật `L = max(L, L') + 1`.

> Lamport timestamp không đảm bảo quan hệ nhân quả đầy đủ, chỉ đảm bảo tổng quát về thứ tự (hạn chế này được giải quyết bởi Vector Clock).

---

## Câu 27: Bài tập đồng hồ logic Lamport trong chương 4–5

- Làm lại bài tập về gán timestamp cho các sự kiện trên nhiều tiến trình.
- Luyện:
  - So sánh timestamp.
  - Áp dụng đúng 3 quy tắc Lamport.
  - Vẽ biểu đồ sự kiện (diagram) với mũi tên thông điệp và timestamp.

---

## Câu 28: Giao thức NTP và PTP, cách tính thời gian

### NTP (Network Time Protocol)

- Dùng để đồng bộ đồng hồ máy tính qua mạng Internet.
- Chính xác đến **mili giây**.
- Tính toán dựa trên 4 mốc thời gian: gửi yêu cầu, nhận tại server, trả về, nhận tại client.

### PTP (Precision Time Protocol)

- Chính xác cao hơn, đến **nano giây**.
- Áp dụng trong mạng LAN/real-time system.
- Dùng thiết bị phần cứng chuyên biệt để đo thời gian truyền cực kỳ chính xác.

> Cả hai đều điều chỉnh đồng hồ máy tính bằng cách tính độ trễ và hiệu chỉnh lệch thời gian.

---

## Câu 29: Ôn lại Python cơ bản

- **Biến & kiểu dữ liệu:** int, float, str, list, dict, set.
- **Câu lệnh điều kiện:** `if`, `elif`, `else`.
- **Vòng lặp:** `for`, `while`, `break`, `continue`.
- **Hàm:** `def`, tham số, giá trị trả về.
- **List comprehension:** gọn, hiệu quả.
- **Xử lý file:** `open()`, `read()`, `write()`.
- **Try–except:** xử lý ngoại lệ.
- **Import thư viện:** `import math`, `import random`, `import datetime`.

---
