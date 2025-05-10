---
title: "Blog 3: Truyền thông"
date: "2025-05-10"
updated: "2025-05-10"
categories:
  - "distributed-system"
  - "message-queue"
  - "rpc"
  - "programming"
coverImage: "/images/rabbitmq.jpg"
coverWidth: 16
coverHeight: 9
excerpt: Báo cáo chi tiết về cơ chế, chức năng, cài đặt RabbitMQ, hệ thống đơn giản sử dụng RabbitMQ, và tìm hiểu các thư viện RPC với demo sử dụng JSON-RPC.
---

# Bài tập 1: Tìm hiểu cơ chế, chức năng và cài đặt RabbitMQ

## 1.1 RabbitMQ là gì?

RabbitMQ là một **message broker** mã nguồn mở, cho phép các tiến trình hoặc hệ thống trao đổi thông điệp một cách **không đồng bộ**. Nó được sử dụng rộng rãi trong các kiến trúc microservices, nơi các thành phần độc lập giao tiếp thông qua hàng đợi. RabbitMQ hỗ trợ nhiều giao thức như AMQP, MQTT, STOMP và tương thích với nhiều ngôn ngữ lập trình như Python, Java, Go, Node.js, C#,...

## 1.2 Cơ chế hoạt động

RabbitMQ hoạt động dựa trên mô hình **message-oriented middleware** với các thành phần chính:

- **Producer**: Tiến trình tạo và gửi thông điệp.
- **Queue**: Nơi lưu trữ tạm thời các thông điệp, chờ được xử lý.
- **Consumer**: Tiến trình nhận và xử lý thông điệp từ queue.
- **Exchange**: Thành phần định tuyến thông điệp từ producer đến queue dựa trên các quy tắc.

### Luồng xử lý thông điệp

1. Producer gửi thông điệp đến một **exchange**.
2. Exchange sử dụng các quy tắc định tuyến (dựa trên loại exchange: direct, fanout, topic, headers) để chuyển thông điệp đến một hoặc nhiều **queue**.
3. Consumer nhận thông điệp từ queue và xử lý.

### Các loại Exchange

- **Direct**: Chuyển thông điệp đến queue dựa trên routing key chính xác.
- **Fanout**: Chuyển thông điệp đến tất cả queue được liên kết.
- **Topic**: Định tuyến dựa trên mẫu routing key (sử dụng wildcard).
- **Headers**: Định tuyến dựa trên các thuộc tính trong header của thông điệp.

## 1.3 Chức năng chính

| Tính năng               | Mô tả                                                 |
| ----------------------- | ----------------------------------------------------- |
| Hàng đợi tin nhắn       | Lưu trữ thông điệp cho đến khi được xử lý.            |
| Giao tiếp không đồng bộ | Producer và consumer hoạt động độc lập về thời gian.  |
| Hỗ trợ pub/sub          | Một thông điệp có thể được gửi đến nhiều consumer.    |
| Định tuyến nâng cao     | Hỗ trợ thiết kế hệ thống phức tạp qua exchange.       |
| Giao thức hỗ trợ        | AMQP, MQTT, STOMP,...                                 |
| Ngôn ngữ hỗ trợ         | Python, Java, Go, NodeJS, C#,...                      |
| Độ tin cậy              | Hỗ trợ xác nhận (acknowledgment) và lưu trữ bền vững. |
| Quản lý và giám sát     | Giao diện web để quản lý queue, exchange, và monitor. |

## 1.4 Hướng dẫn cài đặt RabbitMQ

### Cách 1: Cài bằng Docker (khuyên dùng)

```bash
docker run -d --hostname my-rabbit \
  --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:3-management
```

### Cách 2: Cài đặt thủ công trên Ubuntu

```bash
sudo apt update
sudo apt install rabbitmq-server -y
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

Bật giao diện quản lý web:

```bash
sudo rabbitmq-plugins enable rabbitmq_management
```

Truy cập: `http://localhost:15672`  
Tài khoản mặc định: `guest` / `guest`

Kiểm tra dịch vụ:

```bash
sudo systemctl status rabbitmq-server
```

### Cách 3: Cài đặt trên Windows

