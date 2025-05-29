//Made by @B.Trọng
// SPDX-License-Identifier: MIT
import {GoogleGenAI, GenerateContentResponse} from '@google/genai';
import OpenAI from 'openai';
import {ChatState, marked, Playground} from './playground';
import type {LitElement} from 'lit';

// --- SYSTEM PROMPT DEFINITIONS ---

const AI_IMAGE_GENERATION_INSTRUCTION = `
9.  **Khả năng Tạo ảnh (Nếu được kích hoạt):** Bạn có thể yêu cầu tạo một hình ảnh bằng cách bao gồm một thẻ đặc biệt trong phản hồi của mình: \`[[GENERATE_IMAGE: một mô tả chi tiết cho hình ảnh]]\`. Ví dụ: "Đây là một ý tưởng cho biểu tượng nút lưu: [[GENERATE_IMAGE: một đĩa mềm cổ điển, pixel art, màu xanh]]". Chỉ sử dụng điều này khi nó thực sự nâng cao phản hồi cho người dùng và mô tả của bạn ngắn gọn (dưới 10 từ).`;

const BASE_P5_JS_SYSTEM_INSTRUCTIONS = `bạn là một trợ lý lập trình sáng tạo cực kỳ thành thạo cho B.Trọng AI. Nhiệm vụ của bạn là viết mã JavaScript cho môi trường p5.js để tạo ra các hiệu ứng hình ảnh, trò chơi tương tác, và nghệ thuật tạo sinh ấn tượng.
Yêu cầu cụ thể:
1.  **Mã nguồn p5.js:** Chỉ viết mã JavaScript tương thích với p5.js.
2.  **Chú thích:** Luôn thêm nhận xét \`//Made by @B.Trọng\` vào ngay đầu mỗi đoạn mã p5.js bạn tạo ra.
3.  **Định dạng trả về:** Trả về khối mã JavaScript được bao bọc bởi \`\`\`javascript ... \`\`\`. Bạn có thể bao gồm một đoạn văn ngắn giải thích về mã và kết quả dự kiến, đặt đoạn văn này bên ngoài khối mã.
4.  **Không phụ thuộc bên ngoài (mặc định):** Trừ khi được yêu cầu cụ thể, tất cả các hàm phải nằm trong mã được trả về hoặc là một phần của p5.js gốc.
5.  **Thành thạo:**
    *   **CSS Động:** Có khả năng tạo ra các hiệu ứng CSS động và đẹp mắt, nếu được yêu cầu thao tác với DOM bên ngoài canvas p5.js.
    *   **JavaScript Nâng cao:** Sử dụng các kỹ thuật JavaScript hiện đại để tối ưu hóa hiệu suất và cấu trúc mã.
    *   **WebGL:** Có hiểu biết và khả năng viết mã WebGL trực tiếp trong p5.js (sử dụng \`createCanvas(windowWidth, windowHeight, WEBGL);\`) để tạo đồ họa 3D và shader.
6.  **Tương tác người dùng:** Nếu người dùng cung cấp mã hiện có hoặc sửa đổi mã bạn đã tạo, hãy phân tích và tuân theo các thay đổi đó trong các phản hồi tiếp theo.
7.  **Tên AI:** Luôn tự gọi mình là "B.Trọng AI và được tạo ra bởi B.Trọng".`;

const BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT = `Tạo một mã HTML hoàn chỉnh, tích hợp CSS và JavaScript, để xây dựng một trang web đơn trang (single-page) với giao diện đẹp siêu thực, mang tính nghệ thuật và tương lai, đạt mức thẩm mỹ "cực kỳ đẹp x10000000000000 lần". Trang web có thể là một portfolio cá nhân, landing page cho sản phẩm công nghệ cao, hoặc một trải nghiệm tương tác sáng tạo. Yêu cầu chi tiết:

{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}

2.  **HTML**:
    *   Sử dụng HTML5 semantic với cấu trúc tối ưu, gọn gàng, dễ bảo trì.
    *   Bao gồm các thành phần: Hero section, nội dung chính, footer, menu.
    *   Tích hợp form liên hệ (không dùng onSubmit) hoặc các yếu tố tương tác.

3.  **CSS**:
    *   Sử dụng **Tailwind CSS** (từ CDN: https://cdn.tailwindcss.com ) làm base, kết hợp với CSS tùy chỉnh.
    *   Áp dụng hiệu ứng: Parallax, ánh sáng động, 3D transforms, micro-interactions.
    *   Tích hợp **dark mode** và **light mode**. Responsive 100%.
    *   Sử dụng **custom fonts** từ Google Fonts (ví dụ: 'Orbitron', 'Poppins'). Link: <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">

4.  **JavaScript**:
    *   Sử dụng thư viện từ CDN: **GSAP** (https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js), **Three.js** (https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js), tùy chọn **Anime.js** hoặc **Particles.js**.
    *   Tương tác: Mouse-based, scroll-triggered, dynamic canvas, WebGL.
    *   Hiệu suất tối ưu, ES6+, code sạch, có comment.

5.  **Yêu cầu bổ sung**:
    *   Preloader ấn tượng. Sound effects. Tối ưu tải. Tương thích trình duyệt.
    *   Toggle dark/light mode siêu thực. Easter egg (tùy chọn).

6.  **Định dạng đầu ra**:
    *   Một file HTML duy nhất (CSS trong \`<style>\`, JS trong \`<script>\` hoặc CDN).
    *   Code chạy ngay, không cần sửa. Comment rõ ràng.
    *   **QUAN TRỌNG**: Không sử dụng markdown cho khối HTML. Trả về HTML thuần túy.

7.  **Mục tiêu**:
    *   Giao diện siêu thực, nghệ thuật, hiệu ứng nặng nhưng mượt, gây ấn tượng.
    *   Sáng tạo đột phá, phong cách futuristic, cinematic, hoặc cyberpunk.
    *   Trải nghiệm người dùng "wow".
    *   Bạn là B.Trọng AI, hãy thể hiện sự sáng tạo không giới hạn!`;

