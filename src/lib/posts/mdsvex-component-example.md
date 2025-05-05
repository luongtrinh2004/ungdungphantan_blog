---
title: "Tiến trình & Luồng"
date: "2025-05-05"
updated: "2025-05-05"
categories:
  - "distributed-system"
  - "programming"
coverImage: "/images/cpu_threads.webp"
coverWidth: 16
coverHeight: 9
excerpt: Cùng khám phá vai trò và cách ứng dụng Tiến trình và Luồng trong hệ thống hiện đại – qua phân tích máy tính cá nhân và các mô hình server phổ biến.
---

# Tiến trình & Luồng – Góc nhìn từ hệ thống phân tán

Trong thế giới lập trình hiện đại, khái niệm "tiến trình" (process) và "luồng" (thread) là nền tảng cho hiệu năng, đặc biệt trong các ứng dụng phân tán hay chạy song song. Bài viết này tổng hợp trải nghiệm cá nhân, lý thuyết nền tảng, và những ứng dụng thực tế để giúp bạn hiểu rõ hơn về cách sử dụng đa tiến trình – đa luồng một cách hiệu quả.

---

## 1. Đánh giá hiệu năng máy tính từ góc độ hệ thống phân tán

Gần đây mình kiểm tra lại cấu hình máy để chuẩn bị cho các bài toán xử lý dữ liệu phân tán và thấy khá thú vị khi áp dụng lại lý thuyết. Máy đang sử dụng:

- **CPU:** AMD Ryzen 5 5600H (6 nhân, 12 luồng)
- **GPU:** NVIDIA GeForce RTX (rời) + AMD Radeon (tích hợp)
- **RAM:** 16GB DDR4

### Hiệu năng thực tế:

| Thành phần | Chi tiết            | Hiệu quả thực tế                                            |
| ---------- | ------------------- | ----------------------------------------------------------- |
| CPU        | 6 cores, 12 threads | Chạy mượt nhiều IDE, máy ảo, Docker container, AI model nhỏ |
| RAM        | 16GB DDR4           | Dư sức cho lập trình, data analysis, xử lý đa tiến trình    |
| GPU        | RTX + Radeon        | Tăng tốc khi render hoặc xử lý dữ liệu hình ảnh, AI nhẹ     |

👉 Đây là một cấu hình tối ưu để làm việc với các mô hình client-server, thử nghiệm các bài toán threading và multiprocessing trong Python, C/C++ hoặc Go.

---

## 2. 12 Bài toán phổ biến có áp dụng đa luồng / đa tiến trình

Việc nhận diện các bài toán nên dùng threading hay multiprocessing là cực kỳ quan trọng khi làm dự án thực tế. Dưới đây là bảng mình tổng hợp sau khi tìm hiểu và có trải nghiệm thực hành:

| STT | Bài toán                         | Cách áp dụng                                     |
| --- | -------------------------------- | ------------------------------------------------ |
| 1   | Web server nhiều người dùng      | Thread-per-request hoặc thread pool              |
| 2   | Crawler dữ liệu web              | Multi-process cho domain, multi-thread cho URL   |
| 3   | Phân tích log hệ thống           | Mỗi file dùng 1 process để xử lý                 |
| 4   | Game engine                      | Render, logic, AI chạy trên các thread khác nhau |
| 5   | Encoding video                   | Mỗi đoạn video là một process độc lập            |
| 6   | Giao diện người dùng + xử lý nền | UI dùng main thread, tác vụ nặng chạy thread phụ |
| 7   | Machine Learning training        | Chia batch cho nhiều process                     |
| 8   | Server chat                      | Mỗi kết nối là một thread hoặc async loop        |
| 9   | Xử lý ảnh hàng loạt              | Mỗi ảnh là 1 process để tiết kiệm context switch |
| 10  | Tìm kiếm file văn bản            | Mỗi file là 1 process                            |
| 11  | IDE như VSCode                   | Thread riêng cho phân tích mã, render UI         |
| 12  | Tải dữ liệu từ API nhiều nguồn   | Thread cho mỗi nguồn kết nối đồng thời           |