1. Tải và cài Erlang OTP từ trang chính thức: https://www.erlang.org/downloads
2. Tải và cài RabbitMQ Installer từ: https://www.rabbitmq.com/install-windows.html
3. Mở PowerShell với quyền Administrator và chạy:

```cmd
rabbitmq-service.bat install
rabbitmq-plugins enable rabbitmq_management
net start RabbitMQ
```

Truy cập: `http://localhost:15672`  
Tài khoản mặc định: `guest` / `guest`

## 1.5 Ưu điểm và Nhược điểm

### Ưu điểm

- Dễ triển khai và cấu hình.
- Hỗ trợ nhiều giao thức và ngôn ngữ.
- Giao diện quản lý web trực quan.
- Phù hợp với hệ thống có yêu cầu định tuyến phức tạp.

### Nhược điểm

- Hiệu suất thấp hơn so với Kafka khi xử lý khối lượng lớn dữ liệu.
- Yêu cầu cấu hình thêm để đảm bảo độ bền (persistence) và HA (high availability).

---

# Bài tập 2: Code hệ thống đơn giản sử dụng RabbitMQ

## 2.1 Mô tả hệ thống

Hệ thống đơn giản mô phỏng việc gửi và nhận thông báo (notification) giữa một **producer** và một **consumer** sử dụng RabbitMQ. Producer gửi thông báo về đơn hàng, consumer nhận và hiển thị thông báo.

### Yêu cầu

- RabbitMQ đã được cài đặt (theo hướng dẫn ở Bài 1).
- Cài đặt thư viện `pika` cho Python:

```bash
pip install pika
```

## 2.2 Code hệ thống

### Producer (Gửi thông báo)

Tệp `producer.py`:

```python
import pika
import json

# Kết nối đến RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Khai báo hàng đợi
queue_name = 'notification_queue'
channel.queue_declare(queue=queue_name)

# Dữ liệu thông báo
notification = {
    'user_id': '12345',
    'message': 'Đơn hàng của bạn đã được xác nhận!'
}

# Gửi thông báo
channel.basic_publish(
    exchange='',
    routing_key=queue_name,
    body=json.dumps(notification)
)

print(f"[x] Sent notification: {notification}")

# Đóng kết nối
connection.close()
```

### Consumer (Nhận thông báo)

Tệp `consumer.py`:

```python
import pika
import json

# Kết nối đến RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Khai báo hàng đợi
queue_name = 'notification_queue'
channel.queue_declare(queue=queue_name)

# Hàm callback xử lý thông báo
def callback(ch, method, properties, body):
    notification = json.loads(body)
    print(f"[x] Received notification: {notification['message']} for user {notification['user_id']}")
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Đăng ký consumer
channel.basic_consume(queue=queue_name, on_message_callback=callback)

print('[*] Waiting for notifications. To exit press CTRL+C')
channel.start_consuming()
```

## 2.3 Cách chạy hệ thống

1. **Khởi động RabbitMQ**:

   - Nếu dùng Docker:
     ```bash
     docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
     ```
   - Hoặc kiểm tra RabbitMQ đang chạy:
     ```bash
     sudo systemctl status rabbitmq-server
     ```

2. **Chạy consumer**:
   Mở terminal và chạy:

   ```bash
   python consumer.py
   ```

3. **Chạy producer**:
   Mở terminal khác và chạy:
   ```bash
   python producer.py
   ```

## 2.4 Kết quả

- **Consumer**:

  ```
  [*] Waiting for notifications. To exit press CTRL+C
  [x] Received notification: Đơn hàng của bạn đã được xác nhận! for user 12345
  ```

- **Producer**:
  ```
  [x] Sent notification: {'user_id': '12345', 'message': 'Đơn hàng của bạn đã được xác nhận!'}
  ```

## 2.5 Giải thích

- **Producer** gửi thông báo dưới dạng JSON đến hàng đợi `notification_queue`.
- **Consumer** lắng nghe hàng đợi và xử lý thông báo khi nhận được.
- Sử dụng thư viện `pika` để giao tiếp với RabbitMQ qua giao thức AMQP.
- Hệ thống này có thể mở rộng để tích hợp vào các ứng dụng thực tế như gửi email hoặc cập nhật database.