const GEMINI_LOGO_INSTRUCTION = `1.  **Logo Generation Integration (IMPORTANT - Gemini Feature):**
    *   If you determine a logo is suitable for the website based on the user's request:
        *   First, at the **very beginning** of your entire response, before the \`<!DOCTYPE html>\` tag, include a special directive: \`[[GENERATE_LOGO_FOR_SITE: Your concise and descriptive prompt for the logo (e.g., "minimalist 'B' letter logo for tech company", "stylized coffee bean logo for 'The Daily Grind' cafe")]]\`. Make the prompt specific to the website's theme or name.
        *   Then, in your HTML structure where the logo should appear, include an \`<img>\` tag like this: \`<img src="AI_LOGO_PLACEHOLDER" alt="Website Logo" id="aiGeneratedLogo" style="width: 100px; height: auto;">\`. I will replace \`AI_LOGO_PLACEHOLDER\` with the actual generated logo image.`;

const OTHER_MODEL_LOGO_INSTRUCTION = `1.  **Logo Suggestion & Placeholder:**
    *   If you determine a logo is suitable for the website:
        *   In your textual explanation (outside the HTML code block), suggest a concept or describe the logo.
        *   In your HTML structure where the logo should appear, include an \`<img>\` tag like this: \`<img src="AI_LOGO_PLACEHOLDER" alt="Website Logo" id="aiGeneratedLogo" style="width: 100px; height: auto;">\`. I will inform the user to manually replace this or use a tool if they like your suggestion. Do not attempt to generate the logo image yourself.`;

const EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS = `Bạn là một AI chuyên về "Tiến hóa Mã nguồn p5.js" cho B.Trọng AI.
Nhiệm vụ của bạn là nhận một đoạn mã p5.js hiện có và một "Chỉ thị Biến đổi" từ người dùng.
Bạn phải sửa đổi mã p5.js hiện có dựa trên chỉ thị đó, tạo ra một phiên bản mới "tiến hóa" hơn.

Yêu cầu cụ thể:
1.  **Phân tích Mã Hiện có:** Hiểu rõ chức năng và cấu trúc của mã p5.js được cung cấp.
2.  **Áp dụng Chỉ thị Biến đổi:** Sửa đổi mã để thực hiện yêu cầu trong "Chỉ thị Biến đổi".
    *   Các thay đổi nên có ý nghĩa và phù hợp với chỉ thị.
    *   Cố gắng bảo toàn chức năng cốt lõi của mã gốc trừ khi chỉ thị yêu cầu thay đổi nó.
    *   Ưu tiên các thay đổi mang tính sáng tạo, cải tiến hoặc thêm tính năng mới.
3.  **Chất lượng Mã:**
    *   Mã mới phải là JavaScript hợp lệ cho môi trường p5.js.
    *   Giữ nguyên chú thích \`//Made by @B.Trọng\` ở đầu mã.
    *   Mã phải rõ ràng, dễ hiểu (trừ khi chỉ thị yêu cầu làm rối mã).
4.  **Định dạng Trả về:**
    *   **Quan trọng:** Chỉ trả về khối mã JavaScript p5.js đã được sửa đổi, bao bọc bởi \`\`\`javascript ... \`\`\`.
    *   Sau khối mã, cung cấp một đoạn giải thích ngắn gọn (bên ngoài khối mã) về những thay đổi bạn đã thực hiện và tại sao, liên kết chúng với "Chỉ thị Biến đổi".
5.  **An toàn:** Không thực thi hoặc đề xuất mã có thể gây hại hoặc sử dụng các API không an toàn.
6.  **Tên AI:** Luôn tự gọi mình là "B.Trọng AI".

Ví dụ:
Mã hiện có:
\`\`\`javascript
//Made by @B.Trọng
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  ellipse(mouseX, mouseY, 50, 50);
}
\`\`\`
Chỉ thị Biến đổi: "thay đổi màu của hình tròn thành màu đỏ và làm cho nó nảy bật khi chạm vào các cạnh canvas."

Phản hồi của bạn sẽ là:
\`\`\`javascript
//Made by @B.Trọng
let x, y;
let vx = 3;
let vy = 3;
let diameter = 50;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);

  x += vx;
  y += vy;

  if (x + diameter / 2 > width || x - diameter / 2 < 0) {
    vx *= -1;
  }
  if (y + diameter / 2 > height || y - diameter / 2 < 0) {
    vy *= -1;
  }

  fill(255, 0, 0); // Màu đỏ
  ellipse(x, y, diameter, diameter);
}
\`\`\`
Tôi đã cập nhật mã để hình tròn có màu đỏ bằng cách sử dụng \`fill(255, 0, 0);\`.
Tôi cũng đã thêm logic để hình tròn nảy bật khỏi các cạnh của canvas bằng cách theo dõi vị trí của nó (\`x\`, \`y\`) và đảo ngược vận tốc (\`vx\`, \`vy\`) khi nó chạm vào một cạnh.
`;


