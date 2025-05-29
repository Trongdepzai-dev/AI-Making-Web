//Made by @B.Trọng
// SPDX-License-Identifier: MIT

// Ambient type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition; // For Safari/older Chrome
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionErrorCode;
    readonly message: string;
  }

  type SpeechRecognitionErrorCode =
    | 'no-speech'
    | 'aborted'
    | 'audio-capture'
    | 'network'
    | 'not-allowed'
    | 'service-not-allowed'
    | 'bad-grammar'
    | 'language-not-supported';

  const SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };

  interface SpeechRecognition extends EventTarget {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    // serviceURI: string; 

    start(): void;
    stop(): void;
    abort(): void;

    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;

    addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  }

  interface SpeechRecognitionEventMap {
    "audiostart": Event;
    "audioend": Event;
    "end": Event;
    "error": SpeechRecognitionErrorEvent;
    "nomatch": SpeechRecognitionEvent;
    "result": SpeechRecognitionEvent;
    "soundstart": Event;
    "soundend": Event;
    "speechstart": Event;
    "speechend": Event;
    "start": Event;
  }

   interface SpeechGrammarList {
    readonly length: number;
    item(index: number): SpeechGrammar;
    addFromString(string: string, weight?: number): void;
    addFromURI(src: string, weight?: number): void;
    [index: number]: SpeechGrammar;
  }

  interface SpeechGrammar {
    src: string;
    weight: number;
  }
}
// End of Ambient type declarations

/* tslint:disable */
import {html, LitElement, nothing} from 'lit';
import {customElement, query, state}from 'lit/decorators.js';
// tslint:disable-next-line:ban-malformed-import-paths
import hljs from 'highlight.js';
import {classMap} from 'lit/directives/class-map.js';
import {Marked} from 'marked';
import {markedHighlight} from 'marked-highlight';

export const marked = new Marked(
  markedHighlight({
    async: true,
    emptyLangClass: 'hljs', 
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, {language}).value;
    },
  }),
);

const ICON_BUSY = html`<svg class="rotating" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" /></svg>`;
const ICON_EDIT = html`<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" /></svg>`;
const ICON_VOICE = html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Zm0 400q-139 0-239.5-100.5T140-420h80q0 106 70 178t190 72q120 0 190-72t70-178h80q0 139-100.5 239.5T480-80Zm0-320Z"/></svg>`;
const ICON_SEND = html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/></svg>`;
const ICON_RELOAD = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>`;
const ICON_PLAY = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`;
const ICON_STOP = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M320-320h320v-320H320v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`;
const ICON_CLEAR = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z"/></svg>`;
const ICON_EVOLVE = html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m480-80-42-173-173-42 173-42 42-173 42 173 173 42-173 42-42 173Zm0-200L426-82l-156-38 156-38L480-312l54 154 156 38-156 38-54 154Zm280 400L686-82l-42-173-173-42 173-42 42-173 42 173 173 42-173 42-42 173Zm-80-80L654-202l-26-111-111-26 111-26 26-111 26 111 111 26-111 26-26 111ZM480-480Z"/></svg>`;

const p5jsCdnUrl = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.3/p5.min.js';

export enum ChatState { IDLE, GENERATING, THINKING, CODING }
enum ChatTab { GEMINI, CODE }
export enum ChatRole { USER, ASSISTANT, SYSTEM }

interface ModelConfig {
  enableAiImageGeneration?: boolean;
  temperature?: number;
  topK?: number;
  topP?: number;
  thinkingBudget?: number;
  modelName?: string;
  isEvolveMode?: boolean;
}

type ObfuscationLevel = 'none' | 'basic' | 'medium' | 'advanced' | 'extremely_aops';

@customElement('gdm-playground')
export class Playground extends LitElement {
  @query('#anchor') anchor!: HTMLElement;
  @query('#reloadTooltip') reloadTooltip!: HTMLElement;
  @query('#messageInput') messageInputElement!: HTMLInputElement;
  @query('#morphDirectiveInput') morphDirectiveInputElement!: HTMLInputElement;


  private readonly codeSyntax: HTMLDivElement = document.createElement('div');

  @state() chatState: ChatState = ChatState.IDLE;
  @state() isRunning: boolean = true;
  @state() selectedChatTab: ChatTab = ChatTab.GEMINI;
  @state() inputMessage: string = '';
  @state() code: string = '';
  @state() messages: HTMLElement[] = [];
  @state() codeHasChanged: boolean = true;
  @state() codeNeedsReload: boolean = false;

  @state() devToolsVisible: boolean = false;
  @state() devToolsClickCount: number = 0;
  @state() systemPromptDraft: string = ''; // This will reflect the currently active system prompt
  @state() imageGenPrompt: string = '';
  @state() generatedImageUrl: string | null = null;
  @state() imageGenLoading: boolean = false;
  @state() voiceInputActive: boolean = false;
  @state() voiceInputStatus: string = '';
  private recognition: SpeechRecognition | null = null;

  @state() modelConfigDraft: ModelConfig = {
    enableAiImageGeneration: false,
    thinkingBudget: undefined, 
    temperature: 0.7, 
    topK: 40,         
    topP: 0.95,
    modelName: 'gemini-2.5-flash-preview-04-17',
    isEvolveMode: false,
  };
  
  @state() superBeautifulModeActive: boolean = false;
  @state() obfuscationLevel: ObfuscationLevel = 'none';
  @state() morphDirective: string = '';


  private defaultCode: string = '';
  private readonly previewFrame: HTMLIFrameElement = document.createElement('iframe');
  private lastError: string = '';
  private reportedError: boolean = false;

  sendMessageHandler?: (input: string, role: string, code: string, codeHasChanged: boolean, isEvolveRequest?: boolean) => Promise<void>;
  resetHandler?: CallableFunction;
  updateSystemInstructionsHandler?: (isSuperBeautifulMode: boolean, isEvolveContext?: boolean) => Promise<void>;
  generateImageHandler?: (prompt: string, imageRequestId?: string) => Promise<string | null>;
  updateModelConfigHandler?: (newConfig: ModelConfig) => Promise<void>;
  clearAiContextHandler?: () => Promise<void>;
  handleEvolveCodeRequest?: (currentP5Code: string, morphDirective: string) => Promise<void>;


  constructor() {
    super();
    this.previewFrame.classList.add('preview-iframe');
    this.previewFrame.setAttribute('allowTransparency', 'true');
    this.previewFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms allow-modals');
    this.codeSyntax.classList.add('code-syntax');

    window.addEventListener('message', (msg) => {
        if (msg.data && typeof msg.data === 'string') {
          try {
            const message = JSON.parse(msg.data).message;
            this.runtimeErrorHandler(message);
          } catch (e) { /* console.error(e); */ }
        }
      }, false);
  }

