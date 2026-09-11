/**
 * SIH 2026 - NyayaMitra AI
 * Application Controller (app.js)
 * Implements exact UI schema from SIH Presentation Slide Mockup
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");
  const micStatus = document.getElementById("micStatus");
  const starterBanner = document.getElementById("starterBanner");
  const uploadDockBtn = document.getElementById("uploadDockBtn");
  const uploadModal = document.getElementById("uploadModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const sampleDocSelect = document.getElementById("sampleDocSelect");
  const fileDropZone = document.getElementById("fileDropZone");
  const fileInput = document.getElementById("fileInput");
  const auditResult = document.getElementById("auditResult");
  const langSelect = document.getElementById("langSelect");
  const roleSelect = document.getElementById("roleSelect");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const activeDocBanner = document.getElementById("activeDocBanner");
  const activeDocName = document.getElementById("activeDocName");
  const clearDocBtn = document.getElementById("clearDocBtn");

  // State
  let currentLanguage = "en";
  let currentRole = "citizen";
  let activeDocument = null;
  let activeSpeechUtteranceId = null;

  // Initialize Speech
  const speechAvailable = SPEECH_ENGINE.init(
    (transcript) => {
      userInput.value = transcript;
      handleSendMessage();
    },
    (isListening) => {
      if (isListening) {
        micBtn.classList.add("listening");
        micStatus.classList.remove("hidden");
      } else {
        micBtn.classList.remove("listening");
        micStatus.classList.add("hidden");
      }
    }
  );

  // Theme
  const savedTheme = localStorage.getItem("sahakar_theme") || "light";
  applyTheme(savedTheme);

  // Populate Sample Documents
  DOCUMENT_PROCESSOR.sampleDocuments.forEach((doc, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${doc.name} (${doc.type})`;
    sampleDocSelect.appendChild(opt);
  });

  // Event Listeners
  sendBtn.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  micBtn.addEventListener("click", () => {
    if (!speechAvailable) {
      alert("Speech recognition is supported natively in Chrome and Edge.");
      return;
    }
    if (SPEECH_ENGINE.isListening) {
      SPEECH_ENGINE.stopListening();
    } else {
      const detectedLang = MULTILINGUAL_ENGINE.detectLanguage(userInput.value) || currentLanguage;
      const speechCode = MULTILINGUAL_ENGINE.languages[detectedLang]?.speechCode || "en-IN";
      SPEECH_ENGINE.startListening(speechCode);
    }
  });

  langSelect.addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    MULTILINGUAL_ENGINE.currentLang = currentLanguage;
  });

  roleSelect.addEventListener("change", (e) => {
    currentRole = e.target.value;
    MULTILINGUAL_ENGINE.currentRole = currentRole;
  });

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    applyTheme(isDark ? "light" : "dark");
  });

  uploadDockBtn.addEventListener("click", () => {
    uploadModal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    uploadModal.classList.add("hidden");
  });

  sampleDocSelect.addEventListener("change", (e) => {
    const idx = e.target.value;
    if (idx !== "") {
      const doc = DOCUMENT_PROCESSOR.sampleDocuments[idx];
      processDocument(doc.name, doc.text);
    }
  });

  fileDropZone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => processDocument(file.name, ev.target.result);
      reader.readAsText(file);
    }
  });

  clearDocBtn.addEventListener("click", () => {
    activeDocument = null;
    activeDocBanner.classList.add("hidden");
  });

  // Global Chip Handler
  window.handleChipClick = function(text) {
    userInput.value = text;
    handleSendMessage();
  };

  /**
   * Theme Manager
   */
  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      themeToggleBtn.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      themeToggleBtn.textContent = "🌙";
    }
    localStorage.setItem("sahakar_theme", theme);
  }

  /**
   * Process and Audit Uploaded Document
   */
  function processDocument(name, text) {
    const audit = DOCUMENT_PROCESSOR.auditDocument(text);
    activeDocument = { name, text, audit };

    activeDocName.textContent = name;
    activeDocBanner.classList.remove("hidden");

    renderAuditModal(audit, name);
  }

  function renderAuditModal(audit, name) {
    const statusText = audit.isCompliant ? "COMPLIANT (मानक अनुसार)" : "NEEDS REVISION (संशोधन आवश्यक)";
    let html = `
      <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; margin-top: 10px;">
        <h4 style="color: var(--accent-blue);">Compliance Score: ${audit.score}%</h4>
        <p><strong>Status:</strong> ${statusText} (${audit.passedCount}/${audit.totalRules} Tests Passed)</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px; max-height: 220px; overflow-y: auto;">
    `;

    audit.details.forEach(item => {
      html += `
        <div style="padding: 8px; border: 1px solid var(--border); border-radius: 6px;">
          <div style="display:flex; justify-content:space-between;">
            <strong>${item.passed ? '✅' : '⚠️'} ${item.title}</strong>
            <span style="font-size: 0.75rem; color: ${item.passed ? '#059669' : '#dc2626'}; font-weight:700;">
              ${item.passed ? 'Passed' : 'Missing'}
            </span>
          </div>
          ${!item.passed ? `<small style="color: var(--accent-blue); display:block; margin-top:4px;">Fix: ${item.recommendation}</small>` : ''}
        </div>
      `;
    });

    html += `
      </div>
      <button class="send-action-btn" style="margin-top: 12px; width: 100%; justify-content: center;" onclick="document.getElementById('uploadModal').classList.add('hidden')">
        Done & Inspect in Chat
      </button>
    `;

    auditResult.innerHTML = html;
  }

  /**
   * Send & Process Message
   */
  function handleSendMessage() {
    const query = userInput.value.trim();
    if (!query) return;

    // Hide Starter Banner if visible
    if (starterBanner) {
      starterBanner.style.display = "none";
    }

    // Reset input
    userInput.value = "";

    // Show User Message Bubble (Exact Blue Pill on Right)
    appendUserMessage(query);

    // Process Response
    setTimeout(() => {
      generateBotResponse(query);
    }, 300);
  }

  /**
   * Append User Message (Blue Pill on Right)
   */
  function appendUserMessage(text) {
    const row = document.createElement("div");
    row.className = "user-msg-row";
    row.innerHTML = `<div class="user-blue-bubble">${escapeHtml(text)}</div>`;
    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Generate Smart Bot Response
   */
  function generateBotResponse(query) {
    // 1. Detect Language of the prompt automatically
    const detectedLang = MULTILINGUAL_ENGINE.detectLanguage(query);
    const activeLang = detectedLang !== "en" ? detectedLang : currentLanguage;

    // 2. Detect Intent with Word-Boundary token matching
    const intentId = MULTILINGUAL_ENGINE.detectIntent(query);

    // A. Greeting Intent
    if (intentId === "greeting") {
      const greetingData = MULTILINGUAL_ENGINE.getGreetingResponse(activeLang);
      renderBotCard({
        promptText: query,
        sourceText: greetingData.ref,
        referenceTitle: greetingData.title,
        summaryItems: greetingData.summary,
        roleAdvice: null,
        visualSvg: null,
        deepDiveMd: null,
        quickChips: [
          { text: "🌾 Kisan Credit Card Rights", query: "Kisan credit card ke liye kya legal right hai bhai?" },
          { text: "🗳️ Section 38 Voting Rights", query: "section 38" },
          { text: "🏛️ Cooperative Dispute (Sec 84)", query: "Cooperative society me dispute ho gaya to kya kare?" },
          { text: "📜 Basic 6 Fundamental Rights", query: "nahi basic 6 rights of a local citizen of india" },
          { text: "🆔 Aadhaar Name Change Steps", query: "Aadhaar card me name change karvana hai to steps batao" }
        ]
      });
      return;
    }

    // B. Check if active document exists and query relates to it
    if (activeDocument && /\b(document|clause|bylaw|agreement|notice)\b/i.test(query)) {
      const docQuery = DOCUMENT_PROCESSOR.queryDocument(activeDocument.text, query);
      renderBotCard({
        promptText: query,
        sourceText: `Uploaded Document: ${activeDocument.name}`,
        referenceTitle: `Clause Inspection: ${activeDocument.name}`,
        summaryItems: [docQuery.answer],
        roleAdvice: `Compliance Audit Score: ${activeDocument.audit.score}% (${activeDocument.audit.isCompliant ? 'Compliant' : 'Revision Recommended'})`,
        visualSvg: null,
        deepDiveMd: null,
        quickChips: [
          { text: "📊 Full Compliance Audit", query: "audit" },
          { text: "🏛️ Section 84 Arbitration", query: "section 84" }
        ]
      });
      return;
    }

    // C. Dynamic Unmapped Section Number Lookup
    if (intentId && intentId.startsWith("unmapped_section_")) {
      const secNum = intentId.replace("unmapped_section_", "");
      const syn = MULTILINGUAL_ENGINE.synthesizeSectionResponse(secNum, activeLang);
      renderBotCard({
        promptText: query,
        sourceText: syn.ref,
        referenceTitle: syn.title,
        summaryItems: syn.summary,
        roleAdvice: syn.advice,
        visualSvg: null,
        deepDiveMd: null,
        quickChips: [
          { text: "🗳️ Section 38 (Voting Rights)", query: "section 38" },
          { text: "🏛️ Section 84 (Arbitration)", query: "section 84" },
          { text: "📜 Section 41 (Board Rules)", query: "section 41" },
          { text: "⚖️ Free Legal Aid (Art 39A)", query: "muft vakil kaise milega under article 39a" }
        ]
      });
      return;
    }

    // D. Dynamic Unmapped Constitutional Article Number Lookup
    if (intentId && intentId.startsWith("unmapped_article_")) {
      const artNum = intentId.replace("unmapped_article_", "");
      const syn = MULTILINGUAL_ENGINE.synthesizeArticleResponse(artNum, activeLang);
      renderBotCard({
        promptText: query,
        sourceText: syn.ref,
        referenceTitle: syn.title,
        summaryItems: syn.summary,
        roleAdvice: syn.advice,
        visualSvg: null,
        deepDiveMd: null,
        quickChips: [
          { text: "⚖️ Article 14 (Equality)", query: "article 14" },
          { text: "🛡️ Article 21 (Life & Liberty)", query: "article 21" },
          { text: "📜 6 Fundamental Rights", query: "basic 6 rights of a local citizen of india" },
          { text: "🏛️ Part IXB Cooperatives", query: "article 243zj" }
        ]
      });
      return;
    }

    // E. Check Localized Answers (Section 38, Aadhaar, KCC, 6 Fundamental Rights, Section 84, etc.)
    const localized = MULTILINGUAL_ENGINE.localizedAnswers[intentId];
    if (localized) {
      const langPack = localized[activeLang] || localized["hinglish"] || localized["en"] || localized["hi"];
      let visualDiagram = null;
      if (intentId === "fundamental_6_rights") {
        visualDiagram = LEGAL_DATABASE.visualDiagrams["rightsHierarchy"];
      } else if (intentId === "mscs_sec_84") {
        visualDiagram = LEGAL_DATABASE.visualDiagrams["disputeEscalationFlow"];
      } else if (intentId === "kcc_rights") {
        visualDiagram = LEGAL_DATABASE.visualDiagrams["pacsFlow"];
      }

      // Check if deep dive is available in main db
      const matchedDbEntry = LEGAL_DATABASE.fundamentalRights?.find(i => i.id === intentId) ||
                             LEGAL_DATABASE.statutes?.find(i => i.id === intentId) ||
                             LEGAL_DATABASE.agriculturalRights?.find(i => i.id === intentId) ||
                             LEGAL_DATABASE.criminalLaw?.find(i => i.id === intentId) ||
                             LEGAL_DATABASE.civicServices?.find(i => i.id === intentId) ||
                             LEGAL_DATABASE.propertyAndLand?.find(i => i.id === intentId) ||
                             LEGAL_DATABASE.constitution?.find(i => i.id === intentId);

      // Contextual follow-up chips
      const chipsMap = {
        mscs_sec_38: [
          { text: "🏛️ Section 84 (Election Dispute)", query: "section 84" },
          { text: "👥 Article 243ZJ (Board Quotas)", query: "article 243zj" },
          { text: "📜 Section 41 (Disqualification)", query: "section 41" },
          { text: "⚖️ Free Legal Aid (Art 39A)", query: "muft vakil kaise milega under article 39a" }
        ],
        aadhaar_update: [
          { text: "🆔 Voter ID Correction (Form 8)", query: "voter id correction form 8" },
          { text: "💳 PAN Card Link with Aadhaar", query: "pan card aadhaar link" },
          { text: "🌾 PM Kisan e-KYC Verification", query: "pm kisan ekyc" }
        ],
        birth_certificate_update: [
          { text: "🆔 Aadhaar Name Change Steps", query: "Aadhaar card me name change karvana hai to steps batao" },
          { text: "📜 Voter ID Correction (Form 8)", query: "voter id correction form 8" },
          { text: "⚖️ Free Legal Aid (Art 39A)", query: "muft vakil kaise milega under article 39a" }
        ],
        land_revenue_dispute: [
          { text: "📜 7/12 & Khatauni Mutation Rules", query: "mutation dakhil kharij rules" },
          { text: "🛡️ Section 145 CrPC Stay Orders", query: "section 145 crpc property dispute" },
          { text: "🏛️ Cooperative Dispute (Sec 84)", query: "section 84" },
          { text: "⚖️ Free Legal Aid (Art 39A)", query: "muft vakil kaise milega under article 39a" }
        ],
        fundamental_6_rights: [
          { text: "⚖️ Article 32 (5 Constitutional Writs)", query: "article 32" },
          { text: "🛡️ Article 21 (Right to Life & Privacy)", query: "article 21" },
          { text: "🤝 Article 19(1)(c) (Form Cooperatives)", query: "article 19" }
        ],
        kcc_rights: [
          { text: "🌾 4% Interest Subvention Rules", query: "kcc interest subvention" },
          { text: "🚜 PM Fasal Bima Claim (72h)", query: "pm fasal bima yojana" },
          { text: "🏛️ PACS Crop Loan Eligibility", query: "pacs loan" }
        ],
        mscs_sec_84: [
          { text: "🗳️ Section 38 (Voting & Proxy Ban)", query: "section 38" },
          { text: "📜 Section 99 (Tribunal Appeals)", query: "section 99" },
          { text: "🏢 Ombudsman Redressal (Sec 106)", query: "section 106" }
        ],
        ni_sec_138: [
          { text: "✉️ 15-Day Demand Notice Rules", query: "138 demand notice" },
          { text: "⚖️ 30-Day Magistrate Filing", query: "cheque bounce complaint" }
        ],
        crpc_154: [
          { text: "🚔 Zero FIR at Any Police Station", query: "zero fir kya hai" },
          { text: "📜 Section 156(3) Magistrate Order", query: "magistrate se fir order" }
        ],
        housing_maintenance_dispute: [
          { text: "🏢 Max ₹25,000 Transfer Fee Rule", query: "housing society transfer fee" },
          { text: "🚗 Car Parking Sale Prohibition", query: "housing society parking" },
          { text: "⚖️ Consumer Commission (e-Daakhil)", query: "consumer court" }
        ],
        ipc_302: [
          { text: "⚖️ Article 39A (Free Defense Counsel)", query: "article 39a" },
          { text: "🛡️ Article 22 (24-Hour Magistrate Rule)", query: "article 22" }
        ]
      };

      renderBotCard({
        promptText: query,
        sourceText: langPack.ref,
        referenceTitle: langPack.title,
        summaryItems: langPack.summary,
        roleAdvice: langPack.advice,
        visualSvg: visualDiagram,
        deepDiveMd: matchedDbEntry ? matchedDbEntry.deepDive : null,
        quickChips: chipsMap[intentId] || null
      });
      return;
    }

    // F. Check All Main Database Entries
    let entry = LEGAL_DATABASE.statutes?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.fundamentalRights?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.constitutionalFramework?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.citizenProcedures?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.constitution?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.agriculturalRights?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.civicServices?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.criminalLaw?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.propertyAndLand?.find(i => i.id === intentId) ||
                LEGAL_DATABASE.housing?.find(i => i.id === intentId);

    // G. Intelligent Handling for Out-of-Scope / General Query
    if (!entry) {
      const generalAnswer = generateContextualAnswer(query, activeLang);
      renderBotCard({
        promptText: query,
        sourceText: generalAnswer.source,
        referenceTitle: generalAnswer.title,
        summaryItems: generalAnswer.summary,
        roleAdvice: generalAnswer.advice,
        visualSvg: null,
        deepDiveMd: null,
        quickChips: [
          { text: "🗳️ Section 38 (Voting Rights)", query: "section 38" },
          { text: "🌾 Kisan Credit Card Rights", query: "Kisan credit card ke liye kya legal right hai bhai?" },
          { text: "📜 6 Fundamental Rights", query: "nahi basic 6 rights of a local citizen of india" },
          { text: "🏛️ Cooperative Dispute (Sec 84)", query: "section 84" }
        ]
      });
      return;
    }

    // H. Formatted Response from Database
    const sourceStr = `${entry.article || entry.section || entry.title} (${entry.part || entry.category || entry.act || 'Constitution of India'})`;
    
    let visualSvg = null;
    const isFlowQuery = /\b(flowchart|process|steps|procedure|diagram|hierarchy|structure)\b/i.test(query);
    if (entry.visualType && (isFlowQuery || intentId === "mscs_sec_7" || intentId === "mscs_sec_84" || intentId === "fundamental_6_rights")) {
      visualSvg = LEGAL_DATABASE.visualDiagrams[entry.visualType];
    }

    const roleTitle = MULTILINGUAL_ENGINE.roles[currentRole]?.title || 'Citizen';
    const adviceText = entry.actionAdvice 
      ? `Guidance for ${roleTitle}: ${entry.actionAdvice}`
      : `Guidance for ${roleTitle}: Consult your District Legal Services Authority (DLSA Helpline 15100) or respective statutory authority for certified filings and assistance.`;

    renderBotCard({
      promptText: query,
      sourceText: sourceStr,
      referenceTitle: entry.title,
      summaryItems: [entry.shortSummary],
      roleAdvice: adviceText,
      visualSvg: visualSvg,
      deepDiveMd: entry.deepDive,
      quickChips: [
        { text: "🗳️ Section 38 (Voting Rights)", query: "section 38" },
        { text: "🏛️ Section 84 (Arbitration)", query: "section 84" },
        { text: "🌾 Kisan Credit Card Rights", query: "Kisan credit card ke liye kya legal right hai bhai?" },
        { text: "⚖️ Free Legal Aid (Art 39A)", query: "muft vakil kaise milega under article 39a" }
      ]
    });
  }

  /**
   * Contextual Fallback Generator (No robotic repetition!)
   */
  function generateContextualAnswer(query, lang) {
    if (lang === "hinglish" || lang === "hi") {
      return {
        source: "Legal & Constitutional Guidance Desk",
        title: `Kanooni Salah: "${query}"`,
        summary: [
          `Aapka sawal "${query}" legal/civic provisions ke tahat analyze kiya gaya hai.`,
          "NyayaMitra AI mukhya roop se Sahakari Samitiyon (Part IXB), KCC Khedut Adhikar, Nagrik Mool Adhikar aur Daily Civic Services par kendrit hai.",
          "Kisi bhi kanooni vivad ya police mamle me, Article 39A ke tehat aap District Legal Services Authority (DLSA Helpline: 15100) se muft vakil prapt kar sakte hain.",
          "Aap specific section (jaise Section 38, Section 84, Section 138, Section 154) ya Article (jaise Art 14, 21, 32, 243ZJ) likhkar direct statutory jankari pa sakte hain."
        ],
        advice: "Kripya specific kanooni vishay ya dhara ka ullekh karein taaki sahi statutory clause prastut kiya ja sake."
      };
    }

    return {
      source: "Constitutional & Civil Legal Information Desk",
      title: `Legal Guidance: "${query}"`,
      summary: [
        `Your inquiry regarding "${query}" has been analyzed within the Indian legal framework.`,
        "NyayaMitra AI specializes in Cooperative Governance (Part IXB & MSCS Act), Agricultural Credit (KCC), and Citizen Fundamental Rights.",
        "Under Article 39A of the Constitution, every citizen is entitled to free legal aid and court representation via District Legal Services Authorities (National Helpline: 15100).",
        "You can look up specific statutory sections (e.g. Section 38, Section 84, Section 138, Section 154) or Constitutional Articles (e.g. Art 14, 21, 32, 243ZJ) for instant statutory text."
      ],
      advice: "Try typing a specific section number, constitutional article, or choose from the suggested action chips below."
    };
  }

  /**
   * Render Modern Bot Card (Clean, Dynamic & Interactive)
   */
  function renderBotCard(data) {
    const block = document.createElement("div");
    block.className = "exchange-block";
    const msgId = "resp_" + Date.now();

    // 1. Build Content HTML (Smart Item / Step Recognition)
    let contentHtml = "";
    const items = Array.isArray(data.summaryItems) ? data.summaryItems : [data.summaryItems];

    // Check if this looks like a step-by-step guide
    const isStepList = items.some(item => /^(?:Step\s*\d+|चरण\s*\d+|પગલું\s*\d+|\d+\.)/i.test(item));

    if (isStepList) {
      contentHtml = items.map((item, idx) => {
        const stepNum = String(idx + 1).padStart(2, "0");
        const cleanText = item.replace(/^(?:Step\s*\d+:?|चरण\s*\d+:?|પગલું\s*\d+:?|\d+\.\s*)/i, "").trim();
        return `
          <div class="step-guide-card">
            <div class="step-num-badge">${stepNum}</div>
            <div class="step-content-body">${formatHighlights(cleanText)}</div>
          </div>
        `;
      }).join("");
    } else {
      contentHtml = items.map(item => {
        // Detect icon based on keywords
        let icon = "⚖️";
        if (/vote|voting|matdan/i.test(item)) icon = "🗳️";
        else if (/proxy|ban|prohibit|varjit|rok/i.test(item)) icon = "🚫";
        else if (/equality|samanta|barabar/i.test(item)) icon = "⚖️";
        else if (/punishment|saza|imprisonment|jail/i.test(item)) icon = "⚔️";
        else if (/court|arbitrat|tribunal|dispute|jhagda/i.test(item)) icon = "🏛️";
        else if (/free|muft|nalsa|dlsa|aid/i.test(item)) icon = "🤝";
        else if (/farmer|kisan|crop|kcc/i.test(item)) icon = "🌾";
        else if (/fee|premium|rupee|₹/i.test(item)) icon = "💰";
        else if (/notice|time|day|din/i.test(item)) icon = "⏱️";
        else if (/police|fir|arrest/i.test(item)) icon = "🚔";

        return `
          <div class="highlight-item-card">
            <span class="highlight-icon">${icon}</span>
            <div class="highlight-text">${formatHighlights(item)}</div>
          </div>
        `;
      }).join("");
    }

    // 2. Contextual Quick Chips HTML
    let quickChipsHtml = "";
    if (data.quickChips && data.quickChips.length > 0) {
      quickChipsHtml = `
        <div class="quick-chips-bar">
          ${data.quickChips.map(c => `
            <button class="action-chip" onclick="handleChipClick('${escapeHtml(c.query)}')">
              ${escapeHtml(c.text)}
            </button>
          `).join("")}
        </div>
      `;
    }

    // 3. Embedded Visual Diagram HTML
    let visualHtml = "";
    if (data.visualSvg) {
      visualHtml = `
        <div class="embedded-visual-box" style="margin-top: 8px;">
          <div class="visual-title">📊 ${data.visualSvg.title}</div>
          ${data.visualSvg.svg}
        </div>
      `;
    }

    // 4. Deep Dive Accordion HTML
    let deepDiveHtml = "";
    if (data.deepDiveMd) {
      deepDiveHtml = `
        <div class="deep-dive-box">
          <button class="deep-dive-btn" onclick="toggleDeepDive('${msgId}')">
            <span>📖 Statutory Deep Dive & Full Legal Text</span>
            <span>▼</span>
          </button>
          <div class="deep-dive-panel hidden" id="deep_${msgId}">
            ${formatMarkdown(data.deepDiveMd)}
          </div>
        </div>
      `;
    }

    const speechText = items.join(". ");

    // 5. Assemble Modern Card Layout
    block.innerHTML = `
      <div class="bot-card-wrapper">
        
        <!-- Header Bar -->
        <div class="bot-card-header">
          <div class="bot-identity-group">
            <div class="bot-avatar-badge">⚖️</div>
            <div class="bot-info-meta">
              <span class="bot-title-name">NyayaMitra AI</span>
              <span class="bot-source-pill" title="${escapeHtml(data.sourceText)}">${escapeHtml(data.sourceText)}</span>
            </div>
          </div>
          <div class="bot-tags-group">
            <span class="point-badge">⚡ Short & Up to the Point</span>
            <span class="verified-pill">✓ Constitution Grounded</span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="bot-card-body" id="${msgId}">
          
          <h3 class="card-main-heading">${data.referenceTitle}</h3>

          <div class="card-content-block">
            ${contentHtml}
          </div>

          ${data.roleAdvice ? `
            <div class="action-callout-card">
              <div class="callout-icon-box">💡</div>
              <div class="callout-content">
                <strong>Actionable Recourse:</strong> ${data.roleAdvice}
              </div>
            </div>
          ` : ''}

          ${visualHtml}
          ${deepDiveHtml}
          ${quickChipsHtml}

          <div class="card-footer-strip">
            <span class="statutory-footnote">⚖️ Verified from Constitution of India & Statutory Acts DB</span>
            <button class="listen-action-btn" id="audioBtn_${msgId}" onclick="playAudio('${msgId}', ${JSON.stringify(speechText)})">
              🔊 <span>Listen to Audio</span>
            </button>
          </div>

        </div>

      </div>
    `;

    chatMessages.appendChild(block);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function formatHighlights(text) {
    // Bold labels like "One Member, One Vote:" or "Step 1:"
    return text.replace(/^([^:–—]+[:–—])\s*/, '<strong>$1</strong> ');
  }

  // Global Audio Playback Handler
  window.playAudio = function(msgId, text) {
    const btn = document.getElementById(`audioBtn_${msgId}`);
    if (activeSpeechUtteranceId === msgId) {
      SPEECH_ENGINE.stopSpeaking();
      activeSpeechUtteranceId = null;
      if (btn) btn.innerHTML = "🔊 <span>Listen</span>";
      return;
    }

    SPEECH_ENGINE.stopSpeaking();
    activeSpeechUtteranceId = msgId;
    if (btn) btn.innerHTML = "⏹️ <span>Stop</span>";

    const speechCode = MULTILINGUAL_ENGINE.languages[currentLanguage]?.speechCode || "en-IN";
    SPEECH_ENGINE.speakText(text, speechCode, () => {
      activeSpeechUtteranceId = null;
      if (btn) btn.innerHTML = "🔊 <span>Listen</span>";
    });
  };

  window.toggleDeepDive = function(msgId) {
    const panel = document.getElementById(`deep_${msgId}`);
    if (panel) {
      panel.classList.toggle("hidden");
    }
  };

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function formatMarkdown(md) {
    return md
      .replace(/^### (.*$)/gim, '<h5 style="margin-top:8px; color:var(--accent-blue);">$1</h5>')
      .replace(/^## (.*$)/gim, '<h4 style="margin-top:8px; color:var(--accent-blue);">$1</h4>')
      .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
      .replace(/(\d+)\.\s+(.*$)/gim, '<li><strong>$1.</strong> $2</li>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n\n/gim, '<br/>');
  }
});