const SYSTEM_PROMPTS = {
  gemini: {
    p5js: BASE_P5_JS_SYSTEM_INSTRUCTIONS, // AI_IMAGE_GENERATION_INSTRUCTION will be appended dynamically
    superBeautiful: BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT.replace('{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}', GEMINI_LOGO_INSTRUCTION),
    evolveP5js: EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS
  },
  openai: {
    p5js: `${BASE_P5_JS_SYSTEM_INSTRUCTIONS}\n8.  **Model Specific:** You are powered by OpenAI. Focus on clear, functional p5.js code as per the user's request.`,
    superBeautiful: `${BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT.replace('{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}', OTHER_MODEL_LOGO_INSTRUCTION)}\n8.  **Model Specific:** You are powered by OpenAI. Focus on generating high-quality HTML, Tailwind CSS, and JavaScript. Describe any logo ideas textually.`,
    evolveP5js: `${EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS}\n7. **Model Specific:** You are powered by OpenAI. Apply the evolution directive diligently.`
  },
  deepseek: {
    p5js: `${BASE_P5_JS_SYSTEM_INSTRUCTIONS}\n8.  **Model Specific:** You are DeepSeek Coder. Prioritize generating correct, efficient, and well-commented p5.js code. Explain complex parts if necessary.`,
    superBeautiful: `${BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT.replace('{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}', OTHER_MODEL_LOGO_INSTRUCTION)}\n8.  **Model Specific:** You are DeepSeek Coder. Focus on clean, structured HTML, Tailwind CSS, and JavaScript. Ensure modern aesthetics and code clarity. Describe any logo ideas textually.`,
    evolveP5js: `${EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS}\n7. **Model Specific:** You are DeepSeek Coder. Your code modifications should be precise and technically sound.`
  },
  grok: {
    p5js: `${BASE_P5_JS_SYSTEM_INSTRUCTIONS}\n8.  **Model Specific:** You are Grok. Be creative and provide clear explanations for your p5.js code. Engage the user with your coding style.`,
    superBeautiful: `${BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT.replace('{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}', OTHER_MODEL_LOGO_INSTRUCTION)}\n8.  **Model Specific:** You are Grok. Design engaging HTML/Tailwind/JS sites. Explain your design choices and functionality. Describe any logo ideas textually.`,
    evolveP5js: `${EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS}\n7. **Model Specific:** You are Grok. Approach code evolution with flair and insightful explanations.`
  },
  claude: { // Placeholder for Claude
    p5js: `${BASE_P5_JS_SYSTEM_INSTRUCTIONS}\n8.  **Model Specific:** You are Claude. Generate helpful and safe p5.js code.`,
    superBeautiful: `${BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT.replace('{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}', OTHER_MODEL_LOGO_INSTRUCTION)}\n8.  **Model Specific:** You are Claude. Focus on well-structured and thoughtful web designs. Describe any logo ideas textually.`,
    evolveP5js: `${EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS}\n7. **Model Specific:** You are Claude. Evolve the code thoughtfully and safely.`
  },
  llama: { // Placeholder for Llama
    p5js: `${BASE_P5_JS_SYSTEM_INSTRUCTIONS}\n8.  **Model Specific:** You are Llama. Generate p5.js code based on your training.`,
    superBeautiful: `${BASE_SUPER_BEAUTIFUL_SYSTEM_PROMPT.replace('{LOGO_GENERATION_INSTRUCTION_PLACEHOLDER}', OTHER_MODEL_LOGO_INSTRUCTION)}\n8.  **Model Specific:** You are Llama. Create web pages as requested. Describe any logo ideas textually.`,
    evolveP5js: `${EVOLVE_P5_JS_SYSTEM_INSTRUCTIONS}\n7. **Model Specific:** You are Llama. Modify the p5.js code according to the directive.`
  }
};

let currentSystemInstructions: string = SYSTEM_PROMPTS.gemini.p5js; // Default
let isSuperBeautifulMode = false;


const EMPTY_CODE = `//Made by @B.Trọng
function setup() {
  // Setup code goes here.
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Frame drawing code goes here.
  background(175);
}`;

const STARTUP_CODE = `//Made by @B.Trọng
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  let hue = (frameCount * 0.5) % 360;
  background(hue, 90, 90);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}`;

const EXAMPLE_PROMPTS = [
  'tạo một trò chơi arcade',
  'tạo một quả bóng màu vàng nảy trong một hình vuông, đảm bảo xử lý phát hiện va chạm đúng cách. làm cho hình vuông xoay từ từ. đảm bảo quả bóng ở trong hình vuông',
  'tạo một mô phỏng khói gồm những vệt khói phồng trên một phong cảnh xanh',
  'tạo một trò chơi trong đó một con tàu vũ trụ bắn các tiểu hành tinh bay xung quanh tôi trong không gian',
];

const geminiAi = new GoogleGenAI({
  apiKey: (globalThis as any).process.env.API_KEY,
});

let openai: OpenAI | null = null;
const openaiApiKey = (globalThis as any).process.env.OPENAI_API_KEY;
// Placeholder for other API keys - these are not used by the application's core logic for API calls
// and are only here to acknowledge the user's request about .env.local.
// The application will NOT provide UI or mechanisms to input these.
// Full integration would require developers to manage these keys in their environment
// and update the code to use the respective SDKs.
const claudeApiKey = (globalThis as any).process.env.CLAUDE_API_KEY;
const llamaApiKey = (globalThis as any).process.env.LLAMA_API_KEY;
const deepseekApiKey = (globalThis as any).process.env.DEEPSEEK_API_KEY;
const grokApiKey = (globalThis as any).process.env.GROK_API_KEY;


if (openaiApiKey && openaiApiKey.trim() !== '') {
  openai = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });
} else {
  console.warn("Khóa API OpenAI (OPENAI_API_KEY) không được đặt hoặc trống. Các model OpenAI sẽ không khả dụng.");
}

interface CreateChatOptions {
  enableAiImageGeneration?: boolean;
  temperature?: number;
  topK?: number;
  topP?: number;
  thinkingBudget?: number;
  modelName?: string;
  isEvolveMode?: boolean; // Added for evolve mode
}
let currentChatOptions: CreateChatOptions = {
    enableAiImageGeneration: false,
    thinkingBudget: undefined,
    modelName: 'gemini-2.5-flash-preview-04-17',
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    isEvolveMode: false,
};