  createRenderRoot() { return this; }

 public setInitialSystemPrompt(prompt: string) {
    this.systemPromptDraft = prompt;
  }
  public setInitialModelConfig(config: ModelConfig) {
    this.modelConfigDraft = { ...this.modelConfigDraft, ...config };
  }
  public setInitialSuperBeautifulMode(isSuper: boolean) {
    this.superBeautifulModeActive = isSuper;
  }

  public setImageGenLoading(isLoading: boolean) { this.imageGenLoading = isLoading; }
  public setGeneratedImageUrl(url: string | null) { this.generatedImageUrl = url; }

  public updateAIRequestedImage(imageRequestId: string, imageUrl: string | null, prompt: string, error?: string) {
    const placeholderDiv = this.shadowRoot?.querySelector(`#${imageRequestId}`) ?? document.getElementById(imageRequestId);
    if (placeholderDiv) {
        if (imageUrl) {
            placeholderDiv.innerHTML = `<img src="${imageUrl}" alt="Ảnh do AI tạo: ${prompt}" class="ai-generated-image-inline"/>`;
        } else {
            placeholderDiv.innerHTML = `<p class="ai-image-error">Lỗi tạo ảnh: ${error || 'Không thể tải ảnh.'} (Prompt: ${prompt})</p>`;
        }
    }
  }

  setDefaultCode(code: string) { this.defaultCode = code; }

  async setCode(code: string, isHtmlOrEvolvedContent = false) { // isHtmlOrEvolvedContent means it's either superbeautiful or p5js that might have been evolved
    this.code = code;
    this.runCode(code, isHtmlOrEvolvedContent && this.superBeautifulModeActive); // Only pass true for isHtmlContent if superBeautifulModeActive
    const displayLang = (isHtmlOrEvolvedContent && this.superBeautifulModeActive) ? 'html' : 'javascript';
    this.codeSyntax.innerHTML = await marked.parse('```' + displayLang + '\n' + (code || ' ') + '\n```');
  }

  setChatState(state: ChatState) { this.chatState = state; }

  runCode(codeToRun: string, isHtmlContent = false) {
    this.reportedError = false;
    this.lastError = '';
    const errorHandlingScript = `
        window.addEventListener('message', (event) => {
            if (event.data === 'stop' && typeof noLoop === 'function') { noLoop(); console.log('Bản phác thảo đã dừng (noLoop)'); }
            else if (event.data === 'resume' && typeof loop === 'function') { loop(); console.log('Bản phác thảo đã tiếp tục (loop)'); }
        }, false);
        window.onerror = function(message, source, lineno, colno, error) {
          parent.postMessage(JSON.stringify({message: message.toString()}), '*');
          let con = document.querySelector('.error-console');
          if (!con) {
            con = document.createElement('pre');
            con.className = 'error-console';
            document.body.appendChild(con);
          }
          con.textContent = 'Lỗi: ' + message + '\\nTại: ' + source + ':' + lineno + '\\nKiểm tra console hoặc yêu cầu B.Trọng AI sửa.';
          return true;
        };`;

    if (isHtmlContent && (codeToRun.toLowerCase().includes('<!doctype html>') || codeToRun.toLowerCase().includes('<html>'))) {
        let finalHtml = codeToRun;
        if (!finalHtml.includes('window.onerror')) { 
            const scriptTagEnd = finalHtml.search(/<\/\s*head\s*>/i);
            if (scriptTagEnd !== -1) {
                finalHtml = finalHtml.slice(0, scriptTagEnd) + `<script>${errorHandlingScript}<\/script>` + finalHtml.slice(scriptTagEnd);
            } else { 
                 const bodyTagEnd = finalHtml.search(/<\/\s*body\s*>/i);
                 if (bodyTagEnd !== -1) {
                    finalHtml = finalHtml.slice(0, bodyTagEnd) + `<script>${errorHandlingScript}<\/script>` + finalHtml.slice(bodyTagEnd);
                 }
            }
        }
        this.previewFrame.setAttribute('srcdoc', finalHtml);
    } else { // p5.js mode (or evolved p5.js code)
        const htmlContent = `
          <!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bản phác thảo p5.js - B.Trọng AI</title>
          <style>body { margin: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #ffffff; } main { display: flex; justify-content: center; align-items: center; } canvas { display: block; } .error-console { position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(255,0,0,0.8); padding: 1em; margin: 0; color: white; font-family: monospace; z-index: 9999;}</style>
          <script src="${p5jsCdnUrl}"><\/script><script>${errorHandlingScript}<\/script></head><body>
          <script>//Made by @B.Trọng \ntry { ${codeToRun} } catch (error) { console.error("Lỗi trong bản phác thảo:", error); parent.postMessage(JSON.stringify({message: error.toString()}), '*'); }<\/script>
          </body></html>`;
        this.previewFrame.setAttribute('srcdoc', htmlContent);
    }
    this.codeNeedsReload = false;
  }

  runtimeErrorHandler(errorMessage: string) {
    this.reportedError = true;
    if (this.lastError !== errorMessage) {
      this.addMessage('system-ask', errorMessage);
    }
    this.lastError = errorMessage;
  }

  setInputField(message: string) { this.inputMessage = message.trim(); }

  addMessage(role: string, message: string) {
    const div = document.createElement('div');
    div.classList.add('turn', `role-${role.trim()}`);
    const thinkingDetails = document.createElement('details');
    thinkingDetails.classList.add('hidden', 'thinking'); 
    const summary = document.createElement('summary');
    summary.textContent = 'Đang suy nghĩ...'; 
    const thinking = document.createElement('div');
    thinkingDetails.append(summary, thinking);
    div.append(thinkingDetails); 
    const text = document.createElement('div');
    text.className = 'text';
    Promise.resolve(marked.parse(message))
        .then(parsedHtml => { text.innerHTML = parsedHtml ?? ''; })
        .catch(err => { 
            console.error('Markdown parsing error:', err);
            text.textContent = message; 
        });
    div.append(text);
    if (role === 'system-ask') {
      const btn = document.createElement('button');
      btn.textContent = 'Cải thiện';
      div.appendChild(btn);
      btn.addEventListener('click', () => { div.removeChild(btn); this.sendMessageAction(message, 'SYSTEM'); });
    }
    this.messages.push(div);
    (this as LitElement).requestUpdate();
    this.scrollToTheEnd();
    return {thinking, text}; 
  }