---

## 3. Khi nào dùng Thread? Khi nào dùng Process? Khi nào kết hợp cả hai?

Đây là câu hỏi kinh điển. Sau khi tham khảo và tự làm thử vài demo Python/Go, mình tổng hợp bảng so sánh dễ nhớ sau:

| Tiêu chí                  | Dùng **Thread** | Dùng **Process** | Dùng **Cả hai**          |
| ------------------------- | --------------- | ---------------- | ------------------------ |
| Cần chia sẻ bộ nhớ        | ✅              | ❌               | Có thể                   |
| Tách biệt lỗi (isolation) | ❌              | ✅               | Có thể                   |
| Tác vụ nhẹ                | ✅              | ❌               | Tuỳ                      |
| Đa client, nhiều kết nối  | ✅              | ✅               | ✅                       |
| Giao diện + tính toán nền | ✅              | ❌               | ✅                       |
| Chạy mô phỏng độc lập     | ❌              | ✅               | ❌                       |
| Ví dụ                     | Game engine     | Web crawler      | Distributed log analyzer |

Ví dụ cụ thể:

- **Threads:** App game di động với render + logic riêng.
- **Process:** Crawler phân tán, mỗi máy chạy tiến trình riêng.
- **Kết hợp:** Web service đa process, mỗi service có thread riêng xử lý request.

✍️ Mình đã viết lại phần này ra giấy, vẽ bảng phân biệt, thêm ví dụ tay → chụp ảnh để lưu lại làm tài liệu ôn thi.

---

## 4. ChatGPT được huấn luyện bằng hệ thống phân tán như thế nào?

Chủ đề "huấn luyện ChatGPT" là ví dụ điển hình của distributed system. Dưới đây là những gì mình tìm hiểu được từ trang chính thức của OpenAI và Microsoft:

### Tóm tắt cơ chế:

- **Model Parallelism**: Chia các tầng mạng nơ-ron của mô hình lớn thành nhiều phần, mỗi phần chạy trên GPU khác nhau.
- **Data Parallelism**: Dữ liệu huấn luyện chia ra nhiều phần, phân phối cho các node khác nhau.
- **Pipeline Parallelism**: Mỗi GPU đảm nhận một đoạn trong "chuỗi pipeline huấn luyện".

### Công nghệ sử dụng:

- **DeepSpeed**, **Megatron-LM**: tối ưu mô hình lớn trên hàng nghìn GPU.
- **NVIDIA A100/H100**: GPU hiệu năng cao dành riêng cho AI.
- **InfiniBand + NVLink**: đường truyền dữ liệu cực nhanh giữa các máy chủ.
- **Cluster + Job Scheduler (Slurm, Kubernetes)**: điều phối hàng trăm node.

### Nguồn tài liệu mình đã đọc:

- [GPT-4 Technical Report – OpenAI](https://openai.com/research/gpt-4)
- [How Microsoft trains GPT with DeepSpeed](https://www.microsoft.com/en-us/research/blog/deepspeed-extreme-scale-model-training/)
- [NVIDIA: Scaling large LLMs](https://developer.nvidia.com/blog/optimizing-large-language-models/)

---

## Tổng kết

Việc hiểu rõ tiến trình và luồng không chỉ là lý thuyết mà còn rất thực tế khi bạn triển khai các hệ thống phân tán, tối ưu hiệu năng chương trình hay phân tích hệ thống thực tế của chính mình.

Nếu bạn đang học CNTT, hãy bắt đầu thực hành từ chính chiếc laptop của mình – kiểm tra cấu hình, chạy chương trình đa tiến trình, thử đo hiệu suất. Từ những thứ nhỏ nhặt như vậy, bạn sẽ có cái nhìn rõ ràng và ứng dụng tốt hơn rất nhiều kiến thức lý thuyết.

---
