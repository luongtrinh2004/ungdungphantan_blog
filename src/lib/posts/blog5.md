---
title: "Blog 5: Hai ví dụ thực hành lập trình phân tán với Java RMI"
date: "2025-05-19"
categories:
  - "distributed-system"
  - "java"
  - "rmi"
coverImage: "/images/blog5.jpg"
excerpt: Hai ví dụ giúp hiểu rõ cơ chế Remote Method Invocation (RMI) trong Java gửi lời chào và tính tổng số tự nhiên từ xa.
---

# Bài tập 1: Gửi lời chào từ Client đến Server (Java RMI)

## 1.1 Mô tả

Trong ví dụ đầu tiên, ta sẽ triển khai một ứng dụng Java RMI đơn giản:

- **Client** gửi một lời chào tới **Server**.
- **Server** xử lý và gửi lại lời phản hồi.
- **Client** hiển thị lời chào từ Server lên màn hình.

## 1.2 Các bước và mã nguồn

### Bước 1: Tạo interface `Hello.java`

```java
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Hello extends Remote {
    String sayHello() throws RemoteException;
}
```

### Bước 2: Cài đặt interface `HelloImpl.java`

```java
import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class HelloImpl extends UnicastRemoteObject implements Hello {
    public HelloImpl() throws RemoteException {
        super();
    }

    public String sayHello() throws RemoteException {
        return "Xin chào từ Server!";
    }
}
```

### Bước 3: Tạo Server `Server.java`

```java
import java.rmi.Naming;

public class Server {
    public static void main(String[] args) {
        try {
            HelloImpl hello = new HelloImpl();
            Naming.rebind("rmi://localhost/HelloService", hello);
            System.out.println("Server đang chờ lời chào...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Bước 4: Tạo Client `Client.java`

```java
import java.rmi.Naming;

public class Client {
    public static void main(String[] args) {
        try {
            Hello hello = (Hello) Naming.lookup("rmi://localhost/HelloService");
            String response = hello.sayHello();
            System.out.println("Phản hồi từ Server: " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

# Bài tập 2: Tính tổng k số tự nhiên đầu tiên (Java RMI)

## 2.1 Mô tả

Trong ví dụ thứ hai, **Client** nhập một số nguyên `k` và gửi tới **Server**. **Server** sẽ tính tổng các số tự nhiên từ `1` đến `k` rồi trả kết quả về cho **Client** hiển thị.

## 2.2 Các bước và mã nguồn

### Bước 1: Tạo interface `TinhTong.java`

```java
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface TinhTong extends Remote {
    int tinhTong(int k) throws RemoteException;
}
```

### Bước 2: Cài đặt interface `TinhTongImpl.java`

```java
import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class TinhTongImpl extends UnicastRemoteObject implements TinhTong {
    public TinhTongImpl() throws RemoteException {
        super();
    }

    public int tinhTong(int k) throws RemoteException {
        return (k * (k + 1)) / 2;
    }
}
```

### Bước 3: Tạo Server `ServerTinhTong.java`

```java
import java.rmi.Naming;

public class ServerTinhTong {
    public static void main(String[] args) {
        try {
            TinhTongImpl tt = new TinhTongImpl();
            Naming.rebind("rmi://localhost/TinhTongService", tt);
            System.out.println("Server Tính Tổng đã sẵn sàng...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Bước 4: Tạo Client `ClientTinhTong.java`

```java
import java.rmi.Naming;
import java.util.Scanner;

public class ClientTinhTong {
    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.print("Nhập số nguyên k: ");
            int k = sc.nextInt();

            TinhTong tt = (TinhTong) Naming.lookup("rmi://localhost/TinhTongService");
            int result = tt.tinhTong(k);

            System.out.println("Tổng từ 1 đến " + k + " là: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

# Hướng dẫn chạy chương trình

## Bước 1: Biên dịch toàn bộ các file Java

```bash
javac *.java
```

## Bước 2: Khởi động RMI Registry

```bash
start rmiregistry
```

> Lưu ý: chạy lệnh này ở **thư mục chứa các file class**, không cần truyền đối số nếu để mặc định cổng 1099.

## Bước 3: Chạy Server

- Với ví dụ 1: `java Server`
- Với ví dụ 2: `java ServerTinhTong`

## Bước 4: Chạy Client

- Với ví dụ 1: `java Client`
- Với ví dụ 2: `java ClientTinhTong`

---

# Kết luận

Hai ví dụ trên minh họa rõ cách giao tiếp giữa client và server bằng Java RMI. Qua đó, bạn hiểu được:

- Cách định nghĩa và triển khai interface từ xa.
- Cách đăng ký dịch vụ với RMI Registry.
- Cách gọi phương thức từ xa trên một đối tượng.

Hãy thử sửa đổi, ví dụ thêm nhiều chức năng tính toán hơn, hoặc gửi dữ liệu phức tạp hơn (chuỗi, danh sách, đối tượng) để hiểu sâu hơn về khả năng của RMI.

> Bạn muốn mình đóng gói 2 ví dụ này thành project NetBeans hoặc Eclipse? Hãy để lại bình luận nhé!