  scrollToTheEnd() { requestAnimationFrame(() => { if (this.anchor) this.anchor.scrollIntoView({behavior: 'smooth', block: 'end'}); }); }

  async sendMessageAction(message?: string, role?: string) {
    if (this.chatState !== ChatState.IDLE) return;
    this.chatState = ChatState.GENERATING;
    let msg = (message || this.inputMessage).trim();
    if (!message) this.inputMessage = '';
    if (msg.length === 0) { this.chatState = ChatState.IDLE; return; }
    const msgRole = role ? role.toLowerCase() : 'user';
    if (msgRole === 'user' && msg) this.addMessage(msgRole, msg);
    if (this.sendMessageHandler) {
      // For evolve requests, the specific handler in index.tsx will format the actual prompt.
      // Here we just pass the user's directive.
      await this.sendMessageHandler(msg, msgRole, this.code, this.codeHasChanged, false); // isEvolveRequest is false for normal send
      this.codeHasChanged = false;
    }
  }

  private async playAction() {
    if (this.isRunning) return;
    if (this.codeHasChanged) this.runCode(this.code, this.superBeautifulModeActive);
    this.isRunning = true;
    this.previewFrame.contentWindow!.postMessage('resume', '*');
  }
  private async stopAction() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.previewFrame.contentWindow!.postMessage('stop', '*');
  }

 private async clearAction() {
    this.setCode(this.defaultCode, false); 
    this.messages = [];
    this.codeHasChanged = true; 
    this.morphDirective = ''; // Clear morph directive

    const defaultSuperBeautifulMode = false;
    const defaultModelName = 'gemini-2.5-flash-preview-04-17';
    const defaultModelConfig: ModelConfig = {
        enableAiImageGeneration: false,
        thinkingBudget: undefined,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        modelName: defaultModelName,
        isEvolveMode: false, // Ensure evolve mode is off
    };
    
    this.superBeautifulModeActive = defaultSuperBeautifulMode;
    this.modelConfigDraft = { ...defaultModelConfig };
    this.obfuscationLevel = 'none';

    if (this.updateSystemInstructionsHandler) {
        await this.updateSystemInstructionsHandler(defaultSuperBeautifulMode, false); // Explicitly false for evolve context
    }
    if (this.updateModelConfigHandler) {
        await this.updateModelConfigHandler(defaultModelConfig); 
    }
    
    if (this.resetHandler) await this.resetHandler(); 

    this.addMessage('USER', 'tạo một hiệu ứng động đơn giản cho màu nền');
    this.addMessage('ASSISTANT', 'Đây bạn nhé!');
    (this as LitElement).requestUpdate(); 
  }

  private async codeEditedAction(code: string) {
    if (this.chatState !== ChatState.IDLE) return;
    this.code = code;
    this.codeHasChanged = true;
    this.codeNeedsReload = true;
    const displayLang = this.superBeautifulModeActive && (code.includes('<html>') || code.includes('<!doctype html>')) ? 'html' : 'javascript';
    this.codeSyntax.innerHTML = await marked.parse('```' + displayLang + '\n' + (code || ' ') + '\n```');
  }
  private async inputKeyDownAction(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); this.sendMessageAction(); }
  }
  private async reloadCodeAction() { this.runCode(this.code, this.superBeautifulModeActive); this.isRunning = true; }

  private handleGeminiTabClick() {
    if (this.selectedChatTab !== ChatTab.GEMINI) {
      this.selectedChatTab = ChatTab.GEMINI; this.devToolsClickCount = 0; 
    } else {
      this.devToolsClickCount++;
      if (this.devToolsClickCount >= 7) { this.devToolsVisible = !this.devToolsVisible; this.devToolsClickCount = 0; }
    }
  }

  private async handleApplySystemPromptChanges() {
    if (this.updateSystemInstructionsHandler) {
      // Pass current superBeautifulModeActive and ensure evolve context is false for general prompt updates
      await this.updateSystemInstructionsHandler(this.superBeautifulModeActive, false);
    }
  }
  
  private async handleToggleSuperBeautifulMode(e: Event) {
    this.superBeautifulModeActive = (e.target as HTMLInputElement).checked;
    if (this.superBeautifulModeActive) {
        this.modelConfigDraft = {...this.modelConfigDraft, enableAiImageGeneration: false, isEvolveMode: false};
        // Obfuscation dropdown and Infinite Power section will be disabled via their .disabled attributes
    }
    if (this.updateSystemInstructionsHandler) {
      // When toggling Super Beautiful, ensure evolve context is false
      await this.updateSystemInstructionsHandler(this.superBeautifulModeActive, false);
    }
     if (this.updateModelConfigHandler) { 
        await this.updateModelConfigHandler(this.modelConfigDraft);
    }
  }

  // --- OBFUSCATION LOGIC ---
  private p5Keywords = new Set(['createCanvas', 'background', 'fill', 'stroke', 'rect', 'ellipse', 'line', 'point', 'text', 'textSize', 'textAlign', 'colorMode', 'HSB', 'RGB', 'width', 'height', 'windowWidth', 'windowHeight', 'mouseX', 'mouseY', 'pmouseX', 'pmouseY', 'keyCode', 'keyIsPressed', 'mouseIsPressed', 'LEFT_ARROW', 'RIGHT_ARROW', 'UP_ARROW', 'DOWN_ARROW', 'PI', 'TWO_PI', 'HALF_PI', 'QUARTER_PI', 'radians', 'degrees', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'abs', 'sqrt', 'pow', 'map', 'constrain', 'min', 'max', 'random', 'noise', 'loadFont', 'loadImage', 'createGraphics', 'push', 'pop', 'translate', 'rotate', 'scale', 'shearX', 'shearY', 'noFill', 'noStroke', 'strokeWeight', 'ellipseMode', 'rectMode', 'imageMode', 'CENTER', 'CORNER', 'CORNERS', 'RADIUS', 'setup', 'draw', 'preload', 'mouseClicked', 'mousePressed', 'mouseReleased', 'mouseMoved', 'mouseDragged', 'mouseWheel', 'keyPressed', 'keyReleased', 'keyTyped', 'windowResized', 'noLoop', 'loop', 'frameRate', 'frameCount', 'WEBGL']);
  private jsKeywords = new Set(['Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object', 'RegExp', 'String', 'Symbol', 'Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError', 'JSON', 'Promise', 'Proxy', 'Map', 'Set', 'WeakMap', 'WeakSet', 'ArrayBuffer', 'SharedArrayBuffer', 'Atomics', 'DataView', 'Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'BigInt64Array', 'BigUint64Array', 'Infinity', 'NaN', 'undefined', 'isNaN', 'isFinite', 'parseFloat', 'parseInt', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'unescape', 'console', 'document', 'window', 'navigator', 'location', 'history', 'screen', 'localStorage', 'sessionStorage', 'alert', 'confirm', 'prompt', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'fetch', 'URL', 'URLSearchParams', 'Headers', 'Request', 'Response', 'Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'SVGElement', 'DocumentFragment', 'ShadowRoot', 'Worker', 'AudioContext', 'AnalyserNode', 'BiquadFilterNode', 'BufferSourceNode', 'ChannelMergerNode', 'ChannelSplitterNode', 'ConstantSourceNode', 'ConvolverNode', 'DelayNode', 'DynamicsCompressorNode', 'GainNode', 'IIRFilterNode', 'MediaElementAudioSourceNode', 'MediaStreamAudioDestinationNode', 'MediaStreamAudioSourceNode', 'OscillatorNode', 'PannerNode', 'StereoPannerNode', 'WaveShaperNode', 'AudioBuffer', 'PeriodicWave', 'AudioListener', 'AudioParam', 'BaseAudioContext', 'OfflineAudioContext', 'XMLHttpRequest', 'FormData', 'FileReader', 'Blob', 'File', 'WebSocket', 'Image', 'HTMLImageElement', 'HTMLCanvasElement', 'CanvasRenderingContext2D', 'WebGLRenderingContext', 'WebGL2RenderingContext', 'Path2D', 'ImageBitmap', 'ImageData', 'TextMetrics', 'CanvasGradient', 'CanvasPattern', 'localStorage', 'sessionStorage', 'indexedDB', 'DOMException', 'DOMMatrix', 'DOMPoint', 'DOMQuad', 'DOMRect', 'performance', 'crypto', ' SubtleCrypto', 'addEventListener', 'removeEventListener', 'dispatchEvent', 'postMessage', 'function', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'let', 'const', 'var', 'class', 'extends', 'super', 'this', 'new', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'void', 'delete', 'yield', 'async', 'await', 'import', 'export', 'default', 'null', 'true', 'false', 'get', 'set', 'constructor', 'static', 'debugger', 'with', 'arguments']);

  private isSafeToRename(name: string): boolean {
    return !this.p5Keywords.has(name) && !this.jsKeywords.has(name) && !name.startsWith('_obf_') && !/^(setup|draw|preload|mouse[A-Z]|key[A-Z]|windowResized)$/.test(name);
  }

  private obfuscateBasic(code: string): string {
    let obfuscated = code;
    obfuscated = obfuscated.replace(/\/\/.*/g, ''); 
    obfuscated = obfuscated.replace(/\/\*[\s\S]*?\*\//g, ''); 
    obfuscated = obfuscated.replace(/\s*([;{}=,\(\)\+\-\*\/<>!&|%?:])\s*/g, '$1'); 
    obfuscated = obfuscated.replace(/\n\s*\n/g, '\n'); 
    obfuscated = obfuscated.replace(/^\s+|\s+$/gm, ''); 
    obfuscated = obfuscated.replace(/\s+/g, ' '); 
    return obfuscated;
  }

  private obfuscateMedium(code: string): string {
    let obfuscated = this.obfuscateBasic(code);
    let varCounter = 0;
    const renamedVars = new Map<string, string>();

    obfuscated = obfuscated.replace(/(?:(let|const|var)\s+)([a-zA-Z_]\w*)|(?:function\s+([a-zA-Z_]\w*)\s*\(([^)]*)\))|(?:(\w+)\s*=>)/g, (match, declarationType, varName, funcName, params, arrowParam) => {
      if (declarationType && varName && this.isSafeToRename(varName)) {
          const newName = `_v${varCounter++}`;
          renamedVars.set(varName, newName);
          return `${declarationType} ${newName}`;
      } else if (funcName && params) {
          // Don't rename p5.js lifecycle functions
          if (!this.isSafeToRename(funcName) && (this.p5Keywords.has(funcName) || /^(setup|draw|preload)$/.test(funcName))) { 
            // only rename params for p5 lifecycle functions
             const paramNames = params.split(',').map(p => p.trim()).filter(p => p.length > 0);
             const newParams = paramNames.map(p => {
                 if (this.isSafeToRename(p)) {
                    const newName = `_p${varCounter++}`;
                    renamedVars.set(p, newName);
                    return newName;
                }
                return p;
            }).join(',');
            return match.replace(params, newParams);
          } else if (this.isSafeToRename(funcName)) { // User-defined function
            const newFuncName = `_f${varCounter++}`;
            renamedVars.set(funcName, newFuncName);
            const paramNames = params.split(',').map(p => p.trim()).filter(p => p.length > 0);
            const newParams = paramNames.map(p => {
                 if (this.isSafeToRename(p)) {
                    const newName = `_p${varCounter++}`;
                    renamedVars.set(p, newName);
                    return newName;
                }
                return p;
            }).join(',');
            return `function ${newFuncName}(${newParams})`;
          }
      } else if (arrowParam && this.isSafeToRename(arrowParam)) {
         const newName = `_a${varCounter++}`;
         renamedVars.set(arrowParam, newName);
         return `${newName}=>`;
      }
      return match;
    });
    
    let tempObfuscated = obfuscated;
    renamedVars.forEach((newName, oldName) => {
      tempObfuscated = tempObfuscated.replace(new RegExp(`\\b${oldName}\\b`, 'g'), newName);
    });
    obfuscated = tempObfuscated;
    
    obfuscated = obfuscated.replace(/\b(10)\b/g, '(0xA)');
    obfuscated = obfuscated.replace(/\b(20)\b/g, '(0x14)');
    obfuscated = obfuscated.replace(/\b(100)\b/g, '(0x64)');
    obfuscated = obfuscated.replace(/\b(255)\b/g, '(0xFF)');
    return obfuscated;
  }

  private obfuscateAdvanced(code: string): string {
    let obfuscated = this.obfuscateMedium(code);
    obfuscated = obfuscated.replace(/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g, (match, doubleStr, singleStr) => {
        const strContent = doubleStr || singleStr;
        if (strContent && strContent.length > 1 && strContent.length < 30 && /^[a-zA-Z0-9\s.,!?]*$/.test(strContent)) {
            const charCodes = strContent.split('').map(c => c.charCodeAt(0)).join(',');
            return `String.fromCharCode(${charCodes})`;
        }
        return match;
    });

    obfuscated = obfuscated.replace(/\b(\d+)\b/g, (match, numStr) => {
        const num = parseInt(numStr, 10);
        if (!isNaN(num)) {
            if (num > 5 && num < 100) {
                 if (num % 2 === 0) return `((${num}<<1)>>1)`;
                 else return `(${num-1}+1)`;
            } else if (num >= 100 && num < 500) {
                return `(${num*2}/2)`;
            }
        }
        return match;
    });
    if (!obfuscated.includes('class ') && obfuscated.includes('setup')) {
       const junkFunc = `function _j${Math.random().toString(16).slice(2,8)}(){let _x=Math.random()*100;if(_x>200){console.log(_x);}}`;
       const firstSetup = obfuscated.indexOf("function setup");
       if(firstSetup > -1) {
           obfuscated = obfuscated.slice(0, firstSetup) + junkFunc + obfuscated.slice(firstSetup);
       } else {
           obfuscated += junkFunc;
       }
    }
    return obfuscated;
  }

  private obfuscateExtremelyAops(code: string): string {
    let obfuscated = this.obfuscateAdvanced(code); // Start with advanced
    let idCounter = 0;
    const generateId = () => `_${(idCounter++).toString(36)}`;
    const renamedIds = new Map<string, string>();

    // 1. Aggressive Identifier Renaming (local scope)
    // This needs a proper parser for safety, regex is very risky for this level.
    // For now, we'll stick to what medium/advanced do for renaming as it's safer.
    // Adding Unicode-like names for new helper vars introduced by this function:
    const unicodeHelperVar = () => `\u005f\u005f${generateId()}`;


    // 3. String Encoding (more robust)
    const strings: string[] = [];
    obfuscated = obfuscated.replace(/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g, (match, doubleStr, singleStr) => {
        const strContent = doubleStr || singleStr;
        if (strContent && strContent.length > 0) {
            const existingIndex = strings.indexOf(strContent);
            if (existingIndex > -1) {
                return `_s[${existingIndex}]`;
            }
            strings.push(strContent);
            return `_s[${strings.length - 1}]`;
        }
        return match;
    });
    if (strings.length > 0) {
        const stringArrayDeclaration = `let _s = [${strings.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',')}];`;
        obfuscated = stringArrayDeclaration + obfuscated;
    }
    
    // 4. Control Flow Obfuscation
    obfuscated = obfuscated.replace(/if\s*\((.*?)\)\s*\{(.*?)\}/g, (match, condition, body) => {
        if (!body.includes('else') && !body.includes('return')) { // Simple if
            return `(${condition})&&(${body.replace(/;\s*$/, '')});`;
        }
        return match;
    });
    // Add an opaque predicate (simple example)
     if (obfuscated.includes('draw=')) { // Look for draw function assignment
        const opaqueVar = unicodeHelperVar();
        obfuscated = `let ${opaqueVar} = ${Math.floor(Math.random()*100)};` + obfuscated.replace(/draw\s*=\s*function\s*\(\)\s*\{/, `draw=function(){if(${opaqueVar} < 200){`);
    }


    // 5. Object/Property Access Obfuscation (example for console.log)
    obfuscated = obfuscated.replace(/console\.log/g, `window['con'.concat('sole')]['l\\u006fg']`);
    obfuscated = obfuscated.replace(/Math\.random/g, `window['Ma'+'th']['ran'+'dom']`);
    obfuscated = obfuscated.replace(/Math\.PI/g, `window['\\x4dath']['\\x50I']`);


    // 6. Dead Code Injection (more elaborate)
    if (obfuscated.includes('setup=')) {
        const deadVar = unicodeHelperVar();
        const deadFunc = `function ${unicodeHelperVar()}(){ let ${deadVar}=0; for(let i=0;i<${Math.floor(Math.random()*3)+1};i++){${deadVar}+=i;} return ${deadVar} > 1000 ? true:false; }`;
        obfuscated = deadFunc + obfuscated;
    }

    // 7. Use new Function for a simple constant (example)
    if (obfuscated.length > 200) { // Only if code is somewhat substantial
        const constName = unicodeHelperVar();
        const constVal = Math.floor(Math.random() * 100) + 50;
        // obfuscated = `let ${constName} = (new Function('return ${constVal};'))();\n` + obfuscated;
        // This can be risky if not placed correctly. For now, this specific rule is too broad.
    }

    // Wrap the whole thing in an IIFE if it's p5.js code
    if (!obfuscated.trim().startsWith('(function(){') && obfuscated.includes('function setup()')) {
      //  obfuscated = `(function(){${obfuscated}})();`; // This can break p5 global mode. Revisit if p5 instance mode is used.
    }

    return obfuscated.replace(/\s+/g, ' '); // Final compression
  }


  private async handleObfuscateCode() {
    if (!this.code || this.superBeautifulModeActive) {
        this.addMessage('SYSTEM', 'Làm rối mã chỉ khả dụng cho chế độ p5.js và khi có mã.');
        return;
    }
    
    let obfuscatedCode = this.code;
    let levelApplied = this.obfuscationLevel;
    switch (this.obfuscationLevel) {
        case 'basic':
            obfuscatedCode = this.obfuscateBasic(this.code);
            break;
        case 'medium':
            obfuscatedCode = this.obfuscateMedium(this.code);
            break;
        case 'advanced':
            obfuscatedCode = this.obfuscateAdvanced(this.code);
            break;
        case 'extremely_aops':
            obfuscatedCode = this.obfuscateExtremelyAops(this.code);
            break;
        case 'none':
        default:
            this.addMessage('SYSTEM', 'Vui lòng chọn một cấp độ làm rối mã.');
            return;
    }

    await this.setCode(obfuscatedCode, false); 
    this.codeHasChanged = true;
    this.codeNeedsReload = true; 
    this.addMessage('SYSTEM', `Mã JavaScript đã được làm rối (cấp độ: ${levelApplied}). Xem tab "Mã nguồn" và tải lại nếu cần.`);
  }


  private async handleApplyModelConfig() {
    if (this.updateModelConfigHandler) {
        const configToApply: ModelConfig = {
            ...this.modelConfigDraft,
            temperature: parseFloat(this.modelConfigDraft.temperature as any),
            topK: parseInt(this.modelConfigDraft.topK as any, 10),
            topP: parseFloat(this.modelConfigDraft.topP as any),
            isEvolveMode: this.superBeautifulModeActive ? false : this.modelConfigDraft.isEvolveMode // Ensure evolve is off for super beautiful
        };
        if (!configToApply.modelName?.startsWith('gemini-') || this.superBeautifulModeActive) {
            configToApply.enableAiImageGeneration = false;
        }
        await this.updateModelConfigHandler(configToApply);
    }
  }
  
  private async handleEvolveButtonClick() {
    if (this.handleEvolveCodeRequest) {
      this.handleEvolveCodeRequest(this.code, this.morphDirective);
    }
  }

  private async handleClearAiContext() { if (this.clearAiContextHandler) await this.clearAiContextHandler(); }
  private async handleGenerateImage() {
    if (this.generateImageHandler && this.imageGenPrompt) {
      this.generatedImageUrl = null; 
      const imageUrl = await this.generateImageHandler(this.imageGenPrompt, `devtool-${Date.now()}`);
      if (imageUrl) this.generatedImageUrl = imageUrl; 
    }
  }
  
  private initializeSpeechRecognition() {
    if (!this.recognition) {
      const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionImpl) {
        this.voiceInputStatus = 'Trình duyệt không hỗ trợ nhận dạng giọng nói.'; return;
      }
      this.recognition = new SpeechRecognitionImpl();
      this.recognition.continuous = false; this.recognition.lang = 'vi-VN';
      this.recognition.interimResults = false; this.recognition.maxAlternatives = 1;
      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const speechResult = event.results[event.results.length - 1][0].transcript;
        this.inputMessage += (this.inputMessage ? ' ' : '') + speechResult;
        this.voiceInputStatus = 'Đã nhận dạng: ' + speechResult;
        this.stopVoiceInput(); if (this.messageInputElement) this.messageInputElement.focus();
      };
      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        this.voiceInputStatus = 'Lỗi giọng nói: ' + event.error;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') 
          this.voiceInputStatus = 'Quyền truy cập micro bị từ chối/dịch vụ không khả dụng.';
        this.stopVoiceInput();
      };
      this.recognition.onend = () => { if (this.voiceInputActive) this.stopVoiceInput(); };
    }
  }
  private toggleVoiceInput() {
    this.initializeSpeechRecognition(); if (!this.recognition) return;
    if (this.voiceInputActive) this.stopVoiceInput(); else this.startVoiceInput();
  }
  private startVoiceInput() {
    if (!this.recognition) { this.voiceInputStatus = 'Không thể khởi tạo nhận dạng giọng nói.'; return; }
    try {
      this.recognition.start(); this.voiceInputActive = true; this.voiceInputStatus = 'Đang nghe...';
    } catch (e: any) {
      this.voiceInputStatus = `Lỗi ghi âm: ${e.message}. Cấp quyền micro.`; this.voiceInputActive = false;
    }
  }
  private stopVoiceInput() {
    if (this.recognition && this.voiceInputActive) this.recognition.stop();
    this.voiceInputActive = false;
    if (!this.voiceInputStatus.startsWith("Đã nhận dạng:") && !this.voiceInputStatus.startsWith("Lỗi")) this.voiceInputStatus = ""; 
  }

  renderDevTools() {
    if (!this.devToolsVisible) return nothing;
    const isGeminiFlash = this.modelConfigDraft.modelName === 'gemini-2.5-flash-preview-04-17';
    const isGeminiModel = this.modelConfigDraft.modelName?.startsWith('gemini-');
    const isNonGeminiModel = !isGeminiModel;

    return html`
      <div class="dev-tools-panel" role="region" aria-label="Developer Tools">
        <h3>⚙️ Công cụ nhà phát triển (Tính năng Beta)</h3>
        
        <div class="dev-tools-section">
          <h4>Chế độ AI & Lời nhắc Hệ thống</h4>
           <div class="dev-tool-control">
                <input type="checkbox" id="superBeautifulModeToggle" 
                       .checked=${this.superBeautifulModeActive}
                       @change=${this.handleToggleSuperBeautifulMode}>
                <label for="superBeautifulModeToggle">Chế độ Siêu Đẹp (Tạo Webpage)</label>
            </div>
            <p><em>Lời nhắc hệ thống hiện tại (Model: ${this.modelConfigDraft.modelName}, Chế độ: ${this.superBeautifulModeActive ? 'Siêu Đẹp' : (this.modelConfigDraft.isEvolveMode ? 'Tiến hóa p5.js' : 'p5.js')}):</em></p>
            <textarea 
              .value=${this.systemPromptDraft}
              rows="5" readonly
              aria-label="Current system prompt (read-only)"></textarea>
            <button @click=${this.handleApplySystemPromptChanges} .disabled=${this.chatState !== ChatState.IDLE} title="Áp dụng lại lời nhắc dựa trên cấu hình hiện tại và đặt lại chat">Áp dụng Lời nhắc & Đặt lại Chat</button>
        </div>

        ${!this.superBeautifulModeActive ? html`
          <div class="dev-tools-section" id="infinitePowerSection">
            <h4>✨ Vô hạn Quyền năng (p5.js)</h4>
            <div class="dev-tool-control">
              <label for="morphDirectiveInput">Chỉ thị Biến đổi:</label>
              <input type="text" id="morphDirectiveInput" 
                     .value=${this.morphDirective} 
                     @input=${(e: InputEvent) => this.morphDirective = (e.target as HTMLInputElement).value} 
                     placeholder="ví dụ: làm cho nó tương tác hơn..."
                     aria-label="Morph directive for p5.js code evolution">
            </div>
            <button @click=${this.handleEvolveButtonClick} 
                    .disabled=${this.chatState !== ChatState.IDLE || !this.code || !this.morphDirective}
                    title="Yêu cầu AI tiến hóa mã p5.js hiện tại dựa trên chỉ thị">
              ${ICON_EVOLVE} Biến đổi (Evolve)
            </button>
            <p><em>Yêu cầu AI sửa đổi và "tiến hóa" mã p5.js hiện tại dựa trên chỉ thị của bạn.</em></p>
          </div>` : nothing}

        <div class="dev-tools-section">
            <h4>Cấu hình Model & AI</h4>
            <div class="dev-tool-control">
              <label for="modelSelectInput">Model AI:</label>
              <select id="modelSelectInput" 
                      .value=${this.modelConfigDraft.modelName || 'gemini-2.5-flash-preview-04-17'}
                      @change=${(e: Event) => {
                          const newModel = (e.target as HTMLSelectElement).value;
                          let enableImageGen = this.modelConfigDraft.enableAiImageGeneration;
                          if (!newModel.startsWith('gemini-') || this.superBeautifulModeActive) {
                            enableImageGen = false;
                          }
                          this.modelConfigDraft = {...this.modelConfigDraft, modelName: newModel, enableAiImageGeneration: enableImageGen };
                      }}
                      aria-label="Select AI Model">
                <option value="gemini-2.5-flash-preview-04-17">Gemini 2.5 Flash</option>
                <option value="gemini-2.5-pro-preview-04-17">Gemini 2.5 Pro (Beta)</option>
                <option value="openai-gpt-4">OpenAI GPT-4</option>
                <option value="openai-gpt-3.5-turbo">OpenAI GPT-3.5 Turbo</option>
                <option value="deepseek-coder">DeepSeek Coder</option>
                <option value="grok-llama">Grok (LLaMA)</option>
                <option value="claude-3-opus">Claude 3 Opus (Placeholder)</option>
                <option value="llama-3-70b">Llama 3 70B (Placeholder)</option>
              </select>
            </div>
            <div class="dev-tool-control">
                <input type="checkbox" id="aiImageGenToggle" 
                       .checked=${this.modelConfigDraft.enableAiImageGeneration}
                       @change=${(e: Event) => this.modelConfigDraft = {...this.modelConfigDraft, enableAiImageGeneration: (e.target as HTMLInputElement).checked}}
                       .disabled=${this.superBeautifulModeActive || isNonGeminiModel} 
                       title=${this.superBeautifulModeActive ? "Tạo ảnh AI tự động không khả dụng trong Chế độ Siêu Đẹp" : (isNonGeminiModel ? "Tạo ảnh AI tự động chỉ được hỗ trợ cho model Gemini (chế độ p5.js)" : "Cho phép AI tạo ảnh (Chỉ Gemini, chế độ p5.js)")}
                       aria-labelledby="aiImageGenToggleLabel">
                <label for="aiImageGenToggle" id="aiImageGenToggleLabel" class=${this.superBeautifulModeActive || isNonGeminiModel ? 'disabled-label' : ''}>Cho phép AI tạo ảnh (p5.js)</label>
            </div>
            <div class="dev-tool-control">
                <input type="checkbox" id="thinkingToggle" 
                       .checked=${this.modelConfigDraft.thinkingBudget === 0} 
                       @change=${(e: Event) => this.modelConfigDraft = {...this.modelConfigDraft, thinkingBudget: (e.target as HTMLInputElement).checked ? 0 : undefined}}
                       .disabled=${!isGeminiFlash}
                       title=${isGeminiFlash ? "Tắt 'Suy nghĩ' của AI (Độ trễ thấp - Flash Model)" : "Tính năng này chỉ dành cho model Gemini 2.5 Flash"}
                       aria-labelledby="thinkingToggleLabel">
                <label for="thinkingToggle" id="thinkingToggleLabel" class=${!isGeminiFlash ? 'disabled-label' : ''}>Tắt 'Suy nghĩ' (Flash)</label>
            </div>
            <div class="dev-tool-control"><label for="tempInput">Nhiệt độ (0-1):</label><input type="number" id="tempInput" step="0.1" min="0" max="1" .value=${(this.modelConfigDraft.temperature ?? 0.7).toString()} @input=${(e: InputEvent) => this.modelConfigDraft = {...this.modelConfigDraft, temperature: parseFloat((e.target as HTMLInputElement).value)}} aria-label="Temperature setting"></div>
            <div class="dev-tool-control"><label for="topkInput">Top-K (Gemini):</label><input type="number" id="topkInput" step="1" min="1" .value=${(this.modelConfigDraft.topK ?? 40).toString()} @input=${(e: InputEvent) => this.modelConfigDraft = {...this.modelConfigDraft, topK: parseInt((e.target as HTMLInputElement).value, 10)}} .disabled=${isNonGeminiModel} title=${isNonGeminiModel ? "Top-K không áp dụng cho model này" : ""} aria-label="Top-K setting"></div>
            <div class="dev-tool-control"><label for="toppInput">Top-P (0-1):</label><input type="number" id="toppInput" step="0.05" min="0" max="1" .value=${(this.modelConfigDraft.topP ?? 0.95).toString()} @input=${(e: InputEvent) => this.modelConfigDraft = {...this.modelConfigDraft, topP: parseFloat((e.target as HTMLInputElement).value)}} aria-label="Top-P setting"></div>
            <button @click=${this.handleApplyModelConfig} .disabled=${this.chatState !== ChatState.IDLE}>Áp dụng Cấu hình & Đặt lại Chat</button>
        </div>

        <div class="dev-tools-section">
          <h4>Công cụ Mã nguồn (p5.js mode)</h4>
          <div class="dev-tool-control">
            <label for="obfuscationLevelSelect">Cấp độ làm rối mã:</label>
            <select id="obfuscationLevelSelect" 
                    .value=${this.obfuscationLevel}
                    @change=${(e: Event) => this.obfuscationLevel = (e.target as HTMLSelectElement).value as ObfuscationLevel}
                    .disabled=${this.superBeautifulModeActive || this.chatState !== ChatState.IDLE || !this.code}
                    title=${this.superBeautifulModeActive ? "Làm rối mã không khả dụng ở Chế độ Siêu Đẹp" : ""}
                    aria-label="Select code obfuscation level">
                <option value="none">Không (Mặc định)</option>
                <option value="basic">Cơ bản (Xóa comment, khoảng trắng)</option>
                <option value="medium">Trung bình (Đổi tên biến, mã hóa số)</option>
                <option value="advanced">Nâng cao (Mã hóa chuỗi, mã giả)</option>
                <option value="extremely_aops">Cực mạnh (AOPs)</option>
            </select>
          </div>
          <button @click=${this.handleObfuscateCode} 
                  .disabled=${this.superBeautifulModeActive || this.chatState !== ChatState.IDLE || !this.code || this.obfuscationLevel === 'none'} 
                  title=${this.superBeautifulModeActive ? "Làm rối mã không khả dụng ở Chế độ Siêu Đẹp" : (this.obfuscationLevel === 'none' ? "Chọn một cấp độ làm rối mã" : "Thực hiện làm rối mã JavaScript")}>
            Thực hiện Làm rối mã
          </button>
        </div>

        <div class="dev-tools-section">
          <h4>Tạo ảnh Thủ công (Imagen - Gemini)</h4>
          <input type="text" .value=${this.imageGenPrompt} @input=${(e: InputEvent) => this.imageGenPrompt = (e.target as HTMLInputElement).value} placeholder="Nhập mô tả ảnh..." aria-label="Image generation prompt" />
          <button @click=${this.handleGenerateImage} .disabled=${this.imageGenLoading || !this.imageGenPrompt || this.chatState !== ChatState.IDLE}> ${this.imageGenLoading ? 'Đang tạo...' : 'Tạo ảnh'} </button>
          ${this.generatedImageUrl ? html`<img src="${this.generatedImageUrl}" alt="Generated image" class="generated-image"/>` : ''}
        </div>

        <div class="dev-tools-section">
          <h4>Nhập liệu bằng giọng nói</h4>
          <button @click=${this.toggleVoiceInput} .disabled=${this.chatState !== ChatState.IDLE} aria-label=${this.voiceInputActive ? "Stop voice input" : "Start voice input"}> ${this.voiceInputActive ? ICON_BUSY : ICON_VOICE} ${this.voiceInputActive ? 'Đang Ghi âm... (Nhấn để dừng)' : 'Bắt đầu Ghi âm'} </button>
          ${this.voiceInputStatus ? html`<p class="voice-status" aria-live="polite">${this.voiceInputStatus}</p>` : nothing}
        </div>

         <div class="dev-tools-section">
            <h4>Thao tác Chat</h4>
            <button @click=${this.handleClearAiContext} .disabled=${this.chatState !== ChatState.IDLE}>Xóa Ngữ cảnh AI Hiện tại</button>
        </div>
      </div>
    `;
  }

  render() {
    let modelNameDisplay = '';
    const currentModel = this.modelConfigDraft.modelName;
    if (currentModel === 'gemini-2.5-flash-preview-04-17') modelNameDisplay = 'Flash';
    else if (currentModel === 'gemini-2.5-pro-preview-04-17') modelNameDisplay = 'Pro';
    else if (currentModel === 'openai-gpt-4') modelNameDisplay = 'GPT-4';
    else if (currentModel === 'openai-gpt-3.5-turbo') modelNameDisplay = 'GPT-3.5';
    else if (currentModel === 'deepseek-coder') modelNameDisplay = 'DeepS'; 
    else if (currentModel === 'grok-llama') modelNameDisplay = 'Grok';
    else if (currentModel === 'claude-3-opus') modelNameDisplay = 'Claude';
    else if (currentModel === 'llama-3-70b') modelNameDisplay = 'Llama3';
    else modelNameDisplay = 'AI';


    return html`<div class="playground">
      <div class="sidebar">
        <div class="selector">
          <button id="geminiTab" aria-selected=${this.selectedChatTab === ChatTab.GEMINI} role="tab" class=${classMap({'active': this.selectedChatTab === ChatTab.GEMINI})} @click=${this.handleGeminiTabClick}>
            B.Trọng AI ${modelNameDisplay ? html`(<span style="font-size:0.8em; opacity:0.7;">${modelNameDisplay}</span>)`: nothing} ${this.superBeautifulModeActive ? html`(<span style="font-style:italic; font-size:0.9em;">Siêu Đẹp</span>)`: (this.modelConfigDraft.isEvolveMode && !this.superBeautifulModeActive ? html`(<span style="font-style:italic; font-size:0.9em;">Tiến hóa</span>)` : nothing)}
          </button>
          <button id="codeTab" aria-selected=${this.selectedChatTab === ChatTab.CODE} role="tab" class=${classMap({'active': this.selectedChatTab === ChatTab.CODE})} @click=${() => { this.selectedChatTab = ChatTab.CODE; this.devToolsClickCount = 0; }}>
            Mã nguồn ${this.codeHasChanged ? ICON_EDIT : nothing}
          </button>
        </div>
        <div id="chat" role="tabpanel" aria-labelledby="geminiTab" class=${classMap({'tabcontent': true, 'showtab': this.selectedChatTab === ChatTab.GEMINI})}>
          <div class="chat-messages" aria-live="polite"> ${this.messages} <div id="anchor"></div> </div>
          <div class="footer">
            <div id="chatStatus" aria-live="polite" class=${classMap({'hidden': this.chatState === ChatState.IDLE && !this.imageGenLoading})}>
              ${this.chatState === ChatState.GENERATING ? html`${ICON_BUSY} Đang tạo...` : nothing}
              ${this.chatState === ChatState.CODING ? html`${ICON_BUSY} Đang viết mã...` : nothing}
              ${this.imageGenLoading && this.selectedChatTab === ChatTab.GEMINI && this.devToolsVisible ? html`${ICON_BUSY} Đang tạo ảnh thủ công...` : nothing}
            </div>
            <div id="inputArea">
              <textarea id="messageInput" aria-label="Message input" rows="1" .value=${this.inputMessage}
                @input=${(e: InputEvent) => { 
                    this.inputMessage = (e.target as HTMLTextAreaElement).value; 
                    const target = e.target as HTMLTextAreaElement; target.style.height = 'auto'; target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                }}
                @keydown=${(e: KeyboardEvent) => { this.inputKeyDownAction(e); }} placeholder="Nhập tin nhắn của bạn..." autocomplete="off" ></textarea>
              <button id="sendButton" aria-label="Send message" class=${classMap({'disabled': this.chatState !== ChatState.IDLE})} .disabled=${this.chatState !== ChatState.IDLE} @click=${() => { this.sendMessageAction(); }}> ${ICON_SEND} </button>
            </div>
            ${this.renderDevTools()}
          </div>
        </div>
        <div id="editor" role="tabpanel" aria-labelledby="codeTab" class=${classMap({'tabcontent': true, 'showtab': this.selectedChatTab === ChatTab.CODE})}>
          <div class.code-container> ${this.codeSyntax}
            <textarea class="code-editor" aria-label="Code editor" spellcheck="false" .value=${this.code} .readOnly=${this.chatState !== ChatState.IDLE}
              @keyup=${(e: KeyboardEvent) => { const val = (e.target as HTMLTextAreaElement).value; if (this.code !== val) { this.codeEditedAction(val); (this as LitElement).requestUpdate(); }}}
              @change=${(e: InputEvent) => { this.codeEditedAction((e.target as HTMLTextAreaElement).value); }}></textarea>
          </div>
        </div>
      </div>
      <div class="main-container">
        <main> ${this.previewFrame} </main>
        <div class="toolbar">
          <button id="reloadCode" aria-label="Reload code" @click=${() => { this.reloadCodeAction(); }}> ${ICON_RELOAD} <div class="button-label"><p>Tải lại</p><div id="reloadTooltip" role="tooltip" class="button-tooltip ${classMap({'show-tooltip': this.codeNeedsReload})}"><p>Tải lại thay đổi mã</p></div></div></button>
          <button id="runCode" aria-label="Run code" class=${classMap({'disabled': this.isRunning})} .disabled=${this.isRunning} @click=${() => { this.playAction(); }}> ${ICON_PLAY} </button>
          <button id="stop" aria-label="Stop code execution" class=${classMap({'disabled': !this.isRunning})} .disabled=${!this.isRunning} @click=${() => { this.stopAction(); }}> ${ICON_STOP} </button>
          <button id="clear" aria-label="Clear chat and reset code" @click=${() => { this.clearAction(); }}> ${ICON_CLEAR} <div class="button-label"><p>Đặt lại</p></div></button>
        </div>
      </div>
    </div>`;
  }
}