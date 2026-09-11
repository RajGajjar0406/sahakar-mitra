/**
 * SIH 2026 - Multilingual Cooperative Governance & Legal Assistance Chatbot
 * Document Processor & Constitutional Compliance Audit Engine
 * Evaluates uploaded bylaws, notices, and agreements against Part IXB and cooperative statutes.
 */

const DOCUMENT_PROCESSOR = {
  // Preloaded sample documents for effortless hackathon demonstration
  sampleDocuments: [
    {
      id: "compliant_bylaws",
      name: "Model Agricultural Cooperative (PACS) Bye-Laws",
      type: "Bylaws",
      text: `
MODEL BYE-LAWS OF KISAN VIKAS PRIMARY AGRICULTURAL COOPERATIVE SOCIETY

1. NAME AND AREA OF OPERATION:
The society shall be called Kisan Vikas Primary Agricultural Cooperative Society Limited. Area of operation extends across 12 contiguous villages in the district.

2. OBJECTIVES:
To provide short-term and medium-term agricultural credit to farmer members, distribute subsidized fertilizers, seeds, and farm implements, and establish warehousing for agricultural produce.

3. BOARD COMPOSITION AND RESERVATIONS (ARTICLE 243ZJ):
The Managing Committee / Board shall consist of 15 elected directors for a term of 5 years.
Out of these 15 seats:
- Two seats shall be strictly reserved for women members.
- One seat shall be strictly reserved for members belonging to Scheduled Castes (SC) or Scheduled Tribes (ST).

4. RIGHT TO INFORMATION OF MEMBERS (ARTICLE 243ZO):
Every active member shall have the right to inspect the register of members, audited annual balance sheet, profit and loss statement, and general body minutes upon written requisition within 30 days.

5. ANNUAL GENERAL MEETING (ARTICLE 243ZN):
The Annual General Meeting (AGM) of the general body shall be convened within six months of the close of each financial year (on or before September 30th).

6. AUDIT OF ACCOUNTS (ARTICLE 243ZM):
The accounts of the society shall be audited annually by a qualified Chartered Accountant from the approved government panel within six months from the end of the financial year.

7. DISPUTE RESOLUTION AND ARBITRATION (SECTION 84 MSCS ACT):
Any dispute touching the constitution, management, elections, or financial transactions of the society shall be referred to statutory Arbitration under Section 84 of the Multi-State Co-operative Societies Act / State Cooperative Societies Act. The jurisdiction of regular civil courts is barred.

8. DEMOCRATIC VOTING (SECTION 38):
Every member shall exercise one vote only. Voting by proxy is prohibited.
      `
    },
    {
      id: "defective_bylaws",
      name: "Defective Society Bylaws (With Constitutional Violations)",
      type: "Defective Bylaws",
      text: `
INTERNAL BYELAWS OF PROGRESSIVE RESIDENTS WELFARE COOPERATIVE SOCIETY

1. MANAGEMENT:
The society shall be managed by a self-appointed Executive Committee of 7 founding members indefinitely.

2. BOARD TENURE:
The committee members shall remain in office for 10 years without requiring general body re-election.

3. WOMEN AND SOCIAL QUOTA:
There is no reservation for women or SC/ST members on the governing board.

4. AUDIT:
Accounts will be audited at the discretion of the Treasurer once every 3 years by internal staff.

5. RESTRICTION ON INFORMATION:
Members are strictly forbidden from demanding copies of society bank accounts or expenditure records.

6. DISPUTE:
All disputes will be settled by the President whose decision is final. Members may not approach the Registrar or any court.
      `
    },
    {
      id: "loan_notice",
      name: "PACS Crop Loan Demand & Default Notice",
      type: "Legal Notice",
      text: `
DEMAND NOTICE - SHREE GANESH COOPERATIVE CREDIT SOCIETY

To: Member Shri Ramesh Patel (Member No. 412)
Subject: Outstanding Seasonal Crop Loan Recovery for Kharif Season

Dear Member,
According to our records, an outstanding crop credit of Rs. 85,000 availed under the Kisan Credit Card (KCC) scheme matured on 31st March. 
As per Government Interest Subvention Scheme guidelines, prompt repayment entitles you to a 3% interest rebate, making your net effective interest rate only 4% per annum.
Failure to clear the dues within 30 days will forfeit your subvention benefit, and the matter will be referred to the Cooperative Registrar for arbitration and recovery certificate under Section 84.
You are invited to meet the Secretary on working days to discuss loan restructuring or repayment schedule.
      `
    }
  ],

  /**
   * Evaluates text against the 6 Constitutional & Statutory Pillars
   */
  auditDocument(text) {
    const cleanText = text.toLowerCase();

    const rules = [
      {
        id: "women_reservation",
        title: "Women Reservation on Board (Article 243ZJ)",
        requirement: "Mandatory reservation of at least 2 seats for women on the board.",
        test: /(two|2)\s*(seats?|directors?|members?)?\s*(reserved\s*for\s*women|women|mahila)/i.test(cleanText),
        penaltyIfMissing: "High Risk: Board constitution is unconstitutional and open to disqualification by Registrar.",
        recommendation: "Amend Bylaws to include: 'At least two seats on the Board of Directors shall be reserved for women members.'"
      },
      {
        id: "sc_st_reservation",
        title: "SC / ST Representation on Board (Article 243ZJ)",
        requirement: "Mandatory reservation of at least 1 seat for SC or ST members.",
        test: /(one|1)\s*(seat|director)?\s*(reserved\s*for|for)?\s*(sc|st|scheduled\s*caste|scheduled\s*tribe)/i.test(cleanText),
        penaltyIfMissing: "High Risk: Violates Article 243ZJ; elections can be set aside.",
        recommendation: "Amend Bylaws to insert: 'One seat on the Board shall be reserved for Scheduled Castes or Scheduled Tribes.'"
      },
      {
        id: "annual_audit",
        title: "Mandatory Annual Audit within 6 Months (Article 243ZM)",
        requirement: "Audit by qualified CA/auditors within 6 months of financial year close.",
        test: /(audit|chartered\s*accountant|ca|accounts).*(six|6)\s*months/i.test(cleanText) ||
              /(six|6)\s*months.*(audit|ca)/i.test(cleanText),
        penaltyIfMissing: "Critical Risk: Failure to audit results in surcharge proceedings and administrator appointment.",
        recommendation: "Insert clause: 'Accounts shall be audited annually by an approved Chartered Accountant within 6 months of financial year close.'"
      },
      {
        id: "agm_timeline",
        title: "Annual General Meeting (AGM) within 6 Months (Article 243ZN)",
        requirement: "AGM must be convened on or before September 30th (within 6 months).",
        test: /(annual\s*general\s*meeting|agm|general\s*body).*(six|6)\s*months/i.test(cleanText) ||
              /(conven|held|meet).*(agm|annual\s*general\s*meeting)/i.test(cleanText),
        penaltyIfMissing: "Medium Risk: Board members face statutory disqualification for failure to convene AGM.",
        recommendation: "Mandate AGM timeline: 'The AGM shall be convened within 6 months from the end of the financial year.'"
      },
      {
        id: "member_rti",
        title: "Right of Member to Information (Article 243ZO)",
        requirement: "Members must have access to inspected books, voter list, and audited balance sheets.",
        test: /(right\s*to\s*information|inspect|information|balance\s*sheet|records|accounts\s*copy)/i.test(cleanText) &&
              !/(forbidden|prohibited\s*from\s*demanding)/i.test(cleanText),
        penaltyIfMissing: "High Risk: Member can file grievance before the Cooperative Ombudsman under Section 106.",
        recommendation: "Insert: 'Every member has the constitutional right to inspect bylaws, audited balance sheets, and member registers.'"
      },
      {
        id: "arbitration_dispute",
        title: "Statutory Dispute Arbitration (MSCS Section 84)",
        requirement: "Disputes referred to statutory arbitration with civil court jurisdiction barred.",
        test: /(arbitrat|section\s*84|dispute\s*resolution|tribunal)/i.test(cleanText),
        penaltyIfMissing: "Medium Risk: Lack of dispute mechanism leads to procedural rejection in civil suits.",
        recommendation: "Insert arbitration clause: 'All disputes touching management shall be referred to Arbitration under Section 84.'"
      },
      {
        id: "democratic_voting",
        title: "Democratic Voting Rights (Section 38 MSCS Act)",
        requirement: "One member one vote; prohibition of proxy voting.",
        test: /(one\s*vote|one\s*member|proxy.*prohibited|no\s*proxy)/i.test(cleanText),
        penaltyIfMissing: "Medium Risk: Risk of elite capture through proxy votes.",
        recommendation: "Specify: 'Each member shall possess one single vote, and proxy voting is strictly disallowed.'"
      }
    ];

    let passedCount = 0;
    const details = rules.map(rule => {
      const passed = rule.test;
      if (passed) passedCount++;
      return {
        ...rule,
        passed
      };
    });

    const scorePercentage = Math.round((passedCount / rules.length) * 100);

    return {
      score: scorePercentage,
      passedCount,
      totalRules: rules.length,
      isCompliant: scorePercentage >= 75,
      details
    };
  },

  /**
   * Search uploaded document for answering specific questions
   */
  queryDocument(documentText, question) {
    const cleanDoc = documentText.toLowerCase();
    const cleanQ = question.toLowerCase();

    // Extract sentences or paragraphs
    const paragraphs = documentText.split(/\n\s*\n|\r\n\s*\r\n/);
    const keywords = cleanQ.split(/\s+/).filter(w => w.length > 3);

    let bestParagraph = "";
    let highestScore = 0;

    for (const p of paragraphs) {
      const pLower = p.toLowerCase();
      let matchCount = 0;
      for (const kw of keywords) {
        if (pLower.includes(kw)) matchCount++;
      }
      if (matchCount > highestScore) {
        highestScore = matchCount;
        bestParagraph = p.trim();
      }
    }

    if (highestScore > 0) {
      return {
        found: true,
        answer: bestParagraph,
        confidence: "High (Matched from Document Clauses)"
      };
    }

    return {
      found: false,
      answer: "No specific clause directly matched your inquiry in the uploaded document. Please check if the document contains this topic or see the constitutional guidelines above.",
      confidence: "Low"
    };
  }
};