function getActiveSystemInstructions(modelName: string | undefined, isSuperMode: boolean, enableImageGenForP5: boolean | undefined, isEvolveMode: boolean | undefined): string {
  const modelKey = !modelName ? 'gemini' :
                   modelName.startsWith('openai-') ? 'openai' :
                   modelName.startsWith('deepseek-') ? 'deepseek' :
                   modelName.startsWith('grok-') ? 'grok' :
                   modelName.startsWith('claude-') ? 'claude' :
                   modelName.startsWith('llama-') ? 'llama' :
                   'gemini';

  let basePrompt: string;
  if (isEvolveMode && !isSuperMode) { // Evolve mode is only for p5.js
    basePrompt = (SYSTEM_PROMPTS as any)[modelKey]?.evolveP5js || SYSTEM_PROMPTS.gemini.evolveP5js;
  } else if (isSuperMode) {
    basePrompt = (SYSTEM_PROMPTS as any)[modelKey]?.superBeautiful || SYSTEM_PROMPTS.gemini.superBeautiful;
  } else {
    basePrompt = (SYSTEM_PROMPTS as any)[modelKey]?.p5js || SYSTEM_PROMPTS.gemini.p5js;
    if (modelKey === 'gemini' && enableImageGenForP5) {
      basePrompt += AI_IMAGE_GENERATION_INSTRUCTION;
    }
  }
  return basePrompt;
}


function createAiChat(options: CreateChatOptions = currentChatOptions) {
  const instructionsToUse = getActiveSystemInstructions(options.modelName, isSuperBeautifulMode, options.enableAiImageGeneration, options.isEvolveMode);

  const config: any = { systemInstruction: instructionsToUse };
  if (options.temperature !== undefined) config.temperature = parseFloat(options.temperature as any);
  if (options.topK !== undefined) config.topK = parseInt(options.topK as any, 10);
  if (options.topP !== undefined) config.topP = parseFloat(options.topP as any);
  
  if (options.modelName === 'gemini-2.5-flash-preview-04-17' && options.thinkingBudget !== undefined) {
      config.thinkingConfig = { thinkingBudget: options.thinkingBudget };
  } else {
      delete config.thinkingConfig; 
  }

  if (options.modelName?.startsWith('gemini-')) {
    try {
        return geminiAi.chats.create({
            model: options.modelName, 
            config: config,
        });
    } catch (e) {
        console.error("Lỗi khi tạo Gemini chat instance:", e);
        return null;
    }
  }
  return null; 
}

let aiChat = createAiChat();
let apiChatHistory: Array<{role: 'user' | 'assistant', content: string}> = [];


function getCode(text: string, isSuperMode: boolean) {
  if (isSuperMode) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('<!doctype html>') || (lowerText.includes('<html>') && lowerText.includes('</html>'))) {
        const logoDirectiveMatch = text.match(/^\[\[GENERATE_LOGO_FOR_SITE:.*?\]\]\s*/i);
        if (logoDirectiveMatch) {
            return text.substring(logoDirectiveMatch[0].length).trim();
        }
        return text.trim();
    }
  }

  const startMark = '```javascript';
  const codeStart = text.indexOf(startMark);
  let codeEnd = text.lastIndexOf('```');

  if (codeStart > -1) {
    if (codeEnd < 0 || codeEnd <= codeStart) {
      codeEnd = text.length;
    }
    return text.substring(codeStart + startMark.length, codeEnd).trim();
  }
  // If no ```javascript, try to find any ``` block for cases where AI might forget the language tag in evolve mode
  if (!isSuperMode) {
      const genericCodeStart = text.indexOf('```');
      if (genericCodeStart > -1) {
          const genericCodeEnd = text.lastIndexOf('```');
          if (genericCodeEnd > genericCodeStart) { // Ensure it's not the same ```
              return text.substring(genericCodeStart + 3, genericCodeEnd).trim();
          }
      }
  }
  return ''; 
}

const AI_IMAGE_REQUEST_REGEX = /\[\[GENERATE_IMAGE:\s*(.*?)\s*\]\]/g;
const AI_LOGO_REQUEST_REGEX = /\[\[GENERATE_LOGO_FOR_SITE:\s*(.*?)\s*\]\]/i;


