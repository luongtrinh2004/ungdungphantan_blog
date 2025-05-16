---
title: "Blog 4: Hiểu về quá trình duyệt web và thuật toán Chord trong hệ thống phân tán"
date: "2025-05-16"
categories:
  - "distributed-system"
  - "dns"
  - "chord"
coverImage: "/images/blog4.png"
excerpt: Tìm hiểu quy trình duyệt một trang web liên quan đến tra cứu DNS, resolving DNS, caching và thuật toán Chord với ví dụ, test case và code thực nghiệm.
---

# Bài tập 1: Tìm hiểu quy trình duyệt một trang web (www.motvidu.com)

Khi bạn nhập địa chỉ trang web www.motvidu.com vào trình duyệt, các bước kỹ thuật sau đây sẽ diễn ra để trình duyệt hiển thị trang web đó.

## 1.1 Tra cứu DNS (Domain Name System)

- Máy tính hoặc thiết bị của bạn không hiểu được tên miền như www.motvidu.com, cần biết địa chỉ IP tương ứng (ví dụ 192.168.1.1).
- Thiết bị sẽ hỏi một máy chủ DNS để tra cứu địa chỉ IP tương ứng với tên miền.
- Nếu máy tính đã có kết quả này trong bộ nhớ đệm (cache), nó sẽ dùng ngay, tránh phải hỏi lại.

## 1.2 Quá trình resolving DNS

- Nếu không có trong cache, máy tính gửi truy vấn đến DNS resolver (do ISP cung cấp).
- DNS resolver hỏi lần lượt các máy chủ DNS cấp cao hơn:
  - Root DNS server (máy chủ gốc).
  - TLD DNS server (máy chủ tên miền cấp cao, ví dụ .com).
  - Authoritative DNS server (máy chủ quản lý tên miền motvidu.com).
- Sau khi nhận IP, resolver trả về cho máy tính bạn.

## 1.3 Caching

- Kết quả tra cứu được lưu vào cache trên máy tính hoặc DNS resolver trong thời gian nhất định để tăng tốc tra cứu cho lần kế tiếp.
- Caching giúp giảm tải cho DNS server và tăng tốc độ truy cập.

## 1.4 Kết nối HTTP/HTTPS

- Sau khi có IP, trình duyệt gửi yêu cầu HTTP hoặc HTTPS tới máy chủ web.
- Máy chủ nhận và trả về dữ liệu trang web.
- Trình duyệt nhận và hiển thị trang web cho người dùng.

---

# Bài tập 2: Thuật toán Chord trong hệ thống phân tán

Chord là thuật toán giúp tra cứu tài nguyên (key-value) hiệu quả trong mạng ngang hàng (P2P), sử dụng vòng ID và finger table.

## 2.1 Giới thiệu về Chord

- Mỗi node trong mạng có một ID duy nhất trong vòng modulo 2^m.
- Key cũng được ánh xạ vào vòng ID này.
- Mỗi node biết successor (nút kế tiếp) và có bảng finger table để tìm kiếm nhanh với chi phí O(log N).

## 2.2 Ví dụ cụ thể

Giả sử m=3 (vòng 0-7), các node có ID: 0, 1, 3, 6.

- Key cần tra cứu: 2.
- Node 1 dùng finger table để chuyển truy vấn đến node 3, là successor của key 2.
- Node 3 lưu trữ key 2.

## 2.3 Test case mô phỏng

- Bắt đầu từ node 1, tìm successor của key 2.
- Node 1 xác định node 3 là người kế tiếp phù hợp.
- Node 3 được trả về làm nơi lưu key.

## 2.4 Code thực nghiệm bằng Python

```python
class Node:
    def __init__(self, node_id, m=3):
        self.node_id = node_id
        self.m = m
        self.successor = None
        self.finger_table = [None] * m

    def set_successor(self, node):
        self.successor = node

    def set_finger_table(self, fingers):
        self.finger_table = fingers

    def find_successor(self, key):
        if self.node_id == key or self.successor.node_id == key or (self.node_id < key <= self.successor.node_id):
            return self.successor
        else:
            node = self.closest_preceding_node(key)
            if node == self:
                return self
            return node.find_successor(key)

    def closest_preceding_node(self, key):
        for i in reversed(range(self.m)):
            finger = self.finger_table[i]
            if finger and self.node_id < finger.node_id < key:
                return finger
        return self

# Khởi tạo các node
node0 = Node(0)
node1 = Node(1)
node3 = Node(3)
node6 = Node(6)

# Đặt successor
node0.set_successor(node1)
node1.set_successor(node3)
node3.set_successor(node6)
node6.set_successor(node0)

# Thiết lập finger table cho node1 (ví dụ)
node1.set_finger_table([node3, node3, node6])

# Tìm successor cho key=2 từ node1
result = node1.find_successor(2)
print(f"Key 2 is stored at node {result.node_id}")
```
