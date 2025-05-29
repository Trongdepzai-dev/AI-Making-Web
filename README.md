# B.Trọng AI - Sân chơi Sáng tạo p5.js & Web Siêu Đẹp (VI) / Creative Playground (EN)

## Tiếng Việt

Chào mừng bạn đến với Sân chơi Sáng tạo của B.Trọng AI! Đây là một ứng dụng web tương tác được thiết kế để khám phá tiềm năng của AI trong việc tạo mã cho các bản phác thảo p5.js và xây dựng các trang web HTML/CSS/JavaScript "Siêu Đẹp" và phức tạp.

### Tổng quan

Ứng dụng này cung cấp một giao diện trò chuyện nơi bạn có thể đưa ra các yêu cầu cho B.Trọng AI. AI sẽ cố gắng tạo mã dựa trên yêu cầu của bạn, mã này sau đó có thể được xem, chỉnh sửa và chạy trực tiếp trong trình duyệt.

Có hai chế độ hoạt động chính:

1.  **Chế độ p5.js Tiêu chuẩn:** Tập trung vào việc tạo mã JavaScript cho thư viện p5.js, cho phép bạn tạo nghệ thuật tương tác, hiệu ứng hình ảnh và các trò chơi nhỏ.
2.  **Chế độ Siêu Đẹp (Super Beautiful Mode):** AI được hướng dẫn để tạo ra các trang web HTML, CSS (sử dụng Tailwind CSS và CSS tùy chỉnh) và JavaScript hoàn chỉnh, với mục tiêu là giao diện "cực kỳ đẹp", mang tính nghệ thuật, tương lai và sử dụng các thư viện như GSAP, Three.js cho các hiệu ứng nâng cao.

### Tính năng chính

*   **Giao diện Trò chuyện Tương tác:** Giao tiếp với B.Trọng AI để yêu cầu tạo hoặc sửa đổi mã.
*   **Hai Chế độ AI Chính:** p5.js và Siêu Đẹp.
*   **Trình soạn thảo Mã nguồn:** Xem và chỉnh sửa trực tiếp mã do AI tạo ra. Hỗ trợ tô sáng cú pháp.
*   **Xem trước Trực tiếp:** Ngay lập tức xem kết quả của mã trong một iframe.
*   **Điều khiển Thực thi:** Tải lại, chạy và dừng mã.
*   **Đặt lại Hoàn toàn:** Xóa cuộc trò chuyện, đặt lại mã và làm mới ngữ cảnh AI.
*   **Công cụ Nhà phát triển (Tính năng Beta):** Mở bằng cách nhấp 7 lần vào tab "B.Trọng AI".
    *   **Chuyển đổi Chế độ AI:** Giữa p5.js và Siêu Đẹp.
    *   **Xem Lời nhắc Hệ thống:** Xem lời nhắc hệ thống hiện tại mà AI đang sử dụng.
    *   **Cấu hình Model AI:**
        *   **Chọn Model:** Chọn giữa các model Gemini, OpenAI, và các placeholder khác (DeepSeek, Grok, Claude, Llama). *Lưu ý: Các model placeholder chưa được tích hợp API đầy đủ và sẽ không thực hiện lệnh gọi API thực tế.*
        *   **Cho phép AI Tạo ảnh (p5.js):** Cho phép AI (Gemini) đề xuất và tạo hình ảnh.
        *   **Tắt 'Suy nghĩ' của AI (Gemini Flash):** Giảm độ trễ.
        *   **Điều chỉnh Tham số:** Tinh chỉnh nhiệt độ, top-K, top-P.
    *   **✨ Vô hạn Quyền năng (AI Morph & Evolve - p5.js):**
        *   Cung cấp "Chỉ thị Biến đổi" để AI sửa đổi và "tiến hóa" mã p5.js hiện có.
        *   AI sẽ cố gắng áp dụng các thay đổi theo chỉ thị, cập nhật mã nguồn và giải thích các thay đổi.
    *   **Làm rối Mã JavaScript (p5.js mode):**
        *   **Cơ bản:** Xóa comment, khoảng trắng.
        *   **Trung bình:** Đổi tên biến cục bộ đơn giản, mã hóa số cơ bản.
        *   **Nâng cao:** Mã hóa chuỗi, số phức tạp hơn, thêm mã giả đơn giản.
        *   **Cực mạnh (AOPs):** Áp dụng các kỹ thuật làm rối mã nâng cao và phức tạp (dựa trên các quy tắc AOPs) như đổi tên định danh mạnh mẽ, trộn logic, mã hóa chuỗi/số phức tạp, che giấu chức năng, bóp méo cấu trúc, thao tác prototype, và nhiều hơn nữa.
    *   **Tạo ảnh Thủ công (Imagen - Gemini):** Tạo hình ảnh từ một lời nhắc văn bản.
    *   **Nhập liệu bằng Giọng nói:** Sử dụng giọng nói để nhập tin nhắn.
    *   **Xóa Ngữ cảnh AI:** Xóa lịch sử trò chuyện khỏi bộ nhớ của AI.
