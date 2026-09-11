/**
 * SIH 2026 - NyayaMitra AI
 * Comprehensive Constitution of India & Legal Database
 * Covers: 6 Fundamental Rights, Preamble, Duties, Part IXB Cooperatives,
 *         MSCS Act (Sec 7, 38, 41, 70, 84, 106), KCC Farmer Rights, Civic Services, Criminal Law (IPC/BNS)
 */

const LEGAL_DATABASE = {
  // 1. The 6 Fundamental Rights of Indian Citizens (Part III, Articles 12-35)
  fundamentalRights: [
    {
      id: "fundamental_6_rights",
      category: "Fundamental Rights (Part III)",
      article: "Articles 12 to 35, Part III of the Constitution of India",
      part: "Part III",
      title: "The 6 Basic Fundamental Rights of Indian Citizens",
      shortSummary: "The Constitution guarantees 6 basic Fundamental Rights to every citizen: 1. Right to Equality (Art 14-18), 2. Right to Freedom (Art 19-22), 3. Right against Exploitation (Art 23-24), 4. Right to Freedom of Religion (Art 25-28), 5. Cultural & Educational Rights (Art 29-30), and 6. Right to Constitutional Remedies (Art 32).",
      deepDive: `
### The 6 Fundamental Rights of Every Indian Citizen
Originally 7 rights existed; the Right to Property (Art 31) was omitted by the 44th Amendment in 1978, leaving 6 core rights:

1. **Right to Equality (Articles 14–18)**:
   - Article 14: Equality before law and equal protection of laws.
   - Article 15: Prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.
   - Article 16: Equality of opportunity in public employment.
   - Article 17: Abolition of untouchability.

2. **Right to Freedom (Articles 19–22)**:
   - Article 19: Protection of 6 freedoms (Speech, Assembly, Association & Co-operative Societies under Art 19(1)(c), Movement, Residence, Profession).
   - Article 21: Protection of life and personal liberty (Right to privacy, dignity, and livelihood).
   - Article 21A: Right to free & compulsory elementary education for children aged 6–14.
   - Article 22: Protection against arbitrary arrest and detention.

3. **Right against Exploitation (Articles 23–24)**:
   - Article 23: Prohibition of human trafficking and forced labor (begar).
   - Article 24: Prohibition of child labor below 14 years in factories.

4. **Right to Freedom of Religion (Articles 25–28)**:
   - Freedom of conscience, profession, practice, and propagation of religion.

5. **Cultural and Educational Rights (Articles 29–30)**:
   - Protection of language, script, and culture of minorities.

6. **Right to Constitutional Remedies (Article 32)**:
   - The 'Heart and Soul of the Constitution' (Dr. Ambedkar) — direct right to approach the Supreme Court via the 5 Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto) whenever rights are violated.
      `,
      keywords: [
        "basic 6 rights", "6 rights", "six rights", "fundamental rights", "citizen rights", 
        "rights of a local citizen", "rights of citizen", "maulik adhikar", "che adhikar", 
        "6 maulik adhikar", "rights of indian citizen", "basic rights"
      ],
      visualType: "rightsHierarchy"
    },
    {
      id: "art_14_equality",
      category: "Fundamental Rights",
      article: "Article 14",
      part: "Part III",
      title: "Right to Equality before Law & Equal Protection",
      shortSummary: "The State shall not deny to any person equality before the law or the equal protection of the laws within India. Prohibits arbitrary discrimination.",
      deepDive: `
### Article 14 - Principle of Equality
- **Equality before Law**: No person is above the law.
- **Equal Protection of Laws**: Like should be treated alike without arbitrary state discrimination.
      `,
      keywords: ["article 14", "art 14", "equality before law", "samanta ka adhikar", "equal protection"]
    },
    {
      id: "art_21_life",
      category: "Fundamental Rights",
      article: "Article 21",
      part: "Part III",
      title: "Protection of Life, Personal Liberty, Privacy & Livelihood",
      shortSummary: "No person shall be deprived of his life or personal liberty except according to procedure established by law. Expansively includes right to privacy, dignity, and livelihood.",
      deepDive: `
### Article 21 - The Anchor of Constitutional Liberty
- Includes Right to Privacy (*K.S. Puttaswamy v. Union of India, 2017*), Right to Livelihood (*Olga Tellis*), and Right to Free Legal Aid (*Hussainara Khatoon*).
      `,
      keywords: ["article 21", "art 21", "right to life", "personal liberty", "right to privacy", "jeevan ka adhikar", "livelihood right"]
    },
    {
      id: "art_32_writs",
      category: "Fundamental Rights",
      article: "Article 32 & Article 226",
      part: "Part III & Part VI",
      title: "Right to Constitutional Remedies & The 5 Writs",
      shortSummary: "Direct access to Supreme Court (Art 32) and High Courts (Art 226) via 5 Prerogative Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.",
      deepDive: `
### The 5 Constitutional Writs
1. **Habeas Corpus**: Production of illegally detained persons.
2. **Mandamus**: Compelling public authority to perform a mandatory duty.
3. **Prohibition**: Halting lower courts from exceeding jurisdiction.
4. **Certiorari**: Quashing illegal administrative or judicial orders.
5. **Quo Warranto**: Challenging unlawful holding of a public office.
      `,
      keywords: ["article 32", "art 32", "art 226", "writs", "habeas corpus", "mandamus", "certiorari", "quo warranto"]
    },
    {
      id: "art_19_1_c",
      category: "Fundamental Rights",
      article: "Article 19(1)(c)",
      part: "Part III",
      title: "Right to Form Associations, Unions, or Co-operative Societies",
      amendment: "97th Constitutional Amendment Act, 2011",
      shortSummary: "Every Indian citizen has the fundamental right to form co-operative societies subject only to reasonable restrictions in the interest of sovereignty, integrity, or public order.",
      deepDive: `
### Article 19(1)(c) - Fundamental Right to Form Cooperatives
- Inserted by the 97th Constitutional Amendment (2011).
- Protects voluntary cooperative formation from arbitrary government bans.
      `,
      keywords: ["form cooperative", "art 19", "article 19", "start society", "right to create society", "sahakari samiti banavani"],
      visualType: "registrationFlow"
    }
  ],

  // 2. Preamble & Fundamental Duties
  constitutionalFramework: [
    {
      id: "preamble_india",
      category: "Constitutional Framework",
      article: "Preamble to the Constitution of India",
      part: "Preamble",
      title: "The Preamble to the Constitution of India",
      shortSummary: "Declares India as a Sovereign, Socialist, Secular, Democratic Republic, securing Justice, Liberty, Equality, and Fraternity for all citizens.",
      deepDive: `
### The Preamble of India
- Text: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, LIBERTY, EQUALITY, and FRATERNITY..."
- Amended once by the 42nd Amendment (1976) adding 'Socialist', 'Secular', and 'Integrity'.
      `,
      keywords: ["preamble", "prastavana", "sovereign socialist secular", "we the people of india"]
    },
    {
      id: "fundamental_duties",
      category: "Fundamental Duties (Part IVA)",
      article: "Article 51A, Part IVA of the Constitution of India",
      part: "Part IVA",
      title: "The 11 Fundamental Duties of Every Indian Citizen",
      shortSummary: "Article 51A prescribes 11 moral duties: respecting National Flag & Anthem, protecting the environment, developing scientific temper, and safeguarding public property.",
      deepDive: `
### Article 51A - Fundamental Duties
- Added by the 42nd Amendment (1976); 11th duty added by 86th Amendment (2002).
- Citizens must abide by constitutional ideals, promote harmony, renounce practices derogatory to women, and protect wildlife/forests.
      `,
      keywords: ["fundamental duties", "article 51a", "art 51a", "kartavya", "11 duties", "nagrik kartavya"]
    }
  ],

  // 3. Multi-State Co-operative Societies (MSCS) Act 2002 & Amendments
  statutes: [
    {
      id: "mscs_sec_38",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 38",
      title: "Voting Rights of Members (One Member, One Vote; No Proxy)",
      shortSummary: "Every member of a multi-state cooperative society has exactly one vote, regardless of shareholding. Proxy voting is strictly prohibited to guarantee democratic equality.",
      deepDive: `
### Section 38, MSCS Act - Democratic Voting Rights
- **One Member, One Vote**: Regardless of whether a member holds 1 share or 1,000 shares, they have strictly one single vote.
- **Prohibition of Proxy Voting**: Members must vote in person. Proxies are disallowed to prevent wealthy cartels from hijacking society decisions.
- **Casting Vote**: The Chairperson has a second or casting vote only in the event of an equality of votes.
- **Voting Disqualification**: A member who defaults on dues or fails to use minimum society services may be disqualified from voting as per bylaws.
      `,
      keywords: ["section 38", "sec 38", "voting rights", "one member one vote", "proxy vote", "proxy prohibited", "member vote"]
    },
    {
      id: "mscs_sec_84",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 84",
      title: "Reference of Disputes to Arbitration (Civil Courts Barred)",
      shortSummary: "Any dispute concerning cooperative society constitution, elections, or business must be referred to statutory Arbitration. Civil courts are barred from jurisdiction.",
      deepDive: `
### Section 84, MSCS Act - Statutory Arbitration & Dispute Settlement
- **Bar on Civil Courts**: Civil courts have no jurisdiction to try cooperative management or business disputes.
- **Arbitration Reference**: File dispute before the Central Registrar, who refers it to an appointed Arbitrator.
- **Limitation Period**: Election disputes must be filed within **30 days** of results; pecuniary claims within **3 years**.
- **Award**: Enforceable as a decree of a Civil Court.
      `,
      keywords: ["section 84", "sec 84", "dispute", "arbitration", "mscs act", "jhagda", "cooperative dispute", "dispute resolution"],
      visualType: "disputeEscalationFlow"
    },
    {
      id: "mscs_sec_7",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 7",
      title: "Registration of Multi-State Cooperative Society",
      shortSummary: "Application signed by at least 50 persons from each participating state (min 2 states) with model bylaws submitted to the Central Registrar.",
      deepDive: `
### Section 7 - Registration Process
- 4-Step Process: Promoter Meeting -> Share Capital Escrow -> Form 1 Submission -> Registration Certificate.
      `,
      keywords: ["section 7", "sec 7", "registration", "how to register", "form society", "society registration"],
      visualType: "registrationFlow"
    },
    {
      id: "mscs_sec_41",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 41",
      title: "Disqualifications for Being a Member of Board",
      shortSummary: "Disqualifies persons who default on society loans, hold office of profit, have been convicted of offences involving moral turpitude, or failed to conduct AGM/audits.",
      deepDive: `
### Section 41 - Board Member Disqualifications
- Defaulter on loans from the society for more than 12 months.
- Holds any office of profit or contracts with the society.
- Convicted of any offence with imprisonment of 6 months or more.
      `,
      keywords: ["section 41", "sec 41", "disqualification", "board disqualification", "board member disqualified"]
    },
    {
      id: "mscs_sec_70",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 70",
      title: "Audit of Multi-State Co-operative Societies",
      shortSummary: "Mandatory annual audit by qualified Chartered Accountants appointed by the General Body from an approved panel within 6 months of financial year close.",
      deepDive: `
### Section 70 - Statutory Audit
- Auditor must be a Chartered Accountant under CA Act 1949.
- General Body appoints the auditor at each Annual General Meeting.
      `,
      keywords: ["section 70", "sec 70", "audit of mscs", "auditor appointment"]
    },
    {
      id: "mscs_sec_106",
      act: "Multi-State Co-operative Societies (Amendment) Act, 2023",
      section: "Section 106",
      title: "Co-operative Ombudsman for Member Grievance Redressal",
      shortSummary: "Empowers members to file complaints against maladministration, refusal of membership, or dividend withholding, with decisions within 30 days.",
      deepDive: `
### Section 106 - Cooperative Ombudsman
- Redressal of member complaints within 30 days.
- Independent appellate mechanism for citizens and society members.
      `,
      keywords: ["section 106", "sec 106", "ombudsman", "cooperative ombudsman", "grievance redressal"]
    },
    {
      id: "mscs_sec_25",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 25",
      title: "Persons Who May Become Members of a Cooperative Society",
      shortSummary: "Individuals competent to contract, other multi-state or state cooperative societies, Central/State Governments, and recognized statutory corporations may be admitted as members.",
      deepDive: `
### Section 25 - Membership Eligibility
- Any individual over 18 years of sound mind competent to contract.
- No individual can be refused membership arbitrarily if they fulfill bylaw criteria.
- Appeals against refusal lie with the Central Registrar or Ombudsman.
      `,
      keywords: ["section 25", "sec 25", "membership eligibility", "who can become member", "sadasyata"]
    },
    {
      id: "mscs_sec_29",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 29",
      title: "Disqualification for Membership of Cooperative Society",
      shortSummary: "Persons adjudged insolvent, convicted of offenses involving moral turpitude, or carrying on business competing with the society are barred from membership.",
      deepDive: `
### Section 29 - Disqualification of Members
- Carrying on competing business in the area of operation of the society.
- Insolvent or bankrupt individuals.
- Convicted of offenses involving dishonesty or moral turpitude.
      `,
      keywords: ["section 29", "sec 29", "member disqualification", "sadasyata radd"]
    },
    {
      id: "mscs_sec_30",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 30",
      title: "Rights of Members to Inspect Books & Receive Services",
      shortSummary: "Every member has the statutory right to inspect the society's register of members, audited financial balance sheets, and bylaws during office hours without any fee.",
      deepDive: `
### Section 30 - Right to Information & Inspection
- Members have full legal right to inspect accounts, audit reports, and member list.
- Refusal to provide inspection is an offense under Section 106.
      `,
      keywords: ["section 30", "sec 30", "inspect books", "member rights", "balance sheet inspection"]
    },
    {
      id: "mscs_sec_35",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 35",
      title: "Expulsion of Members (2/3rd Majority Requirement)",
      shortSummary: "A member can only be expelled by a 2/3rd majority vote at a general meeting after giving full opportunity to show cause. The expulsion requires approval of the Registrar.",
      deepDive: `
### Section 35 - Expulsion Procedure
- Notice to show cause with minimum 15 days time.
- Special general meeting with at least 2/3rd members present and voting.
- Expulsion is ineffective until approved by the Central Registrar.
      `,
      keywords: ["section 35", "sec 35", "expulsion of member", "member ko nikalna"]
    },
    {
      id: "mscs_sec_99",
      act: "Multi-State Co-operative Societies Act, 2002",
      section: "Section 99",
      title: "Appeals against Orders of Central Registrar & Arbitrator",
      shortSummary: "Appeals against refusal of registration, supersession of board, or arbitral awards can be filed within 60 days before the Cooperative Appellate Tribunal.",
      deepDive: `
### Section 99 - Statutory Appeals & Appellate Tribunal
- Limitation period for appeal: 60 days from date of communication of order.
- Tribunal has powers equivalent to a Civil Court under CPC 1908.
      `,
      keywords: ["section 99", "sec 99", "appeal", "cooperative tribunal", "appellate tribunal"]
    }
  ],

  // 4. Agricultural & Farmer Rights (KCC, Subsidies)
  agriculturalRights: [
    {
      id: "kcc_rights",
      category: "Agricultural Credit & Farmer Subsidies",
      article: "Article 21 & RBI/NABARD Kisan Credit Card Guidelines",
      part: "Agricultural Subsidies & Credit",
      title: "Kisan Credit Card (KCC) Entitlements & 4% Subsidized Interest",
      shortSummary: "Every farmer is legally entitled to timely institutional crop credit at a subsidized 4% net interest rate (7% baseline with 3% prompt repayment rebate). Collateral-free limit up to ₹1.60 Lakh.",
      deepDive: `
### Kisan Credit Card (KCC) Rights
- **Effective Interest Rate**: 4% per annum upon prompt repayment.
- **Collateral-Free Limit**: Up to ₹1,60,000 without requiring land mortgage.
- **Eligibility**: Landowners, tenant farmers, oral lessees, and sharecroppers.
- **Grievance**: Rejection can be appealed to DCCB or Banking Ombudsman.
      `,
      keywords: ["kisan credit card", "kcc", "kisan loan", "crop loan", "fasal rin", "interest subvention", "farmer right"],
      visualType: "pacsFlow"
    }
  ],

  // 5. Civic Citizen Services (Aadhaar, Birth Certificate, RTI, Consumer Forum)
  civicServices: [
    {
      id: "aadhaar_update",
      category: "Citizen Services",
      article: "UIDAI Aadhaar (Enrollment & Update) Regulations, 2016",
      part: "Citizen Identity Services",
      title: "Aadhaar Card Name & Demographic Details Update Process",
      shortSummary: "Aadhaar name correction can be done online at myaadhaar.uidai.gov.in or at Aadhaar Seva Kendra with valid Proof of Identity (Passport, PAN, Voter ID) and ₹50 fee.",
      actionAdvice: "Visit myaadhaar.uidai.gov.in or nearest Aadhaar Seva Kendra with original identity proof (Passport, PAN, Voter ID) and verify mobile OTP. Note that lifetime limit is 2 name updates.",
      deepDive: `
### Aadhaar Name Correction - 4 Steps
1. Login with OTP at myaadhaar.uidai.gov.in.
2. Select 'Name/Gender/DOB Update' and enter correct name.
3. Upload self-attested Proof of Identity.
4. Pay ₹50 fee and track via 14-digit URN within 5-7 days.
      `,
      keywords: ["aadhaar", "addhar", "aadhar card", "name change", "aadhaar update", "name correction", "uidai"]
    },
    {
      id: "birth_certificate_update",
      category: "Civil Registration & Citizen Records",
      article: "Section 15, Registration of Births and Deaths (RBD) Act, 1969 & Amendment 2023",
      part: "Vital Statistics & Municipal Administration",
      title: "Birth Certificate Name Correction & Amendment Procedure",
      shortSummary: "Birth certificate name corrections are processed under Section 15 of the Registration of Births and Deaths (RBD) Act, 1969 through the local Municipal Registrar / Gram Panchayat with a notarized magistrate affidavit, educational proofs, and State/Central Gazette notification for major name changes.",
      actionAdvice: "Submit Form 10 to your local Registrar of Births and Deaths (Municipal Corporation / Gram Panchayat) with a ₹100 Notarized Magistrate Affidavit and school leaving certificate; publish in the Official Gazette if altering given name or surname.",
      deepDive: `
### Birth Certificate Correction (Section 15 RBD Act 1969)
1. **Jurisdiction & Competent Authority**:
   - The Municipal Corporation / Municipality (urban areas) or Gram Panchayat Secretary (rural areas) functions as the Registrar under Section 15 of the RBD Act.
2. **Clerical vs Major Name Correction**:
   - **Minor/Clerical Spelling Errors**: Can be corrected by the Registrar upon verifying hospital discharge slips, school leaving certificate, and affidavit.
   - **Major Name Change or Surname Change**: Requires publication of an official notification in the Central Government Gazette (*The Gazette of India*) or State Government Gazette.
3. **Mandatory Documentation Checklist**:
   - Duly filled Form 10 (Correction / Cancellation of Entry).
   - ₹100 Non-Judicial Stamp Affidavit verified before an Executive Magistrate / Notary.
   - School Leaving Certificate (SLC) / Matriculation Certificate reflecting the correct name.
   - Self-attested copy of parents' identity proofs (Aadhaar/Voter ID).
4. **Online Portal**:
   - Applications can also be initiated through the Civil Registration System portal [crsorgi.gov.in](https://crsorgi.gov.in).
      `,
      keywords: ["birth certificate", "birth certificate name change", "change name in birth certificate", "birth certificate correction", "janam praman patra", "janam patra", "birth record", "janam dakhla", "municipal registrar", "rbd act"]
    },
    {
      id: "rti_act",
      category: "Citizen Rights",
      article: "Section 6 & 7, Right to Information Act, 2005",
      part: "Transparency & Governance",
      title: "Filing RTI Applications to Government Authorities",
      shortSummary: "Any citizen can file an RTI with ₹10 statutory fee. The PIO must furnish information within 30 days (48 hours for life/liberty).",
      actionAdvice: "Submit your RTI online at rtionline.gov.in or directly to the Public Information Officer (PIO) with a ₹10 court fee stamp.",
      deepDive: `
### RTI Act 2005
- File online at rtionline.gov.in or send written application to PIO.
- Statutory response time: 30 days.
      `,
      keywords: ["rti", "right to information", "soochana adhikar", "file rti"]
    },
    {
      id: "consumer_protection",
      category: "Consumer Rights",
      article: "Consumer Protection Act, 2019",
      part: "Consumer Redressal Commissions",
      title: "Filing Consumer Complaints for Defective Goods or Services",
      shortSummary: "File online via e-Daakhil portal or at District Consumer Commission for deficiency in service, unfair trade practices, or housing society disputes.",
      actionAdvice: "File consumer complaints online via the e-Daakhil portal (edaakhil.nic.in) along with purchase bills, warranty cards, and legal notice copy.",
      deepDive: `
### Consumer Protection Act, 2019
- File complaints online via e-Daakhil (edaakhil.nic.in).
      `,
      keywords: ["consumer court", "consumer forum", "defective product", "e daakhil"]
    }
  ],

  // 6. Criminal Law & IPC / BNS Key Sections
  criminalLaw: [
    {
      id: "ipc_302",
      category: "Criminal Law & Constitutional Safeguards",
      article: "Section 302 IPC / Section 103 Bharatiya Nyaya Sanhita (BNS)",
      part: "Penal Law / Fair Trial (Article 21 & 39A)",
      title: "Punishment for Murder & Accused Legal Rights",
      shortSummary: "Prescribes death penalty or imprisonment for life, and fine. Accused has the constitutional right to free legal representation under Article 39A.",
      deepDive: `
### Section 302 IPC / Section 103 BNS 2023 - Murder
- Offence is cognizable, non-bailable, and triable by Court of Session.
- Mandatory free legal defense via DLSA under Article 39A if accused is indigent.
      `,
      keywords: ["section 302", "sec 302", "302 ipc", "murder", "bns 103", "hatya", "katl"]
    },
    {
      id: "ipc_420",
      category: "Criminal Law / Fraud",
      article: "Section 420 IPC / Section 318 Bharatiya Nyaya Sanhita (BNS)",
      part: "Cheating & Financial Fraud",
      title: "Cheating and Dishonestly Inducing Delivery of Property",
      shortSummary: "Punishment for cheating and financial fraud: imprisonment up to 7 years and fine. Applicable to cooperative fund embezzlement.",
      deepDive: `
### Section 420 IPC / Section 318 BNS
- Punishment: Up to 7 years imprisonment and fine.
      `,
      keywords: ["section 420", "sec 420", "420", "cheating", "fraud", "dhokhadhadi"]
    },
    {
      id: "ni_sec_138",
      category: "Banking & Commercial Law",
      article: "Section 138, Negotiable Instruments (NI) Act, 1881",
      part: "Commercial Disputes",
      title: "Cheque Bounce: Statutory Legal Notice & Criminal Penalties",
      shortSummary: "Dishonour of cheque for insufficiency of funds is a criminal offense punishable with up to 2 years imprisonment or double the cheque amount. Payee must serve a 15-day statutory legal notice within 30 days of memo.",
      deepDive: `
### Section 138 NI Act - Cheque Bounce Procedure
- **Bank Return Memo**: Cheque dishonoured with remarks like 'Funds Insufficient'.
- **Statutory Notice**: Send formal demand notice in writing within **30 days** of bank return memo.
- **15-Day Cure Period**: The drawer gets 15 days to clear payment from date of receipt.
- **Court Complaint**: If payment is not made within 15 days, file complaint under Section 138 before Judicial Magistrate within 30 days.
      `,
      keywords: ["section 138", "sec 138", "cheque bounce", "dishonour of cheque", "bounce cheque", "138 ni act", "check bounce"]
    },
    {
      id: "crpc_154",
      category: "Criminal Procedure & Police Rights",
      article: "Section 154 CrPC / Section 173 Bharatiya Nagarik Suraksha Sanhita (BNSS)",
      part: "First Information Report (FIR)",
      title: "Registration of FIR, Zero FIR & Police Refusal Remedies",
      shortSummary: "Police are legally obligated to register an FIR for every cognizable offense (Lalita Kumari judgment). If the local police station refuses, you can file a Zero FIR, send complaint to SP via registered post, or file under Section 156(3) CrPC before a Magistrate.",
      deepDive: `
### Section 154 CrPC / 173 BNSS - FIR Safeguards
- **Zero FIR**: Can be lodged at ANY police station regardless of jurisdiction.
- **Police Refusal Remedy (Section 154(3))**: Send written complaint to Superintendent of Police (SP) by registered post.
- **Judicial Magistrate Remedy (Section 156(3))**: File application before Magistrate to order police investigation and registration.
- **Free Copy**: Informant is legally entitled to a free copy of the FIR immediately.
      `,
      keywords: ["section 154", "sec 154", "fir", "police complaint", "zero fir", "fir nahi likhi", "police refusal", "154 crpc"]
    },
    {
      id: "crpc_438",
      category: "Criminal Procedure",
      article: "Section 438 CrPC / Section 482 Bharatiya Nagarik Suraksha Sanhita (BNSS)",
      part: "Anticipatory Bail (Agrim Zamanat)",
      title: "Anticipatory Bail: Pre-Arrest Protection from Sessions Court & High Court",
      shortSummary: "Direction for grant of bail to a person apprehending arrest in a non-bailable offense. Protects innocent citizens from malicious or politically motivated arrests.",
      deepDive: `
### Section 438 CrPC / 482 BNSS - Anticipatory Bail
- Applied before Sessions Court or High Court before actual arrest occurs.
- Factors: Gravity of offense, antecedents of accused, flight risk, and likelihood of false implication.
      `,
      keywords: ["section 438", "sec 438", "anticipatory bail", "agrim jamanat", "pre arrest bail", "438 crpc"]
    },
    {
      id: "crpc_144",
      category: "Public Order",
      article: "Section 144 CrPC / Section 187 Bharatiya Nagarik Suraksha Sanhita (BNSS)",
      part: "Public Order & Restrictions",
      title: "Prohibitory Orders for Preservation of Public Peace",
      shortSummary: "Empowers Executive Magistrate to issue orders prohibiting assembly of 4 or more persons to prevent riot, violence, or danger to human life. Maximum validity is 2 months (extendable up to 6 months by State Govt).",
      deepDive: `
### Section 144 CrPC - Prohibitory Orders
- Cannot be used arbitrarily to suppress peaceful democratic speech (*Anuradha Bhasin v. UOI*).
- Validity cannot exceed 2 months unless specifically extended by State Government.
      `,
      keywords: ["section 144", "sec 144", "curfew", "unlawful assembly", "144 crpc"]
    },
    {
      id: "crpc_125",
      category: "Family & Maintenance Law",
      article: "Section 125 CrPC / Section 144 Bharatiya Nagarik Suraksha Sanhita (BNSS)",
      part: "Maintenance for Wives, Children & Senior Parents",
      title: "Order for Maintenance of Wives, Children and Elderly Parents",
      shortSummary: "Any person having sufficient means who neglects or refuses to maintain their wife, legitimate/illegitimate child, or elderly parents can be ordered by a Magistrate to pay monthly maintenance allowance.",
      deepDive: `
### Section 125 CrPC - Right to Maintenance
- Summary remedy to prevent destitution and vagrancy.
- Interim maintenance must be decided by court within 60 days of notice.
- Also supported by Maintenance and Welfare of Parents and Senior Citizens Act, 2007.
      `,
      keywords: ["section 125", "sec 125", "maintenance", "kharcha", "gujara bhatta", "parents maintenance", "125 crpc"]
    },
    {
      id: "domestic_violence_act",
      category: "Women Protection Laws",
      article: "Protection of Women from Domestic Violence Act (PWDVA), 2005",
      part: "Women Rights & Safety",
      title: "Protection of Women from Domestic Violence & National Helpline 181",
      shortSummary: "Comprehensive protection against physical, emotional, sexual, and economic abuse. Guarantees right to reside in shared household, protection orders, monetary relief, and free legal representation.",
      deepDive: `
### Domestic Violence Act 2005
- **Emergency Helplines**: Call **181** (Women Helpline) or **1091** / **112**.
- **Protection Officers**: File Domestic Incident Report (DIR) with designated Protection Officer or Magistrate.
- **Reliefs**: Protection orders against violence, right to reside in shared matrimonial home, and interim maintenance.
      `,
      keywords: ["domestic violence", "patni par atyachar", "women helpline 181", "pwdva", "mahila adhikar"]
    },
    {
      id: "housing_maintenance_dispute",
      category: "Cooperative Housing Societies",
      article: "Model Cooperative Housing Society Bylaws & State Cooperative Societies Acts",
      part: "Housing Society Rules",
      title: "Housing Society Flat Maintenance, Transfer Premium & Parking Rules",
      shortSummary: "Cooperative housing societies cannot levy arbitrary transfer charges; statutory circulars cap transfer premium at maximum ₹25,000. Parking cannot be sold or monopolized. Unfair dues can be challenged before Cooperative Court or Consumer Forum.",
      deepDive: `
### Cooperative Housing Society Member Rights
- **Transfer Premium Cap**: State Cooperative Department circulars strictly cap transfer fees at **maximum ₹25,000**. Demanding lakhs as transfer donation is illegal.
- **Parking Allotment**: Parking belongs to the society; builders or management cannot sell stilt/open parking separately (*Nahalchand Laloochand v. MCBA*).
- **Maintenance Calculation**: Service charges shared equally; building insurance and sinking fund calculated per carpet/built-up area.
- **Grievance Forum**: File complaint before Deputy Registrar of Co-operative Societies or District Consumer Commission.
      `,
      keywords: ["housing society", "flat maintenance", "transfer fee", "transfer premium 25000", "housing dispute", "flat transfer"],
      actionAdvice: "Challenge unlawful transfer fees exceeding ₹25,000 before the Deputy Registrar of Cooperative Societies or District Consumer Commission."
    }
  ],

  // 6. Property & Land Revenue Law (Land Disputes, Mutation, Demarcation, Sec 145 CrPC)
  propertyAndLand: [
    {
      id: "land_revenue_dispute",
      category: "Property & Land Revenue Law",
      article: "State Land Revenue Codes, Transfer of Property Act 1882 & Sec 145 CrPC",
      part: "Land Governance & Revenue Courts",
      title: "Land, Property & Revenue Dispute Legal Resolution Guide",
      shortSummary: "Land disputes concerning boundaries, mutation (Dakhil-Kharij), and demarcation (Napi) are adjudicated by Revenue Courts (Tehsildar/SDM). Ownership and title disputes fall under Civil Courts (Title Suits / Injunctions under Order 39 CPC). Illegal encroachment or risk of breach of peace can be halted via Section 145 CrPC before the Executive Magistrate.",
      actionAdvice: "Download certified Khatauni / 7/12 land records from your state revenue portal. For boundary disputes, file for official demarcation (Napi) before the Tehsildar; for illegal encroachment or dispossession, seek an interim stay order (Order 39 CPC) from the Civil Court.",
      deepDive: `
### Land & Property Dispute Resolution Roadmap

#### 1. Revenue Courts vs Civil Courts Jurisdiction
- **Revenue Courts (Tehsildar -> SDM -> DM/Collector -> Board of Revenue)**:
  - Exclusive jurisdiction over Land Records, Record of Rights (ROR / Khatauni / 7/12).
  - Demarcation (Simankan / Napi) of disputed agricultural boundaries.
  - Mutation (Dakhil-Kharij) and partition of agricultural holdings.
- **Civil Courts (Civil Judge / District Judge)**:
  - Exclusive jurisdiction over **Title & Ownership** declarations (*Title Suit*).
  - Injunction orders under Order 39 Rules 1-2 CPC (Stay Order against unauthorized possession or construction).
  - Disputes governed by the Transfer of Property Act, 1882 and Specific Relief Act, 1963.

#### 2. Emergency Remedy: Section 145 CrPC (Sec 107 BNSS)
- When a land or boundary dispute is likely to cause immediate breach of peace or violence:
  - Executive Magistrate (SDM) can initiate proceedings under Section 145 CrPC.
  - Magistrate investigates which party held actual possession on the date of preliminary order.
  - Order forbids disturbance of such possession until rights are determined by a competent Civil Court.

#### 3. Step-by-Step Action Plan
1. **Procure Certified Records**: Obtain digital certified 7/12 or Khatauni and Khasra map from state portal (e.g. AnyRoR, Bhulekh, BanglarBhumi).
2. **Apply for Boundary Demarcation**: If boundary pillars or fences are displaced, apply to the Tehsildar for an official survey by a government Revenue Inspector (Kanoongo/Amin).
3. **File Civil Suit for Permanent Injunction**: If a party attempts illegal encroachment, immediately file a suit for injunction with an ex-parte stay application under Order 39 CPC.
4. **Free Legal Representation**: Contact District Legal Services Authority (DLSA Helpline **15100**) for free legal drafting and court representation.
      `,
      keywords: [
        "land dispute", "legal land disputs law", "property dispute", "zameen vivad", "khet vivad", 
        "land boundary", "mutation dispute", "dakhil kharij", "7/12 dispute", "khatauni", 
        "encroachment", "illegal possession", "zameen ka lafda", "partition suit", "revenue court", "land law"
      ]
    }
  ],

  // 7. Part IXB of the Constitution
  constitution: [
    {
      id: "art_39a",
      category: "Directive Principles / Legal Aid",
      article: "Article 39A",
      part: "Part IV",
      title: "Equal Justice and Free Legal Aid (NALSA / DLSA)",
      shortSummary: "Guarantees free legal counsel and court representation through NALSA and DLSA to farmers, women, SC/ST, and citizens with annual income below ₹3 Lakh.",
      deepDive: `
### Article 39A & Free Legal Aid
- Call Toll-Free Helpline **15100** or visit [nalsa.gov.in](https://nalsa.gov.in).
      `,
      keywords: ["free lawyer", "legal aid", "art 39a", "nalsa", "dlsa", "muft vakil"],
      visualType: "legalAidFlow"
    },
    {
      id: "art_43b",
      category: "Directive Principles of State Policy (DPSP)",
      article: "Article 43B",
      part: "Part IV",
      title: "Promotion of Co-operative Societies",
      shortSummary: "The State shall endeavour to promote voluntary formation, autonomous functioning, democratic control, and professional management of co-operative societies.",
      deepDive: `
### Article 43B
- Mandates governments to support autonomous and democratic cooperatives.
      `,
      keywords: ["dpsp", "article 43b", "state duty", "promotion of cooperative"],
      visualType: "pacsFlow"
    },
    {
      id: "art_243zj",
      category: "Part IXB - The Co-operative Societies",
      article: "Article 243ZJ",
      part: "Part IXB",
      title: "Board Size (Max 21 Directors), 5-Year Term & Quotas (2 Women, 1 SC/ST)",
      shortSummary: "Maximum board size is 21 directors with a fixed 5-year term. Mandatory reservation of at least 2 seats for women and 1 seat for SC/ST members on every board.",
      deepDive: `
### Article 243ZJ - Board Composition
- Max 21 directors.
- 5-year fixed term.
- Mandatory: 2 seats for women, 1 seat for SC/ST.
      `,
      keywords: ["board size", "term of board", "women reservation", "sc st quota", "directors", "5 years", "art 243zj"],
      visualType: "boardQuotaDiagram"
    },
    {
      id: "art_243zk",
      category: "Part IXB - The Co-operative Societies",
      article: "Article 243ZK",
      part: "Part IXB",
      title: "Election of Members of Board",
      shortSummary: "Elections must be conducted prior to the expiry of the existing board's 5-year term by an independent cooperative election authority.",
      deepDive: `
### Article 243ZK - Elections
- Election must be held before expiry of outgoing board's term.
      `,
      keywords: ["election", "chunav", "vote", "voter list", "art 243zk"]
    },
    {
      id: "art_243zl",
      category: "Part IXB - The Co-operative Societies",
      article: "Article 243ZL",
      part: "Part IXB",
      title: "Supersession and Suspension of Board & 6-Month Limit",
      shortSummary: "A cooperative board cannot be superseded for more than 6 months. Administrator must conduct fresh elections within this period.",
      deepDive: `
### Article 243ZL - Supersession
- Max 6 months suspension (5 years for cooperative banks).
      `,
      keywords: ["supersession", "suspension", "administrator", "art 243zl"]
    },
    {
      id: "art_243zm",
      category: "Part IXB - The Co-operative Societies",
      article: "Article 243ZM",
      part: "Part IXB",
      title: "Statutory Audit of Accounts of Co-operative Societies",
      shortSummary: "Mandatory annual audit by qualified Chartered Accountants from an approved panel within 6 months of financial year close (by September 30th).",
      deepDive: `
### Article 243ZM - Audit Rules
- Must be audited within 6 months of the close of the financial year by a qualified CA.
      `,
      keywords: ["audit", "financial audit", "chartered accountant", "art 243zm", "audit deadline"]
    },
    {
      id: "art_243zn",
      category: "Part IXB - The Co-operative Societies",
      article: "Article 243ZN",
      part: "Part IXB",
      title: "Convening of Annual General Body Meetings (AGM)",
      shortSummary: "Every cooperative society must convene its Annual General Meeting (AGM) within six months of the close of the financial year (on or before September 30th).",
      deepDive: `
### Article 243ZN - AGM
- Must be held within 6 months of financial year end.
      `,
      keywords: ["agm", "annual general meeting", "varshik sabha", "art 243zn"]
    },
    {
      id: "art_243zo",
      category: "Part IXB - The Co-operative Societies",
      article: "Article 243ZO",
      part: "Part IXB",
      title: "Right of a Member to Get Information (RTI in Cooperatives)",
      shortSummary: "Members have a constitutional right to access and inspect society books, accounts, register of members, and bylaws upon written request.",
      deepDive: `
### Article 243ZO - Member RTI
- Inspect bylaws, voter lists, and audited balance sheets.
      `,
      keywords: ["inspect accounts", "society books", "art 243zo", "member right to information"]
    }
  ],

  // 8. Visual Flowchart SVGs
  visualDiagrams: {
    rightsHierarchy: {
      title: "The 6 Fundamental Rights of Indian Citizens (Part III)",
      svg: `
      <svg viewBox="0 0 760 160" class="flowchart-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="235" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="127" y="36" fill="#1d4ed8" font-size="11" font-weight="700" text-anchor="middle">1. RIGHT TO EQUALITY</text>
        <text x="127" y="54" fill="#475569" font-size="9" text-anchor="middle">Articles 14 to 18 (No discrimination)</text>

        <rect x="260" y="15" width="235" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="377" y="36" fill="#1d4ed8" font-size="11" font-weight="700" text-anchor="middle">2. RIGHT TO FREEDOM</text>
        <text x="377" y="54" fill="#475569" font-size="9" text-anchor="middle">Articles 19-22 (Speech, Life, Cooperatives)</text>

        <rect x="510" y="15" width="240" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="630" y="36" fill="#1d4ed8" font-size="11" font-weight="700" text-anchor="middle">3. AGAINST EXPLOITATION</text>
        <text x="630" y="54" fill="#475569" font-size="9" text-anchor="middle">Articles 23-24 (No forced/child labor)</text>

        <rect x="10" y="85" width="235" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
        <text x="127" y="106" fill="#15803d" font-size="11" font-weight="700" text-anchor="middle">4. FREEDOM OF RELIGION</text>
        <text x="127" y="124" fill="#475569" font-size="9" text-anchor="middle">Articles 25 to 28 (Conscience & faith)</text>

        <rect x="260" y="85" width="235" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
        <text x="377" y="106" fill="#15803d" font-size="11" font-weight="700" text-anchor="middle">5. CULTURAL & EDUCATION</text>
        <text x="377" y="124" fill="#475569" font-size="9" text-anchor="middle">Articles 29-30 (Minority protections)</text>

        <rect x="510" y="85" width="240" height="60" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="630" y="106" fill="#b45309" font-size="11" font-weight="700" text-anchor="middle">6. REMEDIES (THE 5 WRITS)</text>
        <text x="630" y="124" fill="#475569" font-size="9" text-anchor="middle">Article 32 (Supreme Court Writs)</text>
      </svg>
      `
    },
    registrationFlow: {
      title: "Cooperative Society Registration Process (4 Steps)",
      svg: `
      <svg viewBox="0 0 760 140" class="flowchart-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="160" height="100" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
        <text x="90" y="38" fill="#1e3a8a" font-size="11" font-weight="700" text-anchor="middle">STEP 1: Formation</text>
        <text x="90" y="60" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Min 10-20 Members</text>
        <text x="90" y="78" fill="#64748b" font-size="9" text-anchor="middle">Promoter Meeting</text>
        <text x="90" y="96" fill="#2563eb" font-size="9" font-weight="600" text-anchor="middle">Art 19(1)(c)</text>
        
        <path d="M 175 65 L 200 65" stroke="#f59e0b" stroke-width="3"/>
        <polygon points="205,65 195,60 195,70" fill="#f59e0b"/>

        <rect x="205" y="15" width="160" height="100" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
        <text x="285" y="38" fill="#1e3a8a" font-size="11" font-weight="700" text-anchor="middle">STEP 2: Bank Account</text>
        <text x="285" y="60" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Capital Collection</text>
        <text x="285" y="78" fill="#64748b" font-size="9" text-anchor="middle">Open Escrow Account</text>
        <text x="285" y="96" fill="#2563eb" font-size="9" font-weight="600" text-anchor="middle">Capital Deposit</text>

        <path d="M 370 65 L 395 65" stroke="#f59e0b" stroke-width="3"/>
        <polygon points="400,65 390,60 390,70" fill="#f59e0b"/>

        <rect x="400" y="15" width="160" height="100" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
        <text x="480" y="38" fill="#1e3a8a" font-size="11" font-weight="700" text-anchor="middle">STEP 3: Application</text>
        <text x="480" y="60" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Submit to Registrar</text>
        <text x="480" y="78" fill="#64748b" font-size="9" text-anchor="middle">Form 1 + KYC Documents</text>
        <text x="480" y="96" fill="#2563eb" font-size="9" font-weight="600" text-anchor="middle">Sec 7 MSCS / State</text>

        <path d="M 565 65 L 590 65" stroke="#f59e0b" stroke-width="3"/>
        <polygon points="595,65 585,60 585,70" fill="#f59e0b"/>

        <rect x="595" y="15" width="155" height="100" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
        <text x="672" y="38" fill="#065f46" font-size="11" font-weight="700" text-anchor="middle">STEP 4: Registration</text>
        <text x="672" y="60" fill="#065f46" font-size="10" font-weight="600" text-anchor="middle">Certificate Issued</text>
        <text x="672" y="78" fill="#64748b" font-size="9" text-anchor="middle">Body Corporate Status</text>
        <text x="672" y="96" fill="#059669" font-size="9" font-weight="700" text-anchor="middle">Ready for Operations</text>
      </svg>
      `
    },
    disputeEscalationFlow: {
      title: "Cooperative Dispute Escalation Hierarchy (MSCS Act Sec 84)",
      svg: `
      <svg viewBox="0 0 760 140" class="flowchart-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="160" height="95" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="2"/>
        <text x="95" y="42" fill="#1e3a8a" font-size="11" font-weight="700" text-anchor="middle">LEVEL 1: Internal</text>
        <text x="95" y="65" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Managing Committee</text>
        <text x="95" y="83" fill="#64748b" font-size="9" text-anchor="middle">Written Representation</text>
        <text x="95" y="100" fill="#2563eb" font-size="9" font-weight="600" text-anchor="middle">15-30 Days</text>

        <path d="M 180 67 L 205 67" stroke="#f59e0b" stroke-width="3"/>
        <polygon points="210,67 200,62 200,72" fill="#f59e0b"/>

        <rect x="210" y="20" width="160" height="95" rx="8" fill="#ffffff" stroke="#f59e0b" stroke-width="2"/>
        <text x="290" y="42" fill="#92400e" font-size="11" font-weight="700" text-anchor="middle">LEVEL 2: Ombudsman</text>
        <text x="290" y="65" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Cooperative Ombudsman</text>
        <text x="290" y="83" fill="#64748b" font-size="9" text-anchor="middle">Sec 106 MSCS Act</text>
        <text x="290" y="100" fill="#b45309" font-size="9" font-weight="600" text-anchor="middle">Target: 30 Days</text>

        <path d="M 375 67 L 400 67" stroke="#9333ea" stroke-width="3"/>
        <polygon points="405,67 395,62 395,72" fill="#9333ea"/>

        <rect x="405" y="20" width="160" height="95" rx="8" fill="#ffffff" stroke="#9333ea" stroke-width="2"/>
        <text x="485" y="42" fill="#581c87" font-size="11" font-weight="700" text-anchor="middle">LEVEL 3: Statutory</text>
        <text x="485" y="65" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Arbitration Tribunal</text>
        <text x="485" y="83" fill="#64748b" font-size="9" text-anchor="middle">Sec 84 MSCS Act</text>
        <text x="485" y="100" fill="#7e22ce" font-size="9" font-weight="600" text-anchor="middle">Civil Court Barred</text>

        <path d="M 570 67 L 595 67" stroke="#10b981" stroke-width="3"/>
        <polygon points="600,67 590,62 590,72" fill="#10b981"/>

        <rect x="600" y="20" width="145" height="95" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
        <text x="672" y="42" fill="#065f46" font-size="11" font-weight="700" text-anchor="middle">LEVEL 4: Judicial</text>
        <text x="672" y="65" fill="#1e293b" font-size="10" font-weight="600" text-anchor="middle">Coop Appellate Court</text>
        <text x="672" y="83" fill="#64748b" font-size="9" text-anchor="middle">High Court (Art 226)</text>
        <text x="672" y="100" fill="#047857" font-size="9" font-weight="600" text-anchor="middle">Constitutional Review</text>
      </svg>
      `
    }
  }
};