## 2.6 Lưu ý

- Đảm bảo RabbitMQ đang chạy trước khi chạy code.
- Nếu RabbitMQ chạy trên máy chủ khác, thay `localhost` trong `ConnectionParameters` bằng địa chỉ phù hợp.
- Có thể thêm **exchange** để hỗ trợ định tuyến phức tạp hơn hoặc chạy nhiều consumer để xử lý song song.

---

# Bài tập 3: Tìm hiểu các thư viện RPC ngoài xmlrpc và demo JSON-RPC

## 3.1 Tổng quan về RPC

**RPC (Remote Procedure Call)** là một cơ chế cho phép gọi hàm/procedure từ một máy tính khác trong mạng như thể nó là hàm cục bộ. RPC thường được sử dụng trong các hệ thống phân tán để thực hiện các tác vụ như gọi API, xử lý yêu cầu từ xa, hoặc giao tiếp giữa các dịch vụ.

### Các đặc điểm của RPC

- **Đồng bộ**: Client gửi yêu cầu và chờ phản hồi từ server.
- **Giống hàm cục bộ**: Ẩn chi tiết mạng, làm cho việc gọi hàm từ xa giống như gọi cục bộ.
- **Hiệu quả**: Thích hợp cho các tác vụ cần phản hồi nhanh, ví dụ: tính toán hoặc truy vấn.

## 3.2 Các thư viện RPC ngoài xmlrpc

Dưới đây là một số thư viện RPC phổ biến ngoài `xmlrpc` trong Python:

| Thư viện          | Mô tả                                                 | Định dạng dữ liệu | Ưu điểm                                | Nhược điểm                               |
| ----------------- | ----------------------------------------------------- | ----------------- | -------------------------------------- | ---------------------------------------- |
| **gRPC**          | Thư viện RPC hiệu suất cao, sử dụng Protocol Buffers. | Protobuf          | Hiệu suất cao, hỗ trợ nhiều ngôn ngữ.  | Cần định nghĩa schema Protobuf trước.    |
| **JSON-RPC**      | RPC dựa trên JSON, đơn giản, dễ tích hợp.             | JSON              | Dễ triển khai, đọc được bởi con người. | Hiệu suất thấp hơn gRPC.                 |
| **Thrift**        | Framework RPC đa nền tảng, tương tự gRPC.             | Thrift IDL        | Linh hoạt, hỗ trợ nhiều ngôn ngữ.      | Cần học cú pháp IDL.                     |
| **ZeroMQ (ZRPC)** | RPC dựa trên ZeroMQ, nhẹ và nhanh.                    | Tùy chỉnh         | Nhẹ, linh hoạt, không cần broker.      | Cấu hình phức tạp hơn.                   |
| **RPyC**          | RPC thuần Python, cho phép gọi đối tượng từ xa.       | Python objects    | Dễ sử dụng, tích hợp tốt với Python.   | Chỉ hỗ trợ Python, hiệu suất trung bình. |

### So sánh với xmlrpc

- `xmlrpc` sử dụng XML làm định dạng dữ liệu, dẫn đến kích thước payload lớn và hiệu suất thấp hơn JSON-RPC hoặc gRPC.
- `xmlrpc` tích hợp sẵn trong Python (`xmlrpc.client` và `xmlrpc.server`), nhưng ít được sử dụng trong các hệ thống hiện đại do JSON-RPC và gRPC phổ biến hơn.

## 3.3 Demo JSON-RPC với thư viện `jsonrpcserver` và `jsonrpcclient`

### Tổng quan về JSON-RPC

JSON-RPC là một giao thức RPC nhẹ, sử dụng JSON để mã hóa yêu cầu và phản hồi. Nó bao gồm:

- **Request**: Gửi tên phương thức và tham số.
- **Response**: Trả về kết quả hoặc lỗi.
- Phiên bản phổ biến: JSON-RPC 2.0.

### Thư viện sử dụng

- **`jsonrpcserver`**: Tạo server JSON-RPC.
- **`jsonrpcclient`**: Gửi yêu cầu từ client.
  Cài đặt:

```bash
pip install jsonrpcserver jsonrpcclient
```