*   **Responsive Design:** Giao diện hoạt động trên các kích thước màn hình khác nhau.

### Công nghệ Sử dụng

*   **Frontend:** HTML5, CSS3, TypeScript, Lit, Marked, Highlight.js.
*   **AI:**
    *   Google Gemini API (`@google/genai`) cho tạo văn bản/mã và hình ảnh (Imagen).
    *   OpenAI API (`openai`) cho các model GPT (nếu khóa API được cung cấp).
*   **Thư viện:** p5.js, Tailwind CSS, GSAP, Three.js (tải từ CDN).

### Cách sử dụng

1.  **Điều hướng đến thư mục dự án:** Mở terminal hoặc command prompt của bạn và sử dụng lệnh `cd` để di chuyển đến thư mục chứa tệp `README.md` này (thư mục gốc của dự án).
2.  **Cài đặt các gói phụ thuộc:** Chạy lệnh `npm install` trong terminal. Lệnh này sẽ tải xuống và cài đặt tất cả các thư viện cần thiết mà dự án sử dụng.
3.  **Chạy server phát triển:** Sau khi cài đặt hoàn tất, chạy lệnh `npm run dev`. Lệnh này sẽ khởi động một server phát triển cục bộ.
4.  **Mở ứng dụng trong trình duyệt:** Mở trình duyệt web của bạn và truy cập vào địa chỉ `http://localhost:5173`.
5.  Bây giờ bạn có thể bắt đầu sử dụng ứng dụng! Sử dụng ô chat để tương tác với B.Trọng AI.
    *   **Để tạo mã p5.js:** Đưa ra yêu cầu như "tạo một quả bóng nảy".
    *   **Để tạo trang web Siêu Đẹp:** Mở Công cụ Nhà phát triển (nhấp 7 lần vào tab "B.Trọng AI"), chọn "Chế độ Siêu Đẹp", sau đó đưa ra yêu cầu.
    *   **Để sử dụng "Vô hạn Quyền năng":** Trong chế độ p5.js, mở Công cụ Nhà phát triển, nhập "Chỉ thị Biến đổi" và nhấp "Biến đổi (Evolve)".
    *   Khám phá các tùy chọn khác trong Công cụ Nhà phát triển.

**Lưu ý về Khóa API:** Ứng dụng này được thiết kế để sử dụng các khóa API được cấu hình sẵn trong môi trường thực thi (`process.env.API_KEY` cho Gemini, `process.env.OPENAI_API_KEY` cho OpenAI). Ứng dụng sẽ **không** cung cấp giao diện người dùng để nhập hoặc quản lý các khóa API khác. Để tích hợp đầy đủ các model AI placeholder (DeepSeek, Grok, Claude, Llama), nhà phát triển cần tự quản lý các khóa API tương ứng trong thiết lập môi trường của riêng họ.

### Giấy phép

Dự án này được cấp phép theo Giấy phép MIT.

---
*Được tạo bởi B.Trọng*
---

## English

Welcome to B.Trọng AI's Creative Playground! This is an interactive web application designed to explore the potential of AI in generating code for p5.js sketches and building "Super Beautiful" and complex HTML/CSS/JavaScript websites.

### Overview

The application provides a chat interface where you can make requests to B.Trọng AI. The AI will attempt to generate code based on your requests, which can then be viewed, edited, and run directly in the browser.

There are two main modes of operation:

1.  **Standard p5.js Mode:** Focuses on generating JavaScript code for the p5.js library, allowing you to create interactive art, visual effects, and small games.
2.  **Super Beautiful Mode:** The AI is instructed to create complete HTML, CSS (using Tailwind CSS and custom CSS), and JavaScript websites, aiming for an "extremely beautiful," artistic, futuristic interface using libraries like GSAP and Three.js for advanced effects.

