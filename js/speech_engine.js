/**
 * SIH 2026 - Multilingual Cooperative Governance & Legal Assistance Chatbot
 * Voice Engine: Web Speech API (SpeechRecognition + SpeechSynthesis)
 * No external API required - operates directly within Google Chrome / MS Edge.
 */

const SPEECH_ENGINE = {
  recognition: null,
  isListening: false,
  synth: window.speechSynthesis,
  currentUtterance: null,

  /**
   * Initialize speech recognition
   */
  init(onResultCallback, onStateChangeCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API is not supported in this browser. Please use Chrome or Edge.");
      return false;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStateChangeCallback) onStateChangeCallback(true);
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript && onResultCallback) {
        onResultCallback(finalTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      this.isListening = false;
      if (onStateChangeCallback) onStateChangeCallback(false);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onStateChangeCallback) onStateChangeCallback(false);
    };

    return true;
  },

  /**
   * Start listening with the selected language code
   */
  startListening(langCode = "en-IN") {
    if (!this.recognition) return;
    try {
      this.recognition.lang = langCode;
      this.recognition.start();
    } catch (e) {
      console.warn("Recognition already running or error:", e);
    }
  },

  /**
   * Stop listening
   */
  stopListening() {
    if (!this.recognition) return;
    try {
      this.recognition.stop();
      this.isListening = false;
    } catch (e) {
      console.warn(e);
    }
  },

  /**
   * Text-to-Speech: Read out legal summary aloud
   */
  speakText(text, langCode = "en-IN", onEndCallback) {
    if (!this.synth) return;

    // Stop any ongoing speech
    this.stopSpeaking();

    // Clean markdown symbols for cleaner speech
    const cleanSpeech = text
      .replace(/[#*_\`]/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/<[^>]*>/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = langCode;
    utterance.rate = 0.95; // slightly slower for high legal clarity
    utterance.pitch = 1.0;

    // Try finding matched voice
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode.substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      if (onEndCallback) onEndCallback();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  },

  /**
   * Stop any playing audio
   */
  stopSpeaking() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }
};
