# 🌟 B.Trọng AI - Sân chơi Sáng tạo Mã nguồn & Giao diện Siêu Đẹp

## 📌 Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Tính năng nổi bật](#tính-năng-nổi-bật)
3. [Chế độ hoạt động](#chế-độ-hoạt-động)
4. [Công cụ Nhà phát triển (Beta)](#công-cụ-nhà-phát-triển-beta)
5. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
6. [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
7. [Ghi chú về API Key](#ghi-chú-về-api-key)
8. [Giấy phép](#giấy-phép)
9. [Tác giả](#tác-giả)

---

## 📖 Giới thiệu

Chào mừng bạn đến với **B.Trọng AI** – một ứng dụng web tương tác cho phép bạn khám phá tiềm năng của AI trong việc **tạo mã**, **thiết kế giao diện**, và **phát triển web**. Với hai chế độ hoạt động chính, B.Trọng AI hỗ trợ bạn tạo **phác thảo p5.js** hoặc các trang web HTML/CSS/JS có giao diện **Siêu Đẹp** và nghệ thuật.

---

## 🚀 Tính năng nổi bật

- 💬 **Trò chuyện tương tác** với AI để yêu cầu viết hoặc sửa mã.
- 🧠 **Hai chế độ thông minh**: *p5.js Mode* và *Siêu Đẹp Mode*.
- ✍️ **Trình chỉnh sửa mã trực tiếp**, hỗ trợ tô sáng cú pháp.
- 🔁 **Xem trước trực tiếp** trong iframe liền kề.
- ⏯️ **Điều khiển thực thi**: chạy, dừng, làm mới mã.
- 🧹 **Đặt lại toàn bộ**: xoá cuộc trò chuyện, mã nguồn, ngữ cảnh AI.
- 🧪 **Công cụ nhà phát triển** (mở bằng cách nhấn 7 lần vào tab "B.Trọng AI").
- 📱 **Giao diện phản hồi tốt** trên mọi thiết bị.

---

## 🧭 Chế độ hoạt động

### 1. Chế độ p5.js Tiêu chuẩn
Tạo mã JavaScript tương thích với thư viện **p5.js**, cho phép bạn sáng tạo với nghệ thuật tương tác, hình ảnh, âm thanh và trò chơi đơn giản.

### 2. Chế độ Siêu Đẹp (Super Beautiful Mode)
AI tạo các trang web hoàn chỉnh sử dụng **HTML**, **CSS (Tailwind & tùy chỉnh)**, **JavaScript**, tích hợp thư viện như **GSAP**, **Three.js** để tạo hiệu ứng đẹp mắt, hiện đại, nghệ thuật.

---

## 🛠️ Công cụ Nhà phát triển (Beta)

> Truy cập bằng cách nhấn 7 lần vào tab "B.Trọng AI".

### Cấu hình nâng cao:

- 🔄 **Chuyển đổi chế độ AI** (p5.js / Siêu Đẹp)
- 🔍 **Xem lời nhắc hệ thống** hiện tại AI đang sử dụng.
- ⚙️ **Cấu hình Model AI**:
  - Chọn model: `Gemini`, `OpenAI`, hoặc placeholder: `DeepSeek`, `Grok`, `Claude`, `Llama`.
  - Điều chỉnh: Nhiệt độ, top-K, top-P.
  - Bật/tắt khả năng sinh ảnh (Gemini).
  - Bật **Flash Mode** giảm độ trễ.

### Tính năng nâng cao:

- ✨ **AI Morph & Evolve (p5.js)**:
  - Nhập "Chỉ thị Biến đổi", AI tiến hoá mã theo yêu cầu.
  - Giải thích và cập nhật mã trực tiếp.

- 🔒 **Làm rối mã JavaScript**:
  - `Cơ bản`: xoá comment, khoảng trắng.
  - `Trung bình`: đổi tên biến, mã hoá số cơ bản.
  - `Nâng cao`: mã hoá chuỗi, logic giả.
  - `Cực mạnh (AOPs)`: đổi tên định danh nâng cao, trộn logic, mã hoá sâu, thao tác prototype,...

- 🖼️ **Tạo ảnh (Imagen)** từ lời nhắc văn bản.
- 🎙️ **Nhập liệu bằng giọng nói**
- 🧠 **Xoá ngữ cảnh AI**

---

## 🧪 Công nghệ sử dụng

- **Frontend**: `HTML5`, `CSS3`, `TypeScript`, `Lit`, `Marked`, `Highlight.js`
- **AI Backend**:
  - `@google/genai`: sinh văn bản, mã, hình ảnh.
  - `openai`: nếu cung cấp khóa API riêng.
- **Thư viện hỗ trợ**: `p5.js`, `Tailwind CSS`, `GSAP`, `Three.js` (qua CDN)

---

## 📦 Hướng dẫn sử dụng

```bash
# 1. Di chuyển đến thư mục dự án
cd [tên-thư-mục-dự-án]

# 2. Cài đặt thư viện
npm install

# 3. Chạy server cục bộ
npm run dev
Truy cập trình duyệt tại `http://localhost:5173`
## 🔐 Ghi chú về API Key

* Ứng dụng **không có giao diện nhập khóa API**.
* Khóa cần được cung cấp qua biến môi trường:

  * `process.env.API_KEY` (Gemini)
  * `process.env.OPENAI_API_KEY` (OpenAI)
* Đối với các model placeholder: nhà phát triển cần tự cấu hình khóa API tương ứng.

---

## 📜 Giấy phép

Phát hành dưới giấy phép **MIT** – Tự do sử dụng, chia sẻ, chỉnh sửa.

---

## 🧑‍💻 Tác giả

**B.Trọng** - Đam mê công nghệ sáng tạo, AI và nghệ thuật lập trình.

> *Mọi ý tưởng đóng góp đều được hoan nghênh!*