### 3.4 Code Demo JSON-RPC

#### Server (`server.py`)

Tệp `server.py` triển khai một server JSON-RPC với phương thức tính tổng hai số:

```python
from jsonrpcserver import method, Result, Success, dispatch
from http.server import BaseHTTPRequestHandler, HTTPServer

# Định nghĩa phương thức RPC
@method
def add(a: int, b: int) -> Result:
    return Success(a + b)

# Server HTTP xử lý yêu cầu JSON-RPC
class JSONRPCServer(BaseHTTPRequestHandler):
    def do_POST(self):
        # Đọc dữ liệu yêu cầu
        content_length = int(self.headers['Content-Length'])
        request_body = self.rfile.read(content_length).decode('utf-8')

        # Xử lý yêu cầu JSON-RPC
        response = dispatch(request_body)

        # Gửi phản hồi
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(str(response).encode('utf-8'))

# Chạy server
if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, JSONRPCServer)
    print('Starting JSON-RPC server on port 8000...')
    httpd.serve_forever()
```

#### Client (`client.py`)

Tệp `client.py` gửi yêu cầu đến server để tính tổng:

```python
from jsonrpcclient import request
import requests

# Gửi yêu cầu JSON-RPC
response = request('http://localhost:8000', 'add', a=5, b=3)

# In kết quả
print(f"Result: {response.data.result}")
```

### 3.5 Cách chạy demo

1. **Chạy server**:
   Mở terminal và chạy:

   ```bash
   python server.py
   ```

   Kết quả:

   ```
   Starting JSON-RPC server on port 8000...
   ```

2. **Chạy client**:
   Mở terminal khác và chạy:
   ```bash
   python client.py
   ```
   Kết quả:
   ```
   Result: 8
   ```

### 3.6 Giải thích

- **Server**:

  - Định nghĩa phương thức `add` sử dụng decorator `@method`.
  - Sử dụng `jsonrpcserver` để xử lý yêu cầu JSON-RPC qua HTTP.
  - Trả về kết quả dưới dạng JSON (theo chuẩn JSON-RPC 2.0).

- **Client**:

  - Sử dụng `jsonrpcclient` để gửi yêu cầu gọi phương thức `add` với tham số `a=5` và `b=3`.
  - Nhận phản hồi và hiển thị kết quả (`8`).

- **Định dạng JSON**:
  - Yêu cầu:
    ```json
    {
    	"jsonrpc": "2.0",
    	"method": "add",
    	"params": { "a": 5, "b": 3 },
    	"id": 1
    }
    ```
  - Phản hồi:
    ```json
    {
    	"jsonrpc": "2.0",
    	"result": 8,
    	"id": 1
    }
    ```

### 3.7 Ưu điểm của JSON-RPC

- Đơn giản, dễ triển khai.
- JSON dễ đọc, tương thích với nhiều ngôn ngữ.
- Phù hợp cho các ứng dụng web hoặc API nhỏ.

### 3.8 Nhược điểm

- Hiệu suất thấp hơn gRPC do JSON có kích thước lớn hơn Protobuf.
- Không hỗ trợ streaming hoặc các tính năng nâng cao như gRPC.

### 3.9 Lưu ý

- Đảm bảo server đang chạy trước khi chạy client.
- Có thể mở rộng server để hỗ trợ nhiều phương thức hoặc tích hợp với framework như Flask/FastAPI.

---

# Kết luận

- **Bài 1**: RabbitMQ là một message broker mạnh mẽ, hỗ trợ giao tiếp không đồng bộ trong hệ thống phân tán. Việc cài đặt đơn giản và phù hợp với nhiều kịch bản sử dụng.
- **Bài 2**: Hệ thống gửi/nhận thông báo sử dụng RabbitMQ minh họa cách tích hợp message queue vào ứng dụng thực tế.
- **Bài 3**: JSON-RPC là một giải pháp RPC nhẹ, dễ sử dụng, phù hợp cho các ứng dụng cần giao tiếp đơn giản. Ngoài `xmlrpc`, các thư viện như gRPC, Thrift, và RPyC cung cấp nhiều lựa chọn cho các nhu cầu khác nhau.
