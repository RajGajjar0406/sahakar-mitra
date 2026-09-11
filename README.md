# SahakarNyaya AI (सहकार न्याय AI)
### Multilingual Cooperative Governance & Constitutional Legal Assistance Chatbot
**Official Prototype for Smart India Hackathon (SIH 2026)**

---

## 👥 Welcome Team!
Congratulations on embarking on your **SIH 2026** journey! As freshers, you do **not** need any prior coding knowledge to run, demonstrate, or present this prototype to hackathon evaluators. 

Everything is pre-built, runs 100% locally on your computer with **zero external paid APIs**, and works reliably offline.

---

## ⚡ How to Run in 5 Seconds

### Option A (Recommended - Automated 1-Click Server):
1. Open your terminal / PowerShell in this folder:
   ```bash
   cd "C:\Users\Raj Gajjar\.gemini\antigravity\scratch\sih-coop-legal-bot"
   ```
2. Run:
   ```bash
   python start_server.py
   ```
3. Your web browser (Chrome or Edge) will automatically open `http://localhost:8000/`.

### Option B (Instant Double-Click):
- Simply double-click `index.html` in your file explorer to open it directly in Google Chrome or Microsoft Edge!

---

## 📋 Complete Requirements Fulfillment Matrix

| Requirement | Implementation Detail |
|---|---|
| **1. No external API** | 100% self-contained client-side architecture. Uses native browser Web Speech API for voice and local embedded engines. |
| **2. Constitution Database** | Embedded database of **Part IXB (Articles 243ZH–243ZT)**, **Part III (Art 19(1)(c), 14, 21)**, **Part IV (Art 39A, 43B)**, MSCS Act 2002/2023, and PACS Guidelines. |
| **3. Exact Answers** | High-precision semantic intent retrieval strictly grounded in statutory articles with zero hallucinations. |
| **4. Short & Sweet** | Concise 2–4 bullet point executive summaries by default. |
| **5. Deep Dive Feature** | "📖 Deep Dive & Legal Articles" toggle drawer unfolds the complete statutory text, court precedents, procedural rules, and penalties. |
| **6. Light & Dark Theme** | One-click toggle between clean Civic Light Mode and Accessible Midnight Dark Mode (persisted in storage). |
| **7. High Relevance** | Includes verified source citation tags (e.g. `Constitution of India Art. 243ZJ`, `MSCS Act Sec. 84`). |
| **8 & 9. Simple, Uncluttered UI** | Professional, calm government standard UI with clean typography, ample whitespace, and zero visual clutter. |
| **10. 11 Regional Languages** | English, हिन्दी, ગુજરાતી, मराठी, தமிழ், తెలుగు, বাংলা, ಕನ್ನಡ, ਪੰਜਾਬੀ, മലയാളം, ଓଡ଼ିଆ. |
| **11. Visuals & Flowcharts** | Interactive SVG diagrams for: 4-Step Registration, Dispute Escalation Hierarchy, Board Quotas, Free Legal Aid Pathway, and PACS Credit Flow. |
| **12. Role Persona Selection** | 6 Personas: **Farmer** (PACS, crop loans), **Lawyer** (citations, limitation periods), **Citizen** (RTI, housing disputes), **Coop Official** (board quotas, audit timelines), **Dept Officer** (supersession rules), **Student** (97th Amendment). |
| **13. Interlanguage (Hinglish/Gujlish)** | Understands phonetic code-mixed prompts like *"society me dispute ho gaya kya kare"*, *"chunav na niyam"*, etc. |
| **14. Mic & Voice Synthesis** | 🎤 Click-to-talk speech-to-text + 🔊 Listen button for voice read-out in regional languages. |
| **15. Document Upload & Audit** | Upload Bylaws or legal notices (or pick preloaded samples) to get an automated Constitutional Compliance Score (0–100%) and missing clause amendments! |

---

## 🏆 3-Minute Live Demo Script for SIH Judges

When presenting to the evaluators, follow this exact sequence:

1. **Introduction (30 secs)**:
   - *"Respected judges, we are a fresher team presenting SahakarNyaya AI for Cooperative Governance & Legal Assistance."*
   - *"Cooperative societies in India empower over 29 crore citizens, especially rural farmers, but members face legal illiteracy and governance disputes. Our solution bridges this gap."*

2. **Multilingual & Interlanguage Voice Query (45 secs)**:
   - Switch language to **हिन्दी (Hindi)** or **ગુજરાતી (Gujarati)**.
   - Click the 🎤 **Mic button** and ask: *"society me dispute ho gaya kya kare"* (or click the quick prompt chip).
   - Show how the bot immediately identifies **Section 84 of the MSCS Act** and **Article 243ZJ**.
   - Click **🔊 उत्तर सुनें (Listen)** to let the judges hear the spoken answer.

3. **Role-Adaptive Answers & Visual Flowcharts (45 secs)**:
   - Change role from **Farmer** to **Lawyer** and ask the same query.
   - Show how the Lawyer gets precise statutory sections, 30-day election limitation periods, and arbitration jurisdiction!
   - Highlight the **interactive SVG dispute escalation diagram** rendered right inside the chat.
   - Expand the **"Deep Dive & Legal Articles"** accordion to show full constitutional articles and procedural remedies.

4. **Document Upload & Compliance Auditing (60 secs)**:
   - Click the 📄 **Upload Document** button.
   - Choose **"Defective Society Bylaws (With Constitutional Violations)"** from the sample dropdown.
   - Show how the bot audits the document in milliseconds and detects:
     - ❌ *Missing Women Reservation (Article 243ZJ)*
     - ❌ *Missing 6-Month Mandatory Audit (Article 243ZM)*
     - ❌ *No Member Right to Information (Article 243ZO)*
   - Point out the **recommended amendment text** that the society can adopt to become legally compliant.
   - Toggle **🌙 Dark / ☀️ Light Theme** to demonstrate accessibility.

---

## 🛠️ Project File Structure
```
sih-coop-legal-bot/
├── index.html                  # Main application interface
├── css/
│   └── styles.css              # Light & Dark design system, responsive layout
├── js/
│   ├── legal_database.js       # Constitution (Part IXB, Art 19/39A/43B) & MSCS database
│   ├── multilingual_engine.js  # 11 Indian languages & Hinglish/Gujlish parser
│   ├── speech_engine.js        # Web Speech API (mic input & voice read-out)
│   ├── document_processor.js   # Document text parser & compliance audit engine
│   └── app.js                  # Main controller connecting UI with engines
├── start_server.py             # 1-click local server launcher
└── README.md                   # Team guide and presentation pitch
```

---

Good luck with **Smart India Hackathon 2026**! 🎉
