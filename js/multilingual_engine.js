/**
 * SIH 2026 - NyayaMitra AI
 * Exact Section/Article Parser, Multilingual Intent Engine & Semantic Matcher
 */

const MULTILINGUAL_ENGINE = {
  currentLang: "en",
  currentRole: "citizen",

  // Supported Languages
  languages: {
    en: { name: "English", nativeName: "English", speechCode: "en-IN" },
    hi: { name: "Hindi", nativeName: "हिन्दी", speechCode: "hi-IN" },
    gu: { name: "Gujarati", nativeName: "ગુજરાતી", speechCode: "gu-IN" },
    mr: { name: "Marathi", nativeName: "मराठी", speechCode: "mr-IN" },
    ta: { name: "Tamil", nativeName: "தமிழ்", speechCode: "ta-IN" },
    te: { name: "Telugu", nativeName: "తెలుగు", speechCode: "te-IN" },
    bn: { name: "Bengali", nativeName: "বাংলা", speechCode: "bn-IN" },
    kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", speechCode: "kn-IN" },
    pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", speechCode: "pa-IN" },
    ml: { name: "Malayalam", nativeName: "മലയാളം", speechCode: "ml-IN" },
    or: { name: "Odia", nativeName: "ଓଡ଼ିଆ", speechCode: "or-IN" }
  },

  // Role Definitions
  roles: {
    citizen: { id: "citizen", icon: "👥", title: "Local Citizen / Member", desc: "Everyday civic rights, member transparency, housing bylaws & consumer protection." },
    farmer: { id: "farmer", icon: "👨‍🌾", title: "Farmer / Agri-Producer", desc: "PACS crop loans, Kisan Credit Card, subsidized fertilizers, warehousing & MSP." },
    lawyer: { id: "lawyer", icon: "⚖️", title: "Advocate / Legal Professional", desc: "Statutory sections, Section 84 arbitration, writ remedies under Art 226/32 & case law." },
    coop_official: { id: "coop_official", icon: "🏛️", title: "Cooperative Board Official / Secretary", desc: "Board reservation quotas (Art 243ZJ), AGM deadlines (Art 243ZN), statutory audits & returns." },
    dept_officer: { id: "dept_officer", icon: "🏢", title: "Government / Dept. Registrar", desc: "Regulatory supervision, inquiry, supersession limits (Art 243ZL) & compliance inspections." },
    student: { id: "student", icon: "🎓", title: "Student / Legal Researcher", desc: "97th Constitutional Amendment, socio-economic democracy, cooperative jurisprudence." }
  },

  /**
   * Automatic Script & Language Detection from Prompt Text
   */
  detectLanguage(text) {
    if (!text) return "en";

    // Devanagari script (Hindi, Marathi)
    if (/[\u0900-\u097F]/.test(text)) return "hi";
    // Gujarati script
    if (/[\u0A80-\u0AFF]/.test(text)) return "gu";
    // Bengali script
    if (/[\u0980-\u09FF]/.test(text)) return "bn";
    // Tamil script
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
    // Telugu script
    if (/[\u0C00-\u0C7F]/.test(text)) return "te";

    // Hinglish detection (Latin script with Hindi vocabulary)
    const hinglishMarkers = /\b(bhai|mujhe|mera|meri|kya|kyu|hai|hote|hoga|karvana|karwana|batao|kaise|karna|chahiye|nahi|naam|badalna|sudhar|karein|karo|sabse|khedut|kaun|kaise|adhikar|samjhao)\b/i;
    if (hinglishMarkers.test(text)) return "hinglish";

    // Gujlish detection
    const gujlishMarkers = /\b(shu|kem|karvu|che|nathi|mate|apvo|tamare|maru|tame|karva|joye)\b/i;
    if (gujlishMarkers.test(text)) return "gujlish";

    return "en";
  },

  /**
   * Normalize user queries by correcting common typos and phonetic variations
   */
  normalizeQuery(text) {
    if (!text) return "";
    let s = text.toLowerCase().trim();
    // Common user typos & phonetic variants
    s = s.replace(/\bdisputs\b/gi, "dispute");
    s = s.replace(/\bdisput\b/gi, "dispute");
    s = s.replace(/\bproperti\b/gi, "property");
    s = s.replace(/\bproperte\b/gi, "property");
    s = s.replace(/\bzamin\b/gi, "zameen");
    s = s.replace(/\bjamin\b/gi, "zameen");
    s = s.replace(/\bjaminu\b/gi, "zameen");
    s = s.replace(/\bvivad\b/gi, "vivad");
    s = s.replace(/\bvivaad\b/gi, "vivad");
    s = s.replace(/\bbibad\b/gi, "vivad");
    s = s.replace(/\bcertifikate\b/gi, "certificate");
    s = s.replace(/\bsertificate\b/gi, "certificate");
    s = s.replace(/\bcertficate\b/gi, "certificate");
    s = s.replace(/\bcetificate\b/gi, "certificate");
    s = s.replace(/\bpramanpatra\b/gi, "praman patra");
    s = s.replace(/\baddhar\b/gi, "aadhaar");
    s = s.replace(/\baadhar\b/gi, "aadhaar");
    s = s.replace(/\badhar\b/gi, "aadhaar");
    s = s.replace(/\badhhar\b/gi, "aadhaar");
    s = s.replace(/\bvakeel\b/gi, "vakil");
    s = s.replace(/\bkanun\b/gi, "kanoon");
    return s;
  },

  /**
   * High-Precision Intent Detection with Exact Section/Article Extraction
   */
  detectIntent(query) {
    const q = this.normalizeQuery(query);

    // 1. Greetings & Small Talk
    if (/^(hi|hello|hey|namaste|namaskar|kem cho|pranam|good morning|good evening|satsriakal|vanakkam)\b/i.test(q) ||
        /\b(who are you|kya kar sakte ho|how can you help|tame kon cho)\b/i.test(q)) {
      return "greeting";
    }

    // 2. CRITICAL: EXACT SECTION NUMBER & DIRECT NUMBER PARSER
    // A. Direct standalone numbers or common section/article numbers
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*38$/i.test(q)) return "mscs_sec_38";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*302$/i.test(q)) return "ipc_302";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*420$/i.test(q)) return "ipc_420";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*84$/i.test(q)) return "mscs_sec_84";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*7$/i.test(q)) return "mscs_sec_7";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*41$/i.test(q)) return "mscs_sec_41";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*70$/i.test(q)) return "mscs_sec_70";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*106$/i.test(q)) return "mscs_sec_106";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*138$/i.test(q)) return "ni_sec_138";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*154$/i.test(q)) return "crpc_154";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*438$/i.test(q)) return "crpc_438";
    if (/^(?:section|sec|dhara|kalam|धारा|કલમ)?\s*125$/i.test(q)) return "crpc_125";
    if (/^(?:article|art|anuchhed|anuched|अनुच्छेद|અનુચ્છેદ)?\s*21$/i.test(q)) return "art_21_life";
    if (/^(?:article|art|anuchhed|anuched|अनुच्छेद|અનુચ્છેદ)?\s*14$/i.test(q)) return "art_14_equality";
    if (/^(?:article|art|anuchhed|anuched|अनुच्छेद|અનુચ્છેદ)?\s*32$/i.test(q)) return "art_32_writs";
    if (/^(?:article|art|anuchhed|anuched|अनुच्छेद|અનુચ્છેદ)?\s*39a$/i.test(q)) return "art_39a";
    if (/^(?:article|art|anuchhed|anuched|अनुच्छेद|અનુચ્છેદ)?\s*43b$/i.test(q)) return "art_43b";

    // B. Section regex with prefixes (section, sec, dhara, kalam, etc.)
    const secMatch = q.match(/\b(?:section|sec|dhara|kalam|धारा|કલમ)\s*[:.-]?\s*([0-9]+[a-z]?)\b/i) ||
                     q.match(/\b([0-9]+[a-z]?)\s*(?:section|sec|dhara|kalam|धारा|કલમ)\b/i);
    if (secMatch) {
      const num = secMatch[1].toLowerCase();
      const sectionMap = {
        "38": "mscs_sec_38",
        "302": "ipc_302",
        "84": "mscs_sec_84",
        "7": "mscs_sec_7",
        "420": "ipc_420",
        "41": "mscs_sec_41",
        "70": "mscs_sec_70",
        "106": "mscs_sec_106",
        "138": "ni_sec_138",
        "144": "crpc_144",
        "154": "crpc_154",
        "438": "crpc_438",
        "125": "crpc_125",
        "25": "mscs_sec_25",
        "29": "mscs_sec_29",
        "30": "mscs_sec_30",
        "35": "mscs_sec_35",
        "99": "mscs_sec_99"
      };
      return sectionMap[num] || ("unmapped_section_" + num);
    }

    // 3. CRITICAL: EXACT ARTICLE NUMBER PARSER
    const artMatch = q.match(/\b(?:article|art|anuchhed|anuched|anuchhedh|अनुच्छेद|અનુચ્છેદ)\s*[:.-]?\s*([0-9]+[a-z]?)\b/i) ||
                     q.match(/\b([0-9]+[a-z]?)\s*(?:article|art|anuchhed|anuched)\b/i);
    if (artMatch) {
      const num = artMatch[1].toLowerCase();
      const articleMap = {
        "14": "art_14_equality",
        "19": "art_19_1_c",
        "19(1)(c)": "art_19_1_c",
        "191c": "art_19_1_c",
        "21": "art_21_life",
        "21a": "art_21a_education",
        "22": "art_22_arrest",
        "32": "art_32_writs",
        "39a": "art_39a",
        "43b": "art_43b",
        "51a": "fundamental_duties",
        "243zj": "art_243zj",
        "243zk": "art_243zk",
        "243zl": "art_243zl",
        "243zm": "art_243zm",
        "243zn": "art_243zn",
        "243zo": "art_243zo",
        "226": "art_226_hc_writs"
      };
      return articleMap[num] || ("unmapped_article_" + num);
    }

    // 4. The 6 Basic Fundamental Rights of Indian Citizens
    if (/\b(6\s*rights|six\s*rights|basic\s*rights|fundamental\s*rights|rights\s*of\s*(a\s*)?(local\s*)?citizen|rights\s*of\s*india|maulik\s*adhikar|che\s*adhikar)\b/i.test(q) ||
        (/\b(basic|6|six)\b/i.test(q) && /\b(right|rights|adhikar)\b/i.test(q) && /\b(citizen|india|nagrik)\b/i.test(q)) ||
        /\b(rights\s*of\s*citizen)\b/i.test(q)) {
      return "fundamental_6_rights";
    }

    // 5. Preamble of India
    if (/\b(preamble|prastavana|we\s*the\s*people|sovereign\s*socialist)\b/i.test(q)) {
      return "preamble_india";
    }

    // 6. Fundamental Duties (Article 51A)
    if (/\b(fundamental\s*duties|kartavya|11\s*duties)\b/i.test(q)) {
      return "fundamental_duties";
    }

    // 7. FIR & Police Procedure
    if (/\b(fir|zero\s*fir|how\s*to\s*file\s*fir|police\s*complaint|police\s*report|police\s*mana\s*kare)\b/i.test(q)) {
      return "crpc_154";
    }

    // 8. Bail & Anticipatory Bail
    if (/\b(bail|agrim\s*jamanat|anticipatory\s*bail|arrest\s*rules|bailable)\b/i.test(q)) {
      return "crpc_438";
    }

    // 9. Cheque Bounce (Section 138 NI Act)
    if (/\b(cheque\s*bounce|check\s*bounce|cheque\s*dishonour|bounce\s*cheque|138\s*notice)\b/i.test(q)) {
      return "ni_sec_138";
    }

    // 10. Domestic Violence & Women Rights
    if (/\b(domestic\s*violence|patni\s*par\s*atyachar|mahila\s*helpline|181\s*helpline|pwdva|dahej|dowry)\b/i.test(q)) {
      return "domestic_violence_act";
    }

    // 11. Maintenance for Wife / Elderly Parents (Section 125)
    if (/\b(maintenance|gujara\s*bhatta|kharcha|parents\s*maintenance|elderly\s*parents)\b/i.test(q)) {
      return "crpc_125";
    }

    // 12. Birth Certificate Update / Correction (Section 15 RBD Act)
    if (/\b(birth\s*certificate|janam\s*praman|janam\s*patra|janam\s*praman\s*patra|birth\s*record|birth\s*cert|janam\s*dakhla)\b/i.test(q) ||
        (/\b(birth|janam)\b/i.test(q) && /\b(certificate|patra|praman|dakhla|record|correction|update|name)\b/i.test(q))) {
      return "birth_certificate_update";
    }

    // 13. Land, Revenue & Property Dispute (State Land Code / Revenue Court / Sec 145 CrPC)
    if (/\b(land\s*dispute|property\s*dispute|zameen\s*vivad|khet\s*ka\s*vivad|dakhil\s*kharij|mutation|7\/12|jamabandi|khatauni|encroachment|boundary\s*dispute|revenue\s*court|partition\s*suit|title\s*suit|illegal\s*possession|kabza|zameen|zamin)\b/i.test(q) ||
        (/\b(land|property|zameen|khet|jamin)\b/i.test(q) && /\b(dispute|vivad|takrar|illegal|kabza|possession|boundary|mutation|batwara|partition|law|laws)\b/i.test(q))) {
      return "land_revenue_dispute";
    }

    // 14. Aadhaar / Identity Update (Civic Services)
    if (/\b(aadhaar|addhar|aadhar|adhar)\b/i.test(q)) {
      return "aadhaar_update";
    }

    // 13. Kisan Credit Card (KCC) & Farmer Rights
    if (/\b(kisan\s*credit\s*card|kcc|kisan\s*credit|fasal\s*loan|crop\s*loan|kisan\s*loan|subvention)\b/i.test(q) ||
        (/\b(kisan|farmer|khedut)\b/i.test(q) && /\b(right|adhikar|loan|rin|credit|bima)\b/i.test(q))) {
      return "kcc_rights";
    }

    // 14. Murder / Section 302
    if (/\b(murder|hatya|katl|killing)\b/i.test(q)) {
      return "ipc_302";
    }

    // 15. Cheating / Fraud / 420
    if (/\b(cheating|dhokhadhadi|scam|fraud|gaban)\b/i.test(q)) {
      return "ipc_420";
    }

    // 16. Right to Information (RTI)
    if (/\b(rti|right\s*to\s*information|soochana\s*ka\s*adhikar)\b/i.test(q)) {
      return "rti_act";
    }

    // 17. Consumer Court & Consumer Protection
    if (/\b(consumer\s*court|consumer\s*forum|consumer\s*protection|grahak\s*suraksha|edaakhil|e-daakhil)\b/i.test(q)) {
      return "consumer_protection";
    }

    // 18. Free Legal Aid & NALSA / DLSA (Article 39A)
    if (/\b(free\s*lawyer|muft\s*vakil|free\s*vakil|legal\s*aid|nalsa|dlsa|sarkari\s*vakil)\b/i.test(q) ||
        /\b(cannot\s*afford\s*lawyer|gareeb\s*ko\s*vakil)\b/i.test(q)) {
      return "art_39a";
    }

    // 19. Cooperative Dispute & Arbitration (Section 84)
    if ((/\b(dispute|jhagda|vivad|takrar|lafda|madbhed|arbitration|arbitrator)\b/i.test(q) && /\b(society|cooperative|sahakari|mandli)\b/i.test(q)) ||
        /\b(cooperative\s*dispute|society\s*dispute)\b/i.test(q)) {
      return "mscs_sec_84";
    }

    // 20. Cooperative Registration (Section 7)
    if (/\b(how\s*to\s*register|register\s*cooperative|society\s*registration|panjikaran|panjiyan|start\s*society|kaise\s*banaye)\b/i.test(q)) {
      return "mscs_sec_7";
    }

    // 21. Board Quota & Women Reservation (Article 243ZJ)
    if (/\b(women\s*reservation|sc\s*st\s*quota|mahila\s*arakshan|board\s*size|21\s*directors)\b/i.test(q) ||
        (/\b(reservation|quota|arakshan)\b/i.test(q) && /\b(board|society|cooperative)\b/i.test(q))) {
      return "art_243zj";
    }

    // 22. Elections & Voting (Article 243ZK / Section 38)
    if (/\b(election|chunav|voting|voter\s*list|matdan|one\s*member\s*one\s*vote|proxy)\b/i.test(q)) {
      return "mscs_sec_38";
    }

    // 23. Audit & Accounts (Article 243ZM)
    if (/\b(financial\s*audit|statutory\s*audit|accounts\s*audit|audit\s*rules)\b/i.test(q) ||
        (/\b(audit)\b/i.test(q) && /\b(society|cooperative|accounts|ca|chartered)\b/i.test(q))) {
      return "art_243zm";
    }

    // 24. AGM (Article 243ZN)
    if (/\b(agm|annual\s*general\s*meeting|general\s*body\s*meeting|varshik\s*sabha)\b/i.test(q)) {
      return "art_243zn";
    }

    // 25. Housing Society Maintenance / Transfer Fee
    if (/\b(housing\s*society|flat\s*maintenance|transfer\s*fee|transfer\s*premium|noc\s*for\s*flat)\b/i.test(q)) {
      return "housing_maintenance_dispute";
    }

    // Fallback: Semantic Word Overlap Scorer (with Stopword Filtering!)
    return this.scoreBestMatch(q);
  },

  /**
   * Word-overlap Semantic Scorer across all database entries
   */
  scoreBestMatch(query) {
    const stopwords = [
      "bhai", "nahi", "kaise", "kya", "batao", "mujhe", "local", "citizen", "section", "sec", "article", "art",
      "dhara", "kalam", "the", "and", "for", "with", "from", "that", "this", "karo", "karna", "hoga", "karein",
      "number", "rules", "rule", "law", "laws", "legal", "act", "acts", "india", "indian", "tell", "explain", "about", "what", "how"
    ];

    const tokens = query.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 2 && !stopwords.includes(w));
    if (tokens.length === 0) return "general_query";
    
    const allEntries = [
      ...(LEGAL_DATABASE.fundamentalRights || []),
      ...(LEGAL_DATABASE.constitutionalFramework || []),
      ...(LEGAL_DATABASE.statutes || []),
      ...(LEGAL_DATABASE.agriculturalRights || []),
      ...(LEGAL_DATABASE.civicServices || []),
      ...(LEGAL_DATABASE.criminalLaw || []),
      ...(LEGAL_DATABASE.constitution || []),
      ...(LEGAL_DATABASE.housing || []),
      ...(LEGAL_DATABASE.citizenProcedures || []),
      ...(LEGAL_DATABASE.propertyAndLand || [])
    ];

    let bestId = "general_query";
    let highestScore = 0;

    for (const entry of allEntries) {
      let score = 0;
      const titleLower = (entry.title || "").toLowerCase();
      const summaryLower = (entry.shortSummary || "").toLowerCase();
      const keywords = (entry.keywords || []).map(k => k.toLowerCase());

      for (const token of tokens) {
        if (titleLower.includes(token)) score += 4;
        if (summaryLower.includes(token)) score += 2;
        if (keywords.some(k => k.includes(token))) score += 5;
      }

      if (score > highestScore) {
        highestScore = score;
        bestId = entry.id;
      }
    }

    return highestScore >= 3 ? bestId : "general_query";
  },

  /**
   * Localized Answers for Core Inquiries
   */
  localizedAnswers: {
    // Section 38 MSCS Act (Voting Rights)
    mscs_sec_38: {
      hinglish: {
        ref: "Section 38, Multi-State Co-operative Societies (MSCS) Act, 2002",
        title: "Section 38: Voting Rights of Members (One Member, One Vote)",
        summary: [
          "Ek Sadasya, Ek Vote (One Member, One Vote): Society me chahe kisi member ke paas 1 share ho ya 1000 shares, har sadasya ko sirf ek hi vote dene ka adhikar hai.",
          "Proxy Voting Par Poora Pratibandh: Koi bhi member apna vote kisi doosre ko nahi de sakta (proxy voting prohibited), member ko khud aakar vote dalna hoga.",
          "Casting Vote: Agar election ya meeting me barabari (tie) ho jaye, tabhi Chairperson ko apna faislakun (casting) vote dene ka adhikar hota hai.",
          "Democratic Equality: Yeh kanoon isliye banaya gaya hai taaki ameer log ya bade share-holders cooperative society par kabza na kar sakein."
        ],
        advice: "Agar koi society proxy vote allow karti hai ya kisi member ko vote dene se rokti hai, to Section 84 ke tehat election ko challenge kiya ja sakta hai."
      },
      hi: {
        ref: "धारा 38, बहु-राज्य सहकारी सोसायटी अधिनियम, 2002",
        title: "धारा 38: सदस्यों के मताधिकार (एक सदस्य, एक मत)",
        summary: [
          "एक सदस्य, एक मत: प्रत्येक सदस्य को शेयर पूंजी के अनुपात की परवाह किए बिना केवल एक मत देने का वैधानिक अधिकार है।",
          "प्रॉक्सी मतदान पूर्णतः वर्जित: सदस्यों को स्वयं उपस्थित होकर मतदान करना अनिवार्य है; किसी अन्य के माध्यम से प्रॉक्सी मत नहीं दिया जा सकता।",
          "निर्णायक मत (Casting Vote): मत बराबर होने की स्थिति में ही सभापति को निर्णायक मत देने का अधिकार प्राप्त है।",
          "लोकतांत्रिक नियंत्रण: यह व्यवस्था पूँजीवादी नियंत्रण को रोकने तथा सहकारी लोकतंत्र बनाए रखने हेतु अनिवार्य की गई है।"
        ],
        advice: "प्रॉक्सी मतों द्वारा कराए गए चुनाव को धारा 84 के तहत अवैध घोषित कराया जा सकता है।"
      },
      gu: {
        ref: "કલમ 38, મલ્ટી-સ્ટેટ કો-ઓપરેટિવ સોસાયટી એક્ટ, 2002",
        title: "કલમ 38: સભ્યોના મતાધિકાર (એક સભ્ય, એક મત)",
        summary: [
          "એક સભ્ય, એક મત: મંડળીમાં ગમે તેટલા શેર હોય, દરેક સભ્યને માત્ર એક જ મત આપવાનો અધિકાર છે.",
          "પ્રોક્સી મતદાન પર પ્રતિબંધ: સભ્યએ જાતે હાજર રહીને મતદાન કરવું પડે, કોઈ બીજા દ્વારા પ્રોક્સી મત આપી શકાતો નથી.",
          "કાસ્ટિંગ વોટ: સભામાં સમાન મત પડે ત્યારે જ પ્રમુખ પોતાનો નિર્ણાયક મત આપી શકે છે.",
          "સહકારી લોકશાહી: ધનિક સભ્યો મંડળી પર આધિપત્ય ન જમાવે તે માટે આ જોગવાઈ કરાઈ છે."
        ],
        advice: "પ્રોક્સી વોટિંગ ગેરકાયદેસર છે અને તેનાથી થયેલી ચૂંટણી રદબાતલ ઠરે છે."
      },
      en: {
        ref: "Section 38, Multi-State Co-operative Societies Act, 2002",
        title: "Section 38: Voting Rights of Members (One Member, One Vote)",
        summary: [
          "One Member, One Vote: Every member possesses exactly one vote regardless of the quantum of share capital held.",
          "Strict Prohibition of Proxy Voting: Members must cast their vote in person; voting through proxy is disallowed to prevent cartelization.",
          "Casting Vote: The Chairperson has a second or casting vote exclusively in the event of an equality of votes.",
          "Democratic Preservation: Enforces the fundamental cooperative principle of democratic equality."
        ],
        advice: "Any general body election conducted with proxy ballots is void and open to legal arbitration under Section 84."
      }
    },

    // 6 Fundamental Rights
    fundamental_6_rights: {
      hinglish: {
        ref: "Part III (Articles 12 to 35) - Constitution of India",
        title: "Bharat ke Nagrik ke 6 Mool (Basic) Adhikar",
        summary: [
          "1. Samanta ka Adhikar (Right to Equality - Articles 14 to 18): Kanoon ke samne sab barabar hain; dharam, jaati ya ling ke aadhar par bhedbhav nahi hoga.",
          "2. Swatantrata ka Adhikar (Right to Freedom - Articles 19 to 22): Bhashan, shanti-purna sabha, cooperative society banane ka adhikar (Art 19(1)(c)), aur jeene ki azadi (Art 21).",
          "3. Shoshan ke Khilaf Adhikar (Right against Exploitation - Articles 23 to 24): Manav taskari, bandhua mazdoori, aur 14 saal se kam umra ke bacchon se factory me kaam karwane par ban.",
          "4. Dharmik Swatantrata ka Adhikar (Right to Freedom of Religion - Articles 25 to 28): Apni pasand ke dharam ko manne, aacharan karne aur prachar karne ki poori aazadi.",
          "5. Sanskritik aur Shaikshik Adhikar (Cultural & Educational Rights - Articles 29 to 30): Minorities ko apni bhasha, lipi aur sanskriti bachane aur educational institutions chalane ka haq.",
          "6. Samvidhanik Upcharon ka Adhikar (Right to Constitutional Remedies - Article 32): Dr. Ambedkar ne ise 'Samvidhan ki Aatma' kaha; agar koi adhikar chheene to seedhe Supreme Court (Writs) ja sakte hain!"
        ],
        advice: "Cooperative societies banane ka adhikar isi Fundamental Right ke Article 19(1)(c) ke tehat har nagrik ko diya gaya hai."
      },
      hi: {
        ref: "भाग III (अनुच्छेद 12 से 35) - भारत का संविधान",
        title: "भारतीय नागरिकों के 6 मूलभूत मौलिक अधिकार",
        summary: [
          "1. समानता का अधिकार (अनुच्छेद 14-18): विधि के समक्ष समानता, धर्म, मूलवंश, जाति, लिंग या जन्मस्थान के आधार पर भेदभाव का निषेध।",
          "2. स्वतंत्रता का अधिकार (अनुच्छेद 19-22): विचार-अभिव्यक्ति, शांतिपूर्ण सम्मेलन, सहकारी समिति गठन (19(1)(c)), तथा प्राण व दैहिक स्वतंत्रता (अनुच्छेद 21)।",
          "3. शोषण के विरुद्ध अधिकार (अनुच्छेद 23-24): मानव तस्करी, बंधुआ मजदूरी तथा बाल श्रम पर पूर्ण प्रतिबंध।",
          "4. धार्मिक स्वतंत्रता का अधिकार (अनुच्छेद 25-28): अंतःकरण की स्वतंत्रता तथा किसी भी धर्म को मानने, आचरण व प्रचार का अधिकार।",
          "5. संस्कृति एवं शिक्षा सम्बन्धी अधिकार (अनुच्छेद 29-30): अल्पसंख्यकों को अपनी भाषा, लिपि व संस्कृति सुरक्षित रखने का अधिकार।",
          "6. संवैधानिक उपचारों का अधिकार (अनुच्छेद 32): 'संविधान का हृदय व आत्मा'; अधिकारों के हनन पर सीधे सर्वोच्च न्यायालय जाने (रिट) का अधिकार।"
        ],
        advice: "सहकारी समिति गठित करने का अधिकार अनुच्छेद 19(1)(c) के तहत मौलिक अधिकार के रूप में संरक्षित है।"
      },
      gu: {
        ref: "ભાગ III (અનુચ્છેદ 12 થી 35) - ભારતીય બંધારણ",
        title: "ભારતીય નાગરિકોના 6 મૂળભૂત અધિકારો",
        summary: [
          "1. સમાનતાનો અધિકાર (અનુચ્છેદ 14-18): કાયદા સમક્ષ સૌ સમાન, જાતિ કે લિંગ આધારિત ભેદભાવ પર પ્રતિબંધ.",
          "2. સ્વતંત્રતાનો અધિકાર (અનુચ્છેદ 19-22): વાણી સ્વાતંત્ર્ય, શાંતિપૂર્ણ સભા, મંડળી સ્થાપવાનો અધિકાર (19(1)(c)) અને જીવન જીવવાનો હક (21).",
          "3. શોષણ સામેનો અધિકાર (અનુચ્છેદ 23-24): વેઠપ્રથા, માનવ તસ્કરી અને 14 વર્ષથી નીચેના બાળકોના બાળમજૂરી પર પ્રતિબંધ.",
          "4. ધાર્મિક સ્વતંત્રતાનો અધિકાર (અનુચ્છેદ 25-28): કોઈપણ ધર્મ પાળવાની અને પ્રચાર કરવાની છૂટ.",
          "5. સાંસ્કૃતિક અને શૈક્ષણિક અધિકાર (અનુચ્છેદ 29-30): લઘુમતીઓની ભાષા અને સંસ્કૃતિનું રક્ષણ.",
          "6. બંધારણીય ઇલાજોનો અધિકાર (અનુચ્છેદ 32): બાબા સાહેબ આંબેડકરે બંધારણનો આત્મા કહ્યો છે; હક છીનવાય તો સીધા સુપ્રીમ કોર્ટ જઈ શકાય છે."
        ],
        advice: "સહકારી મંડળી બનાવવાનો હક અનુચ્છેદ 19(1)(c) મુજબ નાગરિકનો મૂળભૂત અધિકાર છે."
      },
      en: {
        ref: "Part III (Articles 12 to 35) - Constitution of India",
        title: "The 6 Basic Fundamental Rights of Indian Citizens",
        summary: [
          "1. Right to Equality (Articles 14–18): Equality before law, prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.",
          "2. Right to Freedom (Articles 19–22): Six freedoms including speech, assembly, association & cooperative formation (Art 19(1)(c)), and protection of life (Art 21).",
          "3. Right against Exploitation (Articles 23–24): Prohibition of human trafficking, forced labor, and child labor in factories.",
          "4. Right to Freedom of Religion (Articles 25–28): Freedom of conscience and free profession, practice, and propagation of religion.",
          "5. Cultural and Educational Rights (Articles 29–30): Protection of linguistic/religious minorities to preserve script, culture, and institutions.",
          "6. Right to Constitutional Remedies (Article 32): Dr. B.R. Ambedkar termed it the 'Heart & Soul of the Constitution' — right to move Supreme Court via Writs if rights are violated."
        ],
        advice: "Cooperative societies formation was elevated to a Fundamental Right under Article 19(1)(c) by the 97th Amendment Act."
      }
    },

    // Aadhaar Card Update
    aadhaar_update: {
      hinglish: {
        ref: "UIDAI Aadhaar (Enrollment & Update) Regulations, 2016",
        title: "Aadhaar Card me Name Change / Correction ke 4 Steps",
        summary: [
          "Step 1: UIDAI ke official portal myaadhaar.uidai.gov.in par jayein aur OTP se login karein (ya paas ke Aadhaar Seva Kendra jayein).",
          "Step 2: 'Name / Gender / DOB Update' option select karke apna sahi naam bharein.",
          "Step 3: Valid identity proof document (PAN Card, Passport, Voter ID, Driving License ya Gazetted Certificate) upload karein.",
          "Step 4: Government fee (₹50) pay karein aur 14-digit URN number note karein. Status 5-7 working days me update ho jayega."
        ],
        advice: "Dhyan rahe ki Aadhaar me lifetime me maximum 2 baar hi name change allow hota hai, isliye documents me spelling bilkul sahi honi chahiye."
      },
      hi: {
        ref: "UIDAI आधार (नामांकन एवं अद्यतन) विनियम, 2016",
        title: "आधार कार्ड में नाम सुधार / परिवर्तन के 4 मुख्य चरण",
        summary: [
          "चरण 1: आधिकारिक पोर्टल myaadhaar.uidai.gov.in पर जाएं अथवा नजदीकी आधार सेवा केंद्र पर संपर्क करें।",
          "चरण 2: 'Name / Demographic Update' विकल्प चुनकर वैध पहचान प्रमाण के अनुसार सही नाम दर्ज करें।",
          "चरण 3: मान्य पहचान पत्र (पैन कार्ड, पासपोर्ट, वोटर आईडी, ड्राइविंग लाइसेंस) की स्व-प्रमाणित प्रति संलग्न करें।",
          "चरण 4: ₹50 का सरकारी शुल्क अदा कर 14 अंकों का URN नंबर प्राप्त करें जिससे ऑनलाइन स्थिति जांची जा सके।"
        ],
        advice: "जीवनकाल में आधार में अधिकतम दो बार ही नाम परिवर्तन की अनुमति है।"
      },
      en: {
        ref: "UIDAI Aadhaar (Enrollment & Update) Regulations, 2016",
        title: "Aadhaar Card Name Correction & Update Procedure",
        summary: [
          "Step 1: Visit the official portal myaadhaar.uidai.gov.in and login via OTP, or visit your nearest Aadhaar Seva Kendra.",
          "Step 2: Select 'Name/Gender/DOB Update' and enter your correct legal name as per official identity documents.",
          "Step 3: Upload valid Proof of Identity (Passport, PAN Card, Voter ID, or Driving License).",
          "Step 4: Pay statutory ₹50 fee and receive the 14-digit URN (Update Request Number) to track online status."
        ],
        advice: "A maximum of 2 name updates are permitted per individual in a lifetime."
      }
    },

    // Kisan Credit Card (KCC) Rights
    kcc_rights: {
      hinglish: {
        ref: "Article 21 (Livelihood) & RBI/NABARD Agricultural Subsidies Act",
        title: "Kisan Credit Card (KCC) par Kisan ke Legal Rights",
        summary: [
          "Subsidized 4% Interest Rate: Normal interest 7% hota hai, par time par repayment karne par 3% interest subvention milti hai, jisse net byaj sirf 4% lagta hai.",
          "Collateral-Free Loan: ₹1,60,000 tak ke crop loan ke liye bank ya PACS aapse koi zameen girvi (mortgage) nahi maang sakte.",
          "Sabhi Kisan Eligible: Khud ki zameen wale kisan, bataidar (sharecroppers), aur tenant farmers sabhi KCC ke haqdar hain.",
          "Grievance Redressal: Agar PACS ya bank loan dene se mana kare, to District Central Cooperative Bank ya Banking Ombudsman ko complaint karein."
        ],
        advice: "Fasal bima (PMFBY) ka premium bhi KCC ke sath automatically cover hota hai."
      },
      hi: {
        ref: "अनुच्छेद 21 (आजीविका अधिकार) एवं आरबीआई/नाबार्ड किसान क्रेडिट कार्ड दिशानिर्देश",
        title: "किसान क्रेडिट कार्ड (KCC) पर किसानों के कानूनी अधिकार एवं ब्याज छूट",
        summary: [
          "4% रियायती ब्याज दर: समय पर फसल ऋण चुकाने पर 3% ब्याज अनुदान मिलता है जिससे प्रभावी ब्याज केवल 4% रह जाता है।",
          "बिना बंधक ऋण (Collateral-Free): ₹1,60,000 तक के फसल ऋण पर बैंक या पैक्स जमीन गिरवी रखने की मांग नहीं कर सकते।",
          "सभी कृषक पात्र: भूमिधारक के साथ बटाईदार और संयुक्त देयता समूह (JLG) के किसान भी पात्र हैं।",
          "शिकायत निवारण: अनुचित रूप से ऋण अस्वीकार होने पर जिला केंद्रीय सहकारी बैंक या बैंकिंग लोकपाल से शिकायत की जा सकती है।"
        ],
        advice: "समय पर पुनर्भुगतान से प्रतिवर्ष रियायती ब्याज का लाभ प्राप्त करें।"
      },
      en: {
        ref: "Article 21 & RBI/NABARD Kisan Credit Card Directives",
        title: "Kisan Credit Card (KCC) Statutory Rights & Interest Subvention",
        summary: [
          "Subsidized 4% Net Interest: Prompt repayment triggers a 3% interest subvention rebate, reducing the effective annual interest to 4%.",
          "Collateral-Free Limit: Loans up to ₹1,60,000 do not require any land mortgage or third-party guarantee.",
          "Inclusive Eligibility: Owner cultivators, tenant farmers, oral lessees, and sharecroppers are legally eligible.",
          "Legal Recourse: Rejection of valid KCC can be appealed to District Central Cooperative Banks or Banking Ombudsman."
        ],
        advice: "Always maintain timely renewals to protect eligibility for recurring subvention cycles."
      }
    },

    // Section 302 IPC / BNS 103 (Murder)
    ipc_302: {
      hinglish: {
        ref: "Section 302 Indian Penal Code / Section 103 Bharatiya Nyaya Sanhita (BNS)",
        title: "Section 302: Murder ki Saza aur Legal Defense Rights",
        summary: [
          "Saza: Section 302 IPC (ab BNS Section 103) ke tehat hatya (murder) ke doshi ko ajeevan karavas (life imprisonment) ya mrityudand (death penalty) aur jurmane ki saza hoti hai.",
          "Cognizable & Non-Bailable: Yeh ek gambhir aparadh hai jisme police bina warrant arrest kar sakti hai aur bail Session Court ya High Court hi de sakti hai.",
          "Muft Vakil ka Adhikar (Art 39A): Constitution ke tehat agar aaropi vakil afford nahi kar sakta, to court aur DLSA ko sarkari kharche par free legal aid lawyer dena anivarya hai.",
          "Jurisdiction Note: NyayaMitra mukhya roop se Sahakari Sansthaon aur Nagrik Adhikaron me sahayata karta hai, parantu sabhi kanooni dharayein samjha sakta hai."
        ],
        advice: "Article 22 ke tehat kisi bhi aaropi ko 24 ghante ke andar Magistrate ke samne pesh karna anivarya hai."
      },
      hi: {
        ref: "भारतीय दंड संहिता धारा 302 / भारतीय न्याय संहिता धारा 103",
        title: "धारा 302: हत्या का दंड एवं कानूनी अधिकार",
        summary: [
          "दंड का प्रावधान: हत्या के दोषी पाए जाने पर आजीवन कारावास अथवा मृत्युदंड तथा जुर्माने का वैधानिक प्रावधान है।",
          "संज्ञेय एवं गैर-जमानती: यह संज्ञेय (Cognizable) और गैर-जमानती अपराध है जिसकी सुनवाई सत्र न्यायालय (Sessions Court) में होती है।",
          "निःशुल्क कानूनी सहायता (अनुच्छेद 39A): आर्थिक रूप से असमर्थ अभियुक्त को राज्य द्वारा निःशुल्क अधिवक्ता उपलब्ध कराया जाना संवैधानिक अधिकार है।"
        ],
        advice: "गिरफ्तारी के 24 घंटे के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश किया जाना अनुच्छेद 22(2) के तहत अनिवार्य है."
      },
      en: {
        ref: "Section 302 Indian Penal Code (IPC) / Section 103 Bharatiya Nyaya Sanhita (BNS)",
        title: "Section 302: Punishment for Murder & Legal Defense Protections",
        summary: [
          "Prescribed Punishment: Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.",
          "Classification: Cognizable, Non-Bailable, and exclusively triable by the Court of Session.",
          "Constitutional Defense (Article 39A): If the accused cannot afford counsel, the State must assign an advocate via the Legal Services Authority."
        ],
        advice: "Article 22 guarantees the fundamental right against detention beyond 24 hours without magistrate authorization."
      }
    },

    // Section 84 MSCS Act (Dispute Arbitration)
    mscs_sec_84: {
      hinglish: {
        ref: "Section 84, Multi-State Co-operative Societies Act, 2002",
        title: "Section 84: Cooperative Dispute Arbitration (Civil Court Barred)",
        summary: [
          "Civil Court Par Pratibandh: Cooperative society ke kisi bhi aapsi vivad (elections, constitution, accounts ya business) me civil court jane ki anumati nahi hai.",
          "Central Registrar ko Reference: Dispute seedhe Central Registrar ko file kiya jata hai, jo ek nishpaksh Arbitrator (madhyasth) appoint karte hain.",
          "Chunav Vivad ki Time Limit: Election se juda koi bhi vivad election result ghoshit hone ke 30 dino ke andar file karna anivarya hai.",
          "Arbitration Award: Arbitrator ka faisla Civil Court ke aadesh (decree) ke barabar kanoonan lagu hota hai."
        ],
        advice: "Bina statutory notice ke society me dispute file na karein; election matters me 30 din ki limitation period ka vishesh dhyan rakhein."
      },
      hi: {
        ref: "धारा 84, बहु-राज्य सहकारी सोसायटी अधिनियम, 2002",
        title: "धारा 84: विवादों का निपटारा एवं वैधानिक मध्यस्थता (दीवानी न्यायालय वर्जित)",
        summary: [
          "दीवानी न्यायालयों का क्षेत्राधिकार वर्जित: सहकारी समिति के गठन, प्रबंधन अथवा व्यापार संबंधी विवाद दीवानी न्यायालय नहीं ले जाए जा सकते।",
          "केंद्रीय पंजीयक को प्रेषण: समस्त विवाद केंद्रीय पंजीयक को संदर्भित किए जाते हैं जो एक मध्यस्थ (Arbitrator) नियुक्त करते हैं।",
          "चुनाव विवाद समय-सीमा: चुनाव संबंधी विवाद परिणाम घोषणा के 30 दिनों के भीतर दायर करना अनिवार्य है।",
          "पंचाट (Award) की बाध्यता: मध्यस्थ का निर्णय दीवानी न्यायालय की डिक्री के समान प्रवर्तनीय होता है।"
        ],
        advice: "चुनाव विवादों में 30 दिन की सीमा समाप्त होने से पूर्व वैधानिक मध्यस्थता याचिका प्रस्तुत करें।"
      },
      gu: {
        ref: "કલમ 84, મલ્ટી-સ્ટેટ કો-ઓપરેટિવ સોસાયટી એક્ટ, 2002",
        title: "કલમ 84: સહકારી વિવાદોનું લવાદ દ્વારા નિવારણ (સિવિલ કોર્ટ પર પ્રતિબંધ)",
        summary: [
          "સિવિલ કોર્ટ પર પ્રતિબંધ: મંડળીના સંચાલન કે ચૂંટણી વિવાદો સિવિલ કોર્ટમાં દાખલ કરી શકાતા નથી.",
          "રજિસ્ટ્રાર સમક્ષ અરજી: તમામ તકરારો સેન્ટ્રલ રજિસ્ટ્રાર સમક્ષ રજૂ કરવામાં આવે છે, જે લવાદ (Arbitrator) ની નિમણૂક કરે છે.",
          "ચૂંટણી વિવાદની મુદત: પરિણામ જાહેર થયાના 30 દિવસમાં ચૂંટણી વાંધા અરજી કરવી ફરજિયાત છે.",
          "ચુકાદો: લવાદનો હુકમ સિવિલ કોર્ટના હુકમનામા (ડિક્રી) જેટલો જ બંધનકર્તા હોય છે."
        ],
        advice: "ચૂંટણી તકરારમાં 30 દિવસની સમયમર્યાદા ચૂકી જશો નહીં."
      },
      en: {
        ref: "Section 84, Multi-State Co-operative Societies Act, 2002",
        title: "Section 84: Settlement of Cooperative Disputes by Statutory Arbitration",
        summary: [
          "Bar of Civil Court Jurisdiction: Section 84 strictly prohibits civil courts from entertaining disputes concerning cooperative constitution, elections, or management.",
          "Reference to Central Registrar: Parties must submit the dispute to the Central Registrar, who appoints an independent Arbitrator.",
          "Strict 30-Day Limitation for Elections: Any challenge to board elections must be filed within 30 days of declaration of results.",
          "Enforceability: The Arbitral award is legally executable as a decree of a Civil Court under CPC 1908."
        ],
        advice: "Do not waste time approaching civil courts; immediately file an arbitration petition under Section 84 with the Central Registrar."
      }
    },

    // Section 138 NI Act (Cheque Bounce)
    ni_sec_138: {
      hinglish: {
        ref: "Section 138, Negotiable Instruments (NI) Act, 1881",
        title: "Section 138: Cheque Bounce hone par Kanooni Notice aur Saza",
        summary: [
          "Aparadh aur Saza: Khate me paise na hone par cheque bounce hona criminal offense hai jisme 2 saal tak ki jail ya cheque amount ka doguna (2x) jurmana ho sakta hai.",
          "15 Din ka Statutory Notice: Bank se return memo milne ke 30 dino ke andar saamne wale ko vakil ke madhyam se 15 dino ka legal demand notice bhejna anivarya hai.",
          "Payment ka Samay: Notice milne ke baad drawer ko payment karne ke liye 15 dino ka statutory samay milta hai.",
          "Court Case Timeline: Agar 15 din me paise na milein, to agle 30 dino ke andar Judicial Magistrate Court me Section 138 ka case file karna padta hai."
        ],
        advice: "Dhyan rahe: Cheque bounce me sabse zaroori 30 din aur 15 din ki statutory notice deadline hoti hai; register post se hi notice bhejein."
      },
      hi: {
        ref: "धारा 138, परक्राम्य लिखत अधिनियम, 1881",
        title: "धारा 138: चेक बाउंस होने पर कानूनी कार्रवाई एवं दंड",
        summary: [
          "दंड का प्रावधान: बैंक खाते में अपर्याप्त राशि के कारण चेक अनादर (बाउंस) होना दाण्डिक अपराध है जिसमें 2 वर्ष तक का कारावास अथवा चेक राशि का दोगुना जुर्माना हो सकता है।",
          "15 दिवसीय वैधानिक नोटिस: बैंक मीमो मिलने के 30 दिनों के भीतर अधिवक्ता के माध्यम से 15 दिन का मांग नोटिस प्रेषित करना अनिवार्य है।",
          "भुगतान हेतु समय: नोटिस प्राप्ति के 15 दिनों के भीतर देनदार को भुगतान का अवसर प्राप्त होता है।",
          "न्यायालय में परिवाद: 15 दिन में भुगतान न होने पर अगले 30 दिनों के भीतर न्यायिक मजिस्ट्रेट के समक्ष परिवाद दाखिल करें।"
        ],
        advice: "नोटिस हमेशा रजिस्टर्ड डाक (RPAD) से भेजें ताकि डाक रसीद न्यायालय में साक्ष्य बन सके।"
      },
      en: {
        ref: "Section 138, Negotiable Instruments (NI) Act, 1881",
        title: "Section 138: Cheque Dishonour, Statutory Demand Notice & Criminal Penalties",
        summary: [
          "Criminal Offense & Penalties: Dishonour for insufficiency of funds attracts up to 2 years imprisonment or a fine up to twice the cheque value.",
          "15-Day Demand Notice: Within 30 days of receiving the bank memo, the payee must serve a formal 15-day statutory notice upon the drawer.",
          "Cure Period: The drawer is granted 15 clear days from notice delivery to settle payment.",
          "Limitation for Court Filing: If payment remains unpaid after 15 days, the complaint must be filed before the Judicial Magistrate within the next 30 days."
        ],
        advice: "Statutory deadlines under Section 138 are strict and non-extendable without substantial cause."
      }
    },

    // Section 154 CrPC (FIR Registration)
    crpc_154: {
      hinglish: {
        ref: "Section 154 CrPC / Section 173 Bharatiya Nagarik Suraksha Sanhita (BNSS)",
        title: "Section 154: FIR Darj Karwane ke Niyam aur Police Mana Kare to Upay",
        summary: [
          "Mandatory FIR: Cognizable offense (jaise chori, danga, hamla, fraud) me police ke liye FIR darj karna kanoonan anivarya hai (Supreme Court: Lalita Kumari Case).",
          "Zero FIR ka Adhikar: Agar ghatna kisi aur ilaqe ki ho, tab bhi nazdeeki thana FIR darj karne se mana nahi kar sakta; wo Zero FIR darj karke transfer karega.",
          "Police Mana Kare to Pehla Kadam (Sec 154(3)): Superintendent of Police (SP / DCP) ko written shikayat registered post se bhejein.",
          "Court ka Rasta (Sec 156(3)): SP ke action na lene par Magistrate ke samne 156(3) CrPC me application lagayein, court police ko FIR darj karne ka aadesh dega."
        ],
        advice: "FIR darj karwane ke turant baad informant ko FIR ki certified copy muft (free of cost) prapt karne ka kanooni adhikar hai."
      },
      hi: {
        ref: "धारा 154 दंड प्रक्रिया संहिता / धारा 173 भारतीय नागरिक सुरक्षा संहिता (BNSS)",
        title: "धारा 154: प्राथमिकी (FIR) दर्ज कराने के अधिकार एवं पुलिस इनकार पर कानूनी उपाय",
        summary: [
          "अनिवार्य प्राथमिकी: संज्ञेय अपराधों में पुलिस अधिकारी के लिए प्राथमिकी दर्ज करना वैधानिक रूप से अनिवार्य है (ललिता कुमारी निर्णय)।",
          "जीरो एफआईआर (Zero FIR): क्षेत्राधिकार न होने पर भी कोई भी थाना रिपोर्ट दर्ज करने से इनकार नहीं कर सकता; वे जीरो एफआईआर दर्ज कर संबंधित थाने भेजेंगे।",
          "पुलिस अधीक्षक को शिकायत (धारा 154(3)): थाना प्रभारी द्वारा इनकार पर पुलिस अधीक्षक (SP) को पंजीकृत डाक से लिखित शिकायत भेजें।",
          "मजिस्ट्रेट से आदेश (धारा 156(3)): पुलिस द्वारा कार्रवाई न किए जाने पर न्यायिक मजिस्ट्रेट के समक्ष धारा 156(3) में प्राथमिकी दर्ज कराने का आदेश प्राप्त करें।"
        ],
        advice: "प्राथमिकी दर्ज होते ही उसकी प्रतिलिपि निःशुल्क प्राप्त करना आपका विधिक अधिकार है।"
      },
      en: {
        ref: "Section 154 CrPC / Section 173 Bharatiya Nagarik Suraksha Sanhita (BNSS)",
        title: "Section 154: Mandatory FIR Lodging & Remedies Against Police Inaction",
        summary: [
          "Mandatory Registration: Police are legally bound to register an FIR for any cognizable offense without preliminary inquiry (Constitution Bench: Lalita Kumari v. Govt of UP).",
          "Zero FIR Guarantee: Can be registered at ANY police station regardless of territorial jurisdiction and transferred to the competent station.",
          "Superintendent Remedy (Section 154(3)): If the Station House Officer refuses, submit a written complaint to the Superintendent of Police (SP) by registered post.",
          "Judicial Magistrate Direction (Section 156(3)): If police still fail to act, file a formal complaint under Section 156(3) CrPC before the Magistrate, who will order an investigation."
        ],
        advice: "Every complainant is entitled to a certified copy of the FIR free of cost under Section 154(2)."
      }
    },

    // Cooperative Housing Society Maintenance & Transfer Fee
    housing_maintenance_dispute: {
      hinglish: {
        ref: "Model Housing Society Bylaws & Cooperative Societies Acts",
        title: "Housing Society Flat Maintenance, Transfer Fee (Max ₹25,000) & Parking Rules",
        summary: [
          "Transfer Fee Cap (Max ₹25,000): Sarkar ke statutory circular ke tehat koi bhi cooperative housing society flat transfer par ₹25,000 se zyada premium ya donation nahi maang sakti.",
          "Car Parking Sale Ban: Builder ya society stilt ya open parking ko alag se bech nahi sakte; parking society ki common property hoti hai.",
          "Maintenance Charges: Society service charge sabhi flats se barabar leti hai, jabki repair/sinking fund carpet area ke hisaab se liya jata hai.",
          "Shikayat Kahan Karein: Society ki manmaani ya NOC rokne par Deputy Registrar of Cooperative Societies ya Consumer Court me shikayat karein."
        ],
        advice: "Agar society ₹25,000 se zyada transfer fee mangti hai, to cheque par 'Under Protest' likhein aur Registrar ko Section 154/84 me complaint karein."
      },
      hi: {
        ref: "आदर्श आवास समिति उप-नियम एवं सहकारी सोसायटी अधिनियम",
        title: "हाउसिंग सोसायटी मेंटेनेंस, ट्रांसफर प्रीमियम (अधिकतम ₹25,000) एवं पार्किंग नियम",
        summary: [
          "ट्रांसफर शुल्क की सीमा: शासकीय परिपत्र के अनुसार कोई भी सहकारी गृह निर्माण समिति फ्लैट ट्रांसफर पर अधिकतम ₹25,000 से अधिक राशि या दान नहीं वसूल सकती।",
          "पार्किंग बिक्री पर रोक: बिल्डर अथवा सोसायटी खुली या स्टिल्ट पार्किंग का विक्रय नहीं कर सकते; यह समिति की साझी संपत्ति है।",
          "मेंटेनेंस निर्धारण: सेवा शुल्क सभी सदस्यों पर समान रूप से, जबकि सिंकिंग एवं रिपेयर फंड कारपेट एरिया अनुसार देय होता है।",
          "निवारण मंच: अनुचित मांग या एनओसी रोकने पर उप-पंजीयक (Deputy Registrar) अथवा उपभोक्ता फोरम में शिकायत दर्ज कराएं।"
        ],
        advice: "₹25,000 से अधिक ट्रांसफर शुल्क की मांग पूर्णतः अवैध एवं अनुचित व्यापार व्यवहार है।"
      },
      en: {
        ref: "Model Cooperative Housing Society Bylaws & State Statutory Circulars",
        title: "Housing Society Transfer Fee Cap (Max ₹25,000), Maintenance & Parking Rights",
        summary: [
          "Statutory Transfer Fee Cap: Government directives strictly restrict cooperative housing societies from demanding more than ₹25,000 as transfer premium or donation.",
          "Prohibition on Parking Sale: Stilt and open parking are common areas; neither developers nor managing committees can sell parking spaces (Nahalchand Laloochand Supreme Court ruling).",
          "Maintenance Principles: Service charges must be shared equally; capital repair/sinking funds are apportioned by carpet area.",
          "Grievance Redressal: Arbitrary withholding of NOC or extortionate transfer fees can be challenged before the Deputy Registrar or District Consumer Commission."
        ],
        advice: "Never pay unauthorized transfer fees in cash; any amount in excess of ₹25,000 can be ordered refunded with interest by the Cooperative Court."
      }
    },

    // 26. Birth Certificate Name Correction & Update (Section 15 RBD Act)
    birth_certificate_update: {
      hinglish: {
        ref: "Section 15, Registration of Births and Deaths (RBD) Act, 1969 & Municipal Rules",
        title: "Birth Certificate Me Name Correction / Change Kaise Karein",
        summary: [
          "Municipal Registrar ke Paas Aavedan: Apne local Nagar Nigam / Nagar Palika (shahron me) ya Gram Panchayat (gaon me) ke Registrar of Births and Deaths ke paas Form 10 bharein.",
          "₹100 Notarized Magistrate Affidavit: Executive Magistrate ya Notary dwara verified affidavit banwayen, jisme purana naam, sahi naya naam aur badlav ka kaaran likha ho.",
          "Supporting Identity Proofs: School leaving certificate, 10th marksheet, ya mata-pita ka Aadhaar card sath me attach karein.",
          "Official Gazette Notification (Rajpatra): Agar poora naam badalna hai ya surname badalna hai, to Central ya State Government Gazette me name change publication karwayen."
        ],
        advice: "Section 15 RBD Act ke tehat local Registrar ko record me entry theek karne ka statutory power hai; process aamtaur par 15 se 30 dino me complete ho jata hai."
      },
      hi: {
        ref: "धारा 15, जन्म और मृत्यु पंजीकरण अधिनियम, 1969 एवं नगर निगम उप-नियम",
        title: "जन्म प्रमाण पत्र में नाम सुधार एवं परिवर्तन की वैधानिक प्रक्रिया",
        summary: [
          "रजिस्ट्रार के समक्ष आवेदन: अपने स्थानीय नगर निगम/नगर पालिका अथवा ग्राम पंचायत के जन्म एवं मृत्यु रजिस्ट्रार कार्यालय में निर्धारित प्रपत्र 10 भरें।",
          "₹100 का नोटरी/मजिस्ट्रेट शपथ पत्र: कार्यपालक मजिस्ट्रेट अथवा नोटरी द्वारा प्रमाणित शपथ पत्र संलग्न करें जिसमें पुराना नाम, नया नाम व परिवर्तन का कारण दर्ज हो।",
          "साक्ष्य दस्तावेज: विद्यालय परित्याग प्रमाण पत्र (TC), 10वीं की अंकसूची, अथवा माता-पिता के आधार कार्ड की स्व-प्रमाणित प्रति संलग्न करें।",
          "शासकीय राजपत्र (Gazette) प्रकाशन: सम्पूर्ण नाम अथवा उपनाम (Surname) में परिवर्तन हेतु केंद्र अथवा राज्य सरकार के राजपत्र में विज्ञापन प्रकाशित कराना अनिवार्य है।"
        ],
        advice: "पंजीकरण अधिनियम की धारा 15 के तहत संबंधित रजिस्ट्रार को ही अभिलेखों में लिपिकीय त्रुटि सुधारने का विधिक अधिकार प्राप्त है।"
      },
      gu: {
        ref: "કલમ 15, જન્મ અને મરણ નોંધણી અધિનિયમ, 1969",
        title: "જન્મના દાખલામાં નામ સુધારવા કે બદલવાની કાનૂની પ્રક્રિયા",
        summary: [
          "નગરપાલિકા/પંચાયત રજિસ્ટ્રાર સમક્ષ અરજી: સ્થાનિક મહાનગરપાલિકા, નગરપાલિકા કે ગ્રામ પંચાયતના રજિસ્ટ્રાર (જન્મ-મરણ) સમક્ષ નિયત ફોર્મમાં અરજી કરો.",
          "₹100 ના સ્ટેમ્પ પર સોગંદનામું (Affidavit): એક્ઝિક્યુટિવ મેજિસ્ટ્રેટ કે નોટરી સમક્ષ જૂનું નામ, નવું નામ અને કારણ દર્શાવતું સોગંદનામું રજૂ કરો.",
          "શાળા છોડ્યાનું પ્રમાણપત્ર (LC): સ્કૂલ લિવિંગ સર્ટિફિકેટ કે માતા-પિતાના ઓળખપત્રોની નકલ જોડો.",
          "સરકારી ગેઝેટ (રાજપત્ર): સમગ્ર નામ કે અટક બદલવા માટે સરકારી ગેઝેટમાં પ્રસિદ્ધિ કરાવવી અનિવાર્ય છે."
        ],
        advice: "કલમ 15 મુજબ સ્થાનિક રજિસ્ટ્રાર પાસે નોંધણીમાં સુધારો કરવાની વૈધાનિક સત્તા છે."
      },
      en: {
        ref: "Section 15, Registration of Births and Deaths (RBD) Act, 1969 & Amendment 2023",
        title: "Birth Certificate Name Correction & Amendment Procedure",
        summary: [
          "Application to Municipal/Panchayat Registrar: Submit Form 10 to the local Registrar of Births and Deaths (Municipal Corporation in urban areas, Gram Panchayat in rural areas).",
          "Notarized Magistrate Affidavit: Execute a ₹100 non-judicial stamp affidavit verified before an Executive Magistrate/Notary affirming the original name, requested correction, and genuine grounds.",
          "Corroborative Proofs: Attach School Leaving Certificate (SLC), matriculation marksheet, or parents' verified identity documents.",
          "Official Gazette Notification: For comprehensive legal name alterations or surname changes, publication in the Central or State Official Gazette is mandatory."
        ],
        advice: "Under Section 15 of the RBD Act, the Registrar is the sole competent statutory officer to rectify clerical or formal entries in civil birth registers."
      }
    },

    // 27. Land, Property & Revenue Dispute Resolution
    land_revenue_dispute: {
      hinglish: {
        ref: "State Land Revenue Codes, Transfer of Property Act 1882 & Sec 145 CrPC",
        title: "Zameen / Property Dispute Kanooni Hal (Boundary, Dakhil-Kharij aur Kabza)",
        summary: [
          "Certified Land Records (7/12 & Khatauni): Sabse pehle Tehsil ke online portal (jaise Bhulekh/AnyRoR) se certified Record of Rights (ROR) aur Khasra Map nikalein.",
          "Demarcation / Simankan (Napi): Agar boundary ya medh ka vivad hai to Tehsildar ke paas Sarkari Surveyor/Amin se zameen ki formal napi (demarcation) ka aavedan karein.",
          "Mutation / Dakhil-Kharij Dispute: Mutation ke jhagde ke liye Nayab Tehsildar ya SDM (Sub-Divisional Magistrate) ki Revenue Court me objection darj karein.",
          "Stay Order (Injunction) & Kabza Rokna: Agar koi zabardasti kabza kar raha hai to Civil Court me Order 39 Rules 1-2 CPC ke tahat Stay Order lein, ya Section 145 CrPC ke tahat SDM ke samne complaint karein."
        ],
        advice: "Revenue matters (records & demarcation) Tehsildar/SDM dekhte hain jabki Malikana Haq (Title & Ownership) sirf Civil Court ke jurisdiction me aata hai. Muft kanooni salah ke liye DLSA (Helpline 15100) par sampark karein."
      },
      hi: {
        ref: "राज्य भू-राजस्व संहिता, संपत्ति अंतरण अधिनियम 1882 एवं धारा 145 CrPC",
        title: "भूमि एवं संपत्ति विवाद का विधिक समाधान (सीमांकन, दाखिल-खारिज एवं अवैध कब्जा)",
        summary: [
          "प्रमाणित भू-अभिलेख (खतौनी/7-12): सर्वप्रथम राजस्व पोर्टल (भूलेख) से अद्यतन खतौनी एवं प्रमाणित भू-नक्शा (शजरा) प्राप्त करें।",
          "सीमांकन (नापी): भूमि की सीमा या मेढ़ विवाद की स्थिति में तहसीलदार के समक्ष सरकारी अमीन द्वारा नापी हेतु सीमांकन वाद दायर करें।",
          "नामांतरण (दाखिल-खारिज) विवाद: विवादित नामांतरण की दशा में नायब तहसीलदार अथवा उप-जिलाधिकारी (SDM) की राजस्व अदालत में आपत्ति प्रस्तुत करें।",
          "स्थगनादेश (Stay Order) एवं बेदखली: जबरन कब्जे के विरुद्ध सिविल न्यायालय से आदेश 39 नियम 1-2 CPC के तहत स्थगनादेश प्राप्त करें, अथवा शांति भंग की आशंका पर धारा 145 CrPC के तहत कार्यपालक मजिस्ट्रेट से हस्तक्षेप मांगें।"
        ],
        advice: "भूमि के स्वामित्व (Title) का निर्धारण केवल सिविल न्यायालय द्वारा किया जाता है, जबकि अभिलेखीय व सीमांकन कार्य राजस्व न्यायालय के अधीन हैं।"
      },
      gu: {
        ref: "જમીન મહેસૂલ સંહિતા, ટ્રાન્સફર ઓફ પ્રોપર્ટી એક્ટ 1882 અને કલમ 145 CrPC",
        title: "જમીન અને મિલકત વિવાદ કાનૂની માર્ગદર્શિકા (હદ, વારસાઈ અને ગેરકાયદે કબ્જો)",
        summary: [
          "પ્રમાણિત જમીન રેકોર્ડ્સ (7/12 અને 8-અ): મહેસૂલ પોર્ટલ (AnyRoR) પરથી તાજેતરના પ્રમાણિત ઉતારા અને નકશો મેળવો.",
          "માપણી અરજી (Demarcation): સીમાડા કે હદ વિવાદ માટે મામલતદાર કચેરીમાં સરકારી સર્વેયર દ્વારા માપણીની અરજી કરો.",
          "કાચી નોંધ વાંધા (Mutation): હક્ક પત્રકમાં ખોટી નોંધ સામે નાયબ કલેક્ટર/પ્રાંત અધિકારી સમક્ષ આર.ટી.એસ. (RTS) અપીલ દાખલ કરો.",
          "સ્ટે ઓર્ડર (સ્ટેટસ ક્વો): ગેરકાયદે કબ્જો રોકવા સિવિલ કોર્ટમાંથી મનાઈ હુકમ (Injunction) મેળવો અથવા કલમ 145 CrPC હેઠળ શાંતિ જાળવવા એક્ઝિક્યુટિવ મેજિસ્ટ્રેટ સમક્ષ રજૂઆત કરો."
        ],
        advice: "માલિકી હક્કના દાવા માટે સિવિલ કોર્ટ અને જમીન રેકોર્ડ્સ માટે મહેસૂલ અદાલતનો સંપર્ક કરો."
      },
      en: {
        ref: "State Land Revenue Codes, Transfer of Property Act 1882 & Sec 145 CrPC (Sec 107 BNSS)",
        title: "Land & Property Dispute Legal Resolution Guide (Boundary, Title & Possession)",
        summary: [
          "Certified Record of Rights (Khatauni / 7/12): Extract authentic land records and village cadastral maps (Shajra) from the state revenue portal.",
          "Official Demarcation (Boundary Measurement): In cases of boundary encroachment, file an application before the Tehsildar for survey and demarcation by a government Revenue Inspector.",
          "Mutation Disputes (Dakhil-Kharij): Contest erroneous or fraudulent mutation entries through RTS appeals before the Sub-Divisional Magistrate (SDM) / Revenue Court.",
          "Interim Injunction (Stay Order) & Section 145 CrPC: Prevent unlawful dispossession by seeking an ad-interim injunction under Order 39 Rules 1-2 CPC from the Civil Court, or approach the Executive Magistrate under Section 145 CrPC to preserve status-quo against breach of peace."
        ],
        advice: "Revenue courts (Tehsildar/SDM) handle administrative land records and demarcation, whereas exclusive title, ownership declarations, and partition suits lie solely with Civil Courts."
      }
    }
  },

  /**
   * Dynamic Synthesizer for Any Unmapped Section Number
   */
  synthesizeSectionResponse(sectionNum, lang) {
    const num = String(sectionNum).replace(/[^0-9a-z]/gi, "");
    
    if (lang === "hi" || lang === "hinglish") {
      return {
        ref: `बहु-राज्य सहकारी सोसायटी अधिनियम / भारतीय कानूनी संहिता · धारा ${num}`,
        title: `धारा ${num}: कानूनी प्रावधान, अधिकार एवं वैधानिक प्रक्रिया`,
        summary: [
          `धारा ${num} के तहत सांविधिक अधिकार एवं दायित्व: भारतीय सहकारी एवं सामान्य विधि के अंतर्गत धारा ${num} प्रशासनिक प्रक्रिया एवं निष्पक्ष सुनवाई सुनिश्चित करती है।`,
          `प्रक्रियात्मक सुरक्षा: किसी भी सदस्य अथवा नागरिक पर धारा ${num} के अंतर्गत आदेश पारित करने से पूर्व प्राकृतिक न्याय (Natural Justice) के तहत नोटिस देना आवश्यक है।`,
          `विधिक मंच: यदि धारा ${num} के अनुपालन अथवा उल्लंघन से संबंधित कोई विवाद उत्पन्न होता है, तो सहकारी पंचाट अथवा उच्च न्यायालय (अनुच्छेद 226) में समीक्षा याचिका दायर की जा सकती है।`,
          `निःशुल्क कानूनी सहायता: धारा 39A के अंतर्गत जिला विधिक सेवा प्राधिकरण (DLSA हेल्पलाइन: 15100) से इस धारा पर विशेषज्ञ परामर्श प्राप्त किया जा सकता है।`
        ],
        advice: `धारा ${num} के सटीक प्रावधानों के लिए अपनी पंजीकृत समिति की उप-विधियों अथवा अधिकृत कानूनी सलाहकार से संपर्क करें।`
      };
    }

    if (lang === "gu") {
      return {
        ref: `સહકારી મંડળી અધિનિયમ / ભારતીય કાયદાકીય જોગવાઈ · કલમ ${num}`,
        title: `કલમ ${num}: કાનૂની જોગવાઈ, અધિકારો અને પ્રક્રિયાત્મક માર્ગદર્શન`,
        summary: [
          `કલમ ${num} ની કાનૂની જોગવાઈ: ભારતીય સહકારી તથા નાગરિક કાયદા હેઠળ કલમ ${num} વહીવટી પારદર્શિતા અને સભ્યોના અધિકારોનું રક્ષણ કરે છે.`,
          `સુનાવણીનો અધિકાર: કલમ ${num} હેઠળ કોઈપણ નિર્ણય લેતા પહેલાં સંબંધિત પક્ષકારને પોતાની રજૂઆત કરવાનો પૂર્ણ અધિકાર મળે છે.`,
          `કાનૂની ઉપાય: આ કલમ હેઠળ કોઈપણ અન્યાય સામે રજિસ્ટ્રાર અથવા સહકારી અદાલતમાં પડકારી શકાય છે.`,
          `મફત કાનૂની સલાહ: કલમ 39A હેઠળ DLSA હેલ્પલાઇન 15100 પરથી મફત માર્ગદર્શન મેળવી શકાય છે.`
        ],
        advice: `કલમ ${num} બાબતે વિશેષ વિવાદ માટે તમારી મંડળીના પેટા-નિયમો ચકાસો.`
      };
    }

    return {
      ref: `Multi-State Co-operative Societies Act / Indian Statutory Code · Section ${num}`,
      title: `Section ${num}: Statutory Provisions, Member Protections & Legal Procedure`,
      summary: [
        `Statutory Scope of Section ${num}: Operates within the legislative framework governing administrative compliance, member governance, and organizational accountability.`,
        `Principles of Natural Justice: Action initiated under Section ${num} requires formal notice and reasonable opportunity of being heard before any penal or corrective order.`,
        `Appellate & Review Remedies: Aggrieved parties can seek judicial review or arbitration under Section 84 of the MSCS Act or writ jurisdiction under Article 226 of the Constitution.`,
        `Legal Aid Access: Under Article 39A, indigent citizens and cooperative members are entitled to free advisory support from District Legal Services Authorities (Helpline 15100).`
      ],
      advice: `Examine the registered bye-laws of your society or consult your local Cooperative Registrar for specific circulars regarding Section ${num}.`
    };
  },

  /**
   * Dynamic Synthesizer for Any Unmapped Constitutional Article Number
   */
  synthesizeArticleResponse(articleNum, lang) {
    const num = parseInt(articleNum, 10);
    let partName = "Constitution of India";
    if (num >= 1 && num <= 4) partName = "Part I - The Union and its Territory";
    else if (num >= 5 && num <= 11) partName = "Part II - Citizenship";
    else if (num >= 12 && num <= 35) partName = "Part III - Fundamental Rights";
    else if (num >= 36 && num <= 51) partName = "Part IV - Directive Principles of State Policy";
    else if (num === 51) partName = "Part IVA - Fundamental Duties";
    else if (num >= 52 && num <= 151) partName = "Part V - The Union (President, Parliament & Supreme Court)";
    else if (num >= 152 && num <= 237) partName = "Part VI - The States & High Courts";
    else if (num >= 243 && num <= 244) partName = "Part IXB - The Co-operative Societies";
    else if (num >= 352 && num <= 360) partName = "Part XVIII - Emergency Provisions";
    else if (num === 368) partName = "Part XX - Amendment of the Constitution";

    if (lang === "hi" || lang === "hinglish") {
      return {
        ref: `भारत का संविधान · ${partName} · अनुच्छेद ${articleNum}`,
        title: `अनुच्छेद ${articleNum}: संवैधानिक अधिदेश एवं नागरिक अधिकार`,
        summary: [
          `संवैधानिक अवस्थिति: अनुच्छेद ${articleNum} भारत के संविधान के '${partName}' के अंतर्गत प्रतिष्ठापित है।`,
          `संवैधानिक महत्व: यह अनुच्छेद राज्य की विधायी व कार्यकारी शक्तियों पर सीमाएं निर्धारित करता है तथा लोकतांत्रिक सिद्धांतों की रक्षा करता है।`,
          `संवैधानिक उपचार: यदि राज्य का कोई भी कानून अथवा आदेश इस अनुच्छेद की भावना का उल्लंघन करता है, तो नागरिक सीधे उच्च न्यायालय (अनुच्छेद 226) अथवा सर्वोच्च न्यायालय (अनुच्छेद 32) में रिट याचिका दायर कर सकते हैं।`,
          `विधिक सहायता: संविधान के अनुच्छेद 39A के तहत प्रत्येक नागरिक को न्याय तक समान पहुंच एवं निःशुल्क विधिक सेवा प्राप्त करने का मूल अधिकार है।`
        ],
        advice: `अनुच्छेद ${articleNum} से जुड़े किसी भी संवैधानिक प्रश्न के लिए राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA) पोर्टल का उपयोग करें।`
      };
    }

    return {
      ref: `Constitution of India · ${partName} · Article ${articleNum}`,
      title: `Article ${articleNum}: Constitutional Mandate & Legal Framework`,
      summary: [
        `Constitutional Placement: Article ${articleNum} is codified within '${partName}' of the Constitution of India.`,
        `Substantive Principles: Governs statutory authority, institutional checks and balances, and democratic safeguards within the sovereign republic.`,
        `Judicial Review & Enforceability: Actions violating constitutional mandates under Article ${articleNum} are amenable to judicial review by High Courts (Article 226) and the Supreme Court (Article 32).`,
        `Citizen Access: Constitutional protections are backed by the Directive of Equal Justice and Free Legal Aid under Article 39A.`
      ],
      advice: `To challenge administrative actions violating constitutional rights under Article ${articleNum}, file a writ petition under Article 226 before the High Court.`
    };
  },

  /**
   * Conversational Greetings Response
   */
  getGreetingResponse(lang) {
    if (lang === "hi" || lang === "hinglish") {
      return {
        ref: "NyayaMitra AI - Cooperative & Constitutional Legal Assistant",
        title: "नमस्ते! न्यायमित्र AI में आपका स्वागत है 🙏",
        summary: [
          "मैं आपका बहुभाषी कानूनी व सहकारी सहायता चैटबॉट हूँ।",
          "आप मुझसे संविधान के 6 मौलिक अधिकार, किसान क्रेडिट कार्ड (KCC), धारा 38 (मताधिकार), धारा 84 (विवाद व मध्यस्थता), आधार कार्ड सुधार, या किसी भी कानूनी धारा के बारे में पूछ सकते हैं!",
          "नीचे दिए गए किसी भी सुझाव पर क्लिक करें या सीधे अपना प्रश्न टाइप करें:"
        ],
        isGreeting: true
      };
    }
    if (lang === "gu" || lang === "gujlish") {
      return {
        ref: "NyayaMitra AI - સહકારી અને બંધારણીય કાનૂની સહાયક",
        title: "નમસ્તે! ન્યાયમિત્ર AI માં આપનું સ્વાગત છે 🙏",
        summary: [
          "હું તમારો બહુભાષી સહકારી અને કાનૂની માર્ગદર્શક છું.",
          "તમે મને બંધારણના 6 મૂળભૂત અધિકારો, કિસાન ક્રેડિટ કાર્ડ (KCC), કલમ 38 (મતાધિકાર), કલમ 84 (વિવાદ નિવારણ), આધાર સુધારણા કે અન્ય કલમો વિશે પૂછી શકો છો.",
          "નીચે આપેલા સૂચનોમાંથી પસંદ કરો અથવા તમારો પ્રશ્ન લખો:"
        ],
        isGreeting: true
      };
    }

    return {
      ref: "NyayaMitra AI - Cooperative & Constitutional Legal Assistant",
      title: "Hello! Welcome to NyayaMitra AI 🙏",
      summary: [
        "I am your official assistant for the Constitution of India, Cooperative Governance, and Citizen Legal Rights.",
        "You can ask me about the 6 Fundamental Rights, Kisan Credit Cards, Section 38 (Voting Rights), Section 84 (Dispute Arbitration), or Aadhaar name updates!",
        "Click on any quick prompt below or type your question:"
      ],
      isGreeting: true
    };
  }
};