### Key Features

*   **Interactive Chat Interface:** Communicate with B.Trọng AI to request code generation or modification.
*   **Two Main AI Modes:** p5.js and Super Beautiful.
*   **Source Code Editor:** View and directly edit the AI-generated code. Supports syntax highlighting.
*   **Live Preview:** Instantly see the result of the code in an adjacent iframe.
*   **Execution Controls:** Reload, run, and stop the previewed code.
*   **Full Reset:** Clear the chat, reset the code to default, and refresh the AI's context.
*   **Developer Tools (Beta Feature):** Access by clicking 7 times on the "B.Trọng AI" tab.
    *   **Switch AI Mode:** Toggle between p5.js and Super Beautiful modes.
    *   **View System Prompt:** See the current system prompt the AI is using.
    *   **Configure AI Model:**
        *   **Select Model:** Choose between available Gemini, OpenAI models, and other placeholders (DeepSeek, Grok, Claude, Llama). *Note: Placeholder models do not have full API integration and will not make actual API calls.*
        *   **Allow AI Image Generation (p5.js):** Let the AI (Gemini) proactively suggest and generate images.
        *   **Disable AI 'Thinking' (Gemini Flash):** Reduce latency.
        *   **Adjust Parameters:** Fine-tune temperature, top-K, and top-P.
    *   **✨ Infinite Power (AI Morph & Evolve - p5.js):**
        *   Provide a "Morph Directive" for the AI to modify and "evolve" existing p5.js code.
        *   The AI will attempt to apply changes according to the directive, updating the source code and explaining its modifications.
    *   **JavaScript Code Obfuscation (p5.js mode):**
        *   **Basic:** Removes comments, whitespace.
        *   **Medium:** Simple local variable renaming, basic number encoding.
        *   **Advanced:** String encoding, more complex number obfuscation, simple dead code.
        *   **Extremely AOPs:** Applies advanced and complex obfuscation techniques (based on AOPs rules) such as aggressive identifier renaming, logic confusion, complex string/number encoding, function concealment, structural distortion, prototype manipulation, and more.
    *   **Manual Image Generation (Imagen - Gemini):** Generate images from a text prompt.
    *   **Voice Input:** Use your voice to type messages.
    *   **Clear AI Context:** Clear the current chat history from the AI's memory.
*   **Responsive Design:** The UI is designed to work across different screen sizes.

### Technologies Used

*   **Frontend:** HTML5, CSS3, TypeScript, Lit, Marked, Highlight.js.
*   **AI:**
    *   Google Gemini API (`@google/genai`) for text/code generation and image generation (Imagen).
    *   OpenAI API (`openai`) for GPT models (if API key is provided).
*   **Libraries:** p5.js, Tailwind CSS, GSAP, Three.js (loaded from CDNs).

### How to Use

1.  **Navigate to the project directory:** Open your terminal or command prompt and use the `cd` command to move to the directory containing this `README.md` file (the project's root directory).
2.  **Install dependencies:** Run the command `npm install` in your terminal. This will download and install all the necessary libraries the project uses.
3.  **Run the development server:** After the installation is complete, run the command `npm run dev`. This will start a local development server.
4.  **Open the application in your browser:** Open your web browser and go to the address `http://localhost:5173`.
5.  You can now start using the application! Use the chat input to interact with B.Trọng AI.
    *   **To generate p5.js code:** Make requests like "create a bouncing ball" or "draw a fractal flower."
    *   **To generate Super Beautiful websites:** Open Developer Tools (click 7 times on the "B.Trọng AI" tab), check "Super Beautiful Mode," then make requests.
    *   **To use "Infinite Power":** In p5.js mode, open Developer Tools, enter a "Morph Directive," and click "Evolve."
    *   Explore other options in the Developer Tools.

**API Key Note:** This application is designed to use API keys pre-configured in the execution environment (`process.env.API_KEY` for Gemini, `process.env.OPENAI_API_KEY` for OpenAI). The application will **not** provide a user interface for inputting or managing other API keys. Full integration of placeholder AI models (DeepSeek, Grok, Claude, Llama) would require developers to manage the respective API keys in their own environment setup.

### License

This project is licensed under the MIT License.

---
*Created by B.Trọng*
---