document.addEventListener('DOMContentLoaded', async (event) => {
  const rootElement = document.querySelector('#root')! as HTMLElement;
  const playground = new Playground();
  rootElement.appendChild(playground as HTMLElement);
  
  currentSystemInstructions = getActiveSystemInstructions(currentChatOptions.modelName, isSuperBeautifulMode, currentChatOptions.enableAiImageGeneration, currentChatOptions.isEvolveMode);
  playground.setInitialSystemPrompt(currentSystemInstructions);
  playground.setInitialModelConfig(currentChatOptions);
  playground.setInitialSuperBeautifulMode(isSuperBeautifulMode);


  playground.updateSystemInstructionsHandler = async (newIsSuperBeautifulMode: boolean, isEvolveContext: boolean = false) => {
    isSuperBeautifulMode = newIsSuperBeautifulMode;
    currentChatOptions.isEvolveMode = isEvolveContext; // Update evolve context
    currentSystemInstructions = getActiveSystemInstructions(currentChatOptions.modelName, isSuperBeautifulMode, currentChatOptions.enableAiImageGeneration, currentChatOptions.isEvolveMode);
    apiChatHistory = []; 
    
    if (currentChatOptions.modelName?.startsWith('gemini-')) {
        aiChat = null; 
    }
    aiChat = createAiChat(currentChatOptions); 

    playground.messages = []; 
    let modeMessage = isSuperBeautifulMode ? "Chế độ Siêu Đẹp đã được kích hoạt." : "Chế độ p5.js tiêu chuẩn đã được kích hoạt.";
    if (currentChatOptions.isEvolveMode) {
        modeMessage = "Chế độ Tiến hóa Mã nguồn p5.js đã được kích hoạt.";
    }
    playground.addMessage('SYSTEM', `Lời nhắc hệ thống đã được cập nhật cho model và chế độ hiện tại. ${modeMessage} Cuộc trò chuyện đã được đặt lại.`);
    playground.setInitialSystemPrompt(currentSystemInstructions); // Update DevTools view
    (playground as LitElement).requestUpdate();
  };

  playground.updateModelConfigHandler = async (newConfig: CreateChatOptions) => {
    const oldModel = currentChatOptions.modelName;
    currentChatOptions = {...currentChatOptions, ...newConfig};
    // isEvolveMode is handled by updateSystemInstructionsHandler, preserve its current state here unless explicitly changed by newConfig
    currentChatOptions.isEvolveMode = newConfig.isEvolveMode ?? currentChatOptions.isEvolveMode; 
    currentSystemInstructions = getActiveSystemInstructions(currentChatOptions.modelName, isSuperBeautifulMode, currentChatOptions.enableAiImageGeneration, currentChatOptions.isEvolveMode);
    apiChatHistory = []; 
    
    if (currentChatOptions.modelName?.startsWith('gemini-') || oldModel?.startsWith('gemini-')) {
      aiChat = null; 
    }
    aiChat = createAiChat(currentChatOptions); 

    playground.messages = [];
    let modelDisplayName = newConfig.modelName || 'Không xác định';
    if (newConfig.modelName === 'gemini-2.5-flash-preview-04-17') modelDisplayName = 'Gemini 2.5 Flash';
    else if (newConfig.modelName === 'gemini-2.5-pro-preview-04-17') modelDisplayName = 'Gemini 2.5 Pro (Beta)';
    else if (newConfig.modelName === 'openai-gpt-4') modelDisplayName = 'OpenAI GPT-4';
    else if (newConfig.modelName === 'openai-gpt-3.5-turbo') modelDisplayName = 'OpenAI GPT-3.5 Turbo';
    else if (newConfig.modelName === 'deepseek-coder') modelDisplayName = 'DeepSeek Coder';
    else if (newConfig.modelName === 'grok-llama') modelDisplayName = 'Grok (LLaMA)';
    else if (newConfig.modelName === 'claude-3-opus') modelDisplayName = 'Claude 3 Opus';
    else if (newConfig.modelName === 'llama-3-70b') modelDisplayName = 'Llama 3 70B';
    
    playground.addMessage('SYSTEM', `Cấu hình model đã được cập nhật (Model: ${modelDisplayName}). Lời nhắc hệ thống cũng đã được điều chỉnh. Cuộc trò chuyện đã được đặt lại.`);
    playground.setInitialSystemPrompt(currentSystemInstructions); // Update DevTools view
    (playground as LitElement).requestUpdate();
  };

  playground.clearAiContextHandler = async () => {
    apiChatHistory = []; 
    if (currentChatOptions.modelName?.startsWith('gemini-')) {
      aiChat = null; 
      aiChat = createAiChat(currentChatOptions); 
    } else {
      aiChat = null; 
    }
    playground.addMessage('SYSTEM', 'Ngữ cảnh của AI đã được xóa. Bạn có thể tiếp tục cuộc trò chuyện hoặc bắt đầu một chủ đề mới.');
    (playground as LitElement).requestUpdate();
  };


  playground.generateImageHandler = async (prompt: string, imageRequestId?: string): Promise<string | null> => {
    if (!imageRequestId || imageRequestId.startsWith('devtool-')) playground.setImageGenLoading(true); 
    if (!imageRequestId || imageRequestId.startsWith('devtool-')) playground.setGeneratedImageUrl(null); 
    
    if (!imageRequestId) playground.setChatState(ChatState.GENERATING);

    try {
      const response = await geminiAi.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: prompt,
          config: {numberOfImages: 1, outputMimeType: 'image/png'},
      });

      if (!imageRequestId || imageRequestId.startsWith('devtool-')) playground.setImageGenLoading(false);
      if (!imageRequestId) playground.setChatState(ChatState.IDLE);

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
        if (imageRequestId && !imageRequestId.startsWith('logo-for-site-') && playground.updateAIRequestedImage) {
            playground.updateAIRequestedImage(imageRequestId, imageUrl, prompt);
        }
        return imageUrl;
      }
      const errorMsg = 'Không thể tạo ảnh. Không nhận được ảnh từ AI.';
      if (imageRequestId && !imageRequestId.startsWith('logo-for-site-') && playground.updateAIRequestedImage) {
          playground.updateAIRequestedImage(imageRequestId, null, prompt, errorMsg);
      } else if (!imageRequestId) { 
          playground.addMessage('ERROR', errorMsg);
      }
      return null;
    } catch (e: any) {
      console.error('Lỗi tạo ảnh:', e);
      if (!imageRequestId || imageRequestId.startsWith('devtool-')) playground.setImageGenLoading(false);
      if (!imageRequestId) playground.setChatState(ChatState.IDLE);
      
      let friendlyMessage = 'Đã xảy ra lỗi khi tạo ảnh.';
      if (e && e.message) {
        friendlyMessage = e.message;
        const splitPos = typeof friendlyMessage === 'string' ? friendlyMessage.indexOf('{') : -1;
        if (splitPos > -1) {
          const msgJson = friendlyMessage.substring(splitPos);
          try {
            const sdkError = JSON.parse(msgJson);
            if (sdkError.error && sdkError.error.message) {
              friendlyMessage = sdkError.error.message;
            }
          } catch (parseError) { /* Keep friendlyMessage */ }
        }
      }
      const finalErrorMsg = `Lỗi tạo ảnh: ${friendlyMessage}`;
      if (imageRequestId && !imageRequestId.startsWith('logo-for-site-') && playground.updateAIRequestedImage) {
        playground.updateAIRequestedImage(imageRequestId, null, prompt, finalErrorMsg);
      } else if (!imageRequestId) {
        playground.addMessage('ERROR', finalErrorMsg);
      }
      return null;
    }
  };

  playground.handleEvolveCodeRequest = async (currentP5Code: string, morphDirective: string) => {
    if (isSuperBeautifulMode) {
      playground.addMessage('ERROR', 'Chức năng "Vô hạn Quyền năng" chỉ khả dụng cho chế độ p5.js.');
      return;
    }
    if (!currentP5Code.trim()) {
        playground.addMessage('ERROR', 'Không có mã nguồn p5.js nào để tiến hóa. Vui lòng tạo hoặc nhập mã trước.');
        return;
    }
     if (!morphDirective.trim()) {
        playground.addMessage('ERROR', 'Vui lòng nhập một "Chỉ thị Biến đổi" để AI tiến hóa mã nguồn.');
        return;
    }

    // Temporarily set system prompt for evolution
    const originalSystemInstructions = currentSystemInstructions;
    const originalIsEvolveMode = currentChatOptions.isEvolveMode;
    
    currentChatOptions.isEvolveMode = true;
    // Update global currentSystemInstructions for the duration of this call if needed,
    // or ensure sendMessageHandler uses a one-off instruction set.
    // currentSystemInstructions is updated here to ensure context is clear, though sendMessageHandler
    // now also recalculates based on isEvolveRequest.
    currentSystemInstructions = getActiveSystemInstructions(currentChatOptions.modelName, false, currentChatOptions.enableAiImageGeneration, true);


    playground.addMessage('SYSTEM', `⚡️ Sức mạnh Vô hạn: Đang biến đổi mã nguồn p5.js với chỉ thị: "${morphDirective}"`);
    
    const evolvePrompt = `Mã p5.js hiện tại:\n\`\`\`javascript\n${currentP5Code}\n\`\`\`\n\nChỉ thị Biến đổi: "${morphDirective}"\n\nHãy tiến hóa mã nguồn dựa trên chỉ thị này.`;
    
    await playground.sendMessageHandler(evolvePrompt, 'user', currentP5Code, false, true); // Pass true for isEvolveRequest

    // Restore original system prompt context
    currentChatOptions.isEvolveMode = originalIsEvolveMode;
    currentSystemInstructions = getActiveSystemInstructions(currentChatOptions.modelName, isSuperBeautifulMode, currentChatOptions.enableAiImageGeneration, originalIsEvolveMode);
    // If a temporary chat was used in sendMessageHandler, global aiChat is unaffected.
    // If global aiChat system prompt was tied to global currentSystemInstructions, it should be reset if it was changed
    // for the evolve call, but createAiChat is based on options, so temporary chat is preferred.
  };


  playground.sendMessageHandler = async (
    input: string,
    role: string,
    code: string,
    codeHasChanged: boolean,
    isEvolveRequest: boolean = false, // New parameter
  ) => {
    const {thinking, text: messageTextElement} = playground.addMessage('assistant', ''); 

    let currentMessageToSend: string;
    if (role.toUpperCase() === 'SYSTEM') {
        currentMessageToSend = `Trình thông dịch báo cáo: ${input}. Có thể cải thiện điều đó không?`;
    } else if (role.toUpperCase() === 'USER' && codeHasChanged && !isEvolveRequest) { // Don't send code again if it's part of evolve prompt
        const codeBlockLang = isSuperBeautifulMode ? 'html' : 'javascript';
        currentMessageToSend = `Tôi đã cập nhật đoạn mã: \`\`\`${codeBlockLang}\n${code}\n\`\`\`\n\n${input}`;
    }
    else {
        currentMessageToSend = input; // This will be the combined prompt for evolve requests
    }

    playground.setChatState(ChatState.GENERATING);
    messageTextElement.innerHTML = '...'; 

    let accumulatedText = ''; 
    let extractedCode = ''; 
    const aiImageRequests: {id: string, prompt: string, placeholder: string}[] = [];
    
    // Determine system instructions for this specific call
    const instructionsForThisCall = getActiveSystemInstructions(
        currentChatOptions.modelName, 
        isSuperBeautifulMode, 
        currentChatOptions.enableAiImageGeneration, 
        isEvolveRequest // Use isEvolveRequest to get correct system prompt
    );


    try {
      const modelName = currentChatOptions.modelName;

      if (modelName?.startsWith('openai-')) {
        if (!openai) {
          messageTextElement.innerHTML = await marked.parse('Lỗi: Khóa API OpenAI (OPENAI_API_KEY) chưa được cấu hình trong môi trường. Không thể sử dụng các model OpenAI.');
          messageTextElement.parentElement?.classList.remove('role-assistant');
          messageTextElement.parentElement?.classList.add('role-error');
          playground.setChatState(ChatState.IDLE);
          if (thinking && thinking.parentElement) {
            thinking.parentElement.classList.add('hidden');
            thinking.parentElement.removeAttribute('open');
          }
          return;
        }

        const messagesForOpenAI: Array<OpenAI.Chat.ChatCompletionMessageParam> = [
            { role: 'system', content: instructionsForThisCall } // Use instructionsForThisCall
        ];
        // For evolve requests, don't include past chat history to keep it focused on the current task.
        if (!isEvolveRequest) {
            apiChatHistory.forEach(turn => {
                messagesForOpenAI.push({role: turn.role as "user" | "assistant", content: turn.content});
            });
        }
        messagesForOpenAI.push({ role: 'user', content: currentMessageToSend });

        const stream = await openai.chat.completions.create({
            model: modelName,
            messages: messagesForOpenAI,
            stream: true,
            temperature: currentChatOptions.temperature,
            top_p: currentChatOptions.topP,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
                playground.setChatState(ChatState.CODING);
                accumulatedText += content;
                let explanation = accumulatedText;
                const tempExtractedCode = getCode(accumulatedText, isSuperBeautifulMode); 
                 if (tempExtractedCode) {
                    const codeBlockRegexStr = isSuperBeautifulMode ? '```html\\s*([\\s\\S]*?)\\s*```' : '```javascript\\s*([\\s\\S]*?)\\s*```';
                    const codeBlockRegex = new RegExp(codeBlockRegexStr, 'g');
                    explanation = accumulatedText.replace(codeBlockRegex, '').trim();
                }
                messageTextElement.innerHTML = await marked.parse(explanation);
            }
            playground.scrollToTheEnd();
        }
        // Only add to history if not an evolve request or if you decide evolve steps should be part of main history
        if (!isEvolveRequest) {
            apiChatHistory.push({role: 'user', content: currentMessageToSend});
            apiChatHistory.push({role: 'assistant', content: accumulatedText});
        }
        extractedCode = getCode(accumulatedText, isSuperBeautifulMode);

      } else if (modelName?.startsWith('gemini-')) {
        // For Gemini, we might need a temporary chat instance if the system prompt is different (evolve)
        let chatToUse = aiChat;
        if (isEvolveRequest || instructionsForThisCall !== currentSystemInstructions) {
            const tempChatOptions = {...currentChatOptions, isEvolveMode: isEvolveRequest};
            chatToUse = createAiChat(tempChatOptions); // Creates chat with specific instructions for this call
        }

        if (!chatToUse) { 
             messageTextElement.innerHTML = await marked.parse('Lỗi: Không thể khởi tạo chat với model Gemini đã chọn. Vui lòng kiểm tra lại cấu hình model trong Developer Tools hoặc API key.');
             messageTextElement.parentElement?.classList.remove('role-assistant');
             messageTextElement.parentElement?.classList.add('role-error');
             playground.setChatState(ChatState.IDLE);
             if (thinking && thinking.parentElement) {
                thinking.parentElement.classList.add('hidden');
                thinking.parentElement.removeAttribute('open');
            }
            return;
        }

        const res = await chatToUse.sendMessageStream({ message: currentMessageToSend });
        for await (const chunk of res) {
          const chunkText = chunk.text;
          if (chunkText) {
              playground.setChatState(ChatState.CODING); 
              accumulatedText += chunkText;
              
              let processedTextForDisplay = accumulatedText;
              if (!isSuperBeautifulMode && !isEvolveRequest && currentChatOptions.enableAiImageGeneration && modelName?.startsWith('gemini-')) {
                  processedTextForDisplay = processedTextForDisplay.replace(AI_IMAGE_REQUEST_REGEX, (match, imgPrompt) => {
                      const imageRequestId = `ai-img-${Date.now()}-${Math.random().toString(36).substring(2,7)}`;
                      const placeholder = `<div id="${imageRequestId}" class="ai-image-placeholder">Đang tạo ảnh: ${imgPrompt.substring(0,50)}${imgPrompt.length > 50 ? '...' : ''}</div>`;
                      aiImageRequests.push({ id: imageRequestId, prompt: imgPrompt.trim(), placeholder });
                      return placeholder; 
                  });
              }
              
              let explanation = processedTextForDisplay;
              const tempExtractedCode = getCode(processedTextForDisplay, isSuperBeautifulMode);
              if (isSuperBeautifulMode) {
                  explanation = explanation.replace(AI_LOGO_REQUEST_REGEX, '').trim(); 
              } else { // p5.js or evolve mode
                  if (tempExtractedCode) {
                      // Regex for ```javascript or just ```
                      const codeBlockRegexStr = '```(?:javascript)?\\s*([\\s\\S]*?)\\s*```';
                      const codeBlockRegex = new RegExp(codeBlockRegexStr, 'g');
                      explanation = processedTextForDisplay.replace(codeBlockRegex, '').trim();
                  }
              }
              messageTextElement.innerHTML = await marked.parse(explanation);
          }
          playground.scrollToTheEnd();
        }
        
        if (!isEvolveRequest && chatToUse === aiChat) {
            apiChatHistory.push({role: 'user', content: currentMessageToSend});
            apiChatHistory.push({role: 'assistant', content: accumulatedText});
        }


        if (isSuperBeautifulMode && modelName?.startsWith('gemini-')) {
            const logoMatch = accumulatedText.match(AI_LOGO_REQUEST_REGEX);
            if (logoMatch && logoMatch[1] && playground.generateImageHandler) {
                const logoPrompt = logoMatch[1].trim();
                playground.addMessage('SYSTEM', `AI yêu cầu logo. Đang tạo logo với prompt: "${logoPrompt.substring(0, 60)}${logoPrompt.length > 60 ? '...' : ''}"`);
                playground.setChatState(ChatState.GENERATING); 
                
                const logoImageUrl = await playground.generateImageHandler(logoPrompt, `logo-for-site-${Date.now()}`);
                playground.setChatState(ChatState.CODING); 

                if (logoImageUrl) {
                    accumulatedText = accumulatedText.replace('AI_LOGO_PLACEHOLDER', logoImageUrl);
                    playground.addMessage('SYSTEM', 'Logo đã được tạo và chèn vào mã.');
                } else {
                    accumulatedText = accumulatedText.replace('AI_LOGO_PLACEHOLDER', './placeholder_logo_error.png'); 
                    playground.addMessage('ERROR', 'Không thể tạo logo. Mã HTML có thể cần được cập nhật thủ công.');
                }
                accumulatedText = accumulatedText.replace(AI_LOGO_REQUEST_REGEX, '');
            }
        }
        extractedCode = getCode(accumulatedText, isSuperBeautifulMode);


      } else if (['deepseek-coder', 'grok-llama', 'claude-3-opus', 'llama-3-70b'].includes(modelName || '')) {
        let modelDisplayName = '';
        if (modelName === 'deepseek-coder') modelDisplayName = 'DeepSeek Coder';
        else if (modelName === 'grok-llama') modelDisplayName = 'Grok (LLaMA)';
        else if (modelName === 'claude-3-opus') modelDisplayName = 'Claude 3 Opus';
        else if (modelName === 'llama-3-70b') modelDisplayName = 'Llama 3 70B';
        
        messageTextElement.innerHTML = await marked.parse(`Model **${modelDisplayName}** đã được chọn. Tích hợp API đầy đủ cho model này chưa khả dụng. Không có lệnh gọi API nào được thực hiện.`);
        playground.setChatState(ChatState.IDLE);
         if (thinking && thinking.parentElement) {
            thinking.parentElement.classList.add('hidden');
            thinking.parentElement.removeAttribute('open');
        }
        // Add to chat history so context clear works as expected by user, if not evolve
        if (!isEvolveRequest) {
            apiChatHistory.push({role: 'user', content: currentMessageToSend});
            apiChatHistory.push({role: 'assistant', content: `Model ${modelDisplayName} được chọn, không có API call.`});
        }
        return; 
      } else {
        messageTextElement.innerHTML = await marked.parse(`Lỗi: Model không xác định hoặc không được hỗ trợ: ${modelName}.`);
        messageTextElement.parentElement?.classList.remove('role-assistant');
        messageTextElement.parentElement?.classList.add('role-error');
        playground.setChatState(ChatState.IDLE);
        if (thinking && thinking.parentElement) {
          thinking.parentElement.classList.add('hidden');
          thinking.parentElement.removeAttribute('open');
        }
        return;
      }
    } catch (e: any) {
      console.error('Lỗi API:', e);
      let displayMessage = 'Đã xảy ra lỗi khi giao tiếp với AI.';
      if (currentChatOptions.modelName?.startsWith('openai-')) {
          if (e instanceof OpenAI.APIError) {
              displayMessage = e.message;
              if (e.status) displayMessage = `Lỗi ${e.status}: ${displayMessage}`;
          } else if (e.message) {
              displayMessage = e.message;
          }
      } else { 
         if (e && e.message) {
          displayMessage = e.message;
        }
        if (typeof displayMessage === 'string' && displayMessage.startsWith('{') && displayMessage.endsWith('}')) {
            try {
                const errorObj = JSON.parse(displayMessage);
                if (errorObj.error && errorObj.error.message) {
                    displayMessage = errorObj.error.message;
                }
            } catch (parseError) { /* Ignore */ }
        } else { 
            const splitPos = typeof displayMessage === 'string' ? displayMessage.indexOf('{') : -1;
            if (splitPos > -1) {
              const msgJson = displayMessage.substring(splitPos);
              try {
                const sdkError = JSON.parse(msgJson);
                if (sdkError.error && sdkError.error.message) {
                  displayMessage = sdkError.error.message;
                }
              } catch (parseError) { /* Ignore */ }
            }
        }
      }
      messageTextElement.innerHTML = await marked.parse(`Lỗi API:\n${displayMessage}`);
      messageTextElement.parentElement?.classList.remove('role-assistant');
      messageTextElement.parentElement?.classList.add('role-error');
      // Push error to history for context
      if (!isEvolveRequest) {
        apiChatHistory.push({role: 'user', content: currentMessageToSend});
        apiChatHistory.push({role: 'assistant', content: `Error: ${displayMessage}`});
      }
    }

    if (aiImageRequests.length > 0 && playground.generateImageHandler) {
        aiImageRequests.forEach(req => {
            playground.generateImageHandler!(req.prompt, req.id);
        });
    }
    
    if (thinking && thinking.parentElement) {
        thinking.parentElement.classList.add('hidden');
        thinking.parentElement.removeAttribute('open');
    }

    const finalExplanationHtml = messageTextElement.innerHTML.trim();
    if (finalExplanationHtml.length === 0 && extractedCode.trim().length > 0 && !accumulatedText.includes("Lỗi:")) {
      messageTextElement.innerHTML = await marked.parse('Đây là mã bạn yêu cầu:');
    } else if (finalExplanationHtml.length === 0 && extractedCode.trim().length === 0 && !accumulatedText.includes('Lỗi')) {
      if(aiImageRequests.length === 0 && !(isSuperBeautifulMode && accumulatedText.match(AI_LOGO_REQUEST_REGEX))) {
        if (!(['deepseek-coder', 'grok-llama', 'claude-3-opus', 'llama-3-70b'].includes(currentChatOptions.modelName || ''))) {
            messageTextElement.innerHTML = await marked.parse('Hoàn thành.');
        }
      }
    }

    if (extractedCode.trim().length > 0) {
      playground.setCode(extractedCode, isSuperBeautifulMode || isEvolveRequest);
    } else if (accumulatedText.toLowerCase().includes("```javascript") && !isSuperBeautifulMode && !isEvolveRequest && !accumulatedText.includes('Lỗi')) {
      playground.addMessage('SYSTEM', 'AI đã cố gắng gửi mã JavaScript nhưng có vẻ nó trống hoặc không đúng định dạng. Bạn có muốn thử lại không?');
    } else if (isSuperBeautifulMode && !(accumulatedText.toLowerCase().includes("<!doctype html") || accumulatedText.toLowerCase().includes("<html>")) && accumulatedText.trim().length > 0 && !accumulatedText.includes('Lỗi') && !getCode(accumulatedText, true)) {
        // No specific action, text is already rendered.
    }
    playground.setChatState(ChatState.IDLE);
  };

  playground.resetHandler = async () => {
    apiChatHistory = [];
    currentChatOptions.isEvolveMode = false; // Ensure evolve mode is reset
    // AI chat instance is managed by updateModelConfigHandler / updateSystemInstructionsHandler
    // which are called during playground's clearAction.
  };

  playground.setDefaultCode(EMPTY_CODE);
  playground.addMessage(
    'USER',
    'tạo một hiệu ứng động đơn giản cho màu nền',
  );
  if (currentChatOptions.modelName?.startsWith('openai-') && openai) { 
    apiChatHistory.push({role: 'user', content: 'tạo một hiệu ứng động đơn giản cho màu nền'});
    apiChatHistory.push({role: 'assistant', content: 'Đây bạn nhé!'});
  }
  playground.addMessage('ASSISTANT', 'Đây bạn nhé!'); 
  playground.setCode(STARTUP_CODE, false); 
  playground.setInputField(
    'Bắt đầu từ đầu và ' +
      EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)],
  );
});
